/* WebLift demo page — personalisation from URL params.
   ?biz=&theme=kitchen|bathroom|garden|driveway|pool&loc=&img1..img4=
   All params optional; everything falls back gracefully. */

(function () {
  'use strict';

  var THEMES = {
    kitchen: {
      kicker: 'Kitchen design & installation',
      tagline: 'Kitchens designed around the way you live — and fitted like we live there too.',
      quote: '“The kitchen is the heart of the home — ours are built to prove it.”',
      trust: ['Free design visits', 'Fully insured & guaranteed', 'Rated 5★ by local homeowners'],
      services: [
        ['Full kitchen design', 'From first sketch to final spotlight — a kitchen designed around your space, your habits and your budget.'],
        ['Supply & installation', 'Premium units, stone worktops and appliances, fitted by our own installers. No subcontractor roulette.'],
        ['Refurbishment', 'Love the layout but tired of the look? Doors, worktops and lighting transformed in days, not weeks.']
      ]
    },
    bathroom: {
      kicker: 'Bathroom design & refurbishment',
      tagline: 'Calm, considered bathrooms — designed, supplied and fitted by one team.',
      quote: '“A good bathroom starts your day right. A great one ends it right too.”',
      trust: ['Free design visits', 'Fully insured & guaranteed', 'Rated 5★ by local homeowners'],
      services: [
        ['Complete refurbishment', 'Strip-out to final seal: tiling, plumbing, lighting and finish handled by one accountable team.'],
        ['Walk-in showers & wet rooms', 'Properly tanked, beautifully tiled, built to last — not just built to photograph.'],
        ['Heritage & period bathrooms', 'Modern comfort that respects the age of your home, from fittings to finishes.']
      ]
    },
    garden: {
      kicker: 'Garden design & landscaping',
      tagline: 'Outdoor rooms you’ll actually live in — designed, planted and built to last.',
      quote: '“A garden should earn its keep every month of the year.”',
      trust: ['Free site visits', 'Fully insured & guaranteed', 'RHS-trained planting design'],
      services: [
        ['Garden design', 'A full design service: survey, drawings and planting plans that make sense of your space.'],
        ['Terraces & outdoor kitchens', 'Stone terraces, pergolas and outdoor cooking spaces built for proper entertaining.'],
        ['Planting & maintenance', 'Borders that look after themselves — and a team on call when they don’t.']
      ]
    },
    driveway: {
      kicker: 'Driveways & patios',
      tagline: 'First impressions, laid properly — driveways and patios that stay flat, drain right and look sharp.',
      quote: '“Your driveway is the first thing every visitor sees. Make it count.”',
      trust: ['Free quotes & site visits', 'Fully insured & guaranteed', 'SUDS-compliant drainage'],
      services: [
        ['Block paving & resin', 'Premium block, resin-bound and natural stone finishes, laid on a base that won’t sink.'],
        ['Patios & paths', 'Indian sandstone, porcelain and granite — cut clean, laid level, pointed properly.'],
        ['Drainage & edging', 'The unglamorous bits done right, so the glamorous bits stay that way.']
      ]
    },
    pool: {
      kicker: 'Swimming pools & spas',
      tagline: 'Pools designed, built and maintained by one team — from first dig to first swim.',
      quote: '“A pool should be a pleasure to own, not just to swim in.”',
      trust: ['Free design consultations', 'Fully insured & guaranteed', 'Year-round servicing plans'],
      services: [
        ['Design & construction', 'Indoor and outdoor pools engineered for British weather and built to spec.'],
        ['Renovation & re-lining', 'Tired pools brought back to life: liners, tiling, heating and covers.'],
        ['Servicing & maintenance', 'Chemistry, cleaning and care on a schedule — so your pool is always ready.']
      ]
    }
  };

  function param(name) {
    var v = new URLSearchParams(window.location.search).get(name);
    return v ? v.trim() : '';
  }

  function safeImageUrl(u) {
    return /^https?:\/\//i.test(u) ? u : '';
  }

  function bindText(key, value) {
    document.querySelectorAll('[data-bind="' + key + '"]').forEach(function (el) {
      el.textContent = value;
    });
  }

  var theme = THEMES[param('theme')] ? param('theme') : 'kitchen';
  var t = THEMES[theme];
  var biz = param('biz') || 'Your Business';
  var loc = param('loc');

  document.documentElement.setAttribute('data-theme', theme);
  document.title = biz + ' — a WebLift concept';

  bindText('biz', biz);
  bindText('kicker', t.kicker);
  bindText('tagline', t.tagline);
  bindText('quote', t.quote);
  bindText('trust1', t.trust[0]);
  bindText('trust2', t.trust[1]);
  bindText('trust3', t.trust[2]);
  for (var i = 0; i < 3; i++) {
    bindText('s' + (i + 1) + 't', t.services[i][0]);
    bindText('s' + (i + 1) + 'd', t.services[i][1]);
  }

  // location line only renders when we actually have an area
  if (loc) {
    bindText('loc', loc);
  } else {
    document.querySelectorAll('[data-bind-wrap="loc"]').forEach(function (el) { el.remove(); });
  }

  // images: hero takes img1, gallery takes img1..img4; broken URLs keep the
  // gradient fallback (we preload to verify before swapping the background)
  function setBackgroundIfLoadable(el, url) {
    if (!el || !url) return;
    var probe = new Image();
    probe.onload = function () { el.style.backgroundImage = 'url("' + url + '")'; };
    probe.src = url;
  }

  var imgs = [param('img1'), param('img2'), param('img3'), param('img4')].map(safeImageUrl);
  setBackgroundIfLoadable(document.getElementById('hero-img'), imgs[0]);
  document.querySelectorAll('.gallery__item').forEach(function (el, idx) {
    setBackgroundIfLoadable(el, imgs[idx]);
  });

  // reveal on scroll — except for screenshot/automation captures
  // (?capture=1, appended by the pipeline's screenshot step, or an
  // honest webdriver flag): reveal everything so captures never show
  // blank sections
  var revealEls = document.querySelectorAll('.reveal');
  var isCapture = navigator.webdriver ||
    new URLSearchParams(window.location.search).has('capture');
  if (isCapture) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
