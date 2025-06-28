import type { Metadata } from 'next'
import Introduction from '@/components/Introduction'
import Profiles from '@/components/Profiles'
import Projects from '@/components/Projects'
import ContentBlogs from '@/components/ContentBlogs'
import JobsTimeline from '@/components/JobsTimeline'
import Greetings from '@/components/Greetings'

export const metadata: Metadata = {
  title: 'Worker for hire - Eduardo Aparicio Cardenes',
  description: "I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.",
  openGraph: {
    type: 'website',
    title: 'Worker for hire',
    description: "I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.",
    images: ['/images/introduction-image-1280.jpg'],
  },
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