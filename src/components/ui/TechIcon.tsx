import {
  BellRing,
  Binary,
  Bot,
  CircleHelp,
  Code,
  Database,
  Flame,
  Languages,
  Plug,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import {
  siAxios,
  siBootstrap,
  siClaude,
  siCss,
  siDocker,
  siEslint,
  siExpress,
  siFastapi,
  siFramer,
  siGit,
  siGmail,
  siGoogle,
  siGoogledrive,
  siGooglegemini,
  siHeroui,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siLangchain,
  siLucide,
  siMongodb,
  siN8n,
  siNodedotjs,
  siNotion,
  siOllama,
  siOpenrouter,
  siPlotly,
  siPython,
  siReact,
  siReacthookform,
  siReactrouter,
  siSqlalchemy,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siWhatsapp,
  siZod,
  type SimpleIcon,
} from 'simple-icons'

// Brand logos (simple-icons) matched by tech name, checked in order, so the more specific
// names come first ("React Router" before "React").
const brands: [RegExp, SimpleIcon][] = [
  [/^react router/, siReactrouter],
  [/^react hook form/, siReacthookform],
  [/^react/, siReact],
  [/typescript/, siTypescript],
  [/javascript/, siJavascript],
  [/tailwind/, siTailwindcss],
  [/bootstrap/, siBootstrap],
  [/^html/, siHtml5],
  [/^css/, siCss],
  [/^zod/, siZod],
  [/^node/, siNodedotjs],
  [/^express/, siExpress],
  [/mongo/, siMongodb],
  [/^python/, siPython],
  [/fastapi/, siFastapi],
  [/sqlalchemy/, siSqlalchemy],
  [/sqlite/, siSqlite],
  [/jwt/, siJsonwebtokens],
  [/n8n/, siN8n],
  [/claude/, siClaude],
  [/gemini/, siGooglegemini],
  [/openrouter/, siOpenrouter],
  [/ollama/, siOllama],
  [/langchain/, siLangchain],
  [/framer/, siFramer],
  [/^git/, siGit],
  [/^vite/, siVite],
  [/vercel/, siVercel],
  [/docker/, siDocker],
  [/eslint/, siEslint],
  [/notion/, siNotion],
  [/plotly/, siPlotly],
  [/axios/, siAxios],
  [/heroui/, siHeroui],
  [/lucide/, siLucide],
  [/whatsapp/, siWhatsapp],
  [/gmail/, siGmail],
  [/drive/, siGoogledrive],
  [/google/, siGoogle],
]

// Pictograms for tools without an official logo in simple-icons, and for general terms.
const pictograms: [RegExp, LucideIcon][] = [
  [/openai|llm/, Sparkles],
  [/rest|api/, Plug],
  [/rag|vector|database/, Database],
  [/embedding/, Binary],
  [/firecrawl/, Flame],
  [/sweetalert/, BellRing],
  [/trivia/, CircleHelp],
  [/rtl|arabic/, Languages],
  [/bot|chat/, Bot],
]

// Very dark brand colours (Express, Vercel, Notion…) would vanish on the dark theme,
// so those logos use the text colour instead.
function isDark(hex: string) {
  const n = parseInt(hex, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70
}

export function TechIcon({ name, className = 'size-3.5' }: { name: string; className?: string }) {
  const key = name.toLowerCase()
  const brand = brands.find(([re]) => re.test(key))?.[1]

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={`shrink-0 ${className}`}
        fill={isDark(brand.hex) ? 'currentColor' : `#${brand.hex}`}
        aria-hidden="true"
      >
        <path d={brand.path} />
      </svg>
    )
  }

  const Icon = pictograms.find(([re]) => re.test(key))?.[1] ?? Code
  return <Icon className={`shrink-0 text-accent-text ${className}`} aria-hidden="true" />
}
