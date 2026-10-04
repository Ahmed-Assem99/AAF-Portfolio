import type { ReactNode } from 'react'

interface BrowserFrameProps {
  url?: string
  children: ReactNode
  className?: string
}

// A minimal browser window used to present project screenshots.
export function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface shadow-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        {url && (
          <span className="mx-auto truncate rounded-md bg-bg/60 px-3 py-0.5 font-mono text-[10px] text-subtle">
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
