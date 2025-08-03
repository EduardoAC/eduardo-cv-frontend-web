import { Env } from '../types';
import { checkRateLimit, updateRateLimit } from '../utils';
import { createErrorResponse } from '../utils/response';

export async function checkRateLimiting(request: Request, env: Env, origin: string, isAllowedOrigin: boolean): Promise<{ allowed: boolean; response?: Response }> {
  const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIP, env.EMAIL_KV);
  
  if (!rateLimitResult.allowed) {
    return {
      allowed: false,
      response: createErrorResponse('Rate limit exceeded. Please try again later.', 429, origin, isAllowedOrigin),
    };
  }

  return { allowed: true };
}

export async function updateRateLimitAfterSuccess(request: Request, env: Env): Promise<void> {
  const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIP, env.EMAIL_KV);
  await updateRateLimit(clientIP, env.EMAIL_KV, rateLimitResult.currentCount);
} 