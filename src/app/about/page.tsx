import SplitWords from '@/components/SplitWords'

const PARAGRAPHS = [
  'Te Wairama Digital is a Christchurch-based creative agency founded by Ali Werahiko Te Wairama Harrison. We specialise in high-performance web experiences, the kind that require real code, real craft, and a point of view.',
  "Every project is designed and hand-coded end to end. Layout, motion and build all come from the same hands. Te Ao Māori isn't a visual theme for us. It's a way of working that's relational, considered and built to last.",
  "We exist for clients who want something that can't be templated.",
]

const STATS = [
  'Est. 2025',
  'Ōtautahi, Aotearoa',
  'React · TypeScript · GSAP · Three.js',
  'Commissions open',
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
          We build what others can&rsquo;t.
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
