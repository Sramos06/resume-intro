// Case study: an ink line that fills as you read, the current section lit up, stats that count up
const article = document.querySelector('.case article');
const ink = document.querySelector('.rail .ink');
const railLinks = [...document.querySelectorAll('.rail a')];

function progress() {
  const r = article.getBoundingClientRect();
  const p = Math.min(Math.max((innerHeight * .5 - r.top) / r.height, 0), 1);
  ink.style.setProperty('--p', p);
}
addEventListener('scroll', progress, { passive: true });
addEventListener('resize', progress);
progress();

// A section counts as current while it crosses the middle of the screen
const sectionSpy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) railLinks.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
article.querySelectorAll('section').forEach(s => sectionSpy.observe(s));

const counter = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  counter.unobserve(e.target);
  if (reduceMotion) return;
  const end = +e.target.dataset.count, t0 = performance.now();
  (function tick(now) {
    const t = Math.min((now - t0) / 1200, 1);
    e.target.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  })(t0);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));
