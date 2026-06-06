const CANONICAL_ORIGIN = 'https://eduardoac.dev';
const LEGACY_ORIGIN = 'https://eduardo-aparicio-cardenes.website';
const LEGACY_CACHE_PREFIX = 'eduardo-cv-';
const isLegacyOrigin = self.location.origin === LEGACY_ORIGIN;

const clearLegacyCaches = async () => {
  const cacheNames = await caches.keys();
  const legacyCacheNames = cacheNames.filter((cacheName) =>
    cacheName.startsWith(LEGACY_CACHE_PREFIX)
  );

  await Promise.all(legacyCacheNames.map((cacheName) => caches.delete(cacheName)));
};

const buildCanonicalUrl = (url) => {
  const currentUrl = new URL(url);
  return new URL(
    `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
    CANONICAL_ORIGIN
  ).href;
};

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await clearLegacyCaches();
      await self.clients.claim();

      if (!isLegacyOrigin) {
        return;
      }

      const windowClients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });

      await Promise.allSettled(
        windowClients.map((client) => client.navigate(buildCanonicalUrl(client.url)))
      );
      await self.registration.unregister();
    })()
  );
});

if (isLegacyOrigin) {
  self.addEventListener('fetch', (event) => {
    const { request } = event;
    const isNavigation =
      request.mode === 'navigate' || request.destination === 'document';

    if (request.method !== 'GET' || !isNavigation) {
      return;
    }

    event.respondWith(
      Promise.resolve(Response.redirect(buildCanonicalUrl(request.url), 308))
    );
  });
}
