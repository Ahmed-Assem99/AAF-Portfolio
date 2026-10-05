import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useInView'

// A small Space Invaders scene that plays in the empty side margins of wide screens.
// Aliens march down in formation, a cannon at the bottom picks them off, and hovering
// an alien zaps it for points. It is purely decorative and never covers page content.

const CONTENT_WIDTH = 1152 // max-w-6xl, the page's content column
const MIN_GUTTER = 104 // below this the margins are too narrow to play in
const TOP_OFFSET = 52 // height of the fixed taskbar
const PX = 3 // size of one sprite pixel
const CELL_W = 44
const ROW_H = 72
const FPS = 30
const HI_KEY = 'aaf-invaders-hi'

type Sprite = string[]

const SPRITES: { frames: [Sprite, Sprite]; points: number }[] = [
  {
    points: 30,
    frames: [
      ['...XX...', '..XXXX..', '.XXXXXX.', 'XX.XX.XX', 'XXXXXXXX', '..X..X..', '.X.XX.X.', 'X.X..X.X'],
      ['...XX...', '..XXXX..', '.XXXXXX.', 'XX.XX.XX', 'XXXXXXXX', '.X.XX.X.', 'X......X', '.X....X.'],
    ],
  },
  {
    points: 20,
    frames: [
      ['..X.....X..', '...X...X...', '..XXXXXXX..', '.XX.XXX.XX.', 'XXXXXXXXXXX', 'X.XXXXXXX.X', 'X.X.....X.X', '...XX.XX...'],
      ['..X.....X..', 'X..X...X..X', 'X.XXXXXXX.X', 'XXX.XXX.XXX', 'XXXXXXXXXXX', '.XXXXXXXXX.', '..X.....X..', '.X.......X.'],
    ],
  },
  {
    points: 10,
    frames: [
      ['....XXXX....', '.XXXXXXXXXX.', 'XXXXXXXXXXXX', 'XXX..XX..XXX', 'XXXXXXXXXXXX', '...XX..XX...', '..XX.XX.XX..', 'XX........XX'],
      ['....XXXX....', '.XXXXXXXXXX.', 'XXXXXXXXXXXX', 'XXX..XX..XXX', 'XXXXXXXXXXXX', '..XXX..XXX..', '.XX..XX..XX.', '..XX....XX..'],
    ],
  },
]

const BOOM: Sprite = ['...X...X...', '.X..X.X..X.', '..X.....X..', 'XX.......XX', '..X.....X..', '.X..X.X..X.', '...X...X...']
const CANNON: Sprite = ['......X......', '.....XXX.....', '.....XXX.....', '.XXXXXXXXXXX.', 'XXXXXXXXXXXXX', 'XXXXXXXXXXXXX', 'XXXXXXXXXXXXX']

function drawSprite(ctx: CanvasRenderingContext2D, sprite: Sprite, x: number, y: number, color: string) {
  ctx.fillStyle = color
  sprite.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (row[c] === 'X') ctx.fillRect(Math.round(x + c * PX), Math.round(y + r * PX), PX, PX)
    }
  })
}

interface Alien {
  row: number
  col: number
  alive: boolean
  boomUntil: number
}

interface Shared {
  score: number
  hi: number
}

function readHi() {
  try {
    return Number(localStorage.getItem(HI_KEY)) || 0
  } catch {
    return 0
  }
}

function saveHi(hi: number) {
  try {
    localStorage.setItem(HI_KEY, String(hi))
  } catch {
    // Storage can be blocked; the high score just won't survive a reload.
  }
}

function themeColors() {
  const s = getComputedStyle(document.documentElement)
  const v = (name: string) => s.getPropertyValue(name).trim()
  return { alien: v('--accent'), alt: v('--accent-text'), cannon: v('--term-fg'), text: v('--muted'), fg: v('--fg') }
}

export function ArcadeGutters() {
  const leftRef = useRef<HTMLCanvasElement>(null)
  const rightRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvases = [leftRef.current, rightRef.current]
    if (canvases.some((c) => !c)) return
    const still = prefersReducedMotion()
    const shared: Shared = { score: 0, hi: readHi() }

    // One game per side; they share the score.
    const games = canvases.map((canvas, side) => {
      const ctx = canvas!.getContext('2d')!
      return {
        canvas: canvas!,
        ctx,
        side,
        w: 0,
        h: 0,
        cols: 0,
        rows: 0,
        aliens: [] as Alien[],
        offset: side * (ROW_H / 2),
        cannonX: 0,
        bullet: null as null | { x: number; y: number },
        nextShot: 1500 + side * 700,
      }
    })

    let colors = themeColors()
    let visible = false
    let raf = 0
    let last = 0
    let elapsed = 0

    const layout = () => {
      const gutter = (window.innerWidth - CONTENT_WIDTH) / 2 - 12
      visible = gutter >= MIN_GUTTER
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const g of games) {
        g.canvas.style.display = visible ? 'block' : 'none'
        if (!visible) continue
        g.w = Math.floor(gutter)
        g.h = window.innerHeight - TOP_OFFSET
        g.canvas.width = g.w * dpr
        g.canvas.height = g.h * dpr
        g.canvas.style.width = `${g.w}px`
        g.canvas.style.height = `${g.h}px`
        g.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        g.ctx.imageSmoothingEnabled = false
        g.cols = Math.max(1, Math.min(g.w >= 170 ? 3 : 2, Math.floor((g.w - 12) / CELL_W)))
        g.rows = Math.ceil((g.h - 60) / ROW_H) + 1
        g.aliens = []
        for (let r = 0; r < g.rows; r++) {
          for (let c = 0; c < g.cols; c++) g.aliens.push({ row: r, col: c, alive: true, boomUntil: 0 })
        }
        g.cannonX = g.w / 2
      }
    }

    const fieldHeight = (g: (typeof games)[number]) => g.h - 56
    const alienPos = (g: (typeof games)[number], a: Alien, t: number) => {
      const span = g.rows * ROW_H
      const y = ((a.row * ROW_H + g.offset) % span) - ROW_H + 34
      const sway = still ? 0 : Math.floor(t / 600) % 2 === 0 ? -4 : 4
      const used = g.cols * CELL_W
      const x = (g.w - used) / 2 + a.col * CELL_W + 4 + sway
      return { x, y }
    }

    const kill = (a: Alien, now: number) => {
      a.alive = false
      a.boomUntil = now + 320
      shared.score += SPRITES[a.row % SPRITES.length].points
      if (shared.score > shared.hi) {
        shared.hi = shared.score
        saveHi(shared.hi)
      }
    }

    const step = (g: (typeof games)[number], dt: number, now: number) => {
      if (still) return
      g.offset += dt * 0.012
      // Zapped aliens come back to life once they wrap round to the top again.
      for (const a of g.aliens) {
        const { y } = alienPos(g, a, now)
        if (y < 30 && !a.alive && now > a.boomUntil) a.alive = true
      }

      // The cannon drifts towards the lowest live alien and fires at it.
      const targets = g.aliens
        .filter((a) => a.alive)
        .map((a) => ({ a, ...alienPos(g, a, now) }))
        .filter((p) => p.y < fieldHeight(g) - 20)
        .sort((p, q) => q.y - p.y)
      const target = targets[0]
      if (target) g.cannonX += Math.sign(target.x + 16 - g.cannonX) * Math.min(Math.abs(target.x + 16 - g.cannonX), dt * 0.06)

      g.nextShot -= dt
      if (!g.bullet && g.nextShot <= 0) {
        g.bullet = { x: g.cannonX, y: g.h - 30 }
        g.nextShot = 1400 + Math.random() * 1600
      }
      if (g.bullet) {
        g.bullet.y -= dt * 0.35
        for (const t of targets) {
          const w = SPRITES[t.a.row % SPRITES.length].frames[0][0].length * PX
          if (g.bullet.x >= t.x && g.bullet.x <= t.x + w && g.bullet.y >= t.y && g.bullet.y <= t.y + 8 * PX) {
            kill(t.a, now)
            g.bullet = null
            break
          }
        }
        if (g.bullet && g.bullet.y < 20) g.bullet = null
      }
    }

    const draw = (g: (typeof games)[number], now: number) => {
      const { ctx } = g
      ctx.clearRect(0, 0, g.w, g.h)

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 26, g.w, fieldHeight(g) - 26)
      ctx.clip()
      const frame = still ? 0 : Math.floor(now / 600) % 2
      for (const a of g.aliens) {
        const { x, y } = alienPos(g, a, now)
        // Only whole sprites inside the playfield, so nothing shows half-clipped at the edges.
        if (y < 28 || y + 8 * PX > fieldHeight(g)) continue
        const kind = SPRITES[a.row % SPRITES.length]
        ctx.globalAlpha = 0.75
        if (a.alive) drawSprite(ctx, kind.frames[frame], x, y, a.row % 3 === 1 ? colors.alt : colors.alien)
        else if (now < a.boomUntil) {
          ctx.globalAlpha = 1
          drawSprite(ctx, BOOM, x, y, colors.fg)
        }
      }
      ctx.globalAlpha = 1
      ctx.restore()

      if (g.bullet) {
        ctx.fillStyle = colors.fg
        ctx.fillRect(Math.round(g.bullet.x) - 1, Math.round(g.bullet.y), PX, PX * 3)
      }

      // Ground line and cannon.
      ctx.fillStyle = colors.cannon
      ctx.fillRect(4, g.h - 6, g.w - 8, 2)
      drawSprite(ctx, CANNON, g.cannonX - (13 * PX) / 2, g.h - 30, colors.cannon)

      ctx.fillStyle = colors.text
      ctx.font = '600 13px "Pixelify Sans Variable", "Pixelify Sans", monospace'
      ctx.textBaseline = 'top'
      const label = g.side === 0 ? `SCORE ${String(shared.score).padStart(4, '0')}` : `HI ${String(shared.hi).padStart(4, '0')}`
      ctx.textAlign = 'center'
      ctx.fillText(label, g.w / 2, 6)
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      const dt = Math.min(100, now - (last || now))
      elapsed += dt
      last = now
      if (elapsed < 1000 / FPS) return
      for (const g of games) {
        step(g, elapsed, now)
        draw(g, now)
      }
      elapsed = 0
    }

    // Hovering an alien zaps it.
    const onMove = (g: (typeof games)[number]) => (e: PointerEvent) => {
      const rect = g.canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const now = performance.now()
      for (const a of g.aliens) {
        if (!a.alive) continue
        const { x, y } = alienPos(g, a, now)
        const w = SPRITES[a.row % SPRITES.length].frames[0][0].length * PX
        if (mx >= x - 2 && mx <= x + w + 2 && my >= y - 2 && my <= y + 8 * PX + 2 && y > 26 && y < fieldHeight(g)) {
          kill(a, now)
          if (still) draw(g, now)
          break
        }
      }
    }
    const handlers = games.map((g) => {
      const h = onMove(g)
      g.canvas.addEventListener('pointermove', h)
      return h
    })

    const themeObserver = new MutationObserver(() => {
      colors = themeColors()
      if (still) games.forEach((g) => draw(g, performance.now()))
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const onResize = () => {
      layout()
      if (still && visible) games.forEach((g) => draw(g, performance.now()))
    }
    window.addEventListener('resize', onResize)
    layout()
    if (still) {
      if (visible) games.forEach((g) => draw(g, performance.now()))
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      themeObserver.disconnect()
      games.forEach((g, i) => g.canvas.removeEventListener('pointermove', handlers[i]))
    }
  }, [])

  const base = 'pointer-events-auto fixed z-10 hidden cursor-crosshair'
  return (
    <div aria-hidden="true">
      <canvas ref={leftRef} className={`${base} left-1.5`} style={{ top: TOP_OFFSET }} />
      <canvas ref={rightRef} className={`${base} right-1.5`} style={{ top: TOP_OFFSET }} />
    </div>
  )
}
