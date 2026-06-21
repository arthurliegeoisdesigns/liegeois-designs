"use client"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { testimonials } from "@/content/testimonials"

export function TestimonialsWidget() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(`${testimonials[0].title}, ${testimonials[0].company}`)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(`${testimonials[index].title}, ${testimonials[index].company}`)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-10 py-12 sm:py-16">
      {/* Quote */}
      <div className="relative px-6 sm:px-12 md:px-16">
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-8px',
            top: '-24px',
            fontSize: '5rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-muted)',
            opacity: 0.3,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          &ldquo;
        </span>
        <p
          className={cn(
            "text-2xl md:text-3xl font-light text-center max-w-lg leading-relaxed",
            "transition-all duration-[400ms] ease-out",
            isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 scale-100"
          )}
          style={{ color: 'var(--color-text-primary)', filter: isAnimating ? 'blur(4px)' : 'none' }}
        >
          {displayedQuote}
        </p>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8px',
            bottom: '-32px',
            fontSize: '5rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-muted)',
            opacity: 0.3,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          &rdquo;
        </span>
      </div>

      {/* Role + avatar pills */}
      <div className="flex flex-col items-center gap-6 mt-2 w-full px-4 sm:px-0">
        <p
          className={cn(
            "text-xs tracking-[0.2em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {displayedRole}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {testimonials.map((t, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={t.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`View testimonial from ${t.author}`}
                className={cn(
                  "relative flex items-center rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  showName ? "pr-4 pl-2 py-2" : "p-0.5",
                )}
                style={{
                  background: isActive
                    ? 'var(--color-text-primary)'
                    : isHovered
                      ? 'var(--color-card-bg)'
                      : 'transparent',
                }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      width={32}
                      height={32}
                      className={cn(
                        "w-8 h-8 rounded-full object-cover",
                        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        !isActive && "hover:scale-105",
                      )}
                      style={{
                        outline: isActive ? '2px solid rgba(8,8,8,0.3)' : 'none',
                        outlineOffset: '1px',
                      }}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                      style={{ background: 'var(--color-card-bg)', color: 'var(--color-text-secondary)' }}
                    >
                      {t.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Name — expands on hover/active */}
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className="text-sm font-medium whitespace-nowrap block transition-colors duration-300"
                      style={{ color: isActive ? '#0d0d0d' : 'var(--color-text-primary)' }}
                    >
                      {t.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
