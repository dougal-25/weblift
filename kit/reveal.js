/* Web Lift — scroll reveals + draw-on-scroll underlines/circles.
   Pure vanilla, no dependencies. */

(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  /* Hand-drawn wavy strokes, stretched edge-to-edge to fit the word (a line
     reads right at any width, so no per-word measuring is needed). */
  var SHAPES = {
    underline: {
      viewBox: '0 0 300 22',
      paths: ['M1,13 C52,6 108,7 150,10 C198,13 250,6 299,11']
    }
  };

  /* Inject an SVG underline into each .draw span. */
  function buildDraw(el) {
    var shape = SHAPES.underline;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'draw__svg');
    svg.setAttribute('viewBox', shape.viewBox);
    svg.setAttribute('preserveAspectRatio', 'none');

    var paths = shape.paths.map(function (dStr, i) {
      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', dStr);
      svg.appendChild(path);
      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = reduce ? 0 : len;
      // stagger the two scribble strokes so they draw one after the other
      path.style.transitionDelay = (0.15 + i * 0.22) + 's';
      return path;
    });
    el.appendChild(svg);
    return { el: el, paths: paths };
  }

  var draws = [].map.call(document.querySelectorAll('.draw'), buildDraw);

  function drawIn(d) {
    d.paths.forEach(function (p) { p.style.strokeDashoffset = 0; });
  }

  /* IntersectionObserver triggers reveals + draws as elements enter view. */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var t = entry.target;
        if (t.hasAttribute('data-reveal')) t.classList.add('revealed');
        var d = draws.find(function (x) { return x.el === t; });
        if (d) drawIn(d);
        io.unobserve(t);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
    draws.forEach(function (d) { io.observe(d.el); });
  } else {
    // No observer support (or reduced motion): show everything immediately.
    document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('revealed'); });
    draws.forEach(drawIn);
  }

  /* Stagger helper: any container with [data-stagger] delays its direct children. */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var step = parseFloat(group.getAttribute('data-stagger')) || 0.1;
    [].forEach.call(group.children, function (child, i) {
      child.style.setProperty('--reveal-delay', (i * step) + 's');
    });
  });

  /* Footer year + mobile nav toggle (shared). */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
