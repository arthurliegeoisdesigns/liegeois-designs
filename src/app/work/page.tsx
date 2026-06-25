import type { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'

export const metadata: Metadata = {
  title: 'Portfolio — Pitch Decks & Presentation Design',
  description:
    'Case studies in presentation design, pitch decks, and strategic narratives for brands like Chevron, Marriott, and Philips.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com/work' },
  openGraph: {
    title: 'Portfolio — Pitch Decks & Presentation Design | Liégeois Designs',
    description:
      'Case studies in presentation design, pitch decks, and strategic narratives.',
    url: 'https://www.liegeoisdesigns.com/work',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}
