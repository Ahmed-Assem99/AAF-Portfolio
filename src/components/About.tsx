import { site, skills } from '../data/site'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechIcon } from './ui/TechIcon'
import { Window } from './ui/Window'

export function About() {
  return (
    <section id="about" className="py-28 sm:py-36">
      <Container>
        <SectionHeading index="06" eyebrow="About" title="The person behind the studio." />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
              I like building things that look good and{' '}
              <span className="text-accent-text">quietly save people hours.</span>
            </p>
            <p className="mt-6 font-pixel text-sm text-muted">
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
              Alongside the front end, I build the backend that powers it: <span className="text-fg">Node, Express,
              MongoDB, Python and FastAPI</span>. When a product calls for it, I also add AI features such as chatbots
              and n8n automations.
            </p>
            <p>
              I design for both English and Arabic users, including full right-to-left layouts, and I care about the
              unglamorous parts: accessibility, performance and code the next developer can read.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <Window title="Skills.txt" bodyClassName="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.group} className="bevel-in bg-surface-2 p-5">
                <h3 className="font-pixel text-sm text-accent-text uppercase">{group.group}</h3>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <TechIcon name={item} className="size-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Window>
        </Reveal>
      </Container>
    </section>
  )
}
