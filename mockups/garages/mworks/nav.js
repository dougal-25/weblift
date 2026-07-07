/* MWorks mockup — mobile nav toggle. The shared kit handles scroll reveals +
   the footer year; it has no menu toggle, so this small script adds one. */
(function () {
  var burger = document.querySelector('.nav__burger');
  var links = document.getElementById('navlinks');
  if (!burger || !links) return;

  function close() { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close the drawer after tapping a link
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  // close if resized up to desktop
  window.addEventListener('resize', function () { if (window.innerWidth > 860) close(); });
})();
