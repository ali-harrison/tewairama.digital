import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/content/projects'

// Served at /sitemap.xml, which public/robots.txt points to
export default function sitemap(): MetadataRoute.Sitemap {
  const studies = PROJECTS.flatMap((p) =>
    p.caseStudy ? [`/work/${p.caseStudy.slug}`] : [],
  )
  return ['', '/work', ...studies, '/about', '/faq', '/info'].map((path) => ({
    url: `https://tewairama.digital${path}`,
  }))
}
