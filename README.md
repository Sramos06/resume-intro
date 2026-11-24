# resume-intro

A prototype for the next version of my resume site. It has an ink-and-paper look, small matcha and coffee accents, and a quiet cultivation-story feel. Each page has its own background scene with small, slow motion. Desktop comes first; mobile comes later.

**Live:** https://sramos06.github.io/resume-intro/

## Pages

| Page | Background scene |
|---|---|
| **Home** (`index.html`) | Mountains in four depths, slow mist between them, a pair of birds now and then |
| **Projects** (`projects.html`) | A lone tree on a hill that sways and catches a gust every 9 to 16 seconds |
| **About** (`about.html`) | A small house on a ledge with warm windows, a flickering lantern, smoke and a tree. The resume is the last section, and Save as PDF prints only the sheet |
| **Repaso case study** (`repaso.html`) | Linked from Projects; clouds over the header and an ink reading line |

The scenes are built in layers so a painted background can replace the still parts later while the moving parts (mist, branches, smoke, lights) keep working.

Moving between pages uses an ink wipe. Everything respects the reduced-motion setting.

## The intro

1. **Collage.** The camera zooms out from the seal while torn-paper cutouts slide in from the edges and ribbons sweep across, then it blurs into a white flash.
2. **Panorama.** One ink landscape is revealed as five tinted slices that bloom in on the beat. A vertical word column gets pushed right by each slice, while ribbons loop in front.
3. **Exit.** A blur-zoom with a shake fades straight into the home page.

It plays once per visit. **Replay intro** on the main page plays it again.

## How it's built

Plain HTML, CSS and JavaScript with no build step and no libraries.

- `common.js` holds the shared pieces: seeded mountain ridgelines, trees and wind gusts, the SVG symbol set, scroll reveals and the page wipe.
- The animations use the Web Animations API and CSS. The trees are grown from a seeded branching function in `common.js`, one SVG group per branch, so a sway near the trunk carries everything above it.
- Art and symbol plans are in [`docs/art-ideas.md`](docs/art-ideas.md).

## Run locally

```sh
python -m http.server 5520
```

Then open http://localhost:5520.
