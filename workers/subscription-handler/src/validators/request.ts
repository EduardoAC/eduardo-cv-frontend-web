import { EmailRequest } from '../types';
import { SUBSCRIPTION_ERROR_CODES } from '../contracts';
import { isValidEmail } from '../utils';
import { createErrorResponse, createCorsHeaders } from '../utils/response';

const DEFAULT_ALLOWED_ORIGIN = 'https://eduardo-aparicio-cardenes.website';

export function isAllowedRequestOrigin(origin: string, allowedOrigin?: string): boolean {
  return origin === allowedOrigin || origin === DEFAULT_ALLOWED_ORIGIN;
}

export function validateRequest(request: Request, allowedOrigin: string): { isValid: boolean; response?: Response; origin: string; isAllowedOrigin: boolean } {
  const origin = request.headers.get('Origin') || '';
  const isAllowedOrigin = isAllowedRequestOrigin(origin, allowedOrigin);

  if (request.method === 'GET') {
    return {
      isValid: false,
      response: createErrorResponse(
        SUBSCRIPTION_ERROR_CODES.UNAUTHORIZED,
        'This request is not allowed.',
        403,
        origin,
        isAllowedOrigin,
      ),
      origin,
      isAllowedOrigin,
    };
  }

  if (request.method === 'OPTIONS') {
    return {
      isValid: false,
      response: handleCorsPreflight(origin, isAllowedOrigin),
      origin,
      isAllowedOrigin,
    };
  }

  if (request.method !== 'POST') {
    return {
      isValid: false,
      response: createErrorResponse(
        SUBSCRIPTION_ERROR_CODES.UNAUTHORIZED,
        'This request is not allowed.',
        405,
        origin,
        isAllowedOrigin,
      ),
      origin,
      isAllowedOrigin,
    };
  }

  if (!isAllowedOrigin) {
    return {
      isValid: false,
      response: createErrorResponse(
        SUBSCRIPTION_ERROR_CODES.UNAUTHORIZED,
        'This request is not allowed.',
        403,
        origin,
        isAllowedOrigin,
      ),
      origin,
      isAllowedOrigin,
    };
  }

  return { isValid: true, origin, isAllowedOrigin };
}

export async function validateRequestBody(request: Request, origin: string, isAllowedOrigin: boolean): Promise<{ isValid: boolean; body?: EmailRequest; response?: Response }> {
  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return {
      isValid: false,
      response: createErrorResponse(
        SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
        'The request could not be completed right now. Please try again in a moment.',
        400,
        origin,
        isAllowedOrigin,
      ),
    };
  }

  try {
    const body: EmailRequest = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return {
        isValid: false,
        response: createErrorResponse(
          SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
          'The request could not be completed right now. Please try again in a moment.',
          400,
          origin,
          isAllowedOrigin,
        ),
      };
    }

    if (!isValidEmail(body.email)) {
      return {
        isValid: false,
        response: createErrorResponse(
          SUBSCRIPTION_ERROR_CODES.INVALID_EMAIL,
          'Please provide a valid email address.',
          400,
          origin,
          isAllowedOrigin,
        ),
      };
    }

    return { isValid: true, body };
  } catch (error) {
    return {
      isValid: false,
      response: createErrorResponse(
        SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
        'The request could not be completed right now. Please try again in a moment.',
        400,
        origin,
        isAllowedOrigin,
      ),
    };
  }
}

function handleCorsPreflight(origin: string, isAllowedOrigin: boolean): Response {
  return new Response(null, {
    status: 200,
    headers: {
      ...createCorsHeaders(origin, isAllowedOrigin),
      'Access-Control-Max-Age': '86400',
    },
  });
} 
