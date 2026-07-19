// ─────────────────────────────────────────────────────────────────────────────
// Per-service landing pages — the SEO backbone (July 2026)
//
// Each service gets a real URL with search-intent content: these pages
// exist to rank for commercial queries ("pitch deck design services",
// "executive presentation designer") that the single /services page
// never could. Copy is voice-checked: confident, specific, no filler.
// ─────────────────────────────────────────────────────────────────────────────

export type ServicePage = {
  slug: string
  /** short name used in nav/links */
  name: string
  /** H1 — the query, owned */
  h1: string
  metaTitle: string
  metaDescription: string
  tagline: string
  lead: string
  body: string[]
  deliverables: string[]
  process: Array<{ title: string; detail: string }>
  timeline: string
  faqs: Array<{ q: string; a: string }>
  /** case-study slugs for the proof section (internal links) */
  relatedWork: string[]
  image: string
  imageAlt: string
}

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs'

export const servicePages: ServicePage[] = [
  {
    slug: 'pitch-deck-design',
    name: 'Pitch & Investor Decks',
    h1: 'Pitch Deck Design',
    metaTitle: 'Pitch Deck Design Services — Investor Decks That Raise | Liégeois Designs',
    metaDescription:
      'Professional pitch deck design for founders raising capital. Narrative-first investor decks built around your story and your ask — 1–2 week turnaround. Montclair, NJ — serving founders worldwide.',
    tagline: 'For founders raising capital.',
    lead:
      'The deck you bring into the most important room of your year. Built around your story, your audience, and the specific ask that needs to land.',
    body: [
      "Most pitch decks fail before the first slide, because they're built as inventories — team, product, market, traction — instead of arguments. Investors don't fund inventories. They fund a story about why this, why now, and why you, told by someone who clearly understands the room they're walking into.",
      "That's where we start: not in PowerPoint, but with your narrative. Who's across the table, what they believe before you speak, which objections are already forming, and what needs to be true when you finish. Then the deck gets designed around that argument — structure first, design second. Always.",
      'The result is a deck that works twice: on the wall while you present, and alone in the follow-up email when partners who missed the meeting flip through it at midnight. Both readings are designed for, deliberately.',
    ],
    deliverables: ['Narrative architecture', 'Slide design (10–30 slides)', 'Speaker notes', 'PDF + editable file'],
    process: [
      { title: 'Intake call', detail: 'Context, investor profile, and the specific ask' },
      { title: 'Narrative map', detail: 'Argument structure, objections addressed, slide outline' },
      { title: 'Design', detail: 'Visual concepts, data visualization, brand expression' },
      { title: 'Two revision rounds', detail: 'One structural, one polish' },
      { title: 'Handoff', detail: 'Final files and coaching notes for presenting' },
    ],
    timeline: '1–2 weeks',
    faqs: [
      {
        q: 'How much does professional pitch deck design cost?',
        a: 'It depends on scope — a focused redesign of an existing narrative costs less than a full strategic build from scratch. After a 30-minute intake call you get a fixed quote, not an hourly meter. No surprises mid-project.',
      },
      {
        q: 'How long does a pitch deck take?',
        a: 'One to two weeks for most raises, from intake call to final files. Rush timelines are possible with a surcharge — mention your deadline in the first message.',
      },
      {
        q: 'Do you work on the story, or just make slides look better?',
        a: "Story first, always. Roughly half of every engagement is narrative work: the argument, the objection sequence, the one sentence investors repeat to their partners. Design that decorates a broken story is money wasted — we don't sell it.",
      },
      {
        q: 'What stage founders do you work with?',
        a: 'Pre-seed through Series C, plus M&A and internal funding decks. The mechanics differ by stage — a seed deck sells belief, a B deck sells evidence — and the design reflects that.',
      },
    ],
    relatedWork: ['echo-society-pitch-deck-2', 'university-startups', 'norigami-brand'],
    image: `${CDN}/webflow/portfolio-slides-rapp-evolus-pitch-deck-0007-19640a`,
    imageAlt: 'Investor pitch deck design sample — Evolus × RAPP',
  },
  {
    slug: 'executive-presentations',
    name: 'Executive Presentations',
    h1: 'Executive Presentation Design',
    metaTitle: 'Executive Presentation Design — Board Decks & Keynotes | Liégeois Designs',
    metaDescription:
      'Executive presentation design for board decks, C-suite briefings, and keynotes. Strategic narratives trusted by Chevron, IBM, Philips, and Apple presenters. Designed to be trusted on sight.',
    tagline: 'High stakes by definition.',
    lead:
      'Board decks, C-suite briefings, and strategic reviews that show — not just tell — the decision that needs to be made.',
    body: [
      'An executive audience gives you minutes, not meetings. They skim, they interrupt, they decide early and confirm late. A deck built for that room does something most corporate presentations never do: it respects the audience enough to lead with the point, prove it visually, and stop.',
      "We've designed executive narratives for Chevron, IBM, Philips, Bloomberg Media, and teams inside Apple — rooms where the presenter's credibility is decided in the first ninety seconds. The design language that survives those rooms is calm, precise, and dense with meaning, never with text.",
      'Every engagement covers the content architecture (what stays, what moves, what dies), data visualization that an executive can read from the back of the room, and the presenter notes that keep your delivery and your slides moving as one continuous thought.',
    ],
    deliverables: ['Story structure review', 'Data visualization', 'Executive-grade design', 'Multiple format exports'],
    process: [
      { title: 'Brief', detail: 'Stakeholder map, decision context, and room dynamics' },
      { title: 'Content architecture', detail: 'What stays, what moves, what order' },
      { title: 'Design', detail: 'Visual hierarchy built for executive attention spans' },
      { title: 'Revision and sign-off', detail: 'Collaborative, focused, efficient' },
      { title: 'Delivery', detail: 'All required formats and presenter notes' },
    ],
    timeline: '1–2 weeks',
    faqs: [
      {
        q: 'Can you work under NDA with confidential board material?',
        a: 'Yes — most executive engagements run under NDA, and several clients appear in our portfolio only as anonymized formats. Confidentiality workflows (redacted reviews, secure transfer, no cloud AI processing of your data) are standard, not special requests.',
      },
      {
        q: 'Our deck is 60 slides. Is that a problem?',
        a: "Usually, yes — but the fix is editorial, not cosmetic. Part of every engagement is deciding what the room actually needs versus what the appendix can carry. Most 60-slide decks are a 15-slide argument wearing a 45-slide safety blanket.",
      },
      {
        q: 'Do you design in our corporate template?',
        a: 'When the template serves the story, yes. When it fights the story, we design within your brand system but beyond the template — and give you the ammunition to defend that choice internally.',
      },
      {
        q: 'PowerPoint, Keynote, or Google Slides?',
        a: "Whichever your organization needs to own afterward. We're fluent in all of them and loyal to none — the tool was never the point.",
      },
    ],
    relatedWork: ['chevron-new-energies', 'ibm-quantum-summit-2022-cn3q3', 'philips-healthcare'],
    image: `${CDN}/webflow/fivestone-20-20chevron-201-1-922e8d`,
    imageAlt: 'Executive presentation design — Chevron New Energies strategic narrative',
  },
  {
    slug: 'sales-agency-decks',
    name: 'Sales & Agency Decks',
    h1: 'Sales Deck & Proposal Design',
    metaTitle: 'Sales Deck Design — Proposals & Capabilities Decks That Close | Liégeois Designs',
    metaDescription:
      'Sales deck and proposal design for agencies and B2B teams. Capabilities decks, RFP responses, and modular slide systems built around your buyer — editable templates included.',
    tagline: "Proposals that don't wait for a follow-up.",
    lead:
      'Proposals, capabilities decks, and RFP responses that make prospects say yes before the meeting ends.',
    body: [
      "A sales deck has a harder job than a pitch deck: it gets presented by many people, forwarded to strangers, and read in silence more often than it's ever presented. Design that depends on a charismatic presenter fails the moment the PDF leaves your hands.",
      "So we build sales decks as modular systems: slides that work in sequence and standalone, a narrative spine that survives reordering, and a positioning pass that sharpens your value proposition until it cuts. Agencies use us for the meta-problem — the pitch about pitching — because we've sat on their side of the table at Ogilvy, Grey, and RAPP engagements.",
      'Every system ships as a fully editable master template your team actually keeps using — with a walkthrough session so the deck stays on-brand after the tenth edit, not just the first.',
    ],
    deliverables: ['Positioning review', 'Modular slide system', 'Brand integration', 'Editable master template'],
    process: [
      { title: 'Sales motion review', detail: 'Understand the buyer and the objection sequence' },
      { title: 'Positioning pass', detail: 'Sharpen the value proposition until it cuts' },
      { title: 'Modular design', detail: 'Slides that work in sequence and standalone' },
      { title: 'Template build', detail: 'Fully editable, reusable, on-brand' },
      { title: 'Handoff', detail: 'Team walkthrough included' },
    ],
    timeline: '1–3 weeks',
    faqs: [
      {
        q: 'Will our team be able to edit the deck ourselves?',
        a: "Yes — that's the point of the template build. Master slides, locked layouts, and a walkthrough session mean the deck survives contact with your sales team. If it only looks good when the designer touches it, the design failed.",
      },
      {
        q: 'Can you handle a live RFP deadline?',
        a: 'Often, yes. RFP responses run on compressed timelines by nature — tell us the submission date on day one and we will be honest about what is achievable within it.',
      },
      {
        q: 'Do you write the proposal content too?',
        a: 'We shape it. You bring the substance — the offer, the numbers, the scope. We restructure it into an argument, cut what dilutes it, and write the connective copy that makes it read like one voice.',
      },
      {
        q: 'What makes an agency capabilities deck different?',
        a: "It's a pitch about pitching — your prospects judge the deck itself as a work sample. The bar is higher and the meta-game is real. That's exactly the brief we enjoy most.",
      },
    ],
    relatedWork: ['rapp-spectrum-enterprise', 'ogilvy-for-cdw-1-98a9e', 'foodspace-sales-deck'],
    image: `${CDN}/webflow/portfolio-slides-rapp-spectrum-0001-4046a6`,
    imageAlt: 'Sales deck design — Spectrum Enterprise × RAPP',
  },
  {
    slug: 'strategic-narrative',
    name: 'Strategic Narrative',
    h1: 'Strategic Narrative Design',
    metaTitle: 'Strategic Narrative — Story Architecture Before Slide Design | Liégeois Designs',
    metaDescription:
      'Strategic narrative engagements for teams whose story needs fixing before their slides do. Audience workshops, message architecture, and full deck design — 2–4 weeks.',
    tagline: 'When the story needs fixing first.',
    lead:
      "When the problem isn't the design — it's the story. A deep-dive engagement that starts upstream: audience, insight, message architecture, then visual expression.",
    body: [
      "Some decks can't be saved by better slides, because the problem lives upstream: the argument doesn't hold, the audience was never really defined, or the message tries to be everything to everyone and lands with no one. Redesigning those slides is redecorating a house with cracked foundations.",
      'A Strategic Narrative engagement starts with a diagnostic — why the current story is not working, and for whom — then an audience workshop that surfaces what your room believes, what blocks them, and what has to change. From that comes the message architecture: the argument, the narrative spine, the one sentence that matters.',
      "Only then does design begin. Which is why this engagement produces the decks people remember years later: the visuals aren't decorating a story — they're the inevitable expression of one. Chevron's New Energies narrative and Marriott's Luxury Group story both came from this process.",
    ],
    deliverables: ['Audience & insight workshop', 'Message hierarchy', 'Full deck design', 'Presenter coaching notes'],
    process: [
      { title: 'Diagnostic', detail: "Why the current story isn't working, and for whom" },
      { title: 'Audience workshop', detail: '2–3 hours covering beliefs, blockers, what needs to change' },
      { title: 'Message architecture', detail: 'The argument, the narrative spine, the one sentence that matters' },
      { title: 'Full deck design', detail: 'Visual expression of the new story' },
      { title: 'Presenter coaching', detail: 'How to deliver it, not just read it' },
    ],
    timeline: '2–4 weeks',
    faqs: [
      {
        q: 'How is this different from hiring a presentation designer?',
        a: "A presentation designer improves your slides. A strategic narrative engagement questions whether those slides should exist. It's closer to positioning work than design work — the deck at the end is the artifact, not the product.",
      },
      {
        q: 'Who needs to be in the audience workshop?',
        a: 'The people who own the story: usually the presenter, one decision-maker, and whoever knows the audience best. Two to three hours, remote or in person. Larger groups dilute it.',
      },
      {
        q: 'Can we do the narrative work now and design later?',
        a: 'Yes — the message architecture stands on its own and some teams take it in-house from there. Most come back for the design, because expressing a narrative visually is where it either becomes real or dissolves back into bullet points.',
      },
      {
        q: 'What does this cost relative to a standard deck project?',
        a: "It's the largest engagement we offer — typically two to three times a standard deck, reflecting the workshop and strategy time. It's also the one clients describe as changing how their whole team communicates, not just one presentation.",
      },
    ],
    relatedWork: ['chevron-new-energies', 'marriott-luxury-group', 'bloomberg-media-internal-dei-strategy'],
    image: `${CDN}/webflow/marriott-the-luxury-group-slide-1-c397f7`,
    imageAlt: 'Strategic narrative design — Marriott Luxury Group',
  },
]

export const servicePageBySlug = Object.fromEntries(servicePages.map((s) => [s.slug, s]))
