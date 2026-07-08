# Legacy site service worker retirement

This Worker serves the current cache-retirement service worker from the legacy
origin. Service worker update requests reject cross-origin redirects, so
`https://eduardo-aparicio-cardenes.website/service-worker.js` must return a
same-origin `200` response instead of redirecting to `https://eduardoac.dev`.

## Cloudflare configuration

This worker is preserved for historical old-domain service worker cleanup, but
it is not part of the normal CI deployment. Deploy it manually only if the
legacy hostname needs a same-origin `/service-worker.js` response again.

1. Deploy with `wrangler deploy --config ./workers/legacy-site-redirect/wrangler.toml`.
2. Update the existing legacy-domain redirect rule so it does not match
   `/service-worker.js`. Bulk Redirects and redirect rules execute before the
   Worker route.
3. Keep the permanent redirect enabled for every other path.
4. Set the zone's Browser Cache TTL to `Respect Existing Headers`, or add a
   cache rule that bypasses cache for `/service-worker.js`.

Verify both responses after deployment:

```sh
curl -I https://eduardo-aparicio-cardenes.website/service-worker.js
curl -I https://eduardo-aparicio-cardenes.website/about
```

The first response must be `200` with `Cache-Control: no-store`; the second must
redirect to `https://eduardoac.dev/about`.
