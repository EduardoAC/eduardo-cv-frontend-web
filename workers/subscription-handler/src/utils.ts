import { KVNamespace } from '@cloudflare/workers-types';

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
  kv: KVNamespace, 
  maxRequests: number = 5
): Promise<{ allowed: boolean; currentCount: number }> {
  try {
    if (!kv) {
      console.error('KV namespace is undefined in checkRateLimit');
      // If KV is not available, allow the request but log the issue
      return { allowed: true, currentCount: 0 };
    }

    const rateLimitKey = `rate_limit:${clientIP}`;
    const currentRequests = await kv.get(rateLimitKey);
    const requestCount = currentRequests ? parseInt(currentRequests) : 0;

    return {
      allowed: requestCount < maxRequests,
      currentCount: requestCount
    };
  } catch (error) {
    console.error('Error in checkRateLimit:', error);
    // If there's an error with KV, allow the request but log the issue
    return { allowed: true, currentCount: 0 };
  }
}

// Update rate limit
export async function updateRateLimit(
  clientIP: string, 
  kv: KVNamespace, 
  currentCount: number
): Promise<void> {
  try {
    if (!kv) {
      console.error('KV namespace is undefined in updateRateLimit');
      return;
    }

    const rateLimitKey = `rate_limit:${clientIP}`;
    await kv.put(rateLimitKey, (currentCount + 1).toString(), {
      expirationTtl: 3600, // 1 hour
    });
  } catch (error) {
    console.error('Error in updateRateLimit:', error);
    // Don't throw the error, just log it
  }
} 