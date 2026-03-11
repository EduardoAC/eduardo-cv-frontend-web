import ComingSoonLanding from '@/components/content/ComingSoonLanding';
import { createComingSoonMetadata } from '@/lib/seo/comingSoon';

export const metadata = createComingSoonMetadata({
  title: 'The brainstorming forum',
  description:
    'A coming soon destination for thoughtful engineering discussion, practical trade offs, mentoring, and the reasoning behind delivery decisions.',
  path: '/forum',
  keywords: [
    'brainstorming forum',
    'software engineering discussions',
    'frontend architecture',
    'technical leadership',
    'Eduardo Aparicio Cardenes',
  ],
  imageAlt: 'The brainstorming forum coming soon illustration',
});

const forumHighlights = [
  {
    title: 'Architecture and delivery',
    description:
      'Topics will centre on how product needs, engineering quality, and maintainability influence real technical decisions.',
  },
  {
    title: 'Questions worth exploring',
    description:
      'The first topics are being shaped around practical questions from frontend work, technical leadership, and team collaboration.',
  },
  {
    title: 'Useful follow through',
    description:
      'Each discussion area is planned to connect back to detailed articles, profile pages, and concrete examples from delivery work.',
  },
] as const;

const helpfulLinks = [
  {
    href: '/blog',
    title: 'Read the blog',
    description:
      'Explore articles on frontend engineering, performance, testing, architecture, and technical communication.',
  },
  {
    href: '/projects/how-do-i-build-it',
    title: 'See how this site is being built',
    description:
      'Follow the route that will explain the decisions behind the interactive CV, its structure, and its ongoing evolution.',
  },
  {
    href: '/contact',
    title: 'Share a question or idea',
    description:
      'Use the contact form if you want to hire me, collaborate, or suggest the sort of discussion that should shape the first release.',
  },
] as const;

export default function ForumPage() {
  return (
    <ComingSoonLanding
      variant="forum"
      eyebrow="Coming soon"
      title="The brainstorming forum"
      lead="A future home for thoughtful engineering discussion, practical trade offs, and the questions that deserve more than a short comment thread."
      paragraphs={[
        'I am preparing the brainstorming forum as a place where product thinking and software delivery can meet in a more useful way. The aim is to gather sharper conversations about frontend architecture, technical leadership, mentoring, and the reasoning behind everyday engineering choices.',
        'Rather than publish a token placeholder, I want this section to launch with enough substance to be worth bookmarking. Expect structured prompts, curated discussion themes, and clear links back to the articles, projects, and profile pages that already explain how I work.',
      ]}
      statusTitle="What I am shaping now"
      statusBody="The first release is focused on meaningful prompts, practical questions from real delivery work, and clear paths into related blog posts, project notes, and contact conversations."
      highlightsTitle="What the forum will cover"
      highlightsDescription="The section is being designed to support deeper discussion than a simple comment box and to give each topic enough context to be genuinely useful."
      highlights={[...forumHighlights]}
      helpfulTitle="While the forum is being prepared"
      helpfulDescription="These pages already show the sort of material that will feed the first forum topics."
      helpfulLinks={[...helpfulLinks]}
      actions={[
        { href: '/blog', label: 'Read the blog', variant: 'primary' },
        { href: '/contact', label: 'Contact me' },
      ]}
      imageAlt="Illustration for the brainstorming forum coming soon page"
    />
  );
}
