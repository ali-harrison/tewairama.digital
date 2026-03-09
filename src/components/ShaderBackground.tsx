'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const easeInQuart = (t: number) => t * t * t * t
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const frag = `
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uReveal;
varying vec2 vUv;

float bayer4x4(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = x + y * 4;
  float m[16];
  m[0]=0.0/16.0; m[1]=8.0/16.0; m[2]=2.0/16.0; m[3]=10.0/16.0;
  m[4]=12.0/16.0; m[5]=4.0/16.0; m[6]=14.0/16.0; m[7]=6.0/16.0;
  m[8]=3.0/16.0; m[9]=11.0/16.0; m[10]=1.0/16.0; m[11]=9.0/16.0;
  m[12]=15.0/16.0; m[13]=7.0/16.0; m[14]=13.0/16.0; m[15]=5.0/16.0;
  return m[index];
}

void main() {
  // Aspect-corrected distance to mouse
  float aspect = uResolution.x / uResolution.y;
  vec2 diff = (vUv - uMouse) * vec2(aspect, 1.0);
  float dist = length(diff);

  // Cursor reveal
  float cursorReveal = (1.0 - smoothstep(0.0, 0.12, dist));
  cursorReveal = cursorReveal * cursorReveal;

  // Combine: intro reveal drives full visibility, cursor takes over once it zeroes
  float reveal = max(cursorReveal, uReveal);

  // Shape from PNG alpha, gated on reveal
  float shape = step(0.5, texture2D(uTexture, vUv).a) * step(0.01, reveal);

  // Bayer dither
  float threshold = bayer4x4(vUv * uResolution);
  float dither = step(threshold, reveal * 0.95) * shape;

  gl_FragColor = vec4(vec3(dither * 0.45), 1.0);
}
`

interface Props {
  shouldReveal?: boolean
}

type IntroPhase = 'idle' | 'blooming' | 'holding' | 'contracting' | 'done'

const BLOOM_RATE = 1 / (0.6 * 60)
const HOLD_FRAMES = Math.round(0.8 * 60)
const CONTRACT_RATE = 1 / (1.5 * 60)

export default function ShaderBackground({ shouldReveal = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const textureReady = useRef(false)
  const introRef = useRef<{ phase: IntroPhase; progress: number; holdFrames: number }>({
    phase: 'idle',
    progress: 0,
    holdFrames: 0,
  })

  // When shouldReveal flips to true, kick off the bloom
  useEffect(() => {
    if (shouldReveal) {
      introRef.current = { phase: 'blooming', progress: 0, holdFrames: 0 }
    }
  }, [shouldReveal])

  useEffect(() => {
    if (!ref.current) return

    document.body.style.background = 'transparent'

    const W = window.innerWidth, H = window.innerHeight
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(W, H)
    renderer.setClearColor(0x080808)
    ref.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geo = new THREE.PlaneGeometry(2, 2)

    const mouse = new THREE.Vector2(0.5, 0.5)
    const target = new THREE.Vector2(0.5, 0.5)

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uMouse: { value: mouse },
        uResolution: { value: new THREE.Vector2(W, H) },
        uTexture: { value: null },
        uReveal: { value: 0.0 },
      },
      vertexShader: vert,
      fragmentShader: frag,
    })

    scene.add(new THREE.Mesh(geo, mat))

    new THREE.TextureLoader().load('/bg.png', (loadedTex) => {
      mat.uniforms.uTexture.value = loadedTex
      textureReady.current = true
    })

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1 - e.clientY / window.innerHeight
    }
    document.addEventListener('mousemove', onMove)

    let id: number
    const tick = () => {
      id = requestAnimationFrame(tick)

      // Intro state machine — only runs once texture is confirmed loaded
      const s = introRef.current
      if (textureReady.current && s.phase === 'blooming') {
        s.progress = Math.min(1, s.progress + BLOOM_RATE)
        mat.uniforms.uReveal.value = easeOutQuart(s.progress)
        if (s.progress >= 1) { s.phase = 'holding'; s.holdFrames = 0 }
      } else if (s.phase === 'holding') {
        s.holdFrames++
        if (s.holdFrames >= HOLD_FRAMES) s.phase = 'contracting'
      } else if (s.phase === 'contracting') {
        s.progress = Math.max(0, s.progress - CONTRACT_RATE)
        mat.uniforms.uReveal.value = easeInQuart(s.progress)
        if (s.progress <= 0) s.phase = 'done'
      }

      // Mouse lerp
      mouse.x += (target.x - mouse.x) * 0.03
      mouse.y += (target.y - mouse.y) * 0.03
      mat.uniforms.uMouse.value.set(mouse.x, mouse.y)

      renderer.render(scene, cam)
    }
    tick()

    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('mousemove', onMove)
      renderer.dispose()
      ref.current?.removeChild(renderer.domElement)
      document.body.style.background = ''
    }
  }, [])

  return <div ref={ref} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} />
}
