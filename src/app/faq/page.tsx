import SplitWords from '@/components/SplitWords'
import { pad } from '@/lib/pad'

const FAQS = [
  {
    q: "What's your tech stack?",
    a: 'React, Next.js, TypeScript, GSAP for animation, Three.js and custom GLSL shaders for WebGL work. Deployed on Vercel.',
  },
  {
    q: 'Do you work with no-code platforms?',
    a: "No. Everything is hand-coded. That's the point. The work we do can't be replicated in Webflow or Framer.",
  },
  {
    q: 'Can I use your code or copy your site?',
    a: "You're welcome to take inspiration. Taking source code is not okay. It's how you stay average.",
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
    a: 'Technical depth and cultural grounding. We bring Te Ao Māori values into digital work, not as decoration but as a design philosophy.',
  },
]

export default function FAQPage() {
  return (
    <>
      <div className="page-head grid" data-reveal>
        <SplitWords as="h1" text="FAQ" className="page-head__title" />
        <p className="page-head__meta mono muted fade">({pad(FAQS.length)})</p>
      </div>

      <ol className="faq-list rows">
        {FAQS.map(({ q, a }, i) => (
          <li key={q} className="faq-item grid" data-reveal>
            <span className="faq-item__index mono muted fade">{pad(i + 1)}</span>
            <SplitWords as="h2" text={q} className="faq-item__q" />
            <p
              className="faq-item__a fade"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {a}
            </p>
          </li>
        ))}
      </ol>
    </>
  )
}
