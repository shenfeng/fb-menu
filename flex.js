
(function () {
  var $story = $('.story');

  var $page = $('#page'),
      $body = $('html body');

  // var $page = $('#page');
  for(var i = 0; i < 10; i++) {
    $page.append($story.clone());
  }
})();