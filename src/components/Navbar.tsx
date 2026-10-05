import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { AafMark } from './ui/Logo'

// 'top' is observed too, so no button stays pressed while the hero is in view.
const sectionIds = ['top', ...navLinks.map((link) => link.id)]

function useClock() {
  const format = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000)
    return () => clearInterval(id)
  }, [])
  return time
}

// Site navigation styled as a Windows 95 taskbar, fixed to the top of the screen.
export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { theme, toggle } = useTheme()
  const time = useClock()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-surface"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        boxShadow: 'inset 0 -1px 0 var(--bevel-lo), inset 0 -2px 0 var(--bevel-mid)',
      }}
    >
      <div className="flex h-[3.25rem] items-center gap-1.5 px-1.5 sm:gap-2 sm:px-2">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="start-menu"
            className="btn95 h-9 px-2.5 text-sm font-bold"
          >
            <AafMark className="h-3 w-auto" />
            Start
          </button>

          {open && <StartMenu onNavigate={() => setOpen(false)} />}
        </div>

        <span className="mx-0.5 h-8 w-px bg-line-strong" aria-hidden="true" />

        <nav aria-label="Primary" className="hidden min-w-0 flex-1 md:block">
          <ul className="flex gap-1.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className="btn95 h-9 w-[7.5rem] justify-start px-3 text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <a href="#contact" className="btn95 btn95-primary h-9 px-3.5 text-sm">
            Let’s talk
          </a>
          <div className="bevel-in flex h-9 items-center gap-2 px-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="grid size-6 place-items-center text-muted hover:text-fg"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <span className="font-pixel text-sm tabular-nums" aria-label={`Local time ${time}`}>
              {time}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

function StartMenu({ onNavigate }: { onNavigate: () => void }) {
  const item = 'flex items-center gap-3 px-3 py-2.5 font-pixel text-[15px] hover:bg-accent hover:text-accent-fg focus-visible:bg-accent focus-visible:text-accent-fg focus-visible:outline-none'
  return (
    <div id="start-menu" className="win no-lift absolute top-[calc(100%+6px)] left-0 flex w-72 max-w-[calc(100vw-1rem)]">
      <div
        className="flex w-8 shrink-0 items-end justify-center pb-3"
        style={{ background: 'linear-gradient(180deg, var(--title-from), var(--title-to))' }}
        aria-hidden="true"
      >
        <span className="font-brand text-sm font-semibold tracking-[0.3em] text-white [writing-mode:vertical-rl] rotate-180">
          AAF STUDIO
        </span>
      </div>
      <nav aria-label="Start menu" className="min-w-0 flex-1 py-1">
        <ul>
          {[...navLinks, { id: 'automation', label: 'Automation' }, { id: 'contact', label: 'Contact' }].map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={onNavigate} className={item}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-2 my-1 h-0.5 bevel-in" aria-hidden="true" />
        <ul>
          <li>
            <a href={site.store} target="_blank" rel="noreferrer" onClick={onNavigate} className={item}>
              Template store <ArrowUpRight className="ml-auto size-4" />
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer" onClick={onNavigate} className={item}>
              GitHub <ArrowUpRight className="ml-auto size-4" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
