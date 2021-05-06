$(document).ready(function() {

  $('.send-message').hide(); //=> Hide buttons on page load

  $('.send-message-text').on('input', function() { //=> Show buttons if textbox is not empty
    if ($(this).val().length === 0) {
      $(this).siblings('.send-message').hide();
    } else {
      $(this).siblings('.send-message').show();
    }
  });

  $('.send-message').on('click', function() { //=> Send alert on successful post
    alert("Message sent!");
  });
});
