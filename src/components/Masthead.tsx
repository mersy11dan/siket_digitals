import { List, Moon, Sun, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { FlatLogo } from './FlatLogo'
import { applyTheme, readTheme, type ThemeName } from '../theme'

const links = [
  { href: '#members', label: 'Members' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
]

function scrollToId(event: { preventDefault: () => void }, href: string) {
  const target = document.querySelector(href)
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', href)
}

export function Masthead() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  const themeLabel = theme === 'dark' ? 'Switch to light paper' : 'Switch to dark paper'

  return (
    <header className="mast" id="top">
      <div className="wrap">
        <div className="bar">
          <a className="brand" href="#top">
            <FlatLogo className="brand-mark" />
            <span className="brand-name">
              Sik<span className="spark">e</span>t Digitals
            </span>
          </a>
          <div className="bar-actions">
            <nav className="nav-desktop" aria-label="Page">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => scrollToId(event, link.href)}>
                  {link.label}
                </a>
              ))}
              <a className="btn" href="#contact">
                Start a project
              </a>
            </nav>
            <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={themeLabel}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <List size={20} />}
              <span className="vh">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className="nav-mobile" data-open={open} aria-label="Page">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                setOpen(false)
                scrollToId(event, link.href)
              }}
            >
              {link.label}
            </a>
          ))}
          <a className="btn" href="#contact" onClick={() => setOpen(false)}>
            Start a project
          </a>
        </nav>
      </div>
    </header>
  )
}
