import { AppWindow, Bot, LayoutTemplate, type LucideIcon } from 'lucide-react'
import { process, services } from '../data/site'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { Window } from './ui/Window'

const icons: Record<(typeof services)[number]['icon'], LucideIcon> = {
  app: AppWindow,
  layout: LayoutTemplate,
  bot: Bot,
}

export function Services() {
  return (
    <section id="services" className="py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Services · AAF Studio"
          title={
            <>
              One developer, <span className="text-accent-text">end to end.</span>
            </>
          }
          description="AAF Studio is how I work with clients. You get one person who owns the design, the front end and the API behind it, so nothing gets lost between handoffs."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            return (
              <Reveal key={service.title} delay={i * 80} className="h-full">
                <Window
                  title={`Service_0${i + 1}.exe`}
                  className="flex h-full flex-col"
                  bodyClassName="flex-1 p-5 sm:p-6"
                >
                  <span className="bevel btn95-primary grid size-12 place-items-center">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight">{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {service.points.map((point) => (
                      <li key={point} className="chip bevel-in bg-surface-2 px-2 py-1 font-pixel text-xs text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                </Window>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-20">
          <h3 className="font-pixel text-sm text-muted uppercase">How a project runs</h3>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <li key={item.step} className="bevel-in bg-surface-2 p-5">
                <span className="font-pixel text-3xl text-accent-text">{item.step}</span>
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
