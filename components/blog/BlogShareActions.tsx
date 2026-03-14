'use client';

import { useEffect, useState } from 'react';
import styles from './BlogShareActions.module.scss';

interface BlogShareActionsProps {
  canonicalUrl: string;
  title: string;
}

type CopyState = 'idle' | 'copied' | 'error';

const copyTextToClipboard = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V7Zm-4 4a2 2 0 0 0 2 2V9h8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M17.53 3H20l-5.4 6.18L21 21h-5.05l-3.95-5.7L7 21H4.5l5.78-6.61L4 3h5.18l3.57 5.15L17.53 3Zm-.88 16h1.4L8.44 4.9H6.95L16.65 19Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 0 0 3.2 5.02c0 1.1.9 2 2.02 2a2 2 0 1 0 .03-4.01ZM20 12.74c0-3.43-1.83-5.02-4.28-5.02-1.97 0-2.85 1.09-3.34 1.85V8.5H9V20h3.38v-6.4c0-.34.02-.68.13-.92.27-.68.89-1.39 1.93-1.39 1.36 0 1.9 1.04 1.9 2.56V20H20v-7.26Z" />
  </svg>
);

export default function BlogShareActions({ canonicalUrl, title }: Readonly<BlogShareActionsProps>) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  useEffect(() => {
    if (copyState === 'idle') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCopyState('idle'), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [copyState]);

  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(title);
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(canonicalUrl);
      setCopyState('copied');
    } catch (error) {
      console.error('Failed to copy blog post URL.', error);
      setCopyState('error');
    }
  };

  return (
    <section className={styles['share-panel']} aria-labelledby="blog-share-title">
      <div className={styles['share-header']}>
        <h2 id="blog-share-title" className={styles['share-title']}>
          Share this post
        </h2>
        <p className={styles['share-description']}>Use the article&apos;s canonical URL when sharing.</p>
      </div>

      <div className={styles['share-actions']}>
        <button type="button" className={styles['share-action']} onClick={handleCopy}>
          <CopyIcon />
          <span>{copyState === 'copied' ? 'Copied' : 'Copy link'}</span>
        </button>

        <a
          href={xShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['share-action']}
          aria-label={`Share ${title} on X`}
        >
          <XIcon />
          <span>X</span>
        </a>

        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['share-action']}
          aria-label={`Share ${title} on LinkedIn`}
        >
          <LinkedInIcon />
          <span>LinkedIn</span>
        </a>
      </div>

      <p className={styles['share-status']} aria-live="polite">
        {copyState === 'copied' ? 'Link copied to clipboard.' : copyState === 'error' ? 'Copy failed. Please copy the URL manually.' : ''}
      </p>
    </section>
  );
}
