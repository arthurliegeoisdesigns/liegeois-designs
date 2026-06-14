'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { blogPosts, publishedPosts } from '@/content/blog-posts'

const posts =
  process.env.NODE_ENV === 'development' ? blogPosts : publishedPosts

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function BlogIndexClient() {
  const reduced = useReducedMotion()

  return (
    <main style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Back link */}
      <div style={{ padding: '22px var(--section-pad-x)' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            transition: 'color var(--duration-fast) ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = 'var(--color-text-primary)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--color-text-secondary)')
          }
        >
          ← Home
        </Link>
      </div>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          {/* Header */}
          <motion.div
            style={{ marginBottom: '48px', maxWidth: '600px' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="type-h1"
              style={{
                color: 'var(--color-text-primary)',
                margin: '0 0 14px',
              }}
            >
              Ideas that don&apos;t beg for your attention.
            </h1>
            <p
              className="type-body"
              style={{ color: 'var(--color-text-secondary)', margin: 0 }}
            >
              Thinking about the ideas that make stories land — and the ones
              that make audiences lean in.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid-3"
            variants={
              reduced
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }
            }
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                className="blog-card"
                variants={reduced ? undefined : cardVariants}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p
                  className="type-label"
                  style={{
                    color: 'var(--color-text-secondary)',
                    marginBottom: '14px',
                  }}
                >
                  {post.readTime}
                </p>
                <h2
                  className="type-h3"
                  style={{
                    color: 'var(--color-text-primary)',
                    margin: '0 0 10px',
                  }}
                >
                  {post.title}
                </h2>
                <p
                  className="type-body"
                  style={{
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 20px',
                  }}
                >
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="btn-text">
                  Read →
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
