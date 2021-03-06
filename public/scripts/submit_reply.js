//Used in /messages for ajax posting a message reply and also hiding the reply box until a message is selected

$(document).ready(function() {
  $('.reply').hide();

  $('.send-reply').hide(); //=> Hide buttons on page load

  $('.reply-text').on('input', function() { //=> Show buttons if textbox is not empty
    if ($(this).val().length === 0) {
      $(this).siblings('.send-reply').hide();
    } else {
      $(this).siblings('.send-reply').show();
    }
  });

  $('.reply').on('submit', function(event) { //=> Handle submit reply; send message keys to server side along with message text
    event.preventDefault();
    const fromUser = $('.current-user').text();
    const toUser = $(this).parent().find('.from-user-id').text();
    const listing = $(this).parent().find('.listing-id').text();
    const message = $(this).find('textarea').val();
    let data = { fromUser, toUser, listing, message };

    $.post("/messages/reply", data, function(response) {
      alert("Message sent!");
      return document.location.href = '/messages';
    }).catch(err => console.log('error:', err));

  });

  $('.message').hover(
    function() {
      $(this).css("box-shadow", "5px 5px 1px 0px #AAAAAA");
    }, function() {
      $(this).css("box-shadow", "none");
    }
  );

  $('.message').on('click', function() {
    $(this).find('.reply').slideDown();
    $(this).find('textarea').focus();
  });

  $('.reply').on('focusout', function() {
    $(this).slideUp();
  });


});
