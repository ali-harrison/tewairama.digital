# Te Wairama Digital

Portfolio of Ali Werahiko Te Wairama Harrison, a creative web developer based in Ōtautahi, Aotearoa.

**Live:** https://tewairama.digital

## Highlights

- **Grid system:** a 12-column grid (6 on tablet, 4 on phone) with fixed hairline column guides. The column under the cursor glows in kōkōwai, the red ochre accent.
- **Motion without a library:** headings rise word by word from masks, hairlines draw in, screenshots wipe in, and rows fade up as they scroll into view. It's CSS keyframes plus one small observer component, and it respects `prefers-reduced-motion`.
- **No hidden content:** reveal start-states only apply once an inline script confirms motion is wanted, and a fallback shows everything if nothing has revealed within three seconds.
- **Project previews:** the home page's project rows show a screenshot that trails the cursor; the Work page has full case studies.

## Stack

Next.js 14 (App Router), React, TypeScript, plain CSS, `next/font` (Inter Tight and Fragment Mono). Deployed on Vercel.

## Structure

| Path | What's there |
| --- | --- |
| `src/app/globals.css` | Design tokens, grid, every component style, and the motion section |
| `src/content/projects.ts` | Project data and screenshots for the home list and Work page |
| `src/components/Motion.tsx` | Adds `.is-in` to `[data-reveal]` blocks as they enter the viewport |
| `src/components/SplitWords.tsx` | Splits a heading into masked words (screen readers get the plain text) |
| `src/components/GridLines.tsx` | The fixed column guides and cursor glow |
| `src/components/ProjectPreview.tsx` | Cursor-trailing screenshot on the home page |

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
