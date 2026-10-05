import { About } from './components/About'
import { ArcadeGutters } from './components/ArcadeGutters'
import { Automation } from './components/Automation'
import { Contact } from './components/Contact'
import { FeaturedWork } from './components/FeaturedWork'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MessageToast } from './components/MessageToast'
import { MoreProjects } from './components/MoreProjects'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { StackMarquee } from './components/StackMarquee'
import { Templates } from './components/Templates'

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
      <ArcadeGutters />
      <main>
        <Hero />
        <StackMarquee />
        <FeaturedWork />
        <MoreProjects />
        <Templates />
        <Automation />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <MessageToast />
    </>
  )
}

export default App
