'use client'
import { useEffect, useRef } from 'react'

const CLUSTER_0 = [
  { label: 'github.com/tewairama ↗', href: 'https://github.com/ali-harrison' },
  { label: 'tewairama.digital ↗', href: 'https://tewairama.digital' },
]

const CLUSTER_1 = [
  { label: 'Instagram ↗', href: 'https://instagram.com/tewairama.digital/' },
  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/te-wairama' },
  { label: 'Email ↗', href: 'mailto:tewairama@pm.me' },
]

const LINK_STYLE: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-dm-mono), monospace',
  fontWeight: 300,
  fontSize: '0.72rem',
  lineHeight: 2,
  color: '#f5f5f5',
  opacity: 0.25,
  textDecoration: 'none',
  transition: 'opacity 0.4s ease',
}

const PROXIMITY = 120

export default function InfoPage() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      linkRefs.current.forEach((el) => {
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
    <>
      {/* Cluster 1 — top-right */}
      <div
        style={{
          position: 'fixed',
          top: '3rem',
          right: '3rem',
          textAlign: 'right',
        }}
      >
        {CLUSTER_0.map(({ label, href }, i) => (
          <a
            key={href}
            ref={(el) => {
              linkRefs.current[i] = el
            }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={LINK_STYLE}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Cluster 2 — centre */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        {CLUSTER_1.map(({ label, href }, i) => (
          <a
            key={href}
            ref={(el) => {
              linkRefs.current[CLUSTER_0.length + i] = el
            }}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={LINK_STYLE}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
