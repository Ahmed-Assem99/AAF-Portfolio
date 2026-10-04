import { ArrowUp } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { Container } from './ui/Container'
import { GithubIcon } from './ui/GithubIcon'
import { Logo } from './ui/Logo'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo variant="full" />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Web apps, websites and digital products by {site.name}.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-16 text-sm">
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-fg">
                Email
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
              >
                <GithubIcon className="size-3.5" /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="mt-12 flex flex-col-reverse gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.brand}. Built with React, TypeScript & Tailwind CSS.
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
          Back to top <ArrowUp className="size-3.5" />
        </a>
      </Container>
    </footer>
  )
}
