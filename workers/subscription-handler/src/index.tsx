import { ExecutionContext } from '@cloudflare/workers-types';
import { SUBSCRIPTION_ERROR_CODES } from './contracts';
import { Env } from './types';
import { validateEnvironment, validateRequest, validateRequestBody } from './validators';
import { checkRateLimiting, updateRateLimitAfterSuccess, createEmailContent, sendEmail, addContactToAudience } from './services';
import { createErrorResponse, createSuccessResponse } from './utils/response';
import { CreateEmailOptions } from 'resend';
import { isAllowedRequestOrigin } from './validators/request';

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    const isAllowedOrigin = isAllowedRequestOrigin(origin, env.ALLOWED_ORIGIN);

    // Validate environment variables
    const envError = validateEnvironment(env, origin, isAllowedOrigin);
    if (envError) return envError;

    // Validate request method and origin
    const requestValidation = validateRequest(request, env.ALLOWED_ORIGIN);
    if (!requestValidation.isValid) {
      return requestValidation.response!;
    }

    const {
      origin: validatedOrigin,
      isAllowedOrigin: isValidatedAllowedOrigin,
    } = requestValidation;

    try {
      // Validate request body
      const bodyValidation = await validateRequestBody(request, validatedOrigin, isValidatedAllowedOrigin);
      if (!bodyValidation.isValid) {
        return bodyValidation.response!;
      }

      const body = bodyValidation.body!;

      // Check rate limiting
      const rateLimitCheck = await checkRateLimiting(
        request,
        env,
        validatedOrigin,
        isValidatedAllowedOrigin,
      );
      if (!rateLimitCheck.allowed) {
        return rateLimitCheck.response!;
      }

      // Create email content
      const { subject, react, isSubscriber } = createEmailContent(body);

      // Prepare email data
      const emailData: CreateEmailOptions = {
        from: env.FROM_EMAIL,
        to: body.email,
        subject,
        react,
      };

      // Send email
      const emailResult = await sendEmail(
        emailData,
        env,
        validatedOrigin,
        isValidatedAllowedOrigin,
      );
      if (!emailResult.success) {
        return emailResult.response!;
      }

      // Add contact to audience if it's a subscriber
      if (isSubscriber) {
        const subscriptionResult = await addContactToAudience(
          {
            email: body.email,
            firstName: body.name.split(' ')[0] || '',
            lastName: body.name.split(' ').slice(1).join(' ') || '',
          },
          env,
          validatedOrigin,
          isValidatedAllowedOrigin
        );

        if (!subscriptionResult.success) {
          console.error('Failed to add contact to audience:', JSON.stringify(subscriptionResult.response));
          // Continue with email success but log the subscription failure
        }
      }

      // Update rate limit
      await updateRateLimitAfterSuccess(request, env);

      // Return success response
      return createSuccessResponse(emailResult.result!, isSubscriber, validatedOrigin);

    } catch (error) {
      console.error('Worker error:', error);
      return createErrorResponse(
        SUBSCRIPTION_ERROR_CODES.UNAVAILABLE,
        'The request could not be completed right now. Please try again in a moment.',
        500,
        validatedOrigin,
        isValidatedAllowedOrigin,
      );
    }
  },
};
