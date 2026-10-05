export function TechList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Tech stack">
      {items.map((item) => (
        <li key={item} className="chip bevel-in bg-surface-2 px-2 py-1 font-pixel text-xs text-muted">
          {item}
        </li>
      ))}
    </ul>
  )
}
