import SplitWords from '@/components/SplitWords'

const PARAGRAPHS = [
  "I'm Ali Werahiko Te Wairama Harrison, a web designer in Ōtautahi. I trained as a developer at Dev Academy Aotearoa in 2024 and have run Te Wairama Digital since 2025, so the sites I design are ones I already know how to build.",
  "I design and hand-code every project end to end, from layout to motion to build. Te Ao Māori isn't a visual theme for me. It's a way of working that's relational, considered and built to last.",
  "I'm looking for a design role on a product or creative team, somewhere knowing the code makes the design better. I still take on freelance projects.",
]

const STATS = [
  'Ōtautahi, Aotearoa',
  'Te Wairama Digital, since 2025',
  'Dev Academy Aotearoa, 2024',
  'Design · Motion · Front-end',
  'React · Next.js · Three.js',
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
