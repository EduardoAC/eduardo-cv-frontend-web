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
    title: 'Eduardo Aparicio Cardenes - Frontend Engineer, Software Architect,Mentor and speaker',
    description: "Explore my interactive CV, projects, blog posts, and tech talks. A space where software engineering meets storytelling.",
    openGraph: {
      type: 'website',
      title: 'Eduardo Aparicio Cardenes – Tech Leader, Mentor & Speaker - My interactive CV',
      description: "Explore the work, talks, blog, and projects of Eduardo Aparicio Cardenes – Principal Software Engineer, Architect, and Mentor. A hub for code, content, and career.",
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