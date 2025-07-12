# Snap Components Theme System

A comprehensive CSS-based theme system for personalizing content, built with CSS custom properties and following the Radix UI themes approach.

## Features

- **Breakpoints**: Responsive design with customizable breakpoints
- **Colors**: Complete color system with light/dark themes
- **Spacing**: Consistent spacing scale based on 4px grid
- **Layout**: Grid system, containers, and layout utilities
- **Typography**: Font families, sizes, weights, and line heights
- **Theme Switching**: Light/dark theme support with system preference detection
- **Accessibility**: High contrast and reduced motion support

## Quick Start

### 1. Include the CSS

```html
<link rel="stylesheet" href="/components/snap-components/snap-components.css">
```

### 2. Include the JavaScript (optional)

```html
<script src="/components/snap-components/js/theme-switcher.js"></script>
```

### 3. Add theme toggle button

```html
<div data-snap-theme-toggle></div>
```

## Breakpoints

The theme system includes 6 breakpoints:

| Breakpoint | Value | Container Max Width |
|------------|-------|-------------------|
| xs         | 480px | 100%              |
| sm         | 576px | 540px             |
| md         | 768px | 720px             |
| lg         | 992px | 960px              |
| xl         | 1200px| 1140px             |
| 2xl        | 1400px| 1320px             |

### Usage

```html
<!-- Responsive container -->
<div class="snap-container">
  <!-- Content -->
</div>

<!-- Responsive utilities -->
<div class="snap-text-lg snap-md:text-xl snap-lg:text-2xl">
  Responsive text
</div>

<!-- Responsive grid -->
<div class="snap-grid">
  <div class="snap-col-span-12 snap-md:col-span-6 snap-lg:col-span-4">
    Grid item
  </div>
</div>
```

## Colors

### Color Scale

The theme uses a 12-step color scale for both neutral and primary colors:

```css
/* Neutral colors (1-12) */
--snap-color-neutral-1: hsl(0 0% 99%);    /* Lightest */
--snap-color-neutral-12: hsl(0 0% 9%);    /* Darkest */

/* Primary colors (1-12) */
--snap-color-primary-1: hsl(206 100% 99.2%);
--snap-color-primary-9: hsl(206 100% 50%); /* Main brand color */
--snap-color-primary-12: hsl(222 84% 4.9%);
```

### Semantic Colors

```css
--snap-color-success-9: hsl(142 76% 36%);
--snap-color-warning-9: hsl(38 92% 50%);
--snap-color-error-9: hsl(0 84% 60%);
--snap-color-info-9: hsl(199 89% 48%);
```

### Usage

```html
<!-- Background colors -->
<div class="snap-bg-neutral-1">Light background</div>
<div class="snap-bg-primary-9">Primary background</div>
<div class="snap-bg-success">Success background</div>

<!-- Text colors -->
<p class="snap-text-default">Default text</p>
<p class="snap-text-muted">Muted text</p>
<p class="snap-text-primary-9">Primary text</p>

<!-- Border colors -->
<div class="snap-border-default">Default border</div>
<div class="snap-border-focus">Focus border</div>
```

## Spacing

### Spacing Scale

Based on a 4px grid system:

```css
--snap-space-0: 0px;
--snap-space-1: 4px;
--snap-space-2: 8px;
--snap-space-3: 12px;
--snap-space-4: 16px;
--snap-space-5: 20px;
--snap-space-6: 24px;
--snap-space-8: 32px;
--snap-space-10: 40px;
--snap-space-12: 48px;
--snap-space-16: 64px;
--snap-space-20: 80px;
```

### Usage

```html
<!-- Margin -->
<div class="snap-m-4">Margin all sides</div>
<div class="snap-mx-auto">Center horizontally</div>
<div class="snap-my-8">Vertical margin</div>

<!-- Padding -->
<div class="snap-p-4">Padding all sides</div>
<div class="snap-px-6">Horizontal padding</div>
<div class="snap-py-12">Vertical padding</div>

<!-- Gap -->
<div class="snap-grid snap-gap-4">Grid with gap</div>
```

## Typography

### Font Families

```css
--snap-font-sans: ui-sans-serif, system-ui, ...;
--snap-font-mono: ui-monospace, SFMono-Regular, ...;
--snap-font-serif: ui-serif, Georgia, ...;
```

### Font Sizes

```css
--snap-text-xs: 0.75rem;    /* 12px */
--snap-text-sm: 0.875rem;   /* 14px */
--snap-text-base: 1rem;     /* 16px */
--snap-text-lg: 1.125rem;   /* 18px */
--snap-text-xl: 1.25rem;    /* 20px */
--snap-text-2xl: 1.5rem;    /* 24px */
--snap-text-3xl: 1.875rem;  /* 30px */
--snap-text-4xl: 2.25rem;   /* 36px */
--snap-text-5xl: 3rem;      /* 48px */
--snap-text-6xl: 3.75rem;   /* 60px */
```

### Usage

```html
<!-- Font families -->
<p class="snap-font-sans">Sans-serif text</p>
<p class="snap-font-mono">Monospace text</p>
<p class="snap-font-serif">Serif text</p>

<!-- Font sizes -->
<h1 class="snap-text-4xl snap-font-bold">Large heading</h1>
<p class="snap-text-base snap-leading-normal">Body text</p>
<small class="snap-text-sm snap-text-muted">Small text</small>

<!-- Font weights -->
<p class="snap-font-normal">Normal weight</p>
<p class="snap-font-medium">Medium weight</p>
<p class="snap-font-bold">Bold weight</p>

<!-- Line heights -->
<p class="snap-leading-tight">Tight line height</p>
<p class="snap-leading-normal">Normal line height</p>
<p class="snap-leading-relaxed">Relaxed line height</p>
```

## Layout

### Container

```html
<div class="snap-container">
  <!-- Content with responsive max-width -->
</div>
```

### Grid System

```html
<!-- 12-column grid -->
<div class="snap-grid">
  <div class="snap-col-span-12 snap-md:col-span-6 snap-lg:col-span-4">
    <!-- Grid item -->
  </div>
</div>

<!-- Grid with different gaps -->
<div class="snap-grid snap-gap-4">Default gap</div>
<div class="snap-grid snap-gap-sm">Small gap</div>
<div class="snap-grid snap-gap-lg">Large gap</div>
```

### Border Radius

```css
--snap-radius-1: 2px;
--snap-radius-2: 4px;
--snap-radius-3: 6px;
--snap-radius-4: 8px;
--snap-radius-5: 10px;
--snap-radius-6: 12px;
--snap-radius-8: 16px;
--snap-radius-10: 20px;
```

### Usage

```html
<div class="snap-rounded-4">Rounded corners</div>
<div class="snap-rounded-8">More rounded</div>
```

### Shadows

```css
--snap-shadow-1: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--snap-shadow-2: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--snap-shadow-3: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--snap-shadow-4: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--snap-shadow-5: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Usage

```html
<div class="snap-shadow-2">Card with shadow</div>
<div class="snap-shadow-4">Elevated element</div>
```

## Theme Switching

### Automatic Setup

Include the JavaScript file and add a toggle button:

```html
<script src="/components/snap-components/js/theme-switcher.js"></script>

<div data-snap-theme-toggle></div>
```

### Manual Setup

```javascript
// Create theme switcher instance
const themeSwitcher = new SnapThemeSwitcher({
  storageKey: 'my-app-theme',
  defaultTheme: 'system'
});

// Switch themes
themeSwitcher.switchTheme('dark');
themeSwitcher.switchTheme('light');
themeSwitcher.switchTheme('system');

// Toggle between light and dark
themeSwitcher.toggleTheme();

// Listen for theme changes
window.addEventListener('snap-theme-change', (event) => {
  console.log('Theme changed to:', event.detail.theme);
  console.log('Effective theme:', event.detail.effectiveTheme);
});
```

### Theme Options

- `light`: Always use light theme
- `dark`: Always use dark theme
- `system`: Follow system preference (default)

## Customization

### Overriding Theme Variables

```css
:root {
  /* Override primary colors */
  --snap-color-primary-9: hsl(220 100% 50%);
  --snap-color-primary-10: hsl(220 100% 47.3%);
  --snap-color-primary-11: hsl(220 100% 43%);
  
  /* Override spacing */
  --snap-space-gutter: 20px;
  --snap-space-section: 80px;
  
  /* Override breakpoints */
  --snap-breakpoint-lg: 1024px;
  --snap-container-max-width-lg: 1024px;
}
```

### Creating Custom Themes

```css
[data-theme="custom"] {
  /* Custom color palette */
  --snap-color-neutral-1: hsl(0 0% 98%);
  --snap-color-neutral-12: hsl(0 0% 8%);
  
  /* Custom primary colors */
  --snap-color-primary-9: hsl(280 100% 50%);
  --snap-color-primary-10: hsl(280 100% 47.3%);
  --snap-color-primary-11: hsl(280 100% 43%);
}
```

## Accessibility

### High Contrast Support

The theme automatically adapts to high contrast mode:

```css
@media (prefers-contrast: high) {
  /* Enhanced contrast colors */
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* Disabled transitions */
}
```

### Focus Indicators

```html
<button class="snap-border-focus">Button with focus indicator</button>
```

## Browser Support

- Modern browsers with CSS custom properties support
- IE11+ with polyfills for CSS custom properties
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## File Structure

```
components/snap-components/
├── css/
│   ├── base/
│   │   ├── _reset.css
│   │   ├── _variables.css
│   │   └── _utilities.css
│   ├── theme/
│   │   ├── _theme.css              # Main theme variables
│   │   ├── _dark-theme.css         # Dark theme overrides
│   │   ├── _utilities.css          # Theme utility classes
│   │   ├── _responsive.css         # Responsive utilities
│   │   └── _theme-switcher.css     # Theme switching styles
│   ├── layout/
│   │   ├── _container.css
│   │   ├── _grid.css
│   │   └── _columns.css
│   └── components/
│       ├── _button.css
│       └── _alert.css
├── js/
│   └── theme-switcher.js           # Theme switching JavaScript
├── snap-components.css             # Main CSS file
└── README.md                       # This documentation
```

## Examples

### Complete Component Example

```html
<div class="snap-container snap-py-16">
  <div class="snap-grid snap-gap-8">
    <div class="snap-col-span-12 snap-md:col-span-6">
      <h1 class="snap-text-4xl snap-font-bold snap-text-default snap-mb-4">
        Welcome to Snap Components
      </h1>
      <p class="snap-text-lg snap-text-muted snap-mb-6">
        A comprehensive theme system for modern web applications.
      </p>
      <button class="snap-bg-primary-9 snap-text-contrast snap-px-6 snap-py-3 snap-rounded-4 snap-font-medium">
        Get Started
      </button>
    </div>
    <div class="snap-col-span-12 snap-md:col-span-6">
      <div class="snap-bg-surface snap-p-8 snap-rounded-6 snap-shadow-2">
        <h2 class="snap-text-2xl snap-font-semibold snap-mb-4">Feature Card</h2>
        <p class="snap-text-muted">This card demonstrates the theme system.</p>
      </div>
    </div>
  </div>
</div>
```

### Theme Toggle Example

```html
<header class="snap-bg-surface snap-p-4 snap-border-b snap-border-default">
  <div class="snap-container">
    <div class="snap-flex snap-justify-between snap-items-center">
      <h1 class="snap-text-xl snap-font-bold">My App</h1>
      <div data-snap-theme-toggle></div>
    </div>
  </div>
</header>
```

## Contributing

When contributing to the theme system:

1. Follow the existing naming conventions
2. Use CSS custom properties for all values
3. Include both light and dark theme variants
4. Add responsive utilities where appropriate
5. Test with accessibility tools
6. Update documentation

## License

This theme system is part of the Snap Components framework and follows the same license as the main project. 