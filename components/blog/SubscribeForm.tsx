'use client';

import { useId, useState } from 'react';
import {
  SUBSCRIPTION_ERROR_CODES,
  type SubscriptionApiResponse,
  type SubscriptionErrorCode,
} from '@/workers/subscription-handler/src/contracts';
import styles from './SubscribeForm.module.scss';

interface SubscribeFormProps {
  className?: string;
}

const PUBLIC_SUBSCRIPTION_ERROR = 'Subscription is unavailable right now. Please try again in a moment.';
const PUBLIC_RATE_LIMIT_ERROR = 'Too many attempts. Please try again later.';
const PUBLIC_VALIDATION_ERROR = 'Please check your email address and try again.';
const SUBSCRIPTION_ENDPOINT =
  process.env.NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT ??
  process.env.NEXT_PUBLIC_EMAIL_WORKER_URL;
const PUBLIC_ERROR_MESSAGES = new Set([
  PUBLIC_SUBSCRIPTION_ERROR,
  PUBLIC_RATE_LIMIT_ERROR,
  PUBLIC_VALIDATION_ERROR,
]);

const getPublicErrorMessage = (
  status?: number,
  code?: SubscriptionErrorCode,
): string => {
  if (status === 429 || code === SUBSCRIPTION_ERROR_CODES.RATE_LIMITED) {
    return PUBLIC_RATE_LIMIT_ERROR;
  }

  if (status === 400 && code === SUBSCRIPTION_ERROR_CODES.INVALID_EMAIL) {
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
      if (!SUBSCRIPTION_ENDPOINT) {
        throw new Error(PUBLIC_SUBSCRIPTION_ERROR);
      }

      const response = await fetch(SUBSCRIPTION_ENDPOINT, {
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

      const result = await response.json().catch(() => null) as SubscriptionApiResponse | null;

      if (!response.ok) {
        const code = result && !result.success ? result.code : undefined;
        throw new Error(getPublicErrorMessage(response.status, code));
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
          <p className={styles.eyebrow}>Newsletter</p>
          <h3 id={headingId}>Subscription confirmed</h3>
          <p>New articles will land in your inbox when there is something worth sending.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.subscribeForm} ${className || ''}`.trim()} aria-labelledby={headingId}>
      <div className={styles.subscribeContent}>
        <p className={styles.eyebrow}>Newsletter</p>
        <h3 id={headingId}>Get new articles in your inbox</h3>
        <p>
          Occasional writing on web performance, frontend architecture, testing strategy,
          and technical leadership. No filler, no daily cadence.
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
              placeholder="Your email address"
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
              {loading ? 'Joining...' : 'Join the list'}
            </button>
          </div>
        </form>

        <p id={trustLineId} className={styles.privacyNote}>
          Occasional updates, unsubscribe anytime. Your email stays private.
        </p>
      </div>
    </section>
  );
}
