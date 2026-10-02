import { CaretDown } from '@phosphor-icons/react'
import { FormEvent, useId, useState } from 'react'
import { projectTypes, studio } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const nameId = useId()
  const emailId = useId()
  const projectId = useId()
  const messageId = useId()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return

    const key = import.meta.env.VITE_WEB3FORMS_KEY
    if (!key) {
      setStatus('error')
      setError(`The form is not configured yet. Email ${studio.email}.`)
      return
    }

    const name = String(data.get('name') || '')
    setStatus('sending')
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `Project inquiry from ${name}`,
          from_name: 'Siket Digitals website',
          name,
          email: data.get('email'),
          project: data.get('project'),
          message: data.get('message'),
        }),
      })
      const payload = (await response.json()) as { success?: boolean; message?: string }
      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'Request failed')
      }
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setError(`The message did not send. Email ${studio.email} instead.`)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <h2>Start a project</h2>
        <div className="contact-grid">
          <div>
            <p className="lede">Tell us what you need. We reply by email.</p>
            {status === 'sent' ? (
              <div className="sent" role="status">
                <p>Message sent. We will reply by email.</p>
                <button type="button" className="btn" onClick={() => setStatus('idle')}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="form-row">
                  <label className="field" htmlFor={nameId}>
                    <span>Name</span>
                    <input id={nameId} name="name" type="text" autoComplete="name" required />
                  </label>
                  <label className="field" htmlFor={emailId}>
                    <span>Email</span>
                    <input id={emailId} name="email" type="email" autoComplete="email" required />
                  </label>
                </div>
                <label className="field" htmlFor={projectId}>
                  <span>What do you need</span>
                  <span className="select-wrap">
                    <select id={projectId} name="project" defaultValue="Website" required>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <CaretDown className="caret" size={16} aria-hidden="true" />
                  </span>
                </label>
                <label className="field" htmlFor={messageId}>
                  <span>Message</span>
                  <textarea id={messageId} name="message" required minLength={8} />
                </label>
                <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
                {status === 'error' ? (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                ) : null}
                <button className="btn" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  {status === 'sending' ? 'Sending' : 'Send message'}
                </button>
              </form>
            )}
          </div>
          <aside className="contact-aside">
            <h3>Reach us directly</h3>
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
            <a href={studio.phones[0].href}>{studio.phones[0].display}</a>
            <a href={studio.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <p className="fine">{studio.city}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
