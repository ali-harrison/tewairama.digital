'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Info', href: '/info' },
  { label: 'Contact', href: '/contact' },
]

function getNZTime() {
  return new Date().toLocaleTimeString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-dm-mono), monospace',
  fontWeight: 300,
  fontSize: '0.65rem',
  letterSpacing: '0.04em',
  color: 'rgba(245,245,245,0.3)',
}

export default function Nav() {
  const pathname = usePathname()
  const nameRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)

  // Live NZT clock — direct DOM update, no re-renders
  useEffect(() => {
    if (timeRef.current) timeRef.current.textContent = getNZTime()
    const id = setInterval(() => {
      if (timeRef.current) timeRef.current.textContent = getNZTime()
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // GSAP entry animation
  useEffect(() => {
    const name = nameRef.current
    const links = linksRef.current
    if (!name || !links) return

    const linkItems = links.querySelectorAll('li')

    const ctx = gsap.context(() => {
      gsap.set(name, { opacity: 0, y: 20 })
      gsap.set(linkItems, { opacity: 0, y: 10 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.to(name, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }).to(
        linkItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'grid',
        gridTemplateColumns: 'var(--gutter) 1fr var(--gutter)',
        gridTemplateRows: 'var(--gutter) 1fr var(--gutter)',
        pointerEvents: 'none',
      }}
    >
      {/* ── Top-left: name + tagline + nav ── */}
      <div
        style={{
          gridColumn: 2,
          gridRow: 2,
          alignSelf: 'start',
          justifySelf: 'start',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div ref={nameRef}>
          <Link
            href="/"
            style={{
              display: 'block',
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 400,
              fontSize: '2.6rem',
              lineHeight: 1.1,
              color: '#f5f5f5',
              letterSpacing: '-0.01em',
            }}
          >
            Te Wairama Digital
          </Link>

          <p
            style={{
              fontFamily: 'var(--font-dm-mono), monospace',
              fontWeight: 300,
              fontSize: '0.7rem',
              letterSpacing: '0.04em',
              color: 'rgba(245,245,245,0.45)',
              marginTop: '0.35rem',
            }}
          >
            Creative Web Developer &mdash; Aotearoa
          </p>
        </div>

        <ul
          ref={linksRef}
          style={{
            listStyle: 'none',
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <li
                key={href}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-dm-mono), monospace',
                    fontSize: '0.75rem',
                    color: '#f5f5f5',
                    opacity: isActive ? 0.9 : 0,
                    width: '0.75rem',
                    display: 'inline-block',
                    transition: 'opacity 0.3s ease',
                    userSelect: 'none',
                  }}
                >
                  &bull;
                </span>

                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-dm-mono), monospace',
                    fontWeight: 400,
                    fontSize: '0.75rem',
                    letterSpacing: '0.04em',
                    color: '#f5f5f5',
                    opacity: isActive ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
                  }
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLAnchorElement).style.opacity = '0.5'
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── Top-right: time / location / status ── */}
      <div
        style={{
          gridColumn: 2,
          gridRow: 2,
          alignSelf: 'start',
          justifySelf: 'end',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          ...MONO,
        }}
      >
        <span ref={timeRef} /> NZT
        <span style={{ opacity: 0.4 }}>/</span>
        Aotearoa
        <span style={{ opacity: 0.4 }}>/</span>
        Commissions open
      </div>

      {/* ── Bottom-left: rotated label + copyright ── */}
      <div
        style={{
          gridColumn: 2,
          gridRow: 2,
          alignSelf: 'end',
          justifySelf: 'start',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.2rem',
        }}
      >
        <div style={MONO}>
          &copy; Te Wairama Digital 2026
        </div>
      </div>
    </div>
  )
}
