import { AppWindow, Bot, LayoutTemplate, Workflow, type LucideIcon } from 'lucide-react'
import { process, services } from '../data/site'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const icons: Record<(typeof services)[number]['icon'], LucideIcon> = {
  app: AppWindow,
  layout: LayoutTemplate,
  bot: Bot,
  workflow: Workflow,
}

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface/50 py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Services · AAF Studio"
          title={
            <>
              One developer, <em className="font-serif font-normal">end to end.</em>
            </>
          }
          description="AAF Studio is how I work with clients. You get one person who owns the interface, the API and the automations around it, so nothing gets lost between handoffs."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            return (
              <Reveal key={service.title} delay={(i % 2) * 80} className="h-full">
                <article className="group h-full rounded-2xl border border-line bg-bg p-7 transition-colors hover:border-line-strong sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-fg transition-transform duration-300 group-hover:-rotate-6">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium tracking-tight">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-20">
          <h3 className="font-mono text-xs tracking-wider text-muted uppercase">How a project runs</h3>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <li key={item.step} className="bg-bg p-6">
                <span className="font-serif text-4xl text-accent-text italic">{item.step}</span>
                <p className="mt-4 font-medium">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}
