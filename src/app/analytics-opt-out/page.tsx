import type { Metadata } from 'next'
import OptOutToggle from './OptOutToggle'

/**
 * A page Arthur can open on any device to stop his own visits reaching GA4.
 *
 * WHY THIS EXISTS RATHER THAN GA4'S IP FILTER
 * Roughly 18% of the property's users were Arthur visiting his own site.
 * The standard fix is GA4's internal-traffic IP filter. On 7 Sep 2026 that
 * turned out to be unusable here: his IP reads as 146.75.245.37, which belongs
 * to Fastly, which is one of Apple's iCloud Private Relay egress partners. The
 * address is not his, it rotates, and it is SHARED with every other Private
 * Relay user routed through that egress.
 *
 * Filtering on it would have been worse than doing nothing. It would not
 * reliably catch him, and it would silently discard real visitors who happen to
 * share the egress — and GA4 filters DELETE rather than hide, so that loss is
 * permanent and invisible.
 *
 * This is per-browser, which is the right granularity for one person, and it
 * does not depend on an IP address at all.
 *
 * NOINDEX. Nothing here is for the public, and a page about analytics
 * suppression is not something to have surfacing in search results.
 */
export const metadata: Metadata = {
  title: 'Analytics opt-out',
  robots: { index: false, follow: false },
}

export default function AnalyticsOptOutPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--nav-h, 80px) + 40px) var(--section-pad-x) 80px',
      }}
    >
      <div style={{ maxWidth: '52ch', width: '100%' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.5625rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'var(--color-eyebrow)',
            margin: 0,
          }}
        >
          Private
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            margin: '16px 0 20px',
          }}
        >
          Keep my visits out of analytics.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            margin: '0 0 8px',
          }}
        >
          This setting lives in this browser on this device, so it survives your
          IP address changing and it does not affect anyone else. Open this page
          once in every browser you use, including on your phone.
        </p>
        <OptOutToggle />
      </div>
    </main>
  )
}
