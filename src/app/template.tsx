/**
 * template.tsx — Next.js App Router route transition layer.
 * Re-mounts on every navigation.
 *
 * Two layers (Phase 4, audit rec 19):
 *   .page-wipe               — a void-colored plate that wipes up and away,
 *                              revealing the incoming page underneath.
 *                              It animates ITS OWN transform (safe).
 *   .page-transition-wrapper — opacity-only fade on the content. NEVER put
 *                              a transform here: it becomes the containing
 *                              block for position:fixed descendants and
 *                              breaks ScrollTrigger pins + fixed canvases.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-wrapper">
      <div className="page-wipe" aria-hidden="true" />
      {children}
    </div>
  )
}
