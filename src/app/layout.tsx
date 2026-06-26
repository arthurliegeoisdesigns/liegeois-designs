import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.liegeoisdesigns.com'),
  title: {
    default: 'Liégeois Designs — Strategic Visual Storytelling',
    template: '%s | Liégeois Designs',
  },
  description:
    'Visual storytelling for brands that refuse to blend in. Presentation design, pitch decks, and narrative strategy.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com' },
  openGraph: {
    title: 'Liégeois Designs',
    description: 'Strategic visual storytelling studio.',
    url: 'https://www.liegeoisdesigns.com',
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
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="dns-prefetch" href="https://cdn.prod.website-files.com" />
        <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothScrollProvider>
          <CustomCursor />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Nav />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
