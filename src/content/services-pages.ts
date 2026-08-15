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
  /** Hero deck stack, BACK and MID cards. The front card is `image`.
      Explicit rather than derived from relatedWork[].images[0], because that
      was usually the SAME FILE as `image` and rendered the front slide twice
      (measured on 3 of 4 pages, 15 Aug 2026). Each entry must be a different
      project from the other two, and non-cover slides are preferred here so
      the stack reads as a deck rather than three title cards. */
  deckSlides: [string, string]
}

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs'

export const servicePages: ServicePage[] = [
  {
    slug: 'pitch-deck-design',
    name: 'Pitch & Investor Decks',
    h1: 'Pitch Deck Design',
    metaTitle: 'Pitch Deck Design Services | Liégeois Designs',
    metaDescription:
      'Investor pitch deck design for founders raising capital. Narrative-first decks built around your story and your ask. 1–2 week turnaround.',
    tagline: 'For founders raising capital.',
    lead:
      'The deck you bring into the most important room of your year. Built around your story, your audience, and the specific ask that needs to land.',
    body: [
      "Most pitch decks fail before the first slide, because they're built as inventories (team, product, market, traction) instead of arguments. Investors don't fund inventories. They fund a story about why this, why now, and why you, told by someone who clearly understands the room they're walking into.",
      "That's where we start: not in PowerPoint, but with your narrative. Who's across the table, what they believe before you speak, which objections are already forming, and what needs to be true when you finish. Then the deck gets designed around that argument, structure first, design second. Always.",
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
        q: "We're three weeks out from a Series A. Is that enough time?",
        a: "Usually yes. A focused rebuild runs 1–2 weeks, and three weeks leaves room for a round of investor feedback before the real meetings. What I need on day one is the ask, the traction you can actually evidence, and the two objections you already know are coming. If you are inside ten days, say so in the first message and I will tell you honestly what is achievable.",
      },
      {
        q: "Can you work from what we already have?",
        a: "Yes, and it is usually faster that way. Send the previous deck, the financial model, and the last couple of investor updates. Founders often have all of that collected in a data room for diligence; whatever form yours is in, that is fine. The argument is almost always already written down somewhere in there, just not in the order that makes it land. NDAs are signed before anything is shared.",
      },
      {
        q: "We're raising a bridge round, not a priced round. Does that change anything?",
        a: "It changes the argument, not the process. A bridge has to explain why the extra runway produces a materially different company at the next raise, which is a harder story than a straight growth narrative and the one most decks skip. That is the slide we would spend the most time on.",
      },
      {
        q: 'How much does professional pitch deck design cost?',
        a: 'Engagements start at $5,000. Beyond that it depends on scope: a focused redesign of an existing narrative costs less than a full strategic build from scratch. After a 30-minute intake call you get a fixed quote, not an hourly meter. No surprises mid-project.',
      },
      {
        q: 'How long does a pitch deck take?',
        a: 'One to two weeks for most raises, from intake call to final files. Rush timelines are possible with a surcharge, mention your deadline in the first message.',
      },
      {
        q: 'Do you work on the story, or just make slides look better?',
        a: "Story first, always. Roughly half of every engagement is narrative work: the argument, the objection sequence, the one sentence investors repeat to their partners. Design that decorates a broken story is money wasted. We don't sell it.",
      },
      {
        q: 'What stage founders do you work with?',
        a: 'Pre-seed through Series C, plus M&A and internal funding decks. The mechanics differ by stage (a seed deck sells belief, a B deck sells evidence) and the design reflects that.',
      },
    ],
    relatedWork: ['echo-society-pitch-deck-2', 'university-startups', 'norigami-brand'],
    // Was a slide from the Evolus x RAPP deck ("Adapting to the evolving data
    // landscape"). That is agency work, not a founder pitch deck, so it sat
    // wrong on the page selling investor decks. Swapped 15 Aug 2026 for the
    // Echo Society cover, which is a real startup pitch deck.
    image: `${CDN}/webflow/portfolio-slides-echo-society-pitch-deck-0001-51d816`,
    imageAlt: 'Investor pitch deck design sample: Echo Society cover slide',
    deckSlides: [`${CDN}/spaceship-09.jpg`, `${CDN}/webflow/portfolio-slides-university-startups-pitch-deck-0004-f1a8ad`],
  },
  {
    slug: 'executive-presentations',
    name: 'Executive Presentations',
    h1: 'Executive Presentation Design',
    metaTitle: 'Executive Presentation & Board Deck Design | Liégeois Designs',
    metaDescription:
      'Board decks, C-suite briefings and keynotes, trusted by Chevron, IBM and Philips presenters. Designed to be trusted on sight.',
    tagline: 'High stakes by definition.',
    lead:
      'Board decks, C-suite briefings, and strategic reviews that show, not just tell, the decision that needs to be made.',
    body: [
      'An executive audience gives you minutes, not meetings. They skim, they interrupt, they decide early and confirm late. A deck built for that room does something most corporate presentations never do: it respects the audience enough to lead with the point, prove it visually, and stop.',
      "We've designed executive narratives for Chevron, IBM, Philips, Bloomberg Media, and teams inside Apple, rooms where the presenter's credibility is decided in the first ninety seconds. The design language that survives those rooms is calm, precise, and dense with meaning, never with text.",
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
        q: "Is this the same as a board deck?",
        a: "A board deck is the most common version of it, yes, along with quarterly business reviews, investor updates and LP reports. What they share is an audience that has read the numbers before the meeting and is deciding whether to trust your read of them.",
      },
      {
        q: "Our board pack is 40 pages of appendix. Do you touch that?",
        a: "The appendix stays an appendix, and it should. The work is separating the ten slides that carry the decision from the thirty that exist to answer questions, then making sure the presented section stands alone when it circulates afterwards without you in the room.",
      },
      {
        q: 'Can you work under NDA with confidential board material?',
        a: 'Yes, most executive engagements run under NDA, and several clients appear in our portfolio only as anonymized formats. Confidentiality workflows (redacted reviews, secure transfer, no cloud AI processing of your data) are standard, not special requests.',
      },
      {
        q: 'Our deck is 60 slides. Is that a problem?',
        a: "Usually, yes, but the fix is editorial, not cosmetic. Part of every engagement is deciding what the room actually needs versus what the appendix can carry. Most 60-slide decks are a 15-slide argument wearing a 45-slide safety blanket.",
      },
      {
        q: 'Do you design in our corporate template?',
        a: 'When the template serves the story, yes. When it fights the story, we design within your brand system but beyond the template, and give you the ammunition to defend that choice internally.',
      },
      {
        q: 'PowerPoint, Keynote, or Google Slides?',
        a: "Whichever your organization needs to own afterward. We're fluent in all of them and loyal to none. The tool was never the point.",
      },
    ],
    relatedWork: ['chevron-new-energies', 'ibm-quantum-summit-2022-cn3q3', 'philips-healthcare'],
    // Was a text-heavy Chevron slide. Replaced 15 Aug 2026: a page selling
    // executive presentations should lead with a slide an executive could read
    // in two seconds, not a paragraph. This one is three figures and an image.
    // Full URL rather than the CDN template because it sits outside the
    // liegeois-designs folder; cloudinary-loader still applies f_auto/q/w.
    image: 'https://res.cloudinary.com/dryyhpqew/image/upload/v1783868679/250923_Fivestone-Studios-Chevron.079_vpaazn.jpg',
    imageAlt: 'Executive presentation design: a by-the-numbers impact slide, Chevron via Fivestone Studios',
    deckSlides: [`${CDN}/webflow/portfolio-slides-philips-experience-intro-0004-8fc69a`, `${CDN}/webflow/portfolio-slides-ibm-quantum-summit-0011-b40ab6`],
  },
  {
    slug: 'sales-agency-decks',
    name: 'Sales & Agency Decks',
    h1: 'Sales Deck & Proposal Design',
    metaTitle: 'Sales Deck & Proposal Design | Liégeois Designs',
    metaDescription:
      'Sales deck and proposal design for agencies and B2B teams. Capabilities decks, RFP responses and modular slide systems that close.',
    tagline: "Proposals that don't wait for a follow-up.",
    lead:
      'Proposals, capabilities decks, and RFP responses that make prospects say yes before the meeting ends.',
    body: [
      "A sales deck has a harder job than a pitch deck: it gets presented by many people, forwarded to strangers, and read in silence more often than it's ever presented. Design that depends on a charismatic presenter fails the moment the PDF leaves your hands.",
      "So we build sales decks as modular systems: slides that work in sequence and standalone, a narrative spine that survives reordering, and a positioning pass that sharpens your value proposition until it cuts. Agencies use us for the meta-problem, the pitch about pitching, because we've sat on their side of the table at Ogilvy, Grey, and RAPP engagements.",
      'Every system ships as a fully editable master template your team actually keeps using, with a walkthrough session so the deck stays on-brand after the tenth edit, not just the first.',
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
        a: "Yes. That's the point of the template build. Master slides, locked layouts, and a walkthrough session mean the deck survives contact with your sales team. If it only looks good when the designer touches it, the design failed.",
      },
      {
        q: 'Can you handle a live RFP deadline?',
        a: 'Often, yes. RFP responses run on compressed timelines by nature, tell us the submission date on day one and we will be honest about what is achievable within it.',
      },
      {
        q: 'Do you write the proposal content too?',
        a: 'We shape it. You bring the substance, the offer, the numbers, the scope. We restructure it into an argument, cut what dilutes it, and write the connective copy that makes it read like one voice.',
      },
      {
        q: 'What makes an agency capabilities deck different?',
        a: "It's a pitch about pitching, your prospects judge the deck itself as a work sample. The bar is higher and the meta-game is real. That's exactly the brief we enjoy most.",
      },
    ],
    relatedWork: ['rapp-spectrum-enterprise', 'ogilvy-for-cdw-1-98a9e', 'foodspace-sales-deck'],
    image: `${CDN}/webflow/portfolio-slides-rapp-spectrum-0001-4046a6`,
    imageAlt: 'Sales deck design: Spectrum Enterprise × RAPP',
    deckSlides: [`${CDN}/webflow/portfolio-slides-rapp-evolus-pitch-deck-0005-e97303`, `${CDN}/webflow/portfolio-slides-ogilvy-cdw-0007-743d5c`],
  },
  {
    slug: 'strategic-narrative',
    name: 'Strategic Narrative',
    h1: 'Strategic Narrative Design',
    metaTitle: 'Strategic Narrative Design | Liégeois Designs',
    metaDescription:
      'Strategic narrative engagements for teams whose story needs fixing before their slides do. Audience workshops, message architecture, and full deck design, 2–4 weeks.',
    tagline: 'When the story needs fixing first.',
    lead:
      "When the problem isn't the design. It's the story. A deep-dive engagement that starts upstream: audience, insight, message architecture, then visual expression.",
    body: [
      "Some decks can't be saved by better slides, because the problem lives upstream: the argument doesn't hold, the audience was never really defined, or the message tries to be everything to everyone and lands with no one. Redesigning those slides is redecorating a house with cracked foundations.",
      'A Strategic Narrative engagement starts with a diagnostic (why the current story is not working, and for whom) then an audience workshop that surfaces what your room believes, what blocks them, and what has to change. From that comes the message architecture: the argument, the narrative spine, the one sentence that matters.',
      "Only then does design begin. Which is why this engagement produces the decks people remember years later: the visuals aren't decorating a story. They're the inevitable expression of one. Chevron's New Energies narrative and Marriott's Luxury Group story both came from this process.",
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
        q: "We're pre-product-market-fit. Is it too early for this?",
        a: "Often it is exactly the right time, because the thing that is unclear is usually the story rather than the product. But be honest with yourself about which one it is. If the positioning genuinely has not settled, narrative work will surface that fast, which is useful and occasionally uncomfortable.",
      },
      {
        q: "Does this cover the go-to-market narrative, not just a deck?",
        a: "Yes. The message architecture is format-agnostic: the same spine feeds the pitch deck, the website, the sales one-pager and how the founding team answers the question at a dinner. Most teams come for the deck and find the second use is worth more.",
      },
      {
        q: 'How is this different from hiring a presentation designer?',
        a: "A presentation designer improves your slides. A strategic narrative engagement questions whether those slides should exist. It's closer to positioning work than design work, the deck at the end is the artifact, not the product.",
      },
      {
        q: 'Who needs to be in the audience workshop?',
        a: 'The people who own the story: usually the presenter, one decision-maker, and whoever knows the audience best. Two to three hours, remote or in person. Larger groups dilute it.',
      },
      {
        q: 'Can we do the narrative work now and design later?',
        a: 'Yes, the message architecture stands on its own and some teams take it in-house from there. Most come back for the design, because expressing a narrative visually is where it either becomes real or dissolves back into bullet points.',
      },
      {
        q: 'What does this cost relative to a standard deck project?',
        a: "It's the largest engagement we offer, typically two to three times a standard deck, reflecting the workshop and strategy time. It's also the one clients describe as changing how their whole team communicates, not just one presentation.",
      },
    ],
    relatedWork: ['chevron-new-energies', 'marriott-luxury-group', 'bloomberg-media-internal-dei-strategy'],
    image: `${CDN}/webflow/marriott-the-luxury-group-slide-1-c397f7`,
    imageAlt: 'Strategic narrative design: Marriott Luxury Group',
    deckSlides: [`${CDN}/webflow/portfolio-slides-bloomberg-internal-deck-0002-065b4b`, `${CDN}/journey/chevron-05`],
  },
  {
    slug: 'training-keynote-design',
    name: 'Keynotes & Training',
    h1: 'Keynote & Training Presentation Design',
    metaTitle: 'Keynote & Training Presentation Design | Liégeois Designs',
    metaDescription:
      'Keynote and training design for conferences, summits and field teams. Work for IBM Quantum, EMD Serono and Intercept.',
    tagline: 'When the room has to learn something.',
    lead:
      'Conference keynotes, summit sessions, and field training that people actually absorb. Different from a pitch: nobody here is deciding whether to fund you. They are deciding whether to listen.',
    body: [
      "A pitch asks for a decision. A keynote or a training deck asks for attention, and then for retention, which is harder. The audience did not choose to be persuaded; they chose to be in the room, and they will decide within ninety seconds whether to stay in it mentally. Most training decks lose them because they were built as reference documents that someone then read aloud.",
      'The fix is structural. A teaching presentation needs a spine that survives being paused, questioned and returned to, so we build it around a small number of ideas the audience can carry out of the room, not around everything the subject-matter expert knows. Then the density comes down, the sequence does the explaining, and the slides stop competing with the speaker.',
      "That principle scales in both directions. IBM's Quantum Summit keynote had to make quantum computing land for a mixed technical and executive audience. Intercept's field training had to align a regional salesforce around a market shift. EMD Serono's summit had to unify leadership across regions. Same discipline, different rooms.",
    ],
    deliverables: [
      'Learning-first structure',
      'Slide design (20–60 slides)',
      'Animation and build sequencing',
      'Facilitator and speaker notes',
    ],
    process: [
      { title: 'Audience and outcome', detail: 'Who is in the room, and what should they do differently after' },
      { title: 'Content triage', detail: 'What survives, what becomes a leave-behind, what goes' },
      { title: 'Teaching structure', detail: 'The few ideas they carry out, and the order that makes them stick' },
      { title: 'Design and build', detail: 'Sequencing and animation so the slides support the speaker' },
      { title: 'Facilitator notes', detail: 'So anyone on the team can deliver it, not just the author' },
    ],
    timeline: '2–3 weeks',
    faqs: [
      {
        q: 'How is a training deck different from a pitch deck?',
        a: 'A pitch has one ask and one moment. A training deck has to survive interruption, questions and a facilitator who is not the person who wrote it. It is built for retention rather than persuasion, which changes the structure, the density, and how much lives in speaker notes instead of on the slide.',
      },
      {
        q: 'Our deck is 60 slides of dense technical content. Can that work on stage?',
        a: 'Yes, and it usually should not stay 60 slides. IBM Quantum Summit is the reference point: dense technical material for a mixed technical and executive audience. The content did not shrink, the sequencing changed so each slide carried one idea rather than five.',
      },
      {
        q: 'Can our team deliver it without you?',
        a: 'That is the point. Every training engagement ships facilitator notes, so a regional lead or a rep can run the session as well as the person who built it. If the deck only works when its author presents it, it is not finished.',
      },
      {
        q: 'Do you handle animation and build sequencing?',
        a: 'Yes, and for teaching material it matters more than for a pitch. Revealing a diagram in the order the explanation follows is the difference between an audience listening and an audience reading ahead.',
      },
      {
        q: 'What does it cost?',
        a: 'Engagements start at $5,000. Training and keynote projects usually run 2–3 weeks, and the range depends on slide count, animation depth, and whether facilitator notes are needed for multiple regions. You get a fixed quote after a 30-minute intake call.',
      },
    ],
    relatedWork: ['ibm-quantum-summit-2022-cn3q3', 'intercept-pharma', 'adm-productions-emd-1-c6815'],
    image: `${CDN}/webflow/portfolio-slides-ibm-quantum-summit-0017-aa11b2`,
    imageAlt: 'Keynote design: IBM Quantum Summit 2022',
    deckSlides: [
      `${CDN}/webflow/tbcg-iot-slide-1-30e79f`,
      `${CDN}/webflow/portfolio-slides-toddstreet-intercept-oca-aug-training-0001-ddc7f1`,
    ],
  },
]

export const servicePageBySlug = Object.fromEntries(servicePages.map((s) => [s.slug, s]))
