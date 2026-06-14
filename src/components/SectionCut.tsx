type SectionCutProps = {
  from: 'dark' | 'cream'
  to: 'dark' | 'cream'
}

const C = {
  dark: 'var(--color-dark)',
  cream: 'var(--color-cream)',
}

export default function SectionCut({ from, to }: SectionCutProps) {
  return (
    <div className="section-cut">
      <svg viewBox="0 0 680 160" preserveAspectRatio="none" aria-hidden="true">
        {from === 'cream' && to === 'dark' && (
          <>
            <rect width="680" height="160" fill={C.cream} />
            <polygon points="0,160 680,8 680,160" fill={C.dark} />
          </>
        )}
        {from === 'dark' && to === 'cream' && (
          <polygon points="0,160 680,8 680,160" fill={C.cream} />
        )}
      </svg>
    </div>
  )
}
