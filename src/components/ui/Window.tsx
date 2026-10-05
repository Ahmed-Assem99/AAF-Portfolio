import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'

interface WindowProps {
  title: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  /** Name shown in the boot-up terminal. Defaults to the title when it is plain text. */
  bootLabel?: string
  /** Set to false to skip the boot-up terminal. */
  boot?: boolean
}

const BOOT_MS = 420

function toExe(label: string) {
  const name = label
    .toUpperCase()
    .replace(/\.EXE$/, '')
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 14)
  return `${name || 'PROGRAM'}.EXE`
}

// A Windows 95-style window: bevelled frame, blue title bar and decorative controls.
// The first time it scrolls into view, a terminal "boots" the window before its content shows.
export function Window({ title, children, className = '', bodyClassName = '', bootLabel, boot = true }: WindowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [booting, setBooting] = useState(() => boot && !prefersReducedMotion())

  useEffect(() => {
    if (!booting || !inView) return
    const t = setTimeout(() => setBooting(false), BOOT_MS)
    return () => clearTimeout(t)
  }, [booting, inView])

  const exe = toExe(bootLabel ?? (typeof title === 'string' ? title : 'program'))
  const run = `C:\\> RUN ${exe}`
  const load = 'LOADING ........ OK'

  return (
    <div ref={ref} className={`win ${className}`}>
      <div className="titlebar">
        <div className="min-w-0 flex-1 truncate">{title}</div>
        <span className="flex shrink-0 gap-0.5" aria-hidden="true">
          <span className="title-btn">_</span>
          <span className="title-btn">□</span>
          <span className="title-btn ml-0.5">×</span>
        </span>
      </div>
      <div className={`relative ${bodyClassName}`}>
        {children}
        {booting && (
          <div className={`boot-screen ${inView ? 'is-running' : ''}`} aria-hidden="true">
            <p className="type-line" style={{ '--chars': run.length } as CSSProperties}>
              {run}
            </p>
            <p
              className="type-line"
              style={{ '--chars': load.length, '--type-delay': '150ms' } as CSSProperties}
            >
              {load}
            </p>
            <span className="boot-cursor" />
          </div>
        )}
      </div>
    </div>
  )
}
