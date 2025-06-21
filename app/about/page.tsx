import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About me - Eduardo Aparicio Cardenes',
  description:
    "I'm Eduardo Aparicio Cardenes a Web Developer, Software architect and Entrepreneur. Co-founder of Inner Virtuoso and Founder of Dream Maker Factory, enter to know more",
  openGraph: {
    images: ['/images/about-eduardo-hacktheviual-1280.jpg'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
} 