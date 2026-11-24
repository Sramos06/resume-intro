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

// Main page: three layers, pale and tall in the back, dark and low in front
document.querySelector('.ridges').innerHTML =
  ridgeSVG(11, 170, 150, '#d6d0c4') +
  ridgeSVG(27, 215, 110, '#aba597') +
  ridgeSVG(43, 265, 60, '#2a2926');
