import SplitWords from '@/components/SplitWords'

const PARAGRAPHS = [
  "I'm Ali Werahiko Te Wairama Harrison, a full-stack web developer in Ōtautahi. I trained at Dev Academy Aotearoa in 2024 and have run Te Wairama Digital since 2025, designing and building sites and platforms that need real code, real craft and a point of view.",
  "I design and hand-code every project end to end, from layout to motion to build. Te Ao Māori isn't a visual theme for me. It's a way of working that's relational, considered and built to last.",
  "I'm looking for a developer role on a product or creative team, and I still take on freelance projects.",
]

const STATS = [
  'Ōtautahi, Aotearoa',
  'Te Wairama Digital, since 2025',
  'Dev Academy Aotearoa, 2024',
  'React · Next.js · Three.js · Supabase',
  'Open to work',
]

export default function AboutPage() {
  return (
    <>
      <div className="page-head grid" data-reveal>
        <SplitWords
          as="h1"
          text="Ko Te Wairama tōku ingoa."
          className="page-head__title page-head__title--long"
        />
        <p className="page-head__meta mono muted fade">
          Design and code from the same hands.
        </p>
      </div>

      <section className="about grid rule-top" data-reveal>
        <div className="about__body">
          {PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className="fade"
              style={{ '--i': i } as React.CSSProperties}
            >
              {para}
            </p>
          ))}
        </div>

        <ul className="about__facts mono muted">
          {STATS.map((stat, i) => (
            <li
              key={stat}
              className="fade"
              style={{ '--i': i + 1 } as React.CSSProperties}
            >
              {stat}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
