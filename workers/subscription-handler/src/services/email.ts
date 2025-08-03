import React, { ReactNode } from 'react';
import { Resend } from 'resend';
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
  const resend = new Resend(env.RESEND_API_KEY);
  const resendResponse = await resend.emails.send(emailData);

  if (resendResponse.error) {
    console.error('Resend API error:', resendResponse.error.message);
    return {
      success: false,
      response: createErrorResponse('Failed to send email', 500, origin, isAllowedOrigin),
    };
  }

  return {
    success: true,
    result: {
      success: true,
      message: "Email sent successfully",
    }
  };
} 