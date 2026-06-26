/**
 * template.tsx — Next.js App Router route transition layer.
 * Re-mounts on every navigation. Uses a CSS keyframe fade-up
 * instead of framer-motion to avoid SSR bundle conflicts in
 * Next.js 16 / Turbopack (dual-React null hook issue).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-wrapper">
      {children}
    </div>
  )
}
