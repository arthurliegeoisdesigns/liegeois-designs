'use client'

import { useEffect, useState } from 'react'

const KEY = 'ld-ga-optout'

/**
 * Reads and writes the same localStorage key the blocking script in
 * layout.tsx checks before it decides whether to inject GTM.
 *
 * The status starts as null rather than false. localStorage cannot be read
 * during SSR, so rendering "not opted out" on the server and then correcting
 * it after hydration would flash the wrong answer at exactly the moment the
 * reader is looking for reassurance. null renders a neutral placeholder until
 * the truth is known.
 *
 * Turning it ON does not stop the CURRENT page load: GTM was decided before
 * this component existed. That is why the copy says to reload, and why the
 * button triggers one.
 */
export default function OptOutToggle() {
  const [optedOut, setOptedOut] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setOptedOut(localStorage.getItem(KEY) === '1')
    } catch {
      // Safari in private mode throws on localStorage. Treat as not opted out
      // rather than crashing: the page still explains what is going on.
      setOptedOut(false)
    }
  }, [])

  const toggle = () => {
    try {
      if (optedOut) localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, '1')
    } catch {
      /* nothing useful to do; the reload below will show the real state */
    }
    // Reload so the decision actually takes effect this visit, not the next.
    window.location.reload()
  }

  const box: React.CSSProperties = {
    marginTop: 28,
    padding: 'clamp(20px, 2.4vw, 28px)',
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-filter)',
    WebkitBackdropFilter: 'var(--glass-filter)',
    border: '1px solid var(--glass-border)',
    boxShadow: 'var(--glass-shadow)',
  }
  const label: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.5625rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'var(--color-text-muted)',
    margin: '0 0 10px',
  }

  if (optedOut === null) {
    return (
      <div style={box}>
        <p style={label}>Status</p>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)', margin: 0 }}>
          Checking&hellip;
        </p>
      </div>
    )
  }

  return (
    <div style={box}>
      <p style={label}>Status</p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 200,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-primary)',
          margin: '0 0 10px',
        }}
      >
        {optedOut ? 'Your visits are not being tracked.' : 'Your visits are being tracked.'}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          lineHeight: 1.65,
          color: 'var(--color-text-secondary)',
          margin: '0 0 22px',
        }}
      >
        {optedOut
          ? 'Google Tag Manager is not loaded in this browser at all. Nothing is sent and nothing is queued.'
          : 'Analytics is loading normally here, which means your own visits are counted alongside real ones.'}
      </p>
      <button type="button" onClick={toggle} className={optedOut ? 'btn-ghost' : 'btn-primary'}>
        {optedOut ? 'Start tracking me again' : 'Stop tracking my visits'}
      </button>
    </div>
  )
}
