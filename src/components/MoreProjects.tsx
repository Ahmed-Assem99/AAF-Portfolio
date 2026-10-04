import { useState } from 'react'
import { categories, featuredProjects, moreProjects, type Category, type Project } from '../data/projects'
import { Container } from './ui/Container'
import { ProjectLinks } from './ui/ProjectLinks'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechList } from './ui/TechList'

// The grid shows every project except the featured ones above it.
export function MoreProjects() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const visible = filter === 'all' ? moreProjects : moreProjects.filter((p) => p.category === filter)
  const total = featuredProjects.length + moreProjects.length

  return (
    <section id="projects" className="py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="More projects"
          title={
            <>
              The rest of the <em className="font-serif font-normal">archive.</em>
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
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                    selected ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:border-line-strong hover:text-fg'
                  }`}
                >
                  {cat.label} <span className="font-mono text-xs opacity-60">{count}</span>
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <CodePreview lines={project.preview ?? []} />
        )}
        {project.rtl && (
          <span className="absolute top-3 right-3 rounded-full bg-bg/85 px-2 py-0.5 font-mono text-[10px] text-muted backdrop-blur">
            RTL · العربية
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">{project.tagline}</p>
        <h3 className="mt-1.5 text-lg font-medium tracking-tight" dir="auto">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <TechList items={project.tech} className="mt-4" />
        <div className="mt-auto pt-5">
          <ProjectLinks title={project.title} live={project.live} repo={project.repo} size="sm" />
        </div>
      </div>
    </article>
  )
}

function CodePreview({ lines }: { lines: string[] }) {
  return (
    <div className="bg-dots flex size-full items-center justify-center p-6">
      <pre className="w-full rounded-lg border border-line bg-bg/90 p-4 font-mono text-[11px] leading-6 text-muted shadow-card">
        {lines.map((line, i) => (
          <span key={line} className="block">
            <span className="mr-3 text-subtle select-none">{i + 1}</span>
            {line}
          </span>
        ))}
      </pre>
    </div>
  )
}
