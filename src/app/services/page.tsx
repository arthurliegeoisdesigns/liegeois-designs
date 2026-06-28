import type { Metadata } from 'next'
import ServicesPage from './ServicesPage'

export const metadata: Metadata = {
  title: 'Presentation Design Services',
  description:
    'Pitch decks, executive presentations, sales decks, and strategic narratives — built to move rooms and close deals.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/services' },
  openGraph: {
    title: 'Presentation Design Services | Liégeois Designs',
    description: 'Presentation design and strategic narrative for brands that refuse to blend in.',
    url: 'https://www.liegeoisdesigns.com/services',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a presentation designer do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A presentation designer translates complex ideas, data, and strategies into compelling visual narratives. At Liégeois Designs, this means combining narrative architecture with editorial-quality design to build pitch decks, executive presentations, and sales decks that move audiences and drive decisions — not just inform them.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a pitch deck designer cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pitch deck design pricing varies based on scope, complexity, and the designer\'s experience. Boutique studios like Liégeois Designs typically work on a project basis. Contact us directly at arthur@liegeoisdesigns.com to discuss your project and get a tailored proposal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a pitch deck and an investor deck?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The terms are often used interchangeably. Both are presentations designed to secure investment. A pitch deck is typically a shorter, high-level overview used in early meetings. An investor deck tends to be more detailed, covering financials, market size, team, and traction in depth. Liégeois Designs creates both, tailored to your specific fundraising stage and audience.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to design a pitch deck?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical pitch deck project at Liégeois Designs takes 2–4 weeks from brief to final delivery, depending on scope and revision cycles. Rush timelines are available for high-priority pitches. The process includes a strategy session, narrative framework, design, and two rounds of revisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries does Liégeois Designs work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Liégeois Designs has designed presentations for clients across healthcare, pharmaceuticals, energy, technology, hospitality, consumer goods, finance, and media. Past clients include Chevron, Philips, IBM, Bloomberg Media, Marriott, Johnson & Johnson, and Ogilvy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Liégeois Designs work with startups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Liégeois Designs has designed investor pitch decks for early-stage startups across food tech, travel, sustainability, and social entrepreneurship — several of which successfully closed funding rounds. The studio is experienced in translating early-stage vision into investment-ready narratives.',
      },
    },
    {
      '@type': 'Question',
      name: 'What presentation software does Liégeois Designs use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Liégeois Designs primarily works in PowerPoint and Keynote for client-editable deliverables, and Figma for design-heavy or web-based presentations. The final format is always matched to what the client needs to use and maintain after delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Liégeois Designs help with the content and story, not just the design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — narrative strategy is core to the process. Liégeois Designs approaches every project from the story first. This includes helping structure the narrative arc, refine messaging, and identify which information to lead with and what to cut. Design serves the story, never the other way around.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesPage />
    </>
  )
}
