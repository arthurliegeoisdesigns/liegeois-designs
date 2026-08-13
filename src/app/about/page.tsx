import type { Metadata } from 'next'
import AboutClientWrapper from './AboutClientWrapper'

// AboutClientWrapper is a 'use client' component that hosts the ssr:false
// dynamic import — keeping it out of this server component avoids the
// Next.js 16 / Turbopack dual-React null-hook crash.

export const metadata: Metadata = {
  title: 'About — Arthur Liégeois, Presentation Designer',
  description:
    'Founder. Strategist. Designer. Five countries, fifteen years, and one discipline: turning complex ideas into stories people actually feel.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/about' },
  openGraph: {
    title: 'About — Arthur Liégeois, Presentation Designer | Liégeois Designs',
    description:
      'Founder. Strategist. Designer. Five countries, fifteen years, and one discipline.',
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
    'Visual Storytelling',
    'Strategic Narrative',
    'Brand Identity',
  ],
  description:
    'Founder of Liégeois Designs. Presentation designer and visual storyteller with fifteen years of experience across five countries — working with Chevron, IBM, Marriott, Philips, and Bloomberg.',
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutClientWrapper />
    </>
  )
}
