import { useState } from 'react'
import { categories, featuredProjects, moreProjects, type Category, type Project } from '../data/projects'
import { Container } from './ui/Container'
import { ProjectLinks } from './ui/ProjectLinks'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechList } from './ui/TechList'
import { Window } from './ui/Window'

// The grid shows every project except the featured ones above it.
export function MoreProjects() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const visible = filter === 'all' ? moreProjects : moreProjects.filter((p) => p.category === filter)
  const total = featuredProjects.length + moreProjects.length

  return (
    <section id="projects" className="py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="More projects"
          title={
            <>
              The rest of the <span className="text-accent-text">archive.</span>
            </>
          }
          description={`${total} projects and counting, from my first hand-coded landing pages to typed React apps and APIs.`}
        />

        <Reveal className="mt-10">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat.id === 'all' ? moreProjects.length : moreProjects.filter((p) => p.category === cat.id).length
              if (count === 0) return null
              const selected = filter === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(cat.id)}
                  className="btn95 px-3.5 py-2 text-sm"
                >
                  {cat.label} <span className="text-xs opacity-60">{count}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <li key={project.title}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full">
      <Window title={project.title} className="flex h-full flex-col" bodyClassName="flex flex-1 flex-col">
        <div className="bevel-in relative mt-[3px] aspect-[16/10] overflow-hidden bg-surface-2 p-[2px]">
          {project.image ? (
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-top"
            />
          ) : (
            <CodePreview lines={project.preview ?? []} />
          )}
          {project.rtl && (
            <span className="bevel absolute top-2.5 right-2.5 bg-surface px-2 py-1 font-pixel text-[11px] text-fg">
              RTL · العربية
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
          <p className="font-pixel text-xs text-subtle uppercase">{project.tagline}</p>
          <h3 className="mt-1.5 text-lg font-medium tracking-tight" dir="auto">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
          <TechList items={project.tech} className="mt-4" />
          <div className="mt-auto pt-5">
            <ProjectLinks title={project.title} live={project.live} repo={project.repo} size="sm" />
          </div>
        </div>
      </Window>
    </article>
  )
}

function CodePreview({ lines }: { lines: string[] }) {
  return (
    <div className="flex size-full items-center bg-black p-5">
      <pre className="w-full font-term text-lg leading-snug text-[#5af78e]">
        {lines.map((line, i) => (
          <span key={line} className="block">
            <span className="mr-3 text-[#7d879a] select-none">{i + 1}</span>
            {line}
          </span>
        ))}
      </pre>
    </div>
  )
}
