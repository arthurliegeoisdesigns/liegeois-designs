// ─────────────────────────────────────────────────────────────────────────────
// Blog Themes Collection — Liegeois Designs
// ─────────────────────────────────────────────────────────────────────────────

export type BlogTheme = {
  slug: string
  label: string
  order: number
}

export const blogThemes: BlogTheme[] = [
  { slug: 'breaking-free-from-the-script',    label: 'Breaking Free from the Script',  order: 1 },
  { slug: 'becoming-a-visual-storyteller',     label: 'Becoming a Visual Storyteller',  order: 2 },
  { slug: 'adhd-as-a-creative-asset',          label: 'ADHD as a Creative Asset',       order: 3 },
  { slug: 'lessons-for-fellow-travelers',      label: 'Lessons for Fellow Travelers',   order: 4 },
  { slug: 'presentation-design-tips',          label: 'Presentation Design Tips',       order: 5 },
  { slug: 'ai-in-design',                      label: 'AI in Design',                   order: 6 },
]

export function getThemeBySlug(slug: string): BlogTheme | undefined {
  return blogThemes.find((t) => t.slug === slug)
}
