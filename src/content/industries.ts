/**
 * Industry hubs — commercial landing pages, not a filtered portfolio view.
 *
 * WHY THESE EXIST
 * 36 case studies sat in one flat list, reachable only from /work. That ranks
 * for client brand names (which is why "uptravi" is a position-1 query and
 * worth nothing) and for no commercial term at all.
 *
 * These target the query a buyer actually types — "pitch deck design for
 * healthcare" — and, more importantly for generative engines, they make an
 * extractable, attributed claim in plain prose: N presentations, these
 * clients, these formats. That is the shape of thing an LLM cites.
 *
 * ONLY buckets with 5+ studies get a hub. Media & Entertainment (3) and
 * Energy & Sustainability (1) remain valid taxonomy values for filtering and
 * for the related-work matcher, but a hub built on one case study is a thin
 * page and thin pages hurt. Revisit when the work exists.
 *
 * `industry` must match the values in case-studies.ts exactly — the hub reads
 * its studies at build time by filtering on it, so there is no second list to
 * drift out of sync.
 */

export type Industry = {
  slug: string
  /** must match CaseStudy.industry verbatim */
  industry: string
  /** short label for nav and cards */
  name: string
  h1: string
  metaTitle: string
  metaDescription: string
  /** One sentence under the h1. MUST NOT contain counts or client lists: the
      page generates both from case-studies.ts, and a hand-written duplicate
      goes stale the moment a study is added or re-tagged. That happened
      within hours of shipping — Evolus moved out of Healthcare and two leads
      were instantly wrong. */
  lead: string
  /** 2–3 paragraphs. What is actually different about presenting in this
      sector — written from the work, not from a template. */
  body: string[]
  /** the service slugs this sector most often buys */
  services: string[]
}

export const industries: Industry[] = [
  {
    slug: 'healthcare-pharma',
    industry: 'Healthcare & Pharma',
    name: 'Healthcare & Pharma',
    h1: 'Presentation design for healthcare and pharma',
    metaTitle: 'Healthcare & Pharma Presentation Design | Liégeois Designs',
    metaDescription:
      'Presentation design for healthcare and pharmaceutical teams. Field training, medical affairs summits and board decks for Philips, Johnson & Johnson, Intercept and EMD Serono.',
    lead:
      'Medical affairs, commercial and field teams, where the science is airtight and the argument still has to survive review.',
    body: [
      'Healthcare decks fail in a specific way: the science is airtight and the argument never arrives. Medical, legal and regulatory review rewards precision and punishes claims, so slides accumulate qualifiers until the point is buried three levels down. The reviewer is satisfied and the room is lost.',
      'The work is finding the argument that survives review intact. That usually means moving the conclusion to the top of the slide rather than the bottom, letting one number carry what a paragraph was carrying, and putting the caveats where they belong instead of where they interrupt. None of that requires weakening the claim, which is the objection this sector raises first.',
      'It also means designing for a facilitator who is not the author. Field training and medical affairs decks get delivered by regional teams months after they are built, so what lives in the speaker notes matters as much as what lives on the slide.',
    ],
    services: ['executive-presentations', 'training-keynote-design', 'pitch-deck-design'],
  },
  {
    slug: 'technology',
    industry: 'Technology & Telecom',
    name: 'Technology & Telecom',
    h1: 'Presentation design for technology companies',
    metaTitle: 'Technology Presentation & Pitch Deck Design | Liégeois Designs',
    metaDescription:
      'Pitch decks, keynotes and executive presentations for technology and telecom teams, including IBM Quantum, Google, CDW, Spectrum Enterprise and Underpin.',
    lead:
      'Enterprise and startup technology teams, where the person presenting usually understands the subject too well to explain it.',
    body: [
      'The recurring problem in technology decks is that the person presenting understands the thing too well. Expertise compresses: what took years to learn becomes one dense slide, and the audience is asked to decompress it in real time. The IBM Quantum Summit keynote is the clearest case, quantum computing for a room that was half engineers and half executives.',
      'The fix is not simplification, which technical audiences correctly resent. It is sequencing. One idea per slide, revealed in the order the explanation actually follows, so the diagram builds as the speaker talks rather than sitting there complete while everyone reads ahead.',
      'Enterprise technology adds a second problem: the buying committee. A deck that persuades the engineer rarely persuades the CFO who signs, and the version that persuades the CFO usually loses the engineer. Both have to be in the same deck without either feeling written for someone else.',
    ],
    services: ['pitch-deck-design', 'training-keynote-design', 'sales-agency-decks'],
  },
  {
    slug: 'agencies',
    industry: 'Agencies & Consultancies',
    name: 'Agencies & Consultancies',
    h1: 'Presentation design for agencies and consultancies',
    metaTitle: 'Agency Pitch & Capabilities Deck Design | Liégeois Designs',
    metaDescription:
      'New business pitches, capabilities decks and strategic narrative for agencies and consultancies, including Ogilvy Performance Marketing, RAPP, MCS Healthcare and the IAA.',
    lead:
      'New business pitches and capabilities decks, where the deck itself is judged as the work sample.',
    body: [
      'Agencies are the hardest client and the best one. Hardest because the deck is judged as a work sample: a new business pitch that looks average is an argument against hiring you, whatever it says. Best because nobody has to be convinced that the craft matters.',
      'What agencies actually need is capacity and distance. Capacity because pitch weeks collide with delivery, and distance because the team closest to the work is the least able to see which slide is doing nothing. I have been the outside pair of eyes on new business pitches for Ogilvy Performance Marketing, RAPP and Grey.',
      'Confidentiality is the baseline. NDAs are signed before a brief is shared, and agency-partner work is presented as the agency’s, not mine, unless we have agreed otherwise.',
    ],
    services: ['sales-agency-decks', 'strategic-narrative', 'pitch-deck-design'],
  },
  {
    slug: 'startups',
    industry: 'Startups & Venture',
    name: 'Startups & Venture',
    h1: 'Pitch deck design for startups raising capital',
    metaTitle: 'Startup Pitch Deck Design for Founders Raising | Liégeois Designs',
    metaDescription:
      'Investor pitch deck design for founders raising capital. Narrative-first decks built around your ask, from a designer who raised his own round on a deck he built himself.',
    lead:
      'Founders raising capital. I raised $110,000 for my own company on a deck I built myself, so I know which slide the room goes quiet on.',
    body: [
      'Most pitch decks fail before the first slide because they are built as inventories rather than arguments. Team, product, market, traction, ask, in that order, every time, because that is the order of the template. Investors do not fund inventories. They fund a claim about why this, why now, and why you, with the evidence arranged to make the conclusion feel like their own idea.',
      'I have been on the other side of this. Norigami was my company; I wrote the deck, walked it into the room, and raised $110,000 on it. That is a small number next to the totals agencies advertise, and it is the point: those are their clients’ raises. This one was mine, and I remember exactly which slide the room went quiet on.',
      'Practically, a fundraise deck has to survive being forwarded. The version you present and the version that circulates without you are the same file, so the argument has to hold when nobody is there to narrate it.',
    ],
    services: ['pitch-deck-design', 'strategic-narrative'],
  },
  {
    slug: 'consumer-retail',
    industry: 'Consumer & Retail',
    name: 'Consumer & Retail',
    h1: 'Presentation design for consumer and retail brands',
    metaTitle: 'Consumer & Retail Brand Presentation Design | Liégeois Designs',
    metaDescription:
      'Brand, franchise and new business presentation design for consumer and retail, including Marriott Luxury Group, Mastercard, Evolus, TGI Fridays and Post Consumer Brands.',
    lead:
      'Hospitality, franchise, beauty and FMCG brands, where there is never a shortage of feeling and often no spine.',
    body: [
      'Consumer brands arrive with the opposite problem to pharma: no shortage of feeling, no spine. The deck is beautiful, on-brand, full of lifestyle photography, and after twenty slides the room still cannot say what is being asked of them.',
      'These audiences are also unusually design-literate, which cuts both ways. They will notice craft, and they will notice when craft is standing in for an argument. A franchise rollout has to land with operators who did not choose to be there; a luxury brand narrative has to sound like the brand and still make a case.',
      'The discipline is the same as everywhere else, just less expected here: decide what the room has to do differently afterwards, then cut everything that is not moving them toward it.',
    ],
    services: ['executive-presentations', 'strategic-narrative', 'training-keynote-design'],
  },
]

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]))
