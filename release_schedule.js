var greenCheck = "/ui/v8/images/icon-system-status-ok.gif";
var redCheck   = "/ui/v8/images/icon-system-status-na.gif";

$(document).ready(function(){
	$("#datepick-release").datepicker({
		autoOpen   : false, 
		dateFormat : 'yy-mm-dd', 
		minDate    : 0});
});

function release_schedule(user){
	$("#release-result").empty();
	var error = false;
	var tool   = document.getElementById("dropdown_tools").value;
	var date   = document.getElementById("datepick-release").value;
	var hour   = document.getElementById("down_hours").value;
	var min    = document.getElementById("down_mins").value;
	var runNow = document.getElementById("run_now").checked;
	var reason = document.getElementById("release_reason").value;	
	var missFields = "";

	tool = tool.split(" - ");
	tool = tool[0];
	
	if(date == "" && runNow == false){
        	missFields += "<br><img height='10' src='" + redCheck + "' title='Schedule release had no oustanding errors' width='12'> Date ";
		error = true;
	}
	if(reason == ""){
        	missFields += "<br><img height='10' src='" + redCheck + "' title='Schedule release had no oustanding errors' width='12'> Reason ";
		error = true;
	}
		
	if (error){	
		$("#release-result").append("<div style='margin-left: 1em;'><b>Missing Fields: <span style='color:red'>" + missFields + "</span><br>Please check them.</b><div><br>");
		return;
	}
	
	$.ajax({
                type : 'POST',
                url : 'tools_release.pl',
                data : {
                        'tool'     : tool,
                        'date'     : date,
                        'hour'     : hour,
                        'min'      : min ,
                        'runNow'   : runNow ,
			'user'     : user,
			'reason'   : reason,
                },
                success : function (res) {
			$("#release-result").empty();
			if (res.resSQL == 1) {
				if ( runNow ){
					$("#release-result").append("<p>The tool " + res.tool + " was scheduled to release in a few minutes. <img height='10' src='" + greenCheck + "' title='Schedule release had no oustanding errors' width='12'></p>");
				}
				else{
					$("#release-result").append("<p>The tool " + res.tool + " was scheduled to release the day: " + res.date + ". <img height='10' src='" + greenCheck + "' title='Schedule release had no oustanding errors' width='12'></p>");
				}

				if(res.lastCommit){
					$("#release-result").append("<p><b style='color:black'>#Commit: </b> " + res.lastCommit + "</p><br>");
				}
			}
			else{
				$("#release-result").append("<p>Error the tool " + res.tool + " wasn't scheduled to release, The repository doesn't exist or hasn't a initial commit. <img height='10' src='" + redCheck + "' width='12'></p>");
			}
			$("#datepick-release").prop('disabled', false);
	                $("#down_hours").prop('disabled', false);
        	        $("#down_mins").prop('disabled', false);

			$("#release-result").show();

        		document.getElementById("datepick-release").value = "";
        		document.getElementById("down_hours").value = "00";
        		document.getElementById("down_mins").value = "00";
        		document.getElementById("run_now").checked = false;
        		document.getElementById("release_reason").value = "";
                },
                error : function (error) {
			$("#release-result").empty();
			$("#release-result").append("<p>Error the tool " + error.tool + " wasn't scheduled to release, please check the console to see the error or contact the administrator. <img height='10' src='" + redCheck + "' width='12'></p>");
                }
     });
}

function disable_date(){
	var runNow = document.getElementById("run_now").checked;
	
	if (runNow == true ){
		$("#datepick-release").prop('disabled', true);	
		$("#down_hours").prop('disabled', true);	
		$("#down_mins").prop('disabled', true);	
	}
	else{
		$("#datepick-release").prop('disabled', false);	
		$("#down_hours").prop('disabled', false);	
		$("#down_mins").prop('disabled', false);	
	}
}

