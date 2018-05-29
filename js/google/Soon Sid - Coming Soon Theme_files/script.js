/*	
	by Martin Angelov
	http://tutorialzine.com/2010/10/ajaxed-coming-soon-page/
*/

$(document).ready(function(){

	// Binding event listeners for the form on document ready

	$('#email_field').defaultText('Email Address');

	// 'working' prevents multiple submissions
	var working = false;

	$('#page form').submit(function(){

		if(working){
			return false;
		}
		working = true;

		$.post("./coming-soon.php",{email:$('#email_field').val()},function(r){
			if(r.error){
				$('#email_field').val(r.error);
			}
			else $('#email_field').val('Thank you!');

			working = false;
		},'json');

		return false;
	});
});

// A custom jQuery method for placeholder text:

$.fn.defaultText = function(value){

	var element = this.eq(0);
	element.data('defaultText',value);

	element.focus(function(){
		if(element.val() == value){
			element.val('').removeClass('defaultText');
		}
	}).blur(function(){
		if(element.val() == '' || element.val() == value){
			element.addClass('defaultText').val(value);
		}
	});

	return element.blur();
}



/* THEME SWITCHER */

/*if($.cookie("css")) {
   $("link").attr("href",$.cookie("css"));
}*/
  
$(document).ready(function() { 
  $("#theme_colors a").click(function() { 
  
	 $("link").attr("href",$(this).attr('rel'));
	 
	 $.cookie("css",$(this).attr('rel'), {
		 expires: 365, path: '/'
	 });
	 
	 return false;
	 
  });
});








