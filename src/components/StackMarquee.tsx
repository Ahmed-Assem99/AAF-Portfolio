import { marquee } from '../data/site'

export function StackMarquee() {
  const items = [...marquee, ...marquee]
  return (
    <section aria-label="Technologies I work with" className="marquee overflow-hidden border-y border-line py-5">
      <div
        className="marquee-track flex w-max gap-10"
        style={{ maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)' }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-10 font-mono text-sm whitespace-nowrap text-muted"
          >
            {item}
            <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  )
}
