'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: "What's your tech stack?",
    a: 'React, Next.js, TypeScript, GSAP for animation, Three.js and custom GLSL shaders for WebGL work. Deployed on Vercel.',
  },
  {
    q: 'Do you work with no-code platforms?',
    a: "No. Everything is hand-coded. That's the point — the work we do can't be replicated in Webflow or Framer.",
  },
  {
    q: 'Can I use your code or copy your site?',
    a: "You're welcome to take inspiration. Taking source code is not okay — it's how you stay average.",
  },
  {
    q: 'How do engagements work?',
    a: "Discovery first. If there's a fit, we scope the project and agree on a fixed price. No hourly billing, no surprises.",
  },
  {
    q: 'Where are you based?',
    a: 'Ōtautahi Christchurch, Aotearoa New Zealand. We work remotely with clients across NZ and internationally.',
  },
  {
    q: 'What makes Te Wairama Digital different?',
    a: 'Technical depth and cultural grounding. We bring Te Ao Māori values into digital work — not as decoration, but as a design philosophy. The ancestor the agency is named after, Mihipeka Te Wairama, guides that approach.',
  },
]

export default function FAQPage() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el) => {
        if (!el) return
        const question = el.querySelector<HTMLElement>('.faq-q')
        const answer = el.querySelector<HTMLElement>('.faq-a')
        if (!question || !answer) return

        gsap.set(question, { x: -30, opacity: 0 })
        gsap.set(answer, { y: 15, opacity: 0 })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            gsap.to(question, {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
            })
            gsap.to(answer, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.15,
              ease: 'power2.out',
            })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      style={{
        paddingTop: '6rem',
        paddingBottom: '8rem',
        paddingLeft: 'calc(var(--gutter) + 22rem)',
        paddingRight: 'calc(var(--gutter) * 2)',
        maxWidth: '68rem',
      }}
    >
      {FAQS.map(({ q, a }, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el
          }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p
            className="faq-q"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 400,
              fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
              lineHeight: 1.15,
              color: '#f5f5f5',
              letterSpacing: '-0.01em',
              marginBottom: '0.8rem',
            }}
          >
            {q}
          </p>
          <p
            className="faq-a"
            style={{
              fontFamily: 'var(--font-dm-mono), monospace',
              fontWeight: 300,
              fontSize: '0.73rem',
              letterSpacing: '0.03em',
              lineHeight: 1.9,
              color: 'rgba(245,245,245,0.42)',
              maxWidth: '38rem',
            }}
          >
            {a}
          </p>
        </div>
      ))}
    </section>
  )
}
