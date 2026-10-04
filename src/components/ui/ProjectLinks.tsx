import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './GithubIcon'

interface ProjectLinksProps {
  title: string
  live?: string
  repo: string
  size?: 'md' | 'sm'
}

export function ProjectLinks({ title, live, repo, size = 'md' }: ProjectLinksProps) {
  const pad = size === 'md' ? 'px-4 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'
  return (
    <div className="flex flex-wrap gap-2">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title}: live demo (opens in a new tab)`}
          className={`group inline-flex items-center gap-1.5 rounded-full bg-fg font-medium text-bg transition-opacity hover:opacity-85 ${pad}`}
        >
          Live demo
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
      <a
        href={repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${title}: source code on GitHub (opens in a new tab)`}
        className={`inline-flex items-center gap-1.5 rounded-full border border-line-strong font-medium transition-colors hover:bg-surface-2 ${pad}`}
      >
        <GithubIcon className="size-3.5" />
        Code
      </a>
    </div>
  )
}
