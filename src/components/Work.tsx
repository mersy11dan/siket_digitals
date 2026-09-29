import { offers } from '../data/content'
import { Reveal } from './Reveal'

export function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <Reveal>
          <h2>What we build</h2>
          <div className="prose">
            <p>
              Siket Digitals is a digital solutions team focused on building modern, responsive, and
              high-quality websites for businesses and organizations.
            </p>
            <p>
              We help businesses establish a strong online presence through clean design, user-friendly
              experiences, and reliable web solutions tailored to their needs.
            </p>
          </div>
        </Reveal>
        <div className="offers">
          {offers.map((offer) => (
            <article key={offer.title} className={offer.lead ? 'offer offer-lead' : 'offer'}>
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
            </article>
          ))}
        </div>
        <p className="closer">
          Our goal is to turn ideas into professional digital experiences that help businesses grow,
          connect with their audiences, and stand out online.
        </p>
      </div>
    </section>
  )
}
