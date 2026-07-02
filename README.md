# Jungle Museum Portfolio — Piyush Gupta

A premium, single‑page personal portfolio staged as a jungle‑ruins museum. The whole experience
lives inside one `100vh` hero — **no routes, no scrolling, no page reloads**. Six **stone pillars**
standing in a clearing *are* the navigation; click one (or step to it with `←`/`→`/`A`/`D`) and a
walking character heads over, the pillar rises out of the ground, and a frosted stone‑tablet
"information panel" opens in place. The expedition title stays fixed in its own zone, so the name
is always clear.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Geist**.
The jungle (canopy, dappled light, stone pillars, undergrowth, walking path) is recreated in
**pure CSS** — no images, no 3D engine — so it loads instantly and animates at 60 FPS. The one
exception is the walking character itself, rendered from a small image asset (see
[Customise](#customise)).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## How it works

| Path | Role |
| --- | --- |
| `lib/content.ts` | **Single source of truth** — every word and link. Edit here. |
| `app/globals.css` | Design tokens + the entire jungle scene (canopy, ground, pillars, character, panel, chips). |
| `components/Museum.tsx` | Scene root: subtle parallax, the `station`/`active` walk‑and‑open state machine, keyboard stepping (`←`/`→`/`A`/`D`), measures each pillar's box so the character knows where to walk. |
| `components/Pillar.tsx` | One stone pillar (carved shaft, catalog number, plinth "box") that rises when its exhibit is open, with a light‑cone/glow. |
| `components/Character.tsx` | The walking character sprite — position, walking bounce and left/right flip are all driven by Framer Motion values from `Museum.tsx`. |
| `components/InfoPanel.tsx` | The stone‑tablet panel shell; swaps content with `AnimatePresence` (only one open at a time). |
| `components/panels/*` | The six exhibit bodies: About, Experience, Projects, Skills, Résumé, Contact. |
| `components/icons.tsx` | Hand‑rolled GitHub / LinkedIn / LeetCode marks (modern lucide drops brand icons). |

## Customise

Almost everything is data‑driven from **`lib/content.ts`**:

- **Social links** — `siteConfig.socials` (GitHub, LinkedIn, LeetCode), `email`, `phone`.
- **Add a photo** — drop e.g. `me.jpg` into `public/` and set `siteConfig.photo = "/me.jpg"`.
  Until then an elegant **"PG" monogram** is shown automatically.
- **Résumé** — replace `public/Piyush-Gupta-Resume.pdf` (keep the name, or update
  `siteConfig.resumeUrl` / `resumeFileName`). Powers the preview + Download / Open PDF buttons.
- **Experience / Projects / Skills** — edit the `experience`, `projects`, `skillGroups` arrays.
  Project cards use a neutral CSS placeholder; add real screenshots later if you like.
- **Exhibits** — `EXHIBITS` holds each stone pillar (`label`, catalog `index`, plaque `caption`).
- **Character** — `components/Character.tsx` points `CHARACTER_SRC` at
  `public/character-placeholder.svg`. Drop in a real asset (transparent PNG/SVG, facing one
  direction — it's mirrored automatically for the other) and update that one constant.

The **Contact form** composes a pre‑filled `mailto:` to your address (no backend, deploys anywhere).

## Deploy

Zero‑config on **Vercel**: push to GitHub and import, or run `vercel`. It's a fully static export
of one page, so any static host works too.

## Notes

- Respects `prefers-reduced-motion` (parallax, walking bounce and panel transitions all snap
  instantly instead of animating).
- Click any pillar's plinth to walk there, or use `←`/`→`/`A`/`D` to step between exhibits —
  either way only opens the panel once the character actually arrives.
- Project "GitHub" buttons currently point at the GitHub profile — set each project's `github`
  (and optional `demo`) in `lib/content.ts` to link specific repos.
