'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register('/service-worker.js', { updateViaCache: 'none' })
        .then((registration) => {
          console.log('SW registered: ', registration);
          return registration.update();
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
      return;
    }

    window.addEventListener('load', registerServiceWorker);

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return null;
}
