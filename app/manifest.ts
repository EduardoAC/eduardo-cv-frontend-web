import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Eduardo Aparicio Cardenes Website',
    short_name: 'EduardoAC Website',
    description: 'Eduardo Aparicio Cardenes interactive CV including projects, experiments and experience',
    start_url: '/',
    display: 'standalone',
    background_color: '#303030',
    theme_color: '#303030',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}