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
      // Inline styles used by framer-motion and Next.js.
      // api.fontshare.com serves the BODY face stylesheet. It was missing here,
      // so the browser blocked it and the body font silently fell back to
      // system-ui on every page since launch — no build error, no runtime
      // error, only a console CSP warning nobody was reading. The site has
      // never rendered its intended body typeface.
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
      // Font FILES: gstatic for Google, cdn.fontshare.com for Fontshare.
      // Allowing the stylesheet without the font host fails the same way.
      "font-src 'self' https://fonts.gstatic.com https://cdn.fontshare.com",
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
      // ── Retired blog posts (Arthur's curation, July 2026) → /blog ────────
      { source: '/blog/how-ai-makes-creative-direction-more-valuable', destination: '/blog', permanent: true },
      { source: '/blog/the-limits-of-perfection', destination: '/blog', permanent: true },
      // ── Old Webflow blog imported items ──────────────────────────────────
      // These carry the whole blog's search history. Every one of them was
      // indexed under /blog/imported-item-N, and several STILL are: on 7 Sep
      // 2026 a live search returned imported-item-21, -5 and -14 rather than
      // the clean slugs that replaced them.
      //
      // The rule here used to be a single wildcard sending all of them to
      // /blog. That is why the replacement posts would not index. Google held
      // the old URL, with its accumulated authority, pointing at a page whose
      // content did not match, so it never transferred that authority to the
      // new slug and left the new slug at "Discovered, currently not indexed"
      // indefinitely. A redirect to the wrong destination is worse than no
      // redirect, because it looks deliberate.
      //
      // Mapped one to one, from titles read off the live index 7 Sep 2026.
      // ORDER MATTERS: Next takes the first match, so the wildcard stays last.
      { source: '/blog/imported-item-3',  destination: '/blog/big-picture-vision-tiny-picture-doubts',      permanent: true },
      { source: '/blog/imported-item-4',  destination: '/blog/breaking-projects-into-scenes-not-steps',     permanent: true },
      { source: '/blog/imported-item-9',  destination: '/blog/designing-for-others-vs-designing-from-gut',  permanent: true },
      { source: '/blog/imported-item-13', destination: '/blog/learning-to-speak-in-images',                 permanent: true },
      { source: '/blog/imported-item-14', destination: '/blog/permission-slips-for-reinvention',            permanent: true },
      { source: '/blog/imported-item-16', destination: '/blog/reinvention-after-breakdown',                 permanent: true },
      { source: '/blog/imported-item-21', destination: '/blog/the-discipline-of-care',                      permanent: true },
      { source: '/blog/imported-item-22', destination: '/blog/the-first-time-i-saw-my-life-as-a-design-brief', permanent: true },
      { source: '/blog/imported-item-30', destination: '/blog/living-someone-else-story',                   permanent: true },

      // Withdrawn on purpose. These point at slugs that proxy.ts serves as 410,
      // so the chain reads 301 → 410: "this moved here, and that is gone."
      // Deliberately NOT sent to /blog, which would claim they merely moved.
      { source: '/blog/imported-item-5',  destination: '/blog/chaos-as-raw-material',                       permanent: true },
      { source: '/blog/imported-item-20', destination: '/blog/the-day-i-fired-my-inner-impostor-boss',      permanent: true },

      // Retired by Arthur's curation, or never published. No destination
      // exists, so /blog is the honest answer rather than a guess.
      //   11 = From Corporate Costume to Thin Creative Skin
      //   12 = The Future of Creative Direction (AI)
      //   17 = Stop Asking for a Logo. Start Building a Brand System.
      //   23 = The Limits of Perfection
      //   24 = The Moment I Made Things Undeniable
      //   27 = The Power of Branding as Transformation
      { source: '/blog/imported-item-11', destination: '/blog', permanent: true },
      { source: '/blog/imported-item-12', destination: '/blog', permanent: true },
      { source: '/blog/imported-item-17', destination: '/blog', permanent: true },
      { source: '/blog/imported-item-23', destination: '/blog', permanent: true },
      { source: '/blog/imported-item-24', destination: '/blog', permanent: true },
      { source: '/blog/imported-item-27', destination: '/blog', permanent: true },

      // Numbers not yet identified. /blog beats a 404 while they stay unknown.
      // If one shows up in a GSC export, look up its title and give it a real
      // destination above rather than leaving it to this line.
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
      // (Was a catch-all, but real per-service pages now live at
      //  /services/<slug> — redirects run BEFORE the filesystem in Next,
      //  so the catch-all would have clobbered them. Old Webflow slugs
      //  carry a 5-char hash suffix; match those specifically.)
      { source: '/services/brand-strategy-f19ea', destination: '/services', permanent: true },
      { source: '/services/:slug(.*\\-[0-9a-f]{5})', destination: '/services', permanent: true },
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
