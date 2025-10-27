import { Env } from '../types';

export function validateEnvironment(env: Env): Response | null {
  if (!env) {
    console.error('Environment object is undefined');
    return new Response('Internal server error: Environment not configured', { status: 500 });
  }

  if (!env.ALLOWED_ORIGIN) {
    console.error('ALLOWED_ORIGIN environment variable is not set');
    return new Response('Internal server error: Configuration missing', { status: 500 });
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return new Response('Internal server error: Email service not configured', { status: 500 });
  }

  if (!env.FROM_EMAIL || !env.TO_EMAIL) {
    console.error('FROM_EMAIL or TO_EMAIL environment variables are not set');
    return new Response('Internal server error: Email configuration missing', { status: 500 });
  }

  if (!env.AUDIENCE_ID) {
    console.error('AUDIENCE_ID environment variable is not set');
    return new Response('Internal server error: Audience configuration missing', { status: 500 });
  }

  return null;
} 
