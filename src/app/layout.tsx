import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import ClientOnlyLayer from '@/components/providers/ClientOnlyLayer'
import PresentationMode from '@/components/ui/PresentationMode'

const GTM_ID = 'GTM-N7XNZRDZ'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.liegeoisdesigns.com'),
  title: {
    /* Query-led, brand last (SEO audit, July 2026): the homepage must
       carry the terms people actually search, not just the positioning. */
    default: 'Presentation & Pitch Deck Design Studio | Liégeois Designs',
    template: '%s | Liégeois Designs',
  },
  description:
    'Investor pitch decks, board presentations and strategic narratives for founders and executives. Trusted by Chevron, IBM, Marriott and Philips.',
  alternates: { canonical: 'https://www.liegeoisdesigns.com' },
  openGraph: {
    title: 'Presentation Design Agency: Pitch Decks & Executive Presentations',
    description:
      'Investor pitch decks, board presentations, and strategic narratives, trusted by Chevron, IBM, Marriott, and Philips.',
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
  email: 'hello@liegeoisdesigns.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@liegeoisdesigns.com',
    url: 'https://www.liegeoisdesigns.com/contact',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Body face is now PP Neue Montreal — LICENSED and SELF-HOSTED,
            so no Fontshare request at all. Fontshare stays allowed in the CSP
            (next.config.ts) because removing it would silently break any
            future Fontshare use the same way it broke Switzer: blocked
            stylesheet, 200 response, zero bytes, no error anywhere.

            Preloaded because body text paints on every page and these are
            self-hosted, so there is no DNS/TLS cost to race. Only 400 and
            500 exist — Pangram Pangram licenses per weight. */}
        <link
          rel="preload"
          href="/fonts/pp/PPNeueMontreal-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/pp/PPNeueMontreal-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        {/* Display face — preloaded so the Migra headline paints with first CSS */}
        <link
          rel="preload"
          href="/fonts/pp/PPMigra-Extralight.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* PPMigra Italic is NOT preloaded: it sets a handful of <em> words and
            competed with the LCP image for bandwidth on Slow 4G. font-display
            swap means those words paint in the roman first and reflow within
            the same line box, so no CLS. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* LCP guard — MUST stay a blocking inline script in <head>.
            template.tsx wraps every route in .page-transition-wrapper, which
            fades opacity on mount. Any element under a non-opaque ancestor is
            ineligible for LCP and Chrome NEVER re-adds it, which is what hid
            the hero h1 from the metric site-wide. Suppressing the fade on the
            first paint only fixes that; it is cleared on the first click so
            route-to-route transitions still animate.

            The preloader half of this script was removed 15 Aug 2026 with the
            homepage rebuild: the intro plate made every visitor wait to see
            the headline. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;" +
              "d.classList.add('is-first-load');" +
              "addEventListener('click',function h(){d.classList.remove('is-first-load');" +
              "removeEventListener('click',h,true);},true);" +
              "}catch(e){}})();",
          }}
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
        <PresentationMode />
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
