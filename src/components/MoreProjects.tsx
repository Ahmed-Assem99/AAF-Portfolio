import { Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { archiveProjects, categories, featuredTitles, type Category, type Project } from '../data/projects'
import { Container } from './ui/Container'
import { PixelBullet } from './ui/PixelBullet'
import { ProjectLinks } from './ui/ProjectLinks'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechList } from './ui/TechList'
import { Window } from './ui/Window'

// Every project, shown as a Windows 95 folder: a grid of thumbnails with a filter toolbar
// and a status bar. Selecting a thumbnail opens that project in its own window.
export function MoreProjects() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [opened, setOpened] = useState<Project | null>(null)
  const visible = filter === 'all' ? archiveProjects : archiveProjects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="All projects"
          title={
            <>
              The full <span className="text-accent-text">archive.</span>
            </>
          }
          description={`All ${archiveProjects.length} projects, newest first: from typed React apps and APIs back to my first hand-coded landing pages. Open any of them for the details.`}
        />

        <Reveal className="mt-10">
          <Window title="C:\AAF_STUDIO\Projects" bootLabel="projects" bodyClassName="pt-[3px]">
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5 p-2">
              {categories.map((cat) => {
                const count =
                  cat.id === 'all' ? archiveProjects.length : archiveProjects.filter((p) => p.category === cat.id).length
                if (count === 0) return null
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={filter === cat.id}
                    onClick={() => setFilter(cat.id)}
                    className="btn95 px-3.5 py-2.5 text-sm"
                  >
                    {cat.label} <span className="text-xs">({count})</span>
                  </button>
                )
              })}
            </div>

            <div className="bevel-in bg-surface-2 p-3 sm:p-4">
              <ul className="grid grid-cols-2 gap-x-1.5 gap-y-4 min-[360px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {visible.map((project) => (
                  <li key={project.title}>
                    <ProjectIcon project={project} onOpen={() => setOpened(project)} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[3px] flex gap-[3px] font-pixel text-xs text-muted">
              <p className="bevel-in px-2.5 py-1.5" aria-live="polite">
                {visible.length} object(s)
              </p>
              <p className="bevel-in min-w-0 flex-1 truncate px-2.5 py-1.5">Select a project to open it</p>
            </div>
          </Window>
        </Reveal>
      </Container>

      {opened && <ProjectDialog project={opened} onClose={() => setOpened(null)} />}
    </section>
  )
}

function Thumbnail({ project }: { project: Project }) {
  if (!project.image) return <CodePreview lines={project.preview ?? []} small />
  return (
    <img
      src={project.image}
      alt=""
      loading="lazy"
      decoding="async"
      width={1440}
      height={900}
      className="aspect-[16/10] h-auto w-full object-cover object-top"
    />
  )
}

function ProjectIcon({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const featured = featuredTitles.has(project.title)
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="folder-item group flex w-full flex-col items-center gap-2 p-1.5 text-center"
    >
      <span className="relative block w-full">
        <span className="bevel block bg-surface p-[3px]">
          <Thumbnail project={project} />
        </span>
        {featured && (
          <span className="bevel btn95-primary absolute -top-1.5 -right-1.5 grid size-5 place-items-center" aria-hidden="true">
            <Star className="size-3 fill-current" />
          </span>
        )}
      </span>
      <span className="folder-label px-1.5 py-0.5 font-pixel text-[13px] leading-tight" dir="auto">
        {project.title}
        {featured && <span className="sr-only"> (featured)</span>}
      </span>
    </button>
  )
}

// A project's details in a modal window. The native <dialog> keeps keyboard focus inside,
// closes on Escape and hands focus back to the thumbnail that opened it.
function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const close = () => ref.current?.close()

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === ref.current && close()}
      className="project-dialog win no-lift"
    >
      <div className="titlebar">
        <div className="min-w-0 flex-1 truncate" dir="auto">
          {project.title}
        </div>
        <button type="button" onClick={close} aria-label="Close" className="title-btn title-btn-lg">
          ×
        </button>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="bevel-in relative mt-[3px] self-start overflow-hidden bg-surface-2 p-[2px]">
          {project.image ? (
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={1440}
              height={900}
              className="aspect-[16/10] h-auto w-full object-cover object-top"
            />
          ) : (
            <CodePreview lines={project.preview ?? []} />
          )}
          {project.rtl && (
            <span className="bevel absolute top-2.5 right-2.5 bg-surface px-2 py-1 font-pixel text-xs text-fg">
              RTL · <span lang="ar">العربية</span>
            </span>
          )}
        </div>

        <div className="flex flex-col px-4 pt-4 pb-4 md:px-5">
          <p className="font-pixel text-xs text-subtle uppercase">{project.tagline}</p>
          <h3 id="project-dialog-title" className="mt-1.5 text-2xl font-medium tracking-tight" dir="auto">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
          {project.highlights && (
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm leading-relaxed">
                  <PixelBullet className="mt-[5px]" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <TechList items={project.tech} className="mt-4" />
          <div className="mt-auto pt-5">
            <ProjectLinks title={project.title} live={project.live} repo={project.repo} size="sm" />
          </div>
        </div>
      </div>
    </dialog>
  )
}

function CodePreview({ lines, small = false }: { lines: string[]; small?: boolean }) {
  return (
    <div className={`flex aspect-[16/10] w-full items-center overflow-hidden bg-black ${small ? 'p-2' : 'p-5'}`}>
      <pre className={`w-full text-left font-term leading-snug text-[#5af78e] ${small ? 'text-[11px]' : 'text-lg'}`} aria-hidden={small}>
        {lines.map((line, i) => (
          <span key={line} className="block">
            <span className="mr-3 text-[#9aa3b2] select-none">{i + 1}</span>
            {line}
          </span>
        ))}
      </pre>
    </div>
  )
}
