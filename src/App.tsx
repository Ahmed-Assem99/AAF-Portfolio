import { Analytics } from '@vercel/analytics/react'
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
      <a href="#main" className="btn95 btn95-primary sr-only px-4 py-3 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60]">
        Skip to content
      </a>
      <Navbar />
      <ArcadeGutters />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <StackMarquee />
        <Services />
        <FeaturedWork />
        <MoreProjects />
        <Templates />
        <Automation />
        <About />
        <Contact />
      </main>
      <Footer />
      <MessageToast />
      <Analytics />
    </>
  )
}

export default App
