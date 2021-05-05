$(document).ready(function() {

  $('.favorite').hover(
    function() {
      $(this).css("box-shadow", "5px 5px 1px 0px #AAAAAA");
    }, function() {
      $(this).css("box-shadow", "none");
    }
  );

  $('.favorite').on('click', function() {
    const listing = $(this).find('.id').text();
    $.get('/listings', function() {
      return document.location.href = `/listings/${listing}`;
    });
  });

  $('.favorite').find('button').on('click', function(event) {
    event.stopPropagation();
  });
});
