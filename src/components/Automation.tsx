import { ArrowRight } from 'lucide-react'
import { workflows, type Workflow } from '../data/projects'
import { Container } from './ui/Container'
import { GithubIcon } from './ui/GithubIcon'
import { Reveal } from './ui/Reveal'

// A compact strip for the n8n side of the work: present, but secondary to the web projects.
export function Automation() {
  return (
    <section id="automation" className="border-t border-line py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-brand text-[11px] tracking-[0.28em] text-muted uppercase">
              <span className="text-accent-text">03</span> · Also on GitHub
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
    <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
      <h3 className="font-medium tracking-tight">{workflow.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{workflow.summary}</p>

      <ol className="mt-4 mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px] text-subtle">
        {workflow.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight className="size-3 text-accent-text" aria-hidden="true" />}
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="truncate font-mono text-[11px] text-muted">{workflow.tech.join(' · ')}</span>
        <a
          href={workflow.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${workflow.title}: source code on GitHub (opens in a new tab)`}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-fg"
        >
          <GithubIcon className="size-3.5" /> Code
        </a>
      </div>
    </article>
  )
}
