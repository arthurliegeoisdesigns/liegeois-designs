import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const alt = 'Liégeois Designs — Strategic Visual Storytelling'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const [interRegular, interBold] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/fonts/Inter-Regular.woff')),
    readFile(join(process.cwd(), 'src/app/fonts/Inter-Bold.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0A0A0A',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: '#ffffff',
            opacity: 0.15,
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
              fontFamily: 'Inter',
              fontSize: '72px',
              fontWeight: 700,
              color: '#FAFAFA',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
            }}
          >
            Liégeois Designs
          </div>
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '26px',
              fontWeight: 400,
              color: 'rgba(250, 250, 250, 0.42)',
              lineHeight: 1.4,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
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
        { name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const },
        { name: 'Inter', data: interBold, weight: 700 as const, style: 'normal' as const },
      ],
    }
  )
}
