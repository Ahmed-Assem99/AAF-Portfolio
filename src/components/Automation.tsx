import {
  Binary,
  BookOpen,
  Bot,
  Database,
  FileText,
  Filter,
  FolderInput,
  Link,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  ScanSearch,
  Scissors,
  Search,
  Send,
  Sheet,
  Sparkles,
  Upload,
  type LucideIcon,
} from 'lucide-react'
import { workflows, type StepIcon, type Workflow } from '../data/projects'
import { Container } from './ui/Container'
import { ProjectLinks } from './ui/ProjectLinks'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { TechList } from './ui/TechList'

const icons: Record<StepIcon, LucideIcon> = {
  link: Link,
  crawl: ScanSearch,
  filter: Filter,
  book: BookOpen,
  bot: Bot,
  chat: MessageCircle,
  upload: Upload,
  split: Scissors,
  embed: Binary,
  database: Database,
  search: Search,
  answer: MessageSquareQuote,
  folder: FolderInput,
  file: FileText,
  sparkles: Sparkles,
  sheet: Sheet,
  mail: Mail,
  send: Send,
}

export function Automation() {
  return (
    <section id="automation" className="relative border-y border-line bg-surface/50 py-28 sm:py-36">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="AI & automation"
          title={
            <>
              Automations that <em className="font-serif font-normal">do the busywork</em> for you.
            </>
          }
          description="Beyond the interface, I build n8n pipelines that connect LLMs to the tools teams already use: Google Drive, Sheets, Gmail and WhatsApp. Answers stay grounded in your data."
        />

        <div className="mt-16 space-y-6">
          {workflows.map((workflow, i) => (
            <Reveal key={workflow.title} delay={i * 60}>
              <WorkflowCard workflow={workflow} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-bg">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 font-mono text-xs text-accent-text">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            n8n workflow
          </p>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">{workflow.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{workflow.summary}</p>
        </div>
        <div className="flex flex-col justify-between gap-6 lg:col-span-5">
          <p className="border-l-2 border-accent pl-4 font-serif text-xl leading-snug italic">{workflow.outcome}</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <TechList items={workflow.tech} />
            <ProjectLinks title={workflow.title} repo={workflow.repo} size="sm" />
          </div>
        </div>
      </div>

      <Pipeline steps={workflow.steps} />
    </article>
  )
}

function Pipeline({ steps }: { steps: Workflow['steps'] }) {
  return (
    <div className="bg-dots relative border-t border-line px-6 py-7 sm:px-8">
      {/* Connector line behind the nodes, visible when they sit in one row. */}
      <svg className="absolute inset-x-8 top-1/2 hidden h-px w-[calc(100%-4rem)] lg:block" aria-hidden="true">
        <line
          x1="0"
          y1="0.5"
          x2="100%"
          y2="0.5"
          stroke="var(--accent)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-flow"
        />
      </svg>
      <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, i) => {
          const Icon = icons[step.icon]
          return (
            <li
              key={step.label}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-3 shadow-card"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent-text">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] text-subtle">step {i + 1}</span>
                <span className="block text-[13px] leading-tight font-medium">{step.label}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
