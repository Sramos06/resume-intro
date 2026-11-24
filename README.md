# resume-intro

An animated intro for my resume site. It's a prototype for the next version, with an ink-and-paper look, small matcha and coffee accents, and a quiet cultivation-story feel.

**Live:** https://sramos06.github.io/resume-intro/

## What happens

1. **Panel pop-in.** Five ink and paper panels pop in one at a time on a beat, each with a small flash and screen shake.
2. **Swallow.** The side panels fly off and the center mountain panel grows until it fills the screen.
3. **Fly-forward.** Ridgelines rush toward the camera out of the mist while ink streaks speed out from the center.
4. **Landing.** The scene fades into the main page, with mountain ridges drifting slowly behind the name.

You can skip the intro, and it's skipped entirely when the device asks for reduced motion.

## How it's built

Plain HTML, CSS and JavaScript with no build step and no libraries.

- The mountains are SVG paths generated from seeded sine waves, so they look the same on every load.
- The panel and fly animations use the Web Animations API, and the fly-through is a CSS 3D perspective scene.
- The ink streaks are drawn on a `<canvas>`.

## Run locally

```sh
python -m http.server 5520
```

Then open http://localhost:5520.
