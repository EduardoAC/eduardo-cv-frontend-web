import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'The brainstorming forum - Eduardo Aparicio Cardenes',
  description: 'The brainstorming forum',
  openGraph: {
    title: 'The brainstorming forum',
    description: 'The brainstorming forum',
    type: 'website',
    siteName: 'Eduardo Aparicio Cardenes Website',
    images: [
      {
        url: '/images/comingsoon.png',
        width: 800,
        height: 600,
        alt: 'Coming Soon',
      },
    ],
  },
}

export default function ForumPage() {
  return (
    <section className="brainstorming-forum">
      <h1>The brainstorming forum</h1>
      <div style={{ textAlign: 'center', margin: '50px auto' }}>
        <Image 
          src="/images/comingsoon.png" 
          alt="Coming Soon"
          width={400}
          height={300}
          className="snap-img-fluid"
        />
      </div>
      <h1>Coming soon</h1>
      <p>I'm working on this section. Please come back later.</p>
    </section>
  )
} 