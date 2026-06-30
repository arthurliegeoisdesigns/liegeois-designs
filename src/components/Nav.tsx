'use client'

import Link from 'next/link'
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { links } from '@/lib/config'
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

  // Pages with a dark full-screen hero/bg at the top — nav starts transparent + white
  const isDarkTopPage = pathname === '/' || pathname === '/services'

  const [scrolled, setScrolled] = useState(!isDarkTopPage)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (pathname === '/services') return // services bg is always dark — keep nav dark
    setScrolled(isDarkTopPage ? y > 40 : true)
  })

  useEffect(() => {
    setMenuOpen(false)
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
        <Link href="/" className="nav-logo" aria-label="Liégeois Designs — Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scrolled ? '/images/logo-liegeois-dark.svg' : '/images/logo-liegeois-white.svg'}
            alt="Liégeois Designs"
            width={124}
            height={40}
            style={{
              objectFit: 'contain',
              display: 'block',
              transition: 'opacity 300ms ease',
            }}
          />
        </Link>

        {/* Desktop links */}
        <div className="nav-items nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                color: pathname === link.href ? (scrolled ? '#0d0d0d' : '#ffffff') : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="nav-cta"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile hamburger */}
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

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-overlay"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="nav-mobile-content">
              <motion.div
                className="nav-mobile-links"
                variants={reduced ? undefined : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                initial={reduced ? false : 'hidden'}
                animate="visible"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={reduced ? undefined : {
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="nav-mobile-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={reduced ? undefined : {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <Link
                    href="/contact"
                    className="nav-mobile-cta"
                    onClick={() => setMenuOpen(false)}
                  >
                    Let&apos;s Talk
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
