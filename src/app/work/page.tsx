import Image from 'next/image'
import SplitWords from '@/components/SplitWords'
import { PROJECTS } from '@/content/projects'
import { pad } from '@/lib/pad'

export default function WorkPage() {
  return (
    <>
      <div className="page-head grid" data-reveal>
        <SplitWords as="h1" text="Work" className="page-head__title" />
        <p className="page-head__meta mono muted fade">({pad(PROJECTS.length)})</p>
      </div>

      <ol className="case-list rows">
        {PROJECTS.map(({ name, role, date, href, repo, summary, stack, image }, i) => (
          <li key={name} className="case grid" data-reveal>
            <span className="case__index mono muted fade">{pad(i + 1)}</span>
            <SplitWords as="h2" text={name} className="case__name" />
            <p
              className="case__meta mono muted fade"
              style={{ '--i': 1 } as React.CSSProperties}
            >
              {role} &middot; {date}
            </p>

            {/* Same destination as the links below, so kept out of the tab order */}
            <a
              href={href ?? repo}
              target="_blank"
              rel="noopener noreferrer"
              className="case__media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={image}
                alt=""
                sizes="(max-width: 900px) 100vw, 85vw"
                placeholder="blur"
              />
            </a>

            <p
              className="case__summary fade"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {summary}
            </p>
            <ul
              className="case__stack mono muted fade"
              style={{ '--i': 3 } as React.CSSProperties}
              aria-label="Built with"
            >
              {stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <div
              className="case__links mono fade"
              style={{ '--i': 4 } as React.CSSProperties}
            >
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case__link"
                  aria-label={`Visit the ${name} site`}
                >
                  <span className="roll">
                    <span>Visit site ↗</span>
                    <span aria-hidden="true">Visit site ↗</span>
                  </span>
                </a>
              )}
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="case__link"
                aria-label={`${name} code on GitHub`}
              >
                <span className="roll">
                  <span>Code ↗</span>
                  <span aria-hidden="true">Code ↗</span>
                </span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
