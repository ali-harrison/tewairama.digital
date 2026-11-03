import SplitWords from '@/components/SplitWords'
import { pad } from '@/lib/pad'

const LINKS = [
  { label: 'tewairama@pm.me ↗', href: 'mailto:tewairama@pm.me' },
  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/te-wairama' },
  { label: 'GitHub ↗', href: 'https://github.com/ali-harrison' },
  { label: 'instagram.com/tewairama.digital ↗', href: 'https://instagram.com/tewairama.digital/' },
]

export default function ContactPage() {
  return (
    <>
      <div className="page-head grid" data-reveal>
        <SplitWords as="h1" text="Contact" className="page-head__title" />
      </div>

      <ul className="contact-list rows">
        {LINKS.map(({ label, href }, i) => (
          <li key={href} className="contact-row grid" data-reveal>
            <span className="contact-row__index mono muted fade">{pad(i + 1)}</span>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-row__link"
            >
              <SplitWords text={label} />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
