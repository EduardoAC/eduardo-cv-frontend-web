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
  const rateLimitKey = `rate_limit:${clientIP}`;
  const currentRequests = await kv.get(rateLimitKey);
  const requestCount = currentRequests ? parseInt(currentRequests) : 0;
  
  return {
    allowed: requestCount < maxRequests,
    currentCount: requestCount
  };
}

// Update rate limit
export async function updateRateLimit(
  clientIP: string, 
  kv: KVNamespace, 
  currentCount: number
): Promise<void> {
  const rateLimitKey = `rate_limit:${clientIP}`;
  await kv.put(rateLimitKey, (currentCount + 1).toString(), {
    expirationTtl: 3600, // 1 hour
  });
} 