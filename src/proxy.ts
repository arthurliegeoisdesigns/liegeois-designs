import { NextResponse, type NextRequest } from 'next/server'

/**
 * GONE — pages deliberately withdrawn.
 *
 * WHY 410 AND NOT 404
 * 404 means "not found", which Google treats as possibly temporary: it keeps
 * the URL in its index and recrawls it for months hoping it comes back. 410
 * means "gone, intentionally, do not come back", and Google drops it markedly
 * faster. When the point of the removal is that the content should stop being
 * associated with you, that difference is the whole exercise.
 *
 * WHAT IS HERE AND WHY
 * Three essays about ADHD, removed 7 September 2026 at Arthur's request. The
 * site is now aimed at recruiters and design leads, and whether to disclose a
 * diagnosis to that audience is his call to make, not a decision that should
 * sit permanently on a blog he wrote for a different purpose.
 *
 * The theme they belonged to went with them. Its label rendered as a filter
 * chip on the blog index, so removing the posts alone would have left an empty
 * chip reading "ADHD as a Creative Asset".
 *
 * HONEST LIMIT
 * This is as close to erasure as the tooling gets, and it is not complete.
 * Google has cached copies, and third-party scrapers may have their own.
 * Submitting each URL through Search Console → Removals clears them from
 * results in about a day rather than waiting for a recrawl; that step is
 * manual and is tracked in Todoist.
 *
 * ADDING TO THIS LIST
 * Only for content withdrawn on purpose. A URL that moved wants a redirect in
 * next.config.ts instead, and there are already about forty of those from the
 * Webflow migration. A 410 on something that still exists elsewhere throws
 * away the link equity rather than passing it on.
 *
 * VERIFIED 7 Sep 2026 against a production build on :3111
 *   /blog/chaos-as-raw-material                      410
 *   /blog/chaos-as-raw-material/                     308 -> 410
 *   /blog/neurodivergent-better-visual-storyteller   410
 *   /blog/the-day-i-fired-my-inner-impostor-boss     410
 *   /blog/slides-as-speaker-support                  200  (unaffected)
 *   /blog/does-not-exist-at-all                      404  (still a plain 404)
 *
 * This file is proxy.ts, not middleware.ts: Next 16 deprecated the middleware
 * convention and warns on build. Same behaviour, current name.
 */
const GONE = new Set([
  '/blog/chaos-as-raw-material',
  '/blog/neurodivergent-better-visual-storyteller',
  '/blog/the-day-i-fired-my-inner-impostor-boss',
])

export function proxy(request: NextRequest) {
  // Next normalises the trailing slash with a 308 before this runs, so the
  // slashed form arrives here already stripped. Kept anyway: it costs nothing
  // and it means this function is correct on its own terms rather than
  // correct only because something upstream happens to tidy up first.
  const path = request.nextUrl.pathname.replace(/\/+$/, '') || '/'

  if (GONE.has(path)) {
    return new NextResponse(
      // A body, not an empty response: a bare status code renders as a blank
      // white page in a browser, and people do still click old links.
      `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Gone | Liégeois Designs</title>
<meta name="robots" content="noindex">
<style>
  html{background:#070605;color:#F7F4EF;font:16px/1.7 system-ui,sans-serif}
  main{max-width:32rem;margin:22vh auto;padding:0 1.5rem}
  h1{font-weight:300;font-size:2rem;margin:0 0 1rem}
  p{color:#BDB7AE;margin:0 0 1.5rem}
  a{color:#FF6442}
</style></head><body><main>
<h1>This piece has been taken down.</h1>
<p>It is not lost or moved. It was withdrawn deliberately.</p>
<p><a href="/blog">Read the rest of the journal</a></p>
</main></body></html>`,
      {
        status: 410,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          // Do not let a CDN or browser hold a 410 for long: if one of these
          // is ever restored, a cached 410 would outlive the decision.
          'cache-control': 'public, max-age=0, must-revalidate',
          'x-robots-tag': 'noindex',
        },
      },
    )
  }

  return NextResponse.next()
}

/**
 * Scoped to /blog so the middleware does not run on every asset request. Next
 * matches this at the edge before routing, so a broad matcher here is real
 * per-request cost on a site that is otherwise fully static.
 */
export const config = {
  matcher: '/blog/:path*',
}
