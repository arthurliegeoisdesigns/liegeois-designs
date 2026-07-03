import Link from 'next/link'

export const metadata = { title: 'Slide not found' }

/**
 * 404 — "this slide doesn't exist" (Phase 4, audit rec 33).
 */
export default function NotFound() {
  return (
    <main
      className="section-dark"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        textAlign: 'center',
        padding: 'var(--section-pad-y) var(--section-pad-x)',
        background: 'var(--color-canvas)',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)', margin: 0 }}>
        ERROR 404
      </p>
      <h1
        className="type-display"
        style={{ color: 'var(--color-on-dark)', margin: 0, maxWidth: '14ch' }}
      >
        This slide doesn&apos;t <em style={{ fontStyle: 'italic' }}>exist</em>
        <span style={{ color: 'var(--color-accent)' }}>.</span>
      </h1>
      <p className="type-body-lg" style={{ color: 'var(--color-on-dark-muted)', margin: 0, maxWidth: '420px' }}>
        Even the best decks lose a slide now and then. The story continues from the beginning.
      </p>
      <Link href="/" className="btn-hero-solid" style={{ marginTop: '12px' }}>
        Back to the first slide
      </Link>
    </main>
  )
}
