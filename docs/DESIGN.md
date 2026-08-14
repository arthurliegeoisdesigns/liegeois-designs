---
name: Liégeois Designs
description: Strategic Visual Storytelling studio — where strategy finds its voice.
version: 3.0.0
generatedAt: 2026-08-13
derivedFrom: shipped code (liegeois-designs/src/app/globals.css), not aspiration
supersedes:
  - docs/DESIGN.superseded-2026-06-15.md              # named Cormorant Garamond / DM Sans; declared "no light mode"
  - docs/history/design.superseded-2026-06-15.json    # was .impeccable/design.json (v2)
  - liegeois-brand-system skill v2.0 (2026-03-30)     # named Bodoni Moda / Inter, gold accent
location: liegeois-designs/docs/ — version controlled; see docs/README.md for why, and for the cwd impeccable needs
colors:
  # Dark surfaces (dominant — roughly 70% of surface area)
  void: "#070605"            # deepest black — journey hero, services panels
  canvas: "#0A0908"          # default dark page background
  dark-surface: "#12100E"
  dark-elevated: "#1A1714"
  on-dark: "#F7F4EF"
  on-dark-muted: "#BDB7AE"
  on-dark-faint: "#A19A90"
  # Light surfaces (deliberate tonal relief — see §1)
  paper: "#F4F1EC"           # bone
  cream-surface: "#ECE7DF"
  ink: "#141210"
  text-secondary: "#57524B"
  text-muted: "#6E6860"
  # Accent — two surface-specific values, IDENTICAL hue (11°), luminance only
  accent: "#E84420"          # on dark  — 5.09:1 vs void   (AA body)
  accent-on-light: "#CA3615" # on bone  — 4.60:1 vs paper  (AA body)
  accent-hover: "#C93411"
typography:
  display:
    fontFamily: "'PP Migra', 'Migra', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3.25rem, 9.5vw, 7.5rem)"
    fontWeight: 200
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  h1:
    fontFamily: "'PP Migra', Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  h2:
    fontFamily: "'PP Migra', Georgia, serif"
    fontSize: "clamp(1.75rem, 3.75vw, 3rem)"
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "'Switzer', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)"
    lineHeight: 1.75
  body:
    fontFamily: "'Switzer', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.7
  label:
    fontFamily: "'Switzer', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    letterSpacing: "0.18em"
rounded:
  sm: "0px"
  md: "0px"
  lg: "0px"
  full: "9999px"      # pills and avatars ONLY
spacing:
  section-x: "clamp(24px, 6vw, 80px)"
  section-y: "clamp(80px, 10vw, 140px)"
  nav-h: "80px"
motion:
  ease-out-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-spring: "cubic-bezier(0.23, 1, 0.32, 1)"
  duration-fast: "200ms"
  duration-base: "350ms"
  duration-slow: "700ms"
---

# Design System: Liégeois Designs — v3

> **This file is derived from what ships, not from what was once specified.**
> Four documents previously described this site and none matched the code or
> each other: they named four different display typefaces (Bodoni Moda,
> Cormorant Garamond, Fraunces, PP Migra) and two unrelated accent hues.
> Where doc and code disagreed, **the code won** unless the code was
> measurably broken. Every departure is recorded in §7.

## 1. Creative North Star — "The Strategic Stage"

The site is a performance. It opens in near-darkness, and dark holds the
majority of the surface. Typography does the compositional work. Colour is
rationed to a single accent used as punctuation, never decoration. The scroll
is the arc of a pitch: hook, credibility, proof, the ask.

**Tonal alternation is deliberate.** The previous version of this document
declared "no cream, no light mode, no tonal alternation." The shipped site
contradicts it in three places, and the shipped site is right:

- the homepage `.light-sheet` — a bone plate carrying About / WhyArthur / Blog
- the per-service landing pages (`/services/[slug]`)
- long-form reading surfaces

Dark is the register; light is the **breath**. A 30-minute scroll in unbroken
near-black flattens — the eye stops registering contrast as meaningful. Light
sections mark a change of movement: from performance to argument, from the
work to the reasoning behind it. Target roughly **70% dark / 30% light** by
surface area, with dark always opening and closing.

This is a change of doctrine, not an accident to be tidied away.

## 2. Colour

### Accent — two surfaces, one hue

The accent exists at two luminances because the site has two surface families.
This is **not** two brand colours: hue is identical at 11°, only lightness
differs, so it reads as one colour correctly adapted.

| Token | Value | Use on | Contrast | Passes |
|---|---|---|---|---|
| `--color-accent` | `#E84420` | void / canvas | 5.09:1 | AA body |
| `--color-accent-on-light` | `#CA3615` | paper / cream | 4.60:1 | AA body |

`#E84420` alone scores only **3.53:1** on bone — fine for large text and UI,
**below AA for body copy**. Anything accent-coloured at body size on a light
surface must use `--color-accent-on-light`.

**Gold is rejected on evidence.** The March brand system specified `#C8A96E`,
and the palette libraries reach for gold for anything "premium dark." Gold
scores **2.61:1 on bone** — under the 3:1 floor for even large text. It cannot
survive on a site with light surfaces. It is also the single most predictable
luxury signifier available, and `PRODUCT.md` names *Surprising* as a promise
while listing generic portfolios and loud agency sites as anti-references.

Derivation method, for whoever revisits this: every CTA hex in
`ui-ux-pro-max/data/colors.csv` was scored with WCAG contrast against the real
surfaces (`#070605` void, `#F4F1EC` bone). Only a handful clear 3:1 both ways,
and the ones that do are generic by association — blue reads portfolio/tech,
violet reads fintech, red reads automotive. Judge replacements the same way:
measure first, then apply taste to the survivors.

### Rationing

Accent is punctuation. Active nav state, one CTA per view, a key data point, a
pull-quote mark. **Never** a background fill, never more than one accented
element competing inside a single viewport.

## 3. Typography

**PP Migra Extralight** (display) + **Switzer** (body). PP Migra is a licensed
commercial Didone — high stroke contrast, long descenders, genuinely
distinctive. It is an established brand asset and is **not** subject to
reflex-reject rules aimed at greenfield font picks. Do not swap it out on
"monoculture" grounds; that rule exempts existing identity.

### The line-height floor — non-negotiable

**Display line-height must never go below 1.0.** Below 1.0 the line box is
shorter than the font size, and PP Migra's descenders (g, p, y, j, q) collide
with the cap-height of the line beneath. This shipped as `0.98` and produced
visible collisions at 120px on `/services/strategic-narrative` and
`/services/sales-agency-decks`.

Current floor is **1.05** on `.type-display`. Derive any future value from PP
Migra's own metrics — not from a document describing a different typeface.

Still below 1.0 and to be corrected during the redesign, currently safe only
because their copy happens to lack descenders on non-final lines:

| Selector | Value |
|---|---|
| `.jn-s0 h1` | 0.98 — journey hero, also the LCP element |
| `.cta-giant-line` | 0.95 |
| `.pmode-display` | 0.98 |

### Measure

Body copy caps at 65–75ch. `--content-width` for long-form reading.

## 4. Geometry

**Radius is 0.** `sm`, `md` and `lg` are all `0px`; `full` is reserved for
pills and avatars. Sharp corners carry the editorial register and are
load-bearing.

Every prior document specified 3/4/8/16px rounding. None matched the code.
Any tool reading those docs would "restore" rounding and quietly soften the
entire site. **Zero is the decision.**

## 5. Layout

- `--section-pad-x: clamp(24px, 6vw, 80px)`
- `--section-pad-y: clamp(80px, 10vw, 140px)`
- `--nav-h: 80px` — the global `<Nav />` is fixed at this height. **Anything
  else pinned to the top of the viewport must offset by this token.** The
  `/services` panel bar did not, rendered underneath the nav, and printed its
  back-link through the wordmark.

### Absolute positioning reserves no space

Where an absolutely-positioned element sits above flow content, the two do not
negotiate. The `/services` eyebrow row is absolute while its `h2` is in flow,
so the eyebrow clips the heading — and moving the eyebrow *down* made it worse,
because the heading never moves in response. Prefer normal flow for anything
that must stack.

## 6. Motion

Standard easing `cubic-bezier(0.16, 1, 0.3, 1)`; 200 / 350 / 700ms. Scroll
reveals fade up ~24px, stagger 80ms. `prefers-reduced-motion` is honoured
everywhere and must stay that way — it is also the mechanism that suppresses
the intro plate, so breaking it breaks indexing behaviour too.

## 7. Departures from the superseded documents

| Item | Old docs | v3 | Why |
|---|---|---|---|
| Display font | Bodoni Moda / Cormorant / Fraunces | **PP Migra** | What ships; licensed and distinctive |
| Body font | Inter / DM Sans | **Switzer** | What ships |
| Accent | `#C8A96E` gold | `#E84420` + `#CA3615` | Gold fails 3:1 on bone |
| Darkest | `#0A0A0A` / `#080808` | `#070605` | What ships |
| Radius | 3–16px | **0px** | What ships; deliberate |
| Light mode | "none" | **~30% by area** | Shipped in 3 places; doctrine changed |
| Display leading | 1.05 (for Bodoni) | 1.05 (for PP Migra) | Same number, correct reasoning |

## 8. Open — not yet decided

- **Page architecture.** The June critique called the section sequence
  "maximally conventional." Full reconsideration is in scope; nothing here
  constrains it.
- **Remaining sub-1.0 leading** in §3.
- **`/services` eyebrow** to normal flow (§5).
- The journey hero is the **LCP element**. Any change to it must be
  re-measured, not assumed.
