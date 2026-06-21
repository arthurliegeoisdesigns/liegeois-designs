'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { blogPosts, publishedPosts } from '@/content/blog-posts'
import { blogThemes } from '@/content/blog-themes'

const allPosts =
  process.env.NODE_ENV === 'development' ? blogPosts : publishedPosts

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const filterBtnStyle = (active: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-body)',
  fontSize: '0.75rem',
  fontWeight: 400,
  letterSpacing: '0.05em',
  padding: '10px 18px',
  minHeight: '44px',
  borderRadius: 'var(--radius-full)',
  border: '1px solid',
  borderColor: active ? 'var(--color-text-primary)' : 'var(--color-border-mid)',
  background: active ? 'var(--color-text-primary)' : 'transparent',
  color: active ? '#ffffff' : 'var(--color-text-secondary)',
  cursor: 'pointer',
  transition: 'all 150ms ease',
  whiteSpace: 'nowrap',
})

export default function BlogIndexClient() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const filtered = activeTheme
    ? allPosts.filter((p) => p.theme === activeTheme)
    : allPosts

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Back link */}
      <div style={{ paddingTop: 'calc(80px + 20px)', paddingLeft: 'var(--section-pad-x)', paddingRight: 'var(--section-pad-x)', paddingBottom: '16px' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          ← Home
        </Link>
      </div>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          {/* Header */}
          <motion.div
            style={{ marginBottom: '40px', maxWidth: '600px' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 14px' }}>
              Ideas that don&apos;t beg for your attention.
            </h1>
            <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
              Thinking about the ideas that make stories land — and the ones
              that make audiences lean in.
            </p>
          </motion.div>

          {/* Theme filter tabs */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <button onClick={() => setActiveTheme(null)} style={filterBtnStyle(activeTheme === null)}>
              All
            </button>
            {blogThemes.map((theme) => (
              <button
                key={theme.slug}
                onClick={() => setActiveTheme(theme.slug === activeTheme ? null : theme.slug)}
                style={filterBtnStyle(activeTheme === theme.slug)}
              >
                {theme.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheme ?? 'all'}
              className="grid-3"
              variants={reduced ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((post) => (
                <motion.article
                  key={post.slug}
                  className="blog-card"
                  style={{ padding: 0, overflow: 'hidden' }}
                  variants={reduced ? undefined : cardVariants}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    {post.coverImage && (
                      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover', transition: 'transform 450ms var(--ease-out-expo)' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="blog-card-cover"
                        />
                      </div>
                    )}
                    <div style={{ padding: '20px 24px 24px' }}>
                      <p className="type-label" style={{ color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                        {post.tags[0]} · {post.readTime}
                        {post.draft && (
                          <span
                            style={{
                              marginLeft: '8px',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              background: 'var(--color-card-bg)',
                              fontSize: '0.625rem',
                              letterSpacing: '0.08em',
                              fontWeight: 400,
                              textTransform: 'uppercase',
                            }}
                          >
                            Draft
                          </span>
                        )}
                      </p>
                      <h3 className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
                        {post.title}
                      </h3>
                      <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: '0 0 20px' }}>
                        {post.excerpt}
                      </p>
                      <span className="btn-text">Read →</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                textAlign: 'center',
                padding: '80px 0',
              }}
            >
              No posts in this theme yet.
            </motion.p>
          )}
        </div>
      </section>
    </main>
  )
}
