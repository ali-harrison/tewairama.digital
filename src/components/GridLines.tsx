'use client'

import { useEffect, useRef } from 'react'

// Fixed column guides. Renders 12; CSS hides the extras at 6 / 4 columns.
// The column under the cursor gets a faint glow (.is-hot).
export default function GridLines() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner || !matchMedia('(hover: hover)').matches) return

    const spans = Array.from(inner.children) as HTMLElement[]
    const readCols = () =>
      parseInt(getComputedStyle(inner).getPropertyValue('--cols'), 10) || 12

    let rect = inner.getBoundingClientRect()
    let cols = readCols()
    let hot = -1

    const setHot = (next: number) => {
      if (next === hot) return
      spans[hot]?.classList.remove('is-hot')
      spans[next]?.classList.add('is-hot')
      hot = next
    }

    const onMove = (e: PointerEvent) => {
      const x = e.clientX - rect.left
      setHot(x < 0 || x >= rect.width ? -1 : Math.floor((x / rect.width) * cols))
    }
    const onLeave = () => setHot(-1)
    const onResize = () => {
      rect = inner.getBoundingClientRect()
      cols = readCols()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="grid-lines" aria-hidden="true">
      <div ref={innerRef} className="grid-lines__inner">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  )
}
