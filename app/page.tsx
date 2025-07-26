import type { Metadata } from 'next'
import Introduction from '@/components/Introduction'
import Profiles from '@/components/Profiles'
import Projects from '@/components/Projects'
import ContentBlogs from '@/components/ContentBlogs'
import JobsTimeline from '@/components/JobsTimeline'
import Greetings from '@/components/Greetings'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduardo-aparicio-cardenes.website';
  return {
    title: 'Worker for hire - Eduardo Aparicio Cardenes',
    description: "I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.",
    openGraph: {
      type: 'website',
      title: 'Worker for hire',
      description: "I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.",
      images: [`${baseUrl}/images/profiles/eduardo-aparicio-cardenes-homepage-490px.png`],
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <Introduction />
      <Profiles />
      <Projects />
      <ContentBlogs />
      <JobsTimeline />
      <Greetings />
    </main>
  )
} 