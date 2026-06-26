'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor
 * - Dot: 12px solid, follows mouse instantly
 * - Ring: 40px, follows with spring delay
 * - On interactive hover: dot grows to 16px + turns gold, ring expands to 56px
 * - Hidden on touch/coarse-pointer devices via JS + CSS safety net
 * - Hides native cursor via CSS class on <html>
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafId   = useRef<number>(0)
  const mouse   = useRef({ x: -200, y: -200 })

  // Fine-pointer check — state so we re-render if input type changes
  const [isFine, setIsFine]       = useState(false)
  const [visible, setVisible]     = useState(false)
  const [hovering, setHovering]   = useState(false)

  // Detect pointer type (runs once; also listens for changes e.g. iPad with mouse)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFine(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsFine(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Main cursor logic — only runs when isFine is true
  useEffect(() => {
    if (!isFine) return

    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }
    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)
    const onOver   = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      )
      setHovering(!!el)
    }

    document.addEventListener('mousemove', onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover',  onOver,  { passive: true })

    const SPRING = 0.10

    function loop() {
      const dot  = dotRef.current
      const ring = ringRef.current
      if (dot && ring) {
        dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`

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
      document.removeEventListener('mouseover',  onOver)
      document.documentElement.classList.remove('custom-cursor-active')
      cancelAnimationFrame(rafId.current)
    }
  }, [isFine]) // re-run only if pointer type changes

  // Don't render the DOM nodes at all on touch devices
  if (!isFine) return null

  return (
    <>
      {/* Dot — solid, always visible, large enough to see clearly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:      hovering ? '16px' : '12px',
          height:     hovering ? '16px' : '12px',
          borderRadius: '50%',
          background: hovering ? 'rgba(200,169,110,1)' : '#ffffff',
          boxShadow:  hovering ? '0 0 0 2px rgba(200,169,110,0.25)' : '0 0 0 1.5px rgba(0,0,0,0.35)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: [
            'opacity 200ms ease',
            'width 250ms cubic-bezier(0.34,1.56,0.64,1)',
            'height 250ms cubic-bezier(0.34,1.56,0.64,1)',
            'background 250ms ease',
            'box-shadow 250ms ease',
          ].join(', '),
          willChange: 'transform',
        }}
      />

      {/* Ring — lagging spring follower */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:    hovering ? '56px' : '40px',
          height:   hovering ? '56px' : '40px',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? 'rgba(200,169,110,0.85)' : 'rgba(255,255,255,0.45)'}`,
          background: hovering ? 'rgba(200,169,110,0.07)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: [
            'opacity 200ms ease',
            'width 350ms cubic-bezier(0.34,1.56,0.64,1)',
            'height 350ms cubic-bezier(0.34,1.56,0.64,1)',
            'border-color 250ms ease',
            'background 250ms ease',
          ].join(', '),
          willChange: 'transform',
        }}
      />
    </>
  )
}
