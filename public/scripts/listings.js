//Listeners used on both favorites and listings pages to add hover affects and make the entire listing a link to the listing view page

$(document).ready(function() {

  $('.listing').hover(
    function() {
      $(this).css("box-shadow", "5px 5px 1px 0px #AAAAAA");
    }, function() {
      $(this).css("box-shadow", "none");
    }
  );

  $('.listing').on('click', function() {
    const listing = $(this).find('.id').text();

    $.get('/listings', function() {
      return document.location.href = `/listings/${listing.trim()}`;
    });
  });

  $('.listing').find('button').on('click', function(event) {
    event.stopPropagation();
  });
});
