import { EmailRequest } from '../types';
import { isValidEmail } from '../utils';
import { createErrorResponse, createCorsHeaders } from '../utils/response';

export function validateRequest(request: Request, allowedOrigin: string): { isValid: boolean; response?: Response; origin: string; isAllowedOrigin: boolean } {
  const origin = request.headers.get('Origin') || '';
  const isAllowedOrigin = origin === allowedOrigin || 
                         origin === 'https://eduardo-aparicio-cardenes.website';

  if (request.method === 'GET') {
    return {
      isValid: false,
      response: new Response('GET requests are not allowed', {
        status: 403,
        headers: { 'Content-Type': 'text/plain' },
      }),
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
      response: createErrorResponse('Method not allowed', 405, origin, isAllowedOrigin),
      origin,
      isAllowedOrigin,
    };
  }

  if (!isAllowedOrigin) {
    return {
      isValid: false,
      response: createErrorResponse('Unauthorized origin', 403, origin, isAllowedOrigin),
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
      response: createErrorResponse('Content-Type must be application/json', 400, origin, isAllowedOrigin),
    };
  }

  try {
    const body: EmailRequest = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return {
        isValid: false,
        response: createErrorResponse('Missing required fields: name, email, message', 400, origin, isAllowedOrigin),
      };
    }

    if (!isValidEmail(body.email)) {
      return {
        isValid: false,
        response: createErrorResponse('Invalid email format', 400, origin, isAllowedOrigin),
      };
    }

    return { isValid: true, body };
  } catch (error) {
    return {
      isValid: false,
      response: createErrorResponse('Invalid JSON body', 400, origin, isAllowedOrigin),
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