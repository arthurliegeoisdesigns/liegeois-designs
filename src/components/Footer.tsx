import Link from 'next/link'
import { links } from '@/lib/config'

const cols: Array<{
  heading: string | null
  isWordmark?: boolean
  links: Array<{ label: string; href: string; external?: boolean }>
}> = [
  {
    heading: null,
    isWordmark: true,
    links: [],
  },
  {
    heading: 'STUDIO',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'WORK',
    links: [
      { label: 'Case Studies', href: '/work' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'CONNECT',
    links: [
      { label: 'Book a Call ↗', href: links.calendly, external: true },
      { label: 'LinkedIn ↗', href: links.linkedin, external: true },
      { label: 'YouTube ↗', href: links.youtube, external: true },
    ],
  },
]

const linkStyle: React.CSSProperties = {
  display: 'block',
  color: 'var(--color-on-dark-muted)',
  textDecoration: 'none',
  fontSize: '0.8125rem',
  fontFamily: 'var(--font-body)',
  lineHeight: 1.8,
  transition: 'color 200ms',
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-dark)',
        borderTop: 'none',
        padding: 'clamp(48px,6vw,80px) var(--section-pad-x) 32px',
        position: 'relative',
      }}
    >
      {/* Top rule */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '0.5px',
          background: 'var(--color-dark-border)',
        }}
      />
      <div className="container footer-grid">
        {/* Wordmark column */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-liegeois-footer-white.svg"
            alt="Liégeois Designs"
            className="footer-logo"
            width={120}
            height={120}
            style={{
              height: '120px',
              width: 'auto',
              objectFit: 'contain',
              marginBottom: '20px',
              display: 'block',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-on-dark-faint)',
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            &ldquo;Where strategy finds its voice.&rdquo;
          </p>
        </div>

        {/* Link columns */}
        {cols.slice(1).map((col) => (
          <div key={col.heading}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.625rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-on-dark-hint)',
                margin: '0 0 16px',
              }}
            >
              {col.heading}
            </p>
            {col.links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href} style={linkStyle}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="container footer-legal">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-on-dark-faint)',
            margin: 0,
          }}
        >
          © 2026 Liégeois Designs. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link
            href="/privacy-policy"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-on-dark-faint)',
              textDecoration: 'none',
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-on-dark-faint)',
              textDecoration: 'none',
            }}
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}
