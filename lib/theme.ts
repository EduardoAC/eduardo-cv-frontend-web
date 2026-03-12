export type ThemePreference = 'system' | 'dark' | 'light';
export type ResolvedTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'eduardoac-theme-preference';
export const THEME_ATTRIBUTE = 'data-theme';
export const THEME_PREFERENCE_ATTRIBUTE = 'data-theme-preference';
export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system';
export const DARK_THEME_COLOR = '#181818';
export const LIGHT_THEME_COLOR = '#f3f5f7';

const validThemePreferences = new Set<ThemePreference>(['system', 'dark', 'light']);

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const isThemePreference = (value: string | null | undefined): value is ThemePreference =>
  value !== null && value !== undefined && validThemePreferences.has(value as ThemePreference);

export const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
  preference === 'system' ? getSystemTheme() : preference;

export const readThemePreference = (): ThemePreference => {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME_PREFERENCE;
  }

  const themePreference = document.documentElement.getAttribute(THEME_PREFERENCE_ATTRIBUTE);

  if (isThemePreference(themePreference)) {
    return themePreference;
  }

  return DEFAULT_THEME_PREFERENCE;
};

export const applyThemePreference = (preference: ThemePreference): ResolvedTheme => {
  const resolvedTheme = resolveTheme(preference);

  if (typeof document === 'undefined') {
    return resolvedTheme;
  }

  const root = document.documentElement;
  root.setAttribute(THEME_PREFERENCE_ATTRIBUTE, preference);
  root.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
  root.classList.toggle('dark-theme', resolvedTheme === 'dark');
  root.classList.toggle('light-theme', resolvedTheme === 'light');
  root.style.colorScheme = resolvedTheme;

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', resolvedTheme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
  }

  return resolvedTheme;
};

export const persistThemePreference = (preference: ThemePreference) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, preference);
};

export const clearThemePreference = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(THEME_STORAGE_KEY);
};

export const THEME_BOOTSTRAP_SCRIPT = `(() => {
  const storageKey = '${THEME_STORAGE_KEY}';
  const themeAttribute = '${THEME_ATTRIBUTE}';
  const themePreferenceAttribute = '${THEME_PREFERENCE_ATTRIBUTE}';
  const defaultPreference = '${DEFAULT_THEME_PREFERENCE}';
  const darkThemeColor = '${DARK_THEME_COLOR}';
  const lightThemeColor = '${LIGHT_THEME_COLOR}';
  const validPreferences = new Set(['system', 'dark', 'light']);
  const root = document.documentElement;
  const storedPreference = window.localStorage.getItem(storageKey);
  const preference = validPreferences.has(storedPreference) ? storedPreference : defaultPreference;
  const resolvedTheme =
    preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : preference === 'system'
        ? 'light'
        : preference;

  root.setAttribute(themePreferenceAttribute, preference);
  root.setAttribute(themeAttribute, resolvedTheme);
  root.classList.toggle('dark-theme', resolvedTheme === 'dark');
  root.classList.toggle('light-theme', resolvedTheme === 'light');
  root.style.colorScheme = resolvedTheme;

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', resolvedTheme === 'dark' ? darkThemeColor : lightThemeColor);
  }
})();`;
