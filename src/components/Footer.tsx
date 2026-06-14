import Link from 'next/link'
import { links } from '@/lib/config'

const cols = [
  {
    heading: null,
    isWordmark: true,
    links: [],
  },
  {
    heading: 'STUDIO',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    heading: 'WORK',
    links: [
      { label: 'Portfolio', href: '#work' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Clients', href: '#clients' },
    ],
  },
  {
    heading: 'CONNECT',
    links: [
      { label: 'LinkedIn ↗', href: links.linkedin, external: true },
      { label: 'YouTube ↗', href: links.youtube, external: true },
      { label: 'Newsletter', href: '#newsletter' },
    ],
  },
]

const linkStyle: React.CSSProperties = {
  display: 'block',
  color: 'rgba(246,240,232,0.45)',
  textDecoration: 'none',
  fontSize: '13px',
  fontFamily: 'var(--font-body)',
  lineHeight: 1.8,
  transition: 'color 200ms',
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-dark)',
        borderTop: '0.5px solid rgba(246,240,232,0.07)',
        padding: 'clamp(48px,6vw,80px) var(--section-pad-x) 32px',
      }}
    >
      <div className="container footer-grid">
        {/* Wordmark column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(246,240,232,0.45)',
              margin: '0 0 12px',
            }}
          >
            Liégeois Designs
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '14px',
              color: 'rgba(246,240,232,0.30)',
              margin: 0,
              fontVariationSettings: "'opsz' 14, 'WONK' 0",
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
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(246,240,232,0.25)',
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
            fontSize: '12px',
            color: 'rgba(246,240,232,0.20)',
            margin: 0,
          }}
        >
          © 2026 Liégeois Designs. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Privacy Policy', 'Terms of Use'].map((label) => (
            <Link
              key={label}
              href="#"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(246,240,232,0.20)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
