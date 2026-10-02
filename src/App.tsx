import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Masthead } from './components/Masthead'
import { Members } from './components/Members'
import { Process } from './components/Process'
import { Work } from './components/Work'

export default function App() {
  return (
    <>
      <div className="paper-layer paper-sheet" aria-hidden="true" />
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Masthead />
      <main id="content">
        <Hero />
        <Members />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
