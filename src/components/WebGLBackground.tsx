'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

// ─── Shaders ────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform float uTime;
  uniform float uAmplitude;
  uniform vec3  uColors[4];
  uniform vec3  uColorsHold[4];
  uniform float uColorBlend;
  uniform float uReveal;
  uniform vec2  uMouse;
  uniform float uBreath;
  uniform float uAspect;

  varying vec2 vUv;

  float sdPill(vec2 p, float radius, float height) {
    p.y -= clamp(p.y, -height, height);
    return length(p) - radius;
  }

  void main() {
    vec2 uv = vUv;

    // ── Aspect-corrected UVs ───────────────────────────────────────────────
    vec2 centeredUv = 2.0 * uv - 1.0;
    centeredUv.x *= uAspect;

    vec2 pillUv = centeredUv;

    // ── SDF ───────────────────────────────────────────────────────────────
    float radius = 0.38 + uBreath * 0.018;
    float height = 0.52;
    float d = sdPill(pillUv, radius, height);

    // ── Refraction — bend UVs near edge as if lensing through curved glass
    vec2 normal2d = normalize(pillUv - vec2(0.0, clamp(pillUv.y, -height, height)));
    float refractionStrength = smoothstep(0.18, 0.0, abs(d)) * 0.06;
    vec2 refractedUv = centeredUv + normal2d * refractionStrength * sign(-d);

    // ── Shader distortion on refracted UVs ────────────────────────────────
    float distortionStrength = uAmplitude * uReveal;
    refractedUv += distortionStrength * 0.4 * sin(1.0 * refractedUv.yx + vec2(1.2, 3.4) + uTime);
    refractedUv += distortionStrength * 0.2 * sin(5.2 * refractedUv.yx + vec2(3.5, 0.4) + uTime);
    refractedUv += distortionStrength * 0.3 * sin(3.5 * refractedUv.yx + vec2(1.2, 3.1) + uTime);
    refractedUv += distortionStrength * 1.6 * sin(0.4 * refractedUv.yx + vec2(0.8, 2.4) + uTime);

    // ── Colour mixing ──────────────────────────────────────────────────────
    vec3 color     = uColors[0];
    vec3 holdColor = uColorsHold[0];
    for (int i = 0; i < 4; i++) {
      float r = cos(float(i) * length(refractedUv));
      color     = mix(color,     uColors[i],     r);
      holdColor = mix(holdColor, uColorsHold[i], r);
    }
    vec3 finalColor = mix(color, holdColor, uColorBlend);

    // ── Depth / edge shadow ────────────────────────────────────────────────
    float edgeDepth = smoothstep(0.0, -0.18, d);
    float depthMultiplier = 0.3 + 0.7 * edgeDepth;
    float centerGlow = 1.0 - smoothstep(0.0, 0.5, length(pillUv));
    depthMultiplier += centerGlow * 0.12;
    finalColor *= depthMultiplier;

    // ── Fresnel rim — bright edge catch like curved glass ──────────────────
    float fresnel = smoothstep(-0.08, 0.0, d) * smoothstep(0.04, 0.0, d);
    fresnel = pow(fresnel, 1.4);
    finalColor += vec3(fresnel * 0.55);

    // ── Specular highlight — soft light spot that shifts with mouse ────────
    vec2 lightPos = vec2(-0.2, 0.3) + (uMouse - 0.5) * 0.18;
    float specDist = length(pillUv - lightPos);
    float specular = exp(-specDist * specDist * 8.0);
    specular *= smoothstep(0.02, -0.02, d);
    specular = pow(specular, 1.6);
    finalColor += vec3(specular * 0.35);

    // ── Surface normal shading — domed light response ──────────────────────
    float eps = 0.001;
    float dx = sdPill(pillUv + vec2(eps, 0.0), radius, height) - d;
    float dy = sdPill(pillUv + vec2(0.0, eps), radius, height) - d;
    vec3 surfaceNormal = normalize(vec3(-dx, -dy, 0.004));
    vec3 lightDir = normalize(vec3(
      (uMouse.x - 0.5) * 0.4 - 0.2,
      (uMouse.y - 0.5) * 0.4 + 0.3,
      0.8
    ));
    float diffuse = max(0.0, dot(surfaceNormal, lightDir));
    finalColor += finalColor * diffuse * 0.18;

    // ── Outer shadow halo ──────────────────────────────────────────────────
    float outerShadow = smoothstep(0.08, 0.0, d) * smoothstep(-0.01, 0.08, d);
    finalColor = mix(finalColor, vec3(0.0), outerShadow * 0.6);

    // ── Film grain ─────────────────────────────────────────────────────────
    float grain = fract(
      sin(dot(vUv * 800.0 + uTime * 80.0, vec2(12.9898, 78.233))) * 43758.5453
    );
    float grainMask = smoothstep(0.0, 0.3, finalColor.r) *
                      smoothstep(1.0, 0.6, finalColor.r);
    finalColor += (grain - 0.5) * 0.09 * grainMask;

    // ── Soft mask ──────────────────────────────────────────────────────────
    float mask = smoothstep(0.01, -0.01, d);

    gl_FragColor = vec4(mix(vec3(0.0), finalColor, uReveal * mask), 1.0);
  }
`

// ─── Helpers ────────────────────────────────────────────────────────────────

function hexToVec3(hex: string): THREE.Vector3 {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return new THREE.Vector3(r, g, b)
}

// ─── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_COLORS  = ['#080808', '#2a2a2a', '#888888', '#e8e8e8']
const HOLD_COLORS     = ['#0a0a0a', '#00b4d8', '#c1121f', '#8ecae6']
const REVEAL_DURATION = 2
const REVEAL_DELAY    = 0.3
const MOUSE_SPEED_THRESHOLD = 0.012
const MOUSE_BOOST_MAX       = 0.3

// ─── Component ──────────────────────────────────────────────────────────────

export default function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // ── Mutable config (lil-gui writes directly into this object) ──────────
    const config = {
      amplitude:                0.35,
      timeSpeed:                0.004,
      holdAmplitudeMultiplier:  3.0,
      holdTimeSpeedMultiplier:  2.0,
      lerpSpeed:                0.02,
    }

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene    = new THREE.Scene()
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      uTime:        { value: 0 },
      uAmplitude:   { value: 0 },
      uColors:      { value: DEFAULT_COLORS.map(hexToVec3) },
      uColorsHold:  { value: HOLD_COLORS.map(hexToVec3) },
      uColorBlend:  { value: 0 },
      uReveal:      { value: 0 },
      uMouse:       { value: new THREE.Vector2(0.5, 0.5) },
      uBreath:      { value: 0 },
      uAspect:      { value: window.innerWidth / window.innerHeight },
    }

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    // ── Pill hit-test (mirrors shader SDF) ────────────────────────────────
    const PILL_RADIUS = 0.38
    const PILL_HEIGHT = 0.52

    const insidePill = (clientX: number, clientY: number): boolean => {
      const aspect = window.innerWidth / window.innerHeight
      const px = (2 * clientX / window.innerWidth  - 1) * aspect
      const py =  1 - 2 * clientY / window.innerHeight
      const clampedPy = Math.max(-PILL_HEIGHT, Math.min(PILL_HEIGHT, py))
      const d = Math.sqrt(px * px + (py - clampedPy) ** 2) - (PILL_RADIUS + uniforms.uBreath.value * 0.018)
      return d < 0
    }

    // ── Runtime state ──────────────────────────────────────────────────────
    let isHolding        = false
    let currentAmplitude = config.amplitude
    let currentTimeSpeed = config.timeSpeed
    let currentColorBlend = 0
    let amplitudeBoost   = 0

    const mouse     = { x: 0.5, y: 0.5 }
    const mouseLerp = { x: 0.5, y: 0.5 }
    const mousePrev = { x: 0.5, y: 0.5 }

    // ── Page-load reveal ───────────────────────────────────────────────────
    gsap.to(uniforms.uReveal, {
      value:    1,
      duration: REVEAL_DURATION,
      delay:    REVEAL_DELAY,
      ease:     'power2.inOut',
    })

    // ── Tick ───────────────────────────────────────────────────────────────
    const tick = () => {
      const {
        amplitude,
        timeSpeed,
        holdAmplitudeMultiplier,
        holdTimeSpeedMultiplier,
        lerpSpeed,
      } = config

      // Mouse speed → temporary amplitude boost
      const dx    = mouse.x - mousePrev.x
      const dy    = mouse.y - mousePrev.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      mousePrev.x = mouse.x
      mousePrev.y = mouse.y

      if (speed > MOUSE_SPEED_THRESHOLD) {
        amplitudeBoost = Math.min(amplitudeBoost + speed * 4, MOUSE_BOOST_MAX)
      }
      amplitudeBoost += (0 - amplitudeBoost) * lerpSpeed

      // Lerp amplitude, timeSpeed, colorBlend toward targets
      const targetAmplitude  = isHolding
        ? amplitude * holdAmplitudeMultiplier
        : amplitude
      const targetTimeSpeed  = isHolding
        ? timeSpeed * holdTimeSpeedMultiplier
        : timeSpeed
      const targetColorBlend = isHolding ? 1.0 : 0.0

      currentAmplitude  += (targetAmplitude + amplitudeBoost - currentAmplitude)  * lerpSpeed
      currentTimeSpeed  += (targetTimeSpeed  - currentTimeSpeed)                   * lerpSpeed
      currentColorBlend += (targetColorBlend - currentColorBlend)                  * lerpSpeed

      // Mouse lerp
      mouseLerp.x += (mouse.x - mouseLerp.x) * 0.03
      mouseLerp.y += (mouse.y - mouseLerp.y) * 0.03

      // Write uniforms
      uniforms.uTime.value       += currentTimeSpeed
      uniforms.uAmplitude.value   = currentAmplitude
      uniforms.uColorBlend.value  = currentColorBlend
      uniforms.uMouse.value.set(mouseLerp.x, mouseLerp.y)
      uniforms.uBreath.value      = Math.sin(Date.now() * 0.0008)

      renderer.render(scene, camera)
    }

    gsap.ticker.add(tick)

    // ── Event listeners ────────────────────────────────────────────────────
    const onMouseMove  = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = 1 - e.clientY / window.innerHeight
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${e.clientX - 28}px, ${e.clientY + 14}px)`
        labelRef.current.style.opacity = insidePill(e.clientX, e.clientY) ? '1' : '0'
      }
    }
    const onMouseDown  = (e: MouseEvent) => {
      if (!insidePill(e.clientX, e.clientY)) return
      isHolding = true
      if (labelRef.current) labelRef.current.style.opacity = '0'
    }
    const onMouseUp    = () => {
      isHolding = false
    }
    const onTouchStart = () => { isHolding = true }
    const onTouchEnd   = () => { isHolding = false }
    const onResize     = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uAspect.value = window.innerWidth / window.innerHeight
    }

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mouseup',    onMouseUp)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd)
    window.addEventListener('resize',     onResize)

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(tick)
      gsap.killTweensOf(uniforms.uReveal)

      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('resize',     onResize)

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      const canvas = containerRef.current
      if (canvas && renderer.domElement.parentNode === canvas) {
        canvas.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        -1,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={labelRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          zIndex:          50,
          pointerEvents:   'none',
          opacity:         0,
          transition:      'opacity 0.2s ease',
          fontFamily:      'var(--font-dm-mono), monospace',
          fontWeight:      300,
          fontSize:        '0.6rem',
          letterSpacing:   '0.18em',
          textTransform:   'uppercase',
          color:           'rgba(245,245,245,0.4)',
          userSelect:      'none',
          willChange:      'transform',
        }}
      >
        hold
      </div>
    </>
  )
}
