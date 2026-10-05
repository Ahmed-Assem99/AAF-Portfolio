import { Check, Copy, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { useCopyEmail } from '../hooks/useCopyEmail'

type ToastState = 'waiting' | 'open' | 'minimized' | 'closed'

const STORAGE_KEY = 'aaf-message-toast'
const SHOW_AFTER_MS = 7000
const SHOW_AFTER_SCROLL = 700

function wasClosed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'closed'
  } catch {
    return false
  }
}

function rememberClosed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'closed')
  } catch {
    // Storage can be blocked; the notification just comes back on the next visit.
  }
}

// A "New Message" notification window that eases in at the bottom right after a short
// visit. It can be minimized to a small tab or closed for the rest of the session, and it
// steps aside while the Contact section itself is on screen.
export function MessageToast() {
  const [state, setState] = useState<ToastState>(() => (wasClosed() ? 'closed' : 'waiting'))
  const [contactVisible, setContactVisible] = useState(false)
  const { copied, copy } = useCopyEmail()

  // Show after a few seconds or once the visitor scrolls past the hero, whichever comes first.
  useEffect(() => {
    if (state !== 'waiting') return
    const show = () => setState((s) => (s === 'waiting' ? 'open' : s))
    const timer = setTimeout(show, SHOW_AFTER_MS)
    const onScroll = () => window.scrollY > SHOW_AFTER_SCROLL && show()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [state])

  // Step aside while the full Contact section is on screen.
  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  const close = () => {
    rememberClosed()
    setState('closed')
  }

  if (state === 'closed' || state === 'waiting') return null

  const panelShown = state === 'open' && !contactVisible
  const tabShown = state === 'minimized' && !contactVisible

  return (
    <>
      <aside
        aria-label="Message from AAF Studio"
        aria-hidden={!panelShown}
        inert={!panelShown}
        data-shown={panelShown}
        onKeyDown={(e) => e.key === 'Escape' && setState('minimized')}
        className="toast win no-lift fixed right-3 bottom-3 z-40 w-[min(22rem,calc(100vw-1.5rem))] sm:right-5 sm:bottom-5"
      >
        <div className="titlebar">
          <Mail className="size-3.5 shrink-0" aria-hidden="true" />
          <div className="min-w-0 flex-1 truncate">New Message</div>
          <span className="flex shrink-0 gap-0.5">
            <button
              type="button"
              onClick={() => setState('minimized')}
              aria-label="Minimize message"
              className="title-btn cursor-pointer"
            >
              _
            </button>
            <button type="button" onClick={close} aria-label="Close message" className="title-btn ml-0.5 cursor-pointer">
              ×
            </button>
          </span>
        </div>

        <div className="flex gap-3 p-3.5">
          <span className="bevel btn95-primary grid size-10 shrink-0 place-items-center" aria-hidden="true">
            <Mail className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="font-pixel text-[15px] font-semibold">Have a project in mind?</p>
            <p className="mt-1 text-sm leading-snug text-muted">
              Tell me about it. I build web apps, websites and landing pages.
            </p>
            <p className="bevel-in mt-3 truncate bg-surface-2 px-2.5 py-1.5 font-pixel text-xs select-all">{site.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}`}
                className="btn95 btn95-primary px-3.5 py-2 text-sm"
              >
                Send email
              </a>
              <button type="button" onClick={copy} className="btn95 px-3 py-2 text-sm">
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                <span aria-live="polite">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <button
        type="button"
        onClick={() => setState('open')}
        aria-hidden={!tabShown}
        tabIndex={tabShown ? 0 : -1}
        data-shown={tabShown}
        className="toast-tab btn95 fixed right-3 bottom-3 z-40 px-3 py-2.5 text-sm sm:right-5 sm:bottom-5"
      >
        <span className="relative flex size-2">
          <span className="animate-ping-soft absolute inline-flex size-full bg-accent" />
          <span className="relative inline-flex size-2 bg-accent" />
        </span>
        <Mail className="size-4" aria-hidden="true" />1 new message
      </button>
    </>
  )
}
