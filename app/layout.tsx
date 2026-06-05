import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '../components/layout/GoogleAnalytics'
import { Navbar } from '../components/layout/navbar'
import { Footer } from '../components/layout/Footer'
import ServiceWorkerRegistration from '../components/layout/ServiceWorkerRegistration'
import {
  DARK_THEME_COLOR,
  LIGHT_THEME_COLOR,
  THEME_ATTRIBUTE,
  THEME_INIT_SCRIPT_SRC,
  THEME_STORAGE_KEY,
} from '../lib/theme'
import '../styles/snap-components/snap-components-optimized.css'
import '../styles/main.scss'
import './components.scss'

const inter = Inter({ subsets: ['latin'] })
const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardoac.dev').replace(/\/$/, '')

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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: DARK_THEME_COLOR },
    { media: '(prefers-color-scheme: light)', color: LIGHT_THEME_COLOR },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="snap-components-theme"
      data-theme-attribute={THEME_ATTRIBUTE}
      data-theme-color-dark={DARK_THEME_COLOR}
      data-theme-color-light={LIGHT_THEME_COLOR}
      data-theme-storage-key={THEME_STORAGE_KEY}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href={THEME_INIT_SCRIPT_SRC} as="script" />
        {/* Theme overrides must run before hydration to avoid flashing an explicit user preference. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={THEME_INIT_SCRIPT_SRC}></script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="wrap">{children}</div>
        <Footer />
        <GoogleAnalytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
