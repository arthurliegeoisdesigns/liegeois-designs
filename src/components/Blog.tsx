'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionCut from './SectionCut'
import { getLatestPosts } from '@/content/blog-posts'

const posts = getLatestPosts(3)

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Blog() {
  const reduced = useReducedMotion()

  return (
    <section className="section section-cream">
      <div className="container">
        <motion.div
          style={{ marginBottom: '40px', maxWidth: '520px' }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: '0 0 14px' }}>
            Ideas that don&apos;t beg for your attention.
          </h2>
          <p className="type-body" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
            Thinking about the ideas that make stories land — and the ones that make audiences
            lean in.
          </p>
        </motion.div>

        <motion.div
          className="grid-3"
          variants={reduced ? undefined : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
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
                style={{ color: 'var(--color-text-secondary)', marginBottom: '14px' }}
              >
                {post.readTime}
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
            </motion.article>
          ))}
        </motion.div>
      </div>

      <SectionCut from="cream" to="dark" />
    </section>
  )
}
