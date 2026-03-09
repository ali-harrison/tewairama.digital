'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface IntroProps {
  onPūhoroReveal: () => void
  onComplete: () => void
}

const WORDS = [
  { text: 'Te', fontWeight: 300, letterSpacing: undefined },
  { text: 'Wairama', fontWeight: 500, letterSpacing: undefined },
  { text: 'Digital', fontWeight: 200, letterSpacing: '0.08em' },
]

export default function Intro({ onPūhoroReveal, onComplete }: IntroProps) {
  const [done, setDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[]
    if (!container || words.length === 0) return

    const tl = gsap.timeline()

    // t=0: words stagger in
    tl.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.18,
      ease: 'power2.out',
    })
      // t=1.2: words fade out together
      .to(
        words,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        },
        1.2,
      )
      // t=1.4: trigger pūhoro bloom in shader
      .call(onPūhoroReveal, [], 1.4)
      // t=1.6: overlay fades out
      .to(
        container,
        {
          opacity: 0,
          duration: 0.5,
        },
        1.6,
      )
      // t=1.8: signal layout, unmount self
      .call(
        () => {
          onComplete()
          setDone(true)
        },
        [],
        1.8,
      )

    return () => {
      tl.kill()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
      }}
    >
      {WORDS.map(({ text, fontWeight, letterSpacing }, i) => (
        <span
          key={text}
          ref={(el) => {
            wordRefs.current[i] = el
          }}
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight,
            fontSize: '3.5rem',
            color: '#f5f5f5',
            opacity: 0,
            ...(letterSpacing ? { letterSpacing } : {}),
          }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}
