import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react'
import { site } from '../data/site'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { AafMark } from './ui/Logo'

const included = [
  'Built with React, TypeScript and Tailwind CSS',
  'Responsive layouts that work from phone to desktop',
  'Clean, commented code that’s easy to customize',
  'Ready to deploy on Vercel in minutes',
]

// Promotes the template store on Gumroad. Purchases happen on Gumroad itself.
export function Templates() {
  return (
    <section id="templates" className="border-t border-line bg-surface/50 py-28 sm:py-36">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-bg">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[640px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
              aria-hidden="true"
            />

            <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-16 lg:p-16">
              <div className="lg:col-span-7">
                <p className="font-brand text-[11px] tracking-[0.28em] text-muted uppercase">
                  <span className="text-accent-text">03</span> · Templates
                </p>
                <h2 className="mt-5 text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                  Launch faster with <span className="text-accent-text">ready-made templates.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                  The same stack and care I put into client work, packaged as templates you can buy once, make your
                  own and ship.
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <StoreCard />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function StoreCard() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-[#0b0f17] text-white">
          <AafMark className="h-4 w-auto" />
        </span>
        <div className="min-w-0">
          <p className="font-medium">{site.brand} templates</p>
          <p className="truncate font-mono text-xs text-subtle">{site.storeLabel}</p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        Browse the collection, see what each template includes and check out securely on Gumroad. Downloads are
        delivered straight to your inbox.
      </p>

      <a
        href={site.store}
        target="_blank"
        rel="noreferrer"
        className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
      >
        <ShoppingBag className="size-4" aria-hidden="true" />
        Browse templates
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <p className="mt-3 text-center text-xs text-subtle">Opens Gumroad in a new tab</p>
    </div>
  )
}
