import { featuredProjects, type Project } from '../data/projects'
import { BrowserFrame } from './ui/BrowserFrame'
import { PixelBullet } from './ui/PixelBullet'
import { Container } from './ui/Container'
import { ProjectLinks } from './ui/ProjectLinks'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechList } from './ui/TechList'

export function FeaturedWork() {
  return (
    <section id="work" className="overflow-x-clip py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Products I’ve designed, built <span className="text-accent-text">and shipped.</span>
            </>
          }
          description="A few projects that show how I work: clean interfaces, real data from real APIs, and the details that make an app feel finished."
        />

        <div className="mt-20 space-y-28 sm:space-y-36">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1
  const host = project.live ? new URL(project.live).host : 'github.com/Ahmed-Assem99'

  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`}>
        <a
          href={project.live ?? project.repo}
          target="_blank"
          rel="noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="group relative block"
        >
          <BrowserFrame url={`${project.title} - ${host}`}>
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="glitch aspect-[16/10] w-full object-cover object-top"
              />
            </div>
          </BrowserFrame>
        </a>
      </Reveal>

      <Reveal delay={120} className="lg:col-span-5">
        <p className="font-pixel text-sm text-subtle">
          <span className="text-accent-text">{String(index + 1).padStart(2, '0')}</span> / {project.tagline}
        </p>
        <h3 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" dir="auto">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        {project.highlights && (
          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed">
                <PixelBullet className="mt-[5px]" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <TechList items={project.tech} className="mt-6" />
        <div className="mt-7">
          <ProjectLinks title={project.title} live={project.live} repo={project.repo} />
        </div>
      </Reveal>
    </article>
  )
}
