import ProjectList from '@/components/ProjectList'
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
      <ProjectList />
    </>
  )
}
