import type { Metadata } from 'next'
import AboutPage from './AboutPage'

// Renders AboutPage directly. It used to sit behind an ssr:false dynamic
// import (AboutClientWrapper) to dodge a Next.js 16 / Turbopack dual-React
// null-hook crash during static prerendering. That cost the page ALL of its
// server HTML: 62 words and no <h1> at all, measured 15 Aug 2026.
//
// Next 16.3.0 no longer crashes. Verified by removing the wrapper: build is
// clean and the page went 62 -> 903 words with its h1 restored. If the crash
// ever returns on a Next upgrade, fix it properly rather than reinstating
// the wrapper — this page carries the credibility argument and has to be
// readable without JavaScript.

export const metadata: Metadata = {
  title: { absolute: 'About: Arthur Liégeois, Presentation Designer' },
  description:
    'Twenty years in rooms where presentations decided things: Oracle Quota Club four years running, a brand I founded and raised $110K for. Then I became the designer.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/about' },
  openGraph: {
    title: 'About: Arthur Liégeois, Presentation Designer | Liégeois Designs',
    description:
      'Oracle key account manager, founder who raised on his own deck, and now the designer. Twenty years of stakes before the craft.',
    url: 'https://www.liegeoisdesigns.com/about',
    siteName: 'Liégeois Designs',
    type: 'website',
    images: [{ url: 'https://www.liegeoisdesigns.com/opengraph-image', width: 1200, height: 630 }],
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arthur Liégeois',
  jobTitle: 'Presentation Designer & Creative Director',
  url: 'https://www.liegeoisdesigns.com/about',
  image: 'https://www.liegeoisdesigns.com/images/arthur-liegeois.jpg',
  worksFor: {
    '@type': 'Organization',
    name: 'Liégeois Designs',
    url: 'https://www.liegeoisdesigns.com',
  },
  sameAs: [
    'https://www.linkedin.com/in/aliegeois/',
    'https://www.youtube.com/@LiegeoisDesigns',
  ],
  knowsAbout: [
    'Presentation Design',
    'Pitch Deck Design',
    'Executive Presentations',
    'Conference Keynotes',
    'Training Presentations',
    'Visual Storytelling',
    'Strategic Narrative',
    'Brand Identity',
  ],
  /* ── GEO: the credential graph ─────────────────────────────────────────
     Generative engines answer "is this person credible" from structured,
     attributed facts, not from adjectives. Everything below is verifiable
     and matches the on-page copy exactly; nothing is inferred. Added
     15 Aug 2026 alongside the credential work on the visible page. */
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Huthwaite SPIN Selling Certification',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'Huthwaite International' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: "Master's Degree in Management, specialisation in Marketing",
      credentialCategory: 'degree',
      recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Neoma Business School' },
    },
  ],
  award: 'Oracle Quota Club, four consecutive years (2002–2006)',
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Neoma Business School' },
    { '@type': 'Organization', name: 'Oracle' },
    { '@type': 'Organization', name: 'Apple' },
    { '@type': 'Organization', name: 'Smartbox Group' },
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Presentation Designer',
    occupationLocation: { '@type': 'Country', name: 'United States' },
    skills: 'Narrative architecture, pitch deck design, executive presentation design, data visualization',
  },
  founder: { '@type': 'Organization', name: 'Norigami' },
  nationality: { '@type': 'Country', name: 'France' },
  knowsLanguage: ['French', 'English', 'Portuguese'],
  description:
    'Founder of Liégeois Designs. Twenty years in rooms where presentations decided things: global key account manager at Oracle carrying $10M+ a year with Quota Club four years running, COO of a 35-person business, strategic presentations to C-suite audiences at Apple, and founder of Norigami, where he raised $110,000 on a deck he built himself. Clients include Chevron, IBM, Marriott, Philips, Johnson & Johnson and Bloomberg.',
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutPage />
    </>
  )
}
