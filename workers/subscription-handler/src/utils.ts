// Helper function to escape HTML
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Email validation utility
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting utility
export async function checkRateLimit(
  clientIP: string,
  maxRequests: number = 5
): Promise<{ allowed: boolean; currentCount: number }> {
  return getRateLimiter().status(clientIP, maxRequests);
}

// Update rate limit
export async function updateRateLimit(
  clientIP: string,
  currentCount: number
): Promise<void> {
  getRateLimiter().increment(clientIP, currentCount);
}

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

class InMemoryRateLimiter {
  private readonly store = new Map<string, RateLimitEntry>();
  private readonly windowMs = 60 * 60 * 1000; // 1 hour

  status(clientIP: string, maxRequests: number) {
    const now = Date.now();
    const entry = this.store.get(clientIP);

    if (!entry || now >= entry.resetAt) {
      const freshEntry: RateLimitEntry = {
        count: 0,
        resetAt: now + this.windowMs,
      };
      this.store.set(clientIP, freshEntry);
      return { allowed: true, currentCount: 0 };
    }

    return {
      allowed: entry.count < maxRequests,
      currentCount: entry.count,
    };
  }

  increment(clientIP: string, currentCount: number) {
    const now = Date.now();
    const entry = this.store.get(clientIP);

    if (!entry || now >= entry.resetAt) {
      this.store.set(clientIP, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return;
    }

    this.store.set(clientIP, {
      count: currentCount + 1,
      resetAt: entry.resetAt,
    });
  }
}

let rateLimiter: InMemoryRateLimiter | undefined;

const getRateLimiter = () => {
  if (!rateLimiter) {
    rateLimiter = new InMemoryRateLimiter();
  }

  return rateLimiter;
};
