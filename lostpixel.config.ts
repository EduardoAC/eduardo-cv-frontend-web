import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  pageShots: {
    breakpoints: [375, 768, 1440, 1920],
    pages: [
      { path: '/', name: 'home' },
      { path: '/about', name: 'about' },
      { path: '/contact', name: 'contact' },
      { path: '/my-projects', name: 'my-projects' },
      { path: '/my-experience', name: 'my-experience' },
      { path: '/frontend-profile', name: 'frontend-profile' },
      { path: '/backend-profile', name: 'backend-profile' },
      { path: '/software-architect-profile', name: 'software-architect-profile' },
      { path: '/blog', name: 'blog' },
      { path: '/forum', name: 'forum' },
      { path: '/projects/how-do-i-build-it', name: 'how-do-i-build-it' },
    ],
    baseUrl: 'http://localhost:3001',
  },
  generateOnly: true,
  failOnDifference: true,
};
