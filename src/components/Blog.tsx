'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { getLatestPosts } from '@/content/blog-posts'

const posts = getLatestPosts(3)
const [featured, ...secondary] = posts

// Cards scale-pop in — reads as "appearing" rather than "rising".
// Different from Portfolio's sticky stack and Logos' blur-materialize.
const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function Blog() {
  const reduced = useReducedMotion()

  return (
    <section className="section section-glow-top">
      <div className="container">

        {/* Section header */}
        <motion.div
          style={{ marginBottom: '40px', maxWidth: '560px' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 14px' }}>
            Ideas that don&apos;t beg for your attention.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
            Thinking about the ideas that make stories land — and the ones that make audiences lean in.
          </p>
        </motion.div>

        {/* Featured post — horizontal: image left, text right */}
        {featured && (
          <motion.article
            className="blog-featured-card"
            variants={reduced ? undefined : cardVariants}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image — fills left half */}
            {featured.coverImage && (
              <div className="blog-featured-image" style={{ overflow: 'hidden' }}>
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  style={{ objectFit: 'cover', transition: 'transform 450ms var(--ease-out-expo)' }}
                  sizes="(max-width: 720px) 100vw, 50vw"
                  className="blog-card-cover"
                />
              </div>
            )}

            {/* Text — right side, vertically centered */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(28px, 4vw, 52px)',
              }}
            >
              <p
                className="type-label"
                style={{ color: 'var(--color-text-secondary)', marginBottom: '14px' }}
              >
                {featured.tags[0]} · {featured.readTime}
              </p>
              <h3
                className="type-h2"
                style={{ color: 'var(--color-text-primary)', margin: '0 0 14px' }}
              >
                {featured.title}
              </h3>
              <p
                className="type-body"
                style={{ color: 'var(--color-text-secondary)', margin: '0 0 28px', maxWidth: '400px' }}
              >
                {featured.excerpt}
              </p>
              <a href={`/blog/${featured.slug}`} className="btn-text">
                Read Now →
              </a>
            </div>
          </motion.article>
        )}

        {/* Secondary posts — 2-column grid */}
        <motion.div
          className="blog-secondary-grid"
          variants={reduced ? undefined : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.10 } },
          }}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {secondary.map((post) => (
            <motion.article
              key={post.slug}
              className="blog-card"
              style={{ padding: 0, overflow: 'hidden' }}
              variants={reduced ? undefined : cardVariants}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {post.coverImage && (
                <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 450ms var(--ease-out-expo)' }}
                    sizes="(max-width: 720px) 100vw, 50vw"
                    className="blog-card-cover"
                  />
                </div>
              )}
              <div style={{ padding: '20px 24px 24px' }}>
                <p
                  className="type-label"
                  style={{ color: 'var(--color-text-secondary)', marginBottom: '10px' }}
                >
                  {post.tags[0]} · {post.readTime}
                </p>
                <h3 className="type-h3" style={{ color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
                  {post.title}
                </h3>
                <p
                  className="type-body"
                  style={{ color: 'var(--color-text-secondary)', margin: '0 0 20px' }}
                >
                  {post.excerpt}
                </p>
                <a href={`/blog/${post.slug}`} className="btn-text">
                  Read Now →
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Read All link */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '48px' }}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a href="/blog" className="btn-text" style={{ fontSize: '0.9375rem' }}>
            Read All Posts →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
