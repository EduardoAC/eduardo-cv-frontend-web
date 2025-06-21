import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'How Do I build my interactive CV - Eduardo Aparicio Cardenes',
  description: 'How Do I build my interactive CV',
  openGraph: {
    title: 'How Do I build my interactive CV',
    description: 'How Do I build my interactive CV',
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

export default function HowDoIBuildItPage() {
  return (
    <section className="business-tech-blog">
      <h1>How Do I build my interactive CV</h1>
      <div style={{ textAlign: 'center', margin: '50px auto' }}>
        <Image 
          src="/images/comingsoon.png" 
          alt="Coming Soon"
          width={800}
          height={600}
          className="img-responsive"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </section>
  )
} 