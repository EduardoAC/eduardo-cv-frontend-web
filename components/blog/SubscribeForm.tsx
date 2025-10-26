'use client';

import { useState } from 'react';
import styles from './SubscribeForm.module.scss';

interface SubscribeFormProps {
  className?: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
  id?: string;
}

export default function SubscribeForm({ className }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get the worker URL from environment or use a default
      const workerUrl = process.env.NEXT_PUBLIC_EMAIL_WORKER_URL!;

      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Blog Subscriber',
          email: email,
          message: 'New blog subscriber signup',
          subject: 'New Blog Subscriber',
        }),
      });

      const result: SubscribeResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to subscribe');
      }

      if (result.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        throw new Error(result.message || 'Failed to subscribe');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`${styles.subscribeForm} ${className || ''}`}>
        <div className={styles.successMessage}>
          <h3>🎉 Successfully Subscribed!</h3>
          <p>Thank you for subscribing to my blog. You&apos;ll receive updates about new articles and insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.subscribeForm} ${className || ''}`}>
      <div className={styles.subscribeContent}>
        <h3>📧 Stay Updated</h3>
        <p>
          Get notified when I publish new articles about web performance, 
          Chrome extensions, frontend development, and software leadership.
        </p>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={loading}
              className={styles.emailInput}
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className={styles.subscribeButton}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
        
        <p className={styles.privacyNote}>
          🔒 No spam, unsubscribe anytime. Your email is protected.
        </p>
      </div>
    </div>
  );
} 
