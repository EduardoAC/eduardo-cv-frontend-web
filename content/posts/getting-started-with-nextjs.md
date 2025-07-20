---
title: "Getting Started with Next.js: A Comprehensive Guide"
description: "Learn how to build modern web applications with Next.js, from setup to deployment. This guide covers everything you need to know to get started with React's most popular framework."
date: "2024-12-19"
author: "Eduardo Aparicio Cárdenes"
tags: ["Next.js", "React", "Web Development", "JavaScript", "TypeScript"]
image: "/images/blog/getting-started-nextjs.png"
---

Next.js has become the go-to framework for building modern React applications. With its powerful features like server-side rendering, static site generation, and API routes, it's no wonder why developers love it. In this comprehensive guide, we'll explore everything you need to know to get started with Next.js.

## What is Next.js?

Next.js is a React framework that provides a robust foundation for building production-ready web applications. It was created by Vercel and has gained immense popularity due to its developer-friendly features and excellent performance optimizations.

### Key Features

- **Server-Side Rendering (SSR)**: Improved SEO and faster initial page loads
- **Static Site Generation (SSG)**: Pre-render pages at build time for optimal performance
- **API Routes**: Build backend functionality within your Next.js app
- **File-based Routing**: Automatic routing based on your file structure
- **Built-in CSS Support**: Support for CSS Modules, Sass, and styled-components
- **TypeScript Support**: First-class TypeScript support out of the box

## Setting Up Your First Next.js Project

Let's start by creating a new Next.js project. You'll need Node.js 16.14 or later installed on your system.

### 1. Create a New Project

```bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
```

During the setup, you'll be asked several questions:

```bash
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? Yes
Would you like to use App Router? Yes
Would you like to customize the default import alias? No
```

### 2. Project Structure

After installation, your project will have the following structure:

```
my-nextjs-app/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── public/
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

### 3. Understanding the App Router

Next.js 13+ introduced the App Router, which uses React Server Components by default. Here's how it works:

```typescript
// src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
    </main>
  );
}
```

## Building Your First Component

Let's create a simple component to understand how Next.js handles components:

```typescript
// src/components/Header.tsx
'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">My Next.js App</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
```

## Data Fetching in Next.js

Next.js provides several ways to fetch data, depending on your needs:

### 1. Server Components (Recommended)

```typescript
// src/app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### 2. Client Components

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ClientPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## API Routes

Next.js allows you to create API endpoints within your application:

```typescript
// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch posts from your database
  const posts = [
    { id: 1, title: 'First Post', content: 'Hello World!' },
    { id: 2, title: 'Second Post', content: 'Next.js is awesome!' },
  ];

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Save post to database
  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
  };

  return NextResponse.json(newPost, { status: 201 });
}
```

## Styling Your Application

Next.js supports multiple styling approaches:

### 1. Tailwind CSS (Recommended)

```typescript
// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Next.js
        </h1>
        <p className="text-lg text-gray-600">
          Start building your next great application.
        </p>
      </div>
    </div>
  );
}
```

### 2. CSS Modules

```css
/* src/components/Button.module.css */
.button {
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0051b3;
}
```

```typescript
// src/components/Button.tsx
import styles from './Button.module.css';

export default function Button({ children, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
```

## Deployment

Next.js applications can be deployed to various platforms:

### 1. Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### 2. Netlify

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 3. Docker

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## Best Practices

### 1. Performance Optimization

- Use `next/image` for optimized images
- Implement proper caching strategies
- Use dynamic imports for code splitting
- Optimize your bundle size

### 2. SEO

- Use proper meta tags
- Implement structured data
- Create a sitemap
- Optimize for Core Web Vitals

### 3. Security

- Validate user input
- Use environment variables for sensitive data
- Implement proper authentication
- Keep dependencies updated

## Conclusion

Next.js is an excellent choice for building modern web applications. Its powerful features, excellent developer experience, and strong community make it a top choice for React developers.

In this guide, we've covered the basics of setting up a Next.js project, creating components, fetching data, and deploying your application. As you continue your journey with Next.js, explore the official documentation and community resources to learn more advanced features.

Remember, the best way to learn is by building. Start with a simple project and gradually add more complex features as you become comfortable with the framework.

Happy coding! 