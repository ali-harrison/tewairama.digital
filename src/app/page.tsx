import ProjectList from '@/components/ProjectList'
import SplitWords from '@/components/SplitWords'
import { PROJECTS } from '@/content/projects'
import { pad } from '@/lib/pad'

const STATEMENT =
  "I'm Ali, a full-stack developer in Ōtautahi, Aotearoa. I build with React, Next.js and Three.js, led by motion and grounded in Te Ao Māori values. Open to roles and freelance work."

export default function Home() {
  return (
    <>
      <section className="hero grid" data-reveal>
        <SplitWords as="h1" text={STATEMENT} className="hero__statement" />
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
