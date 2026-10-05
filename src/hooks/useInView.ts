import { useEffect, useState, type RefObject } from 'react'

// True once the element has scrolled into view. It stays true afterwards.
export function useInView(ref: RefObject<Element | null>, rootMargin = '0px 0px -10% 0px') {
  // Without IntersectionObserver (very old browsers) everything counts as visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin, inView])

  return inView
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
