// A pixel-art ► arrow, like the submenu arrows in Windows 95 menus. Used as a list bullet.
export function PixelBullet({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      className={`h-[10px] w-[10px] shrink-0 text-accent-text ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 0h1v7H0zM1 1h2v5H1zM3 2h2v3H3zM5 3h2v1H5z" />
    </svg>
  )
}
