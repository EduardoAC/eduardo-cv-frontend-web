export type ProjectTier = 'featured' | 'supporting' | 'hackathon' | 'venture';
export type ProjectSectionId = 'featured' | 'open-source' | 'hackathons' | 'ventures';
export type ProjectStatus = 'Live' | 'OSS' | 'In Progress' | 'Historic';

export interface ProjectActionLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  tier: ProjectTier;
  typeLabel: string;
  techTags: [string, string, string] | [string, string] | [string];
  status: ProjectStatus;
  image?: ProjectImage;
  primaryCta?: ProjectActionLink;
  secondaryCta?: ProjectActionLink;
  order: number;
  sectionId: ProjectSectionId;
  showInItemList: boolean;
}

export interface ProjectSection {
  id: ProjectSectionId;
  navLabel: string;
  title: string;
  intro: string;
}

export interface ArchivedProjectReference {
  slug: string;
  title: string;
  tier: 'archived';
}

export interface WritingLink {
  href: string;
  title: string;
  description: string;
}

const GITHUB_PROFILE = 'https://github.com/EduardoAC';
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/eacardenes';
const GENXAPI_ORG = 'https://github.com/genxapi';

export const projectSections: ProjectSection[] = [
  {
    id: 'featured',
    navLabel: 'Featured',
    title: 'Featured projects',
    intro:
      'These are the projects that best represent my current work in developer tooling, platform thinking, and modern frontend engineering.',
  },
  {
    id: 'open-source',
    navLabel: 'Open Source',
    title: 'Open-source and developer tooling',
    intro:
      'Beyond flagship work, I regularly build smaller tools, reusable foundations, and focused experiments that solve practical engineering problems.',
  },
  {
    id: 'hackathons',
    navLabel: 'Hackathons',
    title: 'Hackathons and experiments',
    intro:
      'Hackathons and side experiments played a huge role in how I learned to build fast, validate ideas, and turn concepts into working products.',
  },
  {
    id: 'ventures',
    navLabel: 'Ventures',
    title: 'Earlier ventures',
    intro:
      'These earlier ventures were part of my entrepreneurial journey and helped shape how I think about products, teams, and execution.',
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    slug: 'genx-api',
    title: 'GenX API',
    summary:
      'Orchestration for contract-driven API client generation. Built to help teams reduce duplication, align package workflows, and shift left in API client delivery.',
    tier: 'featured',
    typeLabel: 'Featured',
    techTags: ['API Generation', 'TypeScript', 'DX'],
    status: 'Live',
    primaryCta: {
      label: 'Website',
      href: 'https://genxapi.dev',
      external: true,
    },
    secondaryCta: {
      label: 'GitHub',
      href: `${GENXAPI_ORG}/genxapi`,
      external: true,
    },
    order: 1,
    sectionId: 'featured',
    showInItemList: true,
  },
  {
    slug: 'metricsverse',
    title: 'MetricsVerse',
    summary:
      'A modern metrics platform for understanding software systems through actionable engineering signals, language insights, dependency analysis, and project visibility.',
    tier: 'featured',
    typeLabel: 'Featured',
    techTags: ['Metrics', 'Platform', 'CLI'],
    status: 'In Progress',
    primaryCta: {
      label: 'GitHub profile',
      href: GITHUB_PROFILE,
      external: true,
    },
    order: 2,
    sectionId: 'featured',
    showInItemList: true,
  },
  {
    slug: 'browser-extension-boilerplate',
    title: 'Browser Extension Boilerplate',
    summary:
      'A practical React, TypeScript, and Vite foundation for building Manifest V3 browser extensions with real-world patterns for testing, APIs, authentication, and CI.',
    tier: 'featured',
    typeLabel: 'Featured',
    techTags: ['React', 'TypeScript', 'Vite'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub profile',
      href: GITHUB_PROFILE,
      external: true,
    },
    secondaryCta: {
      label: 'Read article',
      href: '/blog/optimizing-chrome-extensions-state-and-communication-in-react',
    },
    order: 3,
    sectionId: 'featured',
    showInItemList: true,
  },
  {
    slug: 'food-ingredients-database',
    title: 'Food Ingredients Database',
    summary:
      'An open-source TypeScript SDK and CLI that syncs nutrition data into a local-first structure for recipe, food, and health applications.',
    tier: 'featured',
    typeLabel: 'Featured',
    techTags: ['TypeScript', 'SDK', 'CLI'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub profile',
      href: GITHUB_PROFILE,
      external: true,
    },
    order: 4,
    sectionId: 'featured',
    showInItemList: true,
  },
  {
    slug: 'eduardo-personal-website',
    title: 'Eduardo personal website',
    summary:
      'A personal platform that combines technical writing, career storytelling, project curation, and authority building.',
    tier: 'featured',
    typeLabel: 'Featured',
    techTags: ['Next.js', 'Content', 'SEO'],
    status: 'Live',
    image: {
      src: '/images/code-projects-done-optimized-1280.webp',
      alt: 'Illustration representing Eduardo Aparicio Cardenes personal website and project platform',
    },
    primaryCta: {
      label: 'Source code',
      href: 'https://github.com/EduardoAC/eduardo-cv-frontend-web',
      external: true,
    },
    secondaryCta: {
      label: 'Blog',
      href: '/blog',
    },
    order: 5,
    sectionId: 'featured',
    showInItemList: true,
  },
  {
    slug: 'snap-components',
    title: 'Snap Components',
    summary:
      'A reusable UI component library focused on shared primitives, design-system thinking, and maintainable frontend foundations for modern web applications.',
    tier: 'supporting',
    typeLabel: 'UI Library',
    techTags: ['UI Library', 'TypeScript', 'Storybook'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub profile',
      href: GITHUB_PROFILE,
      external: true,
    },
    order: 1,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'contract-api-generation-orval-demo',
    title: 'Contract API Generation Orval Demo',
    summary:
      'A practical demo showing how contract-first API generation, package workflows, and CI can reduce manual client maintenance across frontend teams.',
    tier: 'supporting',
    typeLabel: 'API Generation',
    techTags: ['Orval', 'CI', 'Packages'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub profile',
      href: GITHUB_PROFILE,
      external: true,
    },
    order: 2,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'site-review-extension',
    title: 'Site Review Extension',
    summary:
      'A lightweight Chrome extension example for capturing site reviews, testing extension flows, and validating browser-specific product patterns.',
    tier: 'supporting',
    typeLabel: 'Extension',
    techTags: ['Extension', 'Testing', 'React'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub',
      href: 'https://github.com/EduardoAC/site-review-extension',
      external: true,
    },
    secondaryCta: {
      label: 'Read article',
      href: '/blog/chrome-extensions-effective-unit-testing-with-jest-chrome',
    },
    order: 3,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'multi-client-demo',
    title: 'multi-client-demo',
    summary:
      'A demo repository exploring multi-client contract generation workflows across packages, environments, and consumer applications.',
    tier: 'supporting',
    typeLabel: 'Experiment',
    techTags: ['Contracts', 'Packages', 'Demo'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub',
      href: `${GENXAPI_ORG}/multi-client-demo`,
      external: true,
    },
    order: 4,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'multi-client-kubb',
    title: 'multi-client-kubb',
    summary:
      'An experiment using Kubb to generate and compare multi-client API workflows for contract-driven frontend development.',
    tier: 'supporting',
    typeLabel: 'Experiment',
    techTags: ['Kubb', 'API Generation', 'Experiment'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub',
      href: `${GENXAPI_ORG}/multi-client-kubb`,
      external: true,
    },
    order: 5,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'genxapi-action',
    title: 'genxapi-action',
    summary:
      'A GitHub Action for automating contract-driven client generation and packaging workflows inside CI pipelines.',
    tier: 'supporting',
    typeLabel: 'Automation',
    techTags: ['GitHub Actions', 'Automation', 'DX'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub',
      href: `${GENXAPI_ORG}/genxapi-action`,
      external: true,
    },
    order: 6,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'genxapi-ecosystem-demo',
    title: 'genxapi-ecosystem-demo',
    summary:
      'An end-to-end demo showing how the wider GenX API tooling ecosystem fits together across generation, packaging, and consumer applications.',
    tier: 'supporting',
    typeLabel: 'Tooling',
    techTags: ['Tooling', 'Monorepo', 'DX'],
    status: 'OSS',
    primaryCta: {
      label: 'GitHub',
      href: `${GENXAPI_ORG}/genxapi-ecosystem-demo`,
      external: true,
    },
    order: 7,
    sectionId: 'open-source',
    showInItemList: true,
  },
  {
    slug: 'sharon',
    title: 'Sharon',
    summary:
      'A Hack The Visual submission that won Challenge 3: Interactive Visuals and reflects the experimentation that shaped my maker mindset.',
    tier: 'hackathon',
    typeLabel: 'Hackathon',
    techTags: ['Hackathon', 'Interactive Visuals', 'Prototype'],
    status: 'Historic',
    image: {
      src: '/images/SharonLogo-optimized-1280.webp',
      alt: 'Sharon hackathon project logo',
    },
    order: 1,
    sectionId: 'hackathons',
    showInItemList: true,
  },
  {
    slug: 'event-buddy',
    title: 'Event Buddy',
    summary:
      'A Cambridge hackathon-era mobile concept for discovering local events, built in 24 hours and recognised with second place.',
    tier: 'hackathon',
    typeLabel: 'Hackathon',
    techTags: ['Hackathon', 'Mobile', 'Product'],
    status: 'Historic',
    image: {
      src: '/images/eventBuddyLogo-optimized-1280.webp',
      alt: 'Event Buddy hackathon project logo',
    },
    order: 2,
    sectionId: 'hackathons',
    showInItemList: true,
  },
  {
    slug: 'trust-score-app',
    title: 'trust-score-app',
    summary:
      'A fintech hackathon project exploring a portable trust-score concept for the sharing economy and fast product validation.',
    tier: 'hackathon',
    typeLabel: 'Hackathon',
    techTags: ['Hackathon', 'Fintech', 'Trust'],
    status: 'Historic',
    order: 3,
    sectionId: 'hackathons',
    showInItemList: true,
  },
  {
    slug: 'dream-maker-factory',
    title: 'Dream Maker Factory',
    summary:
      'The venture I founded to turn early product ideas into collaborative digital experiments, practical delivery, and entrepreneurial learning.',
    tier: 'venture',
    typeLabel: 'Venture',
    techTags: ['Venture', 'Product', 'Collaboration'],
    status: 'Historic',
    image: {
      src: '/images/dreammakerfactory-optimized-1280.webp',
      alt: 'Dream Maker Factory project artwork',
    },
    primaryCta: {
      label: 'Website',
      href: 'http://www.dreammakerfactory.com',
      external: true,
    },
    order: 1,
    sectionId: 'ventures',
    showInItemList: true,
  },
  {
    slug: 'tuocio',
    title: 'TuOcio',
    summary:
      'An event platform built to help organisers manage promotion, discovery, and attendance with a stronger product mindset.',
    tier: 'venture',
    typeLabel: 'Venture',
    techTags: ['Venture', 'Events', 'Platform'],
    status: 'Historic',
    image: {
      src: '/images/TuOcioPorfolio-optimized-1280.webp',
      alt: 'TuOcio project screenshot',
    },
    primaryCta: {
      label: 'Website',
      href: 'http://www.tuocio.org',
      external: true,
    },
    order: 2,
    sectionId: 'ventures',
    showInItemList: true,
  },
  {
    slug: 'inner-virtuoso',
    title: 'Inner Virtuoso',
    summary:
      'A human-capital venture focused on tailored solutions, collaboration, and product execution beyond traditional software delivery.',
    tier: 'venture',
    typeLabel: 'Venture',
    techTags: ['Venture', 'Human Capital', 'Product'],
    status: 'Historic',
    primaryCta: {
      label: 'Website',
      href: 'https://www.innervirtuoso.com',
      external: true,
    },
    order: 3,
    sectionId: 'ventures',
    showInItemList: true,
  },
  {
    slug: 'trainers-wod',
    title: 'Trainer’s WOD',
    summary:
      'An earlier fitness product concept that sharpened my thinking around product scope, user needs, and execution.',
    tier: 'venture',
    typeLabel: 'Venture',
    techTags: ['Venture', 'Fitness', 'Product'],
    status: 'Historic',
    image: {
      src: '/images/TrainersWoD-optimized-1280.webp',
      alt: 'Trainer’s WOD project artwork',
    },
    primaryCta: {
      label: 'Website',
      href: 'https://www.trainerswod.com/',
      external: true,
    },
    order: 4,
    sectionId: 'ventures',
    showInItemList: true,
  },
  {
    slug: 'proyecto-adoptame',
    title: 'Proyecto Adoptame',
    summary:
      'An earlier social-impact product idea that deepened my experience connecting product intent with practical delivery.',
    tier: 'venture',
    typeLabel: 'Venture',
    techTags: ['Venture', 'Social Impact', 'Product'],
    status: 'Historic',
    image: {
      src: '/images/proyectoAdoptame-optimized-1280.webp',
      alt: 'Proyecto Adoptame project artwork',
    },
    primaryCta: {
      label: 'Website',
      href: 'https://www.proyectoadoptame.es',
      external: true,
    },
    order: 5,
    sectionId: 'ventures',
    showInItemList: true,
  },
];

export const archivedProjects: ArchivedProjectReference[] = [
  { slug: 'browser-extensions-monorepo', title: 'browser-extensions-monorepo', tier: 'archived' },
  { slug: 'virtual-personal-assistant-using-typescript', title: 'Virtual-Personal-Assistant-using-TypeScript', tier: 'archived' },
  { slug: 'gatsby-wordpress-boilerplate', title: 'gatsby-wordpress-boilerplate', tier: 'archived' },
  { slug: 'my-website-on-t3-stack', title: 'my-website-on-t3-stack', tier: 'archived' },
  { slug: 'nextjs-evaluation', title: 'nextjs-evaluation', tier: 'archived' },
  { slug: 'eduardo-cv-frontend-web-v2', title: 'eduardo-cv-frontend-web-v2', tier: 'archived' },
  { slug: 'unleash-client-react', title: 'unleash-client-react', tier: 'archived' },
  { slug: 'lerna-live-code', title: 'lerna-live-code', tier: 'archived' },
  { slug: 'jest-enzyme-workshop', title: 'jest-enzyme-workshop', tier: 'archived' },
  { slug: 'nivo-workshop', title: 'nivo-workshop', tier: 'archived' },
  { slug: 'playground', title: 'playground', tier: 'archived' },
  { slug: 'coding-game-party', title: 'coding-game-party', tier: 'archived' },
  { slug: 'interactive-map-system', title: 'interactive_map_system', tier: 'archived' },
  { slug: 'business-and-technology-blog', title: 'business-and-technology-blog', tier: 'archived' },
  { slug: 'angularjs-blog', title: 'angularjs-blog', tier: 'archived' },
];

export const writingLinks: WritingLink[] = [
  {
    href: '/projects/how-do-i-build-it',
    title: 'How I build my interactive CV',
    description:
      'A build journal in progress that explains the architecture, content modelling, SEO, and delivery decisions behind this site.',
  },
  {
    href: '/blog/outside-in-testing-strategy-building-confidence-for-continuous-deployment',
    title: 'Outside-in testing strategy',
    description:
      'How I think about testing confidence, system boundaries, and delivery trade-offs in modern frontend systems.',
  },
  {
    href: '/blog/testing-payment-flows-with-outside-in-testing-part-2',
    title: 'Testing payment flows at scale',
    description:
      'A practical walkthrough of outside-in testing, confidence building, and payment-system delivery.',
  },
  {
    href: '/blog/chrome-extensions-effective-unit-testing-with-jest-chrome',
    title: 'Chrome extension testing with jest-chrome',
    description:
      'A browser-extension testing guide grounded in practical message handling, APIs, and reliability.',
  },
  {
    href: '/blog/optimizing-chrome-extensions-state-and-communication-in-react',
    title: 'Chrome extension state and communication',
    description:
      'A deep dive into React-driven state management, content scripts, and service-worker communication patterns.',
  },
  {
    href: '/blog/managing-concurrency-in-chrome-extensions',
    title: 'Managing concurrency in Chrome extensions',
    description:
      'Architectural lessons for concurrency, locks, and reliability inside Manifest V3 extension systems.',
  },
  {
    href: '/blog/leveraging-metrics-to-communicate-business-value',
    title: 'Leveraging metrics to communicate business value',
    description:
      'How engineering metrics, adoption signals, and cost framing support stronger platform and product decisions.',
  },
  {
    href: '/blog/mitigating-cache-poisoning-in-aws-cloudfront',
    title: 'Mitigating cache poisoning in AWS CloudFront',
    description:
      'An architecture-focused article on web reliability, layered controls, and resilient delivery at the edge.',
  },
  {
    href: '/blog/moving-from-nginx-to-aws-cloudfront',
    title: 'Moving from Nginx to AWS CloudFront',
    description:
      'A practical architecture migration story covering frontend delivery, operational simplification, and scale.',
  },
];

export const projectsPageActions = {
  hero: [
    {
      label: 'View GitHub',
      href: GITHUB_PROFILE,
      external: true,
    },
    {
      label: 'Read the blog',
      href: '/blog',
    },
    {
      label: 'Contact me',
      href: '/contact',
    },
  ],
  archived: {
    label: 'Explore GitHub',
    href: GITHUB_PROFILE,
    external: true,
  },
  final: [
    {
      label: 'Contact me',
      href: '/contact',
    },
    {
      label: 'Connect on LinkedIn',
      href: LINKEDIN_PROFILE,
      external: true,
    },
    {
      label: 'Explore GitHub',
      href: GITHUB_PROFILE,
      external: true,
    },
  ],
};

export const aboutProjectsLink = '/about';

export const getProjectsBySection = (sectionId: ProjectSectionId): ProjectEntry[] =>
  projectEntries
    .filter((project) => project.sectionId === sectionId)
    .sort((left, right) => left.order - right.order);

export const getVisibleProjectEntries = (): ProjectEntry[] =>
  projectSections.flatMap((section) => getProjectsBySection(section.id).filter((project) => project.showInItemList));
