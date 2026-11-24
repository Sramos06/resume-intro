// Projects page: fill in the card symbols, then keep leaves drifting down behind the shelf
document.querySelectorAll('[data-symbol]').forEach(svg => { svg.innerHTML = SYMBOLS[svg.dataset.symbol]; });

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

const leafShape = new Path2D('M0 -10 C 6 -4, 6 4, 0 10 C -6 4, -6 -4, 0 -10Z');

// Positions are fractions of the screen so a resize doesn't scatter them
function spawn(anywhere) {
  return {
    x: Math.random(),
    y: anywhere ? Math.random() : -0.05,
    s: .6 + Math.random() * 1.1,
    vy: .00003 + Math.random() * .00004,
    sway: Math.random() * 6,
    rot: Math.random() * 6,
    vr: (Math.random() - .5) * .002,
    green: Math.random() < .35,
  };
}
const leaves = Array.from({ length: 26 }, () => spawn(true));

let last = performance.now();
function frame(now) {
  const dt = Math.min(now - last, 50);
  last = now;
  ctx.clearRect(0, 0, W, H);
  for (const l of leaves) {
    l.y += l.vy * dt;
    l.sway += dt * .0012;
    l.rot += l.vr * dt;
    if (l.y > 1.05) Object.assign(l, spawn(false));
    ctx.save();
    ctx.translate((l.x + Math.sin(l.sway) * .02) * W, l.y * H);
    ctx.rotate(l.rot);
    ctx.scale(l.s * dpr, l.s * dpr);
    ctx.fillStyle = l.green ? 'rgba(126,148,102,.35)' : 'rgba(107,84,67,.22)';
    ctx.fill(leafShape);
    ctx.restore();
  }
  requestAnimationFrame(frame);
}
if (!reduceMotion) requestAnimationFrame(frame);
