import { Robot } from './Robot'

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap dateline" aria-hidden="true">
        <span>Addis Ababa</span>
        <span>Est. 2026</span>
        <span>Websites and web apps</span>
      </div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            Modern websites for <span className="spark">growing</span> businesses.
          </h1>
          <p className="lede">
            We build responsive, high-quality websites with clean design, shaped around each business.
          </p>
          <a className="btn" href="#contact">
            Start a project
          </a>
        </div>
        <div className="hero-visual">
          <Robot />
        </div>
      </div>
    </section>
  )
}
