const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./styles', './app'],
  },
  async redirects() {
    return [
      {
        source: '/frontend-background',
        destination: '/frontend-profile',
        permanent: true,
      },
      {
        source: '/backend-background',
        destination: '/backend-profile',
        permanent: true,
      },
      {
        source: '/software-architect-background',
        destination: '/software-architect-profile',
        permanent: true,
      },
      {
        source: '/my-career-timeline',
        destination: '/my-experience',
        permanent: true,
      },
      {
        source: '/about-me',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-or-hire-me',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/the-brainstorming-forum',
        destination: '/forum',
        permanent: true,
      },
      {
        source: '/projects/how-did-i-build-my-interactive-cv',
        destination: '/projects/how-do-i-build-it',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 