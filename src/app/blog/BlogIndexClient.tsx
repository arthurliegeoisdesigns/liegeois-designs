'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { blogPosts, publishedPosts } from '@/content/blog-posts'
import { blogThemes, getThemeBySlug } from '@/content/blog-themes'

/**
 * BlogIndexClient v2 — editorial front page (Phase 6).
 * One featured essay at poster scale, then two strands:
 *   The Craft   — presentation design, storytelling, AI
 *   Field Notes — the personal strand (reinvention, ADHD, fellow travelers)
 * Theme chips filter into a flat editorial list. Dark, one-world aesthetic.
 */
const FIELD_NOTES_THEMES = new Set([
  'breaking-free-from-the-script',
  'adhd-as-a-creative-asset',
  'lessons-for-fellow-travelers',
])

const allPosts = (process.env.NODE_ENV === 'development' ? blogPosts : publishedPosts)
  .slice()
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

const ease = [0.16, 1, 0.3, 1] as const

function fmtDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function PostRow({ post }: { post: (typeof allPosts)[number] }) {
  const theme = post.theme ? getThemeBySlug(post.theme) : undefined
  return (
    <Link href={`/blog/${post.slug}`} className="blog-ed-row" data-cursor="Read">
      <span className="blog-ed-row-date">{fmtDate(post.publishedAt)}</span>
      <span className="blog-ed-row-main">
        <span className="blog-ed-row-title">
          {post.title}
          {post.draft && <span className="blog-ed-draft">Draft</span>}
        </span>
        <span className="blog-ed-row-excerpt">{post.excerpt}</span>
      </span>
      <span className="blog-ed-row-meta">
        <span>{theme?.label ?? post.tags[0]}</span>
        <span>{post.readTime}</span>
      </span>
      <span className="blog-ed-row-arrow" aria-hidden="true">→</span>
    </Link>
  )
}

export default function BlogIndexClient() {
  const reduced = useReducedMotion()
  const [activeTheme, setActiveTheme] = useState<string | null>(null)

  const [featured, ...rest] = allPosts
  const craft = rest.filter((p) => !FIELD_NOTES_THEMES.has(p.theme ?? ''))
  const fieldNotes = rest.filter((p) => FIELD_NOTES_THEMES.has(p.theme ?? ''))
  const filtered = activeTheme ? allPosts.filter((p) => p.theme === activeTheme) : null

  return (
    <main className="section-dark" style={{ background: 'var(--color-canvas)', minHeight: '100vh' }}>
      <section
        className="section"
        style={{ paddingTop: 'calc(72px + clamp(40px, 6vw, 72px))' }}
      >
        <div className="container">
          {/* Header */}
          <motion.div
            style={{ marginBottom: 'clamp(32px, 4vw, 56px)', maxWidth: '700px' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)', margin: '0 0 16px' }}>
              THE BLOG — {allPosts.length} ESSAYS
            </p>
            <h1 className="type-display" style={{ color: 'var(--color-on-dark)', margin: '0 0 16px' }}>
              Ideas that don&apos;t <em style={{ fontStyle: 'italic' }}>beg</em> for attention.
            </h1>
            <p className="type-body-lg" style={{ color: 'var(--color-on-dark-muted)', margin: 0, maxWidth: '520px' }}>
              Thinking about the ideas that make stories land — and the ones that make audiences
              lean in.
            </p>
          </motion.div>

          {/* Theme chips */}
          <motion.div
            className="work-filters"
            role="tablist"
            aria-label="Filter posts by theme"
            style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            {[{ slug: null as string | null, label: 'All' }, ...blogThemes].map((t) => {
              const isActive = activeTheme === t.slug || (t.slug === null && !activeTheme)
              const count =
                t.slug === null ? allPosts.length : allPosts.filter((p) => p.theme === t.slug).length
              return (
                <button
                  key={t.slug ?? 'all'}
                  role="tab"
                  aria-pressed={isActive}
                  className={`work-filter${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveTheme(t.slug === activeTheme ? null : t.slug)}
                >
                  {t.label} <sup>{count}</sup>
                </button>
              )
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            {filtered ? (
              /* ── Filtered flat list ── */
              <motion.div
                key={activeTheme}
                className="blog-ed-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((p) => (
                  <PostRow key={p.slug} post={p} />
                ))}
                {filtered.length === 0 && (
                  <p className="type-body" style={{ color: 'var(--color-on-dark-muted)', padding: '48px 0' }}>
                    No posts in this theme yet.
                  </p>
                )}
              </motion.div>
            ) : (
              /* ── Editorial front ── */
              <motion.div
                key="front"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured essay */}
                {featured && (
                  <Link href={`/blog/${featured.slug}`} className="blog-ed-featured" data-cursor="Read">
                    {featured.coverImage && (
                      <span className="blog-ed-featured-media">
                        <Image
                          src={featured.coverImage}
                          alt={featured.title}
                          fill
                          priority
                          sizes="(max-width: 900px) 100vw, 58vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </span>
                    )}
                    <span className="blog-ed-featured-body">
                      <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>
                        LATEST — {(featured.theme ? getThemeBySlug(featured.theme)?.label : undefined) ?? featured.tags[0]}
                      </span>
                      <span className="blog-ed-featured-title">{featured.title}</span>
                      <span className="blog-ed-row-excerpt" style={{ maxWidth: '480px' }}>
                        {featured.excerpt}
                      </span>
                      <span className="btn-text">Read the essay →</span>
                    </span>
                  </Link>
                )}

                {/* The Craft */}
                <div className="blog-ed-strand">
                  <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)' }}>THE CRAFT</p>
                  <div className="blog-ed-list">
                    {craft.map((p) => (
                      <PostRow key={p.slug} post={p} />
                    ))}
                  </div>
                </div>

                {/* Field Notes */}
                {fieldNotes.length > 0 && (
                  <div className="blog-ed-strand">
                    <p className="eyebrow" style={{ color: 'var(--color-on-dark-faint)' }}>
                      FIELD NOTES — <em style={{ fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>the personal strand</em>
                    </p>
                    <p className="type-body" style={{ color: 'var(--color-on-dark-muted)', maxWidth: '520px', margin: '12px 0 0' }}>
                      Reinvention, ADHD as a creative asset, and honest notes for fellow travelers.
                      The person behind the pixels.
                    </p>
                    <div className="blog-ed-list" style={{ marginTop: '24px' }}>
                      {fieldNotes.map((p) => (
                        <PostRow key={p.slug} post={p} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
