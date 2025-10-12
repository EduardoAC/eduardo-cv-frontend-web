const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const avatarPath = path.join(__dirname, '..', 'public', 'images', 'profiles', 'eduardo-aparicio-cardenes-homepage-190px.png');
const avatarBase64 = fs.readFileSync(avatarPath).toString('base64');

const cards = [
  {
    filename: 'frontend-profile-v1-card.svg',
    gradient: ['#111827', '#1f2937'],
    accent: '#38bdf8',
    versionLabel: 'v1.0',
    heading: 'Frontend Profile v1.0',
    subheading: 'Web Artisan | 2012 - 2016',
    body: 'Responsive rebuilds, handcrafted UI systems, and data-informed experimentation.',
    bullets: [
      'HTML5/CSS3 + SASS/LESS + Vanilla JS craftsmanship',
      'Bootstrap & jQuery delivery pipelines powered by Grunt/RequireJS',
      'Optimizely, CrazyEgg, and analytics-led optimisation rituals',
    ],
  },
  {
    filename: 'frontend-profile-v2-card.svg',
    gradient: ['#0f172a', '#1e293b'],
    accent: '#a855f7',
    versionLabel: 'v2.0',
    heading: 'Frontend Profile v2.0',
    subheading: 'Platform Builder | 2021 - Today',
    body: 'Design systems, performance budgets, and DX accelerators for product teams.',
    bullets: [
      'React 18 + Next.js App Router + TypeScript-first delivery',
      'Design tokens, Storybook docs, and automated accessibility gates',
      'Core Web Vitals ownership, RUM dashboards, and CI performance budgets',
    ],
  },
];

const makeSafe = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const card of cards) {
  const gradientId = `grad-${card.versionLabel.replace('.', '-')}`;
  const clipId = `clip-${card.versionLabel.replace('.', '-')}`;

  const bullets = card.bullets
    .map((bullet, index) => {
      const y = index * 40;
      return `
        <g transform="translate(0, ${y})">
          <circle cx="12" cy="12" r="6" fill="${card.accent}"/>
          <text x="28" y="18" font-family="'Inter', 'Segoe UI', sans-serif" font-size="18px" fill="#E2E8F0">${makeSafe(bullet)}</text>
        </g>`;
    })
    .join('');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${card.gradient[0]}"/>
      <stop offset="100%" stop-color="${card.gradient[1]}"/>
    </linearGradient>
    <clipPath id="${clipId}">
      <circle cx="100" cy="100" r="100"/>
    </clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#${gradientId})"/>
  <g opacity="0.18">
    <circle cx="1090" cy="120" r="130" fill="white"/>
    <circle cx="100" cy="500" r="150" fill="white"/>
    <circle cx="1180" cy="480" r="110" fill="white"/>
  </g>
  <g transform="translate(120, 140)">
    <rect x="0" y="0" width="960" height="350" rx="28" fill="rgba(15, 23, 42, 0.55)" stroke="rgba(255,255,255,0.08)"/>
    <g transform="translate(60, 60)">
      <g clip-path="url(#${clipId})">
        <rect x="0" y="0" width="200" height="200" fill="${card.accent}"/>
        <image href="data:image/png;base64,${avatarBase64}" x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <circle cx="100" cy="100" r="100" stroke="${card.accent}" stroke-width="6" fill="none"/>
    </g>
    <g transform="translate(320, 60)">
      <rect x="0" y="0" width="104" height="36" rx="18" fill="rgba(255,255,255,0.14)"/>
      <text x="52" y="23" text-anchor="middle" font-family="'Inter', 'Segoe UI', sans-serif" font-size="14px" letter-spacing="0.28em" fill="#E0E7FF">${card.versionLabel.toUpperCase()}</text>
      <text x="0" y="74" font-family="'Inter', 'Segoe UI', sans-serif" font-size="46px" font-weight="700" fill="#F8FAFC">${makeSafe(card.heading)}</text>
      <text x="0" y="118" font-family="'Inter', 'Segoe UI', sans-serif" font-size="20px" fill="#C7D2FE">${makeSafe(card.subheading)}</text>
      <text x="0" y="160" font-family="'Inter', 'Segoe UI', sans-serif" font-size="20px" fill="#E2E8F0">${makeSafe(card.body)}</text>
      <g transform="translate(0, 200)">
        ${bullets}
      </g>
    </g>
  </g>
</svg>
`;

  const outPath = path.join(__dirname, '..', 'public', 'images', 'frontend', card.filename);
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log(`Generated ${card.filename}`);

  const svgBuffer = Buffer.from(svg);
  const baseName = card.filename.replace('.svg', '');
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'frontend');

  sharp(svgBuffer)
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(path.join(outputDir, `${baseName}.png`))
    .then(() => console.log(`Generated ${baseName}.png`))
    .catch((error) => console.error(`Failed to generate ${baseName}.png`, error));

  sharp(svgBuffer)
    .resize(1200, 630)
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, `${baseName}.webp`))
    .then(() => console.log(`Generated ${baseName}.webp`))
    .catch((error) => console.error(`Failed to generate ${baseName}.webp`, error));
}
