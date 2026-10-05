import type { ReactNode } from 'react'

interface WindowProps {
  title: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

// A Windows 95-style window: bevelled frame, blue title bar and decorative controls.
export function Window({ title, children, className = '', bodyClassName = '' }: WindowProps) {
  return (
    <div className={`win ${className}`}>
      <div className="titlebar">
        <div className="min-w-0 flex-1 truncate">{title}</div>
        <span className="flex shrink-0 gap-0.5" aria-hidden="true">
          <span className="title-btn">_</span>
          <span className="title-btn">□</span>
          <span className="title-btn ml-0.5">×</span>
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
