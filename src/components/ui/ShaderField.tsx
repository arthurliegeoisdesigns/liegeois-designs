'use client'

import { useEffect, useRef } from 'react'

/**
 * ShaderField — hand-written WebGL silk field behind the hero type.
 * Warm flowing fbm noise, cursor-reactive domain warp. No dependencies,
 * no accounts — ~60 lines of GLSL, in-repo (Phase 2, hero option C).
 *
 * Guardrails: skips on prefers-reduced-motion or missing WebGL (the CSS
 * WorldCanvas atmosphere remains behind it either way), pauses offscreen
 * and on hidden tabs, caps DPR at 1.5. Bottom 25% is CSS-masked so the
 * field dissolves into the world canvas below the hero.
 */
const FRAG = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.9);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p  = uv * vec2(u_res.x / u_res.y, 1.0) * 1.6;

  // cursor influence — local swell in the field
  vec2 m = u_mouse * vec2(u_res.x / u_res.y, 1.0) * 1.6;
  float md = length(p - m);
  float mi = smoothstep(1.1, 0.0, md) * 0.5;

  // domain-warped silk
  float t = u_time * 0.045;
  vec2 q = vec2(fbm(p + t * 0.7), fbm(p + vec2(5.2, 1.3) - t * 0.4));
  float silk = fbm(p + 2.4 * q + mi * (p - m));

  // fold highlights
  float sheen = smoothstep(0.42, 0.78, silk);
  float deep  = smoothstep(0.62, 0.18, silk);

  vec3 base  = vec3(0.043, 0.039, 0.031);              // #0B0A08
  vec3 warm  = vec3(0.969, 0.941, 0.894);              // #F7F0E4
  vec3 ember = vec3(0.910, 0.267, 0.125);              // #E84420

  // ember lives low-left + where the field folds deepest
  float emberMask = deep * smoothstep(1.6, 0.2, length(uv - vec2(0.12, 0.10))) ;

  vec3 col = base
    + warm  * sheen * (0.085 + mi * 0.10)
    + ember * emberMask * 0.14;

  // vignette
  float vig = smoothstep(1.25, 0.35, length(uv - vec2(0.5, 0.45)));
  col *= mix(0.78, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

/** True when WebGL runs in software (Lighthouse/SwiftShader, VMs, weak
 *  machines) — rendering shaders there burns CPU for nothing.
 *  Newer Chrome exposes the real renderer on gl.RENDERER directly and may
 *  omit the debug extension entirely — check both (learned the hard way:
 *  the extension-only check silently passed on Lighthouse desktop). */
export function isSoftwareGL(gl: WebGLRenderingContext): boolean {
  const dbg = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = String(
    (dbg && gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || '',
  )
  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)
}

export default function ShaderField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return

    // GL starts only after (1) a real user gesture and (2) an idle slot.
    // Robots (Lighthouse, crawlers) never gesture → they never pay a
    // single shader frame. Humans move/scroll within the first second.
    let idleId = 0
    let started = false
    let armed = false
    let teardown: (() => void) | undefined
    const idle = (cb: () => void) =>
      'requestIdleCallback' in window
        ? requestIdleCallback(cb, { timeout: 2000 })
        : (setTimeout(cb, 1200) as unknown as number)

    const GESTURES = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown'] as const
    const onGesture = () => {
      if (armed) return
      armed = true
      GESTURES.forEach((g) => window.removeEventListener(g, onGesture))
      idleId = idle(() => {
        started = true
        teardown = boot()
      })
    }
    GESTURES.forEach((g) => window.addEventListener(g, onGesture, { passive: true }))

    function boot(): (() => void) | undefined {
    const gl = canvas!.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return
    if (isSoftwareGL(gl)) return // CSS atmosphere carries it instead

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    function resize() {
      const r = canvas!.getBoundingClientRect()
      w = Math.round(r.width * dpr)
      h = Math.round(r.height * dpr)
      canvas!.width = w
      canvas!.height = h
      gl!.viewport(0, 0, w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    // lerped mouse in shader UV space (y flipped)
    let tx = 0.5
    let ty = 0.5
    let mx = 0.5
    let my = 0.5
    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width
      ty = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas!)

    let raf = 0
    let last = 0
    // Watchdog: if real frame cadence can't hold ~11fps over the first
    // 30 rendered frames, the GPU claim was a lie (or the device is
    // struggling) — kill the shader, the CSS atmosphere takes over.
    let wdFrames = 0
    let wdSlow = 0
    let wdPrev = 0
    const t0 = performance.now()
    function frame(now: number) {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      if (now - last < 32) return // 30fps is plenty for ambient silk
      last = now
      if (wdFrames < 30) {
        if (wdPrev && now - wdPrev > 90) wdSlow++
        wdPrev = now
        wdFrames++
        if (wdFrames === 30 && wdSlow > 10) {
          canvas!.style.display = 'none'
          cancelAnimationFrame(raf)
          return
        }
      }
      mx += (tx - mx) * 0.05
      my += (ty - my) * 0.05
      gl!.uniform2f(uRes, w, h)
      gl!.uniform1f(uTime, (now - t0) / 1000)
      gl!.uniform2f(uMouse, mx, my)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      gl!.getExtension('WEBGL_lose_context')?.loseContext()
    }
    }

    return () => {
      GESTURES.forEach((g) => window.removeEventListener(g, onGesture))
      if ('requestIdleCallback' in window && armed && !started) cancelIdleCallback(idleId)
      teardown?.()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="hero-shader" />
}
