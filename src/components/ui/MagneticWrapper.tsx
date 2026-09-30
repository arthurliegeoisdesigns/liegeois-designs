'use client'

import { useRef, useCallback } from 'react'
import { animate } from 'motion'

interface MagneticWrapperProps {
  children: React.ReactNode
  strength?: number   // pull distance in px (default 18)
  className?: string
  style?: React.CSSProperties
}

/**
 * MagneticWrapper
 * Pulls the child toward the cursor on hover.
 *
 * Springs, not CSS transitions: every pointer move re-targets the spring from
 * the element's LIVE position and velocity, so the pull never jumps or lags
 * behind the cursor (the old 100ms linear transition did both). X and Y are
 * animated independently. The release is the one place a little bounce is
 * earned, because the pull had momentum.
 *
 * willChange is set only while hovered, so idle instances cost no GPU layer.
 */
export default function MagneticWrapper({
  children,
  strength = 18,
  className,
  style,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMouseEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.willChange = 'transform'
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el || reduced()) return
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)   // -1 to 1
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)  // -1 to 1
      animate(el, { x: dx * strength, y: dy * strength }, { type: 'spring', bounce: 0, duration: 0.3 })
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    animate(el, { x: 0, y: 0 }, { type: 'spring', bounce: 0.25, duration: 0.5 })
    window.setTimeout(() => { if (ref.current) ref.current.style.willChange = 'auto' }, 600)
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
