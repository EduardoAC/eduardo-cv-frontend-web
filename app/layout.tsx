import type { Metadata, Viewport } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '../components/layout/GoogleAnalytics'
import { Navbar } from '../components/layout/navbar'
import { Footer } from '../components/layout/Footer'
import ServiceWorkerRegistration from '../components/layout/ServiceWorkerRegistration'
import '../styles/snap-components/snap-components-optimized.css'
import '../styles/main.scss'
import './components.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eduardo Aparicio Cardenes - Interactive CV',
  description: 'The personal website of Eduardo Aparicio Cardenes. A Software developer with experience in Frontend, Backend, and Software Architecture.',
  icons: {
    icon: '/favicon.ico',
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
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/profiles/apple-touch-icon-180x180.png" />
      </Head>
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