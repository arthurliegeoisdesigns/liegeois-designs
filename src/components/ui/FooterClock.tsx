'use client'

import { useEffect, useState } from 'react'

/**
 * FooterClock — live studio time for the destination footer.
 */
const TZ = 'America/New_York'
const CITY = 'Montclair, NJ'

export default function FooterClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: TZ,
        }).format(new Date()),
      )
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  if (!time) return <span className="footer-clock">{CITY}</span>
  return (
    <span className="footer-clock">
      {CITY} — {time}
    </span>
  )
}
