# a7harv.edits — portfolio site

A one-continuous-cinematic-space portfolio: a scroll-driven 3D scene (React
Three Fiber + Rapier physics) unified with the foreground UI through one
shared light, one shared palette, and one shared GSAP ease. Built with
Vite + React + TypeScript + Tailwind v4.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

Verified: `tsc -b` type-checks clean and `npm run build` produces a working
production bundle. I could not spin up a real browser in the environment
this was built in, so **do a visual pass yourself** before shipping —
check the camera path in the 3D scene, the hover states in the gallery,
and mobile breakpoints.

## Where to swap in your real content

Almost everything content-related lives in `src/data/content.ts`:

- `SITE.formspreeAction` — currently a placeholder. Create a form at
  formspree.io (free tier) and drop the real endpoint in here, or the
  contact form will silently fail.
- `GALLERY_ITEMS` — each entry has a `poster` (thumbnail) and `video` URL.
  Right now these point to public stock/sample clips as swappable filler,
  exactly as the brief allowed. Replace with your own clips hosted on
  Cloudinary's free tier (or wherever) — keep hero/marquee clips under
  ~5MB, compressed H.264 MP4, with a poster image for each.
  Sort them into the five categories already wired up in the filter bar.
- `SERVICES`, `TESTIMONIALS` — replace with your real pricing and quotes.
- `SITE.whatsappNumber` / `SITE.instagram` — already set to
  918957178266 / a7harv.edits.

The "editing bay" mock timeline in `src/sections/About.tsx` is
illustrative — swap the bio paragraph for your own words if you want to
adjust the story.

## Structure

```
src/
  lib/ease.ts          — the one shared GSAP CustomEase ("worldDrift") + plugin registration
  lib/useLenis.ts       — Lenis smooth scroll wired into GSAP's ticker
  lib/WorldContext.tsx  — shared scroll-progress ref read by the 3D camera
  hooks/useReveal.tsx   — scroll-triggered reveal, direction/timing varied per call site
  hooks/useReducedMotion.ts — prefers-reduced-motion + low-power device detection
  three/                — the 3D layer: camera rig, physics panels, dust field
  components/           — nav, preloader (doodle mascot), grain, cursor spotlight, magnetic button
  sections/             — Hero, Gallery, About, Services, Testimonials, Contact
  data/content.ts       — all copy, links, gallery/testimonial/pricing data
```

## Reduced-motion / low-power fallback

`App.tsx` checks `prefers-reduced-motion` and a rough low-power heuristic
(screen size + CPU cores + device memory). When either trips, the 3D
canvas, Rapier physics, and Lenis smooth scroll are never even downloaded
(they're behind a lazy `import()`), and a static gradient backdrop plus
native scroll take over. The nav, reveals, and marquee still work — they
just skip the extra motion.

## Known gaps / next passes

- The gallery is a 2D grid with video-on-hover rather than a full 3D wall
  — the brief allowed either, this was the lower-risk choice for jank-free
  video playback. If you want the 3D wall version later, the video-texture
  pattern would need `useVideoTexture` from drei mapped onto plane
  geometry inside the R3F canvas.
- Mascot: per your last note, this uses a small inline SVG doodle on the
  loading screen only, not the earlier 3D wolf-pup concept.
- WhatsApp/Instagram automation (greeting messages, quick replies, Meta
  Business Suite instant replies) is configured in those apps directly,
  not in this codebase — see the original brief's Part 2 for the exact
  steps.
