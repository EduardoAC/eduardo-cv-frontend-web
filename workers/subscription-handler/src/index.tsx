import React, { ReactNode } from 'react';
import { EmailRequest, EmailResponse, Env } from './types';
import { isValidEmail, checkRateLimit, updateRateLimit, escapeHtml } from './utils';
import { SubscriberEmail } from './emails/subscriber-template';
import { ContactEmail } from './emails/contact-template';
import { ExecutionContext } from '@cloudflare/workers-types';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    // Validate environment variables
    if (!env) {
      console.error('Environment object is undefined');
      return new Response('Internal server error: Environment not configured', { status: 500 });
    }

    if (!env.ALLOWED_ORIGIN) {
      console.error('ALLOWED_ORIGIN environment variable is not set');
      return new Response('Internal server error: Configuration missing', { status: 500 });
    }

    if (!env.EMAIL_KV) {
      console.error('EMAIL_KV namespace is not configured');
      return new Response('Internal server error: KV namespace not configured', { status: 500 });
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response('Internal server error: Email service not configured', { status: 500 });
    }

    if (!env.FROM_EMAIL || !env.TO_EMAIL) {
      console.error('FROM_EMAIL or TO_EMAIL environment variables are not set');
      return new Response('Internal server error: Email configuration missing', { status: 500 });
    }

    // Get the origin from the request
    const origin = request.headers.get('Origin') || '';
    const allowedOrigin = env.ALLOWED_ORIGIN;
    
    if (request.method === 'GET') {
      return new Response('GET requests are not allowed', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // Check if the origin is allowed
    const isAllowedOrigin = origin === allowedOrigin || 
                           origin === 'https://eduardo-aparicio-cardenes.website';

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        }
      });
    }

    // Reject requests from unauthorized origins
    if (!isAllowedOrigin) {
      return new Response('Unauthorized origin', { 
        status: 403,
        headers: {
          'Access-Control-Allow-Origin': '',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        }
      });
    }

    try {
      // Validate request
      const contentType = request.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return new Response('Content-Type must be application/json', { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          }
        });
      }

      // Parse request body
      const body: EmailRequest = await request.json();
      
      // Validate required fields
      if (!body.name || !body.email || !body.message) {
        return new Response('Missing required fields: name, email, message', { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          }
        });
      }

      // Basic email validation
      if (!isValidEmail(body.email)) {
        return new Response('Invalid email format', { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          }
        });
      }

      // Rate limiting check
      const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
      const rateLimitResult = await checkRateLimit(clientIP, env.EMAIL_KV);
      
      if (!rateLimitResult.allowed) {
        return new Response('Rate limit exceeded. Please try again later.', { 
          status: 429,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          }
        });
      }

      // Determine if this is a subscriber signup
      const isSubscriber = body.subject?.toLowerCase().includes('subscriber') || 
                          body.name.toLowerCase().includes('subscriber');

      // Create email content based on type
      let emailSubject: string;
      let emailHtml: ReactNode;

      if (isSubscriber) {
        emailSubject = 'New Blog Subscriber Signup';
        emailHtml = <SubscriberEmail email={escapeHtml(body.email)} signupTime={new Date().toLocaleString()} />
      } else {
        emailSubject = body.subject || `New Contact Form Submission from ${body.name}`;
        emailHtml = <ContactEmail name={escapeHtml(body.name)} email={escapeHtml(body.email)} message={escapeHtml(body.message)} />
      }

      // Send email via Resend
      const emailData = {
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        subject: emailSubject,
        html: emailHtml,
        reply_to: body.email,
      };

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.text();
        console.error('Resend API error:', errorData);
        return new Response('Failed to send email', { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          }
        });
      }

      const result: EmailResponse = await resendResponse.json();

      // Update rate limit
      await updateRateLimit(clientIP, env.EMAIL_KV, rateLimitResult.currentCount);

      // Return success response
      return new Response(JSON.stringify({
        success: true,
        message: isSubscriber ? 'Successfully subscribed to blog newsletter' : 'Email sent successfully',
        id: result.id,
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        },
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal server error', { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        }
      });
    }
  },
};