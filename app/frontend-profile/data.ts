import type { Strength } from '@/components/ProfilePage';

export type FrontendProfileVersionId = 'v1' | 'v2';

export interface FrontendProfileMetric {
  label: string;
  value: string;
}

export interface HighlightItem {
  label: string;
  url?: string;
  rel?: string;
}

export interface RelatedArticle {
  title: string;
  url: string;
  rel?: string;
}

export interface FrontendProfileVersion {
  id: FrontendProfileVersionId;
  version: string;
  label: string;
  releaseWindow: string;
  heroTagline: string;
  title: string;
  description: string;
  openGraphImage: string;
  brandCardImage: string;
  introduction: string[];
  summary: string;
  strengths: Strength[];
  changelog: string[];
  metrics: FrontendProfileMetric[];
  techHighlights: {
    focus: HighlightItem[];
    added?: HighlightItem[];
    sunset?: HighlightItem[];
  };
  easterEgg?: string;
  relatedArticles: RelatedArticle[];
  experienceLink?: {
    label: string;
    url: string;
    description?: string;
  };
}

export interface FrontendProfileVersionMap {
  latest: FrontendProfileVersion;
  byId: Record<FrontendProfileVersionId, FrontendProfileVersion>;
  order: FrontendProfileVersionId[];
}

const frontendProfileVersionsList: FrontendProfileVersion[] = [
  {
    id: 'v1',
    version: '1.0',
    label: 'Version 1.0 - Web Artisan',
    releaseWindow: '2012 - 2016',
    heroTagline: 'Pixel-perfect interfaces, handcrafted CSS, and OOP JavaScript.',
    title: 'Frontend Developer 1.0',
    description: 'Legacy frontend profile focused on handcrafted interfaces and emerging responsive design.',
    openGraphImage: '/images/frontend/frontend-profile-v1-card.png',
    brandCardImage: '/images/frontend/frontend-profile-v1-card.webp',
    introduction: [
      'Version 1.0 was all about mastering the classics: HTML5, CSS3, and vanilla JavaScript with an artisan mindset. I migrated large editorial experiences from table-based layouts into responsive, semantic markup.',
      'Preprocessors like SASS and LESS became my bread and butter. I used them to keep sprawling stylesheets maintainable while experimenting with OOP patterns in JavaScript to keep interactions snappy.',
      'It was also the era where I embraced analytics and A/B testing, understanding how design tweaks affected page views, sales, and ad-clicks for publishers such as Time Inc UK.',
    ],
    summary: 'The foundation years that trained my eye for performance, responsive design, and collaboration with editorial stakeholders.',
    strengths: [
      {
        title: 'Languages',
        description: `<p>Deep experience in HTML5, CSS3, and JavaScript, applying OOP, prototyping, and design patterns to deliver robust experiences.</p><p>SASS and LESS kept complex interfaces maintainable, while JSON-based REST integrations stitched the front-of-house to backend services.</p>`,
        imgUrl: '/images/frontend/languages.jpg',
      },
      {
        title: 'Frameworks, Libraries & Tools',
        description: `<p>Day-to-day tooling revolved around Bootstrap and jQuery, accelerated by Grunt, RequireJS, and Node scripts.</p><p>Compass sprites, Twig templating, and AJAX bundles powered multi-site editorial experiences, while early SVG plus D3 experiments explored data storytelling.</p>`,
        imgUrl: '/images/frontend/frameworks-libraries-plugins.jpg',
      },
      {
        title: 'Responsive Web Design & SEO',
        description: `<p>Responsive retrofits were the name of the game - shipping breakpoints, fluid grids, and adaptive imagery long before design systems were fashionable.</p><p>Every hypothesis was backed by CrazyEgg heatmaps, Google Analytics funnels, and Optimizely experiments.</p>`,
        imgUrl: '/images/frontend/responsive-web-design.jpg',
      },
      {
        title: 'Performance',
        description: `<p>Performance budgets meant minifying assets, slicing sprites, and lazy loading carefully crafted assets.</p><p>Optimisation work kept experiences competitive, knowing a single extra second in load time could mean lost revenue.</p>`,
        imgUrl: '/images/frontend/performance.jpg',
      },
      {
        title: 'Testing',
        description: `<p>Tooling was lighter: Chrome DevTools, Firebug, and Selenium test suites kept regressions in check.</p><p>As the ecosystem matured, I dipped my toes into Jest to bring automated confidence to JavaScript features.</p>`,
        imgUrl: '/images/frontend/testing.jpg',
      },
    ],
    changelog: [
      'Migrated legacy layouts to HTML5/CSS3 responsive foundations.',
      'Introduced SASS-driven architecture to large editorial properties.',
      'Implemented analytics-driven A/B testing with Optimizely.',
      'Rolled out sprite automation and modular RequireJS bundles.',
    ],
    metrics: [
      { label: 'Responsiveness Rollout', value: '5+ editorial brands moved to responsive in under 6 months' },
      { label: 'Page Speed Wins', value: 'Average page weight reduced by 35%' },
      { label: 'Experiment Velocity', value: 'Weekly Optimizely iterations across core flows' },
    ],
    techHighlights: {
      focus: [
        { label: 'HTML5 & CSS3', url: 'https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5', rel: 'nofollow noopener' },
        { label: 'SASS/LESS', url: 'https://sass-lang.com/', rel: 'nofollow noopener' },
        { label: 'Bootstrap', url: 'https://getbootstrap.com/', rel: 'nofollow noopener' },
        { label: 'jQuery', url: 'https://jquery.com/', rel: 'nofollow noopener' },
        { label: 'Grunt', url: 'https://gruntjs.com/', rel: 'nofollow noopener' },
        { label: 'RequireJS', url: 'https://requirejs.org/', rel: 'nofollow noopener' },
      ],
    },
    easterEgg: 'The OG terminal typewriter sound is hiding in the audio toggle.',
    relatedArticles: [
      { title: 'Web Development Best Practices', url: '/blog/web-development-best-practices' },
      { title: 'Performance Optimization Tips', url: '/blog/performance-optimization-tips' },
      { title: 'Form Fields: The Never Ending Debate', url: '/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing' },
    ],
    experienceLink: {
      label: 'Explore the early career timeline',
      url: '/my-experience',
      description: 'Deep dive into the responsive retrofits and editorial transformations I led between 2012 and 2016.',
    },
  },
  {
    id: 'v2',
    version: '2.0',
    label: 'Version 2.0 - Platform Builder',
    releaseWindow: '2021 - Today',
    heroTagline: 'Design systems, performance budgets, and DX that scales teams.',
    title: 'Frontend Developer 2.0',
    description: 'Modern frontend lead profile focused on design systems, developer experience, and measurable impact.',
    openGraphImage: '/images/frontend/frontend-profile-v2.png',
    brandCardImage: '/images/frontend/frontend-profile-v2.webp',
    introduction: [
      'A decade in, I sit at the intersection of product, design, and engineering. I lead teams that ship resilient design systems, obsess over Core Web Vitals, and build developer journeys that make shipping joyful.',
      'My toolkit is centered around React, Next.js, TypeScript, and modern styling approaches such as design tokens and utility-first patterns. I pair that with data-driven experimentation, observability, and accessibility as default expectations.',
      'I collaborate with product and design partners to turn fuzzy business goals into measurable bets, then iterate fast through strong CI/CD, automated testing, and tight feedback loops with customers.',
    ],
    summary: 'The current iteration focuses on component platforms, measurable outcomes, and developer ergonomics so ideas move from Figma to production with confidence.',
    strengths: [
      {
        title: 'Modern Frontend Architecture',
        description: `<p>I build strongly typed frontends with React, Next.js, and TypeScript, choosing server actions, static generation, or edge runtimes based on the problem. Component contracts are enforced through Storybook, visual regression tests, and automated accessibility checks.</p><p>I lead the creation of design tokens and generative UI kits that keep complex products consistent while still allowing product teams to move quickly.</p>`,
        imgUrl: '/images/frontend/languages.jpg',
      },
      {
        title: 'Tooling & Developer Experience',
        description: `<p>Developer experience is an accelerant. I shape pipelines with Turborepo, Vite, and workspace tooling; instrument linting, formatting, and type checking gates; and design golden paths so teams can scaffold new experiences in minutes.</p><p>Shared documentation hubs, Playwright smoke suites, and GitHub Actions keep quality high without slowing experimentation.</p>`,
        imgUrl: '/images/frontend/frameworks-libraries-plugins.jpg',
      },
      {
        title: 'User-Centered Performance',
        description: `<p>Performance is treated as a product feature. Real-user monitoring, Core Web Vitals budgets, and progressive enhancement strategies guide decisions.</p><p>Recent wins include cutting LCP by 42 percent by refactoring image delivery and moving heavy computation to workers - an uplift that translated directly into higher conversion funnels.</p>`,
        imgUrl: '/images/frontend/performance.jpg',
      },
      {
        title: 'Testing & Confidence',
        description: `<p>Testing tells the story for future teammates: Vitest or Jest for unit layers, React Testing Library for behavioural coverage, Playwright for customer paths, and contract tests for APIs.</p><p>Automated visual baselines and synthetic monitoring close the loop so we know instantly if we broke what matters.</p>`,
        imgUrl: '/images/testing-optimized-640.webp',
      },
      {
        title: 'Leadership & Collaboration',
        description: `<p>Beyond code, I mentor engineers, facilitate design critiques, and make sure voices are heard. I create roadmaps that balance tech debt burn-down with feature discovery.</p><p>Teams I coach adopt public RFCs, transparent decision logs, and async rituals that keep distributed squads aligned.</p>`,
        imgUrl: '/images/frontend/responsive-web-design.jpg',
      },
    ],
    changelog: [
      'Adopted Next.js App Router with edge rendering defaults.',
      'Launched a design token pipeline powering multiple brands.',
      'Integrated performance budgets into CI/CD gates.',
      'Scaled component library documentation with MDX and embedded sandboxes.',
    ],
    metrics: [
      { label: 'Design System Adoption', value: '80% of product surfaces' },
      { label: 'Core Web Vitals', value: 'LCP <= 2.0s p75 across key journeys' },
      { label: 'Deployment Cadence', value: 'Daily mainline releases with CI quality gates' },
      { label: 'Team Growth', value: 'Mentored 10+ engineers into senior roles' },
    ],
    techHighlights: {
      focus: [
        { label: 'React.js', url: 'https://beta.reactjs.org/', rel: 'nofollow noopener' },
        { label: 'Next.js App Router', url: 'https://nextjs.org/docs/app/building-your-application', rel: 'nofollow noopener' },
        { label: 'TypeScript', url: 'https://www.typescriptlang.org/', rel: 'nofollow noopener' },
        { label: 'Design Tokens', url: 'https://design-tokens.github.io/community-group/', rel: 'nofollow noopener' },
        { label: 'Storybook', url: 'https://storybook.js.org/', rel: 'nofollow noopener' },
        { label: 'Playwright', url: 'https://playwright.dev/', rel: 'nofollow noopener' },
        { label: 'Nx monorepos', url: 'https://nx.dev/', rel: 'nofollow noopener' },
        { label: 'Edge & Serverless Platforms', url: 'https://aws.amazon.com/serverless/', rel: 'nofollow noopener' },
      ],
      added: [
        { label: 'Tailwind CSS', url: 'https://tailwindcss.com/', rel: 'nofollow noopener' },
        { label: 'RUM & Observability (Sentry)', url: 'https://sentry.io/', rel: 'nofollow noopener' },
        { label: 'Design Linting Automation', url: 'https://www.figma.com/community/plugin/785619431629077634/design-lint', rel: 'nofollow noopener' },
      ],
      sunset: [
        { label: 'Grunt Build Pipelines' },
        { label: 'RequireJS Modules' },
        { label: 'Legacy jQuery Widgets' },
      ],
    },
    easterEgg: 'Unlock the v0.5 apprentice era by spotting the Konami code hidden in the timeline.',
    relatedArticles: [
      { title: 'Leveraging Metrics to Communicate Business Value', url: '/blog/leveraging-metrics-to-communicate-business-value' },
      { title: 'Analysing Slowness: Pre-commit Setup', url: '/blog/analysing-slowness-pre-commit-setup' },
      { title: 'Channeling Failure into Success: Mentoring Lessons', url: '/blog/channeling-failure-into-success-mentoring-lessons-for-engineers' },
    ],
    experienceLink: {
      label: 'See the modern platform highlights',
      url: '/my-experience',
      description: 'Read how design systems, developer experience and performance initiatives matured across recent roles.',
    },
  },
];

const frontendProfileVersionMap: FrontendProfileVersionMap = frontendProfileVersionsList.reduce<FrontendProfileVersionMap>(
  (acc, version) => {
    acc.byId[version.id] = version;
    acc.order.push(version.id);

    if (!acc.latest || Number(version.version) > Number(acc.latest.version)) {
      acc.latest = version;
    }

    return acc;
  },
  {
    latest: frontendProfileVersionsList[0],
    byId: {} as Record<FrontendProfileVersionId, FrontendProfileVersion>,
    order: [],
  },
);

frontendProfileVersionMap.order.sort(
  (a, b) =>
    Number(frontendProfileVersionMap.byId[a].version) -
    Number(frontendProfileVersionMap.byId[b].version),
);

export const frontendProfileVersions: FrontendProfileVersionMap = frontendProfileVersionMap;

export function getFrontendProfileVersion(id: FrontendProfileVersionId): FrontendProfileVersion | undefined {
  return frontendProfileVersions.byId[id];
}

export function getFrontendProfileLatest(): FrontendProfileVersion {
  return frontendProfileVersions.latest;
}

export function getFrontendProfileOrder(): FrontendProfileVersionId[] {
  return frontendProfileVersions.order;
}

export function getFrontendProfileVersions(): FrontendProfileVersion[] {
  return frontendProfileVersions.order.map((id) => frontendProfileVersions.byId[id]);
}
