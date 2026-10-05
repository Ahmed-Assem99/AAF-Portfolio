import type { ReactNode } from 'react'
import { Window } from './Window'

interface BrowserFrameProps {
  url?: string
  children: ReactNode
  className?: string
}

// Presents a project screenshot inside a window, with the site address in the title bar.
export function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <Window title={url ?? ''} className={className} bodyClassName="bevel-in mt-[3px] bg-surface-2 p-[2px]">
      <div className="overflow-hidden">{children}</div>
    </Window>
  )
}
