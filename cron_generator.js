$(document).ready(function(){
    $(".log-autoOpen").dialog({autoOpen: false});
	$(".log-button-autoOpen").click(function(){
	});

	$(".log-button-fileChooser").click(function(){
	});
	
});

function display_dialog(id,name){
	$("#log-" + id + "-dialog").dialog({
      modal: true,
      resizable: false,
      autoOpen : false,
      title : name,
      width: 350,
      draggable: false,
      show: 'fade',
      hide: 'fade',
      position: 'center',
    });
	
	$("#log-" + id + "-scheduledCron").click(function(){
        $("#log-" + id + "-dialog").dialog("open");
    });
}

function change_scheduled(id){
	custom = "Custom:";
	var min       = document.querySelector("input[name = log-" + id + "-minutes]:checked").value;
	var hou       = document.querySelector("input[name = log-" + id + "-hours]:checked").value;
	var day       = document.querySelector("input[name = log-" + id + "-days]:checked").value;
	var mon       = document.querySelector("input[name = log-" + id + "-months]:checked").value;
	var wee    	  = document.querySelector("input[name = log-" + id + "-weekday]:checked").value;
	
	if(min == custom){
		min = document.getElementById("log-" + id + "-customMinutes").value;
	}
	if(hou == custom){
		hou = document.getElementById("log-" + id + "-customHours").value;
	}
	if(day == custom){
		day = document.getElementById("log-" + id + "-customDays").value;
	}
	if(mon == custom){
		mon = document.getElementById("log-" + id + "-customMonths").value;
	}
	if(wee == custom){
		wee = document.getElementById("log-" + id + "-customWeekday").value;
	}
	
	var cron = [min,hou,day,mon,wee];
	
	document.getElementById("log-" + id + "-scheduledCron").value = cron.join(' ');
	$("#log-" + id + "-dialog").dialog("close");
}

function close_dialog(id){
	$("#log-" + id + "-closeDialog").click(function(){
        $("#log-" + id + "-dialog").dialog("close");
    });
}

function display_fileChooser(id,pathNew){
	
	//var strin = "1 2 3 4  5";
	//var patt = /([0-9])\s([0-9])\s([0-9])\s([0-9])\s([0-9])/;
	//console.log(patt.test(strin));

	path = document.getElementById("log-" + id + "-path").value;
	
	if(pathNew == undefined){
		pathNew = path;
	}
	else{
		if(pathNew.indexOf("/") > -1){
			console.log("IF");
		}
		else{
			pathNew = path + "/" + pathNew;
		}
		document.getElementById("log-" + id + "-path").value = pathNew;	
	}
	
	$("#log-" + id + "-fileChooser").dialog({
		modal: true,
		resizable: false,
		autoOpen : false,
		title : 'Browse File',
		width: 350,
		draggable: false,
		show: 'fade',
		hide: 'fade',
		//position: { my: "center", at: "center" },
		});
		
	$("#log-" + id + "-browseButton").click(function(){
		$("#log-" + id + "-fileChooser").dialog("open");
	});

	$.ajax({
		type : 'POST',
		url : 'tools_fileChooser.pl',
		data : {
			'id' : id,
			'path' : pathNew,
		},
		success : function (res) {
			res.paths.sort();
			res.paths.forEach(function(element){
				
				if(element != "." && element != ".."){
					$("#log-" + id + "-displayPaths").append("<button onclick = display_fileChooser('"+id+"','"+element+"'); style='background:#e9e9e9; border: none; text-align: left; margin: 2px; color: black; width: 100%;' class='buttonPath'>"+ element +"</button><br>");																					
				}
			});
			
		},
		error : function (error) {
			$("#log-" + id + "-displayPaths").append("<p>Error retreving this data</p>");
		}
	});
	$( "#log-" + id + "-displayPaths" ).empty();
}

function backPath(id){
	path = document.getElementById("log-" + id + "-path").value;
	if(path != "/stgsec" ){
		path = path.split("/");
		path.pop();
		path = path.join('/');
		console.log(path);
		document.getElementById("log-" + id + "-path").value = "";
		display_fileChooser(id,path);
	}
}

function selectPath(id){
	path = document.getElementById("log-" + id + "-path").value;
	document.getElementById("log-" + id + "-command").value = path;
	$("#log-" + id + "-fileChooser").dialog("close");
}