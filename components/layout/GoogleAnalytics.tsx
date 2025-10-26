import Script from 'next/script'

interface GoogleAnalyticsProps {
  trackingId?: string
}

export const GoogleAnalytics = ({
  trackingId = 'G-YRHBYKPJHZ'
}: GoogleAnalyticsProps) => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        nonce="google-analytics-nonce"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  )
}

export type { GoogleAnalyticsProps } 
