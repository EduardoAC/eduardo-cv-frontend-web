import React, { ReactNode } from 'react';
import { EmailRequest, EmailResponse, Env } from '../types';
import { escapeHtml } from '../utils';
import { SubscriberEmail } from '../emails/subscriber-template';
import { ContactEmail } from '../emails/contact-template';
import { createErrorResponse } from '../utils/response';

// Create email content
export function createEmailContent(body: EmailRequest): { subject: string; html: ReactNode; isSubscriber: boolean } {
  const isSubscriber = body.subject?.toLowerCase().includes('subscriber') || 
                      body.name.toLowerCase().includes('subscriber');

  let emailSubject: string;
  let emailHtml: ReactNode;

  if (isSubscriber) {
    emailSubject = 'New Blog Subscriber Signup';
    emailHtml = React.createElement(SubscriberEmail, { 
      email: escapeHtml(body.email), 
      signupTime: new Date().toLocaleString() 
    });
  } else {
    emailSubject = body.subject || `New Contact Form Submission from ${body.name}`;
    emailHtml = React.createElement(ContactEmail, { 
      name: escapeHtml(body.name), 
      email: escapeHtml(body.email), 
      message: escapeHtml(body.message) 
    });
  }

  return { subject: emailSubject, html: emailHtml, isSubscriber };
}

// Send email via Resend
export async function sendEmail(emailData: any, env: Env, origin: string, isAllowedOrigin: boolean): Promise<{ success: boolean; response?: Response; result?: EmailResponse }> {
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
    return {
      success: false,
      response: createErrorResponse('Failed to send email', 500, origin, isAllowedOrigin),
    };
  }

  const result: EmailResponse = await resendResponse.json();
  return { success: true, result };
} 