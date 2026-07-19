import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { blogPosts } from '@/content/blog-posts'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.liegeoisdesigns.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://liegeoisdesigns.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const mdxPath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.mdx`)
  const hasMdx = fs.existsSync(mdxPath)
  const source = hasMdx ? fs.readFileSync(mdxPath, 'utf-8') : null

  const BASE = 'https://www.liegeoisdesigns.com'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    author: {
      '@type': 'Person',
      name: 'Arthur Liégeois',
      url: `${BASE}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Liégeois Designs',
      url: BASE,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/images/logo-liegeois-footer-white.svg`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}/blog/${slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/blog/${slug}` },
    ],
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-paper)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Header */}
      <header
        style={{
          background: 'var(--color-paper)',
          borderBottom: '0.5px solid var(--color-border)',
          padding: 'var(--section-pad-y) var(--section-pad-x)',
          paddingTop: '100px',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: '40px',
            }}
          >
            ← All Posts
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            <span className="type-label" style={{ color: 'var(--color-text-secondary)' }}>
              {post.readTime}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.625rem',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border-mid)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="type-h1" style={{ color: 'var(--color-text-primary)', margin: 0 }}>
            {post.title}
          </h1>
        </div>
      </header>

      {/* Body */}
      <section
        style={{
          background: 'var(--color-paper)',
          padding: 'var(--section-pad-y) var(--section-pad-x)',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {source ? (
            <div className="prose prose-light">
              <MDXRemote source={source} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h2 className="type-h2" style={{ color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
                {post.title}
              </h2>
              <p
                className="type-body-lg"
                style={{ color: 'var(--color-text-secondary)', margin: '0 auto', maxWidth: '480px' }}
              >
                {post.excerpt}
              </p>
              <Link href="/blog" className="btn-text" style={{ marginTop: '32px' }}>
                ← Back to all posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Related posts — crawl paths for the un-indexed catalog
             (SEO sprint, July 2026): shared theme first, then tags ── */}
      {(() => {
        const related = [
          ...blogPosts.filter((p) => p.slug !== post.slug && !p.draft && p.theme === post.theme),
          ...blogPosts.filter(
            (p) => p.slug !== post.slug && !p.draft && p.theme !== post.theme &&
              (p.tags ?? []).some((t) => (post.tags ?? []).includes(t)),
          ),
        ].slice(0, 3)
        if (related.length === 0) return null
        return (
          <section style={{ background: 'var(--color-paper)', padding: '0 var(--section-pad-x) clamp(64px, 8vw, 110px)' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto', borderTop: '0.5px solid var(--color-border)', paddingTop: 'clamp(32px, 4vw, 48px)' }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)', margin: '0 0 20px',
              }}>
                Keep reading
              </p>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  style={{ display: 'block', textDecoration: 'none', padding: '14px 0', borderBottom: '0.5px solid var(--color-border)' }}
                >
                  <span className="type-body" style={{ color: 'var(--color-text-primary)', fontWeight: 500, display: 'block' }}>
                    {p.title}
                  </span>
                  <span className="type-body" style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                    {p.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )
      })()}
    </main>
  )
}
