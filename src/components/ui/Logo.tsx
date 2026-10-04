export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-[11px] font-bold tracking-tight text-accent-fg"
      >
        AAF
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        AAF <span className="font-serif text-lg font-normal italic text-muted">Studio</span>
      </span>
    </span>
  )
}
