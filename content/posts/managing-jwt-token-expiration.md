---
title: "Managing JWT token expiration"
description: "JWT token management strategies can be challenging. Here are some strategies that you can consider to use in your project"
date: "2020-09-26"
author: "eduardo aparicio cardenes"
tags: ["JWT", "Authentication", "Security", "Web Development"]
image: "https://cdn-images-1.medium.com/max/800/1*Pi2k-aqj81PoYHJMIZjO8Q.png"
---

### Managing JWT token expiration

![Managing JWT token expiration](https://cdn-images-1.medium.com/max/800/1*Pi2k-aqj81PoYHJMIZjO8Q.png)

When you manage JWT tokens, there are some problems that you may experience when you are dealing with authentication. Particularly, when you need to handle token expiration.

Consequently, I want to share with you the strategies I found useful when I have to manage them.

#### What is a JWT token?

**JWT token** is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) that **defines a compact and self-contained way for securely transmitting information between parties as a JSON object**. This information can be verified and trusted because it is digitally signed.

#### Why is JWT token expiration important?

**A JWT token that never expires** is dangerous if the token is stolen then someone **can always access the user’s data**.

*Quoted from JWT RFC ([RFC 7519](https://tools.ietf.org/html/rfc7519))*:

> The “exp” (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing. The processing of the “exp” claim requires that the current date/time MUST be before the expiration date/time listed in the “exp” claim.

#### When can a token usually expire?

A JWT token should be stateless, meaning that you should store everything you need in the payload and skip performing a DB query on every request. Therefore, **the lifespan of the token last until expiration time has been reached**.

However, you need to **be aware** that **your company may have an exceptional situation** for not following this standard, for example, when you require a [strict logout](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6#:~:text=Yes%2C%20the%20tokens%20can%20be,cannot%20do%20it%20on%20demand.&text=Note%3A%20If%20you%20are%20using,expiration%20time%20on%20you%20JWT.) which creates a backlist for tokens to deny access.

#### Managing token expiration

Depending on the company, we have different policies and strategies to manage our token expiration, some companies want customer to remain logged indefinitely, and others will require to logout from the application after a few hours.

Therefore, I invite you to talk to your product team to align what you is the right strategy that works best for your particular situation.

#### Reactively

Our application will play a passive role by monitoring our HTTP responses, looking for 401 error responses.

![Reactive JWT expiration](https://cdn-images-1.medium.com/max/800/0*ASJCtW543wfjJ_1A)

As the strategy name suggests, we assume our token is valid in every request and reactively take action when this is no longer valid.

1. Request the resource from the server with the current token
2. Receive response notifying our token is invalid.
3. Clean up existing token, store data and proceed to redirect the user back to the login page.

#### Proactively

As the name indicate we check in advance the expiration date in the token to determine if our token is valid before making the HTTP request to the resource server. Even you can define a periodic timer to check for the token expiration.

![Proactive JWT expiration](https://cdn-images-1.medium.com/max/800/0*yUg8x4B6DxPrrjW-)

In this case, we will be confident that our request should be successful since our token expiration date is in the future when we are making the request.

1. Check if the token has expired. If the token is expired we clean up the existing token, application state and redirect the user to the login page.
2. Request the resource with a valid token expiring in the future
3. Receive the resource

#### Hybrid

Hybrid combines the previous strategies allowing us to make sure that we handle cases when a valid token can expire during the request causing a 401 HTTP Response due token expiration during the request.

![Hybrid JWT expiration](https://cdn-images-1.medium.com/max/800/0*3ONjLu_yE_ZDApqq)

This becomes particularly useful on scenarios where request takes a long time to be fired, or system with high volume requests where you may have to queue the request before the server can handle with the possibility has expired during that time.

#### Evaluating strategies

You may feel that these strategies have a clear winner, but you need to think about your particular use case since each strategy have trade-off, which can work better under certain circumstances.

Let’s quickly compare each strategy. (+ Pros, -Cons)

**Reactively**

+ Robust, 401 will always be handled effectively.
- Firing multiple HTTP may cause server overhead when token is invalid
- Require to handle concurrent request if token expired

**Proactively**

+ We don’t make unnecessary requests when the token has expired
- client resources if we check the token periodically
- Extra check in every request including during valid token
- Token may expire during the request returning 401

**Hybrid**

+ Combine the good of previous approaches
- Require handle concurrent, although less likely due to proactive check
- Extra resources to check every request

As you can see, each variant has use cases where they will become better for your system than others to enumerate some cases:

- Reactively: Good when your token doesn’t expire often.
- Proactively: Good when your token have short lifespan, you have a refresh token mechanism, or you make several calls concurrently.
- Hybrid: Good when you want to have a robust system that covers all the potential cases or large response times from your server.

I am sure you have more trade-off or use cases which I may not consider in this article. I look forward to hearing from yours in the comment section below.

#### Refresh tokens

In this post, I have covered what is the alternative to handle token expiration. However, we have a second dimension to consider which I want to cover briefly.

When tokens are about to expire, there are mechanisms to request a new token to keep our user logged permanently with the confidence each token will eventually expire to access the user data in case of leak.

There is a good article from Auth0 called [Refresh Tokens: When to Use Them and How They Interact with JWTs](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/) which I recommend to read if you are interested to learn more about this alternative. 