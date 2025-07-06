# Eduardo Aparicio Cardenes - Interactive CV

> **Software Architect & Full-Stack Developer** | Building modern web experiences with cutting-edge technologies

## 📋 Project Status

🔄 **Work in Progress** - This project has successfully migrated from PHP/Yii2 (2014) to Next.js 14 (2024) and is currently under active development. The migration is complete, but ongoing improvements and new features are being added.

### Current Development Phase
- ✅ **Migration Complete**: Successfully migrated from PHP/Yii2 to Next.js 14
- 🔄 **Post-Migration Development**: Adding new features and improvements
- 🚧 **Active Development**: Regular updates and enhancements
- 📈 **Performance Optimisation**: Continuous performance improvements

## 👨‍💻 About Me

Hi! I'm **Eduardo Aparicio Cardenes**, a passionate Software Architect with extensive experience in both Frontend and Backend development. This repository showcases my interactive CV website, demonstrating my technical skills, professional journey, and commitment to modern web development practices.

### 🎯 What I Do
- **Software Architecture**: Design scalable, maintainable systems
- **Frontend Development**: React, Next.js, TypeScript, modern CSS
- **Backend Development**: API design, database optimisation, server-side logic
- **Performance Optimisation**: Core Web Vitals, Lighthouse optimisation, bundle analysis
- **DevOps & Testing**: CI/CD, visual regression testing, automated quality assurance

## 🚀 Project Overview

This is my **interactive CV website** - a modern, performant web application built with Next.js that showcases my professional experience, technical skills, and projects. The site serves as both a portfolio and a demonstration of my development capabilities.

### ✨ Key Features
- **Responsive Design**: Optimised for all devices and screen sizes
- **Performance Optimised**: 95-100% Lighthouse performance scores
- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Sass
- **Visual Regression Testing**: Automated UI consistency checks
- **SEO Optimised**: Semantic HTML, meta tags, structured data
- **Accessibility**: WCAG compliant, keyboard navigation, screen reader support

## 🛠️ Technology Stack

### Core Technologies
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Sass/SCSS with CSS Modules
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Testing**: Playwright for visual regression testing
- **Performance**: Lighthouse CI, bundle analysis
- **Visual Testing**: Lost Pixel for UI consistency
- **Image Optimisation**: Sharp for WebP conversion and optimisation

### Performance & Quality
- **Bundle Analysis**: Next.js bundle analyser
- **Performance Monitoring**: Lighthouse audits
- **Visual Regression**: Automated screenshot comparison
- **Code Quality**: TypeScript strict mode, ESLint rules

## 📊 Migration Accomplishments

### 🎯 Performance Excellence
- **Lighthouse Performance**: 95-100% scores across all pages
- **Core Web Vitals**: All metrics in "Good" range
- **Bundle Optimisation**: Analysed and optimised JavaScript bundles
- **Image Optimisation**: 96% reduction in contact page SVG (1.2MB → 45KB)

### 🏗️ Architecture Improvements
- **Component Unification**: Replaced snap-components with custom React components
- **Code Consolidation**: Eliminated duplication across profile pages
- **Maintainability**: Unified Container and Card components
- **Type Safety**: Full TypeScript implementation

### 🧪 Quality Assurance
- **Visual Regression Testing**: Automated UI consistency checks
- **Cross-browser Compatibility**: Tested across all major browsers
- **Responsive Design**: Optimised for mobile, tablet, and desktop
- **Accessibility**: WCAG 2.1 AA compliance

### 🔧 Development Experience
- **Modern Tooling**: Next.js 14, React 18, TypeScript
- **Hot Reloading**: Fast development iteration
- **Build Optimisation**: Efficient production builds
- **Code Quality**: ESLint, TypeScript strict mode

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/EduardoAC/eduardo-cv-frontend-web.git
   cd eduardo-cv-frontend-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (for visual testing):
   ```bash
   npx playwright install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Performance & Testing
npm run analyse      # Analyse bundle size
npm run lighthouse   # Run Lighthouse performance audit
npm run lost-pixel   # Run visual regression tests
npm run lost-pixel:update  # Update visual test baselines
```

## 🎨 Visual Regression Testing

This project uses [Lost Pixel](https://lost-pixel.com/) for automated visual regression testing, ensuring UI consistency across changes.

### Running Visual Tests
```bash
# Start the development server first
npm run dev

# In another terminal, run visual tests
npm run lost-pixel

# Update baselines after intentional changes
npm run lost-pixel:update
```

### Test Coverage
Visual tests cover all major pages:
- Home page (`/`)
- About page (`/about`)
- Contact page (`/contact`)
- Profile pages (`/frontend-profile`, `/backend-profile`, `/software-architect-profile`)
- Project pages (`/my-projects`, `/my-experience`)
- Content pages (`/blog`, `/forum`, `/projects/how-do-i-build-it`)

## 📈 Performance Metrics

### Current Performance Scores
- **Homepage**: 99-100% Performance Score
- **About Page**: 97% Performance Score
- **Contact Page**: 81% Performance Score (optimised from 80%)
- **All Pages**: Excellent Core Web Vitals

### Optimisation Achievements
- **Image Optimisation**: 96% file size reduction on contact page
- **Bundle Size**: Optimised JavaScript bundles
- **Loading Speed**: Sub-second First Contentful Paint (FCP)
- **User Experience**: Smooth interactions and fast navigation

## 🔄 Migration Journey: From PHP/Yii2 to Next.js

### The Challenge
Originally built in **2014 with PHP and Yii2 framework**, the CV website needed modernisation to:
- Improve performance and user experience
- Adopt modern development practices
- Enhance maintainability and scalability
- Support modern web standards

### Migration Strategy
1. **Technology Selection**: Chose Next.js for its React ecosystem, SSR capabilities, and performance optimisations
2. **Gradual Migration**: Migrated page by page whilst maintaining functionality
3. **Component Architecture**: Rebuilt with modern React components and TypeScript
4. **Performance Optimisation**: Implemented comprehensive performance framework
5. **Quality Assurance**: Added visual regression testing and automated quality checks

### Key Migration Achievements
- **Framework Migration**: PHP/Yii2 → Next.js 14
- **Language Upgrade**: PHP → TypeScript
- **Styling Modernisation**: Bootstrap 3 → Custom Sass with CSS Modules
- **Performance Improvement**: 95-100% Lighthouse scores
- **Development Experience**: Modern tooling and hot reloading
- **Code Quality**: Type safety and automated testing

### Legacy Code
The original **2014 PHP/Yii2 version** is preserved in the `master` branch for reference and historical context.

## 🚧 Current Development Focus

### Active Work Areas
- **Content Updates**: Refreshing and expanding project content
- **UI/UX Improvements**: Enhancing user experience and visual design
- **Performance Optimisation**: Continuous performance monitoring and improvements
- **New Features**: Adding interactive elements and functionality
- **SEO Enhancement**: Improving search engine optimisation

### Planned Improvements
- **Enhanced Interactivity**: More dynamic user interactions
- **Content Management**: Easier content updates and management
- **Analytics Integration**: Better tracking and insights
- **Mobile Optimisation**: Further mobile experience improvements
- **Accessibility**: Enhanced accessibility features

## 🤝 Contributing

This is my personal CV website, but I welcome feedback and suggestions! Feel free to:
- Report bugs or issues
- Suggest improvements
- Ask questions about the implementation
- Share ideas for new features

## 📄 Licence

This project is open source and available under the [MIT Licence](LICENSE).

## 🔗 Connect With Me

- **Website**: [Your deployed site URL]
- **LinkedIn**: [Your LinkedIn profile]
- **GitHub**: [@EduardoAC](https://github.com/EduardoAC)
- **Email**: [Your email]

---

**Built with ❤️ using Next.js, React, and TypeScript | Work in Progress**
