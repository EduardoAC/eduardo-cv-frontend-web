import type {
  SubscriptionErrorCode,
  SubscriptionSuccessResponse,
} from '../contracts';

// Helper function to create CORS headers
export function createCorsHeaders(origin: string, isAllowedOrigin: boolean) {
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  };
}

// Helper function to create error response
export function createErrorResponse(
  code: SubscriptionErrorCode,
  message: string,
  status: number,
  origin: string,
  isAllowedOrigin: boolean,
) {
  return new Response(JSON.stringify({
    success: false,
    code,
    message,
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...createCorsHeaders(origin, isAllowedOrigin),
    },
  });
}

// Create success response
export function createSuccessResponse(
  result: { id?: string },
  isSubscriber: boolean,
  origin: string,
): Response {
  const payload: SubscriptionSuccessResponse = {
    success: true,
    message: isSubscriber ? 'Successfully subscribed to blog newsletter' : 'Email sent successfully',
    id: result.id,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...createCorsHeaders(origin, true),
    },
  });
} 
