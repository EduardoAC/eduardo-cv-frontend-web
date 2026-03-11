# Blog Image Validation Cleanup Summary

## What warnings were fixed

- Added meaningful alt text to markdown images that were missing it.
- Replaced markdown image references that still pointed to Medium CDN with local project assets.

## Which articles were updated

- `chrome-extensions-effective-unit-testing-with-jest-chrome`
- `decoding-tdd-choices-scenarios-vs-components-unveiled`
- `form-fields-the-never-ending-debate-inner-vs-outer-spacing`
- `guide-for-url-query-vs-path-parameters-in-protected-web-apps`
- `managing-jwt-token-expiration`
- `moving-from-nginx-to-aws-cloudfront`
- `optimising-chrome-extensions-part-1-beyond-redux-post-manifest-v3`
- `optimizing-chrome-extensions-state-and-communication-in-react`
- `react-higher-order-components-vs-vue-js-slots-a-dynamic-components-comparison`
- `real-time-language-sync-between-web-applications-and-browser-extensions`

## Which Medium images were migrated locally

- `managing-jwt-token-expiration`
  - `reactive-jwt-expiration-flow.png`
  - `proactive-jwt-expiration-flow.png`
  - `hybrid-jwt-expiration-flow.png`
- `moving-from-nginx-to-aws-cloudfront`
  - `cloudfront-transition-architecture.png`
  - `simplified-frontend-ecosystem.png`
  - `cloudfront-deployment-pipeline.png`
- `optimising-chrome-extensions-part-1-beyond-redux-post-manifest-v3`
  - `redux-architecture-challenges.jpg`
  - `message-architecture-and-cache.jpg`
- `optimizing-chrome-extensions-state-and-communication-in-react`
  - `browser-extension-language-review-example.png`
  - `retrieve-review-from-background-script.png`
  - `broadcast-language-cookie-changes.png`
  - `propagate-language-updates-across-tabs.png`
- `react-higher-order-components-vs-vue-js-slots-a-dynamic-components-comparison`
  - `vue-vs-react-radio-button-group-comparison.png`

## Folder structure decisions used

- Moved each updated article's blog assets into `/public/images/blog/<article-slug>/`.
- Renamed flat image files to descriptive, article-scoped names where it was safe to do so.
- Reused a single local file when the same image appeared multiple times in the same article.
- Updated frontmatter image paths for the affected posts so each article now points at its folder-local cover image.

## Any edge cases or limitations

- Medium's legacy `cdn-images-1.medium.com` endpoints returned rate-limit responses during download, so the migration used the canonical `miro.medium.com` equivalents for the same assets.
- `form-fields-the-never-ending-debate-inner-vs-outer-spacing` intentionally reuses one local inline image file for multiple placements because the article references the same illustration repeatedly in different explanatory contexts.

## Final validation result

- Ran `npm run blog:validate`.
- Result: `Validation finished with 0 error(s) and 0 warning(s).`
