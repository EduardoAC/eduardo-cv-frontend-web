const CANONICAL_ORIGIN = 'https://eduardoac.dev';
const SERVICE_WORKER_PATH = '/service-worker.js';

const serviceWorkerHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Cloudflare-CDN-Cache-Control': 'no-store',
  'Content-Type': 'application/javascript; charset=utf-8',
  'Service-Worker-Allowed': '/',
  'X-Content-Type-Options': 'nosniff',
};

const canonicalUrlFor = (requestUrl) => {
  const url = new URL(requestUrl);
  return new URL(`${url.pathname}${url.search}`, CANONICAL_ORIGIN);
};

const serveRetirementServiceWorker = async () => {
  const response = await fetch(`${CANONICAL_ORIGIN}${SERVICE_WORKER_PATH}`, {
    cache: 'no-store',
    redirect: 'error',
    headers: {
      Accept: 'application/javascript',
    },
    cf: {
      cacheEverything: false,
      cacheTtl: 0,
    },
  });

  if (!response.ok) {
    return new Response('Unable to load the service worker retirement script.', {
      status: 503,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return new Response(response.body, {
    status: 200,
    headers: serviceWorkerHeaders,
  });
};

const legacySiteRedirectWorker = {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === SERVICE_WORKER_PATH) {
      return serveRetirementServiceWorker();
    }

    return Response.redirect(canonicalUrlFor(request.url), 308);
  },
};

export default legacySiteRedirectWorker;
