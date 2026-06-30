'use client'

import dynamic from 'next/dynamic'

// LenisInit is loaded client-side only — it imports lenis and calls useEffect.
// Keeping it ssr:false prevents the null react-ssr crash during static
// prerendering in Next.js 16 (both Turbopack and Webpack bundle lenis into the
// server SSR chunk where React's vendored SSR instance isn't yet initialised).
const LenisInit = dynamic(() => import('./LenisInit'), { ssr: false })

/**
 * SmoothScrollProvider
 * Injects the Lenis smooth-scroll initialiser (client-only) and passes
 * children through unchanged. No hooks here — safe to SSR.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LenisInit />
      {children}
    </>
  )
}
