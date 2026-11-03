import type { MetadataRoute } from 'next'

// Served at /sitemap.xml, which public/robots.txt points to
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/work', '/about', '/faq', '/info'].map((path) => ({
    url: `https://tewairama.digital${path}`,
  }))
}
