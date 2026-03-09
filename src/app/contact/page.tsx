import type { Metadata } from 'next'
import ContactLinks from '@/components/ContactLinks'

export const metadata: Metadata = { title: 'Contact — Te Wairama Digital' }

export default function ContactPage() {
  return <ContactLinks />
}
