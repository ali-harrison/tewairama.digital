'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/info' },
]

function getNZTime() {
  return new Date().toLocaleTimeString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export default function Nav() {
  const pathname = usePathname()
  const timeRef = useRef<HTMLSpanElement>(null)

  // Live NZT clock — direct DOM update, no re-renders
  useEffect(() => {
    if (timeRef.current) timeRef.current.textContent = getNZTime()
    const id = setInterval(() => {
      if (timeRef.current) timeRef.current.textContent = getNZTime()
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="site-header grid">
      <Link href="/" className="site-header__name">
        Te Wairama Digital
      </Link>
      <p className="site-header__role mono muted">
        Creative Web Developer / Aotearoa
      </p>

      <nav aria-label="Main" className="site-header__nav">
        <ul>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="nav-link mono"
                aria-current={pathname === href ? 'page' : undefined}
              >
                <span className="roll">
                  <span>{label}</span>
                  <span aria-hidden="true">{label}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/Ali_Harrison_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link mono"
              aria-label="CV (PDF)"
            >
              <span className="roll">
                <span>CV ↗</span>
                <span aria-hidden="true">CV ↗</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <p className="site-header__status mono muted">
        <span ref={timeRef} /> NZT / Aotearoa /{' '}
        <span className="status-dot" aria-hidden="true" />
        Open to work
      </p>
    </header>
  )
}
