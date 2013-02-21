(function() {
  var debug = document.querySelectorAll('#debug')[0]

  var body       = document.body
  , viewport   = document.querySelectorAll('#viewport')[0]
  , menu       = document.querySelectorAll('#menu')[0]
  , page       = document.querySelectorAll('#page')[0]
  , closeMask  = document.querySelectorAll('#close-mask')[0]
  , trigger    = page.querySelectorAll('.trigger')[0];

  var body_div = document.querySelectorAll('.body')[0];
  body_div.style.height = (window.innerHeight - 77) + 'px';

  var transitionEnd = whichTransitionEvent();

  trigger.addEventListener('click', function() {
    if (hasClass(body, 'menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeMask.addEventListener('click', function(event) {
    event.preventDefault();
    closeMenu();
  });

  closeMask.addEventListener('touchmove', function(event) {
    event.preventDefault();
  });

  if (('ontouchend' in window)) {
    var startX, startY, moveX, moveY,
        matrix, m41 = 0,
        shouldOpenMenu = false, shouldCloseMenu = false,
        menuOpen = false, menuOpening = false, menuClosing = false;

    page.addEventListener('touchstart', function(event) {
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;

      shouldOpenMenu = false;
      shouldCloseMenu = false;

      matrix = new WebKitCSSMatrix(page.style.webkitTransform)
      m41 = matrix['m41'];
    });

    page.addEventListener('touchmove', function(event) {
      var moveX      = event.changedTouches[0].pageX
      , moveY      = event.changedTouches[0].pageY
      , distanceX  = moveX - startX
      , distanceY  = moveY - startY
      , movedLeft  = distanceX < 0
      , movedRight = distanceX > 5
      , movedVert  = Math.abs(distanceY) > 15;

      // var debugStr = 'x: ' + startX + ', ' + moveX + ', ' + distanceX + '<br>';
      // debugStr = debugStr + 'y: ' + startY + ', ' + moveY + ', ' + distanceY + '<br>';
      // debugStr = debugStr + 'L: ' + movedLeft + ', R: ' + movedRight + ', V: ' + movedVert + '<br>';
      // debugStr = debugStr + 'menuOpen: ' + menuOpen;

      // debug.style.display = 'block';
      // debug.innerHTML = debugStr;

      if (!movedVert) {

        if (!menuOpen && movedRight || menuOpen && movedLeft) {
          event.preventDefault();
          addClass(body, 'menu-moving');
          page.style.webkitTransform = 'translate3d(' + (distanceX + m41) + 'px, 0 , 0)';
        }

        if (!menuOpen && movedRight) {
          shouldOpenMenu = (Math.abs(distanceX) > (body.clientWidth / 2.5));
          shouldCloseMenu = !shouldOpenMenu;
        }

        if (menuOpen && movedLeft) {
          shouldCloseMenu = (Math.abs(distanceX) > (body.clientWidth / 4));
          shouldOpenMenu = !shouldCloseMenu;
        }
      }
    });

    page.addEventListener('touchend', function(event) {
      if (shouldOpenMenu) {
        openMenu();
      }

      if (shouldCloseMenu) {
        closeMenu();
      }
    });
    page.addEventListener('touchcancel', function (event) {
      if (shouldOpenMenu) {
        openMenu();
      }

      if (shouldCloseMenu) {
        closeMenu();
      }
    });
  }

  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 100);

  function openMenu() {
    // set height of the scrollable area to window innerHeight
    menu.style.height = window.innerHeight + 'px';

    page.style.webkitTransform = 'translate3d(260px, 0 , 0)';

    menuOpening = true;

    addClass(body, 'menu-opening');

    page.addEventListener(transitionEnd, function() {
      menuOpen = true;
      menuOpening = false;

      addClass(body, 'menu-open');
      removeClass(body, 'menu-opening');
      removeClass(body, 'menu-moving');

      this.removeEventListener(transitionEnd, arguments.callee, false);
    });
  }

  function closeMenu() {
    page.style.webkitTransform = 'translate3d(0, 0 , 0)';

    menuClosing = true;

    addClass(body, 'menu-closing');

    page.addEventListener(transitionEnd, function() {
      menuOpen = false;
      menuClosing = false;

      removeClass(body, 'menu-open');
      removeClass(body, 'menu-closing');
      removeClass(body, 'menu-moving');

      this.removeEventListener(transitionEnd, arguments.callee, false);
    });
  }

  function hasClass(el, className) {
    className = " " + className + " ";
    return (el.nodeType === 1 && (" " + el.className + " ").replace(/[\n\t\r]/g, " ").indexOf(className) > -1);
  }

  function addClass(el, className) {
    if (!hasClass(el, className)) {
      el.className += (el.className ? ' ' : '') + className;
    }
  }

  function removeClass(el, className) {
    if (hasClass(el, className)) {
      el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
    }
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
