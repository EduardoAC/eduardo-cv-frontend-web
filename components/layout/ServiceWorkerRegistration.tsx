'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
      return;
    }

    let hasReloadedAfterControllerChange = false;

    const handleControllerChange = () => {
      if (hasReloadedAfterControllerChange) {
        return;
      }

      hasReloadedAfterControllerChange = true;
      window.location.reload();
    };

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

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    window.addEventListener('load', registerServiceWorker);

    if (document.readyState === 'complete') {
      registerServiceWorker();
    }

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return null;
}
