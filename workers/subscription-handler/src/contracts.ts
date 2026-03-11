export const SUBSCRIPTION_ERROR_CODES = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  RATE_LIMITED: 'RATE_LIMITED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNAVAILABLE: 'UNAVAILABLE',
} as const;

export type SubscriptionErrorCode =
  (typeof SUBSCRIPTION_ERROR_CODES)[keyof typeof SUBSCRIPTION_ERROR_CODES];

export interface SubscriptionSuccessResponse {
  success: true;
  message: string;
  id?: string;
}

export interface SubscriptionErrorResponse {
  success: false;
  code: SubscriptionErrorCode;
  message: string;
}

export type SubscriptionApiResponse =
  | SubscriptionSuccessResponse
  | SubscriptionErrorResponse;
