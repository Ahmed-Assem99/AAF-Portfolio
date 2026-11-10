import {
  ArrowUpRight,
  Bot,
  FolderOpen,
  Mail,
  Moon,
  Pause,
  Play,
  Power,
  ShoppingBag,
  Star,
  Sun,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { navLinks, site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMotion } from '../hooks/useMotion'
import { useTheme } from '../hooks/useTheme'
import { ShutDownScreen } from './ShutDownScreen'
import { GithubIcon } from './ui/GithubIcon'
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
  const [shutDown, setShutDown] = useState(false)
  const { theme, toggle } = useTheme()
  const { paused, toggle: toggleMotion } = useMotion()
  const time = useClock()
  const menuRef = useRef<HTMLDivElement>(null)
  const startRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      startRef.current?.focus()
    }
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
            ref={startRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="start-menu"
            className="btn95 h-9 px-2.5 text-sm font-bold"
          >
            <AafMark className="h-3 w-auto" />
            Start
          </button>

          {open && (
            <StartMenu
              onNavigate={() => setOpen(false)}
              onShutDown={() => {
                setOpen(false)
                setShutDown(true)
              }}
            />
          )}
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
          <div className="bevel-in flex h-9 items-center gap-1 px-1.5">
            <button
              type="button"
              onClick={toggleMotion}
              aria-label={paused ? 'Play animations' : 'Pause animations'}
              title={paused ? 'Play animations' : 'Pause animations'}
              className="grid size-7 place-items-center text-muted hover:text-fg"
            >
              {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="grid size-7 place-items-center text-muted hover:text-fg"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <span className="ml-1 hidden font-pixel text-sm tabular-nums min-[400px]:inline">
              <span className="sr-only">Local time </span>
              {time}
            </span>
          </div>
        </div>
      </div>

      {shutDown && (
        <ShutDownScreen
          onRestart={() => {
            setShutDown(false)
            startRef.current?.focus()
          }}
        />
      )}
    </header>
  )
}

const menuIcons: Record<string, LucideIcon> = {
  services: Wrench,
  work: Star,
  projects: FolderOpen,
  templates: ShoppingBag,
  about: User,
  automation: Bot,
  contact: Mail,
}

function StartMenu({ onNavigate, onShutDown }: { onNavigate: () => void; onShutDown: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const item =
    'flex w-full items-center gap-3 px-3 py-2.5 text-left font-pixel text-[15px] hover:bg-accent hover:text-accent-fg focus-visible:bg-accent focus-visible:text-accent-fg focus-visible:outline-none'
  const links = [...navLinks, { id: 'automation', label: 'Automation' }, { id: 'contact', label: 'Contact' }]

  const items = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('a, button') ?? [])

  // The menu takes focus when it opens, and the arrow keys move through it.
  useEffect(() => {
    items()[0]?.focus()
  }, [])

  const onKeyDown = (e: ReactKeyboardEvent) => {
    const all = items()
    const i = all.indexOf(document.activeElement as HTMLElement)
    const go = (n: number) => {
      e.preventDefault()
      all[(n + all.length) % all.length]?.focus()
    }
    if (e.key === 'ArrowDown') go(i + 1)
    else if (e.key === 'ArrowUp') go(i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(all.length - 1)
  }

  return (
    <div
      ref={ref}
      id="start-menu"
      onKeyDown={onKeyDown}
      className="win no-lift absolute top-[calc(100%+6px)] left-0 flex w-72 max-w-[calc(100vw-1rem)]"
    >
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
          {links.map((link) => {
            const Icon = menuIcons[link.id]
            return (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={onNavigate} className={item}>
                  {Icon && <Icon className="size-5 shrink-0" aria-hidden="true" />}
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="mx-2 my-1 h-0.5 bevel-in" aria-hidden="true" />
        <ul>
          <li>
            <a
              href={site.store}
              target="_blank"
              rel="noreferrer"
              onClick={onNavigate}
              aria-label="Template store (opens in a new tab)"
              className={item}
            >
              <ShoppingBag className="size-5 shrink-0" aria-hidden="true" />
              Template store <ArrowUpRight className="ml-auto size-4" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              onClick={onNavigate}
              aria-label="GitHub (opens in a new tab)"
              className={item}
            >
              <GithubIcon className="size-5 shrink-0" />
              GitHub <ArrowUpRight className="ml-auto size-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <div className="mx-2 my-1 h-0.5 bevel-in" aria-hidden="true" />
        <button type="button" onClick={onShutDown} className={item}>
          <Power className="size-5 shrink-0" aria-hidden="true" />
          Shut Down…
        </button>
      </nav>
    </div>
  )
}
