'use client'

import { useEffect } from 'react'

/**
 * FontToggle — Phase 1 display-font A/B switch (temporary, dev/preview only).
 *
 * Compares the two PP trial display faces in situ:
 *   ?font=migra      → PP Migra (default)
 *   ?font=editorial  → PP Editorial New
 *
 * Press "F" anywhere (outside form fields) to flip. Choice persists in
 * localStorage. Remove this component once the winner is licensed.
 */
const KEY = 'ld-display-font'
const FONTS = ['migra', 'editorial'] as const

function apply(font: string) {
  document.documentElement.dataset.font = font
}

export default function FontToggle() {
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('font')
    const stored = window.localStorage.getItem(KEY)
    const initial =
      param && FONTS.includes(param as (typeof FONTS)[number])
        ? param
        : stored && FONTS.includes(stored as (typeof FONTS)[number])
          ? stored
          : 'migra'
    apply(initial)
    if (param) window.localStorage.setItem(KEY, initial)

    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return
      if (e.key.toLowerCase() !== 'f' || e.metaKey || e.ctrlKey || e.altKey) return
      const current = document.documentElement.dataset.font ?? 'migra'
      const next = current === 'migra' ? 'editorial' : 'migra'
      apply(next)
      window.localStorage.setItem(KEY, next)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
