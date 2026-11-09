import type { StaticImageData } from 'next/image'
import hinewaaImage from './work/hinewaa.jpg'
import koriImage from './work/kori.png'
import awaImage from './work/awa.png'
import crookImage from './work/crook.jpg'
import ramaImage from './work/rama.jpg'
import sixVoicesImage from './work/6v1d.jpg'
import koriPaymentImage from './work/kori/record-payment.png'
import koriBillingImage from './work/kori/billing.png'
import koriTemplatesImage from './work/kori/templates.png'
import koriPhoneImage from './work/kori/phone-overview.png'

export type CaseFigure = {
  image: StaticImageData
  alt: string
  caption?: string
  narrow?: boolean // phone screenshots sit at half width
}

export type CaseSection = {
  heading: string
  body: string[]
  figures?: CaseFigure[]
}

export type CaseStudy = {
  slug: string // served at /work/[slug]
  intro: string
  sections: CaseSection[]
}

export type Project = {
  name: string
  role: string
  date: string // short month and year, e.g. Jun 2025
  href?: string // live site; projects without a public one link to the repo
  repo: string
  summary: string
  stack: string[]
  image: StaticImageData // shown at 16:10
  caseStudy?: CaseStudy
}

export const PROJECTS: Project[] = [
  {
    name: 'Hinewaa Ltd',
    role: 'Design & Dev',
    date: 'Jun 2025',
    href: 'https://hinewaa.com',
    repo: 'https://github.com/ali-harrison/hinewaa-website',
    summary:
      'Website for a Māori-owned strategy and governance practice working across climate, taiao and Indigenous economies. Bilingual navigation, tukutuku-inspired imagery, scroll-driven motion and a contact form backed by a serverless email function.',
    stack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Resend'],
    image: hinewaaImage,
    // DRAFT from the repo README and code. Ali to check every line.
    caseStudy: {
      slug: 'hinewaa',
      intro:
        'Hinewaa Ltd is a Māori-owned strategy and governance practice. Their work helps organisations bring mātauranga Māori, science and commercial realities together, so the site had to read as serious advice and still be unmistakably Māori.',
      sections: [
        {
          heading: 'Te reo leads',
          body: [
            'Every heading leads with te reo Māori in Kāi Tahu dialect, with the English as a small label underneath. It puts the language first without leaving anyone out.',
            'In the navigation the te reo rolls up letter by letter on hover and the English rises into its place. Both labels share one grid cell, so the link is always as wide as the longer one and nothing around it shifts.',
          ],
        },
        {
          heading: 'A palette from kōwhaiwhai',
          body: [
            'The colours are muka, pango and kōkōwai: flax cream, black and red ochre. Kōkōwai is used sparingly, so when it appears it means something.',
            'The values climb the page as a poutama that draws itself as you scroll. The same step pattern runs along the top of the footer, and the cursor is a poutama triangle.',
          ],
        },
        {
          heading: 'Photos as tukutuku',
          body: [
            'Instead of dropping in stock photos, I drew each one as a tukutuku panel on a canvas: vertical reeds, horizontal laths, and cross-stitches whose weight follows the brightness of the photo.',
            'The rows weave in from the bottom the first time a panel scrolls into view. Water ripples while it is on screen, and with a mouse a soft lens follows the cursor and lifts the stitches to show the photo underneath.',
          ],
        },
        {
          heading: 'The build',
          body: [
            'React, TypeScript and Vite, with GSAP for scroll motion. Each animation is switched on with a data attribute on the markup, so the content stays plain and the motion lives in one file. All of it is off for anyone who prefers reduced motion.',
            'The contact form posts to a serverless function on Vercel that sends through Resend, so there is no third-party form service in between.',
          ],
        },
      ],
    },
  },
  {
    name: 'kori/os',
    role: 'Design & Dev (Product demo)',
    date: 'Jan 2026',
    href: 'https://kori-demo.vercel.app',
    repo: 'https://github.com/ali-harrison/KORI',
    summary:
      "Gym management app for New Zealand gyms: members, plans, direct debit, contracts and overdue reminders on one ledger. Billing runs on signed GoCardless webhooks, and the public demo replays each visitor's changes from a cookie, so it needs no database.",
    stack: ['Next.js', 'TypeScript', 'Supabase', 'GoCardless', 'Vitest'],
    image: koriImage,
    // DRAFT from the repo README and DEMO.md. Ali to check every line.
    caseStudy: {
      slug: 'kori-os',
      intro:
        "kori/os is gym management for small New Zealand gyms. I designed it around the three things an owner actually asks: who hasn't paid, what's coming in this week, and can I trust these numbers.",
      sections: [
        {
          heading: 'Answer the question first',
          body: [
            'The app opens on a sentence, not a grid of widgets: two payments need you, $853 collected this month, $108 due this week. Everything below it supports that line.',
            'Every number shows its working. Click a figure and you get the payments behind it, with a total that matches, and the CSV export adds up to the same amount. The Overview, chart, Billing ledger and export all run on the same reporting functions, and a test checks they agree.',
          ],
        },
        {
          heading: 'Act from the row',
          body: [
            'A failed payment can be chased or settled without leaving the Overview. Send a reminder from the row, or record a cash payment with the amount already filled in, and the alert clears when the money lands.',
          ],
          figures: [
            {
              image: koriPaymentImage,
              alt: 'The record payment panel open over the Overview, with the amount already filled in for a member whose payment failed.',
            },
          ],
        },
        {
          heading: 'Exposed construction',
          body: [
            'The look comes from building sites: panels on one sheet, lines only where two things meet, numbered rows and mono labels. The palette is pango and muka, with kōkōwai kept for what needs attention and the main action on each screen.',
            'The poutama runs along the sidebar and through the empty states, and the revenue chart steps rather than curves, because money lands on charge days. It is hand-built SVG that works from the keyboard and has a table for screen readers.',
          ],
          figures: [
            {
              image: koriBillingImage,
              alt: 'The Billing page in the light theme, headed by the next direct debit run, with status counts and failed payments below.',
            },
          ],
        },
        {
          heading: 'Built for the front desk',
          body: [
            'It works on a phone at the counter, in dark and light themes, with te reo Māori labels the gym can turn off. Contracts and reminder emails are templates the gym edits beside a live preview, and contracts generate as PDFs.',
          ],
          figures: [
            {
              image: koriTemplatesImage,
              alt: 'The contract template editor beside a live preview of the document.',
            },
            {
              image: koriPhoneImage,
              alt: 'The Overview on a phone, with failed payments listed first.',
              narrow: true,
            },
          ],
        },
        {
          heading: 'Billing you can trust',
          body: [
            "Direct debit was the hardest part, because the real answer lives with GoCardless and arrives days later. A payment only counts once a signed webhook confirms it, and with no secret or a bad signature nothing gets processed.",
            "Redelivered webhooks are safe: each event is stored once on its GoCardless id, so a stale failure can't knock back a member who has since paid. Cancelling removes the subscription before the mandate, and the member sits in Cancelling until GoCardless confirms it.",
          ],
        },
        {
          heading: 'Where it stands',
          body: [
            "It's built around a real gym but isn't in use yet, and the billing code is tested against fakes rather than a live GoCardless account. That's the next step before it handles real money.",
            'The public demo needs no database. Each visitor\'s changes are kept in a cookie and replayed over sample data on every request, so nobody sees anyone else\'s changes. There are 251 Vitest tests, axe finds no violations in either theme, and Lighthouse scores 100 for accessibility.',
          ],
        },
      ],
    },
  },
  {
    name: 'AWA/OS',
    role: 'Design & Dev (Studio tool)',
    date: 'May 2026',
    repo: 'https://github.com/ali-harrison/Awa-OS',
    summary:
      'Studio app that runs a project from first enquiry to final invoice, with the whole pipeline drawn as a river and a separate portal for clients. Two auth models, Stripe payment links, server-rendered PDF invoices and row-level security in Postgres.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Resend'],
    image: awaImage,
  },
  {
    name: 'Crook',
    role: 'Design & Dev (Concept)',
    date: 'Nov 2026',
    href: 'https://crook-vinyl.vercel.app',
    repo: 'https://github.com/ali-harrison/crook-vinyl',
    summary:
      'Vinyl figure of Crook, my gaming and design alias since 2014. The whole model is generated by a Python script in Blender, and you can drag his beanie down into a balaclava or spin him on a turntable drawn in a shader.',
    stack: ['Three.js', 'TypeScript', 'Blender', 'Python', 'Vite'],
    image: crookImage,
  },
  {
    name: 'RAMA',
    role: 'Design & Dev (Concept)',
    date: 'Jul 2026',
    href: 'https://rama-nu.vercel.app',
    repo: 'https://github.com/ali-harrison/rama',
    summary:
      'Concept site for a clothing label built on raw construction and exposed seams. The page moves through a single day of light, from first light to after dark, with the sky, palette and timestamps shifting as you scroll.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis'],
    image: ramaImage,
  },
  {
    name: 'Six Voices. One Direction',
    role: 'Design & Dev (Concept)',
    date: 'Jul 2026',
    href: 'https://6v1d.vercel.app/',
    repo: 'https://github.com/ali-harrison/6v1d',
    summary:
      'Concept page on six people across music, fashion, performance, activism and storytelling, and the principles drawn from their work. A Three.js dither shader logo, a pixel-dither visual system and an optional listen-along sound layer.',
    stack: ['Next.js', 'TypeScript', 'Three.js', 'GSAP', 'Lenis', 'Howler'],
    image: sixVoicesImage,
  },
]
