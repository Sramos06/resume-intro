# Art and symbol ideas

The look is ink on paper, with matcha and coffee as small accents, and a cultivation-story feel that never shows up in the words. Symbols are SVG so they stay sharp, recolor with CSS and can animate. Painterly pieces (textures, misty landscapes) are images.

## Symbols

Already in `common.js` (`SYMBOLS`):

| Symbol | Used on | Meaning on the site |
|---|---|---|
| Peaks | Intro, Hygears card | Something still being climbed |
| Moon | Intro, Alert Simulator card | Quiet research, late nights |
| Sword | Intro, Daoborn card, About | Games, the cultivation side |
| Brush | Intro, Repaso card, About | Writing and making things |
| Pine | Intro, About | Patience, long projects |
| Cloud | Intro, Ordering System card | Older work, drifting past |
| Leaf | Intro, Resume Website card, About | Small, finished things |
| Seal (S) | Logo, intro, resume stamp | Me |

Next to draw:

- **Spirit stone**: a faceted crystal for skill levels or "currently learning".
- **Cauldron**: for a "What I'm working on now" section.
- **Crane**: for contact, a message flying off.
- **Gate (torii-like arch, kept generic)**: for the 404 page.
- **Scroll tied with cord**: for the resume download.
- **Lotus**: for certificates once I start collecting them.
- **Lightning fork**: for big milestones; ties into the tribulation animation I made in multimedia class.
- **Personal sect emblem**: a circle with my initials worked into mountains. It could replace the plain S seal as the logo.

## Art per page

| Page | Art idea | Motion |
|---|---|---|
| Home | A wide ink-wash mountain panorama behind the name, one peak slightly taller | Ridges drift; mist rolls across every ~20 s |
| Projects | Hanging scrolls on a wall, faint brush-stroke texture on each | Scrolls sway very slightly on hover |
| Case study | A cloud sea under the header, a single brush stroke as the reading line | Clouds drift, the brush tip breathes |
| About | An ensō around my seal; later a hand-drawn portrait in ink | The ensō redraws itself |
| Resume | Rice-paper texture on the sheet, a red-brown or matcha seal | The seal stamps in once |
| 404 | A closed gate in fog: "this path doesn't exist yet" | Fog moves through the gate |

## Small details

- Section dividers as a single dry-brush stroke instead of a straight line.
- Custom cursor: a small ink dot that leaves a short fading trail.
- Scrollbars in ink and matcha, like Repaso's themed scrollbars.
- A tiny seal next to every finished project, a half-drawn ensō next to in-progress ones.
- Loading or empty states as a mountain slowly inking itself in.

## Which tool for what

- **SVG (Claude):** every symbol, the logo, dividers, the ensō, anything that needs to animate or recolor.
- **Gemini, by hand:** painterly textures and backgrounds. Generate on white so they can be cut out or multiplied onto the paper color. Example prompts:
  - "Seamless rice paper texture, off-white, subtle fibers, flat even lighting, no objects."
  - "Minimal Chinese ink-wash mountain range, black ink on white paper, lots of empty space, soft mist at the base, no text, no people."
  - "Single dry brush stroke in black ink on white paper, horizontal, textured edges, isolated."
  - "Ink-wash sea of clouds seen from above a mountain peak, monochrome, soft, wide."
- Keep generated art free of anything from existing series. Everything on the site should be mine or made for it.
