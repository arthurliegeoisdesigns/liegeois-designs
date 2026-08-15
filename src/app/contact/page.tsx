import type { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact: Start a Presentation Project',
  description:
    "I take on a limited number of projects each quarter. Tell me what you're building and let's find out if we're the right fit.",
  alternates: { canonical: 'https://www.liegeoisdesigns.com/contact' },
  openGraph: {
    title: 'Contact: Start a Presentation Project | Liégeois Designs',
    description: "Tell me what you're building. I take on a limited number of projects each quarter.",
    url: 'https://www.liegeoisdesigns.com/contact',
    siteName: 'Liégeois Designs',
    type: 'website',
    images: [{ url: 'https://www.liegeoisdesigns.com/opengraph-image', width: 1200, height: 630 }],
  },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Liégeois Designs',
  url: 'https://www.liegeoisdesigns.com/contact',
  description: 'Get in touch to discuss your presentation design project. Arthur Liégeois takes on a limited number of projects each quarter.',
  mainEntity: {
    '@type': 'Person',
    name: 'Arthur Liégeois',
    email: 'arthur@liegeoisdesigns.com',
    url: 'https://www.liegeoisdesigns.com/about',
    worksFor: {
      '@type': 'Organization',
      name: 'Liégeois Designs',
      url: 'https://www.liegeoisdesigns.com',
    },
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPage />
    </>
  )
}
