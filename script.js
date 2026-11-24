// Home page: the intro (helpers live in common.js)

// Main page: three layers, pale and tall in the back, dark and low in front
document.querySelector('.ridges').innerHTML =
  ridgeSVG(11, 170, 150, '#d6d0c4') +
  ridgeSVG(27, 215, 110, '#aba597') +
  ridgeSVG(43, 265, 60, '#2a2926');

// ---------- Intro ----------
const wait = ms => new Promise(r => setTimeout(r, ms));
const intro = document.getElementById('intro');
const flash = intro.querySelector('.flash');
const collage = intro.querySelector('.collage');
const lineup = intro.querySelector('.lineup');
const slicesEl = lineup.querySelector('.slices');
const word = lineup.querySelector('.word');
let done = false;

const ribbon = (d, color, width, opacity) =>
  `<path d="${d}" stroke="${color}" stroke-width="${width}" stroke-opacity="${opacity}" pathLength="1"/>`;

// Act 1 setup: six cutouts that slide in from the edge nearest to them
const CUTS = [
  { x: 4, y: 7, r: -8, tint: '#d3dcc6', sym: 'peaks', from: [-1, -1] },
  { x: 40, y: -3, r: 3, tint: '#e2d6c4', sym: 'cloud', from: [0, -1] },
  { x: 72, y: 5, r: 6, tint: '#cfd9dc', sym: 'moon', from: [1, -1] },
  { x: 2, y: 63, r: 5, tint: '#e4d3cf', sym: 'leaf', from: [-1, 1] },
  { x: 41, y: 77, r: -4, tint: '#d8d0bc', sym: 'brush', from: [0, 1] },
  { x: 74, y: 65, r: -6, tint: '#d3dcc6', sym: 'pine', from: [1, 1] },
];

// A jagged polygon so each cutout looks torn from paper
function torn(seed) {
  const r = mulberry32(seed), pts = [];
  for (let x = 0; x <= 100; x += 5) pts.push(`${x}% ${r() * 4}%`);
  for (let y = 5; y <= 100; y += 5) pts.push(`${100 - r() * 3}% ${y}%`);
  for (let x = 95; x >= 0; x -= 5) pts.push(`${x}% ${100 - r() * 4}%`);
  for (let y = 95; y > 0; y -= 5) pts.push(`${r() * 3}% ${y}%`);
  return `polygon(${pts.join(',')})`;
}

const cuts = CUTS.map((c, i) => {
  const el = document.createElement('div');
  el.className = 'cut';
  el.style.left = c.x + '%';
  el.style.top = c.y + '%';
  el.innerHTML = `<div class="paper" style="clip-path:${torn(i + 3)}"><div class="art" style="--tint:${c.tint}">${symbol(c.sym)}</div></div>`;
  collage.appendChild(el);
  return el;
});

const backRibbons = collage.querySelector('.ribbons.back');
const frontRibbons = collage.querySelector('.ribbons.front');
backRibbons.innerHTML =
  ribbon('M-100 760 C 300 600, 700 820, 1700 180', '#7e9466', 70, .35) +
  ribbon('M-100 200 C 400 360, 900 40, 1700 520', '#6b5443', 50, .25);
frontRibbons.innerHTML =
  ribbon('M-100 520 C 500 300, 1000 900, 1700 300', '#8fa3ad', 36, .35) +
  ribbon('M-100 880 C 600 700, 1100 760, 1700 600', '#141413', 22, .15);

// Act 2 setup: one wide ink panorama cut into five tinted slices
const SLICES = [
  { tint: '#b98f8a', sym: 'moon' },
  { tint: '#9aae80', sym: 'pine' },
  { tint: '#8fa3ad', sym: 'sword' },
  { tint: '#cdb98d', sym: 'cloud' },
  { tint: '#b5705e', sym: 'seal' },
];
const WORDS = ['BUILD', 'BUILD', 'BUILD', 'BREAKTHROUGH', 'SHAWN'];
const BEATS = [0, 230, 500, 1000, 1800];

function petals(seed) {
  const r = mulberry32(seed);
  let s = '';
  for (let k = 0; k < 14; k++) {
    s += `<ellipse cx="${r() * 100}" cy="${r() * 120}" rx="${2 + r() * 3}" ry="${1 + r() * 2}" transform="rotate(${r() * 180} ${r() * 100} ${r() * 120})"/>`;
  }
  return `<svg class="petals" viewBox="0 0 100 120" preserveAspectRatio="none" fill="rgba(255,255,255,.28)">${s}</svg>`;
}

const slices = SLICES.map((s, i) => {
  const el = document.createElement('div');
  el.className = 'slice' + (i === 2 ? ' mid' : '');
  el.style.setProperty('--tint', s.tint);
  el.style.setProperty('--i', i);
  el.innerHTML = petals(i + 20) + symbol(s.sym, 'sym') +
    `<div class="pano">${ridgeSVG(61, 120, 110, '#55524b')}${ridgeSVG(77, 190, 90, '#141413')}</div>`;
  slicesEl.insertBefore(el, word);
  return el;
});

lineup.querySelector('.ribbons.loop').innerHTML =
  ribbon('M-50 420 C 200 120, 420 620, 620 260 S 900 80, 1050 300', '#7e9466', 7, .8) +
  ribbon('M-50 180 C 260 420, 520 40, 760 380 S 960 520, 1050 200', '#c79a86', 6, .7) +
  ribbon('M-50 560 C 300 380, 600 640, 1050 420', '#8fa3ad', 6, .7);

// ---------- Intro: act 1 ----------
async function actOne() {
  collage.animate([{ transform: 'scale(1.35)' }, { transform: 'scale(1)' }],
    { duration: 2300, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
  collage.querySelector('.title').animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }],
    { duration: 500, easing: 'ease-out', fill: 'backwards' });

  cuts.forEach((el, i) => {
    const c = CUTS[i];
    el.animate([
      { opacity: 0, transform: `translate(${c.from[0] * 30}vw, ${c.from[1] * 30}vh) rotate(${c.r * 3}deg) scale(.8)` },
      { opacity: 1, transform: `translate(${-c.from[0] * .8}vw, ${-c.from[1] * .8}vh) rotate(${c.r}deg) scale(1.04)`, offset: .7 },
      { opacity: 1, transform: `rotate(${c.r}deg)` },
    ], { duration: 560, delay: 250 + i * 150, easing: 'cubic-bezier(.2,.9,.3,1.1)', fill: 'both' });
  });

  // Ribbons sweep through once: a dash travels from one end of the path to the other
  [...backRibbons.children, ...frontRibbons.children].forEach((p, j) => {
    p.style.strokeDasharray = '.55 1.2';
    p.animate([{ strokeDashoffset: .55 }, { strokeDashoffset: -1.2 }],
      { duration: 1500, delay: 300 + j * 180, easing: 'ease-in-out', fill: 'both' });
  });

  await wait(2050);
  if (done) return;
  collage.animate([{ filter: 'blur(0)' }, { filter: 'blur(14px)' }], { duration: 300, fill: 'forwards' });
  await flash.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' }).finished;
  collage.style.visibility = 'hidden';
  lineup.style.visibility = 'visible';
  flash.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: 'forwards' });
}

// ---------- Intro: act 2 ----------
function showWord(i) {
  const letters = [...WORDS[i]];
  const w = slices[0].offsetWidth, h = slices[0].offsetHeight;
  word.style.setProperty('--fs', Math.min(38, h / letters.length * .82) + 'px');
  word.style.left = (i + 1) * w + 'px';
  word.innerHTML = letters.map(ch => `<span>${ch}</span>`).join('');
  [...word.children].forEach((s, k) => s.animate(
    [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }],
    { duration: 220, delay: k * 22, easing: 'ease-out', fill: 'backwards' }));
}

// Soft bloom instead of a hard cut, so each slice is still settling as the next arrives
function bloom(i) {
  const s = i === 2 ? 1.06 : 1;
  slices[i].animate([
    { opacity: 0, filter: 'brightness(1.9) blur(10px)', transform: `translate(-14px, 18px) scale(${s})` },
    { opacity: 1, filter: 'brightness(1) blur(0)', transform: `translate(0, 0) scale(${s})` },
  ], { duration: 520, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
  flash.animate([{ opacity: .14 }, { opacity: 0 }], { duration: 200 });
  showWord(i);
}

async function actTwo() {
  // Foreground ribbons keep looping the whole time
  [...lineup.querySelector('.ribbons.loop').children].forEach((p, j) => {
    p.style.strokeDasharray = '.3 .7';
    p.style.filter = `drop-shadow(0 0 6px ${p.getAttribute('stroke')})`;
    p.animate([{ strokeDashoffset: j * .3 }, { strokeDashoffset: j * .3 - 1 }],
      { duration: 2200 + j * 400, iterations: Infinity });
  });
  let prev = 0;
  for (let i = 0; i < slices.length; i++) {
    await wait(BEATS[i] - prev);
    prev = BEATS[i];
    if (done) return;
    bloom(i);
  }
  await wait(650);
}

// Motion-blur zoom with a shake, revealing the home page underneath
function exitZoom() {
  intro.animate([{ backgroundColor: '#f6f3ec' }, { backgroundColor: 'rgba(246,243,236,0)' }], { duration: 600, fill: 'forwards' });
  return lineup.animate([
    { transform: 'scale(1)', filter: 'blur(0)', opacity: 1 },
    { transform: 'translate(-8px, 4px) scale(1.15)', offset: .15 },
    { transform: 'translate(6px, -3px) scale(1.4)', filter: 'blur(4px)', offset: .35 },
    { transform: 'scale(2.8)', filter: 'blur(18px)', opacity: 0 },
  ], { duration: 620, easing: 'cubic-bezier(.5,0,.9,.5)', fill: 'forwards' }).finished;
}

function showHome() {
  if (done) return;
  done = true;
  document.body.classList.remove('intro-on');
  document.querySelectorAll('.reveal').forEach((el, i) => el.animate([
    { opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' },
  ], { duration: 700, delay: 80 * i, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
}

async function playIntro() {
  // Once per visit: someone clicking back to Home shouldn't sit through it again
  const forced = new URLSearchParams(location.search).has('intro');
  if (reduceMotion || (sessionStorage.getItem('introSeen') && !forced)) return showHome();
  sessionStorage.setItem('introSeen', '1');
  await actOne();
  if (done) return;
  await actTwo();
  if (done) return;
  await exitZoom();
  showHome();
}

document.getElementById('skip').addEventListener('click', showHome);
document.getElementById('replay').addEventListener('click', () => { location.href = 'index.html?intro'; });
playIntro();
