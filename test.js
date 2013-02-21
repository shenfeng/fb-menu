
(function () {


  var $story = $('.story');

  var $content = $('#content'),
      $body = $('html body');

  // var $page = $('#page');
  for(var i = 0; i < 20; i++) {
    $content.append($story.clone());
  }

  $content[0].scrollTop = 0;


  // alert($content[0].scrollHeight)

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


  // return;
  $content.css({
    height: window.innerHeight - 50 - 50
    // overflowY: 'scroll',
    // overflowX: 'hidden'
  });

})();