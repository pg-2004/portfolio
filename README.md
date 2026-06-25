# Museum Portfolio — Piyush Gupta

A premium, single‑page personal portfolio that feels like walking through a calm, white
contemporary‑art museum. The whole experience lives inside one `100vh` hero — **no routes, no
scrolling, no page reloads**. Six **framed exhibits hung on the gallery wall** *are* the navigation;
clicking one opens a single frosted‑glass "information panel" in place. The exhibition title stays
fixed in its own zone, so the name is always clear.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Geist**.
The gallery (white walls, ceiling track lighting, framed works, a bench, polished floor) is
recreated in **pure CSS** — no images, no 3D engine — so it loads instantly and animates at 60 FPS.

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
| `app/globals.css` | Design tokens + the entire gallery scene (walls, track lights, frames, floor, panel, chips). |
| `components/Museum.tsx` | Scene root: static title, subtle wall parallax, panel state, ESC / outside‑click to close. |
| `components/Frame.tsx` | One framed exhibit (charcoal moulding, white mat, catalog number) + placard, with hover lift/glow. |
| `components/InfoPanel.tsx` | The glass panel shell; swaps content with `AnimatePresence` (only one open at a time). |
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
- **Exhibits** — `EXHIBITS` holds each framed work (`label`, catalog `index`, placard `caption`).

The **Contact form** composes a pre‑filled `mailto:` to your address (no backend, deploys anywhere).

## Deploy

Zero‑config on **Vercel**: push to GitHub and import, or run `vercel`. It's a fully static export
of one page, so any static host works too.

## Notes

- Respects `prefers-reduced-motion` (parallax + transitions are toned down).
- Project "GitHub" buttons currently point at the GitHub profile — set each project's `github`
  (and optional `demo`) in `lib/content.ts` to link specific repos.
