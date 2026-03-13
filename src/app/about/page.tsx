'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './about.module.css'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPHS = [
  'Te Wairama Digital is a Christchurch-based creative agency founded by Ali Werahiko Te Wairama. We specialise in high-performance web experiences — the kind that require real code, real craft, and a point of view.',
  "Our name honours Mihipeka Te Wairama, a tupuna whose strength and identity runs through everything we make. Te Ao Māori isn't a visual theme for us. It's a way of working — relational, considered, built to last.",
  "We exist for clients who want something that can't be templated.",
]

const STATS = [
  'Est. 2025',
  'Ōtautahi, Aotearoa',
  'React · TypeScript · GSAP · Three.js',
  'Commissions open',
]

const HEADLINE_WORDS = 'Ko Te Wairama tōku ingoa.'.split(' ')

export default function AboutPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline — word by word on load
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll<HTMLElement>('.word')
        gsap.set(words, { y: 40, opacity: 0 })
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.3,
        })
      }

      // Subhead fade up on load
      if (subheadRef.current) {
        gsap.set(subheadRef.current, { y: 20, opacity: 0 })
        gsap.to(subheadRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.65,
        })
      }

      // Body paragraphs — scroll reveal with stagger
      paragraphRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { y: 20, opacity: 0 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: i * 0.2,
              ease: 'power2.out',
            })
          },
        })
      })

      // Stats — slide in from right on scroll
      statRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { x: 30, opacity: 0 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            gsap.to(el, {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.12,
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
      }}
    >
      <div className={styles.grid}>
        {/* Left column — manifesto */}
        <div>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
              lineHeight: 1.1,
              color: '#f5f5f5',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.3em',
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                className="word"
                style={{ display: 'inline-block' }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subheadRef}
            style={{
              fontFamily: 'var(--font-dm-mono), monospace',
              fontWeight: 300,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              color: 'rgba(245,245,245,0.45)',
              marginBottom: '3rem',
            }}
          >
            We build what others can&rsquo;t.
          </p>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}
          >
            {PARAGRAPHS.map((para, i) => (
              <p
                key={i}
                ref={(el) => {
                  paragraphRefs.current[i] = el
                }}
                style={{
                  fontFamily: 'var(--font-dm-mono), monospace',
                  fontWeight: 300,
                  fontSize: '0.75rem',
                  letterSpacing: '0.03em',
                  lineHeight: 1.95,
                  color: 'rgba(245,245,245,0.42)',
                  maxWidth: '38rem',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Right column — stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem',
            paddingTop: '0.4rem',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                statRefs.current[i] = el
              }}
              style={{
                fontFamily: 'var(--font-dm-mono), monospace',
                fontWeight: 300,
                fontSize: '0.68rem',
                letterSpacing: '0.07em',
                color: 'rgba(245,245,245,0.32)',
                textTransform: 'uppercase',
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
