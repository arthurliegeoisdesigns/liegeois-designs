'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { TextScramble } from '@/components/ui/TextScramble'

interface ScrambleEyebrowProps {
  children: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Drop-in replacement for `<span className="eyebrow">`.
 * Triggers the TextScramble effect once the element enters the viewport.
 * Uses `display: contents` on the outer wrapper so it doesn't affect layout.
 */
export function ScrambleEyebrow({
  children,
  className = 'eyebrow',
  style,
}: ScrambleEyebrowProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <span ref={ref} style={{ display: 'contents' }}>
      <TextScramble
        as="span"
        className={className}
        style={style}
        duration={0.9}
        speed={0.04}
        trigger={inView}
      >
        {children}
      </TextScramble>
    </span>
  )
}
