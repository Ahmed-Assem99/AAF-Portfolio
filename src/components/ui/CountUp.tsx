import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'

// Counts a leading number up from zero when it scrolls into view ("20+" → 0…20+).
// Values without a leading number are shown as they are.
export function CountUp({ value, duration = 700 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(() => (target !== null && !prefersReducedMotion() ? 0 : target))

  useEffect(() => {
    if (target === null || !inView || prefersReducedMotion()) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  if (target === null) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
    </span>
  )
}
