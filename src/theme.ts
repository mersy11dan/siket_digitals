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
