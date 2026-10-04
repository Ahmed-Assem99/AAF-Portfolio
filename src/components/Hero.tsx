import { ArrowDown, ArrowRight, MapPin } from 'lucide-react'
import cosmos from '../assets/projects/cosmos.webp'
import lumen from '../assets/projects/lumen.webp'
import nutriplan from '../assets/projects/nutriplan.webp'
import { heroStats, site } from '../data/site'
import { BrowserFrame } from './ui/BrowserFrame'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-4 pl-3 text-sm text-muted backdrop-blur">
              <span className="relative flex size-2">
                <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance & collaborations
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.75rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.6rem]">
              I build web products & the{' '}
              <em className="font-serif font-normal tracking-normal text-accent-text">AI automations</em> that run
              behind them.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              I’m {site.shortName}, a full stack developer and the person behind{' '}
              <span className="text-fg">{site.brand}</span>. I ship React & TypeScript interfaces, Node and Python
              APIs, and n8n + LLM pipelines that take the busywork off your team.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              Start a project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="size-3.5" /> {site.location}
            </span>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative lg:col-span-5">
          <HeroCollage />
        </Reveal>
      </Container>

      <Container className="relative mt-20">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-bg px-6 py-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-medium tracking-tight">{stat.value}</span>
                  <span className="mt-1 block text-sm text-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}

function HeroCollage() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
      <BrowserFrame className="absolute top-0 right-0 w-[78%] rotate-3 opacity-90">
        <img src={cosmos} alt="" className="aspect-[16/10] w-full object-cover object-top" />
      </BrowserFrame>
      <BrowserFrame className="absolute top-[22%] left-0 w-[78%] -rotate-2">
        <img src={nutriplan} alt="" className="aspect-[16/10] w-full object-cover object-top" />
      </BrowserFrame>
      <BrowserFrame className="absolute right-[6%] bottom-0 w-[74%] rotate-1">
        <img
          src={lumen}
          alt="Screenshots of COSMOS, NutriPlan and Lumen, three projects from this portfolio"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </BrowserFrame>

      <div className="animate-float absolute -bottom-6 -left-2 rounded-xl border border-line bg-surface/95 p-3.5 font-mono text-[11px] leading-relaxed shadow-card backdrop-blur sm:-left-6">
        <p className="text-subtle">$ n8n workflow:run whatsapp-bot</p>
        <p>
          <span className="text-emerald-500">✓</span> crawled <span className="text-accent-text">42</span> pages
        </p>
        <p>
          <span className="text-emerald-500">✓</span> knowledge base ready
        </p>
        <p>
          <span className="text-emerald-500">✓</span> replying on WhatsApp
        </p>
      </div>
    </div>
  )
}
