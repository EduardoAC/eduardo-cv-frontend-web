/**
 * Snap Components Modern Theme Switcher
 * 
 * A modern theme switching utility that uses the CSS color-scheme property
 * and supports custom color schemes, system theme detection, and accessibility features.
 * 
 * Based on the CSS-Tricks article: https://css-tricks.com/come-to-the-light-dark-side/
 */

class SnapThemeSwitcher {
  constructor(options = {}) {
    this.options = {
      storageKey: 'snap-theme',
      schemeStorageKey: 'snap-scheme',
      defaultTheme: 'system',
      defaultScheme: 'base',
      autoInit: true,
      autoCreateToggle: true,
      toggleSelector: '[data-snap-theme-toggle]',
      ...options
    };

    this.themes = ['light', 'dark', 'system'];
    this.schemes = ['base', 'purple']; // Add more schemes as needed
    this.currentTheme = null;
    this.currentScheme = null;
    this.metaElement = null;

    if (this.options.autoInit) {
      this.init();
    }
  }

  /**
   * Initialize the theme switcher
   */
  init() {
    // Add loading class to prevent flash
    document.documentElement.classList.add('snap-theme-loading');

    // Find or create meta element
    this.metaElement = this.getMetaElement();

    // Load saved preferences
    this.loadPreferences();

    // Apply theme and scheme
    this.applyTheme();
    this.applyScheme();

    // Remove loading class
    document.documentElement.classList.remove('snap-theme-loading');
    document.documentElement.classList.add('snap-theme-ready');

    // Auto-create toggle buttons
    if (this.options.autoCreateToggle) {
      this.createToggleButtons();
    }

    // Listen for system theme changes
    this.listenForSystemChanges();

    // Dispatch ready event
    this.dispatchEvent('snap-theme-ready', {
      theme: this.currentTheme,
      scheme: this.currentScheme
    });
  }

  /**
   * Get or create the meta element for color-scheme
   */
  getMetaElement() {
    let meta = document.querySelector('meta[name="color-scheme"]');
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'color-scheme';
      document.head.appendChild(meta);
    }
    
    return meta;
  }

  /**
   * Load saved preferences from localStorage
   */
  loadPreferences() {
    // Load theme preference
    const savedTheme = localStorage.getItem(this.options.storageKey);
    this.currentTheme = savedTheme && this.themes.includes(savedTheme) 
      ? savedTheme 
      : this.options.defaultTheme;

    // Load scheme preference
    const savedScheme = localStorage.getItem(this.options.schemeStorageKey);
    this.currentScheme = savedScheme && this.schemes.includes(savedScheme)
      ? savedScheme
      : this.options.defaultScheme;
  }

  /**
   * Apply the current theme
   */
  applyTheme() {
    const root = document.documentElement;
    
    // Remove existing theme attributes
    root.removeAttribute('data-theme');
    
    // Apply theme based on current setting
    if (this.currentTheme === 'system') {
      // Let CSS handle system theme detection
      this.metaElement.setAttribute('content', 'light dark');
    } else {
      // Apply specific theme
      root.setAttribute('data-theme', this.currentTheme);
      this.metaElement.setAttribute('content', this.currentTheme);
    }

    // Update meta theme attribute for SEO
    this.updateMetaTheme();
  }

  /**
   * Apply the current color scheme
   */
  applyScheme() {
    const root = document.documentElement;
    
    // Remove existing scheme attributes
    root.removeAttribute('data-scheme');
    
    // Apply scheme if not base
    if (this.currentScheme !== 'base') {
      root.setAttribute('data-scheme', this.currentScheme);
    }
  }

  /**
   * Update meta theme attribute for SEO
   */
  updateMetaTheme() {
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }

    // Set theme color based on current theme and scheme
    const isDark = this.isDarkTheme();
    const themeColor = isDark ? '#000000' : '#ffffff';
    metaTheme.setAttribute('content', themeColor);
  }

  /**
   * Check if current theme is dark
   */
  isDarkTheme() {
    if (this.currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return this.currentTheme === 'dark';
  }

  /**
   * Switch to a specific theme
   */
  setTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Available themes: ${this.themes.join(', ')}`);
      return;
    }

    this.currentTheme = theme;
    localStorage.setItem(this.options.storageKey, theme);
    this.applyTheme();

    this.dispatchEvent('snap-theme-changed', {
      theme: this.currentTheme,
      scheme: this.currentScheme,
      isDark: this.isDarkTheme()
    });
  }

  /**
   * Switch to a specific color scheme
   */
  setScheme(scheme) {
    if (!this.schemes.includes(scheme)) {
      console.warn(`Invalid scheme: ${scheme}. Available schemes: ${this.schemes.join(', ')}`);
      return;
    }

    this.currentScheme = scheme;
    localStorage.setItem(this.options.schemeStorageKey, scheme);
    this.applyScheme();

    this.dispatchEvent('snap-scheme-changed', {
      theme: this.currentTheme,
      scheme: this.currentScheme,
      isDark: this.isDarkTheme()
    });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    if (this.currentTheme === 'system') {
      // If system, switch to light
      this.setTheme('light');
    } else if (this.currentTheme === 'light') {
      // If light, switch to dark
      this.setTheme('dark');
    } else {
      // If dark, switch to system
      this.setTheme('system');
    }
  }

  /**
   * Cycle through available color schemes
   */
  cycleScheme() {
    const currentIndex = this.schemes.indexOf(this.currentScheme);
    const nextIndex = (currentIndex + 1) % this.schemes.length;
    this.setScheme(this.schemes[nextIndex]);
  }

  /**
   * Create toggle buttons automatically
   */
  createToggleButtons() {
    const toggleElements = document.querySelectorAll(this.options.toggleSelector);
    
    toggleElements.forEach(element => {
      this.setupToggleButton(element);
    });
  }

  /**
   * Setup a toggle button with event listeners
   */
  setupToggleButton(element) {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'snap-theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = `
      <svg class="snap-theme-icon sun" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
      </svg>
      <svg class="snap-theme-icon moon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
      </svg>
    `;

    // Create scheme toggle button
    const schemeToggle = document.createElement('button');
    schemeToggle.className = 'snap-theme-toggle snap-scheme-toggle';
    schemeToggle.setAttribute('aria-label', 'Toggle color scheme');
    schemeToggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    `;

    // Add event listeners
    themeToggle.addEventListener('click', () => this.toggleTheme());
    schemeToggle.addEventListener('click', () => this.cycleScheme());

    // Replace element content
    element.innerHTML = '';
    element.appendChild(themeToggle);
    element.appendChild(schemeToggle);
  }

  /**
   * Listen for system theme changes
   */
  listenForSystemChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
        this.dispatchEvent('snap-theme-changed', {
          theme: this.currentTheme,
          scheme: this.currentScheme,
          isDark: this.isDarkTheme()
        });
      }
    });
  }

  /**
   * Dispatch custom events
   */
  dispatchEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail,
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Get current theme
   */
  getTheme() {
    return this.currentTheme;
  }

  /**
   * Get current scheme
   */
  getScheme() {
    return this.currentScheme;
  }

  /**
   * Get available themes
   */
  getThemes() {
    return [...this.themes];
  }

  /**
   * Get available schemes
   */
  getSchemes() {
    return [...this.schemes];
  }

  /**
   * Add a new color scheme
   */
  addScheme(schemeName, schemeConfig) {
    if (this.schemes.includes(schemeName)) {
      console.warn(`Scheme ${schemeName} already exists`);
      return;
    }

    this.schemes.push(schemeName);
    
    // You could also dynamically inject CSS here
    // this.injectSchemeCSS(schemeName, schemeConfig);
  }

  /**
   * Remove a color scheme
   */
  removeScheme(schemeName) {
    const index = this.schemes.indexOf(schemeName);
    if (index > -1) {
      this.schemes.splice(index, 1);
      
      // If current scheme is removed, switch to base
      if (this.currentScheme === schemeName) {
        this.setScheme('base');
      }
    }
  }
}

// Auto-initialize if script is loaded
if (typeof window !== 'undefined') {
  // Create global instance
  window.SnapThemeSwitcher = SnapThemeSwitcher;
  
  // Auto-initialize if data attribute is present
  if (document.documentElement.hasAttribute('data-snap-auto-theme')) {
    window.snapTheme = new SnapThemeSwitcher();
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnapThemeSwitcher;
}

// Export for ES modules
if (typeof exports !== 'undefined') {
  exports.SnapThemeSwitcher = SnapThemeSwitcher;
} 