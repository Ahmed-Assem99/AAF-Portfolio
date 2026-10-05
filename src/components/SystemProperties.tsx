import { FolderGit2, Globe, Languages } from 'lucide-react'
import type { ReactNode } from 'react'
import { heroStats, site } from '../data/site'
import { CountUp } from './ui/CountUp'
import { AafMark } from './ui/Logo'
import { TechIcon } from './ui/TechIcon'
import { Window } from './ui/Window'

const statIcons: Record<(typeof heroStats)[number]['icon'], ReactNode> = {
  projects: <FolderGit2 className="size-5" />,
  live: <Globe className="size-5" />,
  stack: (
    <span className="flex gap-1">
      <TechIcon name="React" className="size-5" />
      <TechIcon name="TypeScript" className="size-5" />
    </span>
  ),
  languages: <Languages className="size-5" />,
}

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

          <dl className="grid gap-6 font-pixel sm:grid-cols-2">
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
          </dl>
        </div>

        {/* A Windows-style group box: an etched frame with its label sitting on the border. */}
        <fieldset className="relative mt-8 border-2 border-[var(--bevel-mid)] px-3 pt-5 pb-3 shadow-[1px_1px_0_var(--bevel-hi),inset_1px_1px_0_var(--bevel-hi)] sm:px-4">
          <legend className="bg-surface px-2 font-pixel text-sm text-muted">Computer</legend>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bevel-in flex min-w-0 flex-col bg-surface-2 p-3.5 sm:p-4">
                <span
                  className="bevel mb-4 grid h-10 w-fit min-w-10 place-items-center bg-surface px-2 text-accent-text"
                  aria-hidden="true"
                >
                  {statIcons[stat.icon]}
                </span>
                <dt className="order-2 mt-2 font-pixel text-sm text-muted">{stat.label}</dt>
                <dd
                  className={`order-1 font-pixel leading-none font-semibold whitespace-nowrap text-accent-text ${
                    /^\d/.test(stat.value) ? 'text-4xl sm:text-5xl' : 'text-xl sm:text-2xl lg:text-3xl'
                  }`}
                >
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </fieldset>
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
      <div
        className="mx-auto h-2.5 w-14 bg-surface"
        style={{ boxShadow: 'inset -1px 0 0 var(--bevel-lo), inset 1px 0 0 var(--bevel-hi)' }}
      />
      <div className="bevel mx-auto h-3 w-28 bg-surface" />
    </div>
  )
}
