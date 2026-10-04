import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-3xl">
      <p className="flex items-center gap-3 font-brand text-[11px] tracking-[0.28em] text-muted uppercase">
        <span className="text-accent-text">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-medium tracking-tight text-balance sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  )
}
