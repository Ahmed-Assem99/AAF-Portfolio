import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { Container } from './ui/Container'
import { GithubIcon } from './ui/GithubIcon'
import { Reveal } from './ui/Reveal'

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
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
              aria-hidden="true"
            />

            <div className="relative">
              <p className="font-brand text-[11px] tracking-[0.28em] text-muted uppercase">
                <span className="text-accent-text">06</span> · Contact
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-6xl">
                Have a project in mind? <span className="text-accent-text">Let’s build it.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
                Open to freelance work, consulting and collaborations on web apps, websites and landing pages.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-4 text-sm font-medium transition-colors hover:bg-surface-2"
                >
                  {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                  <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
                </button>
              </div>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              >
                <GithubIcon />
                github.com/{site.githubHandle}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
