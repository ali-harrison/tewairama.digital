import ProjectList from '@/components/ProjectList'
import SplitWords from '@/components/SplitWords'
import { PROJECTS } from '@/content/projects'
import { pad } from '@/lib/pad'

const STATEMENT =
  'Based in Ōtautahi, Aotearoa. Full-stack web developer specialising in React, Next.js, and motion design. Building digital experiences that integrate Te Ao Māori values. Available for projects.'

export default function Home() {
  return (
    <>
      <section className="hero grid" data-reveal>
        <SplitWords as="h1" text={STATEMENT} className="hero__statement" />
        <a
          href="#work"
          className="hero__cue mono muted fade"
          style={{ '--i': 8 } as React.CSSProperties}
        >
          <span className="roll">
            <span>Selected work ↓</span>
            <span aria-hidden="true">Selected work ↓</span>
          </span>
        </a>
      </section>

      <section id="work" className="section">
        <div className="section__head grid" data-reveal>
          <h2 className="section__title mono muted fade">Selected work</h2>
          <p
            className="section__count mono muted fade"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            ({pad(PROJECTS.length)})
          </p>
        </div>
        <ProjectList />
      </section>
    </>
  )
}
