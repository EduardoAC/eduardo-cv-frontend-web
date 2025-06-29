'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost as BlogPostType, BlogPostMeta } from '@/lib/blog/markdown';
import MarkdownRenderer from './MarkdownRenderer';

interface BlogPostProps {
  post: BlogPostType;
  relatedPosts: BlogPostMeta[];
}

const BlogPost: React.FC<BlogPostProps> = ({ post, relatedPosts }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`${post.title} - ${post.description}`);

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Link
            href="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center text-gray-600 mb-4">
          <time dateTime={post.date} className="mr-4">
            {new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="mr-4">•</span>
          <span className="mr-4">{post.readingTime} min read</span>
          <span>•</span>
          <span className="ml-4">By {post.author}</span>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
            loading="lazy"
          />
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/posts?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        <p className="text-lg text-gray-600 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Share */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
        <div className="flex space-x-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={`Share on ${link.name}`}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {relatedPost.image && (
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(relatedPost.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    <Link href={`/posts/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h4>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {relatedPost.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPost; 