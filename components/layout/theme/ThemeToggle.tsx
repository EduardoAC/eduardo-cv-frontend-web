'use client'

import { useEffect, useState } from 'react'
import {
  DEFAULT_THEME_PREFERENCE,
  type ResolvedTheme,
  type ThemePreference,
  THEME_STORAGE_KEY,
  applyThemePreference,
  persistThemePreference,
  readThemePreference,
} from '@/lib/theme'
import styles from './ThemeToggle.module.scss'

interface ThemeToggleProps {
  className?: string
}

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.themeIcon}>
    <path
      d="M15.2 3.6a8.8 8.8 0 1 0 5.2 15.3 9.9 9.9 0 0 1-5.2-15.3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.themeIcon}>
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const getStoredThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME_PREFERENCE
  }

  return readThemePreference()
}

export function ThemeToggle({ className = '' }: Readonly<ThemeToggleProps>) {
  const [preference, setPreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark')

  useEffect(() => {
    const initialPreference = getStoredThemePreference()
    const initialTheme = applyThemePreference(initialPreference)

    setPreference(initialPreference)
    setResolvedTheme(initialTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleMediaChange = () => {
      if (readThemePreference() !== 'system') {
        return
      }

      setResolvedTheme(applyThemePreference('system'))
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return
      }

      const nextPreference = event.newValue === 'dark' || event.newValue === 'light'
        ? event.newValue
        : DEFAULT_THEME_PREFERENCE

      setPreference(nextPreference)
      setResolvedTheme(applyThemePreference(nextPreference))
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const handleThemeChange = (nextPreference: ResolvedTheme) => {
    setPreference(nextPreference)
    setResolvedTheme(applyThemePreference(nextPreference))
    persistThemePreference(nextPreference)
  }

  const nextTheme: ResolvedTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const buttonLabel = `Switch to ${nextTheme} theme`
  const Icon = nextTheme === 'dark' ? MoonIcon : SunIcon

  return (
    <button
      type="button"
      className={`${styles.themeToggle} ${className}`.trim()}
      aria-label={preference === 'system'
        ? `${buttonLabel}. Currently following system ${resolvedTheme} mode`
        : buttonLabel}
      data-current-theme={resolvedTheme}
      data-follows-system={preference === 'system' ? 'true' : 'false'}
      onClick={() => handleThemeChange(nextTheme)}
    >
      <Icon />
      <span className={styles.srOnly}>{buttonLabel}</span>
    </button>
  )
}
