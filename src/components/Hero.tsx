'use client'

import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion'

const layers = [
  { src: '/images/Case Studies-slides/Fivestone-Chevron-New-Energies/Fivestone-Chevron-New-Energies-slides/250923_Fivestone-Studios-Chevron/250923_Fivestone-Studios-Chevron.010.jpeg', depth: 0.18, rotate: -4, top: '12%', left: '4%',  right: undefined, width: '22%' },
  { src: '/images/Case Studies-slides/Marriott - Luxury Group/Marriott-Luxury-Group-slides/Slide1.jpeg',                            depth: 0.28, rotate:  3, top: '8%',  left: undefined, right: '6%', width: '20%' },
  { src: '/images/Case Studies-slides/Echo Society/Echo Society Deck 1/Echo Society Deck 1/Echo Society Deck 1.001.jpeg',            depth: 0.38, rotate: -6, top: '52%', left: '2%',  right: undefined, width: '18%' },
  { src: '/images/Case Studies-slides/RAPP/RAPP-Capital-One-Personas/Slide1.jpeg',                                                  depth: 0.45, rotate:  5, top: '55%', left: undefined, right: '4%', width: '24%' },
  { src: '/images/Case Studies-slides/The Spaceship/The Spaceship Deck Images/The Spaceship - Investor Deck_Page_01.jpg',            depth: 0.55, rotate: -2, top: '30%', left: '18%', right: undefined, width: '16%' },
]

type LayerData = typeof layers[0]

function ParallaxLayer({
  layer,
  smoothX,
  smoothY,
  reduced,
}: {
  layer: LayerData
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
  reduced: boolean
}) {
  const x = useTransform(smoothX, (v) => (reduced ? 0 : v * layer.depth * 60))
  const y = useTransform(smoothY, (v) => (reduced ? 0 : v * layer.depth * 40))

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: layer.top,
        left: layer.left,
        right: layer.right,
        width: layer.width,
        rotate: layer.rotate,
        x,
        y,
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <Image
          src={layer.src}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="25vw"
          priority
        />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion() ?? false

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 80 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return
    const { clientX, clientY, currentTarget } = e
    const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.set((clientX / width - 0.5) * 2)
    mouseY.set((clientY / height - 0.5) * 2)
  }

  return (
    <section
      style={{
        background: 'var(--color-dark)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Parallax image layers */}
      {layers.map((layer, i) => (
        <ParallaxLayer
          key={i}
          layer={layer}
          smoothX={smoothX}
          smoothY={smoothY}
          reduced={reduced}
        />
      ))}

      {/* Vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 58% 66% at 50% 48%, rgba(10,9,9,0.06) 0%, rgba(10,9,9,0.70) 72%, rgba(10,9,9,0.96) 100%)',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '0 var(--section-pad-x)',
        }}
      >
        <motion.h1
          className="type-display"
          style={{ color: 'var(--color-on-dark)', margin: '0 0 20px', maxWidth: '860px' }}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Pretty doesn&apos;t convert.
          <br />
          Strategy does.
        </motion.h1>

        <motion.p
          className="type-body-lg"
          style={{ color: 'var(--color-on-dark-muted)', margin: '0 0 40px', maxWidth: '500px' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          Visual storytelling for brands that refuse to blend in.
        </motion.p>

        <motion.div
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          <a href="#work" className="btn-primary">See the Work</a>
          <a href="#contact" className="btn-ghost">Book a Call</a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          translateX: '-50%',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="type-label" style={{ color: 'var(--color-on-dark-muted)' }}>
          SCROLL
        </span>
        <motion.div
          style={{ width: '1px', height: '26px', background: 'var(--color-on-dark-muted)' }}
          animate={reduced ? {} : { opacity: [1, 0.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
