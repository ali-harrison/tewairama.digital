'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { PROJECTS } from '@/content/projects'

// Floating screenshot that trails the cursor over rows marked data-preview={index}.
// Fine pointers only; with reduced motion it sits at the cursor without trailing.
export default function ProjectPreview() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const images = Array.from(el.children) as HTMLElement[]
    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-preview]'))
    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      pos.x += (target.x - pos.x) * (still ? 1 : 0.14)
      pos.y += (target.y - pos.y) * (still ? 1 : 0.14)
      el.style.translate = `${pos.x}px ${pos.y}px`
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const show = (e: PointerEvent) => {
      const active = Number((e.currentTarget as HTMLElement).dataset.preview)
      images.forEach((img, i) => img.classList.toggle('is-active', i === active))
      // Appear where the cursor is rather than gliding in from the last spot
      if (!el.classList.contains('is-on')) {
        pos.x = target.x = e.clientX
        pos.y = target.y = e.clientY
      }
      el.classList.add('is-on')
    }

    const hide = () => el.classList.remove('is-on')

    rows.forEach((row) => {
      row.addEventListener('pointerenter', show)
      row.addEventListener('pointerleave', hide)
    })
    window.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      rows.forEach((row) => {
        row.removeEventListener('pointerenter', show)
        row.removeEventListener('pointerleave', hide)
      })
    }
  }, [])

  return (
    <div ref={ref} className="preview" aria-hidden="true">
      {PROJECTS.map(({ name, image }) => (
        <Image key={name} src={image} alt="" sizes="24rem" />
      ))}
    </div>
  )
}
