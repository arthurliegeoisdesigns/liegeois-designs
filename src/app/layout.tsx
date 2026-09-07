import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import ClientOnlyLayer from '@/components/providers/ClientOnlyLayer'
import PresentationMode from '@/components/ui/PresentationMode'
import { SITE, ORG_ID, PERSON_ID, ORG_SAME_AS, ORG_LOGO, SERVICES } from '@/lib/config'
import Backdrop from '@/components/Backdrop'
import BackdropParallax from '@/components/BackdropParallax'

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

/**
 * Organisation schema, sitewide. The Person lives in page.tsx and
 * about/page.tsx; keep the two entities distinct. See src/lib/config.ts for
 * why sameAs differs between them.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  /* Stable @id. Without it every page minted a fresh anonymous organisation
     node, so an engine crawling the site saw many similar organisations rather
     than one. That is the same failure mode as the inconsistent sameAs, and it
     matters here because Gemini already resolves "Liégeois Designs" to an
     unrelated interior design firm in Naples, Florida. */
  '@id': ORG_ID,
  name: 'Liégeois Designs',
  url: SITE,
  // Was a hardcoded path to a file that does not exist in this repo, so every
  // crawl fetched a 404 for the knowledge-panel logo. Now the real asset.
  logo: ORG_LOGO,
  description:
    'Boutique visual storytelling studio specializing in presentation design, pitch decks, and executive keynotes for companies that refuse to blend in.',
  /* A reference, not a copy. The Person is declared in full on the homepage
     and the about page; repeating a partial copy here would be a third node
     claiming to be Arthur. */
  founder: { '@id': PERSON_ID },
  /* Was 'Worldwide' here and ['United States','Canada'] in page.tsx: the same
     organisation described twice, disagreeing. Consolidated to the specific
     claim, which is what the site copy actually says. */
  areaServed: ['United States', 'Canada'],
  // Was advertising Brand Identity and Creative Direction, neither of which is
  // a service Arthur offers. Now driven by the single SERVICES list.
  serviceType: [...SERVICES],
  sameAs: ORG_SAME_AS,
  priceRange: '$$$$',
  /* Moved here from page.tsx along with priceRange when the duplicate
     ProfessionalService was removed. Sitewide is the right scope: the offer
     catalogue describes the studio, not the homepage. */
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Presentation Design Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pitch & Investor Decks', description: 'Narrative-driven pitch decks for founders raising capital.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Executive Presentations', description: 'Board decks, all-hands, and keynote presentations for C-suite.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sales & Agency Decks', description: 'Proposals and capabilities decks that close deals without a follow-up.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strategic Narrative', description: 'Deep-dive engagement fixing story architecture before visual execution.' } },
    ],
  },
  email: 'hello@liegeoisdesigns.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@liegeoisdesigns.com',
    url: `${SITE}/contact`,
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
        {/* ANALYTICS OPT-OUT — must be a BLOCKING inline script, and must run
            before the GTM loader below reads window.__gaOptOut.

            WHY THIS EXISTS INSTEAD OF A GA4 IP FILTER
            Roughly 18% of the property's users were Arthur visiting his own
            site. The obvious fix is GA4's internal-traffic IP filter, and on
            7 Sep 2026 it turned out to be unusable here: his IP reads as
            146.75.245.37, which is Fastly, which is one of Apple's iCloud
            Private Relay egress partners. So the address is not his, it
            rotates, and it is SHARED with every other Private Relay user
            routed through that egress.

            Filtering on it would have been worse than doing nothing: it would
            not reliably catch him, and it would silently discard real visitors
            who happen to share the egress. GA4 data filters DELETE rather than
            hide, so that loss is permanent and invisible.

            This is per-device and per-browser, which is the right granularity
            for one person, and it does not care about IP at all. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{" +
              "var k='ld-ga-optout',p=new URLSearchParams(location.search);" +
              "if(p.has('ga-optout')){" +
                "p.get('ga-optout')==='0'?localStorage.removeItem(k)" +
                ":localStorage.setItem(k,'1');}" +
              "window.__gaOptOut=localStorage.getItem(k)==='1';" +
              "}catch(e){window.__gaOptOut=false;}})();",
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
        {/* THE ROOM. One backdrop for the whole document, server rendered, sat
            behind everything. It is deliberately the first thing in <body> and
            deliberately NOT inside SmoothScrollProvider: it is position:fixed
            and must not inherit any transform from a scroll wrapper, or it
            would become a containing block and stop being fixed. */}
        <Backdrop />
        <BackdropParallax />
        <div className="grain" aria-hidden="true" />
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
            // Gated on the opt-out flag set by the blocking script in <head>.
            // If it is set, GTM is never injected at all — not loaded and
            // suppressed, simply not loaded.
            __html: `if(!window.__gaOptOut){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');}`,
          }}
        />
      </body>
    </html>
  )
}
