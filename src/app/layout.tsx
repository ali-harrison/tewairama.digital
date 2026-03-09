import type { Metadata } from 'next'
import { Playfair_Display, DM_Mono } from 'next/font/google'
import './globals.css'
import BodyLayout from '@/components/BodyLayout'

// Lightest available weight for Playfair Display is 400
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Te Wairama Digital',
  description:
    'Creative web developer based in Ōtautahi, Aotearoa. React, Next.js, motion design.',
  metadataBase: new URL('https://tewairama.digital'),
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
    <html lang="en" className={`${playfair.variable} ${dmMono.variable}`}>
      <body>
        <BodyLayout>{children}</BodyLayout>
      </body>
    </html>
  )
}
