import SplitWords from '@/components/SplitWords'
import { pad } from '@/lib/pad'

const FAQS = [
  {
    q: 'Are you open to full-time roles?',
    a: "Yes. I'm looking for a developer role on a product or creative team, and I'm open to contract work too.",
  },
  {
    q: 'Where are you based?',
    a: "Ōtautahi Christchurch, Aotearoa New Zealand. I'm open to remote roles anywhere in NZ and hybrid in Christchurch, and I work with freelance clients across NZ and overseas.",
  },
  {
    q: "What's your tech stack?",
    a: 'React, Next.js and TypeScript on the front end, Supabase, Node.js and Stripe behind it, and GSAP, Three.js and GLSL shaders for motion and 3D. I deploy on Vercel.',
  },
  {
    q: 'Can I see your code?',
    a: 'Yes. Most of my work is on GitHub, and each project on the Work page links to its code.',
  },
  {
    q: 'Do you work with no-code platforms?',
    a: "I hand-code my own projects, because the work I like doing needs it. In a team I'm happy working with whatever tools you use.",
  },
  {
    q: 'How do freelance projects work?',
    a: "We start with a chat. If it's a fit, I scope the project and we agree on a fixed price, so there are no surprises.",
  },
  {
    q: 'What makes your work different?',
    a: 'Technical depth and cultural grounding. I bring Te Ao Māori values into digital work, not as decoration but as a design philosophy.',
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
