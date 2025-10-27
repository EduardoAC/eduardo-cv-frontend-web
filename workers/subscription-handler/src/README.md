# Subscription Handler Worker

This Cloudflare Worker handles email subscriptions and contact form submissions with proper validation, rate limiting, and CORS support.

## File Structure

```
src/
├── index.tsx                 # Main worker entry point
├── types.ts                  # TypeScript type definitions
├── utils.ts                  # Utility functions
├── validators/               # Validation logic
│   ├── index.ts             # Validator exports
│   ├── environment.ts       # Environment validation
│   └── request.ts          # Request validation
├── services/                # Business logic services
│   ├── index.ts            # Service exports
│   ├── rate-limiting.ts    # Rate limiting logic
│   └── email.ts           # Email service logic
├── utils/                  # Utility modules
│   └── response.ts        # Response creation utilities
└── emails/                 # Email templates
    ├── contact-template.tsx
    └── subscriber-template.tsx
```

## Architecture

### Validators (`/validators`)
- **environment.ts**: Validates all required environment variables
- **request.ts**: Validates HTTP method, origin, and request body

### Services (`/services`)
- **rate-limiting.ts**: Handles rate limiting logic with an in-memory window
- **email.ts**: Manages email content creation and sending via Resend API

### Utils (`/utils`)
- **response.ts**: Provides standardized response creation functions

### Main Handler (`index.tsx`)
The main handler orchestrates the flow:
1. Environment validation
2. Request validation
3. Rate limiting check
4. Email processing
5. Response creation

## Key Features

- **Modular Design**: Each concern is separated into its own module
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Consistent error responses with proper CORS headers
- **Rate Limiting**: Prevents abuse with an ephemeral in-memory window
- **CORS Support**: Proper CORS handling for cross-origin requests
- **Email Templates**: React-based email templates for different use cases

## Environment Variables

Required environment variables:
- `ALLOWED_ORIGIN`: Allowed origin for CORS
- `RESEND_API_KEY`: Resend API key for sending emails
- `FROM_EMAIL`: Sender email address
- `TO_EMAIL`: Recipient email address

## Usage

The worker accepts POST requests with JSON body containing:
- `name`: Sender name
- `email`: Sender email
- `message`: Message content
- `subject`: Optional subject line

The worker automatically detects if it's a subscriber signup or contact form submission based on the content. 
