import { useCallback, useState } from 'react'

const STORAGE_KEY = 'aaf-motion'

/** True when the visitor has paused animations with the taskbar button. */
export function motionPaused() {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion === 'off'
}

// Lets the visitor pause every moving thing on the page (ticker, game, blinking cursors),
// whatever their system setting. The initial value is set by an inline script in index.html.
export function useMotion() {
  const [paused, setPaused] = useState(motionPaused)

  const toggle = useCallback(() => {
    const next = !motionPaused()
    if (next) document.documentElement.dataset.motion = 'off'
    else delete document.documentElement.dataset.motion
    try {
      if (next) localStorage.setItem(STORAGE_KEY, 'off')
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    setPaused(next)
  }, [])

  return { paused, toggle }
}
