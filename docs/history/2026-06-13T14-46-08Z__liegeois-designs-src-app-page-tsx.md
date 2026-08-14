---
target: liegeois-designs/src/app/page.tsx
total_score: 30
p0_count: 1
p1_count: 2
timestamp: 2026-06-13T14-46-08Z
slug: liegeois-designs-src-app-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll-state and card hovers are solid; placeholder CTA URLs break external status |
| 2 | Match System / Real World | 4 | Language perfectly calibrated to founders and CMOs; zero jargon |
| 3 | User Control and Freedom | 3 | Anchor nav and browser back work; no keyboard-accessible skip-to-content |
| 4 | Consistency and Standards | 3 | Type system internally consistent; `nav-cta` has no hover state; eyebrow count exceeds spec |
| 5 | Error Prevention | 2 | Placeholder URLs (`calendly.com`, `linkedin.com`) and dead `#about-full` anchor are live failures |
| 6 | Recognition Rather Than Recall | 4 | All affordances labeled; nothing hidden; CTA copy uses action verbs throughout |
| 7 | Flexibility and Efficiency | 3 | Single-task portfolio; one-click conversion path is sufficient and correct |
| 8 | Aesthetic and Minimalist Design | 3 | Strong restraint overall; blog text-only cards feel placeholder; Services is the densest section |
| 9 | Help Users Recover from Errors | 3 | No forms; dead links silently fail but cause no data loss |
| 10 | Help and Documentation | 2 | Expected light; but zero process/timeline info means skeptical CMOs can't self-serve |
| **Total** | | **30/40** | **Good — solid foundation, targeted fixes needed before launch** |

---

## Anti-Patterns Verdict

**Start here. Does this look AI-generated?**

**LLM assessment**: The component code itself is disciplined and non-generic — the Night/Day rhythm, SectionCut diagonal transitions, floating parallax layers, and Fraunces/Instrument Sans pairing all show deliberate design choices. The copy is excellent: "Pretty doesn't convert. Strategy does." and "Work that changed the room." are confident, non-generic, audience-specific. Structural slop is minimal.

That said, the section sequence is maximally conventional: hero → logo strip → 3-up portfolio → services split → about 2-col → testimonial grid → blog cards → CTA → footer. This is the platonic landing page template. The individual elements are refined but the architecture is exactly what an AI (or a tired template) would produce without brief-driven divergence.

The more pointed flag: **brand.md's reflex-reject list explicitly names both fonts in use — Fraunces and Instrument Sans — as training-data defaults that "create monoculture."** The aesthetic lane (editorial-typographic: display serif + tracked labels + ruled separators + monochromatic restraint) is also on the saturated-lane list. If this is a greenfield identity choice, these are the two most common AI-portfolio font decisions on the internet right now. However, if HANDOFF.md specified Fraunces + Instrument Sans as established brand assets, identity-preservation overrides the ban list — the reflex-reject rule applies to new greenfield choices, not existing brand identity. **Clarify with the client whether these fonts preexist.**

**Deterministic scan**: The CLI detector (`detect.mjs`) returned zero findings. No automated anti-pattern flags. The markup is clean — correct semantic elements, proper alt attributes, no obvious structural slop signatures.

**Visual overlays**: Browser automation unavailable. No live-server injection. Critique is based on source review only.

---

## Overall Impression

The bones are excellent — the writing is sharp, the token system is disciplined, and the Night/Day rhythm is a real design decision. The biggest risk isn't the visual layer: it's the generic page architecture and the absence of responsive mobile CSS. A senior marketing director checking this on iPhone will see a broken 2-column layout in the About section. Fix mobile first, swap the placeholder URLs, and the site is close to launch-ready.

---

## What's Working

**1. The copy is doing real persuasion work.** "Pretty doesn't convert. Strategy does." is not a portfolio headline — it's a repositioning claim. "Work that changed the room." and "The kind of words you can't write yourself." maintain that register. The copy never oversells or hedges; it states and trusts.

**2. The Night/Day narrative rhythm is structurally sound.** Dark → cream → dark → cream → dark matches the DESIGN.md spec and creates a scroll cadence that feels editorial rather than arbitrary. The SVG diagonal SectionCuts are the right signature move — distinctive, consistent, load-bearing.

**3. Motion is choreographed, not decorative.** The hero parallax uses `useReducedMotion` correctly, spring physics are appropriate for the depth effect, and `whileInView` reveals are staggered properly. The site moves with intention, not to fill silence.

---

## Priority Issues

**[P0] Placeholder CTAs break the primary conversion path**
- **What**: `https://calendly.com` (Book a Call) and `https://linkedin.com` (Follow on LinkedIn) are generic homepages, not Arthur's accounts. Both appear in the primary CTA section and the nav.
- **Why it matters**: The entire site's purpose is to get one click to a calendar booking. Clicking "Book a Call" lands on Calendly's generic homepage — immediate credibility collapse for any serious buyer. The nav "Let's Talk ↗" has the same problem.
- **Fix**: Replace `https://calendly.com` with the actual Calendly scheduling link and `https://linkedin.com` with the LinkedIn profile URL in `Nav.tsx`, `CTA.tsx`, and `Footer.tsx`.
- **Suggested command**: Direct edit — this isn't a design problem, it's a data problem. Fix now.

---

**[P1] No mobile responsive breakpoints — About and Services grids will break**
- **What**: `About.tsx` uses inline `gridTemplateColumns: '1fr 1fr'` and `Services.tsx` uses inline `gridTemplateColumns: '1fr 1fr'` and `gridTemplateColumns: 'repeat(3, 1fr)'`. The `.grid-2` and `.grid-3` CSS classes also have no `@media` breakpoints in `globals.css`. On viewports under ~700px, all four grid layouts render as cramped two or three-column layouts instead of stacking.
- **Why it matters**: CMOs and founders will check this on mobile. A broken grid layout at 375px signals "demo quality" and undermines the premium positioning.
- **Fix**: Add responsive breakpoints to `globals.css` for `.grid-2`, `.grid-3`, and use a responsive utility class instead of inline grid styles for About and Services. At minimum: `@media (max-width: 680px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }`. The inline styles in About and Services need media query handling — either move to CSS classes or use a container query approach.
- **Suggested command**: `/impeccable adapt` (responsive breakpoints and mobile layout)

---

**[P1] Hero introduces a 4th eyebrow, violating the Eyebrow Restraint Rule**
- **What**: `Hero.tsx` uses `<span className="eyebrow">STRATEGIC VISUAL STORYTELLING</span>`. This is a 4th eyebrow instance (Hero + Logos + About + CTA). DESIGN.md specifies three maximum and names them explicitly: "Logos, CTA, and the About left column — three instances on the home page. Do not add eyebrows to additional sections. Three is a system; seven is AI grammar."
- **Why it matters**: Eyebrow restraint is how the system avoids AI-scaffolding grammar. The Logos eyebrow also uses `.eyebrow` class but overrides to `--color-text-secondary` (stone), which somewhat distinguishes it. But four eyebrows of the same class undermine the rule.
- **Fix**: Remove the hero eyebrow. The display headline "Pretty doesn't convert. Strategy does." is strong enough to open without a kicker. Alternatively, change it to a different visual treatment (e.g. a subtle `type-label` in `--color-on-dark-muted`) that doesn't use the `.eyebrow` class.
- **Suggested command**: `/impeccable distill` (strip the unnecessary eyebrow label from the hero)

---

**[P2] Hero scroll indicator uses prohibited linear-gradient**
- **What**: `Hero.tsx` line 207: `background: 'linear-gradient(to bottom, var(--color-on-dark-muted), transparent)'` on the scroll caret line. DESIGN.md prohibits `linear-gradient` everywhere. The only gradient exception is the hero vignette overlay, which is a radial gradient as a masking device.
- **Why it matters**: It's a minor violation but it sets a precedent and breaks the explicit design rule "No `linear-gradient` on buttons, cards, backgrounds, or headings."
- **Fix**: Replace with a solid `1px wide` div using `--color-on-dark-muted` at the top, transitioning to zero opacity via Framer Motion `animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}` — or simply use a static semi-transparent line without gradient.
- **Suggested command**: `/impeccable polish`

---

**[P2] Portfolio parallax shows only 2 unique images across 5 floating layers**
- **What**: `Hero.tsx` layers array: `sunrise-cellars.webp` appears at layers[0] and layers[3]; `mcs-deck.png` appears at layers[1] and layers[4]; `mcs-web.webp` appears only at layers[2]. With parallax movement, the identical repeated images will be visible simultaneously.
- **Why it matters**: The floating portfolio images are the site's signature opening move — the "strategic stage." Duplicate images at different positions in the same scene undermine the spatial depth illusion and look like a placeholder state.
- **Fix**: Add 2 more unique project images (real or placeholder) to reach 5 distinct images. Even a well-composed abstract detail from an existing project would work better than duplicates. If only 3 images exist, reduce to 3 layers (remove layers[3] and layers[4]) and adjust positions for visual balance.
- **Suggested command**: Direct image/content fix

---

## Persona Red Flags

**Jordan (Confused First-Timer)** — a founder's EA landing on this from a LinkedIn referral:
- ✗ "Let's Talk ↗" in the nav gives no affordance for where it goes (and currently goes to calendly.com homepage — Jordan will abandon immediately)
- ✗ No process or timeline information anywhere — Jordan wants to know "how does this work?" before booking a call; there's no answer
- ✗ Footer links to "Case Studies", "Process", "#clients" lead nowhere — the footer implies more content than exists
- ✓ Hero CTAs are clear, labeled with action verbs, no guesswork needed
- ✓ "Book a Call" appears twice (hero + CTA section) — no recall required for the primary action

**Casey (Distracted Mobile User)** — checking from their phone at the airport:
- ✗ About section 2-col inline grid will not stack on mobile — left and right columns compress into unreadable narrow columns
- ✗ Services discipline card (2-col) and format grid (3-col) same issue — both collapse to tiny multi-column layouts
- ✗ Blog "Read Now →" links all point to `#blog` — the section itself, not actual articles. On mobile, tapping sends the user nowhere new
- ✓ The CTA section "Book a Call" is well-centered and large enough tap target
- ✓ Portfolio card touch targets are adequate

**The Skeptical CMO (Marcus)** — VP Marketing who's been pitched by 20 freelancers this quarter:
- ✗ Three portfolio cases, two of which are the same client (MCS Healthcare + MCS Healthcare PR). Marcus will clock this in 5 seconds. For a site arguing Arthur is worth the premium over anyone else, 3 cases with 2 from one client is a thin proof set
- ✗ "I've been on all three sides of the table" is good positioning, but Marcus needs to see the strategic part proven in the work — the portfolio descriptions ("Narrative identity for a boutique wine brand") explain what was made, not what was changed
- ✓ Real client names (Bloomberg, Marriott, Ogilvy, Apple) in the Logos section — immediate credibility signal Marcus respects
- ✓ Testimonial from "Global Director of Excellence, Ogilvy" and "Director, Global Content Marketing, Marriott" are the right level for this audience

---

## Minor Observations

- `type-quote` class at line 153 of `globals.css`: `font-variation-settings: 'opsz' 16` — missing `'WONK' 0`. Should be `'opsz' 16, 'WONK' 0` per the Optical Sizing Rule.
- Footer tagline `fontVariationSettings: "'opsz' 14"` — same WONK omission.
- `nav-cta` class has no hover state. "Let's Talk ↗" in Strategic Red should have a hover to `--color-accent-hover` per the text-link spec. Add `.nav-cta:hover { color: var(--color-accent-hover); }` to `globals.css`.
- `About.tsx` line 51: `href="#about-full"` — this anchor doesn't exist on the page. Will silently fail (browser scrolls to top). Either remove the "About Me ↗" link, point to a real anchor, or stub the About page.
- The footer `©️ 2025` should read `© 2026` (current year).
- Blog section: text-only cards on a brand surface feel like content placeholders. Even a slim color-stripe header or estimated reading time visual treatment would signal "real content exists here."
- `.section-cut` is placed inside `.section` elements which have `padding: var(--section-pad-y) var(--section-pad-x)`. The negative margin compensation (`margin-left: calc(-1 * var(--section-pad-x))`) should work on desktop but may cause horizontal overflow on narrow viewports if the parent section doesn't apply `overflow-x: hidden`.

---

## Questions to Consider

- "The hero makes a big promise with floating portfolio images — does 3 projects (2 from one client) deliver on that promise to a skeptical CMO?"
- "What if the About section opened with something that proved the strategic part — a before/after result, a number, a quote — rather than a 3-pillar framework?"
- "What would the site look like if the SectionCuts were the *only* structural flourish — and the section architecture itself was more unexpected?"
