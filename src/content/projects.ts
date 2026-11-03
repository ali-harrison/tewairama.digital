import type { StaticImageData } from 'next/image'
import hinewaaImage from './work/hinewaa.jpg'
import ramaImage from './work/rama.jpg'
import sixVoicesImage from './work/6v1d.jpg'

export type Project = {
  name: string
  role: string
  year: string
  href: string
  summary: string
  stack: string[]
  image: StaticImageData // homepage screenshot, 1440×900 at 1.5x
}

export const PROJECTS: Project[] = [
  {
    name: 'Hinewaa Ltd',
    role: 'Design & Dev',
    year: '2025',
    href: 'https://hinewaa.com',
    summary:
      'Website for a Māori-owned strategy and governance practice working across climate, taiao and Indigenous economies. Bilingual navigation, tukutuku-inspired imagery, scroll-driven motion and a contact form backed by a serverless email function.',
    stack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Resend'],
    image: hinewaaImage,
  },
  {
    name: 'RAMA',
    role: 'Design & Dev (Concept)',
    year: '2026',
    href: 'https://rama-nu.vercel.app',
    summary:
      'Concept site for a clothing label built on raw construction and exposed seams. The page moves through a single day of light, from first light to after dark, with the sky, palette and timestamps shifting as you scroll.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis'],
    image: ramaImage,
  },
  {
    name: 'Six Voices. One Direction',
    role: 'Design & Dev (Concept)',
    year: '2026',
    href: 'https://6v1d.vercel.app/',
    summary:
      'Concept page on six people across music, fashion, performance, activism and storytelling, and the principles drawn from their work. A Three.js dither shader logo, a pixel-dither visual system and an optional listen-along sound layer.',
    stack: ['Next.js', 'TypeScript', 'Three.js', 'GSAP', 'Lenis', 'Howler'],
    image: sixVoicesImage,
  },
]
