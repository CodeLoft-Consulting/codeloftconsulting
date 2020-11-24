const AJAX_FORM_KEY = "data-ajaxform";
const RECAPTCHA_FORM_KEY = "data-recaptchav3key";

var Webflow = Webflow || [];
Webflow.push(function () {
	// DOMready has fired
	// May now use jQuery and Webflow api
	$("form[" + AJAX_FORM_KEY + "]").submit(function(e) {
		e.preventDefault();
		var $form = $(this);
		var recaptchaSiteKey = $form.attr(RECAPTCHA_FORM_KEY);
		
		// Check that Recaptcha is ready
		grecaptcha.ready(function() {
			grecaptcha.execute(recaptchaSiteKey, {action: 'submit'}).then(function(token) {
				// Submit form
        const REQUEST_PARAMETERS = {
					method: 'POST',
          headers: { 'Content-Type': `application/x-www-form-urlencoded` },
          body: $form.serialize(),
        };

        fetch('/', REQUEST_PARAMETERS)
          .then(() => {
            var parent = $form.parent();
            parent.children('form').css('display','none');
            parent.children('.w-form-done').css('display','block');
            parent.find('.w-form-fail').css('display','none');
          })
          .catch(error => {
          	var parent = $form.parent();
            parent.find('.w-form-fail').css('display','block');
            parent.children('.w-form-done').css('display','none');
            console.error("Form error: " + error.responseText);
          });
      });
    });
  });
});