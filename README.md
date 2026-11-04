# tewairama.digital

My portfolio. I'm Ali Werahiko Te Wairama Harrison, a web developer in Ōtautahi, and I work as Te Wairama Digital.

Live at https://tewairama.digital

Built with Next.js 14, TypeScript and plain CSS.

## Notes

The layout sits on a 12 column grid (6 on tablets, 4 on phones). The column lines are a fixed overlay that matches the grid exactly, and the column under your cursor picks up a faint red ochre glow.

The motion is CSS keyframes plus one small component, `src/components/Motion.tsx`, which adds a class to each block as it scrolls into view. Headings rise in word by word, rules draw across and screenshots wipe in. The hidden start states only switch on once an inline script knows motion is wanted, and if nothing has revealed after three seconds they switch off again, so the page can't get stuck blank. All of it respects reduced motion.

On the home page, hovering a project shows a screenshot that trails the cursor. The home page also fits on one screen when there's room and scrolls normally when there isn't.

Styles are all in `src/app/globals.css` and the project data is in `src/content/projects.ts`.

## Running it

```bash
npm install
npm run dev
```
