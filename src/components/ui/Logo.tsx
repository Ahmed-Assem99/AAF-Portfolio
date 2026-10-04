// The AAF Studio logo, redrawn as SVG from the brand artwork so it stays sharp at any
// size and follows the theme: the mark uses the text color, the top bar is always blue.

export function AafMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="50 38 1064 412" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M50 450 307 38l226 360L759 38l258 412H903L759 218 615 450H452L307 218 164 450Z"
      />
      <path fill="var(--accent)" d="M825 63h289l-40 64H864Z" />
      <path fill="currentColor" d="M893 171h157l-38 61h-82Z" />
    </svg>
  )
}

interface LogoProps {
  /** `full` adds the "Digital products" tagline, as in the brand lockup. */
  variant?: 'compact' | 'full'
}

export function Logo({ variant = 'compact' }: LogoProps) {
  if (variant === 'full') {
    return (
      <span className="flex items-center gap-5">
        <AafMark className="h-10 w-auto" />
        <span className="h-12 w-px bg-line-strong" aria-hidden="true" />
        <span className="font-brand leading-none">
          <span className="block text-lg font-medium tracking-[0.42em]">STUDIO</span>
          <span className="mt-2 block text-[10px] tracking-[0.34em] text-subtle">DIGITAL PRODUCTS</span>
        </span>
      </span>
    )
  }

  return (
    <span className="flex items-center gap-3">
      <AafMark className="h-[22px] w-auto" />
      <span className="h-5 w-px bg-line-strong" aria-hidden="true" />
      <span className="font-brand text-[13px] font-medium tracking-[0.38em]">STUDIO</span>
    </span>
  )
}
