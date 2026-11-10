import { featuredProjects, type Project } from '../data/projects'
import { BrowserFrame } from './ui/BrowserFrame'
import { PixelBullet } from './ui/PixelBullet'
import { Container } from './ui/Container'
import { ProjectLinks } from './ui/ProjectLinks'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechList } from './ui/TechList'

export function FeaturedWork() {
  const [spotlight, ...rest] = featuredProjects

  return (
    <section id="work" className="overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Products I’ve designed, built <span className="text-accent-text">and shipped.</span>
            </>
          }
          description="A few projects that show how I work: clean interfaces, real data from real APIs, and the details that make an app feel finished."
        />

        <div className="mt-14 space-y-20 sm:space-y-28">
          <SpotlightProject project={spotlight} />
          {rest.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i + 1} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function hostOf(project: Project) {
  return project.live ? new URL(project.live).host : 'github.com/Ahmed-Assem99'
}

// The screenshot is a second, mouse-only way to open the project. Keyboard and screen
// reader users get the same link from the "Live demo" button, so it is hidden from them.
function Screenshot({ project, src, url, className = '' }: { project: Project; src: string; url: string; className?: string }) {
  return (
    <a
      href={project.live ?? project.repo}
      target="_blank"
      rel="noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={`group block ${className}`}
    >
      <BrowserFrame url={url}>
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          width={1440}
          height={900}
          className="glitch aspect-[16/10] h-auto w-full object-cover object-top"
        />
      </BrowserFrame>
    </a>
  )
}

function ProjectNumber({ index, tagline }: { index: number; tagline: string }) {
  return (
    <p className="font-pixel text-sm text-subtle">
      <span className="text-accent-text">{String(index + 1).padStart(2, '0')}</span> / {tagline}
    </p>
  )
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((h) => (
        <li key={h} className="flex gap-3 text-sm leading-relaxed">
          <PixelBullet className="mt-[5px]" />
          {h}
        </li>
      ))}
    </ul>
  )
}

// The first project gets the whole row: its screenshots cascade like two open windows,
// and the write-up sits underneath in two columns.
function SpotlightProject({ project }: { project: Project }) {
  const host = hostOf(project)

  return (
    <article>
      <Reveal className={`relative ${project.altImage ? 'lg:pb-24' : ''}`}>
        {project.image && (
          <Screenshot
            project={project}
            src={project.image}
            url={`${project.title} - ${host}`}
            className={project.altImage ? 'lg:w-[70%]' : ''}
          />
        )}
        {project.altImage && (
          <Screenshot
            project={project}
            src={project.altImage.src}
            url={`${project.title} - ${project.altImage.label}`}
            className="relative z-10 mt-4 ml-auto w-[88%] lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[46%]"
          />
        )}
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
        <Reveal className="min-w-0 lg:col-span-6">
          <ProjectNumber index={0} tagline={project.tagline} />
          <h3 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl" dir="auto">
            {project.title}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>
          <div className="mt-7">
            <ProjectLinks title={project.title} live={project.live} repo={project.repo} />
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0 lg:col-span-6 lg:pt-9">
          {project.highlights && <Highlights items={project.highlights} />}
          <TechList items={project.tech} className="mt-6" />
        </Reveal>
      </div>
    </article>
  )
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 0

  return (
    <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`min-w-0 lg:col-span-7 ${flipped ? 'lg:order-2' : ''}`}>
        {project.image && (
          <Screenshot project={project} src={project.image} url={`${project.title} - ${hostOf(project)}`} />
        )}
      </Reveal>

      <Reveal delay={120} className="min-w-0 lg:col-span-5">
        <ProjectNumber index={index} tagline={project.tagline} />
        <h3 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" dir="auto">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        {project.highlights && (
          <div className="mt-6">
            <Highlights items={project.highlights} />
          </div>
        )}
        <TechList items={project.tech} className="mt-6" />
        <div className="mt-7">
          <ProjectLinks title={project.title} live={project.live} repo={project.repo} />
        </div>
      </Reveal>
    </article>
  )
}
