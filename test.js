(function () {
  var $story = $('.story');

  var $page = $('#page'),
      $body = $('html body');

  // var $page = $('#page');
  for(var i = 0; i < 10; i++) {
    $page.append($story.clone());
  }

  var transitionEnd = whichTransitionEvent();

  (function () {
    $('h1').click(function () {
      // $('')
      // $('#page, #footer, #header').toggleClass('open');
      $body.addClass('menu-opening');
      $body.toggleClass('menu-open');
      //
      //
      // alert('clicked');
    });
  })();

  $(document).click(function () {
    // $('html body').toggleClass('menu-open');
    // alert('-------');
  });

  $page.bind(transitionEnd, function () {
    $body.removeClass('menu-opening');
  });

  // $page.addEventListener(transitionEnd, function () {
  // });


  function whichTransitionEvent() {
    var t, el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'oTransitionEnd',
      'MSTransition':'msTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };page

    for (t in transitions) {
      if( el.style[t] !== undefined ) {
        return transitions[t];
      }
    }
  }

})();