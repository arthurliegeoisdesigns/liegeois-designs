'use client'

import { useEffect, useRef } from 'react'

/**
 * SlideWarp — WebGL displacement transitions between hero slides
 * (audit rec 13, unblocked by the Cloudinary migration: res.cloudinary.com
 * serves CORS headers, Webflow's CDN did not).
 *
 * The active slide melts into the next through an fbm noise field, and the
 * surface ripples subtly around the cursor at rest (audit rec 14).
 * Dependency-free raw WebGL, DPR capped, pauses offscreen/hidden.
 *
 * Integration contract: parent renders a poster <Image> underneath and its
 * legacy transition until `onReady` fires; if WebGL/textures fail, onReady
 * never fires and the legacy path keeps running.
 */
const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){ v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform float u_progress;   /* 0 → showing A, 1 → showing B */
uniform float u_time;
uniform vec2  u_mouse;      /* uv space */
uniform float u_canvasAspect;
uniform float u_aspectA;
uniform float u_aspectB;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0,0.0)), u.x),
             mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++){ v += a * noise(p); p = p * 2.1 + 17.7; a *= 0.5; }
  return v;
}

/* object-fit: cover */
vec2 coverUV(vec2 uv, float texAspect){
  vec2 s = vec2(1.0);
  vec2 o = vec2(0.0);
  float r = u_canvasAspect / texAspect;
  if (r > 1.0) { s.y = 1.0 / r; o.y = (1.0 - s.y) * 0.5; }
  else         { s.x = r;       o.x = (1.0 - s.x) * 0.5; }
  return uv * s + o;
}

void main(){
  vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);

  /* cursor ripple — subtle lens around the pointer */
  vec2 md = uv - u_mouse;
  md.x *= u_canvasAspect;
  float mdist = length(md);
  float ripple = smoothstep(0.42, 0.0, mdist);
  uv += normalize(md + 1e-5) * ripple * -0.014
      + vec2(noise(uv * 6.0 + u_time * 0.4) - 0.5) * ripple * 0.006;

  /* displacement mix */
  float d = fbm(uv * 3.5 + u_time * 0.05);
  float pr = clamp(u_progress * 1.35 - d * 0.35, 0.0, 1.0);
  pr = smoothstep(0.0, 1.0, pr);
  vec2 warp = vec2(d - 0.5) * 0.28;

  vec4 a = texture2D(u_texA, coverUV(uv + warp * pr, u_aspectA));
  vec4 b = texture2D(u_texB, coverUV(uv - warp * (1.0 - pr), u_aspectB));
  gl_FragColor = mix(a, b, pr);
}
`

type Props = {
  images: string[]
  active: number
  onReady?: () => void
}

export default function SlideWarp({ images, active, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const apiRef = useRef<{ goTo: (i: number) => void } | null>(null)

  // forward slide changes into the GL loop
  useEffect(() => {
    if (active !== activeRef.current) {
      activeRef.current = active
      apiRef.current?.goTo(active)
    }
  }, [active])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    let dead = false

    // ── load all textures first ──────────────────────────────
    Promise.all(
      images.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new window.Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = src
          }),
      ),
    )
      .then((imgs) => {
        if (dead) return
        boot(imgs)
      })
      .catch(() => {
        /* textures failed — parent's legacy transition keeps running */
      })

    let cleanup: (() => void) | undefined

    function boot(imgs: HTMLImageElement[]) {
      function compile(type: number, src: string) {
        const s = gl!.createShader(type)!
        gl!.shaderSource(s, src)
        gl!.compileShader(s)
        return s
      }
      const prog = gl!.createProgram()!
      gl!.attachShader(prog, compile(gl!.VERTEX_SHADER, VERT))
      gl!.attachShader(prog, compile(gl!.FRAGMENT_SHADER, FRAG))
      gl!.linkProgram(prog)
      if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) return
      gl!.useProgram(prog)

      const buf = gl!.createBuffer()
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl!.STATIC_DRAW)
      const loc = gl!.getAttribLocation(prog, 'a_pos')
      gl!.enableVertexAttribArray(loc)
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0)

      const textures = imgs.map((img) => {
        const t = gl!.createTexture()
        gl!.bindTexture(gl!.TEXTURE_2D, t)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img)
        return { tex: t, aspect: img.naturalWidth / img.naturalHeight }
      })

      const u = {
        texA: gl!.getUniformLocation(prog, 'u_texA'),
        texB: gl!.getUniformLocation(prog, 'u_texB'),
        progress: gl!.getUniformLocation(prog, 'u_progress'),
        time: gl!.getUniformLocation(prog, 'u_time'),
        mouse: gl!.getUniformLocation(prog, 'u_mouse'),
        canvasAspect: gl!.getUniformLocation(prog, 'u_canvasAspect'),
        aspectA: gl!.getUniformLocation(prog, 'u_aspectA'),
        aspectB: gl!.getUniformLocation(prog, 'u_aspectB'),
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      let cw = 0
      let ch = 0
      function resize() {
        const r = canvas!.getBoundingClientRect()
        cw = Math.max(1, Math.round(r.width * dpr))
        ch = Math.max(1, Math.round(r.height * dpr))
        canvas!.width = cw
        canvas!.height = ch
        gl!.viewport(0, 0, cw, ch)
      }
      resize()
      window.addEventListener('resize', resize)

      // transition state
      let fromIdx = activeRef.current
      let toIdx = activeRef.current
      let progress = 1
      let animStart = 0
      const DUR = 1100

      apiRef.current = {
        goTo(i: number) {
          fromIdx = progress >= 1 ? toIdx : toIdx // settle on current target
          toIdx = i
          progress = 0
          animStart = performance.now()
        },
      }

      // lerped mouse (uv space)
      let tx = 0.5
      let ty = 0.5
      let mx = 0.5
      let my = 0.5
      function onMove(e: PointerEvent) {
        const r = canvas!.getBoundingClientRect()
        tx = (e.clientX - r.left) / r.width
        ty = (e.clientY - r.top) / r.height
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      let visible = true
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
      io.observe(canvas!)

      let raf = 0
      const t0 = performance.now()
      function frame(now: number) {
        raf = requestAnimationFrame(frame)
        if (!visible || document.hidden) return
        if (progress < 1) {
          const p = Math.min((now - animStart) / DUR, 1)
          progress = 1 - Math.pow(1 - p, 3) // ease-out-cubic
        }
        mx += (tx - mx) * 0.08
        my += (ty - my) * 0.08

        gl!.activeTexture(gl!.TEXTURE0)
        gl!.bindTexture(gl!.TEXTURE_2D, textures[fromIdx].tex)
        gl!.uniform1i(u.texA, 0)
        gl!.activeTexture(gl!.TEXTURE1)
        gl!.bindTexture(gl!.TEXTURE_2D, textures[toIdx].tex)
        gl!.uniform1i(u.texB, 1)
        gl!.uniform1f(u.progress, progress)
        gl!.uniform1f(u.time, (now - t0) / 1000)
        gl!.uniform2f(u.mouse, mx, my)
        gl!.uniform1f(u.canvasAspect, cw / ch)
        gl!.uniform1f(u.aspectA, textures[fromIdx].aspect)
        gl!.uniform1f(u.aspectB, textures[toIdx].aspect)
        gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      }
      raf = requestAnimationFrame(frame)
      onReady?.()

      cleanup = () => {
        cancelAnimationFrame(raf)
        io.disconnect()
        window.removeEventListener('resize', resize)
        window.removeEventListener('pointermove', onMove)
        gl!.getExtension('WEBGL_lose_context')?.loseContext()
      }
    }

    return () => {
      dead = true
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
