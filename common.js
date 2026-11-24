// Shared by every page: seeded mountains, current-page nav, scroll reveals, ink page wipe
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Seeded random so the mountains look the same on every load
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// A ridgeline in a 1000x300 box: sharp peaks from a powered sine, plus two softer waves
function ridgePath(seed, base, height) {
  const r = mulberry32(seed);
  const f = [0.004 + r() * 0.004, 0.011 + r() * 0.01, 0.03 + r() * 0.02];
  const p = [r() * 6, r() * 6, r() * 6];
  let d = `M0 300 L0 ${base}`;
  for (let x = 0; x <= 1000; x += 10) {
    const peak = Math.pow(Math.abs(Math.sin(x * f[0] + p[0])), 2.2);
    const y = base - height * peak
      - height * 0.25 * Math.sin(x * f[1] + p[1])
      - height * 0.08 * Math.sin(x * f[2] + p[2]);
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d + ' L1000 300Z';
}

function ridgeSVG(seed, base, height, fill) {
  return `<svg viewBox="0 0 1000 300" preserveAspectRatio="none"><path d="${ridgePath(seed, base, height)}" fill="${fill}"/></svg>`;
}

// Symbols drawn in a 100x100 box and colored by currentColor (the seal keeps its own colors)
const SYMBOLS = {
  peaks: '<path d="M0 100 V72 L18 48 L30 62 L50 22 L68 58 L80 46 L100 70 V100Z" fill="currentColor"/>',
  moon: '<path d="M60 18 A32 32 0 1 0 60 82 A40 40 0 0 1 60 18Z" fill="currentColor"/>',
  sword: '<path d="M50 6 L54 16 V70 H46 V16Z M36 70 H64 V74 H36Z M48 74 H52 V90 H48Z" fill="currentColor"/><circle cx="50" cy="93" r="3.5" fill="currentColor"/>',
  brush: '<path d="M22 84 C 34 40, 62 92, 78 18" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>',
  pine: '<path d="M50 8 L70 40 H58 L76 66 H56 V92 H44 V66 H24 L42 40 H30Z" fill="currentColor"/>',
  cloud: '<path d="M14 66 C4 66 4 50 16 50 C16 36 34 34 38 44 C42 28 66 28 66 46 C80 44 88 62 74 66Z" fill="currentColor"/>',
  leaf: '<path d="M50 92 C20 70 20 30 50 8 C80 30 80 70 50 92Z" fill="currentColor"/>',
  seal: '<rect x="14" y="14" width="72" height="72" fill="#7e9466"/><text x="50" y="66" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="46" font-weight="600" fill="#f6f3ec">S</text>',
};
const symbol = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">${SYMBOLS[name]}</svg>`;

// Mark the nav link for this page
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
  if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
});

// Reveal [data-reveal] elements once as they scroll into view
const revealer = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  revealer.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('[data-reveal]').forEach(el => revealer.observe(el));

// Ink wipe: covers the screen before leaving a page, uncovers it on arrival
const wipe = document.createElement('div');
wipe.className = 'wipe';
document.body.appendChild(wipe);
const WIPE = { duration: 520, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' };

if (sessionStorage.getItem('wiping') && !reduceMotion) {
  sessionStorage.removeItem('wiping');
  wipe.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }], WIPE);
}

document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a || reduceMotion || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname === location.pathname) return;
  e.preventDefault();
  sessionStorage.setItem('wiping', '1');
  wipe.animate([{ transform: 'translateX(-101%)' }, { transform: 'translateX(0)' }], WIPE)
    .finished.then(() => { location.href = url.href; });
});

// Coming back through the browser's back button restores the page mid-wipe, so clear it
addEventListener('pageshow', e => {
  if (e.persisted) wipe.getAnimations().forEach(a => a.cancel());
});
