import { useEffect, useState } from 'react'

export type ThemeName = 'light' | 'dark'

const themeColors: Record<ThemeName, string> = {
  light: '#e6e0d1',
  dark: '#131311',
}

export function readTheme(): ThemeName {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function applyTheme(next: ThemeName) {
  const root = document.documentElement
  root.dataset.theme = next
  localStorage.setItem('siket-theme', next)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[next])
}

export function useTheme(): ThemeName {
  const [theme, setTheme] = useState<ThemeName>(readTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}
