import type { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduardo-aparicio-cardenes.website';
  return {
    title: 'How Do I build my interactive CV - Eduardo Aparicio Cardenes',
    description: 'How Do I build my interactive CV',
    openGraph: {
      title: 'How Do I build my interactive CV',
      description: 'How Do I build my interactive CV',
      type: 'website',
      siteName: 'Eduardo Aparicio Cardenes Website',
      images: [
        {
          url: `${baseUrl}/images/comingsoon.png`,
          width: 800,
          height: 600,
          alt: 'Coming Soon',
        },
      ],
    },
  };
}

export default function HowDoIBuildItPage() {
  return (
    <section className="business-tech-blog">
      <h1>How Do I build my interactive CV</h1>
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
      <p className='text-center'>I&apos;m working on this section. Please come back later.</p>
    </section>
  )
} 
