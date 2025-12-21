---
title: "When Android WebView breaks first: oversized cookies, redirects, and a silent 400"
description: "My five traits that define an excellent software engineer"
date: "2025-12-21"
author: "Eduardo Aparicio Cardenes"
tags: ["Android WebView", "Http redirect", "Cookies", "Payment systems", "Iframe"]
image: "/images/blog/when-android-webview-breaks-first/hero-android-webview-oversized-cookies-eduardo-avatar.webp"
---

One of the most fascinating challenges I have faced over the past months is an error that **exclusively** occurred in Android WebView.

The symptom looked simple, almost silly: a **400 HTTPS error** response during a redirect: no response body, no details, no useful logs. The only clue we had was something a colleague noticed while looking at the failing request: **once the Cookie header exceeded 4 KB, the redirect stopped working**, and the only thing WebView returned was a generic network error.

After learning this, I started investigating what could be causing such a bizarre outcome, because cookies usually get truncated, and even if some information is missing, the flow should still work, or at least fail in a way that makes sense.

**Why wasn’t intuition alone enough?**

I gave quite a bit of thought to this, recalling all my experiences with cookies, URLs, and affiliate-style integrations from my almost 4 years at Skimlinks, supporting thousands of customers integrating custom scripts and facing all kinds of edge cases. It felt like one of those classic “works everywhere except this one constrained environment” problems.

So, **where can we start understanding the issue?** **How can we find the root cause with so little information to begin with?**

Well, the first step in any root cause analysis is gathering evidence, context, and information.

## A bit of context first

![Payment flow overview (deposit → Nuvei → Paysafe → failure)](/images/blog/when-android-webview-breaks-first/payment-flow-deposit-nuvei-paysafe-silent-400.webp)

Before going any further, some context is important. Let me set the scene, because without it, the rest of the story does not really make sense.

We have a **web-based payment flow** that runs across multiple channels:

* desktop web supporting all browsers (mainly focus on Chrome and Safari)  
* mobile web supporting all browsers (mainly focus on Chrome and Safari)  
* a native Android app, using **Android WebView**  
* a native iOS app, using **iOS WebView**

This setup allows us to keep a single source of truth for the payment experience, improve security, and move faster without duplicating logic across platforms.

In native journeys, the WebView loads the payment UI iFrame, performs redirects to a payment provider, and then returns control to the app once the payment reaches a final state.

This journey relies heavily on redirects. The user moves from our web experience to the payment provider, and then back again, with different possible outcomes:

* success  
* error  
* pending  
* back or cancel

This detail matters because redirects are not just “navigation”. Redirects carry **headers**, headers carry **cookies**, and cookies can silently become part of your **payload budget** without you realising it.

## What changed, and when

Historically, this WebView channel was working relatively well.

We first launched the Android WebView flow in **August 2025** for the Poland jurisdiction, and it was stable. Shortly after, we temporarily disabled it due to minor issues and to support a **large migration of the payment platform**, which went live in Poland on the **1st of September**.

Once those minor issues were resolved, we attempted to re-enable Android WebView in **October 2025**. That is when things started to break.

The only symptom we had was that same silent **400-style network error** during redirects. No backend errors. No useful logs. Just a failed navigation inside WebView.

So we went through the usual checklist:

* logs  
* code from Android, Web, and Backend  
* release timelines  
* conversations with multiple people involved in the migration

Nothing obvious popped out as “this is broken”.

And that is precisely **why the cookie size clue became so important**.

## Why is this setup inherently fragile?

What makes this problem particularly tricky is how many systems are involved indirectly in a simple redirect:

* **The payment provider**, because redirect URLs and parameters are part of the contract  
* **Your backend**, because it often validates or allows some of those parameters  
* **Your observability tooling**, because it captures navigation and URL data  
* **Android WebView**, because it is the most constrained environment and usually breaks first

In our case, the cookie at the centre of the issue was called **dtSa**, created by **Dynatrace RUM instrumentation**. That cookie was carrying navigation context, including **full URLs**, which is where things started to get interesting.

At this point, we had plenty of **context**, but still no explanation we could **prove**. The system made sense on paper, the flow was correct, and nothing obvious was broken. Yet **Android WebView kept failing in a way that left no trace behind**.

This is usually the moment where **speculation starts to creep in**, but speculation does not fix production issues. When intuition runs out, **engineering discipline has to take over**. We needed something **concrete**, something **measurable**.

The next step was to stop reasoning about what *might* be happening and start looking at what *actually* happened **on the wire**, **byte by byte**.

## The first real clue, a captured failing request

Once we decided to stop theorising and start measuring, the next question was simple:

**What is the exact request that Android WebView is failing to send?**

This is where the investigation finally became tangible.

The turning point was not a log, not an exception, and not a stack trace. It was a **cURL capture**.

An Android engineer captured a failing request directly from WebView and shared it with the team. For the first time, we were no longer guessing based on symptoms. We had the **exact request**, with the **exact headers**, that WebView was trying to send.

That capture became our **single source of truth**.

From there, we did something straightforward, but very powerful:

* Extracted the full **Cookie header** from the request,  
* measured it **byte by byte** using a small Node script that breaks down cookie sizes,  
* focused only on the **largest contributors**, not the noise

No assumptions. No hand-waving. Just numbers.

### What the measurements showed

![Cookie header size breakdown](/images/blog/when-android-webview-breaks-first/cookie-header-size-breakdown-dtsa-dominance.webp)

The results were not subtle.

* **Total Cookie header size:** \~**4.35 KB**  
* **Number of cookies sent:** **13**  
* **Largest cookie:** `dtSa`, approximately **2770 bytes** (\~**2.7 KB**)  
* **Share of total header:** `dtSa` alone accounted for **63.8%**

At this point, the nature of the problem changed completely.

We were no longer debugging:

* a redirect endpoint  
* a payment provider integration  
* backend validation logic

We were debugging a **payload-size issue** that surfaced only in the **most constrained environment**.

One cookie accounted for almost **two-thirds of the Cookie header**. Everything else combined was secondary.

This also explained several things that had not made sense before:

* Why did the backend see no request at all?  
* Why do desktop and mobile Chrome behave normally?  
* Why did Android WebView fail silently, before anything reached the server?

From here, the investigation stopped being about *where* the redirect was failing and became about **what was inside that cookie**, and **why it had grown so large**.

### The more likely culprit: redirect URL truncation leads to a silent 400

The size increase was evidence, but not necessarily the root cause.

The nuance I did not appreciate at the start is simple: **cookie size was not automatically the thing that broke the flow**. Cookies are often truncated, and even when they are, many flows still work.

What the cookie measurement gave us was something more valuable: proof that we had crossed into a fragile zone where something in the request chain was likely being cut, dropped, or rejected.

The real question became:

**If something is being truncated, what is the first thing that would turn into a silent 400?**

To answer that, we had to understand what dtSa actually contained

### What is dtSa, and why did it explode in size

Suppose you have never seen `dtSa` before, a quick explanation. `dtSa` is a cookie generated by **Dynatrace RUM**. Its purpose is to store **navigation context** so that user journeys can be analysed and replayed later for observability and troubleshooting.

In our case, that navigation context included **full URLs**, and that is where things started to go wrong.

**The part that hurt us**

![Redirect URL duplication micro-diagram](/images/blog/when-android-webview-breaks-first/redirect-url-duplication-success-error-pending-back.webp)

The `dtSa` cookie included **four complete redirect URLs**, one for each possible outcome of the payment flow:

* `success_url`  
* `error_url`  
* `back_url`  
* `pending_url`

Each of those URLs contained a large number of **verbose query parameter names**, things like:

* `redirectPaymentStatus`  
* `redirectProvider`  
* `redirectMethod`  
* `redirectHasMadeDeposit`  
* plus multiple identifiers, tokens, and environment flags

Individually, none of these parameters was unreasonable individually. 

The problem was **duplication**.

All four redirect URLs shared almost the same structure. The only meaningful difference between them was the final redirect state. As a result, the cookie ended up storing **four near-identical blocks of URL data**, repeating the same long parameter names again and again.

### What the numbers actually looked like

Once we broke `dtSa` down **byte by byte**, the scale of the problem became very clear.

From the measured breakdown:

* **Total `dtSa` size:** \~**2770 bytes**  
* **Current URL portion:** **2519 bytes**, about **91%** of `dtSa`  
* **Redirect URL parameters across the four URLs:** \~**1.1 KB** of payload

This is where precision matters.

Each redirect URL, `success`, `error`, `pending`, and `back`, contributed **around 270 to 275 bytes** on its own. Because all four URLs shared almost the same structure and the same verbose query parameter names, the cookie ended up storing **four near-identical blocks of data**.

Four redirect URLs at \~275 bytes each meant that **around 1.1 KB of payload** came solely from redirect URLs, before even accounting for the current page URL or additional analytics metadata.

Once combined with everything else, this pushed the **total Cookie header to \~4.35 KB**.

None of these URLs looked unreasonable individually.

Collectively, they pushed the request into a **fragile zone**, where **Android WebView began behaving differently**, causing the **redirect to fail before the request could reliably reach the payment provider API**, even though the same flow continued to work in full Chrome.

So yes, the cookie size was tangible and measurable.

But it still didn’t fully explain the 400.

### The missing piece: the redirect hop that has a 2048-byte ceiling

In our flow, the “redirect problem” is not only the WebView moving between pages. There is also a redirect hop **from the payment provider’s hosted page to a third-party provider**, for example, Paysafe.

That hop is exactly where long URLs become dangerous, because third parties often impose hard limits on the size of URL fields.

Paysafe documentation, for example, specifies URL fields such as return URLs and cancel URLs as **URL (2048)**.

Once you see that, the incident reads differently:

* The redirect URLs were getting larger because we kept appending parameters.  
* Those long URLs were duplicated across success, error, pending, and back.  
* The payment provider then has to carry those URLs through its own flow and hand them off to a third-party provider on the next hop.  
* If that URL exceeds a 2048-character constraint, one of two things usually happens: it is rejected, or it is truncated.  
* **Truncation is the worst case**; it tends to drop tail parameters first, which is often where client metadata and environment details end up.  
* Missing required parameters then surface as a **generic 400** with no helpful body, especially inside WebView.

This is why the “cookie over 4 KB” observation was a helpful clue, but not the root cause. The growing cookie was signalling that our redirect URLs were ballooning and that we were losing headroom.

We cannot confirm the exact failure point with certainty because the redirect chain involves multiple parties, each with its own constraints and behaviours. The most likely explanation is a combination: an overlong redirect URL hitting a third-party ceiling, alongside tighter handling in older Android WebView implementations, which made the whole chain fail in a way that was hard to observe.

In other words, **the cookie was not the only cause**; it told us we were about to exceed a limit elsewhere in the redirect chain.

## Why does Android WebView break first?

![Android WebView vs Chrome behaviour comparison](/images/blog/when-android-webview-breaks-first/android-webview-vs-chrome-cookie-header-failure-400.webp)

This is the part that makes the issue tricky, and also why it is worth sharing.

Once we understood the size and structure of the request, the next obvious question was:  
**Why did this only fail on Android WebView?**

There is no universal cookie limit that every runtime enforces consistently. People often cite around **4096 bytes** as a commonly supported minimum, but implementations vary, and embedded environments tend to enforce limits more strictly or behave differently under pressure.

What we observed in practice was very clear:

* **Desktop Chrome** accepted the header, and the flow completed  
* **Mobile Chrome** accepted the header, and the flow completed  
* **Android WebView** failed before the request reliably reached the payment provider API

This explains the worst part of the incident: **the backend saw nothing**. No logs, no errors, because the request never arrived.

This is also why WebView becomes the **canary in the coal mine**. If you are operating close to protocol or payload limits, WebView is usually the first environment to tell you that you have **no headroom left**.

### Why has it started happening now?

At this point, the remaining question was not **what** was happening, but **why it started happening now**.

Looking back at the timeline, the Android WebView flow had been working previously. The failures only appeared after the payment platform migration, and the only visible symptom was that same silent 400-style network error during redirects.

After reviewing logs, code across Android, Web, and Backend, release history, and talking to multiple team members, a consistent pattern emerged.

On the **15th of September**, a change was introduced to support the new payment platform, **Betler**. As part of that change, the **`back-redirect` URL parameter** began being **proxied to the payment provider**.

Previously, this parameter had been effectively stripped out because it was **not included in the provider’s allowlist of redirect parameters**. Once that limitation was removed, the `back` URL started flowing through as part of the redirect payload.

That change alone did not break anything functionally. What it did was increase the footprint of the **redirect URL**. From that point on:

* The cookie header size started to grow  
* That growth was dominated by **dtSa**  
* And dtSa growth was dominated by **URLs**, especially the full redirect URL set

This is why the issue appeared suddenly rather than gradually. The system crossed a threshold.

At this stage, it was reasonable to frame this as a **high-likelihood working hypothesis** rather than a fully proven root cause.

The next step was to validate it.

## Validating the hypothesis

At this point, we had a strong, evidence-backed hypothesis, but it was still just that, a hypothesis. Before exploring long-term solutions, we needed to answer one simple question:

**Is the request payload size actually the trigger, or just a correlation?**

To do that safely, we treated this as an **experiment**, not a fix.

### The experiment

From the earlier analysis, we knew that each redirect URL contributed roughly **270-275 bytes**, and that the recently added `back_url` redirect was the most recent contributor to the payload. Temporarily removing it would reduce the Cookie header size without changing any other part of the flow.

So we changed **one variable only**: 

We removed the `back` redirect URL.

Nothing else.

### The rollout strategy

Because this affected payments, we validated the change incrementally.

* First, with **internal customers** at **Superbet** in Poland  
* Then, with a **small percentage of external traffic**, around **10%**, in Poland  
* Once metrics looked stable, we ramped up to **100%** of traffic in Poland  
* From there, we started rolling the change out to other jurisdictions where the **Nuvei** integration was in use, including Romania

At each step, we closely monitored completion rates and WebView failures.

### What we observed

The results were consistent.

Once the `back` redirect was removed:

* The **Cookie header size dropped below the fragile threshold**  
* **Android WebView redirects started working reliably again**  
* The **payment flow completed successfully**

As traffic increased, the failures faded away completely.

This gave us the confirmation we needed. The issue was not caused by redirect logic, backend validation, or the payment provider API. It was triggered by the **request payload size**, and **Android WebView was simply the first environment to surface it**.

### Why was this not the solution?

This validation also made one thing very clear.

Removing the `back` redirect was **not a real solution**. That redirect is functionally essential for the user journey, and removing it permanently would be a regression.

What this experiment gave us was confidence, not closure.

At this point, the problem statement changed.

It was no longer **“what is broken?”**

It became **“how do we keep the behaviour and reduce the payload?”**

That is where the solution space opened up.

## Finding the right solution: The options we considered, and why

Once we validated that the **request payload size** was the trigger, the problem statement became very clear:

How do we keep all redirect behaviour intact while reducing the payload enough to make Android WebView stable?

At this point, removing the `back` redirect was off the table. It had served its purpose as a validation step, but it was not an acceptable long-term solution.

This section describes the options considered to mitigate the high likelihood issue of an oversized `dtSa` cookie and a large overall `Cookie` header in `Android WebView`. The options are not strictly mutually exclusive; some can be combined or sequenced over time. 

So we explored several alternatives, each with different trade-offs.

| **Option** | **Value** | **Effort** |
| --- | --- | --- |
| Opt 1: Vendor-driven reduction | Potentially medium if vendors deliver meaningful size cuts | High calendar time, low engineering time. External dependency |
| Opt 2: Shorten query parameter keys | High near-term impact on `dtSa` size and stability | Low to medium engineering effort. Fully owned by frontend |
| Opt 2.1: Shorten keys and values | Higher impact and headroom than Alt 2 | Medium to high engineering effort. Mapping and analytics updates |
| Opt 3: Code/hash-based redirects | Maximum reduction and long-term simplification | High cross-team effort and design. Not immediate |

These estimates are based on applying each strategy to the same captured payload and re-running the size analysis.

| Strategy | dtSa Size | Saved from Original | % Reduction | Cookie Header | Notes |
| --- | --- | --- | --- | --- | --- |
| **Original `dsTa`** | 2,765 B<br>(2.70 KB) | - | - | 4.24 KB | Current production size |
| Option 2 | 2,461 B<br>(2.40 KB) | **304 B** | **11.0%** | 3.95 KB | Readable, easy to debug |
| Option 2.1 | 2,343 B<br>(2.29 KB) | **422 B** | **15.3%** | 3.83 KB | Still human-readable |
| Option 3 where q=XX (2-digit code) | 2,063 B<br>(2.01 KB) | **702 B** | **25.4%** | 3.56 KB | **Maximum compression** ✨ |

### Option 1: Ask vendors to reduce analytics payloads

One obvious option was to ask third parties to reduce what they store inside analytics cookies, for example, by limiting which URLs are captured or compressing internal payloads.

This could work long term, but it comes with clear drawbacks:

* Timelines are outside your control  
* Changes are not guaranteed to land quickly  
* Even if they land, the reduction might not be sufficient

This was a good **parallel track**, but not something we could rely on to unblock production. However, it was made clear that the payment provider couldn’t support us until 16th of December 2025, as it wasn’t a critical issue but rather a feature request, as we were affected exclusively by the new cashier embedded within a WebView.

### Option 2: Shorten redirect query parameter keys

The most attractive option was to reduce the size at the source.

The redirect URLs contained many verbose query parameter names, repeated across four nearly identical URLs (`success`, `error`, `pending`, `back`). By shortening those keys at serialisation time, we could keep:

* **The same values**  
* **The same behaviour**  
* **The same redirect semantics**

While **significantly reducing duplication**.

This approach had several advantages:

* **Fully owned by the frontend**  
* **Fast to implement**  
* **Measurable before rollout**  
* **Reversible behind a feature flag**

| Metric | Original | New | Saved | Reduction |
| --- | --- | --- | --- | --- |
| dtSa Cookie Size | 2,765 B | 2,461 B | 304 B | 11.0% |
| Total Cookie Header | 4.24 KB | 3.95 KB | 0.29 KB | 7.0% |
| Per Redirect URL | 189 bytes | 170 B | 19 B | 10.1% |
| Total (4 URLs) | 756 bytes | 680 B | 76 B | 10.1% |

From the captured failing request, shortening keys alone reduced:

* `dtSa` size by **\~304 bytes (11.0%)**

* total `Cookie` header size from **\~4.24 KB to \~3.95 KB**

* per redirect URL size by **\~10%**, multiplied across four URLs

The main trade-off was reduced human readability of raw URLs and analytics data. This could be mitigated with **explicit key mappings and documentation**, making the compromise acceptable given the stability gains.

#### Option 2.1: Shorten both keys and values

A more aggressive variant of Option 2 was also to compress commonly repeated values, such as enum-like strings or environment flags.

This offered additional savings, but at the cost of:

* **Higher complexity**
* **Harder debugging**
* **Stricter coordination across teams**

Based on the same payload evidence, this approach could reduce `dtSa` size by **\~15.3%**, compared to **\~11%** for keys only.

| Metric | Original | New | Saved | Reduction |
| --- | --- | --- | --- | --- |
| dtSa Cookie Size | 2,765 B | 2,343 B | 422 B | 15.3% |
| Total Cookie Header | 4.24 KB | 3.83 KB | 0.41 KB | 9.7% |
| Per Redirect URL | 189 bytes | 84 B | 105 B | 55.6% |
| Total (4 URLs) | 756 bytes | 336 B | 420 B | 55.6% |

We considered this a **second step**, to be used only if key shortening alone did not provide sufficient headroom under Android WebView constraints.

### Option 3: Replace redirect URLs with a compact identifier

The most extreme option was to stop passing full redirect URLs altogether and replace them with a compact identifier or hash, backed by a lookup on the receiving side.

| Metric | Original | New | Saved | Reduction |
| --- | --- | --- | --- | --- |
| dtSa Cookie Size | 2,765 B | 2,063 B | 702 B | 25.4% |
| Total Cookie Header | 4.24 KB | 3.56 KB | 0.68 KB | 16.2% |
| Per Redirect URL | 189 bytes | 46 B | 143 B | 75.7% |
| Total (4 URLs) | 756 bytes | 184 B | 572 B | 75.7% |

This would give the **maximum payload reduction**, but it would also:

* **Require architectural changes**  
* **Introduce new moving parts in a critical payment flow**  
* **Increase coordination across systems**

However, it comes with clear trade-offs:

* Requires a **new architectural component** to manage code-to-URL mappings  
* Introduces an **additional dependency** in a critical payment flow  
* Makes debugging more indirect, as URLs are no longer self-descriptive  
* Requires **cross-team coordination** across frontend, backend, analytics and potentially payment providers  
* Has a **longer design and delivery timeline**, making it unsuitable as a rapid stabilisation measure

For these reasons, while attractive as a long-term architectural direction, this option was **not appropriate as an incident-driven mitigation**. It is better suited as a longer-term architectural improvement once the immediate fragility is addressed.

## What we went for, and the measurable impact

After evaluating the options, the decision became straightforward. We chose to **shorten redirect query parameter keys at serialisation time**.

This approach gave us the best balance between **risk, speed, ownership, and impact**, while preserving the existing behaviour of the payment flow.

The key reasons were simple:

* It directly targeted the **largest source of duplication**, the redirect URLs  
* It reduced payload size **without changing semantics or values**  
* It was **fully owned** by the frontend, with no vendor dependencies  
* It was **easy to measure** before and after rollout  
* It could be deployed **incrementally and safely** behind a feature flag

In other words, it solved the actual problem we had validated, not a theoretical one.

### What we actually changed

Instead of passing long, descriptive query parameter names in redirect URLs, we introduced a compact mapping at the point where URLs were generated.

For example:

* `redirectPaymentStatus` became `ps`  
* `redirectProvider` became `pp`  
* `redirectMethod` became `pm`  
* environment and platform flags were shortened in a similar way

The important part is what we **did not change**:

* Values stayed the same  
* The redirected behaviour stayed the same  
* backend contracts remained intact

Only the **URL's shape** changed.

Because those same parameters were repeated across **four redirect URLs**, even small reductions per parameter added up quickly.

### Why this worked

This change reduced the size of each redirect URL by a meaningful amount, and because those URLs were duplicated inside the analytics cookie, the savings were effectively multiplied.

The result was enough headroom to move the Cookie header away from the fragile threshold where Android WebView started behaving unpredictably. Importantly, this was not about squeezing bytes for the sake of optimisation. It was about **restoring the safety margin**.

### Why we did not go further (yet)

We deliberately did not start with more aggressive approaches, such as compressing values or replacing URLs with hashes.

Those options remain valid, but they entail greater complexity and coordination costs. The key-shortening approach solved the immediate problem with minimal risk and left room for further optimisation if needed in the future.

Once stability was restored, we could afford to be deliberate rather than reactive.

## Key takeaways and lessons learned

This issue looked, at first glance, like a redirect problem or a payment provider issue. It was neither. It was a **payload size problem**, and Android WebView was simply the first environment to expose it.

There are a few lessons from this that are worth carrying forward.

### 1. Payload size is a real budget, not an abstract limit

Cookies, headers, and URLs are not just implementation details. They are part of your network contract.

You can be well within what desktop Chrome tolerates and still be **beyond what Android WebView can handle reliably**. When you operate close to these limits, small, reasonable changes can suddenly tip the system over.

### 2. Analytics and observability can break production flows

Analytics tooling is invaluable, but it often captures **more context than you realise**, sometimes duplicating URLs or metadata in ways that are hard to spot until something fails.

In our case, analytics cookies were carrying multiple full redirect URLs, multiplying the impact of otherwise reasonable query parameters. That does not make analytics “bad”, but it does mean they need to be considered part of the critical path.

### 3. WebView is the canary in the coal mine

If something works everywhere except Android WebView, that is usually a signal, not an anomaly.

WebView tends to be the most constrained environment, and it will surface issues around size, timing, and protocol edge cases earlier than full browsers. Treat those failures as early warnings, not platform-specific quirks.

### 4. Validation is not the same as a solution

Temporarily removing the `back` redirect validated our hypothesis, but it was never the fix.

Treating validation steps as experiments, with controlled rollouts and clear success criteria, enabled proving causality without introducing regressions. Only once we had that confidence did it make sense to invest in a proper solution.

### 5. Prefer solutions you own, especially under pressure

Shortening query parameter keys was not the most elegant or theoretically perfect solution, but it was **fast, low risk, fully owned**, and **measurable**.

In production incidents, restoring headroom and stability matters more than architectural purity. You can always come back later and improve things once the system is no longer fragile.

## Final thoughts

The biggest lesson for me is not “cookies have limits”. We all know that.

The lesson is: **you can be within what Chrome tolerates and still be beyond what WebView tolerates**, and the failure mode can be silent enough that you will blame the wrong system for days.

If Android WebView breaks first, treat it as a signal that your system has lost its safety margin.

And if your observability tooling embeds your URLs in cookies, you now know where to look.

### Practical advice if you hit something similar

If you are reading this and thinking, “this could happen to us”, here is what I would do immediately:

1. Capture the failing request from WebView, cURL if possible  
2. Measure the Cookie header size, do not guess  
3. Identify the top cookie contributors  
4. Inspect for duplication patterns, especially URLs embedded in analytics cookies  
5. Reduce repeated verbosity first; keys are a great low-risk win  
6. Roll out behind a flag, ramp gradually, and monitor Android completion rates