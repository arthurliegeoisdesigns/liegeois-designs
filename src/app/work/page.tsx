import type { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'

export const metadata: Metadata = {
  title: 'Work — Liégeois Designs',
  description:
    'Case studies in presentation design, pitch decks, and strategic narratives for brands like Chevron, Marriott, and Philips.',
  alternates: { canonical: 'https://liegeoisdesigns.com/work' },
  openGraph: {
    title: 'Work — Liégeois Designs',
    description:
      'Case studies in presentation design, pitch decks, and strategic narratives.',
    url: 'https://liegeoisdesigns.com/work',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}
