// ─────────────────────────────────────────────────────────────────────────────
// Case Studies Collection — Liegeois Designs
//
// Each entry maps to a portfolio card and (eventually) a /work/[slug] detail page.
// Images are paths relative to /public — served directly by Next.js.
// The first image in each array is the card thumbnail.
//
// featured: true  → appears in the homepage portfolio grid (max 6)
// featured: false → appears on the full /work page only
// order           → controls sort order on the homepage grid
// ─────────────────────────────────────────────────────────────────────────────

import type { CaseStudy } from './types'

export const caseStudies: CaseStudy[] = [
  // ── FEATURED ───────────────────────────────────────────────────────────────

  {
    slug: 'chevron-new-energies',
    client: 'Chevron New Energies',
    project: 'New Energies Strategic Narrative',
    format: 'Executive Presentation',
    industry: 'Energy / Sustainability',
    year: 2025,
    tagline: 'A strategic narrative that reframed an energy giant\'s future.',
    images: [
      '/images/Case Studies-slides/Fivestone-Chevron-New-Energies/Fivestone-Chevron-New-Energies-slides/250923_Fivestone-Studios-Chevron/250923_Fivestone-Studios-Chevron.010.jpeg',
      '/images/Case Studies-slides/Fivestone-Chevron-New-Energies/Fivestone-Chevron-New-Energies-slides/250923_Fivestone-Studios-Chevron/250923_Fivestone-Studios-Chevron.002.jpeg',
      '/images/Case Studies-slides/Fivestone-Chevron-New-Energies/Fivestone-Chevron-New-Energies-slides/250923_Fivestone-Studios-Chevron/250923_Fivestone-Studios-Chevron.025.jpeg',
      '/images/Case Studies-slides/Fivestone-Chevron-New-Energies/Fivestone-Chevron-New-Energies-slides/250923_Fivestone-Studios-Chevron/250923_Fivestone-Studios-Chevron.030.jpeg',
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
      '/images/Case Studies-slides/Marriott - Luxury Group/Marriott-Luxury-Group-slides/Slide1.jpeg',
      '/images/Case Studies-slides/Marriott - Luxury Group/Marriott-Luxury-Group-slides/Slide10.jpeg',
      '/images/Case Studies-slides/Marriott - Luxury Group/Marriott-Luxury-Group-slides/Slide12.jpeg',
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
      '/images/Case Studies-slides/Echo Society/Echo Society Deck 1/Echo Society Deck 1/Echo Society Deck 1.001.jpeg',
      '/images/Case Studies-slides/Echo Society/Echo Society Deck 1/Echo Society Deck 1/Echo Society Deck 1.006.jpeg',
      '/images/Case Studies-slides/Echo Society/Echo Society Deck 1/Echo Society Deck 1/Echo Society Deck 1.012.jpeg',
      '/images/Case Studies-slides/Echo Society/Echo Society Deck 1/Echo Society Deck 1/Echo Society Deck 1.020.jpeg',
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
      '/images/Case Studies-slides/The Spaceship/The Spaceship Deck Images/The Spaceship - Investor Deck_Page_01.jpg',
      '/images/Case Studies-slides/The Spaceship/The Spaceship Deck Images/The Spaceship - Investor Deck_Page_05.jpg',
      '/images/Case Studies-slides/The Spaceship/The Spaceship Deck Images/The Spaceship - Investor Deck_Page_09.jpg',
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
      '/images/Case Studies-slides/RAPP/RAPP-Capital-One-Personas/Slide1.jpeg',
      '/images/Case Studies-slides/RAPP/RAPP-Capital-One-Personas/Slide10.jpeg',
      '/images/Case Studies-slides/RAPP/RAPP-Capital-One-Personas/Slide12.jpeg',
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
      '/images/Case Studies-slides/MCS Healthcare/MCS-Healthcare-JandJ/MCS-Healthcare-JandJ-1/Slide1.jpeg',
      '/images/Case Studies-slides/MCS Healthcare/MCS-Healthcare-JandJ/MCS-Healthcare-JandJ-1/Slide10.jpeg',
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
      '/images/Case Studies-slides/Philips Healthcare/Philips Healthcare-slides/Slide1.jpeg',
      '/images/Case Studies-slides/Philips Healthcare/Philips Healthcare-slides/Slide14.jpeg',
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
      '/images/Case Studies-slides/ToddStreet/OCA Jan2024 POA New Resources WS FG_D2_v25_011224_LMRC_IC_PL added dsm-ali/Slide1.jpeg',
      '/images/Case Studies-slides/ToddStreet/OCA Jan2024 POA New Resources WS FG_D2_v25_011224_LMRC_IC_PL added dsm-ali/Slide10.jpeg',
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
      '/images/Case Studies-slides/RAPP/OPMG/250418_Connected Data Deck Update _USE THIS VERSION - Edits Arthur-fixed/250418_Connected Data Deck Update _USE THIS VERSION - Edits Arthur-fixed.005.jpeg',
      '/images/Case Studies-slides/RAPP/OPMG/250418_Connected Data Deck Update _USE THIS VERSION - Edits Arthur-fixed/250418_Connected Data Deck Update _USE THIS VERSION - Edits Arthur-fixed.001.jpeg',
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
      '/images/Case Studies-slides/Underpin/230417_Underpin_Deck.jpg',
      '/images/Case Studies-slides/Underpin/230417_Underpin_Deck10.jpg',
      '/images/Case Studies-slides/Underpin/230417_Underpin_Deck12.jpg',
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
      '/images/Case Studies-slides/University Startups/221113_Presentation_University-Startups_2_Compressed/Slide1.jpeg',
      '/images/Case Studies-slides/University Startups/221113_Presentation_University-Startups_2_Compressed/Slide10.jpeg',
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
      '/images/Case Studies-slides/MCS Healthcare/MCS-Healthcare-Lupus-JPMorgan-slides/Slide1.jpeg',
      '/images/Case Studies-slides/MCS Healthcare/MCS-Healthcare-Lupus-JPMorgan-slides/Slide10.jpeg',
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
      '/images/Case Studies-slides/RAPP/RAPP-Spectrum/Rapp-Spectrum-Enterprise-slides/Slide1.jpeg',
      '/images/Case Studies-slides/RAPP/RAPP-Spectrum/Rapp-Spectrum-Enterprise-slides/Slide10.jpeg',
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
      '/images/Case Studies-slides/ProjectBe/ProjectBe-Colorcode/Slide1.jpeg',
      '/images/Case Studies-slides/ProjectBe/ProjectBe-Colorcode/Slide50.jpeg',
    ],
    featured: false,
  },
]

/** Convenience: just the featured case studies, sorted by order */
export const featuredCaseStudies = caseStudies
  .filter((cs) => cs.featured)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
