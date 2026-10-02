import { InstagramLogo, LinkedinLogo, TelegramLogo, TiktokLogo } from '@phosphor-icons/react'
import { studio } from '../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <p className="footer-name">
          Sik<span className="spark">e</span>t Digitals
        </p>
        <p className="fine footer-meta">
          <span>{studio.city}</span>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
          <a href={studio.phones[0].href}>{studio.phones[0].display}</a>
          <span>© 2026 Siket Digitals</span>
        </p>
        <ul className="socials">
          <li>
            <a href={studio.linkedin} target="_blank" rel="noreferrer">
              <LinkedinLogo size={18} />
              <span className="social-label">LinkedIn</span>
            </a>
          </li>
          <li>
            <span className="social">
              <InstagramLogo size={18} />
              <span className="social-label">Instagram</span>
              <span className="vh">, coming soon</span>
            </span>
          </li>
          <li>
            <span className="social">
              <TiktokLogo size={18} />
              <span className="social-label">TikTok</span>
              <span className="vh">, coming soon</span>
            </span>
          </li>
          <li>
            <span className="social">
              <TelegramLogo size={18} />
              <span className="social-label">Telegram</span>
              <span className="vh">, coming soon</span>
            </span>
          </li>
        </ul>
      </div>
    </footer>
  )
}
