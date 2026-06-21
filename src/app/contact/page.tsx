import type { Metadata } from 'next'
import ContactPage from './ContactPage'

export const metadata: Metadata = {
  title: "Let's Talk — Liégeois Designs",
  description:
    "I take on a limited number of projects each quarter. Tell me what you're building and let's find out if we're the right fit.",
  alternates: { canonical: 'https://liegeoisdesigns.com/contact' },
  openGraph: {
    title: "Let's Talk — Liégeois Designs",
    description: "Tell me what you're building. I take on a limited number of projects each quarter.",
    url: 'https://liegeoisdesigns.com/contact',
    siteName: 'Liégeois Designs',
    type: 'website',
  },
}

export default function Page() {
  return <ContactPage />
}
