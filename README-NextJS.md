# Eduardo CV Frontend - Next.js Migration

This is the Next.js version of Eduardo Aparicio Cardenes' interactive CV website, migrated from the original Yii2 PHP application.

## Features

- **Modern React/Next.js Architecture**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Maintains the original responsive design using Bootstrap 3
- **Component-Based Structure**: Modular components for easy maintenance
- **SEO Optimized**: Built-in SEO features with Next.js metadata
- **Performance Optimized**: Image optimization and modern build tools

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: SCSS with Bootstrap 3
- **Icons**: Font Awesome 6
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run serve
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Introduction.tsx
│   ├── Profiles.tsx
│   ├── Projects.tsx
│   ├── ContentBlogs.tsx
│   ├── JobsTimeline.tsx
│   ├── Greetings.tsx
│   └── ProfileBlock.tsx
├── styles/               # SCSS styles
│   ├── homepage.scss
│   ├── organisms/
│   └── molecules/
├── public/               # Static assets
│   └── images/
└── package.json
```

## Components

- **Introduction**: Hero section with background image and title
- **Profiles**: Three main professional categories (Frontend, Backend, Software Architect)
- **Projects**: Showcase of projects and hackathons
- **ContentBlogs**: Business and technology blog section
- **JobsTimeline**: Career timeline and experience
- **Greetings**: Contact information and social links

## Migration Notes

This migration preserves:
- Original design and layout
- All content and images
- Responsive behavior
- SEO metadata
- Google Analytics integration

## Original vs Next.js

| Feature | Original (Yii2) | Next.js |
|---------|----------------|---------|
| Framework | PHP Yii2 | Next.js 14 |
| Language | PHP | TypeScript |
| Styling | SCSS | SCSS + CSS Modules |
| Images | Static | Optimized with Next.js Image |
| SEO | Manual meta tags | Built-in metadata API |
| Performance | Server-side | Static generation + SSR |

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Same as the original project. 