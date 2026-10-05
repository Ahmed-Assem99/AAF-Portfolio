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
      <p className="flex items-center gap-2 font-pixel text-sm text-muted uppercase">
        <span className="bg-accent px-1.5 py-0.5 text-accent-fg">{index}</span>
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-medium tracking-tight text-balance sm:text-5xl">{title}</h2>
      {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  )
}
