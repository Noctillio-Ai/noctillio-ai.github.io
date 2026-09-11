# Brand assets

- `noctillio-ai.png` — the source owl/wing logo (black mark on white), used
  as the input for every generated asset.
- `source/` — original images pulled from the AutoTimm and NightFlow project
  sites, used on `/projects` (`autotimm-logo.png`, `autotimm-hero.png`,
  `nightflow-logo.png`). Copies live in `public/projects/`.

## Regenerating the site icons / OG image

`scripts/generate-brand-assets.py` (repo root) cuts the owl mark out of
`noctillio-ai.png` (using luminance as alpha, since the source has no
transparency) and produces every derived asset in `public/`:

- `public/logo/noctillio-mark-white.png` / `noctillio-mark-black.png` —
  transparent cutouts used throughout the site (nav, footer, hero, about).
- `public/favicon.ico`, `public/apple-touch-icon.png`,
  `public/icon-192.png`, `public/icon-512.png` — graphite-gradient badge icons.
- `public/og-image.png` — 1200×630 social share image.
- `public/site.webmanifest`.

If you replace `noctillio-ai.png` with a new logo, or want to tweak the
badge colors, edit the constants near the top of the script and rerun:

```bash
python3 -m pip install --user pillow numpy   # first time only
python3 scripts/generate-brand-assets.py
```

Then move the regenerated `favicon.ico` from `public/` into `src/app/favicon.ico`
(Next's App Router convention) — see the note at the top of the script's
usage in the project README.
