const STATIC_CACHE = `eduardo-cv-__BUILD_VERSION__-static`;
const DYNAMIC_CACHE = `eduardo-cv-__BUILD_VERSION__-dynamic`;
const CACHEABLE_STATUS_CODES = new Set([200]);

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/about',
  '/contact',
  '/my-projects',
  '/my-experience',
  '/images/introduction-image-1280-optimized.webp',
  '/images/introduction-image-1280-optimized.jpg',
  '/images/backend/backend-development-profile.webp',
  '/images/backend/backend-development-profile.png',
  '/images/backend/backend-development-profile.webp',
  '/images/backend/backend-development-profile.png',
  '/images/frontend/frontend-development-profile.webp',
  '/images/frontend/frontend-development-profile.png',
  '/images/software-architect/software-architect-profile-490.webp',
  '/images/software-architect/software-architect-profile-490.png',
  '/images/about-eduardo-hacktheviual-1280.jpg',
  '/images/world-wide-map-high-res.svg',
  '/favicon.ico'
];

const isCacheableResponse = (response) => response && CACHEABLE_STATUS_CODES.has(response.status);

const cacheResponse = async (cacheName, request, response) => {
  if (!isCacheableResponse(response)) {
    return response;
  }

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  return response;
};

const fetchAndCache = async (cacheName, request) => {
  const response = await fetch(request);
  return cacheResponse(cacheName, request, response);
};

const staleWhileRevalidate = async (cacheName, request, event) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  const refreshPromise = fetchAndCache(cacheName, request).catch(() => undefined);

  event.waitUntil(refreshPromise);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await refreshPromise;

  if (networkResponse) {
    return networkResponse;
  }

  throw new Error(`Unable to resolve request: ${request.url}`);
};

const cacheFirst = async (cacheName, request) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  return fetchAndCache(cacheName, request);
};

const networkFirst = async (cacheName, request) => {
  try {
    return await fetchAndCache(cacheName, request);
  } catch (error) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
};

const handleNavigationRequest = async (request, event) => {
  try {
    return await staleWhileRevalidate(DYNAMIC_CACHE, request, event);
  } catch (error) {
    const offlineFallback = await caches.match('/');

    if (offlineFallback) {
      return offlineFallback;
    }

    throw error;
  }
};

const isNavigationRequest = (request) =>
  request.mode === 'navigate' || request.destination === 'document';

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(DYNAMIC_CACHE, request));
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request, event));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith(cacheFirst(STATIC_CACHE, request));
    return;
  }

  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(staleWhileRevalidate(STATIC_CACHE, request, event));
    return;
  }

  event.respondWith(staleWhileRevalidate(DYNAMIC_CACHE, request, event));
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle background sync for contact form
      console.log('Background sync for contact form')
    );
  }
});

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Eduardo CV', options)
  );
}); 
