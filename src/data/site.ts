// All personal details and page copy live here, so the site can be updated
// without touching any component.

export const site = {
  brand: 'AAF Studio',
  name: 'Ahmed Assem El Fakharany',
  shortName: 'Ahmed',
  role: 'Full stack developer & AI automation engineer',
  location: 'Egypt · working worldwide',
  email: 'ahmedassem13@gmail.com',
  github: 'https://github.com/Ahmed-Assem99',
  githubHandle: 'Ahmed-Assem99',
}

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
]

export const heroStats = [
  { value: '20+', label: 'projects on GitHub' },
  { value: '9', label: 'live deployments' },
  { value: 'React · TS', label: 'core stack' },
  { value: 'EN · AR', label: 'LTR & RTL interfaces' },
]

export const marquee = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB',
  'Python',
  'FastAPI',
  'React Router',
  'Bootstrap',
  'REST APIs',
  'n8n',
  'OpenAI',
  'Vite',
  'Vercel',
  'Docker',
]

export const services = [
  {
    icon: 'app',
    title: 'Web apps & dashboards',
    body: 'Production-ready React and TypeScript apps, from auth and forms to data-heavy dashboards, backed by Node or Python APIs.',
    points: ['React · TypeScript', 'REST APIs & auth', 'MongoDB · SQL'],
  },
  {
    icon: 'layout',
    title: 'Landing pages & websites',
    body: 'Fast, responsive, accessible marketing sites that convert, in English or Arabic with full right-to-left support.',
    points: ['Conversion-focused', 'Dark & light themes', 'RTL Arabic'],
  },
  {
    icon: 'bot',
    title: 'AI features & automation',
    body: 'When a product needs it, I add chatbots grounded in your own content and n8n workflows that connect your everyday tools.',
    points: ['Chatbots', 'n8n workflows', 'API integrations'],
  },
] as const

export const process = [
  { step: '01', title: 'Discover', body: 'We pin down the problem, the users and what “done” looks like.' },
  { step: '02', title: 'Design', body: 'A clear direction and layout before any heavy code is written.' },
  { step: '03', title: 'Build', body: 'Typed, componentized code with previews you can click through.' },
  { step: '04', title: 'Launch', body: 'Deploy to production, then keep improving it with real feedback.' },
]

export const skills = [
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'HTML5 & CSS3', 'React Router', 'React Hook Form + Zod'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB & Mongoose', 'Python', 'FastAPI', 'SQLAlchemy', 'JWT auth', 'REST APIs'],
  },
  {
    group: 'AI & automation',
    items: ['n8n', 'OpenAI', 'Claude', 'Gemini', 'OpenRouter', 'Ollama', 'LangChain', 'RAG & vector DBs'],
  },
  {
    group: 'Tooling',
    items: ['Git & GitHub', 'Vite', 'Vercel', 'Docker', 'ESLint', 'Notion'],
  },
]
