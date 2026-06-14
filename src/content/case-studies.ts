// ─────────────────────────────────────────────────────────────────────────────
// Case Studies Collection — Liegeois Designs
//
// Images are hosted on Cloudinary (cloud: dryyhpqew, folder: liegeois-designs).
// Base URL: https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs/
//
// featured: true  → appears in the homepage portfolio grid (max 6)
// featured: false → appears on the full /work page only
// order           → controls sort order on the homepage grid
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudy } from './types'

const CDN = 'https://res.cloudinary.com/dryyhpqew/image/upload/liegeois-designs'

export const caseStudies: CaseStudy[] = [
  // ── FEATURED ───────────────────────────────────────────────────────────────

  {
    slug: 'chevron-new-energies',
    client: 'Chevron New Energies',
    project: 'New Energies Strategic Narrative',
    format: 'Executive Presentation',
    industry: 'Energy / Sustainability',
    year: 2025,
    tagline: "A strategic narrative that reframed an energy giant's future.",
    images: [
      `${CDN}/chevron-01.jpg`,
      `${CDN}/chevron-02.jpg`,
      `${CDN}/chevron-03.jpg`,
      `${CDN}/chevron-04.jpg`,
    ],
    featured: true,
    order: 1,
  },

  {
    slug: 'marriott-luxury-group',
    client: 'Marriott Luxury Group',
    project: 'YouTube Content Strategy 2025',
    format: 'Executive Presentation',
    industry: 'Luxury Hospitality',
    year: 2025,
    tagline: 'A content strategy deck as cinematic as the brands it represents.',
    images: [
      `${CDN}/marriott-01.jpg`,
      `${CDN}/marriott-02.jpg`,
      `${CDN}/marriott-03.jpg`,
    ],
    featured: true,
    order: 2,
  },

  {
    slug: 'echo-society',
    client: 'Echo Society',
    project: 'Brand & Culture Storytelling Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Media / Culture',
    year: 2024,
    tagline: 'Culture presented with the same craft it celebrates.',
    images: [
      `${CDN}/echo-01.jpg`,
      `${CDN}/echo-02.jpg`,
      `${CDN}/echo-03.jpg`,
      `${CDN}/echo-04.jpg`,
    ],
    featured: true,
    order: 3,
  },

  {
    slug: 'the-spaceship',
    client: 'The Spaceship',
    project: 'Investor Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Sustainability / ESG',
    year: 2024,
    tagline: 'A pitch deck that made the stakes of ESG feel cosmic.',
    images: [
      `${CDN}/spaceship-01.jpg`,
      `${CDN}/spaceship-02.jpg`,
      `${CDN}/spaceship-03.jpg`,
    ],
    featured: true,
    order: 4,
  },

  {
    slug: 'rapp-capital-one',
    client: 'Capital One × RAPP',
    project: 'Personas — Tech Website Redesign',
    format: 'Executive Presentation',
    industry: 'Financial Services',
    year: 2023,
    tagline: 'Persona strategy presented with the precision it deserved.',
    images: [
      `${CDN}/capitalOne-01.jpg`,
      `${CDN}/capitalOne-02.jpg`,
      `${CDN}/capitalOne-03.jpg`,
    ],
    featured: true,
    order: 5,
  },

  {
    slug: 'mcs-healthcare-jandj',
    client: 'MCS Healthcare × J&J',
    project: 'Executive Pitch Deck',
    format: 'Sales & Agency Deck',
    industry: 'Healthcare / Pharma',
    year: 2024,
    tagline: 'Bold visual design for a pitch that had to command the room.',
    images: [
      `${CDN}/mcs-jj-01.jpg`,
      `${CDN}/mcs-jj-02.jpg`,
    ],
    featured: true,
    order: 6,
  },

  // ── PORTFOLIO (full /work page) ─────────────────────────────────────────────

  {
    slug: 'philips-healthcare',
    client: 'Philips Healthcare',
    project: 'Healthcare Technology Presentation',
    format: 'Executive Presentation',
    industry: 'Healthcare Technology',
    year: 2024,
    tagline: 'Technical complexity — made human.',
    images: [
      `${CDN}/philips-01.jpg`,
      `${CDN}/philips-02.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'intercept-pharma',
    client: 'Intercept Pharmaceuticals',
    project: 'POA Field Training — Strong Foundation',
    format: 'Training Presentation',
    industry: 'Pharmaceutical',
    year: 2024,
    tagline: 'Field training that reps actually wanted to sit through.',
    images: [
      `${CDN}/intercept-01.jpg`,
      `${CDN}/intercept-02.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'rapp-opmg',
    client: 'OPMG × RAPP',
    project: 'Connected Data Deck',
    format: 'Sales & Agency Deck',
    industry: 'Marketing Technology',
    year: 2025,
    tagline: 'A data story that made complexity look like clarity.',
    images: [
      `${CDN}/opmg-01.jpg`,
      `${CDN}/opmg-02.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'underpin',
    client: 'Underpin',
    project: 'Startup Pitch Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Travel Technology',
    year: 2023,
    tagline: 'A geo-centric travel app — pitched with the same sense of adventure.',
    images: [
      `${CDN}/underpin-01.jpg`,
      `${CDN}/underpin-02.jpg`,
      `${CDN}/underpin-03.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'university-startups',
    client: 'University Startups',
    project: 'Pitch Deck — A Better Future for Students',
    format: 'Pitch & Investor Deck',
    industry: 'Education / EdTech',
    year: 2022,
    tagline: 'Social entrepreneurship — framed to inspire and fund.',
    images: [
      `${CDN}/unistartups-01.jpg`,
      `${CDN}/unistartups-02.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'mcs-healthcare-lupus',
    client: 'MCS Healthcare × JPMorgan',
    project: 'Lupus Awareness Campaign Deck',
    format: 'Executive Presentation',
    industry: 'Healthcare / Finance',
    year: 2024,
    tagline: 'A sensitive subject — handled with authority and care.',
    images: [
      `${CDN}/mcs-lupus-01.jpg`,
      `${CDN}/mcs-lupus-02.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'rapp-spectrum-enterprise',
    client: 'Spectrum Enterprise × RAPP',
    project: 'Creative Immersion Session',
    format: 'Sales & Agency Deck',
    industry: 'Telecommunications',
    year: 2023,
    tagline: 'Agency thinking — made tangible for an enterprise client.',
    images: [
      `${CDN}/spectrum-01.jpg`,
      `${CDN}/spectrum-02.jpg`,
    ],
    featured: false,
  },

  {
    slug: 'projectbe-colorcode',
    client: 'ProjectBe — ColorCode',
    project: 'Brand Pitch Deck',
    format: 'Pitch & Investor Deck',
    industry: 'Consumer Technology',
    year: 2023,
    tagline: 'A brand concept — pitched with the confidence to match.',
    images: [
      `${CDN}/projectbe-01.jpg`,
      `${CDN}/projectbe-02.jpg`,
    ],
    featured: false,
  },
]

/** Convenience: just the featured case studies, sorted by order */
export const featuredCaseStudies = caseStudies
  .filter((cs) => cs.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
