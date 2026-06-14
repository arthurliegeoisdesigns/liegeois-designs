'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { links } from '@/lib/config'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        Liégeois Designs
      </Link>

      <div className="nav-items">
        <Link href="/work" className="nav-link">Work</Link>
        <Link href="#about" className="nav-link">About</Link>
        <a
          href={links.calendly}
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let&apos;s Talk ↗
        </a>
      </div>
    </nav>
  )
}
