import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../workers/legacy-site-redirect/src/index.mjs';

test('serves the retirement worker from the legacy origin without caching', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  let fetchedUrl;
  let fetchedOptions;
  globalThis.fetch = async (url, options) => {
    fetchedUrl = url;
    fetchedOptions = options;
    return new Response('self.addEventListener("install", () => {});', {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
      },
    });
  };

  const response = await worker.fetch(
    new Request('https://eduardo-aparicio-cardenes.website/service-worker.js')
  );

  assert.equal(fetchedUrl, 'https://eduardoac.dev/service-worker.js');
  assert.equal(fetchedOptions.cache, 'no-store');
  assert.equal(fetchedOptions.cf.cacheTtl, 0);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store, no-cache, must-revalidate');
  assert.equal(response.headers.get('service-worker-allowed'), '/');
  assert.match(await response.text(), /addEventListener/);
});

test('preserves path and query when redirecting unexpected requests', async () => {
  const response = await worker.fetch(
    new Request('https://eduardo-aparicio-cardenes.website/about?from=legacy')
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://eduardoac.dev/about?from=legacy');
});
