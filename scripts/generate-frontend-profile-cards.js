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
    accentSecondary: '#22d3ee',
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
    accentSecondary: '#6366f1',
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

const wrapLines = (text, maxChars = 45) => {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const tentative = current.length === 0 ? word : `${current} ${word}`;
    if (tentative.length > maxChars) {
      if (current.length > 0) {
        lines.push(current);
      }
      current = word;
    } else {
      current = tentative;
    }
  }

  if (current.length > 0) {
    lines.push(current);
  }

  return lines;
};

for (const card of cards) {
  const gradientId = `grad-${card.versionLabel.replace('.', '-')}`;
  const accentGradientId = `accent-${card.versionLabel.replace('.', '-')}`;
  const clipId = `clip-${card.versionLabel.replace('.', '-')}`;
  const avatarClipId = `avatar-${card.versionLabel.replace('.', '-')}`;
  const blurFilterId = `blur-${card.versionLabel.replace('.', '-')}`;

  const bodyLines = wrapLines(card.body, 52);
  const bullets = card.bullets.map((bullet, index) => ({
    text: makeSafe(bullet),
    index,
  }));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${card.gradient[0]}"/>
      <stop offset="100%" stop-color="${card.gradient[1]}"/>
    </linearGradient>
    <linearGradient id="${accentGradientId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${card.accent}"/>
      <stop offset="100%" stop-color="${card.accentSecondary || card.accent}"/>
    </linearGradient>
    <filter id="${blurFilterId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="120" result="blur" />
      <feBlend in="SourceGraphic" in2="blur" mode="screen" />
    </filter>
    <clipPath id="${clipId}">
      <circle cx="100" cy="100" r="100"/>
    </clipPath>
    <clipPath id="${avatarClipId}">
      <circle cx="150" cy="150" r="130"/>
    </clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#${gradientId})"/>
  <g opacity="0.4" filter="url(#${blurFilterId})">
    <circle cx="1050" cy="120" r="180" fill="${card.accent}"/>
    <circle cx="160" cy="520" r="220" fill="${card.accentSecondary || card.accent}"/>
  </g>
  <g transform="translate(90, 105)">
    <rect x="0" y="0" width="1020" height="420" rx="32" fill="rgba(15, 23, 42, 0.68)" stroke="rgba(255,255,255,0.12)" />
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="124" height="40" rx="20" fill="rgba(255,255,255,0.18)" />
      <text x="62" y="26" text-anchor="middle" font-family="'Inter', 'Segoe UI', sans-serif" font-size="15px" letter-spacing="0.24em" fill="#E0E7FF">${card.versionLabel.toUpperCase()}</text>

      <text font-family="'Inter', 'Segoe UI', sans-serif" font-size="52px" font-weight="700" fill="#F8FAFC">
        <tspan x="0" y="78">${makeSafe(card.heading)}</tspan>
      </text>
      <text font-family="'Inter', 'Segoe UI', sans-serif" font-size="24px" fill="#C7D2FE">
        <tspan x="0" y="118">${makeSafe(card.subheading)}</tspan>
      </text>

      <text font-family="'Inter', 'Segoe UI', sans-serif" font-size="20px" fill="#E2E8F0">
        ${bodyLines
          .map((line, index) => `<tspan x="0" y="${160 + index * 26}">${makeSafe(line)}</tspan>`)
          .join('')}
      </text>

      <g transform="translate(0, 220)">
        ${bullets
          .map(
            (bullet) => `<text x="0" y="${bullet.index * 38}" font-family="'Inter', 'Segoe UI', sans-serif" font-size="20px" fill="#E2E8F0">
              <tspan fill="${card.accent}">•</tspan>
              <tspan dx="12">${bullet.text}</tspan>
            </text>`,
          )
          .join('')}
      </g>
    </g>
    <g transform="translate(620, 40)">
      <circle cx="150" cy="150" r="150" fill="rgba(15, 23, 42, 0.85)" />
      <circle cx="150" cy="150" r="140" stroke="url(#${accentGradientId})" stroke-width="6" fill="rgba(15, 23, 42, 0.65)" />
      <g clip-path="url(#${avatarClipId})">
        <image href="data:image/png;base64,${avatarBase64}" x="20" y="20" width="260" height="260" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <circle cx="150" cy="150" r="140" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/>
      <circle cx="150" cy="150" r="128" stroke="rgba(255,255,255,0.08)" stroke-width="1" fill="none"/>
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
