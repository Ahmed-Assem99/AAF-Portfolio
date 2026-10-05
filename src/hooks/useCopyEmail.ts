import { useEffect, useState } from 'react'
import { site } from '../data/site'

// Copies the contact email; falls back to opening the mail app if the clipboard is blocked.
export function useCopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return { copied, copy }
}
