import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Navbar, Footer, GoogleAnalytics } from '../components/layout'
import { BootstrapClient } from '../components/BootstrapClient'
import './globals.css'
import '../styles/main.scss'
import './components.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eduardo Aparicio Cardenes - Interactive CV',
  description: 'I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Dynamically extract page title from child metadata or context
  const pageTitle = 'Eduardo Aparicio Cardenes - Interactive CV';
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient />
        <GoogleAnalytics />
        <div className="wrap">
          <Navbar pageTitle={pageTitle} />
          <main className="container-fluid">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
} 