// Projects page: card symbols, and an ink tree that sways and now and then catches a gust
document.querySelectorAll('[data-symbol]').forEach(svg => { svg.innerHTML = SYMBOLS[svg.dataset.symbol]; });

const treeSvg = document.querySelector('.tree-scene .tree');
const TREE_DEPTH = 6;
const tree = growTree(treeSvg, { seed: 7, x: 330, y: 790, length: 170, depth: TREE_DEPTH, spread: .62, lean: -.06 });

// A few leaves tear off with each gust and drift away to the left
function blowLeaves(count) {
  const m = treeSvg.getScreenCTM();
  for (let k = 0; k < count; k++) {
    const src = tree.leaves[Math.floor(Math.random() * tree.leaves.length)];
    const pt = new DOMPoint(src.x, src.y).matrixTransform(m);
    const leaf = document.createElement('div');
    leaf.className = 'blown-leaf' + (Math.random() < .4 ? ' green' : '');
    leaf.style.left = pt.x + 'px';
    leaf.style.top = pt.y + 'px';
    document.querySelector('.tree-scene').appendChild(leaf);
    const dx = -(180 + Math.random() * 320), dy = 60 + Math.random() * 160;
    leaf.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
      { opacity: .8, offset: .1 },
      { transform: `translate(${dx * .5}px, ${dy * .3}px) rotate(${200 + Math.random() * 160}deg)`, offset: .5 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${420 + Math.random() * 240}deg)`, opacity: 0 },
    ], { duration: 4200 + Math.random() * 2000, delay: k * 260, easing: 'ease-out', fill: 'backwards' })
      .finished.then(() => leaf.remove());
  }
}

function windLoop() {
  const strength = .7 + Math.random() * .6;
  gust(tree.branches, TREE_DEPTH, strength);
  setTimeout(() => blowLeaves(2 + Math.floor(Math.random() * 3)), 500);
  setTimeout(windLoop, 9000 + Math.random() * 7000);
}
if (!reduceMotion) setTimeout(windLoop, 3500);
