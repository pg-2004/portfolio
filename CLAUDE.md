# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

This project pins **Next.js 16.2.9** with **React 19.2.4** — bleeding-edge versions that post-date
training data (see `AGENTS.md` above). Before writing any code that touches routing, data fetching,
config, or fonts, check the docs bundled in `node_modules/next/dist/docs/` rather than relying on
prior knowledge.

## Commands

```bash
npm install
npm run dev      # start dev server at http://localhost:3000 (Turbopack)
npm run build    # production build
npm start        # serve the production build
npm run lint     # ESLint (eslint-config-next, flat config)
```

There is no test suite configured in this repo.

## Architecture

This is a **single-page, single-route** portfolio — there is exactly one page (`app/page.tsx`) and
no other routes. The whole UI is a "museum" metaphor: a static CSS-rendered gallery room with six
framed exhibits that open a modal-style glass panel in place. There is no scrolling and no page
navigation; "navigation" is clicking a frame to swap which panel is shown.

**Data flow is one-directional and content-first:**

- `lib/content.ts` is the single source of truth for every string, link, and data array on the site
  (`siteConfig`, `EXHIBITS`, `about`, `experience`, `projects`, `skillGroups`, `education`,
  `certifications`). All components are purely presentational and read from here — to change what
  the site says, edit this file, not the components.
- `components/Museum.tsx` is the scene root (client component). It owns which exhibit is `active`,
  renders the static gallery (walls, ceiling track lighting, floor, bench — all pure CSS, no
  images/3D), maps `EXHIBITS` to `Frame` buttons, handles Escape-to-close, and renders `InfoPanel`.
- `components/Frame.tsx` renders one framed exhibit button with Framer Motion hover/lift variants;
  clicking it calls `onOpen(id)` which sets `Museum`'s `active` state.
- `components/InfoPanel.tsx` is a `REGISTRY` mapping each `SectionId` to an `{ eyebrow, title, Body }`
  entry. It renders a scrim + glass panel via `AnimatePresence` (only one panel open at a time) and
  mounts the matching panel component from `components/panels/`.
- `components/panels/*.tsx` — one component per exhibit (`AboutPanel`, `ExperiencePanel`,
  `ProjectsPanel`, `SkillsPanel`, `ResumePanel`, `ContactPanel`). Each is self-contained and reads
  its data straight from `lib/content.ts`.
- `components/icons.tsx` has hand-rolled GitHub/LinkedIn/LeetCode SVG marks (brand icons intentionally
  not pulled from `lucide-react`, since current `lucide-react` drops brand icons).

**Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`, no `tailwind.config`) is used for panel/
content layout, while `app/globals.css` hand-codes the entire gallery scene (design tokens, walls,
track lights, frame/placard visuals, panel glass, vignette) as plain CSS — this file is large (~730
lines) and is where gallery *scene* styling lives, as opposed to Tailwind utility classes used inside
panel bodies.

**No backend:** the Contact panel (`components/panels/ContactPanel.tsx`) composes a `mailto:` link
client-side — there is no API route or server-side form handling to look for.

**Adding a new exhibit** requires touching three places in lockstep: add the `SectionId` union member
and `EXHIBITS` entry in `lib/content.ts`, add a `components/panels/*.tsx` body, and register it in
`InfoPanel.tsx`'s `REGISTRY`.

**Path alias:** `@/*` maps to the project root (see `tsconfig.json`), e.g. `@/lib/content`,
`@/components/Museum`.

**`next.config.ts`** pins `turbopack.root` to `__dirname` — required because a stray lockfile in the
parent/home directory otherwise makes Next infer the wrong workspace root.
