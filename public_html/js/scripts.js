/*author: https://www.123contactform.com/jquery-contact-form.htm8*/

$(document).ready(function(){
	var errors = false;
	$('.h4').parent().find('.form-control').on('blur', function() {
		var error_div = $(this).parent().find('.error_message');
		var field_container = $(this).parent();
		if (!$.empty_field_validation($(this).val())) {
			error_div.html('This field is required.');
			error_div.css('display', 'block');
			field_container.addClass('error');
			errors = true;
		} else {
			error_div.html('');
			error_div.css('display', 'none');
			field_container.removeClass('error');
			errors = false;
		}
	});
	$('#email').on('blur', function(){
		var error_div = $(this).parent().find('.error_message');
		var field_container = $(this).parent();
		if (!$.email_validation($(this).val())) {
			error_div.html('Please enter email address');
			error_div.css('display', 'block');
			field_container.addClass('error');
			errors = true;
		} else {
			error_div.html('');
			error_div.css('display', 'none');
			field_container.removeClass('error');
			errors = false;
		}
	});
	$('#contact-form').submit(function(event) {
		event.preventDefault();
		$('.required').parent().find('.name').trigger('blur');
		if (!errors)
			$.ajax({
				url: 'js/scripts.js',
				data: {
					json: JSON.stringify($(this).serializeObject())
				},
				type: 'post',
				success: function(data) {
					var message = 'Your message was sent and received.';
					$('#contact-form').html(message);
					$('#contact-form').css('display', 'block');
				},
				error: function() {
					var message = 'Hi '+data.name+'. Your message could not be sent or received. Please try again later';
					$('#contact-form').html(message);
					$('#contact-form').css('display', 'block');
				}
			});
		else
			alert("You didn't completed the form correctly. Check it out and try again!");
	});
});

$.empty_field_validation = function(field_value) {
	if (field_value.trim() == '') return false;
	return true;
}

$.email_validation = function(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};