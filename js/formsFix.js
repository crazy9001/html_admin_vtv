// document ready function
$(document).ready(function() { 	

	$("#select1").select2();
	$("#select2").select2();
	$("#dateline").mask("99/99/9999");
	if($('#dateline').length) {
		$("#dateline").datepicker({
			showOtherMonths:true,
			dateFormat: 'dd/mm/yy'
		});
	}
	
	if($(".scroll").length) {
		$(".scroll").niceScroll({
			cursoropacitymax: 0.7,
			cursorborderradius: 6,
			cursorwidth: "7px"
		});
	}
	if($(".scrolled").length) {
		$(".scrolled").niceScroll({
			cursoropacitymax: 0.7,
			cursorborderradius: 6,
			cursorwidth: "4px"
		});
	}
});