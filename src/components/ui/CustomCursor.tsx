'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor — Option B: dual-outline dot
 *
 * Dot: 16px solid dark fill + white inner ring + soft dark outer ring via box-shadow.
 * Visible on any surface — light, dark, images, gradients.
 *
 * Default:  dark fill (#0A0A0A) · white 2.5px ring · dark 1px outer ring
 * Hover:    gold fill · gold glow ring · ring expands to 56px
 *
 * Ring: 42px spring-lag follower
 * Hidden entirely on touch/coarse-pointer devices
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafId   = useRef<number>(0)
  const mouse   = useRef({ x: -300, y: -300 })

  const [isFine,   setIsFine]   = useState(false)
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)

  // Detect pointer type once + listen for changes (iPad with keyboard, etc.)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFine(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsFine(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Main cursor logic — stable, runs once per isFine change
  useEffect(() => {
    if (!isFine) return

    document.documentElement.classList.add('custom-cursor-active')

    const onMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; setVisible(true) }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onOver  = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      )
      setHovering(!!el)
    }

    document.addEventListener('mousemove',  onMove,  { passive: true })
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
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover',  onOver)
      document.documentElement.classList.remove('custom-cursor-active')
      cancelAnimationFrame(rafId.current)
    }
  }, [isFine])

  if (!isFine) return null

  return (
    <>
      {/* ── Dot ──
          Dark fill + white box-shadow inner ring + dark outer ring.
          This triple layer guarantees visibility on any background.
          On hover: turns gold with a soft gold glow.
      */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:    hovering ? '20px' : '16px',
          height:   hovering ? '20px' : '16px',
          borderRadius: '50%',
          background: hovering ? '#C8A96E' : '#0A0A0A',
          // white ring (2.5px) + outer dark/gold halo for universal legibility
          boxShadow: hovering
            ? '0 0 0 2.5px #ffffff, 0 0 0 4.5px rgba(200,169,110,0.5)'
            : '0 0 0 2.5px #ffffff, 0 0 0 4.5px rgba(0,0,0,0.25)',
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

      {/* ── Ring ── spring-lag follower */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width:  hovering ? '56px' : '42px',
          height: hovering ? '56px' : '42px',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? 'rgba(200,169,110,0.85)' : 'rgba(255,255,255,0.5)'}`,
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
