'use client'

import { useEffect, useState } from 'react'

/**
 * ObfuscatedEmail — assembles the email address client-side via JS.
 * Bots that don't execute JavaScript (the vast majority of scrapers)
 * see nothing. Humans and screen readers get the real, clickable link.
 */
export default function ObfuscatedEmail({ style }: { style?: React.CSSProperties }) {
  const [href, setHref] = useState<string | null>(null)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    // Split across variables so the full address never appears as a
    // literal string anywhere in the source or compiled output.
    const user = 'arthur'
    const domain = 'liegeoisdesigns'
    const tld = 'com'
    const email = `${user}@${domain}.${tld}`
    setHref(`mailto:${email}`)
    setLabel(email)
  }, [])

  if (!href || !label) {
    // Render a non-linked placeholder until JS runs — bots stop here.
    return (
      <span style={style} aria-label="Email address (load page to reveal)">
        [email protected]
      </span>
    )
  }

  return (
    <a href={href} style={style}>
      {label}
    </a>
  )
}
