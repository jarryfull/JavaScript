$(document).ready(function(){
	var selection = document.getElementById("searchTable").value;
	
	if(selection == "startTime"){
		$("#valueTable").datepicker({autoOpen : false, 'dateFormat' : 'yy-mm-dd'});
	}
	
	$("#searchTable").change(function() {
		var selection = document.getElementById("searchTable").value;
		if(selection == "startTime"){
			display_datePicker()
		}
		else{
			destroy_datePicker()
		}
	});
});

function display_datePicker(){
	var selection = document.getElementById("searchTable").value;

		$("#valueTable").datepicker({autoOpen : false, 'dateFormat' : 'yy-mm-dd'});

}

function destroy_datePicker(){
	var selection = document.getElementById("searchTable").value;

		$("#valueTable").datepicker('destroy');
}
