import Script from 'next/script'

interface GoogleAnalyticsProps {
  trackingId?: string
}

export const GoogleAnalytics = ({ 
  trackingId = 'UA-72558130-1' 
}: GoogleAnalyticsProps) => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YRHBYKPJHZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YRHBYKPJHZ');
        `}
      </Script>
    </>
  )
}

export type { GoogleAnalyticsProps } 