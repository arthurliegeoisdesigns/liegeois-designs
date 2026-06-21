import type { Metadata } from 'next'
import { Fraunces, Instrument_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import { Analytics } from '@vercel/analytics/next'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://liegeoisdesigns.com'),
  title: {
    default: 'Liégeois Designs — Strategic Visual Storytelling',
    template: '%s | Liégeois Designs',
  },
  description:
    'Visual storytelling for brands that refuse to blend in. Presentation design, pitch decks, and narrative strategy.',
  alternates: { canonical: 'https://liegeoisdesigns.com' },
  openGraph: {
    title: 'Liégeois Designs',
    description: 'Strategic visual storytelling studio.',
    url: 'https://liegeoisdesigns.com',
    siteName: 'Liégeois Designs',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <head />
      <body>
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
