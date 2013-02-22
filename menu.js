function log () {
  return;
  var l = "";
  for(var i = 0; i < arguments.length; i++) {
    var a = arguments[i];
    if(typeof a === 'object') {
      l += JSON.stringify(a) + ', ';
    } else {
      l += a + ', ';
    }
  }
  console.log(l);
}


(function () {
  "use strict"
  var MENU_WIDTH = 200;

  var $page = $('#page-wrap'),
      footer = $('#footer')[0],
      header = $('#header')[0],
      page = $page[0],
      $body = $('html body');

  var startX, startY, moveX, moveY, distanceX = 0,
      matrix, m41 = 0,
      shouldOpenMenu = false, shouldCloseMenu = false,
      menuOpen = false, menuOpening = false, menuClosing = false,
      startTime = 0;

  var transitionEnd = whichTransitionEvent();

  var in_progress = false;

  // remove animation time
  $page.bind(transitionEnd, function () { $body.removeClass('menu-opening'); });

  $('h1').click(function () { if(menuOpen) { closeMenu(); } else { openMenu(); } });

  $page.bind('touchstart', function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
    startTime = new Date();
    in_progress = false;
    shouldOpenMenu = false;
    shouldCloseMenu = false;
    matrix = new WebKitCSSMatrix(page.style.webkitTransform);
    m41 = matrix['m41'];
    // log("start", startX, startY);
  }).bind('touchmove', function (event) {
    moveX      = event.changedTouches[0].pageX;
    moveY      = event.changedTouches[0].pageY;
    distanceX  = moveX - startX;
    var distanceY  = moveY - startY,
        movedLeft  = distanceX < 0,
        movedRight = distanceX > 5;

    if(!in_progress) {
      if(Math.abs(distanceX) > 8 && // first move
         Math.abs(distanceY) < Math.abs(distanceX) ) {
        in_progress = true;
      }
    }
    if(in_progress && Math.abs(distanceY) < 50) { // 50 is too many
      event.preventDefault();   // othewise, touchcancel
      in_progress = true;

      var dx = Math.max(0, Math.min(distanceX + m41, MENU_WIDTH));
      applyTransform('translate3d(' + dx + 'px, 0 , 0)');

      if(!menuOpen) {
        shouldOpenMenu = dx > MENU_WIDTH / 2;
      }
      if(menuOpen) {
        shouldCloseMenu = dx < MENU_WIDTH / 2;
      }
    } else {
      in_progress = false;
    }
  }).bind('touchend', function (event) {
    handle_cancel_end();
    log('end');
  }).bind('touchcancel', function (event) {
    handle_cancel_end();
    log('cancel');
  });

  function applyTransform (transform) {
    if(transform) {
      page.style.webkitTransform = transform;
      footer.style.webkitTransform = transform;
      header.style.webkitTransform = transform;
    } else {
      page.style.removeProperty('-webkit-transform');
      footer.style.removeProperty('-webkit-transform');
      header.style.removeProperty('-webkit-transform');
    }
  }

  function handle_cancel_end () {
    var ts = new Date() - startTime;
    log("ts="+ ts, "x=" + distanceX, 'open=' + menuOpen);
    if(in_progress && ts < 130) { // enough distance in a short time
      if(distanceX < -15 && menuOpen) {
        shouldCloseMenu = true;
      }
      if(distanceX > 15 && !menuOpen) {
        shouldOpenMenu = true;
      }
    }

    if(menuOpen) {
      if(shouldCloseMenu) { closeMenu(); }
      else { openMenu(); }
    } else {
      if(shouldOpenMenu) { openMenu(); }
      else { closeMenu(); }
    }
  }

  function openMenu () {
    menuOpen = true;
    $body.addClass('menu-opening');
    $body.addClass('menu-open');
    applyTransform('translate3d(200px, 0 , 0)');
  }

  function closeMenu () {
    menuOpen = false;
    $body.addClass('menu-opening');
    $body.removeClass('menu-open');
    applyTransform();
  }

  function whichTransitionEvent() {
    var t, el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'oTransitionEnd',
      'MSTransition':'msTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for (t in transitions) {
      if( el.style[t] !== undefined ) {
        return transitions[t];
      }
    }
  }
})();
