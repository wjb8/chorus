$(document).ready(function() {
  console.log('loaded');

  $('.reply').on('submit', function(event) {
    event.preventDefault();
    const fromUser = $('.current-user').text();
    const toUser = $(this).parent().find('.from-user-id').text();
    const listing = $(this).parent().find('.listing-id').text();
    const message = $(this).find('textarea').val();
    let data = {fromUser, toUser, listing, message};

    $.post("/messages/reply", data, function(response) {
      alert("Message sent!");
      return document.location.href = '/messages';
    }).catch(err => console.log('error:', err));

  });
});
