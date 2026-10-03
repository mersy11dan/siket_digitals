import { ArrowsClockwise } from '@phosphor-icons/react'
import { useState } from 'react'
import { offers } from '../data/content'
import { Reveal } from './Reveal'

export function Work() {
  const [open, setOpen] = useState<string | null>(null)

  function toggle(title: string) {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setOpen((current) => (current === title ? null : title))
  }

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
            <article
              key={offer.title}
              className={offer.lead ? 'offer offer-lead' : 'offer'}
              data-open={open === offer.title}
              tabIndex={0}
              onClick={() => toggle(offer.title)}
            >
              <div className="offer-inner">
                <div className="offer-face offer-front">
                  <h3>{offer.title}</h3>
                  <span className="offer-hint" aria-hidden="true">
                    <ArrowsClockwise size={14} weight="bold" />
                    <span className="hint-hover">Hover to read</span>
                    <span className="hint-touch">Tap to read</span>
                  </span>
                </div>
                <div className="offer-face offer-back">
                  <p>{offer.body}</p>
                  <span className="offer-back-title" aria-hidden="true">
                    {offer.title}
                  </span>
                </div>
              </div>
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
