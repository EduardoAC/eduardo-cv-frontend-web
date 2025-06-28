# eduardo-cv-frontend-web
Hi readers, My name is Eduardo Aparicio Cardenes.
 
I'm software architect with wide background in Frontend and Backend developer as part of my CV presentation I will create a website, extensions and components that show my skills in each area. 

Please be welcome to reuse, share or comment any of the code.

# Eduardo Aparicio Cardenes - Interactive CV

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd eduardo-cv-frontend-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers (required for visual regression testing):
   ```bash
   npx playwright install
   ```

4. Start the development server:
   ```bash
   npm run dev -- --port 3001
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

## 🎨 Visual Regression Testing with Lost Pixel

This project uses [Lost Pixel](https://lost-pixel.com/) for visual regression testing to ensure UI consistency across changes.

### Setup for Visual Regression Testing

1. **Install dependencies** (includes Lost Pixel and compatible Playwright version):
   ```bash
   npm install
   ```

2. **Install Playwright browsers** (required for Lost Pixel):
   ```bash
   npx playwright install
   ```

3. **Start the Next.js development server** (on port 3001):
   ```bash
   npm run dev -- --port 3001
   ```

4. **Run visual regression tests** (in another terminal):
   ```bash
   npm run lost-pixel
   ```

### Lost Pixel Commands

- **Generate screenshots**: `npm run lost-pixel`
- **Update baseline images**: `npm run lost-pixel:update`

### Configuration

Lost Pixel is configured in `lostpixel.config.ts` to capture screenshots of:
- Home page (`/`)
- About page (`/about`)
- Contact page (`/contact`)
- My Projects page (`/my-projects`)
- My Experience page (`/my-experience`)
- Frontend Profile page (`/frontend-profile`)
- Backend Profile page (`/backend-profile`)
- Software Architect Profile page (`/software-architect-profile`)
- Blog page (`/blog`)
- Forum page (`/forum`)
- How Do I Build It page (`/projects/how-do-i-build-it`)

### How It Works

Lost Pixel uses three key directories:
- **`.lostpixel/baseline/`** - Reference screenshots (committed to git)
- **`.lostpixel/current/`** - Latest screenshots (ignored by git)
- **`.lostpixel/difference/`** - Visual differences (ignored by git)

When you run `npm run lost-pixel`, it compares current screenshots against the baseline and reports any visual differences.

### Updating Baseline Images

When you make intentional UI changes, update the baseline images:
```bash
npm run lost-pixel:update
```

This will replace the baseline images with the current screenshots, establishing a new reference point.

### Troubleshooting

If you encounter browser-related errors:
1. Ensure you've run `npx playwright install`
2. Make sure the development server is running on port 3001
3. Check that all dependencies are properly installed

## 🚀 Optimized Navbar Features

The website features an enhanced navigation header that maintains the original Bootstrap 3 design system while adding modern responsive functionality:

### ✨ Key Features

- **Fixed Position**: Stays at the top when scrolling for easy navigation
- **Mobile-First Design**: Optimized for small devices with hamburger menu
- **Responsive Layout**: Scales beautifully from mobile to desktop
- **SEO Optimized**: Semantic HTML structure with proper heading hierarchy
- **Accessibility**: Full keyboard navigation and screen reader support
- **Bootstrap 3 Compatible**: Maintains original design system and color scheme
- **Performance**: Minimal JavaScript, leverages native browser capabilities

### 📱 Mobile Experience

- Hamburger menu on the left side (Bootstrap 3 style)
- Collapsible dropdown navigation
- Smooth animations and transitions
- Touch-friendly interface
- Prevents body scroll when menu is open

### 🖥️ Desktop Experience

- Horizontal navigation menu on the right
- Hover effects with color transitions
- Clean, professional appearance matching original design
- Optimized spacing and typography

### ♿ Accessibility Features

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion preferences respected
- Screen reader friendly

### 🎨 Design Features

- Maintains original Bootstrap 3 color scheme (#9B2B9A links, #9d9d9d brand)
- Smooth transitions and animations
- Responsive typography scaling
- Consistent with existing design system
- Professional dark theme

### 🔧 Technical Implementation

- Built with React and TypeScript
- Uses CSS-in-JS for scoped styling
- Mobile-first responsive design
- Semantic HTML structure
- Bootstrap 3 compatible classes
- Optimized for performance
