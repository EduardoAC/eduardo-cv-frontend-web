export type ThemePreference = 'system' | 'dark' | 'light'
export type ResolvedTheme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'eduardoac-theme-preference'
export const THEME_ATTRIBUTE = 'data-theme'
export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system'
export const DARK_THEME_COLOR = '#303030'
export const LIGHT_THEME_COLOR = '#f3f5f7'
export const THEME_INIT_SCRIPT_SRC = '/theme-init.js'
const EXPLICIT_THEME_META_SELECTOR = 'meta[name="theme-color"][data-explicit-theme-color]'

const validThemePreferences = new Set<ThemePreference>(['system', 'dark', 'light'])

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const isThemePreference = (value: string | null | undefined): value is ThemePreference =>
  value !== null && value !== undefined && validThemePreferences.has(value as ThemePreference)

export const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
  preference === 'system' ? getSystemTheme() : preference

export const readThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME_PREFERENCE
  }

  const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedPreference === 'system') {
    window.localStorage.removeItem(THEME_STORAGE_KEY)
    return DEFAULT_THEME_PREFERENCE
  }

  return storedPreference === 'dark' || storedPreference === 'light'
    ? storedPreference
    : DEFAULT_THEME_PREFERENCE
}

const setExplicitThemeColorMeta = (resolvedTheme?: ResolvedTheme) => {
  if (typeof document === 'undefined') {
    return
  }

  const existingMeta = document.head.querySelector(EXPLICIT_THEME_META_SELECTOR)

  if (!resolvedTheme) {
    existingMeta?.remove()
    return
  }

  const themeColor = resolvedTheme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR

  if (existingMeta) {
    existingMeta.setAttribute('content', themeColor)
    return
  }

  const meta = document.createElement('meta')
  meta.setAttribute('name', 'theme-color')
  meta.setAttribute('content', themeColor)
  meta.setAttribute('data-explicit-theme-color', 'true')
  document.head.appendChild(meta)
}

export const applyThemePreference = (preference: ThemePreference): ResolvedTheme => {
  const resolvedTheme = resolveTheme(preference)

  if (typeof document === 'undefined') {
    return resolvedTheme
  }

  const root = document.documentElement
  const hasExplicitTheme = preference === 'dark' || preference === 'light'

  if (hasExplicitTheme) {
    root.setAttribute(THEME_ATTRIBUTE, preference)
  } else {
    root.removeAttribute(THEME_ATTRIBUTE)
  }

  root.classList.toggle('dark-theme', hasExplicitTheme && preference === 'dark')
  root.classList.toggle('light-theme', hasExplicitTheme && preference === 'light')

  if (hasExplicitTheme) {
    root.style.colorScheme = preference
    setExplicitThemeColorMeta(preference)
  } else {
    root.style.removeProperty('color-scheme')
    setExplicitThemeColorMeta(undefined)
  }

  return resolvedTheme
}

export const persistThemePreference = (preference: ThemePreference) => {
  if (typeof window === 'undefined') {
    return
  }

  if (preference === 'dark' || preference === 'light') {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference)
    return
  }

  window.localStorage.removeItem(THEME_STORAGE_KEY)
}

export const clearThemePreference = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(THEME_STORAGE_KEY)
}
