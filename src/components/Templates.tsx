import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react'
import { site } from '../data/site'
import { Container } from './ui/Container'
import { AafMark } from './ui/Logo'
import { Reveal } from './ui/Reveal'
import { Window } from './ui/Window'

const included = [
  'Built with React, TypeScript and Tailwind CSS',
  'Responsive layouts that work from phone to desktop',
  'Clean, commented code that’s easy to customize',
  'Ready to deploy on Vercel in minutes',
]

// Promotes the template store on Gumroad. Purchases happen on Gumroad itself.
export function Templates() {
  return (
    <section id="templates" className="py-28 sm:py-36">
      <Container>
        <Reveal>
          <Window title="Template Store - AAF Studio" bodyClassName="p-6 sm:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="lg:col-span-7">
                <p className="flex items-center gap-2 font-pixel text-sm text-muted uppercase">
                  <span className="bg-accent px-1.5 py-0.5 text-accent-fg">03</span>
                  Templates
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
          </Window>
        </Reveal>
      </Container>
    </section>
  )
}

function StoreCard() {
  return (
    <div className="bevel bg-surface p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <span className="bevel grid size-14 shrink-0 place-items-center bg-[#0b0f17] text-white">
          <AafMark className="h-4 w-auto" />
        </span>
        <div className="min-w-0">
          <p className="font-medium">{site.brand} templates</p>
          <p className="text-sm text-muted">Sold on Gumroad</p>
        </div>
      </div>

      <p className="bevel-in mt-5 truncate bg-surface-2 px-3 py-2 font-pixel text-sm">{site.storeLabel}</p>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        Browse the collection, see what each template includes and check out securely on Gumroad. Downloads are
        delivered straight to your inbox.
      </p>

      <a href={site.store} target="_blank" rel="noreferrer" className="btn95 btn95-primary mt-6 w-full px-6 py-4 text-base">
        <ShoppingBag className="size-4" aria-hidden="true" />
        Browse templates
        <ArrowUpRight className="size-4" />
      </a>
      <p className="mt-3 text-center text-xs text-subtle">Opens Gumroad in a new tab</p>
    </div>
  )
}
