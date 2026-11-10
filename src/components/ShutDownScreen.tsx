import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'
import { AafMark } from './ui/Logo'

const CLOSING_MS = 1500

// The Start menu's "Shut Down": a short "shutting down" card, then the famous black screen.
// Any key or click brings the site back. It is a modal dialog, so focus stays inside it.
export function ShutDownScreen({ onRestart }: { onRestart: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [phase, setPhase] = useState<'closing' | 'off'>(() => (prefersReducedMotion() ? 'off' : 'closing'))

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  useEffect(() => {
    if (phase !== 'closing') return
    const t = setTimeout(() => setPhase('off'), CLOSING_MS)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase === 'off') buttonRef.current?.focus()
  }, [phase])

  const restart = () => ref.current?.close()

  return (
    <dialog
      ref={ref}
      aria-label="Shut down"
      onClose={onRestart}
      onClick={phase === 'off' ? restart : undefined}
      onKeyDown={(e) => {
        // Tab and modifier keys are left alone so keyboard users are not surprised.
        if (phase === 'off' && !['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) restart()
      }}
      className="shutdown"
      data-phase={phase}
    >
      {phase === 'closing' ? (
        <div className="flex flex-col items-center gap-6 px-6 text-center text-white" role="status">
          <AafMark className="h-12 w-auto" />
          <p className="font-brand text-sm font-medium tracking-[0.4em]">STUDIO</p>
          <p className="font-pixel text-xl">AAF Studio is shutting down…</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 px-6 text-center">
          <p className="font-pixel text-2xl leading-snug text-[#ff9d2e] sm:text-4xl" role="status">
            It’s now safe to turn off
            <br />
            your computer.
          </p>
          <button ref={buttonRef} type="button" onClick={restart} className="btn95 px-5 py-3 text-sm">
            Restart
          </button>
          <p className="font-term text-xl text-[#9aa3b2]">Press any key or click to come back.</p>
        </div>
      )}
    </dialog>
  )
}
