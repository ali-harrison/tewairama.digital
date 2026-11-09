import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SplitWords from '@/components/SplitWords'
import { PROJECTS } from '@/content/projects'
import { pad } from '@/lib/pad'

type Props = { params: { slug: string } }

const STUDIES = PROJECTS.filter((p) => p.caseStudy)

const findProject = (slug: string) =>
  STUDIES.find((p) => p.caseStudy?.slug === slug)

export const dynamicParams = false

export function generateStaticParams() {
  return STUDIES.map((p) => ({ slug: p.caseStudy!.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const project = findProject(params.slug)
  if (!project?.caseStudy) return {}
  const title = `${project.name} · Te Wairama Digital`
  return {
    title,
    description: project.caseStudy.intro,
    openGraph: { title, description: project.caseStudy.intro },
  }
}

export default function CaseStudyPage({ params }: Props) {
  const project = findProject(params.slug)
  if (!project?.caseStudy) notFound()

  const { name, role, date, href, repo, stack, image, caseStudy } = project
  const next = STUDIES[(STUDIES.indexOf(project) + 1) % STUDIES.length]

  return (
    <article>
      <div className="page-head grid" data-reveal>
        <SplitWords
          as="h1"
          text={name}
          className="page-head__title page-head__title--long"
        />
        <p className="page-head__meta mono muted fade">
          {role} &middot; {date}
        </p>
      </div>

      <section className="study-intro grid rule-top" data-reveal>
        <p className="study-intro__lead fade">{caseStudy.intro}</p>
        <ul
          className="study-intro__facts mono muted"
          aria-label="Built with"
        >
          {stack.map((tool, i) => (
            <li
              key={tool}
              className="fade"
              style={{ '--i': i + 1 } as React.CSSProperties}
            >
              {tool}
            </li>
          ))}
        </ul>
        <div
          className="study-intro__links mono fade"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" className="case__link">
              Visit site ↗
            </a>
          )}
          <a href={repo} target="_blank" rel="noopener noreferrer" className="case__link">
            Code ↗
          </a>
        </div>
      </section>

      <div className="study-hero grid" data-reveal>
        <div className="case__media study-hero__media">
          <Image
            src={image}
            alt={`${name}, ${role.toLowerCase()}`}
            sizes="(max-width: 900px) 100vw, 92vw"
            placeholder="blur"
            priority
          />
        </div>
      </div>

      <ol className="rows">
        {caseStudy.sections.map(({ heading, body, figures }, i) => (
          <li key={heading} className="study-section grid" data-reveal>
            <span className="study-section__index mono muted fade">{pad(i + 1)}</span>
            <SplitWords as="h2" text={heading} className="study-section__heading" />
            <div className="study-section__body">
              {body.map((para, j) => (
                <p
                  key={j}
                  className="fade"
                  style={{ '--i': j + 1 } as React.CSSProperties}
                >
                  {para}
                </p>
              ))}
            </div>
            {figures && (
              <div className="study-section__figures">
                {figures.map(({ image: src, alt, caption, narrow }) => (
                  <figure
                    key={alt}
                    className={`study-figure${narrow ? ' study-figure--narrow' : ''}`}
                  >
                    <div className="case__media study-figure__media">
                      <Image
                        src={src}
                        alt={alt}
                        sizes={narrow ? '(max-width: 900px) 50vw, 20vw' : '(max-width: 900px) 100vw, 75vw'}
                        placeholder="blur"
                      />
                    </div>
                    {caption && (
                      <figcaption className="mono muted">{caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      {next !== project && (
        <nav className="study-next grid rule-top" aria-label="Next case study" data-reveal>
          <span className="study-next__label mono muted fade">Next case study</span>
          <Link href={`/work/${next.caseStudy!.slug}`} className="study-next__link">
            <SplitWords text={`${next.name} →`} />
          </Link>
        </nav>
      )}
    </article>
  )
}
