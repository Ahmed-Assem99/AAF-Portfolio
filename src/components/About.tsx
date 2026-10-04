import { site, skills } from '../data/site'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-28 sm:py-36">
      <Container>
        <SectionHeading index="05" eyebrow="About" title="The person behind the studio." />

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-serif text-3xl leading-tight text-balance sm:text-4xl">
              I like building things that look good and{' '}
              <span className="text-accent-text italic">quietly save people hours.</span>
            </p>
            <p className="mt-6 font-mono text-sm text-muted">
              {site.name} <span className="text-subtle">· AAF</span>
            </p>
          </Reveal>

          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              I started with hand-written HTML and CSS landing pages, moved on to vanilla JavaScript apps that talk to
              real APIs, and today I build typed React applications with{' '}
              <span className="text-fg">TypeScript, Tailwind and modern tooling</span>.
            </p>
            <p>
              Alongside the front end, I work on the backend (Node, Express, MongoDB, Python and FastAPI) and on what I
              enjoy most: <span className="text-fg">LLM-powered automation</span>. That means RAG chatbots, document
              pipelines and n8n workflows with sensible token budgets, fallbacks and logging.
            </p>
            <p>
              I design for both English and Arabic users, including full right-to-left layouts, and I care about the
              unglamorous parts: accessibility, performance and code the next developer can read.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.group} className="bg-bg p-6">
                <h3 className="font-mono text-xs tracking-wider text-accent-text uppercase">{group.group}</h3>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
