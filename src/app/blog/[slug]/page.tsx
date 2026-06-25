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

  return (
    <main style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Header */}
      <header
        style={{
          background: '#ffffff',
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
          background: '#ffffff',
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
              <p className="eyebrow" style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                COMING SOON
              </p>
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
    </main>
  )
}
