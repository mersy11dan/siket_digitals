import { InstagramLogo, LinkedinLogo, TelegramLogo, TiktokLogo } from '@phosphor-icons/react'
import { studio } from '../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-name">
            Sik<span className="spark">e</span>t Digitals
          </p>
          <p className="fine">
            {studio.city}
            <br />
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
            {studio.phones.map((phone) => (
              <span key={phone.href}>
                <br />
                <a href={phone.href}>{phone.display}</a>
              </span>
            ))}
            <br />© 2026 Siket Digitals
          </p>
        </div>
        <ul className="socials">
          <li>
            <a href={studio.linkedin} target="_blank" rel="noreferrer">
              <LinkedinLogo size={18} />
              LinkedIn
            </a>
          </li>
          <li>
            <span className="social">
              <InstagramLogo size={18} />
              Instagram
              <span className="vh">, coming soon</span>
            </span>
          </li>
          <li>
            <span className="social">
              <TiktokLogo size={18} />
              TikTok
              <span className="vh">, coming soon</span>
            </span>
          </li>
          <li>
            <span className="social">
              <TelegramLogo size={18} />
              Telegram
              <span className="vh">, coming soon</span>
            </span>
          </li>
        </ul>
      </div>
    </footer>
  )
}
