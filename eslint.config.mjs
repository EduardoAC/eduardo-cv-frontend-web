import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

export default defineConfig([
  {
    ignores: [
      '.next/**',
      'dist/**',
      'generated/**',
      '.lostpixel/**',
      'node_modules/**',
    ],
  },
  ...nextVitals,
  ...nextTypescript,
])
