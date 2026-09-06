'use client'

import Link from 'next/link'
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()
  const pathname = usePathname()

  // This flipped on 6 Sep 2026, and the old comment is worth keeping in view
  // because it is now exactly inverted:
  //
  //   "NO route has a dark hero any more [...] leaving either in this list puts
  //    a white logo on a #F4F1EC background, i.e. invisible."
  //
  // Under THE ROOM, EVERY route has a dark top. There is no #F4F1EC page left
  // to be invisible against. So the nav goes back to what it was built to do:
  // transparent over the hero, dark glass once you have scrolled past it.
  //
  // Kept as a named constant, as before, so the intent stays legible.
  const isDarkTopPage = true

  const [scrolled, setScrolled] = useState(!isDarkTopPage)
  const [menuOpen, setMenuOpen] = useState(false)

  // 40px is a plain scroll threshold rather than a measurement of where a
  // particular hero ends. An earlier version measured .jn-journey; that element
  // is long gone, and now that every route is dark-topped there is nothing
  // route-specific left to measure. The bar just needs to stop being
  // transparent once content is passing under it.
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(isDarkTopPage ? y > 40 : true)
  })

  useEffect(() => {
    // rAF defers the close out of the effect body (lint: no sync setState)
    const raf = requestAnimationFrame(() => setMenuOpen(false))
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' nav-menu-open' : ''}`}>
        <Link href="/" className="nav-logo" aria-label="Liégeois Designs, Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* White in BOTH states since 6 Sep. The dark variant existed only
              for the scrolled bar back when it turned near-opaque white; that
              bar is dark glass now, so swapping in a dark logo would have put
              a black mark on a black bar. logo-liegeois-dark.svg is still in
              public/images for the OG image and anywhere on a bone surface. */}
          <img
            src="/images/logo-liegeois-white.svg"
            alt="Liégeois Designs"
            width={156}
            height={50}
            style={{
              objectFit: 'contain',
              display: 'block',
              transition: 'opacity 300ms ease',
            }}
          />
        </Link>

        {/* Right side: CTA + menu toggle (the overlay IS the nav — Phase 5) */}
        <div className="nav-items nav-desktop">
          <Link href="/contact" className="nav-cta">
            Let&apos;s Talk
          </Link>
        </div>

        <button
          className="nav-hamburger"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`nav-hamburger-line${menuOpen ? ' open' : ''}`} />
          <span className={`nav-hamburger-line${menuOpen ? ' open' : ''}`} />
        </button>
      </nav>

      {/* Full-screen overlay menu — giant type, indexed */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-overlay"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nav-mobile-content">
              <motion.div
                className="nav-mobile-links"
                variants={reduced ? undefined : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
                }}
                initial={reduced ? false : 'hidden'}
                animate="visible"
              >
                {[...navLinks, { href: '/contact', label: 'Contact' }].map((link, i) => (
                  <motion.div
                    key={link.href}
                    variants={reduced ? undefined : {
                      hidden: { opacity: 0, y: 34 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`nav-mobile-link${pathname === link.href ? ' is-active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="nav-menu-num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="nav-menu-label">{link.label}</span>
                      <span className="nav-menu-arrow" aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="nav-menu-meta"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span>Montclair, NJ, worldwide</span>
                <span className="nav-menu-meta-hint">Press P to present</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
