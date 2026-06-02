/* Web Lift — before/after drag slider. */

(function () {
  var ba = document.getElementById('ba');
  var before = document.getElementById('baBefore');
  var handle = document.getElementById('baHandle');
  if (!ba || !before || !handle) return;

  var dragging = false;

  function setPosition(clientX) {
    var rect = ba.getBoundingClientRect();
    var pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    handle.style.left = pct + '%';
  }

  var start = function () { dragging = true; };
  var stop = function () { dragging = false; };
  var move = function (e) {
    if (!dragging) return;
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(x);
  };

  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: true });
  window.addEventListener('mouseup', stop);
  window.addEventListener('touchend', stop);
  window.addEventListener('mousemove', move);
  window.addEventListener('touchmove', move, { passive: true });

  ba.addEventListener('click', function (e) {
    if (e.target === handle || handle.contains(e.target)) return;
    setPosition(e.clientX);
  });
})();
