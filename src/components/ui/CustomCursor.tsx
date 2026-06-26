'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor
 * - Dot: 7px, follows mouse exactly (no lag)
 * - Ring: 36px, follows with spring delay
 * - On interactive hover: dot shrinks + disappears, ring expands to 56px
 * - Hidden on touch/coarse-pointer devices
 * - Hides native cursor via CSS class on <html>
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const mouse  = useRef({ x: 0, y: 0 })
  const ring   = useRef({ x: 0, y: 0 })
  const rafId  = useRef<number>(0)
  const [visible, setVisible]   = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Only on pointer-fine (mouse) devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Hide native cursor globally
    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // Detect interactive elements for hover state
    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')
      setHovering(!!interactive)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    // Spring animation loop
    const SPRING = 0.10  // ring follow speed (lower = more lag)

    function loop() {
      const dot  = dotRef.current
      const ring = ringRef.current

      if (dot && ring) {
        // Dot: instant
        dot.style.transform  = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`

        // Ring: spring
        const rx = (ring as unknown as { _x?: number })._x ?? mouse.current.x
        const ry = (ring as unknown as { _y?: number })._y ?? mouse.current.y
        const nx = rx + (mouse.current.x - rx) * SPRING
        const ny = ry + (mouse.current.y - ry) * SPRING
        ;(ring as unknown as Record<string, unknown>)._x = nx
        ;(ring as unknown as Record<string, unknown>)._y = ny
        ring.style.transform = `translate(${nx}px, ${ny}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.documentElement.classList.remove('custom-cursor-active')
      cancelAnimationFrame(rafId.current)
    }
  }, [visible])

  // Don't render on server or touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--color-on-dark, #fafafa)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          opacity: visible ? (hovering ? 0 : 1) : 0,
          transition: 'opacity 200ms ease, width 250ms ease, height 250ms ease',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '52px' : '36px',
          height: hovering ? '52px' : '36px',
          borderRadius: '50%',
          border: `1px solid ${hovering ? 'rgba(200,169,110,0.8)' : 'rgba(250,250,250,0.5)'}`,
          background: hovering ? 'rgba(200,169,110,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease, width 350ms cubic-bezier(0.34,1.56,0.64,1), height 350ms cubic-bezier(0.34,1.56,0.64,1), border-color 250ms ease, background 250ms ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
