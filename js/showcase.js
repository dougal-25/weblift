/* Web Lift — device showcase: flick through example screens (desktop + phone in
   sync) and drive the three browser-bar dots as a progress indicator so the
   sequence reads as "loading", one example at a time. */

(function () {
  var DURATION = 2800; // ms per example — MUST match the dotfill animation in home.css

  var groups = document.querySelectorAll('[data-showcase-group]');
  groups.forEach(function (group) {
    var sets = group.querySelectorAll('.showcase__screens');
    if (!sets.length) return;
    var slides = sets[0].querySelectorAll('.showcase__screen').length;
    if (slides < 2) return;
    var dots = group.querySelectorAll('.showcase__bar span');

    function show(n) {
      // swap the active screen in every device (desktop + phone) together
      sets.forEach(function (set) {
        var screens = set.querySelectorAll('.showcase__screen');
        screens.forEach(function (s, idx) { s.classList.toggle('is-active', idx === n); });
      });
      // light + fill the matching dot; restart its fill animation each cycle
      dots.forEach(function (d, idx) {
        var on = idx === n;
        d.classList.toggle('is-on', on);
        d.classList.remove('filling');
        if (on) { void d.offsetWidth; d.classList.add('filling'); } // reflow to replay
      });
    }

    var i = 0;
    show(0);
    setInterval(function () { i = (i + 1) % slides; show(i); }, DURATION);
  });
})();
