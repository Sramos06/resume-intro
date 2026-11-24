# resume-intro

A prototype for the next version of my resume site. It has an ink-and-paper look, small matcha and coffee accents, and a quiet cultivation-story feel. Every page has its own motion, and something is always moving.

**Live:** https://sramos06.github.io/resume-intro/

## Pages

| Page | What moves |
|---|---|
| **Home** (`index.html`) | Intro on the first visit, then mountain ridges drifting behind the name |
| **Projects** (`projects.html`) | Hanging scrolls that unroll into view, bobbing symbols, falling leaves |
| **Repaso case study** (`repaso.html`) | Clouds over the header, an ink reading line with a breathing tip, counting stats |
| **About** (`about.html`) | An ensō that keeps redrawing around the seal, rising specks, inked skill lines |
| **Resume** (`resume.html`) | A sheet that lifts in and gets stamped, ruled sections, drifting color blooms, print-to-PDF layout |

Moving between pages uses an ink wipe. Everything respects the reduced-motion setting.

## The intro

1. **Collage.** The camera zooms out from the seal while torn-paper cutouts slide in from the edges and ribbons sweep across, then it blurs into a white flash.
2. **Panorama.** One ink landscape is revealed as five tinted slices that bloom in on the beat. A vertical word column gets pushed right by each slice, while ribbons loop in front.
3. **Exit.** A blur-zoom with a shake fades straight into the home page.

It plays once per visit. **Replay intro** on the main page plays it again.

## How it's built

Plain HTML, CSS and JavaScript with no build step and no libraries.

- `common.js` holds the shared pieces: seeded mountain ridgelines, the SVG symbol set, scroll reveals and the page wipe.
- The animations use the Web Animations API and CSS. The leaves and specks are drawn on `<canvas>`.
- Art and symbol plans are in [`docs/art-ideas.md`](docs/art-ideas.md).

## Run locally

```sh
python -m http.server 5520
```

Then open http://localhost:5520.
