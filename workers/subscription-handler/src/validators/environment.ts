import { SUBSCRIPTION_ERROR_CODES } from '../contracts';
import { Env } from '../types';
import { createErrorResponse } from '../utils/response';

const PUBLIC_UNAVAILABLE_MESSAGE = 'The request could not be completed right now. Please try again in a moment.';

export function validateEnvironment(
  env: Env,
  origin: string,
  isAllowedOrigin: boolean,
): Response | null {
  if (!env) {
    console.error('Environment object is undefined');
    return createErrorResponse(
      SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
      PUBLIC_UNAVAILABLE_MESSAGE,
      500,
      origin,
      isAllowedOrigin,
    );
  }

  if (!env.ALLOWED_ORIGIN) {
    console.error('ALLOWED_ORIGIN environment variable is not set');
    return createErrorResponse(
      SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
      PUBLIC_UNAVAILABLE_MESSAGE,
      500,
      origin,
      isAllowedOrigin,
    );
  }

  if (!env.EMAIL_KV) {
    console.error('EMAIL_KV namespace is not configured');
    return createErrorResponse(
      SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
      PUBLIC_UNAVAILABLE_MESSAGE,
      500,
      origin,
      isAllowedOrigin,
    );
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return createErrorResponse(
      SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
      PUBLIC_UNAVAILABLE_MESSAGE,
      500,
      origin,
      isAllowedOrigin,
    );
  }

  if (!env.FROM_EMAIL || !env.TO_EMAIL) {
    console.error('FROM_EMAIL or TO_EMAIL environment variables are not set');
    return createErrorResponse(
      SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
      PUBLIC_UNAVAILABLE_MESSAGE,
      500,
      origin,
      isAllowedOrigin,
    );
  }

  if (!env.AUDIENCE_ID) {
    console.error('AUDIENCE_ID environment variable is not set');
    return createErrorResponse(
      SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
      PUBLIC_UNAVAILABLE_MESSAGE,
      500,
      origin,
      isAllowedOrigin,
    );
  }

  return null;
} 
