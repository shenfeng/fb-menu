(function () {
  var el=document.getElementById('page');
  var scrollStartPos=0;

  var startX = 0;

  el.addEventListener("touchstart", function(event) {
    scrollStartPos = this.scrollTop;
    startX = event.touches[0].pageY;
    event.preventDefault();
  },false);

  el.addEventListener("touchmove", function(event) {
    this.scrollTop = scrollStartPos - (event.touches[0].pageY - startX);
    event.preventDefault();
  },false);
})();