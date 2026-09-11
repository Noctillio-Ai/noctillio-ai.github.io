# NoctillioAi

The site for **NoctillioAi** — an open-source community building tools for
deep learning: image processing, video processing, model training, and VLM
fine-tuning. Highlights [AutoTimm](https://theja-vanka.github.io/AutoTimm/)
and [NightFlow](https://theja-vanka.github.io/NightFlow/).

Built with [Next.js](https://nextjs.org) (App Router) and [Tailwind CSS](https://tailwindcss.com),
exported as static HTML for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

- **Copy** — each page's text lives directly in its `src/app/**/page.tsx` file.
- **Projects, nav links, org/email links** — centralized in `src/lib/site.ts`.
- **Theme / colors** — CSS custom properties at the top of `src/app/globals.css`.
- **Logo & generated assets** — `public/logo/`, `public/icon-*.png`,
  `public/apple-touch-icon.png`, `public/og-image.png`, `public/site.webmanifest`.
  Regenerate them from `assets/noctillio-ai.png` with the script noted in
  `assets/README.md` if the source logo changes.

## Build

```bash
npm run build   # outputs static site to ./out
```

## Deploy

```bash
npm run deploy
```

This builds the site (`predeploy`) and publishes `./out` straight to the
`gh-pages` branch of the `origin` remote via the [`gh-pages`](https://www.npmjs.com/package/gh-pages)
package — no GitHub Actions involved. First time, make sure `origin` points
at the repo (e.g. `git remote add origin git@github.com:Noctillio-Ai/Noctillio-Ai.github.io.git`),
then in the repo's **Settings → Pages**, set **Source: Deploy from a branch**
→ `gh-pages` / `/ (root)`.
