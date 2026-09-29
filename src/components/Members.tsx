import { members } from '../data/content'
import { Reveal } from './Reveal'

export function Members() {
  const [lead, ...rest] = members

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
            <div className="member-stack">
              {rest.map((member) => (
                <article key={member.name} className="member">
                  <figure>
                    <div className="member-photo">
                      <img src={member.photo} alt="" />
                    </div>
                    <figcaption>{member.name}</figcaption>
                  </figure>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
