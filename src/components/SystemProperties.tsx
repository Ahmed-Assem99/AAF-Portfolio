import { heroStats, site } from '../data/site'
import { CountUp } from './ui/CountUp'
import { AafMark } from './ui/Logo'
import { Window } from './ui/Window'

// The hero stats, laid out like the Windows 95 "System Properties" dialog.
export function SystemProperties() {
  return (
    <Window title="System Properties" bootLabel="sysprop" bodyClassName="p-3 sm:p-4">
      <div className="flex font-pixel text-sm" role="presentation">
        <span className="bevel relative z-10 -mb-0.5 bg-surface px-4 pt-1.5 pb-2">General</span>
      </div>

      <div className="bevel bg-surface p-5 sm:p-7">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          <Monitor />

          <dl className="grid gap-6 font-pixel sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted">System:</dt>
              <dd className="mt-2 pl-4 text-[15px] leading-relaxed">
                {site.brand}
                <br />
                Digital products
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Registered to:</dt>
              <dd className="mt-2 pl-4 text-[15px] leading-relaxed">
                {site.name}
                <br />
                Full stack developer
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Computer:</dt>
              <dd className="mt-2 pl-4 text-[15px] leading-relaxed">
                <ul>
                  {heroStats.map((stat) => (
                    <li key={stat.label}>
                      <span className="text-accent-text">
                        <CountUp value={stat.value} />
                      </span>{' '}
                      {stat.label}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <a href="#work" className="btn95 btn95-primary w-24 py-2 text-sm">
          OK
        </a>
        <a href="#contact" className="btn95 w-24 py-2 text-sm">
          Contact
        </a>
      </div>
    </Window>
  )
}

// A small beige-box monitor showing the AAF mark on a blue desktop.
function Monitor() {
  return (
    <div className="mx-auto w-40 shrink-0 md:mx-0" aria-hidden="true">
      <div className="bevel bg-surface p-2.5">
        <div
          className="bevel-in grid aspect-[4/3] place-items-center"
          style={{ background: 'linear-gradient(135deg, var(--title-from), var(--title-to))' }}
        >
          <AafMark className="h-6 w-auto text-white" />
        </div>
        <div className="mt-1.5 flex justify-end">
          <span className="size-1.5 bg-emerald-500" />
        </div>
      </div>
      <div className="mx-auto h-2.5 w-14 bg-surface" style={{ boxShadow: 'inset -1px 0 0 var(--bevel-lo), inset 1px 0 0 var(--bevel-hi)' }} />
      <div className="bevel mx-auto h-3 w-28 bg-surface" />
    </div>
  )
}
