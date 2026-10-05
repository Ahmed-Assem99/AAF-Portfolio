import { ArrowUp } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { Container } from './ui/Container'
import { GithubIcon } from './ui/GithubIcon'
import { Logo } from './ui/Logo'

const year = new Date().getFullYear()

// 88×31 web badges, the way 90s sites credited their tools.
const badges = [
  { top: 'BUILT WITH', bottom: 'REACT', color: '#61dafb' },
  { top: 'WRITTEN IN', bottom: 'TYPESCRIPT', color: '#3178c6' },
  { top: 'STYLED WITH', bottom: 'TAILWIND', color: '#38bdf8' },
  { top: 'HOSTED ON', bottom: 'VERCEL', color: '#ffffff' },
  { top: 'BEST VIEWED IN', bottom: 'ANY BROWSER', color: '#5af78e' },
]

export function Footer() {
  return (
    <footer className="border-t border-line-strong py-12">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo variant="full" />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Web apps, websites and digital products by {site.name}.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-16 font-pixel text-sm">
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-muted hover:text-fg hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${site.email}`} className="text-muted hover:text-fg hover:underline">
                Email
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted hover:text-fg hover:underline"
              >
                <GithubIcon className="size-3.5" /> GitHub
              </a>
            </li>
            <li>
              <a href={site.store} target="_blank" rel="noreferrer" className="text-muted hover:text-fg hover:underline">
                Template store
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="mt-10">
        <ul className="flex flex-wrap gap-2" aria-label="Built with">
          {badges.map((b) => (
            <li
              key={b.bottom}
              className="badge-88 flex h-[31px] w-[88px] flex-col items-center justify-center border border-[#4d5a78] bg-black font-pixel leading-none"
            >
              <span className="text-[8px] tracking-wide text-[#a7b0bf]">{b.top}</span>
              <span className="mt-0.5 text-[11px] font-semibold" style={{ color: b.color }}>
                {b.bottom}
              </span>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-6 font-pixel text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.brand}. Built with React, TypeScript & Tailwind CSS.
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 hover:text-fg">
          Back to top <ArrowUp className="size-3.5" />
        </a>
      </Container>
    </footer>
  )
}
