// About page: symbols, staggered skill underlines, and specks of light rising like qi
document.querySelectorAll('[data-symbol]').forEach(svg => { svg.innerHTML = SYMBOLS[svg.dataset.symbol]; });
document.querySelectorAll('.skills ul').forEach(ul =>
  [...ul.children].forEach((li, k) => li.style.setProperty('--k', k)));

const cv = document.querySelector('.ambient');
const ctx = cv.getContext('2d');
let W, H, dpr;
function size() {
  dpr = devicePixelRatio || 1;
  W = cv.width = innerWidth * dpr;
  H = cv.height = innerHeight * dpr;
}
size();
addEventListener('resize', size);

function spawn(anywhere) {
  return {
    x: Math.random(),
    y: anywhere ? Math.random() : 1.03,
    r: .8 + Math.random() * 2.2,
    vy: .000025 + Math.random() * .00004,
    phase: Math.random() * 6,
    green: Math.random() < .5,
  };
}
const motes = Array.from({ length: 46 }, () => spawn(true));

let last = performance.now();
function frame(now) {
  const dt = Math.min(now - last, 50);
  last = now;
  ctx.clearRect(0, 0, W, H);
  for (const m of motes) {
    m.y -= m.vy * dt;
    m.phase += dt * .0015;
    if (m.y < -.03) Object.assign(m, spawn(false));
    // Fade in from the bottom and out near the top, flickering slightly on the way
    const fade = Math.min(1, (1 - m.y) * 4, m.y * 4) * (.6 + .4 * Math.sin(m.phase * 2));
    ctx.fillStyle = m.green ? `rgba(126,148,102,${.45 * fade})` : `rgba(107,84,67,${.3 * fade})`;
    ctx.beginPath();
    ctx.arc((m.x + Math.sin(m.phase) * .01) * W, m.y * H, m.r * dpr, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(frame);
}
if (!reduceMotion) requestAnimationFrame(frame);
