import { About } from './components/About'
import { Automation } from './components/Automation'
import { Contact } from './components/Contact'
import { FeaturedWork } from './components/FeaturedWork'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MoreProjects } from './components/MoreProjects'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { StackMarquee } from './components/StackMarquee'

function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <StackMarquee />
        <FeaturedWork />
        <MoreProjects />
        <Automation />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
