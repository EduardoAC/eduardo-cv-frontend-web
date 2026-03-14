# Image Audit Report

## Summary of Findings

- Runtime UI/local responsive sources audited: 37
- Blog cover images audited: 26
- Unique local markdown inline images audited: 68
- Remote mentor avatars audited: 24
- CSS/Tailwind background-image usages found in app source: 0
- Static export remains the delivery model; responsive local UI images now require generated variants and the custom loader manifest.

## Categorised Issues

### High Priority

- The contact page still uses `/images/world-wide-map-optimized.svg` for Open Graph metadata. Runtime delivery is now rasterized, but social share art still needs dedicated follow-up.
- Large source blog images still exist in the content library: Chrome Extensions: Effective Unit Testing with jest-chrome (868.0 KB), Leveraging Metrics to Communicate Business Value (705.2 KB), Mitigating Cache Poisoning in AWS CloudFront: A Frontend Engineer's Guide (979.7 KB), Outside-In Testing Strategy: Building Confidence for Continuous Deployment - Part 1 (746.2 KB), Testing Payment Flows with Outside-In Testing: A Practical Integration Testing Case Study - Part 2 (768.4 KB).

### Medium Priority

- Remote mentor review avatars remain plain `<img>` elements by design and stay outside the local site-image pipeline.
- Some metadata/share images intentionally remain on their stable legacy raster assets rather than generated responsive variants.

### Low Priority

- Fixed-size company and project logos remain on existing raster formats where no clear SVG replacement exists.
- Mentor platform logos are raster assets; delivery is stable, but a future design pass could simplify the Mentoring Club mark.

## High Priority Fixes Implemented

- Added a build-time site image manifest and generated responsive variants under `public/generated/site-images/`.
- Replaced the static-export `unoptimized` image mode with a custom loader backed by `generated/site-image-manifest.json`.
- Added `imageAlt` to blog cover-image frontmatter and threaded it through blog rendering and validation.
- Added `sizes` to every `next/image` usage and kept raw blog markdown images on the existing generated `<img>` pipeline.
- Converted the decorative contact background to a generated raster delivery path while keeping the SVG source asset.

## Runtime UI Images

| Source | Usage | Intrinsic | Format | Approx Size | Generated Widths |
| --- | --- | --- | --- | --- | --- |
| /images/introduction-image-1280-optimized-1280.webp | home-hero | 1280x853 | webp | 65.1 KB | 640, 768, 960, 1200, 1280 |
| /images/code-projects-done-optimized-1280.webp | home-promo | 1280x853 | webp | 31.0 KB | 300, 400, 640 |
| /images/ideas-content-blog-optimized-1280.webp | home-promo | 1280x950 | webp | 113.0 KB | 300, 400, 640 |
| /images/jobs-timeline-optimized-1280.webp | home-promo | 1280x950 | webp | 65.4 KB | 300, 400, 640 |
| /images/finding-the-secrets-optimized-1280.webp | home-promo | 1280x911 | webp | 36.1 KB | 300, 400, 640 |
| /images/about-eduardo-hacktheviual-1280-optimized-1280.webp | about-hero | 1280x853 | webp | 75.1 KB | 640, 768, 960, 1200, 1280 |
| /images/photo-working-optimized-1280.webp | about-inline | 1280x853 | webp | 59.3 KB | 320, 400, 640 |
| /images/my-life-timeline-optimized-1280.webp | about-inline | 1280x626 | webp | 146.0 KB | 400, 640, 800 |
| /images/eduardo-challenge-complete-optimized-1280.webp | about-inline | 1280x1172 | webp | 97.2 KB | 320, 500, 640 |
| /images/comingsoon-optimized-1280.webp | coming-soon-hero | 1280x582 | webp | 36.6 KB | 640, 768, 960, 1200, 1280 |
| /images/world-wide-map-optimized.svg | contact-background | 940x415 | svg | 1.45 MB | 640, 960, 1280, 1920 |
| /images/profiles/frontend-profile-490px.webp | profile-tile | 490x490 | webp | 87.9 KB | 245, 325, 490 |
| /images/profiles/software-architect-profile-490px.webp | profile-tile | 490x490 | webp | 22.1 KB | 245, 325, 490 |
| /images/profiles/eduardo-aparicio-cardenes-homepage-490px.webp | profile-tile | 490x490 | webp | 21.3 KB | 245, 325, 490 |
| /images/profiles/mentor-profile-490px.webp | profile-tile | 490x490 | webp | 23.6 KB | 245, 325, 490 |
| /images/profiles/backend-profile-490px-mirror.webp | profile-tile | 490x490 | webp | 87.6 KB | 245, 325, 490 |
| /images/frontend/frontend-profile-v1-card.webp | frontend-hero-card | 1200x630 | webp | 51.0 KB | 768, 960, 1200 |
| /images/frontend/frontend-profile-v2.webp | frontend-hero-card | 1536x1024 | webp | 75.8 KB | 768, 960, 1200, 1536 |
| /images/frontend/languages.jpg | profile-strength | 340x306 | jpeg | 33.9 KB | 180, 300, 340 |
| /images/frontend/frameworks-libraries-plugins.jpg | profile-strength | 340x306 | jpeg | 21.8 KB | 180, 300, 340 |
| /images/frontend/responsive-web-design.jpg | profile-strength | 340x204 | jpeg | 8.2 KB | 180, 300, 340 |
| /images/frontend/performance.jpg | profile-strength | 340x231 | jpeg | 12.9 KB | 180, 300, 340 |
| /images/frontend/testing.jpg | profile-strength | 340x306 | jpeg | 21.0 KB | 180, 300, 340 |
| /images/frontend/modern-frontend-archtiecture.webp | profile-strength | 1536x1024 | webp | 92.9 KB | 180, 300, 340 |
| /images/frontend/tooling-dx-optimized.webp | profile-strength | 1536x1024 | webp | 47.5 KB | 180, 300, 340 |
| /images/frontend/performance-optimized.webp | profile-strength | 1536x1024 | webp | 75.5 KB | 180, 300, 340 |
| /images/frontend/testing-confidence-optimized.webp | profile-strength | 1536x1024 | webp | 65.5 KB | 180, 300, 340 |
| /images/frontend/leadership-collaboration-optimized.webp | profile-strength | 1536x1024 | webp | 70.6 KB | 180, 300, 340 |
| /images/backend/languages.jpg | profile-strength | 340x306 | jpeg | 12.8 KB | 180, 300, 340 |
| /images/backend/frameworks.jpg | profile-strength | 340x297 | jpeg | 16.7 KB | 180, 300, 340 |
| /images/backend/comunications-rest-api.jpg | profile-strength | 340x306 | jpeg | 10.3 KB | 180, 300, 340 |
| /images/backend/performance.jpg | profile-strength | 340x306 | jpeg | 10.9 KB | 180, 300, 340 |
| /images/backend/testing-debuging.jpg | profile-strength | 340x306 | jpeg | 11.5 KB | 180, 300, 340 |
| /images/software-architect/architect-definition.jpg | profile-strength | 340x252 | jpeg | 15.1 KB | 180, 300, 340 |
| /images/software-architect/website-technology.jpg | profile-strength | 340x271 | jpeg | 12.0 KB | 180, 300, 340 |
| /images/software-architect/software-architect-development-steps.jpg | profile-strength | 340x340 | jpeg | 15.8 KB | 180, 300, 340 |
| /images/software-architect/scrum-methodology.jpg | profile-strength | 413x269 | jpeg | 20.4 KB | 180, 300, 340 |

## Blog Cover Images

| Post | Content File | Source | Intrinsic | Format | Approx Size | Alt Text |
| --- | --- | --- | --- | --- | --- | --- |
| Analysing slowness pre-commit setup | content/posts/analysing-slowness-pre-commit-setup.md | /images/blog/analysing-slowness-pre-commit-setup-frontmatter.jpeg | 800x419 | jpeg | 46.6 KB | Illustration of a developer analysing a slow pre-commit pipeline |
| Channeling Failure into Success: Mentoring Lessons for Engineers | content/posts/channeling-failure-into-success-mentoring-lessons-for-engineers.md | /images/blog/channeling-failure-into-success-mentoring-lessong-for-engineers.webp | 1536x1024 | webp | 150.4 KB | Illustration of an engineer reflecting on mentoring through setbacks |
| Chrome Extensions: Effective Unit Testing with jest-chrome | content/posts/chrome-extensions-effective-unit-testing-with-jest-chrome.md | /images/blog/chrome-extensions-effective-unit-testing-with-jest-chrome/hero-jest-chrome-testing.png | 800x583 | png | 868.0 KB | Diagram of a Chrome extension message flow under unit test |
| Decoding TDD Choices: Scenarios vs. Components Unveiled | content/posts/decoding-tdd-choices-scenarios-vs-components-unveiled.md | /images/blog/decoding-tdd-choices-scenarios-vs-components-unveiled/hero-scenarios-vs-components-testing.png | 800x533 | png | 36.5 KB | Comparison graphic contrasting scenario tests and component tests |
| Form fields the never-ending debate inner vs outer spacing | content/posts/form-fields-the-never-ending-debate-inner-vs-outer-spacing.md | /images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing/hero-form-field-spacing-comparison.jpg | 800x159 | jpeg | 14.7 KB | Two form layouts comparing inner spacing and outer spacing choices |
| Getting Started with Next.js: A Comprehensive Guide | content/posts/getting-started-with-nextjs.md | /images/blog/getting-started-nextjs.png | 1400x1004 | png | 164.0 KB | Next.js logo and starter dashboard illustration |
| Guide for URL Query vs Path Parameters in protected Web Apps | content/posts/guide-for-url-query-vs-path-parameters-in-protected-web-apps.md | /images/blog/guide-for-url-query-vs-path-parameters-in-protected-web-apps/hero-protected-web-app-url-design.png | 800x800 | png | 645.9 KB | Diagram comparing path parameters and query parameters in a protected web app URL |
| Leveraging Metrics to Communicate Business Value | content/posts/leveraging-metrics-to-communicate-business-value.md | /images/blog/leveraging-metrics-to-communicate-business-value-frontmatter.png | 800x800 | png | 705.2 KB | Dashboard-style illustration connecting engineering metrics to business outcomes |
| Managing Concurrency in Chrome Extensions | content/posts/managing-concurrency-in-chrome-extensions.md | /images/blog/managing-concurrency-in-chrome-extensions-frontmatter.jpeg | 800x635 | jpeg | 78.0 KB | Chrome extension workflow showing concurrent tasks and shared state |
| Managing JWT token expiration | content/posts/managing-jwt-token-expiration.md | /images/blog/managing-jwt-token-expiration/hero-jwt-token-expiration.png | 800x288 | png | 114.9 KB | Flow diagram showing JWT expiration handling strategies |
| Mitigating Cache Poisoning in AWS CloudFront: A Frontend Engineer's Guide | content/posts/mitigating-cache-poisoning-in-aws-cloudfront.md | /images/blog/mitigating-cache-poisoning/hero-banner-mitigating-cache-poisoning-in-aws-cloudfront.png | 1536x1024 | png | 979.7 KB | CloudFront architecture diagram for mitigating cache poisoning |
| Moneyfarm web app a brief evolution story | content/posts/moneyfarm-web-app-a-brief-evolution-story.md | /images/blog/moneyfarm-web-app-a-brief-evolution-story-frontmatter.jpg | 800x450 | jpeg | 41.8 KB | Screenshot of the Moneyfarm web application interface |
| Moving from Nginx to AWS CloudFront | content/posts/moving-from-nginx-to-aws-cloudfront.md | /images/blog/moving-from-nginx-to-aws-cloudfront/micro-frontend-nginx-architecture.jpg | 440x272 | png | 18.3 KB | Architecture diagram showing a migration from Nginx to AWS CloudFront |
| Optimising Chrome Extensions: Part 1—Beyond Redux, Post-Manifest v3 | content/posts/optimising-chrome-extensions-part-1-beyond-redux-post-manifest-v3.md | /images/blog/optimising-chrome-extensions-part-1-beyond-redux-post-manifest-v3/hero-post-manifest-v3-redux.png | 800x655 | png | 197.3 KB | Illustration of a post-Manifest V3 Chrome extension architecture beyond Redux |
| Optimizing Chrome Extensions: State and Communication in React | content/posts/optimizing-chrome-extensions-state-and-communication-in-react.md | /images/blog/optimizing-chrome-extensions-state-and-communication-in-react/hero-chrome-extension-state-management.jpeg | 752x512 | jpeg | 27.6 KB | Chrome extension interface illustrating state management and cross-context communication |
| Outside-In Testing Strategy: Building Confidence for Continuous Deployment - Part 1 | content/posts/outside-in-testing-strategy-building-confidence-for-continuous-deployment.md | /images/blog/outside-in-testing-strategy-part-1/outside-in-extending-trophy-of-testing.png | 1536x1024 | png | 746.2 KB | Testing trophy illustration showing an outside-in testing strategy |
| Performance Optimization Tips for Modern Web Applications | content/posts/performance-optimization-tips.md | /images/blog/performance-optimization.png | 800x640 | png | 42.2 KB | Performance dashboard illustration for a modern web application |
| React Higher-Order Components vs Vue.js Slots: A Dynamic Components Comparison | content/posts/react-higher-order-components-vs-vue-js-slots-a-dynamic-components-comparison.md | /images/blog/react-higher-order-components-vs-vue-js-slots-a-dynamic-components-comparison/hero-react-vue-dynamic-components.png | 800x533 | png | 504.5 KB | Comparison graphic of React higher-order components and Vue slots |
| Real-time Language Sync Between Web Applications and Browser Extensions | content/posts/real-time-language-sync-between-web-applications-and-browser-extensions.md | /images/blog/real-time-language-sync-between-web-applications-and-browser-extensions/hero-language-sync-browser-extension.png | 1200x351 | png | 140.7 KB | Diagram showing language data syncing between a web app and browser extension |
| Rediscovering progressive web apps | content/posts/rediscovering-progressive-web-apps.md | /images/blog/rediscovering-progressive-web-apps-frontmatter.jpg | 601x512 | png | 79.4 KB | Mobile devices illustrating progressive web app capabilities |
| Stop Defaulting to Options Objects in Helper Functions, A 2026 Decision Framework | content/posts/stop-defaulting-to-options-objects-in-helper-functions-a-2026-decision-framework.md | /images/blog/stop-defaulting-to-options-objects-in-helper-functions-a-2026-decision-framework-frontmatter.webp | 1536x1024 | webp | 314.2 KB | Decision framework illustration about helper function parameter design |
| Testing Payment Flows with Outside-In Testing: A Practical Integration Testing Case Study - Part 2 | content/posts/testing-payment-flows-with-outside-in-testing-part-2.md | /images/blog/testing-payment-flows-with-outside-in-testing-part-2/01-hero-payment-flows-outside-in-testing.png | 1536x1024 | png | 768.4 KB | Payment flow diagram showing an outside-in integration testing strategy |
| Using react-i18next within Chrome extension (manifest v3) | content/posts/using-react-i18next-within-chrome-extension-manifest-v3.md | /images/blog/using-react-i18next-within-chrome-extension-manifest-v3-frontmatter.jpg | 800x299 | png | 52.4 KB | Chrome extension localization interface using react-i18next |
| Web Development Best Practices: A Comprehensive Guide | content/posts/web-development-best-practices.md | /images/blog/web-development-best-practices.jpg | 760x308 | jpeg | 111.4 KB | Laptop and code illustration representing web development best practices |
| What makes a software engineer excellent? | content/posts/what-makes-a-software-engineer-excellent.md | /images/blog/what-makes-a-software-engineer-excellent-frontmatter.jpeg | 1200x551 | jpeg | 119.6 KB | Illustration of the traits that make a software engineer excellent |
| When Android WebView breaks first: oversized cookies, redirects, and a silent 400 | content/posts/when-android-webview-breaks-first-oversized-cookies-redirects-and-a-silent-400.md | /images/blog/when-android-webview-breaks-first/hero-android-webview-oversized-cookies-eduardo-avatar.webp | 1536x1024 | webp | 207.1 KB | Android WebView illustration showing oversized cookies breaking a payment flow |

## Inline Markdown Images

- Total markdown image references: 73
- Total local markdown image references: 73
- Unique local markdown images: 68
- All currently-authored markdown image references include alt text.

## Metadata, Open Graph, and Icons

| Usage | Source | File/Owner | Intrinsic | Format | Approx Size |
| --- | --- | --- | --- | --- | --- |
| favicon | /favicon.ico | app/layout.tsx + app/manifest.ts | 32x32 | png | 4.9 KB |
| apple-touch-icon | /images/profiles/apple-touch-icon-180x180.png | app/layout.tsx | 180x180 | png | 58.0 KB |
| home open graph | /images/profiles/eduardo-aparicio-cardenes-homepage-490px.png | app/page.tsx | 490x735 | png | 433.1 KB |
| about open graph | /images/about-eduardo-hacktheviual-1280.jpg | app/about/page.tsx | 1280x853 | jpeg | 122.4 KB |
| contact open graph | /images/world-wide-map-optimized.svg | app/contact/page.tsx | 940x415 | svg | 1.45 MB |
| frontend v1 open graph | /images/frontend/frontend-profile-v1-card.png | app/frontend-profile/data.ts | 1200x630 | png | 77.5 KB |
| frontend v2 open graph | /images/frontend/frontend-profile-v2.png | app/frontend-profile/data.ts | 1536x1024 | png | 1006.2 KB |
| backend profile open graph | /images/profiles/backend-profile-490px.webp | lib/profile-data.ts | 490x490 | webp | 87.6 KB |
| software architect open graph | /images/profiles/software-architect-profile-490px.webp | lib/profile-data.ts | 490x490 | webp | 22.1 KB |
| mentor profile open graph | /images/profiles/mentor-profile-490px.png | app/mentor-profile/page.tsx | 490x490 | png | 98.8 KB |

## Remote and Ambiguous Cases

- Remote mentor avatar hosts: adplist-bucket.s3.amazonaws.com, mentoring-club-mentors.s3.eu-central-1.amazonaws.com, www.mentoring-club.com
- Contact Open Graph still points at the original SVG asset and should get dedicated share art later.
- The Mentoring Club platform logo source is unusually tall for the rendered slot and should be manually checked during visual QA.

## Notes

- No CSS background images, Tailwind `bg-[url(...)]` patterns, or design-token raster backgrounds are currently used in the app source.
- The audit intentionally keeps metadata share-image redesign out of scope for this implementation pass.
- Runtime sources with missing generated variants after the current implementation: 0.
