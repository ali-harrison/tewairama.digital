'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Keep off-screen until first move
    gsap.set(cursor, { x: -20, y: -20, opacity: 0 })

    const setX = gsap.quickSetter(cursor, 'x', 'px')
    const setY = gsap.quickSetter(cursor, 'y', 'px')

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { opacity: 1, duration: 0.4, overwrite: true })
      setX(e.clientX)
      setY(e.clientY)
    }

    document.addEventListener('mousemove', onMouseMove)
    return () => document.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: -3,
        left: -3,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#ffffff',
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference',
      }}
    />
  )
}
