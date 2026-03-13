'use client'
import { useRef } from 'react'

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

export default function WorkPage() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const setOpacities = (activeIndex: number | null) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      if (activeIndex === null) {
        el.style.opacity = '0.4'
      } else {
        el.style.opacity = i === activeIndex ? '1' : '0.15'
      }
    })
  }

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
          ref={(el) => { itemRefs.current[i] = el }}
          onMouseEnter={() => setOpacities(i)}
          onMouseLeave={() => setOpacities(null)}
          style={{
            opacity: 0.4,
            transition: 'opacity 0.35s ease',
          }}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
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
