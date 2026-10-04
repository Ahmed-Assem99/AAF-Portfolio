import adasa from '../assets/projects/adasa.webp'
import circle from '../assets/projects/circle.webp'
import clarity from '../assets/projects/clarity.webp'
import contacthub from '../assets/projects/contacthub.webp'
import cosmos from '../assets/projects/cosmos.webp'
import dinner from '../assets/projects/dinner.webp'
import dji from '../assets/projects/dji.webp'
import fitcore from '../assets/projects/fitcore.webp'
import gamearena from '../assets/projects/gamearena.webp'
import kanban from '../assets/projects/kanban.webp'
import lumen from '../assets/projects/lumen.webp'
import muddabir from '../assets/projects/muddabir.webp'
import nutriplan from '../assets/projects/nutriplan.webp'
import portfolio from '../assets/projects/portfolio.webp'
import quiz from '../assets/projects/quiz.webp'
import uxreview from '../assets/projects/uxreview.webp'

const gh = (repo: string) => `https://github.com/Ahmed-Assem99/${repo}`

export type Category = 'react' | 'javascript' | 'html-css' | 'backend'

export interface Project {
  title: string
  tagline: string
  description: string
  tech: string[]
  category: Category
  repo: string
  live?: string
  image?: string
  /** Shown instead of a screenshot for projects without a UI. */
  preview?: string[]
  highlights?: string[]
  rtl?: boolean
}

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'react', label: 'React & TypeScript' },
  { id: 'javascript', label: 'JavaScript apps' },
  { id: 'html-css', label: 'Websites' },
  { id: 'backend', label: 'Backend' },
]

export const featuredProjects: Project[] = [
  {
    title: 'Lumen',
    tagline: 'AI SaaS landing page template',
    description:
      'A conversion-focused, dark-first landing page for AI products: ten sections, an animated hero that turns scattered data into a decision, and a bento grid with live mini-visuals.',
    highlights: [
      'Animated product mock that types a question, grows a chart and reveals an AI answer',
      'Dark & light mode that remembers the visitor and follows their system on a first visit',
      'All copy in one config file, so rebranding needs no component edits',
    ],
    tech: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite'],
    category: 'react',
    image: lumen,
    repo: gh('Project-AI-SaaS-Landing-Page-Template'),
  },
  {
    title: 'COSMOS',
    tagline: 'Real-time space dashboard',
    description:
      'NASA’s Astronomy Picture of the Day, upcoming rocket launches and live planetary data in one dashboard, with an interactive explorer for all eight planets.',
    highlights: [
      'Three public APIs (NASA APOD, The Space Devs, Solar System OpenData)',
      'Browse any day’s APOD with a date picker and graceful error states',
      'Planet explorer with physical data, discovery info and quick facts',
    ],
    tech: ['TypeScript', 'Tailwind CSS', 'REST APIs'],
    category: 'javascript',
    image: cosmos,
    live: 'https://project11-cosmos-space-dashboard.vercel.app/',
    repo: gh('Project11-COSMOS-SpaceDashboard'),
  },
  {
    title: 'NutriPlan',
    tagline: 'Food, nutrition & fitness planner',
    description:
      'Search recipes by name, category or cuisine, scan products by barcode with Nutri-Score grading, analyze a recipe’s nutrition and track everything in a daily food log.',
    highlights: [
      'Barcode product lookup with Nutri-Score and NOVA grades',
      'Per-recipe nutrition analysis with interactive Plotly charts',
      'Daily food log persisted in localStorage',
    ],
    tech: ['JavaScript', 'Tailwind CSS', 'REST APIs', 'Plotly'],
    category: 'javascript',
    image: nutriplan,
    live: 'https://project12-nutri-plan.vercel.app/',
    repo: gh('Project12-NutriPlan'),
  },
  {
    title: 'Circle',
    tagline: 'Social posting app',
    description:
      'A social feed where people sign up, sign in, publish posts with text and images, comment, and manage their own posts, all behind protected routes.',
    highlights: [
      'Schema-validated auth forms with React Hook Form and Zod',
      'Image preview and remove before posting, with loading states',
      'Typed Axios service layer over a REST API, with route guards',
    ],
    tech: ['React', 'TypeScript', 'HeroUI', 'React Hook Form', 'Zod', 'Axios'],
    category: 'react',
    image: circle,
    repo: gh('Project16-Circle'),
  },
  {
    title: 'Kanban',
    tagline: 'Drag-and-drop task board',
    description:
      'A three-column board for To Do, In Progress and Completed, with priorities, due dates and descriptions. Tasks survive a refresh.',
    highlights: [
      'Drag and drop between columns with mouse and touch',
      'Inline validation: required title, no due dates in the past',
      'Written in TypeScript and persisted in localStorage',
    ],
    tech: ['TypeScript', 'Tailwind CSS v4', 'HTML5'],
    category: 'javascript',
    image: kanban,
    live: 'https://project13-kanban-task-manager.vercel.app/',
    repo: gh('Project13-KanbanTaskManager'),
  },
  {
    title: 'Adasa · عدسة',
    tagline: 'Arabic photography blog',
    description:
      'A right-to-left Arabic blog for photographers, with a home page, post listings, article pages with a sidebar, author profiles and an about page.',
    highlights: [
      'Fully RTL layout and typography',
      'Multi-page routing with shared layouts',
      'Content driven from a JSON posts file',
    ],
    tech: ['React', 'React Router', 'Tailwind CSS v4', 'Lucide'],
    category: 'react',
    image: adasa,
    repo: gh('Project15-Adasa'),
    rtl: true,
  },
]

export type StepIcon =
  | 'link' | 'crawl' | 'filter' | 'book' | 'bot' | 'chat'
  | 'upload' | 'split' | 'embed' | 'database' | 'search' | 'answer'
  | 'folder' | 'file' | 'sparkles' | 'sheet' | 'mail' | 'send'

export interface Workflow {
  title: string
  summary: string
  outcome: string
  steps: { label: string; icon: StepIcon }[]
  tech: string[]
  repo: string
}

export const workflows: Workflow[] = [
  {
    title: 'WhatsApp AI chatbot for any business',
    summary:
      'Give it a website URL. It crawls every page, rebuilds the content into a structured knowledge base and answers customers on WhatsApp using only that knowledge.',
    outcome: 'Connect a website and the chatbot is ready, with no manual training or hardcoded FAQs.',
    steps: [
      { label: 'Website URL', icon: 'link' },
      { label: 'Firecrawl crawl', icon: 'crawl' },
      { label: 'Filter & clean', icon: 'filter' },
      { label: 'Knowledge base', icon: 'book' },
      { label: 'RAG agent + memory', icon: 'bot' },
      { label: 'WhatsApp reply', icon: 'chat' },
    ],
    tech: ['n8n', 'Firecrawl', 'LangChain', 'OpenRouter', 'WhatsApp Cloud API'],
    repo: gh('AI-Whatsapp-Chatbot'),
  },
  {
    title: 'RAG document assistant',
    summary:
      'Upload PDFs, manuals and reports, then ask questions in plain language and get answers grounded in the source documents, not hallucinations.',
    outcome: 'Your team gets instant answers from internal knowledge instead of digging through files.',
    steps: [
      { label: 'Upload docs', icon: 'upload' },
      { label: 'Chunk', icon: 'split' },
      { label: 'Embed', icon: 'embed' },
      { label: 'Vector store', icon: 'database' },
      { label: 'Retrieve context', icon: 'search' },
      { label: 'Grounded answer', icon: 'answer' },
    ],
    tech: ['n8n', 'Embeddings', 'Vector DB', 'LLM APIs', 'REST API'],
    repo: gh('rag-chatbot-n8n'),
  },
  {
    title: 'AI invoice processing',
    summary:
      'Drop an invoice PDF into Google Drive. AI extracts the client and amounts, logs them to Google Sheets and emails the billing team, with no manual data entry.',
    outcome: 'Manual data entry replaced by a pipeline that runs the moment a file lands.',
    steps: [
      { label: 'Drive upload', icon: 'folder' },
      { label: 'Extract PDF text', icon: 'file' },
      { label: 'Gemini extraction', icon: 'sparkles' },
      { label: 'Google Sheets', icon: 'sheet' },
      { label: 'GPT-4o-mini email', icon: 'mail' },
      { label: 'Gmail notify', icon: 'send' },
    ],
    tech: ['n8n', 'Gemini 2.0 Flash', 'GPT-4o-mini', 'Sheets API', 'Gmail API'],
    repo: gh('AI-Invoice-n8n'),
  },
]

export const moreProjects: Project[] = [
  {
    title: 'QuizMaster',
    tagline: 'Trivia game',
    description: 'Pick a category, difficulty and number of questions, then race through trivia from the Open Trivia DB.',
    tech: ['JavaScript', 'Open Trivia DB API', 'CSS'],
    category: 'javascript',
    image: quiz,
    live: 'https://project14-quiz-app.vercel.app/',
    repo: gh('Project14-QuizApp'),
  },
  {
    title: 'ContactHub',
    tagline: 'Smart contact manager',
    description: 'Organize, search and edit contacts, with favorites, emergency contacts, validation and one-tap call or email.',
    tech: ['JavaScript', 'Bootstrap 5', 'SweetAlert2'],
    category: 'javascript',
    image: contacthub,
    live: 'https://project9-contact-hub.vercel.app/',
    repo: gh('Project9-ContactHub'),
  },
  {
    title: 'What’s for Dinner',
    tagline: 'Recipe inspiration',
    description: 'Instant meal ideas with ingredients, step-by-step instructions, nutrition info and chef’s tips.',
    tech: ['JavaScript', 'Bootstrap 5'],
    category: 'javascript',
    image: dinner,
    live: 'https://project8-whatsfor-dinner.vercel.app',
    repo: gh('Project8-WhatsforDinner'),
  },
  {
    title: 'Clarity',
    tagline: 'Digital agency website',
    description: 'A software agency site with a services mega-menu, tech stack, testimonials and FAQ.',
    tech: ['HTML5', 'Bootstrap 5', 'CSS3'],
    category: 'html-css',
    image: clarity,
    live: 'https://project7-clarity.vercel.app',
    repo: gh('Project7-Clarity'),
  },
  {
    title: 'GameArena',
    tagline: 'Esports tournament platform',
    description: 'A gaming community and tournaments website with a bold neon look.',
    tech: ['HTML5', 'Bootstrap 5', 'CSS3'],
    category: 'html-css',
    image: gamearena,
    live: 'https://project6-game-arena.vercel.app/',
    repo: gh('Project6-GameArena'),
  },
  {
    title: 'Muddabir · مدبّر',
    tagline: 'Personal finance dashboard',
    description: 'An Arabic RTL dashboard for transactions, budgets, savings goals and monthly bills.',
    tech: ['HTML5', 'CSS3', 'RTL'],
    category: 'html-css',
    image: muddabir,
    repo: gh('Project5-Muddabir'),
    rtl: true,
  },
  {
    title: 'Arabic portfolio',
    tagline: 'My previous portfolio',
    description: 'An Arabic, right-to-left front-end developer portfolio with a dark, glowing UI.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'RTL'],
    category: 'html-css',
    image: portfolio,
    live: 'https://project10-personal-portfolio.vercel.app/',
    repo: gh('Project10-PersonalPortfolio'),
    rtl: true,
  },
  {
    title: 'The UX Review',
    tagline: 'Neo-brutalist magazine',
    description: 'A loud, editorial tech and design magazine layout: raw, unfiltered and unmistakable.',
    tech: ['HTML5', 'CSS3'],
    category: 'html-css',
    image: uxreview,
    repo: gh('Project4-The-UX-Review'),
  },
  {
    title: 'DJI Mavic 4 Pro',
    tagline: 'Product page',
    description: 'An e-commerce product page with pricing, specifications, reviews and comparisons.',
    tech: ['HTML5', 'CSS3'],
    category: 'html-css',
    image: dji,
    repo: gh('Project3-DJI-Mavic-4-Pro'),
  },
  {
    title: 'FitCore Gym',
    tagline: 'Fitness club landing page',
    description: 'A clean landing page for a premium gym: hero, benefits, programs and calls to action.',
    tech: ['HTML5', 'CSS3'],
    category: 'html-css',
    image: fitcore,
    repo: gh('Project2'),
  },
  {
    title: 'Todo API',
    tagline: 'REST API with FastAPI',
    description: 'A secured to-do API with user sign-up, JWT login, bcrypt-hashed passwords and per-user CRUD.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'JWT'],
    category: 'backend',
    preview: ['POST   /auth/token      200', 'GET    /                200', 'POST   /todo            201', 'PUT    /todo/{id}       204', 'DELETE /todo/{id}       204'],
    repo: gh('TodoApp'),
  },
  {
    title: 'Product CRUD',
    tagline: 'Inventory manager',
    description: 'Create, read, update, delete and search products, persisted in localStorage.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    category: 'javascript',
    preview: ['create(product)', 'read()  → table', 'update(index)', 'delete(index)', 'search(term)'],
    repo: gh('CRUD'),
  },
]
