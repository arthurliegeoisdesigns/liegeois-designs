import type { CaseStudy } from '@/content/types'

/**
 * One source of truth for everything Google is told about a case study video.
 *
 * WHY THIS EXISTS
 * The video metadata used to live in two hand-maintained places: the
 * VideoObject built inline in work/[slug]/page.tsx, and a static
 * public/video-sitemap.xml typed out by hand. They disagreed. The schema
 * pointed thumbnailUrl at Cloudinary while the sitemap pointed
 * video:thumbnail_loc at the old Webflow CDN, and both carried a bare
 * 'YYYY-MM-DD' upload date. Search Console rejected the date twice and
 * refused to index any of the five videos.
 *
 * Both consumers now read from here, so a disagreement is no longer
 * expressible. This is the same class of bug as the hardcoded service
 * count in the sitemap and the "Four ways in" heading: a list maintained
 * by hand next to the data it describes will drift, and the fix is always
 * to derive it.
 */

/** Arthur publishes from New Jersey. Both dates on file fall inside EDT. */
const OFFSET = '-04:00'

/**
 * Turn a bare calendar date into a schema.org DateTime.
 *
 * '2025-06-01' is not a valid DateTime — it has no time and no offset,
 * which is precisely what Search Console flagged. Noon is chosen over
 * midnight because a midnight timestamp lands on the previous calendar
 * day in any timezone west of the publisher, and Google displays the
 * date it parses, not the date that was typed.
 */
export function toDateTime(date: string): string {
  return /T/.test(date) ? date : `${date}T12:00:00${OFFSET}`
}

/** Seconds to ISO 8601 duration, the only form schema.org accepts. */
export function toIso8601Duration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `PT${m > 0 ? `${m}M` : ''}${s}S`
}

export type VideoMeta = {
  pageUrl: string
  contentUrl: string
  thumbnailUrl: string
  title: string
  description: string
  uploadDate: string
  duration?: string
  durationSeconds?: number
}

/**
 * Returns null when a case study has no video, which is the normal case for
 * 31 of the 36. Callers must handle null rather than assuming a video exists.
 */
export function videoMetaFor(cs: CaseStudy, description: string): VideoMeta | null {
  if (!cs.video) return null

  return {
    pageUrl: `https://www.liegeoisdesigns.com/work/${cs.slug}`,
    contentUrl: cs.video,
    /* cs.images[0] is the same Cloudinary asset the page renders as the video
       poster. Google cross-checks the sitemap thumbnail against the schema
       thumbnail and against what the page actually paints; three different
       URLs for one frame is a reason to distrust all three. */
    thumbnailUrl: cs.images[0],
    title: `${cs.client}: ${cs.project}`,
    description,
    uploadDate: toDateTime(cs.videoUploadDate ?? `${cs.year}-01-01`),
    duration: cs.videoDuration ? toIso8601Duration(cs.videoDuration) : undefined,
    durationSeconds: cs.videoDuration,
  }
}

/** Every case study carrying a video, in the order they appear on /work. */
export function caseStudiesWithVideo(all: CaseStudy[]): CaseStudy[] {
  return all.filter((cs) => Boolean(cs.video))
}
