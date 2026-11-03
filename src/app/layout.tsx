import type { Metadata } from 'next'
import { Inter_Tight, Fragment_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import GridLines from '@/components/GridLines'
import Motion from '@/components/Motion'

// latin-ext covers macrons (ā, ō)
const interTight = Inter_Tight({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-fragment-mono',
  display: 'swap',
})

// Adds html.motion before first paint so reveal start-states never flash.
// Skipped for reduced motion; removed again if nothing has revealed in time,
// so the page can never get stuck hidden.
const MOTION_SCRIPT = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!document.querySelector('.is-in'))d.classList.remove('motion')},3000)})()`

export const metadata: Metadata = {
  title: 'Te Wairama Digital',
  description:
    'Creative web developer based in Ōtautahi, Aotearoa. React, Next.js, motion design.',
  metadataBase: new URL('https://tewairama.digital'),
  authors: [{ name: 'Ali Werahiko Te Wairama Harrison', url: 'https://tewairama.digital' }],
  creator: 'Ali Werahiko Te Wairama Harrison',
  // Share image comes from app/opengraph-image.png
  openGraph: {
    title: 'Te Wairama Digital',
    description:
      'Creative web developer based in Ōtautahi, Aotearoa. React, Next.js, motion design.',
    url: 'https://tewairama.digital',
    siteName: 'Te Wairama Digital',
    locale: 'en_NZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Te Wairama Digital',
    description:
      'Creative web developer based in Ōtautahi, Aotearoa. React, Next.js, motion design.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body>
        <GridLines />
        <Nav />
        <main>{children}</main>
        <footer className="site-footer grid rule-top" data-reveal>
          <p className="site-footer__copy mono muted fade">
            &copy; Te Wairama Digital 2026
          </p>
        </footer>
        <Motion />
      </body>
    </html>
  )
}
