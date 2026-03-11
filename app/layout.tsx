import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '../components/layout/GoogleAnalytics'
import { Navbar } from '../components/layout/navbar'
import { Footer } from '../components/layout/Footer'
import ServiceWorkerRegistration from '../components/layout/ServiceWorkerRegistration'
import '../styles/snap-components/snap-components-optimized.css'
import '../styles/main.scss'
import './components.scss'

const inter = Inter({ subsets: ['latin'] })
const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website').replace(/\/$/, '')

export const metadata: Metadata = {
  title: 'Eduardo Aparicio Cardenes - Interactive CV',
  description: 'The personal website of Eduardo Aparicio Cardenes. A Software developer with experience in Frontend, Backend, and Software Architecture.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/favicon.ico',
    apple: '/images/profiles/apple-touch-icon-180x180.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} snap-components-theme dark-theme`}>
        <Navbar />
        <div className="wrap">{children}</div>
        <Footer />
        <GoogleAnalytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
