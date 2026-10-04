# AAF Studio · Portfolio

The personal site of Ahmed Assem El Fakharany (AAF Studio): a full stack developer building web
products and the AI automations behind them. Built with React 19, TypeScript, Tailwind CSS v4 and Vite.

**Live site:** https://aaf-portfolio.vercel.app

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server                |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Lint the code with oxlint           |

## Editing content

All text lives in two files, so you rarely need to touch a component:

- `src/data/site.ts`: name, email, links, hero stats, services, process and skills
- `src/data/projects.ts`: featured projects, n8n workflows and the project archive

Project screenshots are in `src/assets/projects/` (WebP, 1200px wide). To add a project, drop a
screenshot there, import it at the top of `projects.ts` and add an entry to `featuredProjects` or
`moreProjects`.

## Structure

```
src/
├── data/          ← site copy and project data (edit these)
├── components/    ← one file per page section
│   └── ui/        ← small shared pieces (Container, Reveal, BrowserFrame…)
├── hooks/         ← theme toggle and active-section tracking
└── assets/projects/
```

## Features

- Dark and light themes, following the system on a first visit and remembering the choice
- Scroll-reveal motion that turns off for visitors who prefer reduced motion
- Filterable project archive, responsive down to phone width
- Self-hosted fonts (Inter Tight, Montserrat for brand labels, JetBrains Mono), with no third-party requests
- AAF Studio logo redrawn as SVG in `src/components/ui/Logo.tsx`, colored by the theme
