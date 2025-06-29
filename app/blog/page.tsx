import type { Metadata } from 'next'
import Image from 'next-image-export-optimizer'

export const metadata: Metadata = {
  title: 'Business And Technology blog - Eduardo Aparicio Cardenes',
  description: 'Business And Technology blog',
  openGraph: {
    title: 'Business And Technology blog',
    description: 'Business And Technology blog',
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

export default function BlogPage() {
  return (
    <section className="business-tech-blog">
      <h1>Business And Technology blog</h1>
      <div style={{ textAlign: 'center', margin: '50px auto' }}>
        <Image 
          src="/images/comingsoon.png" 
          alt="Coming Soon"
          width={800}
          height={600}
          className="snap-img-fluid"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </section>
  )
} 