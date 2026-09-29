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
      <svg className="grain-svg" aria-hidden="true">
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <filter id="paper-fiber">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="3" seed="7" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="paper-mottle">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="2" seed="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="paper-layer mottle" />
      <div className="paper-layer fibers" />
      <div className="paper-layer grain" />
      <div className="paper-layer edges" />
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
