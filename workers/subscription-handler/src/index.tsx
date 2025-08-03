import { ExecutionContext } from '@cloudflare/workers-types';
import { EmailData, Env } from './types';
import { validateEnvironment, validateRequest, validateRequestBody } from './validators';
import { checkRateLimiting, updateRateLimitAfterSuccess, createEmailContent, sendEmail } from './services';
import { createErrorResponse, createSuccessResponse } from './utils/response';
import { CreateEmailOptions } from 'resend';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    // Validate environment variables
    const envError = validateEnvironment(env);
    if (envError) return envError;

    // Validate request method and origin
    const requestValidation = validateRequest(request, env.ALLOWED_ORIGIN);
    if (!requestValidation.isValid) {
      return requestValidation.response!;
    }

    const { origin, isAllowedOrigin } = requestValidation;

    try {
      // Validate request body
      const bodyValidation = await validateRequestBody(request, origin, isAllowedOrigin);
      if (!bodyValidation.isValid) {
        return bodyValidation.response!;
      }

      const body = bodyValidation.body!;

      // Check rate limiting
      const rateLimitCheck = await checkRateLimiting(request, env, origin, isAllowedOrigin);
      if (!rateLimitCheck.allowed) {
        return rateLimitCheck.response!;
      }

      // Create email content
      const { subject, react, html, isSubscriber } = createEmailContent(body);

      // Prepare email data
      const emailData: CreateEmailOptions = {
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        subject,
        react,
      };

      // Send email
      const emailResult = await sendEmail(emailData, env, origin, isAllowedOrigin);
      if (!emailResult.success) {
        return emailResult.response!;
      }

      // Update rate limit
      await updateRateLimitAfterSuccess(request, env);

      // Return success response
      return createSuccessResponse(emailResult.result!, isSubscriber, origin);

    } catch (error) {
      console.error('Worker error:', error);
      return createErrorResponse('Internal server error', 500, origin, isAllowedOrigin);
    }
  },
};