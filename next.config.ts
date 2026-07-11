import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being embedded in iframes (clickjacking protection)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer info sent to third parties
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser feature access
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Content Security Policy — restricts where resources can load from
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration scripts; unsafe-eval for dev HMR
      "script-src 'self' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com https://www.google-analytics.com",
      // Inline styles used by framer-motion and Next.js
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images from Cloudinary, Webflow CDN, and data URIs
      "img-src 'self' data: blob: https://res.cloudinary.com https://liegeoisdesigns.com https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net",
      // Videos from Cloudinary
      "media-src 'self' https://res.cloudinary.com",
      // API calls: Formspree, Vercel Analytics, GTM, GA4
      "connect-src 'self' https://formspree.io https://vitals.vercel-insights.com https://o.ingest.sentry.io https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://region1.google-analytics.com",
      // Calendly embed iframe
      "frame-src https://calendly.com",
      // Prevent this site from being framed by anyone
      "frame-ancestors 'none'",
      // Only load resources over HTTPS
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async redirects() {
    return [
      // ── Canonical: non-www → www ─────────────────────────────────────────
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'liegeoisdesigns.com' }],
        destination: 'https://www.liegeoisdesigns.com/:path*',
        permanent: true,
      },
      // ── Old Webflow portfolio items → specific new case study pages ────────
      { source: '/portfolio/projectbe-colorcode-workshop',             destination: '/work/projectbe-colorcode',                        permanent: true },
      { source: '/portfolio/special-forces-project-starzplay',         destination: '/work/special-forces-project-starzplay',           permanent: true },
      { source: '/portfolio/marriott-digital-marketing-strat',         destination: '/work/marriott-luxury-group',                      permanent: true },
      { source: '/portfolio/grey-slide-sample-1-8439d',                destination: '/work/grey-slide-sample-1-8439d',                  permanent: true },
      { source: '/portfolio/rapp-and-evolus',                          destination: '/work/rapp-and-evolus',                            permanent: true },
      { source: '/portfolio/norigami-slide-1-7cc23',                   destination: '/work/norigami-brand',                             permanent: true },
      { source: '/portfolio/philips-healthcare-1',                     destination: '/work/philips-healthcare',                         permanent: true },
      { source: '/portfolio/ogilvy-for-cdw-1-98a9e',                  destination: '/work/ogilvy-for-cdw-1-98a9e',                     permanent: true },
      { source: '/portfolio/toddstreet-intercept-1-c83f2',             destination: '/work/intercept-pharma',                           permanent: true },
      { source: '/portfolio/adm-productions-emd-1-c6815',              destination: '/work/adm-prod-tgi-fridays-campaign',              permanent: true },
      { source: '/portfolio/the-special-event-company-20-b7a3c',       destination: '/work/the-special-event-company-20-b7a3c',         permanent: true },
      // ── Slug-matching portfolio → work (were falling through to catch-all) ─
      { source: '/portfolio/fivestone-studios-chevron-new-energies',   destination: '/work/chevron-new-energies',                       permanent: true },
      { source: '/portfolio/sunrise-cellars',                          destination: '/work/sunrise-cellars',                            permanent: true },
      { source: '/portfolio/echo-society-pitch-deck-2',                destination: '/work/echo-society-pitch-deck-2',                  permanent: true },
      { source: '/portfolio/mcs-healthcare-public-relations-2',        destination: '/work/mcs-healthcare-public-relations-2',          permanent: true },
      { source: '/portfolio/mcs-healthcare-public-relations',          destination: '/work/mcs-healthcare-public-relations',            permanent: true },
      { source: '/portfolio/bloomberg-media-internal-dei-strategy',    destination: '/work/bloomberg-media-internal-dei-strategy',      permanent: true },
      { source: '/portfolio/ibm-quantum-summit-2022-cn3q3',            destination: '/work/ibm-quantum-summit-2022-cn3q3',              permanent: true },
      { source: '/portfolio/the-be-curious-group-iot-workshop',        destination: '/work/the-be-curious-group-iot-workshop',          permanent: true },
      { source: '/portfolio/the-be-curious-group-apple-workshop',      destination: '/work',                                            permanent: true },
      { source: '/portfolio/project-be-project-wellness-keynote',      destination: '/work/project-be-project-wellness-keynote',        permanent: true },
      { source: '/portfolio/international-advertising-association',    destination: '/work/international-advertising-association',      permanent: true },
      // ── Webflow paginated portfolio URLs (query-param variants) ──────────
      { source: '/portfolio', has: [{ type: 'query', key: '23a11da0_page' }], destination: '/work', permanent: true },
      // ── All remaining /portfolio/* → /work ───────────────────────────────
      { source: '/portfolio/:slug*', destination: '/work', permanent: true },
      // ── Old Webflow blog imported items → /blog ──────────────────────────
      { source: '/blog/imported-item-24',   destination: '/blog', permanent: true },
      { source: '/blog/imported-item-30',   destination: '/blog', permanent: true },
      { source: '/blog/imported-item-:id',  destination: '/blog', permanent: true },
      // ── Old Webflow portfolio category filter pages → /work ───────────────
      { source: '/portfolio/healthcare',    destination: '/work', permanent: true },
      { source: '/portfolio/foodservice',   destination: '/work', permanent: true },
      { source: '/portfolio/vcs-startups',  destination: '/work', permanent: true },
      { source: '/portfolio/media',         destination: '/work', permanent: true },
      { source: '/portfolio/education',     destination: '/work', permanent: true },
      // ── Old Webflow misc pages ───────────────────────────────────────────
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/terms-and-condition', destination: '/terms-of-use', permanent: true },
      // ── Old Webflow pages with no equivalent on the new site ─────────────
      { source: '/portfolio', destination: '/work', permanent: true },
      { source: '/clients', destination: '/work', permanent: true },
      { source: '/pricing', destination: '/services', permanent: true },
      // ── Old Webflow service detail subpages → /services ──────────────────
      { source: '/services/:slug+', destination: '/services', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    // Cloudinary does all resizing via the custom loader — Vercel performs
    // zero (metered) image transformations. See src/lib/cloudinary-loader.ts
    // remotePatterns intentionally ABSENT: declaring it keeps Vercel's edge
    // optimizer armed for old cached /_next/image URLs, which kept billing
    // transformations after launch (Arthur's second overage alert, July 2026).
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
