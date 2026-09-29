import { steps } from '../data/content'
import { Reveal } from './Reveal'

export function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <Reveal>
          <h2>How a project goes</h2>
          <div className="steps">
            {steps.map((step) => (
              <article key={step.title} className="step">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
