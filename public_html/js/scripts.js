	$(document).ready(function(){

	/*validation*/
	$("#contactForm").validate({

		// setup handling of form errors
		debug: true,
		errorClass: "alert alert-danger",
		errorLabelContainer: "#output-area",
		errorElement: "div",

		// rules define what is good/bad input
		// each rule starts with the form input element's NAME attribute
		rules: {
			name: {
				required: true,
				maxlength: 45
			},
			email: {
				email: true,
				required: true
			},
			message: {
				required: true,
				minlength: 2,
				maxlength: 10
			}
		},

		// error messages to display to the end user
		messages: {
			name: {
				required: "Please enter name."
			},
			email: {
				email: "Please enter a valid email address.",
				required: "Please enter a valid email address."
			},
			message: {
				required: "Please enter a message.",
				minlength: "Please enter a message.",
				maxlength: "2000 characters max."
			}
		},

		submitHandler: function(form) {
			$("#contactForm").ajaxSubmit({
				type: "POST",
				url: $("#contactForm").attr("action"),

				success: function(ajaxOutput) {
					// clear the output area's formatting
					//$("#output-area").css("display", "");

					// write the server's reply to the output area
					$("#output-area").html(ajaxOutput);

					// reset the form if it was successful
					if($(".alert-success").length >= 1) {
						$("contactForm")[0].reset();
					}
				}
			})
		}

	});/* end validate function */

});/*end document.ready()*/