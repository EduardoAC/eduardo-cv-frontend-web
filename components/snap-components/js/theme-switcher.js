/**
 * Snap Components Theme Switcher
 * Handles theme switching, persistence, and system preference detection
 */

class SnapThemeSwitcher {
  constructor(options = {}) {
    this.storageKey = options.storageKey || 'snap-theme';
    this.defaultTheme = options.defaultTheme || 'system';
    this.rootElement = document.documentElement;
    this.theme = this.getStoredTheme();
    
    this.init();
  }

  /**
   * Initialize the theme switcher
   */
  init() {
    // Add loading class to prevent flash
    this.rootElement.classList.add('snap-theme-loading');
    
    // Apply the theme
    this.applyTheme(this.theme);
    
    // Remove loading class after a short delay
    setTimeout(() => {
      this.rootElement.classList.remove('snap-theme-loading');
      this.rootElement.classList.add('snap-theme-ready');
    }, 100);

    // Listen for system theme changes
    this.listenForSystemThemeChanges();
  }

  /**
   * Get the stored theme from localStorage
   */
  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey) || this.defaultTheme;
    } catch (error) {
      console.warn('Could not read theme from localStorage:', error);
      return this.defaultTheme;
    }
  }

  /**
   * Store the theme in localStorage
   */
  storeTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  }

  /**
   * Get the current effective theme (resolves 'system' to actual theme)
   */
  getEffectiveTheme() {
    if (this.theme === 'system') {
      return this.getSystemTheme();
    }
    return this.theme;
  }

  /**
   * Get the system theme preference
   */
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Apply a theme to the document
   */
  applyTheme(theme) {
    this.theme = theme;
    
    // Remove existing theme classes
    this.rootElement.classList.remove('snap-theme-light', 'snap-theme-dark', 'snap-theme-system');
    
    // Add new theme class
    this.rootElement.classList.add(`snap-theme-${theme}`);
    
    // Set data-theme attribute for CSS selectors
    if (theme === 'system') {
      this.rootElement.removeAttribute('data-theme');
    } else {
      this.rootElement.setAttribute('data-theme', theme);
    }
    
    // Store the theme
    this.storeTheme(theme);
    
    // Dispatch custom event
    this.dispatchThemeChangeEvent(theme);
  }

  /**
   * Switch to a specific theme
   */
  switchTheme(theme) {
    if (!['light', 'dark', 'system'].includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Must be 'light', 'dark', or 'system'`);
      return;
    }
    
    this.applyTheme(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentTheme = this.getEffectiveTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.switchTheme(newTheme);
  }

  /**
   * Listen for system theme changes
   */
  listenForSystemThemeChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (event) => {
      if (this.theme === 'system') {
        // Re-apply system theme
        this.applyTheme('system');
      }
    });
  }

  /**
   * Dispatch a custom theme change event
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('snap-theme-change', {
      detail: {
        theme,
        effectiveTheme: this.getEffectiveTheme()
      }
    });
    
    window.dispatchEvent(event);
  }

  /**
   * Create a theme toggle button
   */
  createToggleButton() {
    const button = document.createElement('button');
    button.className = 'snap-theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.setAttribute('type', 'button');
    
    // Add icons
    const sunIcon = document.createElement('svg');
    sunIcon.className = 'snap-theme-icon sun';
    sunIcon.innerHTML = `
      <path fill="currentColor" d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
    `;
    
    const moonIcon = document.createElement('svg');
    moonIcon.className = 'snap-theme-icon moon';
    moonIcon.innerHTML = `
      <path fill="currentColor" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
    `;
    
    button.appendChild(sunIcon);
    button.appendChild(moonIcon);
    
    // Add click handler
    button.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    return button;
  }

  /**
   * Auto-initialize theme switcher
   */
  static autoInit() {
    // Create global instance
    window.snapThemeSwitcher = new SnapThemeSwitcher();
    
    // Auto-create toggle button if data-snap-theme-toggle is present
    document.addEventListener('DOMContentLoaded', () => {
      const toggleElements = document.querySelectorAll('[data-snap-theme-toggle]');
      
      toggleElements.forEach(element => {
        const button = window.snapThemeSwitcher.createToggleButton();
        element.appendChild(button);
      });
    });
  }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  SnapThemeSwitcher.autoInit();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnapThemeSwitcher;
}

if (typeof window !== 'undefined') {
  window.SnapThemeSwitcher = SnapThemeSwitcher;
} 