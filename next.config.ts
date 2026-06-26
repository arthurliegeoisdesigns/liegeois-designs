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
      "script-src 'self' 'unsafe-inline' https://assets.calendly.com",
      // Inline styles used by framer-motion and Next.js
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images from Cloudinary, Webflow CDN, and data URIs
      "img-src 'self' data: blob: https://res.cloudinary.com https://cdn.prod.website-files.com https://liegeoisdesigns.com",
      // API calls: Formspree contact form + Vercel Analytics
      "connect-src 'self' https://formspree.io https://vitals.vercel-insights.com https://o.ingest.sentry.io",
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
      { source: '/portfolio/projectbe-colorcode-workshop',       destination: '/work/projectbe-colorcode',                 permanent: true },
      { source: '/portfolio/special-forces-project-starzplay',   destination: '/work/special-forces-project-starzplay',    permanent: true },
      { source: '/portfolio/marriott-digital-marketing-strat',   destination: '/work/marriott-luxury-group',               permanent: true },
      { source: '/portfolio/grey-slide-sample-1-8439d',          destination: '/work/grey-slide-sample-1-8439d',           permanent: true },
      { source: '/portfolio/rapp-and-evolus',                    destination: '/work/rapp-and-evolus',                     permanent: true },
      { source: '/portfolio/norigami-slide-1-7cc23',             destination: '/work/norigami-brand',                      permanent: true },
      { source: '/portfolio/philips-healthcare-1',               destination: '/work/philips-healthcare',                  permanent: true },
      { source: '/portfolio/ogilvy-for-cdw-1-98a9e',            destination: '/work/ogilvy-for-cdw-1-98a9e',              permanent: true },
      { source: '/portfolio/toddstreet-intercept-1-c83f2',       destination: '/work/intercept-pharma',                    permanent: true },
      { source: '/portfolio/adm-productions-emd-1-c6815',        destination: '/work/adm-prod-tgi-fridays-campaign',       permanent: true },
      { source: '/portfolio/the-special-event-company-20-b7a3c', destination: '/work/the-special-event-company-20-b7a3c',  permanent: true },
      // ── All remaining /portfolio/* → /work ───────────────────────────────
      { source: '/portfolio/:slug*', destination: '/work', permanent: true },
      // ── Old Webflow blog imported items → /blog ──────────────────────────
      { source: '/blog/imported-item-:id', destination: '/blog', permanent: true },
      // ── Old Webflow misc pages ───────────────────────────────────────────
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/terms-and-condition', destination: '/terms-of-use', permanent: true },
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dryyhpqew/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },
};

export default nextConfig;
