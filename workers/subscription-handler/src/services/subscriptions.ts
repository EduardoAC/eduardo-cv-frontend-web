import { Resend } from 'resend';
import { Env } from '../types';
import { createErrorResponse } from '../utils/response';

export interface SubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  contactId?: string;
}

// Add contact to Resend audience
export async function addContactToAudience(
  subscriptionData: SubscriptionData,
  env: Env,
  origin: string,
  isAllowedOrigin: boolean
): Promise<{ success: boolean; response?: Response; result?: SubscriptionResponse }> {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    
    const contactData = {
      email: subscriptionData.email,
      firstName: subscriptionData.firstName || '',
      lastName: subscriptionData.lastName || '',
      unsubscribed: false,
      audienceId: env.AUDIENCE_ID,
    };

    const response = await resend.contacts.create(contactData);

    if (response.error) {
      console.error('Resend contacts API error:', response.error.message);
      return {
        success: false,
        response: createErrorResponse('Failed to add contact to audience', 500, origin, isAllowedOrigin),
      };
    }

    return {
      success: true,
      result: {
        success: true,
        message: "Contact added to audience successfully",
        contactId: response.data?.id,
      }
    };
  } catch (error) {
    console.error('Subscription service error:', error);
    return {
      success: false,
      response: createErrorResponse('Internal server error', 500, origin, isAllowedOrigin),
    };
  }
}

// Remove contact from Resend audience
export async function removeContactFromAudience(
  email: string,
  env: Env,
  origin: string,
  isAllowedOrigin: boolean
): Promise<{ success: boolean; response?: Response; result?: SubscriptionResponse }> {
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    
    const response = await resend.contacts.remove({
      email,
      audienceId: env.AUDIENCE_ID,
    });

    if (response.error) {
      console.error('Resend contacts delete API error:', response.error.message);
      return {
        success: false,
        response: createErrorResponse('Failed to remove contact from audience', 500, origin, isAllowedOrigin),
      };
    }

    return {
      success: true,
      result: {
        success: true,
        message: "Contact removed from audience successfully",
      }
    };
  } catch (error) {
    console.error('Subscription service error:', error);
    return {
      success: false,
      response: createErrorResponse('Internal server error', 500, origin, isAllowedOrigin),
    };
  }
} 