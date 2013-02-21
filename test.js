
(function () {


  var $story = $('.story');

  var $page = $('#page'),
      $body = $('html body');

  // var $page = $('#page');
  for(var i = 0; i < 10; i++) {
    $page.append($story.clone());
  }

  $(document).click(function () {
    // $('html body').toggleClass('menu-open');
    // alert('-------');
  });

  $('.story img').click(function () {
    var $me = $(this).closest('.story');
    if($me.hasClass('open')) { $me.removeClass('open'); }
    else {
      $('.story.open').removeClass('open');
      $me.addClass('open');
    }
    // $(this).parents
  });

  // $page.addEventListener(transitionEnd, function () {
  // });



})();