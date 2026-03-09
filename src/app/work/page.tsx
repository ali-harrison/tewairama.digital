'use client'
import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    name: 'Hinewaa Ltd',
    role: 'Design & Dev',
    year: '2025',
    href: 'https://hinewaa.com',
  },
  {
    name: 'RAMA',
    role: 'Design & Dev (Concept)',
    year: '2026',
    href: 'https://rama-nu.vercel.app',
  },
  {
    name: 'Six Voices. One Direction',
    role: 'Design & Dev (Concept)',
    year: '2026',
    href: 'https://6v1d.vercel.app/',
  },
]

const PROXIMITY = 120

export default function WorkPage() {
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
        gap: '3rem',
        textAlign: 'right',
      }}
    >
      {PROJECTS.map(({ name, role, year, href }, i) => (
        <div
          key={name}
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
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontWeight: 400,
                fontSize: '4vw',
                lineHeight: 1.05,
                color: '#f5f5f5',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </p>
          </a>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono), monospace',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              color: 'rgba(245,245,245,0.4)',
              marginTop: '0.45rem',
            }}
          >
            {role} &middot; {year}
          </p>
        </div>
      ))}
    </section>
  )
}
