# Frontend Profile Version UI — Context Notes

## Baseline Snapshot (post-versioned layout rollout)
- Hero pairs a release badge, title, tagline, summary and the branded card artwork (`public/images/frontend/frontend-profile-v{n}-card.*`).
- Desktop uses a sticky siderail (`VersionedFrontendProfile.module.scss`) listing versions, while mobile stacks the switcher ahead of the content.
- Main column renders:
  - The `ProfilePage` strengths (ContentBlock variant) with alternating imagery.
  - Release metrics grid and tech stack diff (core / added / sunset).
  - Inline changelog list with an optional easter egg hint.
- Typography inherited justified paragraphs with a 40px indent via `ProfilePage.module.scss`.

### Concerns Captured From Feedback
1. Hero + metadata occupy too much vertical space before the strengths, especially on mobile.
2. Changelog feels heavy inside the primary flow; curiosity-driven users should opt-in.
3. Mobile requires several swipes before hitting the actionable content.
4. Paragraph alignment should mimic blog styling (left-aligned, no indent).
5. Release selector should list the latest version first.
6. Desire to cross-link blog articles, My Experience highlights, and authoritative third-party docs (with `rel="nofollow"`).
7. Need persistent context notes under `.context/` for future iterations.

## Iteration Notes — Compact Layout & Linked Resources (2025-12-10)
- Reduced hero padding, removed the card on small screens, and transformed the release switcher into a horizontal scroll strip to surface strengths faster.
- Extracted the changelog into `/profile/v{n}/frontend/release-notes`, leaving a compact call-to-action that now lives alongside the tech showcase.
- Added “Experience in Action” callouts that deep-link to `/my-experience` alongside curated “Keep Exploring” blog lists mapped to each release.
- Converted tech stack bullets into linked resources with `rel="nofollow noopener noreferrer` and reversed the version order (newest → oldest).
- Updated `ProfilePage.module.scss` to left-align copy without indentation, aligning profiles with blog typography.
- Data now exposes `relatedArticles`, `experienceLink`, and link-aware `techHighlights` entries to support future profile iterations.

## Iteration Notes — Embedded Tech Showcase (2025-12-10)
- Removed the inline release highlights and metrics from the main page; those details now live entirely on the release notes route together with a dedicated metrics grid.
- Introduced a “Toolkit & Platforms” showcase that presents focus/added/sunset technologies as badge lists with emoji cues and accessible links, blending into the ContentBlock aesthetic.
- Refreshed the support callouts so Experience/Articles sit in neutral cards that harmonise with the rest of the profile layout.*** End Patch
