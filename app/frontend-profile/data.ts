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
      'Version 1.0 captured the Web Artisan years across Time Inc UK, the Global Incubator, and Ocado labs, hand-coding responsive editorial and retail prototypes from Photoshop comps into semantic markup.',
      'Bootstrap, Compass, and SASS/LESS sat alongside jQuery and RequireJS bundles, letting me craft bespoke widgets before frameworks were mainstream while keeping CSS architecture predictable.',
      'Daily pairing with editors, merchandisers, and data analysts turned CrazyEgg, Google Analytics, and Optimizely signals into experiments that protected revenue and readership.',
    ],
    summary: 'Web Artisan years (2012-2016) with Time Inc UK, Global Incubator, and Ocado where responsive retrofits, Bootstrap/jQuery craft, and editorial partnerships forged my performance-first instincts.',
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
      'Packaged Bootstrap/jQuery starter kits for Global Incubator experiments and Ocado seasonal campaigns.',
      'Piloted cross-office QA rituals with Time Inc UK art directors to align responsive breakpoints.',
    ],
    metrics: [
      { label: 'Responsiveness Rollout', value: '5+ editorial brands moved to responsive in under 6 months' },
      { label: 'Page Speed Wins', value: 'Average page weight reduced by 35%' },
      { label: 'Experiment Velocity', value: 'Weekly Optimizely iterations across core flows' },
      { label: 'Prototype Velocity', value: 'Global Incubator and Ocado shipped 7+ concept sites within 4-week sprints' },
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
    description: 'Platform Builder profile showcasing Happening, OakNorth, and Skimlinks - design systems, extensions, and DX transformations backed by measurable impact.',
    openGraphImage: '/images/frontend/frontend-profile-v2.png', // Platform Builder dashboards, Core Web Vitals, and design ops storytelling.
    brandCardImage: '/images/frontend/frontend-profile-v2.webp', // Card art for the Eduardo Avatar Platform Builder era.
    introduction: [
      'Platform Builder means orchestrating product, design, and engineering so Happening, OakNorth, and Skimlinks squads share guardrails around experience, developer productivity, and measurable outcomes.',
      'At Happening I wired performance budgets, Core Web Vitals telemetry, and automated CD pipelines that cut LCP by 42 percent while moving teams to daily deploys.',
      'At OakNorth I led the design system transformation: federated design tokens, MDX docs, and Storybook sandboxes powering onboarding, lending, and operations surfaces with governance baked in.',
      'At Skimlinks I re-architected the publisher Chrome extension (React, Manifest V3, Vite) and tightened shared TypeScript packages adopted by extensions and revenue analytics dashboards.',
    ],
    summary: 'Platform Builder era (2021-today) delivering Happening performance gains, OakNorth design system transformation, and Skimlinks Chrome extension re-architecture through TypeScript-first, mentor-led teams.',
    strengths: [
      {
        title: 'Modern Frontend Architecture',
        description: `<p>I design and evolve frontend architectures that unify scale, performance, and flexibility across products. My approach merges component contracts, edge rendering, and multi-client consistency.</p><p>Architectures I lead integrate <strong>monorepos</strong> (Nx, Turborepo) and <strong>modular design systems</strong> that serve multiple brands, while supporting <strong>micro frontends</strong> for independent team delivery.</p><p>I balance <strong>server-side rendering</strong>, <strong>pre-rendering</strong>, and <strong>edge caching</strong> to keep experiences fast globally. Whether serving React or Vue 3, the choice of rendering mode - client, hybrid, or edge - is always driven by measurable data from Core Web Vitals and RUM.</p><p>Performance is baked into architecture, from <strong>Web Vitals budgets</strong> and <strong>asset splitting</strong> to <strong>contract-driven API clients</strong> and <strong>browser extensions</strong> that meet sub-second load targets. These patterns enable measurable user experience gains while maintaining strong developer velocity.</p><p>All systems are built with resilience and reuse in mind: <strong>shared configuration layers</strong>, <strong>type-safe interfaces</strong>, and <strong>continuous testing</strong> pipelines ensure confidence from prototype to production.</p>`,
        imgUrl: '/images/frontend/modern-frontend-archtiecture.webp',
      },
      {
        title: 'Tooling & Developer Experience',
        description: `<p>I treat developer experience as a force multiplier. Every cycle saved in local setup or CI validation compounds into faster delivery and stronger team morale.</p><p>I craft pipelines that accelerate iteration: <strong>Vite</strong> and <strong>Nx monorepos</strong> for unified builds, <strong>Turborepo</strong> for caching, and <strong>GitHub Actions</strong> for CI quality gates. All with visible metrics that link performance to productivity.</p><p>Code quality flows through enforced <strong>linting, formatting, and type-check gates</strong>, while pre-commit hooks keep baselines green. <strong>Vitest</strong> and <strong>Playwright</strong> run in parallel layers, and visual baselines in <strong>Chromatic</strong> or <strong>Storybook</strong> help catch regressions early.</p><p>I use tooling to make context accessible - docs live beside the code, scaffolding commands spin up new services in seconds, and observability dashboards close the loop between development and real-user outcomes.</p><p>These optimisations transformed developer velocity across platforms at Happening, OakNorth, and Skimlinks - shifting teams from weekly to daily deployments with confidence.</p>`,
        imgUrl: '/images/frontend/tooling-dx-optimized.webp',
      },
      {
        title: 'User-Centered Performance',
        description: `<p>Performance is a feature, not an afterthought. Every architectural decision I make ties directly to user outcomes - from conversion uplift to engagement retention.</p><p>I build and maintain <strong>performance budgets</strong> tied to business KPIs and enforce them through CI gates. <strong>Real-user monitoring (RUM)</strong> via Sentry and custom dashboards keeps us accountable to live metrics like LCP, INP, and CLS.</p><p>Edge-first rendering, <strong>image optimisation pipelines</strong>, and <strong>code-splitting strategies</strong> ensure sub-3-second interactions across devices and geographies. Synthetic and field data guide each iteration until regressions disappear from dashboards.</p><p>From refactoring Chrome extensions to achieve <strong>sub-1-second load times</strong> to cutting LCP by 40 percent through smarter caching and pre-connects, these initiatives prove that design and speed are inseparable.</p><p>Modern performance engineering is about empathy: optimising not just what users see, but how quickly they can act.</p>`,
        imgUrl: '/images/frontend/performance-optimized.webp',
      },
      {
        title: 'Testing & Confidence',
        description: `<p>Testing tells the story for future teammates: Vitest or Jest for unit layers, React Testing Library for behavioural coverage, Playwright for customer paths, and contract tests for APIs.</p><p>Automated visual baselines and synthetic monitoring close the loop so we know instantly if we broke what matters.</p>`,
        imgUrl: '/images/testing-optimized-640.webp',
      },
      {
        title: 'Leadership & Collaboration',
        description: `<p>Beyond code, I mentor engineers through ADPList, The Mentoring Club, and internal pairing circles while facilitating design system critiques that keep every voice represented.</p><p>I craft roadmaps and TypeScript standards that balance tech debt burn-down with discovery, using public RFCs, decision logs, and async rituals to align distributed squads.</p>`,
        imgUrl: '/images/frontend/responsive-web-design.jpg',
      },
    ],
    changelog: [
      'Re-architected the Skimlinks publisher Chrome extension for Manifest V3 with offline-safe onboarding and streaming analytics surfaces.',
      'Led OakNorth design system transformation with federated tokens, MDX docs, and Storybook governance.',
      'Operationalized Happening performance budgets, Core Web Vitals alerting, and daily release health gates in CI/CD.',
      'Adopted Next.js App Router with edge rendering defaults.',
      'Launched type-safe shared packages and strict TypeScript configs across Happening, OakNorth, and Skimlinks repositories.',
      'Formalized mentoring programs via ADPList, The Mentoring Club, and internal pairing guilds that guided 10+ engineers into senior roles.',
    ],
    metrics: [
      { label: 'OakNorth Design System', value: 'Multi-brand experience surfaces reached 80%+ adoption within 6 months' },
      { label: 'Skimlinks Chrome Extension', value: 'Manifest V3 rewrite reduced cold-start to sub-second and stabilized 200k+ MAU' },
      {
        label: 'Happening Performance & Delivery',
        value: 'Core Web Vitals LCP improved 42% while moving squads to daily deploy cadence',
      },
      { label: 'TypeScript Adoption', value: '4 product repositories migrated to strict configs with shared type packages' },
      { label: 'Mentorship Outcomes', value: 'Mentored 10+ engineers into senior/staff roles since 2021' },
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
        { label: 'Vue 3', url: 'https://vuejs.org/', rel: 'nofollow noopener' },
        { label: 'Pinia', url: 'https://pinia.vuejs.org/', rel: 'nofollow noopener' },
        { label: 'Vite', url: 'https://vitejs.dev/', rel: 'nofollow noopener' },
        { label: 'Vitest', url: 'https://vitest.dev/', rel: 'nofollow noopener' },
        { label: 'Chrome Extensions', url: 'https://developer.chrome.com/docs/extensions/', rel: 'nofollow noopener' },
        { label: 'Performance Budgets', url: 'https://web.dev/performance-budgets/', rel: 'nofollow noopener' },
        { label: 'Tailwind CSS', url: 'https://tailwindcss.com/', rel: 'nofollow noopener' },
        { label: 'RUM & Observability (Sentry)', url: 'https://sentry.io/', rel: 'nofollow noopener' },
        {
          label: 'Design Linting Automation',
          url: 'https://www.figma.com/community/plugin/785619431629077634/design-lint',
          rel: 'nofollow noopener',
        },
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
