// Home page: ridges, then the intro and fly-through (helpers live in common.js)

// Main page: three layers, pale and tall in the back, dark and low in front
document.querySelector('.ridges').innerHTML =
  ridgeSVG(11, 170, 150, '#d6d0c4') +
  ridgeSVG(27, 215, 110, '#aba597') +
  ridgeSVG(43, 265, 60, '#2a2926');

// ---------- Intro ----------
const wait = ms => new Promise(r => setTimeout(r, ms));
const intro = document.getElementById('intro');
const stage = intro.querySelector('.stage');
const flash = intro.querySelector('.flash');
const panels = [...intro.querySelectorAll('.panel')];

// Each panel lands slightly off-grid so the row feels cut-in, not laid out
const pose = [
  { dy: -4, rot: -3 }, { dy: 3, rot: 2 }, { dy: 0, rot: 0 }, { dy: -3, rot: -2 }, { dy: 4, rot: 3 },
];
const place = (i, extra = '') => `${extra} translateY(${pose[i].dy}vh) rotate(${pose[i].rot}deg)`;

let done = false;

function pop(i) {
  panels[i].animate([
    { opacity: 0, transform: place(i, 'scale(.3)') + ` rotate(${pose[i].rot * 4}deg)` },
    { opacity: 1, transform: place(i, 'scale(1.12)'), offset: .55 },
    { opacity: 1, transform: place(i, 'scale(1)') },
  ], { duration: 320, easing: 'cubic-bezier(.2,.9,.3,1.2)', fill: 'forwards' });
  flash.animate([{ opacity: .22 }, { opacity: 0 }], { duration: 180 });
  stage.animate([
    { transform: 'translate(0,0)' }, { transform: 'translate(-6px,3px)' },
    { transform: 'translate(4px,-2px)' }, { transform: 'translate(0,0)' },
  ], { duration: 180 });
}

// The four side panels fly off; the center one grows until it covers the screen
async function swallow() {
  panels.forEach((p, i) => {
    if (i === 2) return;
    const side = i < 2 ? -1 : 1;
    p.animate([
      { opacity: 1, transform: place(i) },
      { opacity: 0, transform: place(i, `translateX(${side * 70}vw)`) + ` rotate(${side * 25}deg)` },
    ], { duration: 480, easing: 'cubic-bezier(.6,0,.9,.4)', fill: 'forwards' });
  });
  const c = panels[2], box = c.getBoundingClientRect();
  const s = Math.max(innerWidth / box.width, innerHeight / box.height) * 1.3;
  c.querySelector('svg').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, delay: 200, fill: 'forwards' });
  await c.animate([
    { transform: 'scale(1)' }, { transform: `scale(${s})` },
  ], { duration: 720, delay: 120, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }).finished;
}

// ---------- Fly-through ----------
const fly = document.getElementById('fly');
const scene = fly.querySelector('.scene');
const canvas = fly.querySelector('canvas');
const LAYERS = 7, LAYER_MS = 1900, STAGGER = 170;

// Ink streaks radiating from the vanishing point, speeding up as we fly
function streaks(duration) {
  const dpr = devicePixelRatio || 1;
  const w = canvas.width = innerWidth * dpr, h = canvas.height = innerHeight * dpr;
  const ctx = canvas.getContext('2d');
  const cx = w * .5, cy = h * .42, maxR = Math.hypot(w, h) * .6;
  const pts = Array.from({ length: 140 }, () => ({
    a: Math.random() * Math.PI * 2,
    r: Math.random() * maxR,
    v: .15 + Math.random() * .5,
    green: Math.random() < .1,
  }));
  const start = performance.now();
  let last = start;
  (function frame(now) {
    const t = Math.min((now - start) / duration, 1), dt = now - last;
    last = now;
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    const alpha = Math.min(t * 2.5, 1) * (1 - Math.max(0, t - .85) / .15) * .4;
    for (const p of pts) {
      p.r += p.v * dt * dpr * (1 + 9 * t * t);
      if (p.r > maxR) p.r = Math.random() * maxR * .15;
      const len = (6 + 70 * t) * dpr * (p.r / maxR + .2);
      const cos = Math.cos(p.a), sin = Math.sin(p.a);
      ctx.strokeStyle = p.green ? `rgba(126,148,102,${alpha * 1.6})` : `rgba(20,20,19,${alpha})`;
      ctx.lineWidth = (p.green ? 2 : 1.2) * dpr;
      ctx.beginPath();
      ctx.moveTo(cx + cos * p.r, cy + sin * p.r);
      ctx.lineTo(cx + cos * (p.r + len), cy + sin * (p.r + len));
      ctx.stroke();
    }
    if (t < 1 && !done) requestAnimationFrame(frame);
  })(start);
}

// Ridges start far back and pass just in front of the camera, one after another
async function flyThrough() {
  scene.innerHTML = '';
  fly.classList.add('on');
  let last;
  for (let i = 0; i < LAYERS; i++) {
    const layer = document.createElement('div');
    layer.className = 'layer';
    layer.style.left = `${-60 + (i % 2 ? 12 : -12)}vw`;
    layer.innerHTML = ridgeSVG(100 + i * 7, 150 + (i % 3) * 25, 120, i % 2 ? '#55524b' : '#2a2926');
    scene.appendChild(layer);
    last = layer.animate([
      { transform: 'translateZ(-3200px)', opacity: 0 },
      { opacity: .5, offset: .15 },
      { opacity: 1, offset: .8 },
      { transform: 'translateZ(650px)', opacity: 0 },
    ], { duration: LAYER_MS, delay: i * STAGGER, easing: 'cubic-bezier(.55,0,.9,.6)', fill: 'both' });
  }
  streaks(LAYER_MS + (LAYERS - 1) * STAGGER);
  // Drop the intro as soon as the paper-white fly scene is underneath it
  document.getElementById('intro').style.visibility = 'hidden';
  await last.finished;
}

function showHome() {
  if (done) return;
  done = true;
  document.body.classList.remove('intro-on');
  if (fly.classList.contains('on')) {
    fly.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, fill: 'forwards' })
      .finished.then(() => fly.classList.remove('on'));
  }
  document.querySelectorAll('.reveal').forEach((el, i) => el.animate([
    { opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' },
  ], { duration: 700, delay: 80 * i, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
}

async function playIntro() {
  // Once per visit: someone clicking back to Home shouldn't sit through it again
  const forced = new URLSearchParams(location.search).has('intro');
  if (reduceMotion || (sessionStorage.getItem('introSeen') && !forced)) return showHome();
  sessionStorage.setItem('introSeen', '1');
  await wait(500);
  for (let i = 0; i < panels.length && !done; i++) { pop(i); await wait(270); }
  await wait(450);
  if (done) return;
  await swallow();
  if (done) return;
  await flyThrough();
  showHome();
}

document.getElementById('skip').addEventListener('click', showHome);
document.getElementById('replay').addEventListener('click', () => { location.href = 'index.html?intro'; });
playIntro();
