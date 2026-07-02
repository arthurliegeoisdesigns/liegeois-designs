# Display fonts — trial setup (Phase 1)

The redesign ships with **Switzer** (body, loaded from Fontshare — nothing to do)
and slots for two PP trial display faces you download yourself (trials are
licensed per person, so they must come from your account).

## 1. Download the trials

- https://pangrampangram.com/products/migra → "Try for Free"
- https://pangrampangram.com/products/editorial-new → "Try for Free"

## 2. Drop the woff2 files into `public/fonts/pp/` with these names

| File | Used as |
|---|---|
| `PPMigra-Regular.woff2` | Migra display, weight 400 (default) |
| `PPMigra-Medium.woff2` | Migra display, weight 500 (optional) |
| `PPMigra-Italic.woff2` | Migra italic accents |
| `PPEditorialNew-Regular.woff2` | Editorial New, weight 400 |
| `PPEditorialNew-Medium.woff2` | Editorial New, weight 500 (optional) |
| `PPEditorialNew-Ultrabold.woff2` | Editorial New big statements, weight 800 |
| `PPEditorialNew-Italic.woff2` | Editorial New italic accents |

Trial packs include a subset of styles — rename whichever weights you received
to the closest name above (the `@font-face` blocks live near the top of
`src/app/globals.css` if you need to adjust a weight number). Any missing file
falls back to Georgia; nothing breaks.

If the trials download as `.otf` only: they work too — just update the file
extensions in the `@font-face` blocks (`format('opentype')`).

## 3. Compare them live

- Default: **PP Migra**
- Press **F** anywhere on the site (or add `?font=editorial` / `?font=migra` to the URL) to flip
- Choice persists per browser via localStorage

## 4. When you've picked a winner

1. Buy the web license for the two styles you actually use (entry pageview tier)
2. Replace the trial files with the licensed woff2s
3. Tell Claude — I'll strip the loser's `@font-face` blocks and the FontToggle component
