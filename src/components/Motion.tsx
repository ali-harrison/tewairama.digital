'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const reveal = (el: HTMLElement, stagger: number, delay?: string) => {
  el.style.setProperty('--stagger', String(stagger))
  if (delay) el.style.setProperty('--delay', delay)
  el.classList.add('is-in')
}

// Adds .is-in to [data-reveal] elements: straight away for anything already on
// screen, then via IntersectionObserver as the rest scroll into view. Elements
// revealed together get an increasing --stagger so they cascade. On first load
// the on-screen batch also waits (--delay) for the grid lines to draw.
// Re-runs on route change so each new page reveals itself.
export default function Motion() {
  const pathname = usePathname()
  const introDone = useRef(false)

  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return

    const observer = new IntersectionObserver((entries) => {
      let stagger = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target as HTMLElement, stagger++)
        observer.unobserve(entry.target)
      }
    })

    const delay = introDone.current ? undefined : '0.4s'
    let stagger = 0
    document
      .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
      .forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect()
        if (top < window.innerHeight && bottom > 0) reveal(el, stagger++, delay)
        else observer.observe(el)
      })
    introDone.current = true

    return () => observer.disconnect()
  }, [pathname])

  return null
}
