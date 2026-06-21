import type { Metadata } from 'next'
import ServicesPage from './ServicesPage'

export const metadata: Metadata = {
  title: 'Services — Liégeois Designs',
  description:
    'Pitch decks, executive presentations, sales decks, and strategic narratives — built to move rooms and close deals.',
  alternates: { canonical: 'https://liegeoisdesigns.com/services' },
  openGraph: {
    title: 'Services — Liégeois Designs',
    description: 'Presentation design and strategic narrative for brands that refuse to blend in.',
    url: 'https://liegeoisdesigns.com/services',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function Page() {
  return <ServicesPage />
}
