import { ImageResponse } from 'next/og'

export const alt = 'Liégeois Designs — Strategic Visual Storytelling'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const [fraunces, instrumentSans] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxyjDg.ttf').then(
      (r) => r.arrayBuffer()
    ),
    fetch('https://fonts.gstatic.com/s/instrumentsans/v4/pximypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr-yp2JGEJOH9npSTF-Qf1.ttf').then(
      (r) => r.arrayBuffer()
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0A0909',
          position: 'relative',
        }}
      >
        {/* Vermillion accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            background: '#D63108',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 100px',
          }}
        >
          <div
            style={{
              fontFamily: 'Fraunces',
              fontSize: '64px',
              fontWeight: 800,
              color: '#F6F0E8',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '24px',
            }}
          >
            Liégeois Designs
          </div>
          <div
            style={{
              fontFamily: 'Instrument Sans',
              fontSize: '28px',
              fontWeight: 400,
              color: 'rgba(246, 240, 232, 0.48)',
              lineHeight: 1.4,
            }}
          >
            Strategic Visual Storytelling
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 800 as const, style: 'normal' as const },
        { name: 'Instrument Sans', data: instrumentSans, weight: 400 as const, style: 'normal' as const },
      ],
    }
  )
}
