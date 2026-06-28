// ─────────────────────────────────────────────────────────────────────────────
// CMS Content Types — Liegeois Designs
// All content collections are typed here.
// To edit content: update the corresponding collection file in src/content/.
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceFormat =
  | 'Pitch & Investor Deck'
  | 'Executive Presentation'
  | 'Sales & Agency Deck'
  | 'Training Presentation'
  | 'Strategic Narrative'

export type CaseStudy = {
  /** URL slug — used for /work/[slug] pages */
  slug: string
  /** Client name as it appears publicly */
  client: string
  /** Project/deck title */
  project: string
  /** Presentation format */
  format: ServiceFormat
  /** Industry vertical */
  industry: string
  /** Year delivered */
  year: number
  /** One-line description shown in portfolio cards */
  tagline: string
  /** SEO meta description — keyword-rich, used in <meta description> and OG tags */
  seoDescription?: string
  /**
   * 3–6 curated slide images.
   * First image is the hero/thumbnail shown in the grid.
   */
  images: string[]
  /**
   * Optional Cloudinary video URL (mp4).
   * When present, replaces the static hero image with an autoplay muted loop.
   * Format: https://res.cloudinary.com/[cloud]/video/upload/[public_id].mp4
   */
  video?: string
  /**
   * ISO 8601 date the video was uploaded/published.
   * Required by Google for VideoObject schema indexing.
   * Format: 'YYYY-MM-DD'
   */
  videoUploadDate?: string
  /** Show on homepage portfolio grid */
  featured: boolean
  /** Order within the homepage grid (lower = earlier) */
  order?: number
  /** Agency partner, if applicable */
  agency?: string
  /** Brief summary of the project */
  summary?: string
  /** What the client asked for */
  theAsk?: string
  /** Key challenges faced */
  challenge?: string
  /** How we solved it */
  solution?: string
  /** Results and impact */
  outcome?: string
}

export type BlogPost = {
  /** URL slug — used for /blog/[slug] pages */
  slug: string
  title: string
  /** 1–2 sentence teaser shown in blog cards */
  excerpt: string
  /** Estimated read time, e.g. "8 min read" */
  readTime: string
  /** ISO date string */
  publishedAt: string
  /** Category tags */
  tags: string[]
  /** Blog theme slug — links to blog-themes collection */
  theme?: string
  /** true = post exists as draft only, not published */
  draft: boolean
  /** Cover image path relative to /public (optional) */
  coverImage?: string
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  title: string
  company: string
  /** Optional headshot path relative to /public */
  avatar?: string
}

export type Client = {
  id: string
  name: string
  /** SVG or image path relative to /public */
  logo: string
  /** Used for logo inversion in dark sections */
  logoOnDark?: string
  /** Optional URL */
  url?: string
}
