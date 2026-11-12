import { useState, type FormEvent } from 'react'
import { TelegramLogo, WhatsappLogo, X } from '@phosphor-icons/react'
import { studio } from '../data/content'

type ChatChannel = 'whatsapp' | 'telegram' | null

export function WhatsAppWidget() {
  const waNumber = studio.whatsapp.number.replace(/\D/g, '')
  const [activeChat, setActiveChat] = useState<ChatChannel>(null)
  const [message, setMessage] = useState(studio.whatsapp.defaultMessage)
  const isWhatsAppOpen = activeChat === 'whatsapp'
  const isTelegramOpen = activeChat === 'telegram'

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return

    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <aside className="contact-widget" aria-label="Contact Siket Digitals">
      {activeChat && (
        <section
          className={`chat-panel ${isTelegramOpen ? 'telegram-chat' : ''}`}
          role="dialog"
          aria-labelledby="chat-title"
        >
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true">
              {isTelegramOpen
                ? <TelegramLogo size={22} weight="fill" />
                : <WhatsappLogo size={22} weight="fill" />}
            </div>
            <div className="chat-heading">
              <h2 id="chat-title">Siket Digitals on {isTelegramOpen ? 'Telegram' : 'WhatsApp'}</h2>
              <p>
                <span className="chat-status" />
                {isTelegramOpen ? 'Message us directly on Telegram' : 'Usually replies within 1 hour'}
              </p>
            </div>
            <button
              className="chat-close"
              type="button"
              aria-label={`Close ${activeChat} chat`}
              onClick={() => setActiveChat(null)}
            >
              <X size={20} />
            </button>
          </header>
          <div className="chat-content">
            {isTelegramOpen ? (
              <>
                <p className="chat-intro">Hi there! Chat with us about your next project.</p>
                <p className="chat-handoff">We’ll open the Siket Digitals Telegram profile in a new tab.</p>
                <a
                  className="chat-link"
                  href={studio.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramLogo size={18} weight="fill" />
                  Open Telegram chat
                </a>
              </>
            ) : (
              <>
                <p className="chat-intro">Hi there! How can we help with your next project?</p>
                <p className="chat-handoff">Your message will open in WhatsApp so we can reply to you there.</p>
                <form className="chat-form" onSubmit={sendMessage}>
                  <label className="vh" htmlFor="whatsapp-message">Your message</label>
                  <textarea
                    id="whatsapp-message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write your message..."
                    required
                  />
                  <button type="submit" disabled={!message.trim()}>
                    <WhatsappLogo size={18} weight="fill" />
                    Continue to WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      )}
      <div className="contact-widget-actions">
        <button
          className="contact-widget-button whatsapp-button"
          type="button"
          aria-label={isWhatsAppOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
          aria-expanded={isWhatsAppOpen}
          aria-haspopup="dialog"
          onClick={() => setActiveChat((current) => current === 'whatsapp' ? null : 'whatsapp')}
        >
          {isWhatsAppOpen ? <X size={26} /> : <WhatsappLogo size={28} weight="fill" />}
        </button>
        <button
          className="contact-widget-button telegram-button"
          type="button"
          aria-label="Contact Siket Digitals on Telegram"
          aria-expanded={isTelegramOpen}
          aria-haspopup="dialog"
          onClick={() => setActiveChat((current) => current === 'telegram' ? null : 'telegram')}
        >
          <TelegramLogo size={24} weight="fill" />
        </button>
      </div>
    </aside>
  )
}
