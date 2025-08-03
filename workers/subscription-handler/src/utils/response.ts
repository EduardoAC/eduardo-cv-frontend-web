// Helper function to create CORS headers
export function createCorsHeaders(origin: string, isAllowedOrigin: boolean) {
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  };
}

// Helper function to create error response
export function createErrorResponse(message: string, status: number, origin: string, isAllowedOrigin: boolean) {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain',
      ...createCorsHeaders(origin, isAllowedOrigin),
    },
  });
}

// Create success response
export function createSuccessResponse(result: any, isSubscriber: boolean, origin: string): Response {
  return new Response(JSON.stringify({
    success: true,
    message: isSubscriber ? 'Successfully subscribed to blog newsletter' : 'Email sent successfully',
    id: result.id,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...createCorsHeaders(origin, true),
    },
  });
} 