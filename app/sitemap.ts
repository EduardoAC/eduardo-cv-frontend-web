import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/markdown'

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eduardo-aparicio-cardenes.website').replace(/\/$/, '')

const staticRoutes: Array<{
  path: string
  priority: number
}> = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/my-projects', priority: 0.8 },
  { path: '/my-experience', priority: 0.8 },
  { path: '/contact', priority: 0.8 },
  { path: '/frontend-profile', priority: 0.7 },
  { path: '/software-architect-profile', priority: 0.7 },
  { path: '/backend-profile', priority: 0.7 },
  { path: '/mentor-profile', priority: 0.7 },
  { path: '/blog', priority: 0.6 },
  { path: '/forum', priority: 0.6 },
  { path: '/projects/how-do-i-build-it', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...pages, ...blogPosts]
}
