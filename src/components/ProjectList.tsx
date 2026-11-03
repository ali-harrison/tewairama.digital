import { PROJECTS } from '@/content/projects'
import { pad } from '@/lib/pad'
import SplitWords from '@/components/SplitWords'
import ProjectPreview from '@/components/ProjectPreview'

export default function ProjectList() {
  return (
    <>
      <ol className="project-list rows">
        {PROJECTS.map(({ name, role, year, href }, i) => (
          <li key={name} data-reveal>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row grid"
              data-preview={i}
            >
              <span className="project-row__index mono muted fade">{pad(i + 1)}</span>
              <SplitWords text={name} className="project-row__name" />
              <span
                className="project-row__role mono muted fade"
                style={{ '--i': 1 } as React.CSSProperties}
              >
                {role}
              </span>
              <span
                className="project-row__year mono muted fade"
                style={{ '--i': 2 } as React.CSSProperties}
              >
                {year}
              </span>
              <span
                className="project-row__arrow fade"
                style={{ '--i': 3 } as React.CSSProperties}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ol>
      <ProjectPreview />
    </>
  )
}
