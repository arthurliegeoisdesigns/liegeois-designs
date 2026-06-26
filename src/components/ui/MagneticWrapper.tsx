'use client'

import { useRef, useCallback } from 'react'

interface MagneticWrapperProps {
  children: React.ReactNode
  strength?: number   // pull distance in px (default 18)
  className?: string
  style?: React.CSSProperties
}

/**
 * MagneticWrapper
 * Wraps any element and pulls it toward the cursor on hover.
 * Snaps back on mouse leave with a spring-like CSS transition.
 *
 * Usage:
 *   <MagneticWrapper>
 *     <Link href="/work">See the Work</Link>
 *   </MagneticWrapper>
 */
export default function MagneticWrapper({
  children,
  strength = 18,
  className,
  style,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width  / 2)   // -1 … 1
      const dy = (e.clientY - cy) / (rect.height / 2)   // -1 … 1
      el.style.transform  = `translate(${dx * strength}px, ${dy * strength}px)`
      el.style.transition = 'transform 100ms linear'
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform  = 'translate(0, 0)'
    el.style.transition = 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)'
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
