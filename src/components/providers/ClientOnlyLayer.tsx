'use client'

import dynamic from 'next/dynamic'

// All three components use React hooks and have no meaningful SSR output.
// Loading them ssr:false keeps them out of the server prerender bundle,
// preventing the null react-ssr crash in Next.js 16 (Turbopack + Webpack).
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
  { ssr: false },
)
const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => ({ default: m.SpeedInsights })),
  { ssr: false },
)

/**
 * ClientOnlyLayer — groups UI components that must not run during SSR.
 * Placed once in the root layout; renders nothing on the server.
 */
export default function ClientOnlyLayer() {
  return (
    <>
      <CustomCursor />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
