// ARCHIVED case studies, 27 Sep 2026. Not imported anywhere, so not built,
// not in the sitemap, and the URLs return 404. Kept here so the copy is not lost.
// Reason: client not cleared for public use (see Website 4.0/CLAUDE.md).
// To restore one, move its block back into case-studies.ts and rerun
// node scripts/gen-home-data.mjs

import type { CaseStudy } from './types'

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs'

export const archivedCaseStudies: CaseStudy[] = [
  {
    slug: 'mcs-healthcare-jandj',
    tool: 'PowerPoint',
    seoDescription: 'Internal achievements presentation design for MCS Healthcare and Johnson & Johnson, transforming a dense corporate deck into immersive visual storytelling that commands the room.',
    client: 'MCS Healthcare × J&J',
    project: 'Internal Achievements Presentation',
    format: 'Sales & Agency Deck',
    industry: 'Healthcare & Pharma',
    year: 2024,
    tagline: 'Restraint as craft. A legacy corporate deck rebuilt into something immersive.',
    theAsk: 'MCS Healthcare was already inside J&J. What they needed was an internal achievements presentation that reflected the quality of that relationship, polished enough to carry the brand, clear enough to actually move the room.',
    challenge: 'The existing deck had the hallmarks of every legacy corporate presentation: dense slides, cluttered data, formatting that had accumulated over years of internal revisions. J&J\'s achievements were real. The way they were being presented wasn\'t doing them justice.',
    solution: 'The work was restraint as much as craft. Every slide audited for what it actually needed to say, then rebuilt around that single idea. Dense data became visual. Text-heavy layouts became hierarchy. What started as a traditional corporate deck became something immersive, editorial in feel, precise in execution. Slides 5, 8, and 9 show the shift most clearly.',
    outcome: 'The client came back satisfied. Cleaner, more confident, easier to deliver, the kind of deck that reflects well on the agency presenting it. What changed wasn\'t the information. It was how much it could be trusted to land on its own.',
    images: [
      `${CDN}/mcs-jj-01.jpg`,
      `${CDN}/mcs-jj-02.jpg`,
      'https://res.cloudinary.com/dryyhpqew/image/upload/v1782822656/MCS-J-J-4_orca62.jpg',
      'https://res.cloudinary.com/dryyhpqew/image/upload/v1782822713/MCS-J-J-6_xdvt1k.jpg',
    ],
    featured: true,
    order: 6,
    /* The three before/after pairs (slides 5, 8 and 9) were removed on
       7 Sep 2026. Arthur flagged the slide 9 data as confidential; slides 5
       and 8 came out with it because they are from the same deck and there is
       no way from here to tell which of them carry client data. Restoring any
       of them is one block of JSON — see git 051d52d — but that is a decision
       for someone who has read the MCS MSA, not a design call.

       The gallery images below are unaffected and stay. */
  },
  {
    slug: 'sunrise-cellars',
    tool: 'Other',
    client: 'Sunrise Cellars',
    project: 'Rebranding Old Wine Stores to Become a Future-proof high-end, One-Stop Shop for Wine Lovers',
    format: 'Strategic Narrative',
    industry: 'Consumer & Retail',
    year: 2025,
    tagline: 'From supermarket aisle to boutique destination: I rebranded Sunrise Cellars into a premium wine store that celebrates discovery, craftsmanship, and everyday celebration.',
    images: [
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/sunrise-cellars-storefront-2-adac1d',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/logo-sunrise-cellars-bottle-inside-2-f78a75',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/logo-sunrise-cellars-variations-wine-stains-and-glass-196d2e',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/logo-sunrise-cellars-glass-waves-753434',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/logo-sunrise-cellars-shadows-sunrise-circle-833392',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/screenshot-2025-09-11-at-3-28-27-pm-2fc0e4',
    ],
    featured: false,
    summary: 'Sunrise Cellars, with two stores in Westfield and Caldwell, NJ, wanted to evolve from their ShopRite-affiliated roots into a boutique wine destination. I guided the full transformation, from brand positioning and logo design to e-commerce optimization and promotional campaigns. The new identity highlights curated wines, natural and biodynamic selections, and a warm, expert tone of voice that resonates with both loyal locals and new customers. The result is a brand that feels modern, premium, and rooted in community.',
    theAsk: 'Rebrand two NJ wine shops into a boutique destination with a stronger identity, curated selection, and upgraded customer experience.',
    challenge: `•	Legacy branding tied to ShopRite made the stores feel generic
•	Needed to stand out in a crowded retail market
•	Website design and e-commerce lacked visual appeal and usability
•	Customer perception didn’t reflect the curated, boutique-quality wine selection`,
    solution: `•	Developed new logo concepts inspired by sun, soil, and grapes
•	Crafted a refined brand identity aligned with boutique positioning
•	Redesigned e-commerce visuals for clarity, elegance, and conversion
•	Curated wine promotions (organic, biodynamic, natural) with lifestyle-driven storytelling`,
    outcome: 'Positioned Sunrise Cellars as a distinctive boutique wine destination, elevating the in-store and online experience while signaling expertise and curation to customers.',
  },
  {
    slug: 'adm-prod-tgi-fridays-campaign',
    tool: 'PowerPoint',
    client: 'TGI Fridays Franchisor, LLC',
    project: 'Designing Impactful Visuals for a Food Franchisor\'s Keynote Event',
    format: 'Training Presentation',
    industry: 'Consumer & Retail',
    year: 2023,
    tagline: 'Bringing sizzle to the stage: A bold, brand-forward visual campaign designed to unite global franchisees under one electrifying rallying cry. Ignite the Future.',
    images: [
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/adm-prod-tgif-img-1-8f65e6',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/adm-productions-tgif-1-866a79',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/adm-productions-tgif-2-6089f1',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/adm-productions-tgif-3-cb3d24',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/adm-productions-tgif-4-b143c2',
      'https://res.cloudinary.com/dryyhpqew/image/upload/f_auto,q_auto/liegeois-designs/webflow/adm-productions-tgif-5-0fba76',
    ],
    featured: false,
    agency: 'ADM Productions',
    summary: 'TGI Fridays teamed up with ADM Productions to develop the full visual identity and screen content for its 2020 Global Business Conference. Tasked with building cohesion and energy across a multi-day leadership summit, we brought the brand’s bold voice and iconic flavor to life through layered motion graphics, nostalgic callouts, and cheeky visual storytelling, all grounded in a high-energy theme: “Ignite the Future.”',
    theAsk: 'Develop a full-stage visual language for a high-stakes global business conference.Design a look and feel that celebrates the brand’s past while galvanizing franchise owners and execs around a future-forward growth agenda.Unite diverse stakeholders with punchy, brand-immersive storytelling.',
    challenge: `• Create excitement while balancing business content and entertainment
• Maintain TGI Fridays’ edgy and nostalgic tone without feeling outdated
• Ensure consistency across video, slides, historical visuals, and food-centric storytelling
• Design for a massive LED screen backdrop, with animation synced to live presenter pacing`,
    solution: `• Designed motion-driven conference visuals anchored by the “IGNITE” theme
• Used metaphors like a deconstructed burger to symbolize brand layers
• Celebrated heritage with retro menu modules and iconic inventions
• Delivered custom animations, logo lockups, and seamless screen transitions for an immersive experience`,
    outcome: `• Energized hundreds of global attendees and franchisees with a unified creative thread
• Successfully reinforced brand legacy while repositioning Fridays for future relevance
• Created a re-usable asset library for regional markets and future leadership events
• Strengthened ADM’s relationship with the client through bold creative execution under tight production timelines`,
  },
]
