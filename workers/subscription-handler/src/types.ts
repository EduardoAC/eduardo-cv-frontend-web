import { KVNamespace } from '@cloudflare/workers-types';
import { ReactNode } from 'react';

// Email request and response types
export interface EmailRequest {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Cloudflare Workers types are already provided by @cloudflare/workers-types
export interface EmailData {
  from: string;
  to: string;
  subject: string;
  react?: ReactNode;
  html?: string;
  reply_to: string;
}

// Environment interface
export interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
  ALLOWED_ORIGIN: string;
  ENVIRONMENT?: string;
  EMAIL_KV: KVNamespace;
  AUDIENCE_ID: string;
} 