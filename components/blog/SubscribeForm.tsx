'use client';

import { useId, useState } from 'react';
import styles from './SubscribeForm.module.scss';

interface SubscribeFormProps {
  className?: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
  id?: string;
}

const PUBLIC_SUBSCRIPTION_ERROR = 'Subscription is unavailable right now. Please try again in a moment.';
const PUBLIC_RATE_LIMIT_ERROR = 'Too many attempts. Please try again later.';
const PUBLIC_VALIDATION_ERROR = 'Please check your email address and try again.';
const PUBLIC_ERROR_MESSAGES = new Set([
  PUBLIC_SUBSCRIPTION_ERROR,
  PUBLIC_RATE_LIMIT_ERROR,
  PUBLIC_VALIDATION_ERROR,
]);

const getPublicErrorMessage = (
  status?: number,
  message?: string,
): string => {
  if (status === 429) {
    return PUBLIC_RATE_LIMIT_ERROR;
  }

  if (status === 400 && message?.toLowerCase().includes('email')) {
    return PUBLIC_VALIDATION_ERROR;
  }

  return PUBLIC_SUBSCRIPTION_ERROR;
};

export default function SubscribeForm({ className }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();
  const headingId = useId();
  const trustLineId = useId();
  const errorId = useId();

  const inputDescribedBy = [
    trustLineId,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ');

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

      const result = await response.json().catch(() => null) as SubscribeResponse | null;

      if (!response.ok) {
        throw new Error(getPublicErrorMessage(response.status, result?.message));
      }

      if (result?.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        throw new Error(PUBLIC_SUBSCRIPTION_ERROR);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      setError(PUBLIC_ERROR_MESSAGES.has(message) ? message : PUBLIC_SUBSCRIPTION_ERROR);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className={`${styles.subscribeForm} ${className || ''}`.trim()} aria-live="polite" aria-labelledby={headingId}>
        <div className={styles.successMessage} role="status">
          <h3 id={headingId}>🎉 Successfully Subscribed!</h3>
          <p>Thank you for subscribing to my blog. You&apos;ll receive updates about new articles and insights.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.subscribeForm} ${className || ''}`.trim()} aria-labelledby={headingId}>
      <div className={styles.subscribeContent}>
        <h3 id={headingId}>📧 Stay Updated</h3>
        <p>
          Get notified when I publish new articles about web performance,
          Chrome extensions, frontend development, and software leadership.
        </p>

        {error && (
          <div id={errorId} className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.visuallyHidden} htmlFor={inputId}>
            Email address
          </label>
          <div className={styles.inputGroup}>
            <input
              id={inputId}
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={loading}
              className={styles.emailInput}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(error)}
              aria-describedby={inputDescribedBy}
              aria-label="Email address"
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

        <p id={trustLineId} className={styles.privacyNote}>
          🔒 No spam, unsubscribe anytime. Your email is protected.
        </p>
      </div>
    </section>
  );
}
