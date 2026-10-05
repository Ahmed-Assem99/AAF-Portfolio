import { ArrowDown, ArrowRight, MapPin } from 'lucide-react'
import type { CSSProperties } from 'react'
import cosmos from '../assets/projects/cosmos.webp'
import lumen from '../assets/projects/lumen.webp'
import nutriplan from '../assets/projects/nutriplan.webp'
import { heroStats, site } from '../data/site'
import { BrowserFrame } from './ui/BrowserFrame'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'
import { Reveal } from './ui/Reveal'
import { CountUp } from './ui/CountUp'
import { Window } from './ui/Window'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-20 sm:pt-10">
      <Container className="relative">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <a href="#top" aria-label="AAF Studio, back to top">
            <Logo />
          </a>
          <p className="bevel-in inline-flex items-center gap-2.5 bg-surface-2 px-3 py-1.5 font-pixel text-sm text-muted">
            <span className="relative flex size-2">
              <span className="animate-ping-soft absolute inline-flex size-full bg-emerald-500" />
              <span className="relative inline-flex size-2 bg-emerald-500" />
            </span>
            Available for freelance & collaborations
          </p>
        </Reveal>
      </Container>

      <Container className="relative mt-16 grid items-center gap-16 sm:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-term text-xl text-term">C:\AAF_STUDIO&gt; whoami</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-4 text-[2.75rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.6rem]">
              I design and build <span className="text-accent-text">digital products</span> for the web
              <span className="animate-blink ml-1 inline-block h-[0.8em] w-[0.42em] translate-y-[0.08em] bg-accent" aria-hidden="true" />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              I’m {site.shortName}, a full stack developer and the founder of{' '}
              <span className="text-fg">{site.brand}</span>. I build fast, responsive web apps and websites with React
              and TypeScript, backed by Node and Python APIs.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn95 btn95-primary px-5 py-3.5 text-[15px]">
              View my work
              <ArrowDown className="size-4" />
            </a>
            <a href="#contact" className="btn95 px-5 py-3.5 text-[15px]">
              Start a project
              <ArrowRight className="size-4" />
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
          <Window title="System Properties" bodyClassName="p-3 sm:p-4">
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bevel-in bg-surface-2 px-4 py-4">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-pixel text-3xl tracking-tight">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="mt-1 block text-sm text-muted">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Window>
        </Reveal>
      </Container>
    </section>
  )
}

const buildLog = ['C:\\> npm run build', '✓ type-checked with TypeScript', '✓ production build ready', '✓ deployed to Vercel']

function HeroCollage() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
      <BrowserFrame url="COSMOS.exe" className="absolute top-0 right-0 w-[78%]">
        <img src={cosmos} alt="" className="glitch aspect-[16/10] w-full object-cover object-top" />
      </BrowserFrame>
      <BrowserFrame url="NutriPlan.exe" className="absolute top-[22%] left-0 w-[78%]">
        <img src={nutriplan} alt="" className="glitch aspect-[16/10] w-full object-cover object-top" />
      </BrowserFrame>
      <BrowserFrame url="Lumen.exe" className="absolute right-[6%] bottom-0 w-[74%]">
        <img
          src={lumen}
          alt="Screenshots of COSMOS, NutriPlan and Lumen, three projects from this portfolio"
          className="glitch aspect-[16/10] w-full object-cover object-top"
        />
      </BrowserFrame>

      <Window title="MS-DOS Prompt" boot={false} className="no-lift animate-float absolute -bottom-8 -left-2 w-60 sm:-left-6">
        <div className="is-running mt-[3px] min-h-[6.2rem] bg-black px-3 py-2 font-term text-[17px] leading-tight text-[#5af78e]">
          {buildLog.map((line, i) => (
            <p
              key={line}
              className={`type-line ${i === 0 ? 'text-[#a7b0bf]' : ''}`}
              style={{ '--chars': line.length, '--type-delay': `${600 + i * 260}ms` } as CSSProperties}
            >
              {line}
            </p>
          ))}
        </div>
      </Window>
    </div>
  )
}
