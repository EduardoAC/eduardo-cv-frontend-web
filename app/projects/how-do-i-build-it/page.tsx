import ComingSoonLanding from '@/components/content/ComingSoonLanding';
import { createComingSoonMetadata } from '@/lib/seo/comingSoon';

export const metadata = createComingSoonMetadata({
  title: 'How I build my interactive CV',
  description:
    'A coming soon walkthrough of the architecture, content decisions, SEO work, and delivery trade offs behind this interactive CV.',
  path: '/projects/how-do-i-build-it',
  keywords: [
    'interactive CV build',
    'Next.js portfolio architecture',
    'frontend project walkthrough',
    'technical case study',
    'Eduardo Aparicio Cardenes',
  ],
  imageAlt: 'How I build my interactive CV coming soon illustration',
});

const projectHighlights = [
  {
    title: 'Architecture choices',
    description:
      'I will break down how the site combines profile content, articles, and project pages inside a maintainable Next.js structure.',
  },
  {
    title: 'Content and SEO',
    description:
      'The walkthrough will explain how routes, metadata, internal linking, and crawlable content are being shaped as the site grows.',
  },
  {
    title: 'Performance and delivery',
    description:
      'It will also cover the decisions behind static export, asset handling, Cloudflare Pages deployment, and ongoing refinements.',
  },
] as const;

const helpfulLinks = [
  {
    href: '/frontend-profile',
    title: 'Explore the frontend profile',
    description:
      'See the engineering strengths and delivery focus that inform many of the site decisions discussed in the walkthrough.',
  },
  {
    href: '/blog',
    title: 'Browse the blog',
    description:
      'Read the articles that already document practical lessons from performance, testing, architecture, and product delivery.',
  },
  {
    href: '/projects',
    title: 'Review my projects',
    description:
      'The curated projects page shows the wider context behind the work, experiments, ventures, and tooling that influence this interactive CV.',
  },
] as const;

export default function HowDoIBuildItPage() {
  return (
    <ComingSoonLanding
      variant="build-journal"
      eyebrow="Coming soon"
      title="How I build my interactive CV"
      lead="This page is being prepared as a proper build journal for the site, from architecture and content structure to performance and SEO decisions."
      paragraphs={[
        'The website is more than a static portfolio. It is a working product that mixes storytelling, profile content, blog publishing, and performance minded frontend decisions inside a single Next.js project.',
        'I want this page to explain the real choices behind it, including what changed during the migration from the older PHP version, how the design evolved, which trade offs were accepted, and what still needs refinement.',
      ]}
      statusTitle="What is being documented"
      statusBody="The first release will focus on content modelling, static generation, SEO, Cloudflare Pages deployment, and the practical decisions that keep the site maintainable as it grows."
      highlightsTitle="What this walkthrough will include"
      highlightsDescription="The goal is a useful build breakdown rather than a short marketing summary, so the page is being shaped around the decisions that matter."
      highlights={[...projectHighlights]}
      helpfulTitle="Explore the current implementation"
      helpfulDescription="These pages already expose parts of the story that the full walkthrough will bring together."
      helpfulLinks={[...helpfulLinks]}
      actions={[
        { href: '/frontend-profile', label: 'See the frontend profile', variant: 'primary' },
        { href: '/blog', label: 'Browse the blog' },
      ]}
      imageAlt="Illustration for the interactive CV build journal coming soon page"
    />
  );
}
