import Hero from '@/components/Hero'
import ClientIndex from '@/components/ClientIndex'
import FeaturedWork from '@/components/FeaturedWork'
import Services from '@/components/Services'
import About from '@/components/About'
import WhyArthur from '@/components/WhyArthur'
import Blog from '@/components/Blog'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arthur Liégeois',
  jobTitle: 'Presentation Designer & Strategic Storyteller',
  url: 'https://www.liegeoisdesigns.com',
  image: 'https://www.liegeoisdesigns.com/images/arthur-liegeois.jpg',
  sameAs: [
    'https://www.linkedin.com/in/aliegeois/',
    'https://www.youtube.com/@LiegeoisDesigns',
  ],
  knowsAbout: [
    'Pitch Deck Design',
    'Executive Presentations',
    'Investor Decks',
    'Visual Storytelling',
    'Strategic Narrative',
    'Presentation Design',
    'Sales Decks',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Liégeois Designs',
    url: 'https://www.liegeoisdesigns.com',
  },
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Liégeois Designs',
  description:
    'Pitch deck design, executive presentations, and strategic narrative for founders and executives across North America.',
  url: 'https://www.liegeoisdesigns.com',
  founder: {
    '@type': 'Person',
    name: 'Arthur Liégeois',
  },
  areaServed: ['United States', 'Canada'],
  priceRange: '$$$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Presentation Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pitch & Investor Decks',
          description: 'Narrative-driven pitch decks for founders raising capital.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Executive Presentations',
          description: 'Board decks, all-hands, and keynote presentations for C-suite.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sales & Agency Decks',
          description: 'Proposals and capabilities decks that close deals without a follow-up.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strategic Narrative',
          description: 'Deep-dive engagement fixing story architecture before visual execution.',
        },
      },
    ],
  },
  sameAs: [
    'https://www.linkedin.com/in/aliegeois/',
    'https://www.youtube.com/@LiegeoisDesigns',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <main>
        <Hero />
        <ClientIndex />
        <FeaturedWork />
        <Services />
        {/* Light passage — one bone "paper sheet" floating over the dark
            world (crisp edges, no gradient — Awwwards pattern, July 2026).
            Wrapping in a div removes these from ParallaxFlow's
            `main > section` query, so they keep the light theme. */}
        <div className="light-sheet">
          <About />
          <WhyArthur />
          <Blog />
        </div>
        <Testimonials />
        <CTA />
      </main>
    </>
  )
}
