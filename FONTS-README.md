# Display fonts — trial setup (Phase 1)

The redesign ships with **Switzer** (body, loaded from Fontshare — nothing to do)
and slots for two PP trial display faces you download yourself (trials are
licensed per person, so they must come from your account).

## 1. Download the trials

- https://pangrampangram.com/products/migra → "Try for Free"
- https://pangrampangram.com/products/editorial-new → "Try for Free"

## 2. Drop the trial files into `public/fonts/pp/`

**Migra** (already in place ✓): trial ships woff2 as
`Migra-Extralight.woff2`, `Migra-Extrabold.woff2`,
`MigraItalic-ExtralightItalic.woff2`, `MigraItalic-ExtraboldItalic.woff2` —
the CSS expects exactly those names. Headlines run Extralight, the elegant cut.

**Editorial New**: trial ships `.otf` — that's fine, keep them as-is. The CSS
accepts both `PPEditorialNew-*.otf` and `EditorialNew-*.otf` naming for:
`Regular`, `Medium`, `Ultrabold`, `Italic`. Drop whichever weights your trial
includes; any missing file falls back to Georgia, nothing breaks.
(.otf is heavier than woff2 — fine for previewing; the licensed purchase
ships woff2 anyway.)

## 3. Compare them live

- Default: **PP Migra**
- Press **F** anywhere on the site (or add `?font=editorial` / `?font=migra` to the URL) to flip
- Choice persists per browser via localStorage

## 4. When you've picked a winner

1. Buy the web license for the two styles you actually use (entry pageview tier)
2. Replace the trial files with the licensed woff2s
3. Tell Claude — I'll strip the loser's `@font-face` blocks and the FontToggle component
