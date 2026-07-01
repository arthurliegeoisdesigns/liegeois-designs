import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import ClientOnlyLayer from '@/components/providers/ClientOnlyLayer'

const GTM_ID = 'GTM-N7XNZRDZ'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
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
  verification: {
    google: '1dKWwt7TY_XuPzJAtS31wrgHsScOQKoxo37zgtPbfYw',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Liégeois Designs',
  url: 'https://www.liegeoisdesigns.com',
  logo: 'https://www.liegeoisdesigns.com/images/logos/liegeois-designs-logo.png',
  description:
    'Boutique visual storytelling studio specializing in presentation design, pitch decks, and brand identity for companies that refuse to blend in.',
  founder: {
    '@type': 'Person',
    name: 'Arthur Liegeois',
    jobTitle: 'Creative Director',
  },
  areaServed: 'Worldwide',
  serviceType: [
    'Presentation Design',
    'Pitch Deck Design',
    'Brand Identity',
    'Creative Direction',
    'Visual Storytelling',
  ],
  sameAs: [
    'https://www.linkedin.com/in/aliegeois/',
  ],
  email: 'arthur@liegeoisdesigns.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'arthur@liegeoisdesigns.com',
    url: 'https://www.liegeoisdesigns.com/contact',
  },
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
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google Tag Manager — noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SmoothScrollProvider>
          <ClientOnlyLayer />
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Nav />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </SmoothScrollProvider>
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </body>
    </html>
  )
}
