'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import CustomCursor from '@/components/CustomCursor'
import Intro from '@/components/Intro'

const WebGLBackground = dynamic(
  () => import('@/components/WebGLBackground'),
  { ssr: false }
)

export default function BodyLayout({ children }: { children: React.ReactNode }) {
  const [contentVisible, setContentVisible] = useState(false)

  return (
    <>
      <WebGLBackground />
      <Intro
        onPūhoroReveal={() => {}}
        onComplete={() => setTimeout(() => setContentVisible(true), 400)}
      />
      <CustomCursor />
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
          transitionDelay: '0.2s',
        }}
      >
        <Nav />
        <main>{children}</main>
      </div>
    </>
  )
}
