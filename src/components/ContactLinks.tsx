'use client'
import { useEffect, useRef } from 'react'

const LINKS = [
  {
    label: 'tewairama@pm.me\u00A0\u2197',
    href: 'mailto:tewairama@pm.me',
    sub: 'Email',
  },
  {
    label: 'Instagram\u00A0\u2197',
    href: 'https://instagram.com/tewairama.digital',
    sub: '@tewairama.digital',
  },
]

const PROXIMITY = 120

export default function ContactLinks() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      itemRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2)
        el.style.opacity = dist < PROXIMITY ? '1' : '0.25'
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section
      style={{
        position: 'fixed',
        right: '3rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        textAlign: 'right',
      }}
    >
      {LINKS.map(({ label, href, sub }, i) => (
        <div
          key={href}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          style={{
            opacity: 0.25,
            transition: 'opacity 0.4s ease',
          }}
        >
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              display: 'block',
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 400,
              fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
              lineHeight: 1.1,
              color: '#f5f5f5',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
          >
            {label}
          </a>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono), monospace',
              fontWeight: 300,
              fontSize: '0.62rem',
              letterSpacing: '0.06em',
              color: 'rgba(245,245,245,0.35)',
              marginTop: '0.4rem',
            }}
          >
            {sub}
          </p>
        </div>
      ))}
    </section>
  )
}
