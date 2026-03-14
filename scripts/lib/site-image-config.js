const SITE_IMAGE_SPECS = [
  {
    source: '/images/introduction-image-1280-optimized-1280.webp',
    widths: [640, 768, 960, 1200, 1280],
    usage: 'home-hero',
  },
  {
    source: '/images/code-projects-done-optimized-1280.webp',
    widths: [300, 400, 640],
    usage: 'home-promo',
  },
  {
    source: '/images/ideas-content-blog-optimized-1280.webp',
    widths: [300, 400, 640],
    usage: 'home-promo',
  },
  {
    source: '/images/jobs-timeline-optimized-1280.webp',
    widths: [300, 400, 640],
    usage: 'home-promo',
  },
  {
    source: '/images/finding-the-secrets-optimized-1280.webp',
    widths: [300, 400, 640],
    usage: 'home-promo',
  },
  {
    source: '/images/about-eduardo-hacktheviual-1280-optimized-1280.webp',
    widths: [640, 768, 960, 1200, 1280],
    usage: 'about-hero',
  },
  {
    source: '/images/photo-working-optimized-1280.webp',
    widths: [320, 400, 640],
    usage: 'about-inline',
  },
  {
    source: '/images/my-life-timeline-optimized-1280.webp',
    widths: [400, 640, 800],
    usage: 'about-inline',
  },
  {
    source: '/images/eduardo-challenge-complete-optimized-1280.webp',
    widths: [320, 500, 640],
    usage: 'about-inline',
  },
  {
    source: '/images/comingsoon-optimized-1280.webp',
    widths: [640, 768, 960, 1200, 1280],
    usage: 'coming-soon-hero',
  },
  {
    source: '/images/world-wide-map-optimized.svg',
    widths: [640, 960, 1280, 1920],
    usage: 'contact-background',
    allowUpscale: true,
  },
  {
    source: '/images/profiles/frontend-profile-490px.webp',
    widths: [245, 325, 490],
    usage: 'profile-tile',
  },
  {
    source: '/images/profiles/software-architect-profile-490px.webp',
    widths: [245, 325, 490],
    usage: 'profile-tile',
  },
  {
    source: '/images/profiles/eduardo-aparicio-cardenes-homepage-490px.webp',
    widths: [245, 325, 490],
    usage: 'profile-tile',
  },
  {
    source: '/images/profiles/mentor-profile-490px.webp',
    widths: [245, 325, 490],
    usage: 'profile-tile',
  },
  {
    source: '/images/profiles/backend-profile-490px-mirror.webp',
    widths: [245, 325, 490],
    usage: 'profile-tile',
  },
  {
    source: '/images/frontend/frontend-profile-v1-card.webp',
    widths: [768, 960, 1200],
    usage: 'frontend-hero-card',
  },
  {
    source: '/images/frontend/frontend-profile-v2.webp',
    widths: [768, 960, 1200, 1536],
    usage: 'frontend-hero-card',
  },
  {
    source: '/images/frontend/languages.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/frameworks-libraries-plugins.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/responsive-web-design.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/performance.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/testing.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/modern-frontend-archtiecture.webp',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/tooling-dx-optimized.webp',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/performance-optimized.webp',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/testing-confidence-optimized.webp',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/frontend/leadership-collaboration-optimized.webp',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/backend/languages.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/backend/frameworks.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/backend/comunications-rest-api.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/backend/performance.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/backend/testing-debuging.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/software-architect/architect-definition.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/software-architect/website-technology.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/software-architect/software-architect-development-steps.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
  {
    source: '/images/software-architect/scrum-methodology.jpg',
    widths: [180, 300, 340],
    usage: 'profile-strength',
  },
];

const getSiteImageSpecs = () => SITE_IMAGE_SPECS;

module.exports = {
  SITE_IMAGE_SPECS,
  getSiteImageSpecs,
};
