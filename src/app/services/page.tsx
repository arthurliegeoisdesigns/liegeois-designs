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

export default function Page() {
  return <ServicesPage />
}
