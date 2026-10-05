import { marquee } from '../data/site'
import { TechIcon } from './ui/TechIcon'

// A scrolling ticker, a nod to the old <marquee> tag.
export function StackMarquee() {
  const items = [...marquee, ...marquee]
  return (
    <section aria-label="Technologies I work with" className="marquee overflow-hidden bg-black py-2.5">
      <div className="marquee-track flex w-max gap-8">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-8 font-term text-2xl whitespace-nowrap text-[#5af78e]"
          >
            <span className="flex items-center gap-2.5">
              <TechIcon name={item} className="size-5" />
              {item}
            </span>
            <span className="text-[#1f6bff]" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
