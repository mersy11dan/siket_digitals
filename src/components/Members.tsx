import { members } from '../data/content'
import { Reveal } from './Reveal'

export function Members() {
  const [lead, second, third] = members

  return (
    <section className="section" id="members">
      <div className="wrap">
        <Reveal>
          <div className="members-head">
            <h2>Members</h2>
          </div>
          <div className="members-grid">
            <article className="member member-lead">
              <figure>
                <div className="member-photo">
                  <img src={lead.photo} alt="" />
                </div>
                <figcaption>{lead.name}</figcaption>
              </figure>
              <p className="role">{lead.role}</p>
              <p className="bio">{lead.bio}</p>
            </article>
            <article className="member">
              <figure>
                <div className="member-photo">
                  <img src={second.photo} alt="" />
                </div>
                <figcaption>{second.name}</figcaption>
              </figure>
              <p className="role">{second.role}</p>
              <p className="bio">{second.bio}</p>
            </article>
            <article className="member member-row">
              <div className="member-photo">
                <img src={third.photo} alt="" />
              </div>
              <div className="member-row-text">
                <h3>{third.name}</h3>
                <p className="role">{third.role}</p>
                <p className="bio">{third.bio}</p>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
