import type { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'

export const metadata: Metadata = {
  title: 'Presentation Design Portfolio: Chevron, IBM, Marriott',
  description:
    'Case studies in presentation design, pitch decks, and strategic narratives for brands like Chevron, Marriott, and Philips.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/work' },
  openGraph: {
    title: 'Presentation Design Portfolio: Chevron, IBM, Marriott | Liégeois Designs',
    description:
      'Case studies in presentation design, pitch decks, and strategic narratives.',
    url: 'https://www.liegeoisdesigns.com/work',
    siteName: 'Liégeois Designs',
    type: 'website',
    images: [{ url: 'https://www.liegeoisdesigns.com/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}
