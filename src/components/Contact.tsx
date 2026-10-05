import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { Container } from './ui/Container'
import { GithubIcon } from './ui/GithubIcon'
import { Reveal } from './ui/Reveal'
import { Window } from './ui/Window'

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" className="pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <Window title="New Message - AAF Studio" bodyClassName="px-5 py-12 text-center sm:px-12 sm:py-20">
            <p className="flex items-center justify-center gap-2 font-pixel text-sm text-muted uppercase">
              <span className="bg-accent px-1.5 py-0.5 text-accent-fg">07</span>
              Contact
            </p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-6xl">
              Have a project in mind? <span className="text-accent-text">Let’s build it.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              Open to freelance work, consulting and collaborations on web apps, websites and landing pages.
            </p>

            <div className="mx-auto mt-10 flex max-w-xl items-stretch text-left">
              <span className="flex items-center px-3 font-pixel text-sm text-muted">To:</span>
              <span className="bevel-in min-w-0 flex-1 truncate bg-surface-2 px-3 py-3 font-pixel text-base select-all">
                {site.email}
              </span>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}`}
                className="btn95 btn95-primary w-full px-7 py-4 text-base sm:w-auto"
              >
                <Mail className="size-4" aria-hidden="true" />
                Send email
              </a>
              <button type="button" onClick={copyEmail} className="btn95 w-full px-6 py-4 text-base sm:w-auto">
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
              </button>
            </div>

            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-pixel text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              <GithubIcon />
              github.com/{site.githubHandle}
              <ArrowUpRight className="size-3.5" />
            </a>
          </Window>
        </Reveal>
      </Container>
    </section>
  )
}
