import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const serviceWorkerSource = readFileSync(
  path.resolve(currentDirectory, '../service-worker/service-worker.template.js'),
  'utf8'
);

const loadServiceWorker = (origin, cacheNames = []) => {
  const listeners = new Map();
  const deletedCaches = [];
  const navigations = [];
  const calls = {
    claim: 0,
    skipWaiting: 0,
    unregister: 0,
  };
  const clients = [
    {
      url: `${origin}/blog/example?source=legacy#section`,
      navigate: async (url) => {
        navigations.push(url);
      },
    },
  ];
  const self = {
    location: new URL(origin),
    addEventListener: (eventName, listener) => {
      listeners.set(eventName, listener);
    },
    skipWaiting: () => {
      calls.skipWaiting += 1;
    },
    clients: {
      claim: async () => {
        calls.claim += 1;
      },
      matchAll: async () => clients,
    },
    registration: {
      unregister: async () => {
        calls.unregister += 1;
      },
    },
  };

  vm.runInNewContext(serviceWorkerSource, {
    URL,
    Response,
    Promise,
    caches: {
      keys: async () => cacheNames,
      delete: async (cacheName) => {
        deletedCaches.push(cacheName);
        return true;
      },
    },
    self,
  });

  return {
    calls,
    deletedCaches,
    listeners,
    navigations,
  };
};

const dispatchExtendableEvent = async (listener) => {
  let lifetimePromise;
  listener({
    waitUntil: (promise) => {
      lifetimePromise = promise;
    },
  });
  await lifetimePromise;
};

test('canonical worker clears old application caches without intercepting fetches', async () => {
  const worker = loadServiceWorker('https://eduardoac.dev', [
    'eduardo-cv-old-static',
    'eduardo-cv-old-dynamic',
    'another-application-cache',
  ]);

  worker.listeners.get('install')();
  await dispatchExtendableEvent(worker.listeners.get('activate'));

  assert.equal(worker.calls.skipWaiting, 1);
  assert.equal(worker.calls.claim, 1);
  assert.equal(worker.calls.unregister, 0);
  assert.deepEqual(worker.deletedCaches, [
    'eduardo-cv-old-static',
    'eduardo-cv-old-dynamic',
  ]);
  assert.equal(worker.listeners.has('fetch'), false);
});

test('preview origins clear old caches without being redirected', async () => {
  const worker = loadServiceWorker('http://localhost:3000', [
    'eduardo-cv-old-static',
  ]);

  await dispatchExtendableEvent(worker.listeners.get('activate'));

  assert.equal(worker.calls.unregister, 0);
  assert.deepEqual(worker.navigations, []);
  assert.equal(worker.listeners.has('fetch'), false);
});

test('legacy worker redirects navigation and retires its registration', async () => {
  const worker = loadServiceWorker('https://eduardo-aparicio-cardenes.website', [
    'eduardo-cv-old-static',
  ]);

  await dispatchExtendableEvent(worker.listeners.get('activate'));

  assert.equal(worker.calls.unregister, 1);
  assert.deepEqual(worker.navigations, [
    'https://eduardoac.dev/blog/example?source=legacy#section',
  ]);

  let responsePromise;
  worker.listeners.get('fetch')({
    request: {
      destination: 'document',
      method: 'GET',
      mode: 'navigate',
      url: 'https://eduardo-aparicio-cardenes.website/about?from=old',
    },
    respondWith: (promise) => {
      responsePromise = promise;
    },
  });

  const response = await responsePromise;
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://eduardoac.dev/about?from=old');
});
