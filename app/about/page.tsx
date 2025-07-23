import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eduardo-aparicio-cardenes.website';
  return {
    title: 'About me - Eduardo Aparicio Cardenes',
    description:
      "I'm Eduardo Aparicio Cardenes a Web Developer, Software architect and Entrepreneur. Co-founder of Inner Virtuoso and Founder of Dream Maker Factory, enter to know more",
    openGraph: {
      images: [`${baseUrl}/images/about-eduardo-hacktheviual-1280.jpg`],
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
} 