// About page: symbols, print button, staggered skill underlines, and the house scene
document.querySelectorAll('[data-symbol]').forEach(svg => { svg.innerHTML = SYMBOLS[svg.dataset.symbol]; });
document.querySelector('.print-btn').addEventListener('click', () => print());

document.querySelectorAll('.skills ul').forEach(ul =>
  [...ul.children].forEach((li, k) => li.style.setProperty('--k', k)));

// A small tree beside the house, with lighter gusts than the one on Projects
const houseSvg = document.querySelector('.house-scene .house');
const HOUSE_TREE_DEPTH = 5;
const houseTree = growTree(houseSvg, { seed: 21, x: 585, y: 386, length: 70, depth: HOUSE_TREE_DEPTH, spread: .55, lean: .08 });

function breeze() {
  gust(houseTree.branches, HOUSE_TREE_DEPTH, .5 + Math.random() * .3);
  setTimeout(breeze, 11000 + Math.random() * 8000);
}
if (!reduceMotion) setTimeout(breeze, 4000);
