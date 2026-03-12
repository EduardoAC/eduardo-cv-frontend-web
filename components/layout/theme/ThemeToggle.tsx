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

const themeOptions: Array<{ value: ThemePreference; label: string; shortLabel: string }> = [
  { value: 'system', label: 'Use system theme', shortLabel: 'System' },
  { value: 'dark', label: 'Use dark theme', shortLabel: 'Dark' },
  { value: 'light', label: 'Use light theme', shortLabel: 'Light' },
]

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

  const handleThemeChange = (nextPreference: ThemePreference) => {
    setPreference(nextPreference)
    setResolvedTheme(applyThemePreference(nextPreference))
    persistThemePreference(nextPreference)
  }

  return (
    <div className={`${styles.themeToggle} ${className}`.trim()} role="group" aria-label="Theme switcher">
      {themeOptions.map((option) => {
        const isSelected = preference === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.themeOption} ${isSelected ? styles.themeOptionActive : ''}`.trim()}
            aria-pressed={isSelected}
            aria-label={option.label}
            data-resolved-theme={resolvedTheme}
            onClick={() => handleThemeChange(option.value)}
          >
            <span aria-hidden="true">{option.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
