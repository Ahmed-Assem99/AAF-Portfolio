import { ArrowRight } from 'lucide-react'
import { workflows, type Workflow } from '../data/projects'
import { Container } from './ui/Container'
import { GithubIcon } from './ui/GithubIcon'
import { Reveal } from './ui/Reveal'
import { TechIcon } from './ui/TechIcon'
import { Window } from './ui/Window'

// A compact strip for the n8n side of the work: present, but secondary to the web projects.
export function Automation() {
  return (
    <section id="automation" className="border-t border-line py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="type-in flex items-center gap-2 font-pixel text-sm text-muted uppercase">
              <span className="bg-accent px-1.5 py-0.5 text-accent-fg">04</span>
              Also on GitHub
            </p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">AI automation with n8n</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Workflows that connect language models to everyday tools like Google Drive, Sheets, Gmail and WhatsApp.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {workflows.map((workflow, i) => (
            <li key={workflow.title}>
              <Reveal delay={i * 60} className="h-full">
                <WorkflowCard workflow={workflow} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Window
      title={<h3 className="truncate">{workflow.title}</h3>}
      bootLabel={workflow.title}
      className="flex h-full flex-col"
      bodyClassName="flex flex-1 flex-col px-3 pt-3 pb-3"
    >
      <p className="text-sm leading-relaxed text-muted">{workflow.summary}</p>

      <ol className="mt-4 mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-pixel text-xs text-subtle">
        {workflow.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight className="size-3 text-accent-text" aria-hidden="true" />}
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line-strong pt-3">
        <ul className="flex min-w-0 flex-wrap items-center gap-2" aria-label="Tech stack">
          {workflow.tech.map((t) => (
            <li key={t} title={t} className="flex items-center gap-1 font-pixel text-xs text-muted">
              <TechIcon name={t} className="size-4" />
              <span className="sr-only sm:not-sr-only">{t}</span>
            </li>
          ))}
        </ul>
        <a
          href={workflow.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${workflow.title}: source code on GitHub (opens in a new tab)`}
          className="btn95 shrink-0 px-2.5 py-1.5 text-xs"
        >
          <GithubIcon className="size-3.5" /> Code
        </a>
      </div>
    </Window>
  )
}
