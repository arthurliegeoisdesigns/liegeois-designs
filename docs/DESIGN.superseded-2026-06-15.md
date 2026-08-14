---
name: Liégeois Designs
description: Strategic Visual Storytelling studio — where strategy finds its voice.
colors:
  dark: "#080808"
  dark-surface: "#0F0F0F"
  dark-elevated: "#161616"
  on-dark: "#F2F0EE"
  accent: "#E84420"
  accent-hover: "#D63108"
typography:
  display:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(52px, 9vw, 96px)"
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(36px, 5.5vw, 60px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(26px, 3.5vw, 44px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.005em"
  body:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  sm: "3px"
  md: "8px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "96px"
  section-x: "clamp(24px, 6vw, 80px)"
  section-y: "clamp(64px, 8vw, 120px)"
components:
  button-primary:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.dark}"
    rounded: "{rounded.sm}"
    padding: "13px 28px"
  button-primary-hover:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.dark}"
  button-primary-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.sm}"
    padding: "13px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    padding: "0"
  portfolio-card:
    backgroundColor: "{colors.dark-elevated}"
    rounded: "{rounded.md}"
    padding: "0"
  blog-card:
    backgroundColor: "{colors.dark-elevated}"
    rounded: "{rounded.md}"
    padding: "0"
---

# Design System: Liégeois Designs

## 1. Overview

**Creative North Star: "The Strategic Stage"**

This site is a performance. It opens in total darkness — a cinematic near-black that holds every section, every page, every fold. There is no cream, no light mode, no tonal alternation. The entire surface is dark; content emerges from it the way a single spot illuminates a speaker on a stage. Typography does the compositional work. Color is rationed to a single accent that appears as punctuation, never as decoration. The scroll is the arc of a pitch: hook, credibility, proof, the ask.

The system explicitly rejects three categories. **Generic freelance portfolios**: Squarespace energy, thumbnail grids, "passionate about design" copy. **Over-designed creative studios**: cursor effects, elaborate loading screens, experimental navigation that obscures the work. **Loud agency sites**: gradient-saturated, motion-everywhere sensory overload that confuses busyness with quality.

Every design decision serves the argument. The restraint is not minimalism for its own sake — it's the confidence of someone who knows the work speaks louder than the wrapper.

**Key Characteristics:**
- All-dark: every section, every page uses `#080808` or its surface/elevated variants
- Single accent: Strategic Red (`#E84420`) appears as text-scale punctuation only
- Cormorant Garamond headlines carry the compositional weight; DM Sans delivers the message
- Motion is choreographed and entrance-driven (Framer Motion + GSAP ScrollTrigger), gated behind `prefers-reduced-motion`
- Opacity-based text hierarchy on dark backgrounds: full → muted (0.55) → hint (0.45) → faint (0.35) → ghost (0.22)

---

## 2. Colors: The Dark Stage

Three tonal depths. One text color at varying opacities. One signal.

### Primary
- **Strategic Red** (`#E84420`): The only chromatic color in the system. Appears on eyebrow labels, the nav CTA, text-link CTAs, and accent markers. Its rarity is its power — it marks what matters without shouting. Passes WCAG AA at 5.03:1 against `#080808`.
- **Strategic Red Deep** (`#D63108`): Hover/active state for Strategic Red only. Never standalone.

### Neutral
- **Stage Dark** (`#080808`): The body background. Every section lives here. Near-black with imperceptible warmth — not pure `#000`, which reads as digital and cold.
- **Dark Surface** (`#0F0F0F`): One step up. Used for `section-surface` backgrounds to create subtle depth shifts between homepage sections without breaking the all-dark rule.
- **Dark Elevated** (`#161616`): Card backgrounds, testimonial containers, blog cards, nav scroll state. The "lifted" surface that creates relief through tonal difference, not shadow.
- **Light Text** (`#F2F0EE`): Headlines, primary body text, button labels on dark. A warm near-white — not clinical `#FFF`.

### Semantic Opacity Tokens
The system uses Light Text at calibrated opacities for text hierarchy on dark backgrounds:
- `--color-on-dark` (1.0): Headlines, primary text
- `--color-on-dark-muted` (0.55): Body text, secondary copy — 5.66:1 contrast
- `--color-on-dark-hint` (0.45): Large text labels, column headings — AA-large only
- `--color-on-dark-faint` (0.35): Decorative text, taglines
- `--color-on-dark-ghost` (0.22): Borders, inactive dots, badge backgrounds
- `--color-on-dark-border` (0.08): Subtle dividers and card borders

### Named Rules
**The Signal Rule.** Strategic Red appears on no more than 6 text-scale elements per viewport. It is never used as a background fill, container color, or decorative border stripe. Its scarcity is the mechanism.

**The All-Dark Rule.** Every page, every section uses the dark palette. There is no light mode, no cream sections, no tonal alternation. Depth is conveyed through the three dark surface tiers (`#080808` → `#0F0F0F` → `#161616`), not through dark/light switching.

---

## 3. Typography

**Display Font:** Cormorant Garamond (with Georgia, serif fallback) — variable weight 300–600, loaded via `next/font/google` with `display: 'swap'`.

**Body Font:** DM Sans (with system-ui, sans-serif fallback) — weights 300, 400, 500.

**Character:** Cormorant Garamond commands attention with its high-contrast, calligraphic strokes at large scale; DM Sans recedes into functional clarity at body size. The pairing creates a deliberate tension between editorial authority and clean delivery — the serif makes the argument, the sans delivers the evidence.

### Hierarchy
- **Display** (300, clamp(52px, 9vw, 96px), LH 1.0, LS -0.015em): Hero H1 only. One per page. The headline that anchors the fold.
- **Headline** (400, clamp(36px, 5.5vw, 60px), LH 1.1, LS -0.01em): Major section headings — Portfolio, CTA, Services intro. The argument's thesis statements.
- **Title** (500, clamp(26px, 3.5vw, 44px), LH 1.15, LS -0.005em): Section sub-headlines, testimonial section headers. Steady mid-register authority.
- **Subtitle** (500, clamp(16px, 1.6vw, 20px), LH 1.3): DM Sans. Card titles, service names, skill headings. Confident at small scale.
- **Body** (400, 15px, LH 1.65): DM Sans. Standard paragraphs. Max line length 65ch.
- **Body Large** (300, clamp(15px, 1.5vw, 18px), LH 1.7): DM Sans. Hero sub-copy, CTA sub-paragraph.
- **Caption** (400, 13px, LH 1.5): DM Sans. Metadata, attribution, secondary info.
- **Label** (500, 10px, LH 1, LS 0.18em, uppercase): DM Sans. Eyebrow labels, category chips, nav wordmark text.

### Named Rules
**The One Display Rule.** `.type-display` (96px ceiling) appears exactly once per page — the hero H1. Every other heading uses `.type-h1` (60px ceiling) or smaller. Two display-scale headlines on one page is shouting.

**The Eyebrow Restraint Rule.** The `.eyebrow` label class appears on a maximum of 3–4 sections per page. Three is a system; seven is AI grammar.

---

## 4. Elevation

This system is flat. There are no box-shadows on any UI surface at rest. Depth is conveyed entirely through four mechanisms:

- **Tonal layering**: the three dark tiers (`#080808` → `#0F0F0F` → `#161616`) create surface separation without any shadow. Cards sit on `#161616` against a `#080808` or `#0F0F0F` background.
- **Hover displacement**: portfolio cards rise 4px (`translateY(-4px)`), blog cards 3px — Z-axis depth implied by Y-axis movement. Transition: 350ms `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Image scale on hover**: card images scale to 1.03–1.04× simultaneously with the card lift, reinforcing the sense of approach.
- **Nav atmospheric blur**: the nav gains `backdrop-filter: blur(20px)` and `background: rgba(8,8,8,0.78)` on scroll — a functional depth signal, not decoration.

Hover states are gated behind `@media (hover: hover) and (pointer: fine)` — touch devices get no hover effects.

### Named Rules
**The Flat-at-Rest Rule.** No UI surface shows a shadow at rest. Cards, buttons, nav, containers — all shadow-free. Depth comes from tonal difference and hover displacement only.

---

## 5. Components

Interactive elements are **tactile and restrained**: hover states are always present and always physical, but never performative.

### Buttons
- **Shape:** Sharp-edged — 3px radius across all variants. The precision is intentional.
- **Primary (on dark):** Light text fill (`#F2F0EE`), dark text (`#080808`), 13px/500 DM Sans, 13px 28px padding. Hover: opacity 0.90, translateY(-1px). Active: scale(0.97).
- **Primary (on inverted context):** Dark fill, light text. Same shape and padding.
- **Ghost:** Transparent bg, light text, `border: 1px solid rgba(255,255,255,0.12)`. Hover: border brightens, faint background tint appears, translateY(-1px).
- **Text link:** Strategic Red, no bg, no border. Hover: Strategic Red Deep. Used for "About Me ↗", "Read Now →", "Let's Talk".

### Cards
- **Corner Style:** 8px radius (`--radius-md`)
- **Background:** Dark Elevated (`#161616`)
- **Border:** 0.5px solid `rgba(255,255,255,0.07)` — barely visible, provides structure
- **Shadow Strategy:** None at rest. Hover: card lifts 3–4px, border brightens to `rgba(255,255,255,0.12)`, image scales 1.03–1.04×.
- **Internal Padding:** 16px 20px 20px for portfolio card body. Blog and testimonial cards vary.

### Navigation
- Fixed to viewport top, full width, z-index 100, height 80px.
- **At rest (top of page):** fully transparent, no background, no border.
- **On scroll (>40px):** `background: rgba(8,8,8,0.78)`, `backdrop-filter: blur(20px)`, `border-bottom: 0.5px solid rgba(255,255,255,0.07)`. Transition: 350ms ease-out-expo.
- **Desktop (>768px):** Logo left, links right (Work, Blog, About), CTA text link ("Let's Talk" in Strategic Red).
- **Mobile (≤768px):** Logo left, hamburger right. Fullscreen overlay with Cormorant Garamond links, stagger-animated entrance.

### Inputs (Contact page)
- **Style:** `rgba(255,255,255,0.04)` background, `0.5px solid rgba(255,255,255,0.12)` border, 6px radius, 14px 16px padding.
- **Focus:** border brightens to `rgba(255,255,255,0.30)`, background to `rgba(255,255,255,0.06)`.
- **Focus-visible:** 2px accent ring via `box-shadow: 0 0 0 2px rgba(214,49,8,0.25)`.

### Portfolio Stack (Signature Component)
GSAP ScrollTrigger-driven sticky card stack. Each card pins at viewport top and scales/fades (0.93×, 0.45 opacity) as the next card scrolls in. Full-bleed images with gradient overlay darkening the bottom-left where text lives. Desktop only — mobile (< 768px) gets a plain vertical stack.

---

## 6. Do's and Don'ts

### Do:
- **Do** deploy Strategic Red on fewer than 7 text-scale elements per viewport. Count before adding.
- **Do** keep the all-dark palette on every page and section. Dark Surface and Dark Elevated create depth — never introduce cream or light sections.
- **Do** gate all Framer Motion and GSAP animations behind `useReducedMotion()` or `matchMedia('prefers-reduced-motion: no-preference')`. Reduced-motion users receive instant or opacity-only transitions.
- **Do** cap body prose blocks at 65ch max-width.
- **Do** keep button labels as action verbs: "See the Work", "Start a Project", "Read Now", "Let's Talk". Never "Learn More", "Click Here", "Submit".
- **Do** use the semantic opacity token hierarchy (`--color-on-dark-muted`, `--color-on-dark-hint`, etc.) instead of hardcoded `rgba()` values for text on dark backgrounds.
- **Do** ensure all interactive touch targets are at least 44×44px. Use wrapper buttons with centered visual elements when the visible element is smaller.
- **Do** verify contrast: body text ≥4.5:1, large text ≥3:1 against its background.

### Don't:
- **Don't** build layouts that read as a generic freelance portfolio — image-left-heading-right grids, bullet lists of services, "I'm passionate about design" copy, or a scrolling sea of equally-sized project thumbnails.
- **Don't** add cursor effects, custom loading screens, scroll-hijacking, or experimental navigation. These are the signatures of over-designed studios whose navigation competes with their work.
- **Don't** use gradient fills anywhere — no `linear-gradient` on buttons, cards, backgrounds, or headings. No `background-clip: text`. Exception: gradient overlays on hero/portfolio images for text legibility are functional, not decorative.
- **Don't** add glassmorphism decoratively. The nav blur is a functional scroll-state signal; adding blurred-glass cards elsewhere is a different design register.
- **Don't** add eyebrow labels to more than 3–4 sections of any page. The eyebrow is punctuation, not scaffolding.
- **Don't** use numbered section markers (01/02/03) as default scaffolding. Numbers earn their place only when the content is genuinely sequential.
- **Don't** add box-shadows to cards, containers, or buttons at rest. The Flat-at-Rest Rule is non-negotiable.
- **Don't** introduce cream, sand, or warm-neutral backgrounds. The all-dark palette is the brand identity, not a theme preference.
- **Don't** use gradient-saturated, motion-everywhere aesthetics. The site persuades through precision, not volume.
- **Don't** hardcode `rgba()` opacity values for text — use the semantic tokens (`--color-on-dark-muted`, `--color-on-dark-hint`, etc.) so contrast ratios stay managed system-wide.
