import { Fragment } from 'react'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
}

// Wraps each word in a clipping mask so it can rise into place (see .word in globals.css).
// Screen readers get the plain text; the split copy is aria-hidden.
export default function SplitWords({ text, as: Tag = 'span', className }: Props) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="word">
              <span
                className="word__inner"
                style={{ '--w': i } as React.CSSProperties}
              >
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
