export function TechList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Tech stack">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
