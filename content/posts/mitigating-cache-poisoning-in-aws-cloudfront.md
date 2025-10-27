---
title: "Mitigating Cache Poisoning in AWS CloudFront: A Frontend Engineer's Guide"
description: "Cache poisoning in AWS CloudFront can break user experiences by serving poisoned assets. Learn what it is, how it happens, and how to prevent it with CloudFront Functions, WAF, and AWS policies."
date: "2025-10-27"
author: "eduardo aparicio cardenes"
tags: ["AWS", "CloudFront", "Security", "Web Security", "Cache Poisoning", "Web Application Security", "CDN", "S3"]
image: "/images/blog/mitigating-cache-poisoning/hero-banner-mitigating-cache-poisoning-in-aws-cloudfront.png"
---

Not long ago, we hit a problem that seemed almost unbelievable at first: customers opening our cashier application suddenly saw error pages instead of the app itself.

No JavaScript bundles. No CSS. No index.html. Just a 501 error cached at the edge.

This wasn't a random outage. It was a cache poisoning attack. An attacker found a way to manipulate request headers so that AWS CloudFront cached an error response and then served it back to all subsequent users.

Obviously, our initial thought was that AWS infrastructure would, by default, prevent anything that might lead to this sort of scenario, but we were naive :sweatsmie.

As frontend engineers, we're often focused on building pipelines, performance budgets, and optimising bundles. But when your CDN cache turns against you, the whole frontend collapses fast. In this article, I'll walk you through:

- What cache poisoning is and how it impacted our users
- The business consequences of poisoned caches
- The alternatives we considered (WAF, CloudFront Functions, Origin/Response Policies)
- Why we ultimately chose CloudFront Functions

Practical code and patterns you can reuse in your own setup

Along the way, I'll include diagrams to illustrate the flow, since it's often easier to see how these attacks propagate visually.

## What Is Cache Poisoning?

Cache poisoning is when a malicious request tricks your CDN into storing the wrong content under a valid cache key. The next user who comes along gets the poisoned content instead of the real one.

Think of it like a library: someone sneaks in and replaces the label on a box of JavaScript code with a fake one. Now, every reader who checks out that box gets garbage instead of the book they needed.

In our case, here's how it played out:

1. Attacker sends a request with a custom, unexpected header.
2. S3 (our origin) doesn't know what to do with it → returns a 501 Not Implemented.
3. CloudFront caches that 501 response under the normal cache key.
4. Subsequent users request the same JS bundle and instead get the cached error.

![When Cache Turns Against You](/images/blog/mitigating-cache-poisoning/when-cache-turns-against-you.webp)

> This diagram shows how a single poisoned request can cascade into a region-wide failure.

## Why This Matters for Frontend Engineers

From a business perspective, even a single poisoned entry can be catastrophic:

- **Functional impact:** users couldn't deposit or withdraw because the cashier app failed to load.
- **Commercial impact:** failed transactions → lost revenue → abandoned sessions.
- **Trust impact:** customers hit support in frustration, and trust erodes fast when money is involved.

And debugging? Painful. Cache poisoning often occurs at specific **edge nodes**, not in local or staging setups.

It manifests in specific edge nodes, which makes debugging painful. For the on-call engineer, this meant hours of trying to piece together logs that didn't look the same in staging.

## Alternative Solutions

We explored three AWS-native approaches to defend against poisoning.

![Alternative solutions available on AWS](/images/blog/mitigating-cache-poisoning/alternative-solutions-waf-functions-policies-overview.webp)

### 1. AWS WAF (Web Application Firewall)

![The First Line of Defense – AWS WAF](/images/blog/mitigating-cache-poisoning/the-first-line-of-defense-aws-waf.webp)

> WAF acts as a shield in front of CloudFront, filtering malicious headers and blocking suspicious requests.

**Pros:**
- Managed rulesets
- Reusable across distributions

**Cons:**
- Adds latency and cost
- Doesn't normalise the cache key

### 2. CloudFront Functions

![Normalize at the Edge – CloudFront Functions](/images/blog/mitigating-cache-poisoning/waf-vs-cloudfront-functions-comparison.webp)

> These micro-JavaScript functions run at the edge in microseconds.

They let you strip unwanted headers and normalise requests before caching.

**Pros:**
- Deterministic control
- Near-zero latency
- Simple deployment

**Cons:**
- Limited runtime
- Requires careful rollout

### 3. Origin Request & Response Policies

![Guarding the Origin – Origin and Response Policies](/images/blog/mitigating-cache-poisoning/guarding-the-origin-origin-and-response-policies.webp)

> These AWS-managed policies control what gets forwarded and cached.

- **Origin Request Policy:** defines which headers/cookies/query strings reach S3.
- **Response Headers Policy:** enforces `Cache-Control: no-store` on error responses.

**Pros:**
- No code required
- Complements other defences

**Cons:**
- Too late for the initial cache decision

## Trade-offs and Decision

![Choosing the Right Tool – WAF vs CloudFront Functions vs Policies](/images/blog/mitigating-cache-poisoning/waf-vs-cloudfront-functions-comparison.webp)

We compared them across key dimensions:

| Dimension | AWS WAF | CloudFront Functions | Policies |
|------------|----------|----------------------|-----------|
| Primary Control | Detection & Blocking | Deterministic Normalisation | Forwarding & Response Controls |
| Latency | Higher | Ultra-Low | Low |
| Cost | Medium | Low | None |
| Cache Safety | Indirect | Direct | Indirect |
| Ops Ergonomics | Complex | Simple | Configurable |


**Conclusion:** WAF is a shield, Policies are hygiene, but Functions provide surgical control.

## Our Final Architecture

We chose CloudFront Functions for their precision and speed. Our implementation included:

- Whitelisting allowed request headers (dropping all others).
- Normalising cache keys by stripping unnecessary query params.
- Preventing error responses from being cached (Cache-Control: no-store).
- Adding observability markers for debugging.

![Our Winning Setup – Layered Defense](/images/blog/mitigating-cache-poisoning/our-winning-setup-final-architecture.webp)

We combined all three for layered edge security:

1. WAF filters the noise.
2. CloudFront Function sanitises requests.
3. Policies set cache boundaries.

Here's a simplified snippet:

```js
function handler(event) {
  var request = event.request;
  var allowed = ["accept", "accept-encoding", "if-none-match", "if-modified-since", "user-agent", "range"];
  var sanitized = {};
  for (var h in request.headers) {
    if (allowed.indexOf(h) !== -1) sanitized[h] = request.headers[h];
  }
  request.headers = sanitized;
  request.uri = request.uri.replace(/\/+/g, "/");
  return request;
}
```

## Quick Reference Flow

![CloudFront Cache Safety Flow](/images/blog/mitigating-cache-poisoning/cloud-safety-diagram-flow.webp)

This compact infographic summarises the entire defense pipeline at a glance.

> **Layered defense ensures every cached response is safe and predictable.**


## From Chaos to Control

![From Chaos to Control](/images/blog/mitigating-cache-poisoning/from-chaos-to-control-closing-scene.webp)

Cache poisoning was a wake-up call.
Even the most optimised frontend can crumble if the CDN layer gets compromised.

By layering CloudFront Functions, WAF, and policies, we built a defence that's fast, reliable, and developer-friendly.

> “Don't just cache your assets, cache your confidence.”

**Key Takeaways for Frontend Engineers:**

* Normalise aggressively: your CDN cache key isn't safe by default.
* Layer defences: WAF for filtering, Functions for control, Policies for guardrails.
* Prioritise observability: you can't debug what you can't see.
* Protect user trust: one poisoned response can break your product's credibility.

## Conclusion

Cache poisoning in CloudFront was a wake-up call: our beautifully optimised frontend bundles were useless if the CDN itself served poisoned errors.

By adopting CloudFront Functions, with WAF and policies as supporting layers, we built a defence-in-depth strategy that was lightweight, fast, and reliable.

If you're a frontend engineer working with AWS, even if CDN details feel far from your daily bundle size battles, I encourage you to audit your cache key setup. You might be surprised how much trust you're placing in uncontrolled request headers.

## Next Steps

If you're building on AWS CloudFront today, audit your cache keys and error handling policies.

Start with a Function to drop untrusted headers, it's a small step with huge impact.
