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
  async redirects() {
    return [
      // ── Canonical: non-www → www ─────────────────────────────────────────
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'liegeoisdesigns.com' }],
        destination: 'https://www.liegeoisdesigns.com/:path*',
        permanent: true,
      },
      // ── Old Webflow portfolio category pages → /work ─────────────────────
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
