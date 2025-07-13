# Snap Components - Modern Token-Based CSS Framework

A modern, token-based CSS framework with advanced theme support, inspired by Radix UI themes and modern CSS practices.

## Features

- **Design Tokens**: Comprehensive token system for colors, spacing, typography, and breakpoints
- **Custom Media Queries**: Flexible breakpoint system using `@custom-media` queries
- **Modern Theme Switching**: Uses CSS `color-scheme` property and system colors for seamless theme switching
- **Multiple Color Schemes**: Easy customization with separate color scheme files
- **System Integration**: Automatic system theme detection and integration
- **Accessibility**: High contrast mode support and reduced motion preferences
- **Responsive Design**: Mobile-first responsive utilities
- **TypeScript Support**: Full TypeScript definitions included

## Quick Start

### 1. Include the CSS

```html
<link rel="stylesheet" href="components/snap-components/snap-components.css">
```

### 2. Include the JavaScript

```html
<script src="components/snap-components/js/theme-switcher.js"></script>
```

### 3. Initialize the Theme Switcher

```html
<html data-snap-auto-theme>
  <head>
    <meta name="color-scheme" content="light dark">
  </head>
  <body>
    <div data-snap-theme-toggle></div>
  </body>
</html>
```

## Design Tokens

### Colors

The color system uses a 12-step scale for each color family:

```css
/* Neutral colors */
--snap-neutral-1: hsl(0 0% 99%);
--snap-neutral-2: hsl(0 0% 97.3%);
/* ... up to neutral-12 */

/* Primary colors */
--snap-primary-1: hsl(206 100% 99.2%);
--snap-primary-2: hsl(210 100% 98%);
/* ... up to primary-12 */

/* Semantic colors */
--snap-success-1: hsl(142 76% 97%);
--snap-warning-1: hsl(38 92% 97%);
--snap-error-1: hsl(0 84% 97%);
--snap-info-1: hsl(199 89% 97%);
```

### Spacing

Based on a 4px grid system:

```css
--snap-space-0: 0px;
--snap-space-1: 4px;
--snap-space-2: 8px;
--snap-space-3: 12px;
/* ... up to space-20 */

/* Semantic spacing */
--snap-space-gutter: var(--snap-space-4);
--snap-space-section: var(--snap-space-16);
--snap-space-page: var(--snap-space-8);
```

### Typography

Comprehensive typography scale:

```css
/* Font sizes */
--snap-text-xs: 0.75rem;    /* 12px */
--snap-text-sm: 0.875rem;   /* 14px */
--snap-text-base: 1rem;     /* 16px */
--snap-text-lg: 1.125rem;   /* 18px */
/* ... up to text-9xl */

/* Font weights */
--snap-font-thin: 100;
--snap-font-light: 300;
--snap-font-normal: 400;
--snap-font-medium: 500;
--snap-font-semibold: 600;
--snap-font-bold: 700;
--snap-font-black: 900;
```

### Breakpoints

Using `@custom-media` queries for flexibility:

```css
/* Base breakpoints */
@custom-media --snap-xs (min-width: 480px);
@custom-media --snap-sm (min-width: 576px);
@custom-media --snap-md (min-width: 768px);
@custom-media --snap-lg (min-width: 992px);
@custom-media --snap-xl (min-width: 1200px);
@custom-media --snap-2xl (min-width: 1400px);

/* Device type breakpoints */
@custom-media --snap-mobile (max-width: 767px);
@custom-media --snap-tablet (min-width: 768px) and (max-width: 1023px);
@custom-media --snap-desktop (min-width: 1024px);

/* Theme breakpoints */
@custom-media --snap-theme-light [data-theme="light"];
@custom-media --snap-theme-dark [data-theme="dark"];
```

## Color Schemes

### Base Scheme

The default color scheme maps design tokens to semantic colors:

```css
/* Background colors */
--snap-color-background: var(--snap-neutral-1);
--snap-color-background-hover: var(--snap-neutral-2);

/* Text colors */
--snap-color-text: var(--snap-neutral-12);
--snap-color-text-muted: var(--snap-neutral-11);

/* Border colors */
--snap-color-border: var(--snap-neutral-6);
--snap-color-border-focus: var(--snap-primary-8);
```

### Custom Schemes

Create custom color schemes by adding new files in `css/schemes/`:

```css
/* css/schemes/_purple-scheme.css */
[data-scheme="purple"] {
  --snap-primary-1: hsl(280 100% 99.2%);
  --snap-primary-2: hsl(280 100% 98%);
  /* ... define all primary colors */
}

[data-scheme="purple"][data-theme="dark"] {
  --snap-primary-1: hsl(280 84% 4.9%);
  --snap-primary-2: hsl(280 27.9% 16.9%);
  /* ... define dark theme colors */
}
```

## Modern Theme Switching

### CSS-Based Theme Switching

Uses the modern `color-scheme` property and system colors:

```css
:root {
  color-scheme: light;
  --snap-bg: Canvas;
  --snap-fg: CanvasText;
  --snap-border: ButtonBorder;
}

[data-theme="dark"] {
  color-scheme: dark;
}

/* System theme detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
  }
}
```

### JavaScript API

```javascript
// Initialize theme switcher
const themeSwitcher = new SnapThemeSwitcher({
  storageKey: 'my-theme',
  defaultTheme: 'system',
  defaultScheme: 'base'
});

// Switch themes
themeSwitcher.setTheme('dark');
themeSwitcher.setScheme('purple');

// Toggle themes
themeSwitcher.toggleTheme();
themeSwitcher.cycleScheme();

// Get current state
console.log(themeSwitcher.getTheme()); // 'dark'
console.log(themeSwitcher.getScheme()); // 'purple'
console.log(themeSwitcher.isDarkTheme()); // true
```

## Responsive Utilities

### Using Custom Media Queries

```css
/* Responsive display */
.snap-hidden {
  display: none;
}

@media (--snap-md) {
  .snap-hidden {
    display: block;
  }
}

/* Responsive text sizes */
.snap-text-sm {
  font-size: var(--snap-text-sm);
}

@media (--snap-lg) {
  .snap-text-sm {
    font-size: var(--snap-text-base);
  }
}

/* Responsive spacing */
.snap-p-4 {
  padding: var(--snap-space-4);
}

@media (--snap-xl) {
  .snap-p-4 {
    padding: var(--snap-space-6);
  }
}
```

### Grid System

```css
/* Responsive grid */
.snap-grid {
  display: grid;
  gap: var(--snap-space-grid-gap);
}

@media (--snap-grid-1-column) {
  .snap-grid {
    grid-template-columns: 1fr;
  }
}

@media (--snap-grid-2-column) {
  .snap-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (--snap-grid-3-column) {
  .snap-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Theme Utilities

### Background Utilities

```css
.snap-bg-theme { background-color: var(--snap-color-background); }
.snap-bg-theme-hover { background-color: var(--snap-color-background-hover); }
.snap-bg-surface { background-color: var(--snap-color-surface); }
.snap-bg-surface-hover { background-color: var(--snap-color-surface-hover); }
```

### Text Utilities

```css
.snap-text-theme { color: var(--snap-color-text); }
.snap-text-theme-muted { color: var(--snap-color-text-muted); }
.snap-text-theme-subtle { color: var(--snap-color-text-subtle); }
.snap-text-theme-contrast { color: var(--snap-color-text-contrast); }
```

### Border Utilities

```css
.snap-border-theme { border-color: var(--snap-color-border); }
.snap-border-theme-hover { border-color: var(--snap-color-border-hover); }
.snap-border-theme-focus { border-color: var(--snap-color-border-focus); }
```

### Button Utilities

```css
.snap-button-theme {
  background-color: var(--snap-color-button);
  color: var(--snap-color-button-text);
  border-color: var(--snap-color-button-border);
}

.snap-button-theme:hover {
  background-color: var(--snap-color-background-hover);
  border-color: var(--snap-color-border-hover);
}
```

## Accessibility

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --snap-color-border-focus: Highlight;
    --snap-color-highlight: Highlight;
    --snap-color-highlight-text: HighlightText;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
```

### Focus Management

```css
.snap-focus-ring:focus {
  outline: 2px solid var(--snap-color-focus);
  outline-offset: 2px;
}

@media (--snap-focus-ring) {
  .snap-focus-ring:focus-visible {
    outline: 2px solid var(--snap-color-focus);
    outline-offset: 2px;
  }
}
```

## File Structure

```
components/snap-components/
├── css/
│   ├── tokens/
│   │   ├── _colors.css          # Color design tokens
│   │   ├── _spacing.css         # Spacing design tokens
│   │   ├── _typography.css      # Typography design tokens
│   │   └── _breakpoints.css     # Custom media queries
│   ├── schemes/
│   │   ├── _base-scheme.css     # Base color scheme
│   │   └── _purple-scheme.css   # Custom purple scheme
│   ├── theme/
│   │   ├── _modern-theme-switcher.css  # Modern theme system
│   │   ├── _utilities.css       # Theme utilities
│   │   ├── _responsive.css      # Responsive utilities
│   │   └── _theme-switcher.css  # Theme switcher styles
│   ├── base/
│   │   ├── _reset.css           # CSS reset
│   │   ├── _utilities.css       # Base utilities
│   │   └── _variables.css       # Base variables
│   ├── components/
│   │   ├── _alert.css           # Alert component
│   │   ├── _button.css          # Button component
│   │   ├── _card.css            # Card component
│   │   ├── _container.css       # Container component
│   │   └── _grid.css            # Grid component
│   └── layout/
│       ├── _columns.css         # Column layout
│       ├── _container.css       # Container layout
│       └── _grid.css            # Grid layout
├── js/
│   └── theme-switcher.js        # Theme switcher JavaScript
├── examples/
│   └── theme-demo.html          # Interactive demo
├── snap-components.css          # Main CSS file
└── README.md                    # This file
```

## Browser Support

- **Modern browsers**: Full support for all features
- **CSS Custom Properties**: IE11+ (with polyfill)
- **CSS Custom Media Queries**: Requires PostCSS or similar processor
- **color-scheme**: Chrome 81+, Firefox 67+, Safari 13+
- **System Colors**: Chrome 81+, Firefox 67+, Safari 13+

## Customization

### Adding New Color Schemes

1. Create a new file in `css/schemes/` (e.g., `_blue-scheme.css`)
2. Define your color tokens using the 12-step scale
3. Import the file in `snap-components.css`
4. Add the scheme name to the JavaScript schemes array

### Adding New Design Tokens

1. Add tokens to the appropriate token file
2. Update the base scheme to use the new tokens
3. Add corresponding utilities if needed

### Custom Breakpoints

1. Add new `@custom-media` queries in `_breakpoints.css`
2. Use them in your responsive utilities
3. Update the JavaScript if needed

## Contributing

1. Follow the existing token naming conventions
2. Ensure all color schemes work in both light and dark themes
3. Test accessibility features (high contrast, reduced motion)
4. Update documentation for new features
5. Add examples for new utilities or components

## License

MIT License - see LICENSE file for details.

## References

- [Radix UI Themes](https://github.com/radix-ui/themes) - Inspiration for design tokens and structure
- [CSS-Tricks: Come to the Light-Dark Side](https://css-tricks.com/come-to-the-light-dark-side/) - Modern theme switching approach
- [CSS Custom Media Queries](https://drafts.csswg.org/mediaqueries-5/#custom-mq) - Specification for custom media queries 