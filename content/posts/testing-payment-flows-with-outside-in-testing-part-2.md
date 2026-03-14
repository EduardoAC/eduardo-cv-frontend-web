---
title: "Testing Payment Flows with Outside-In Testing: A Practical Integration Testing Case Study - Part 2"
description: "Learn how to apply outside-in testing to payment flows in a frontend cashier. This Part 2 case study covers URL context, feature flags, API mocking, and provider handoffs."
date: "2026-03-13"
author: "eduardo aparicio cardenes"
tags: ["Outside-In Testing", "Integration Testing", "Testing Strategy", "Payment Testing"]
image: "/images/blog/testing-payment-flows-with-outside-in-testing-part-2/01-hero-payment-flows-outside-in-testing.png"
imageAlt: "Payment flow diagram showing an outside-in integration testing strategy"
---

*From customer journeys to actionable code, with integration acting as the confidence engine.*

*Opening framing: from customer journeys to actionable code, with integration acting as the confidence engine.*

For years, inside-out testing felt like a sensible default. In [Part 1: Outside-In Testing Strategy: Building Confidence for Continuous Deployment](/blog/outside-in-testing-strategy-building-confidence-for-continuous-deployment), I explained why outside-in testing is a more effective model for modern frontend systems, and why confidence should be built at the boundaries where the system meets reality.

That became increasingly important for me as frontend systems grew in complexity. What used to be a simpler collection of pages, components, and helper functions has evolved into a much richer orchestration layer.

Modern frontend applications coordinate APIs, embedded contexts, configuration, cross-platform contracts, redirects, experiments, and external providers. In that kind of environment, many of the most painful failures no longer live inside isolated units alone. They live where the system is entered, where state is resolved, where contracts are interpreted, and where control leaves the application and later returns.

That shift changed how I think about confidence.

Confidence does not come from testing more code in isolation and hoping trust grows from there. It comes from understanding the real shape of the system, identifying the boundaries where reality can break, and protecting the minimum journey that must always remain true for the product to deserve trust.

I also believe strongly in practice over theory. So rather than staying in the abstract, this second part walks through a real case study from one of the most sensitive and business critical areas of any product: payments.

More specifically, this article focuses on the **Player Cashier**, the UI payment experience used by customers across web, iOS, and Android. It is a good example because it is not just a page. It is an orchestration system embedded inside a wider product, with several runtime contracts shaping what the customer can actually do.

That makes it the perfect place to show how boundaries, customer journeys, and integration tests fit together into one coherent strategy.

In Player Cashier, every meaningful integration test protects a customer-visible truth at the boundary where production risk actually lives.

## The Player Cashier is a frontend system inside a larger system

The Player Cashier powers deposit and withdrawal related payment interactions across multiple channels.

* On the web, it runs inside an iframe embedded in the host site.
* On iOS and Android, the same experience is consumed inside native web views.

That gives the team important benefits, especially around security and separation of concerns, but it also makes the system more than a simple screen. It becomes an embedded subsystem with contracts on both sides.

The architecture makes that clear. The internal cashier experience is intentionally separated from the host shells on one side and from backend services on the other.

* Adapters hide platform-specific communication details.
* The API layer hides environment-specific request logic.

Together, they keep the internal system focused, but they also define the exact places where risk enters the application.

![Player Cashier system context showing host shells, adapters, the API layer, and backend services.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/02-player-cashier-system-context.png)

That architectural shape matters because it changes the testing conversation. If we reduce the Player Cashier to a collection of screens, components, and helper functions, it becomes easy to optimise for isolated validation while missing the places where real production risk actually enters the system.

But if we look at it as a frontend system inside a larger system, the meaningful questions become much clearer.

* How does it enter with the correct context?
* How does it fetch and interpret backend data?
* How does it communicate with the host platform?
* How does it adapt safely when runtime configuration changes?

These are not secondary implementation details. They are part of the product's operating surface.

## Identifying the key boundaries of the Player Cashier

Once I looked at the Player Cashier through an outside-in lens, four boundaries stood out.

1. **The URL boundary:** in an embedded application, the URL is not just navigation. It defines how the system is entered, what context is available, and which jurisdiction or environment assumptions the application starts with.
2. **The feature flag boundary:** in payments, LaunchDarkly is not just a convenient rollout tool. It is part of the operating model. Kill switches and payment-group flags can change what the customer sees at runtime, which means configuration outside the application directly changes the journey inside it.
3. **The API boundary:** payment methods, balances, configuration, and operational state are all resolved through backend calls. If that boundary is wrong, the UI may still render nicely while the customer journey fails in practice.
4. **The adapter boundary:** the Player Cashier needs to communicate with web, iOS, and Android shells through stable interfaces even though those platforms behave differently under the hood. That makes the communication contract itself part of the system boundary.

These are not abstract architectural notes. They are the points where production risk lives.

Once those boundaries are visible, the testing strategy becomes much clearer because the team can stop asking:

> What code should we test next?

and start asking:

> What customer-visible truths must still hold when the system meets reality?

## Defining the Player Cashier confidence loop

Part 1 introduced the idea that confidence starts with the journey, then works inward towards the code. In payments, that shift matters because the customer does not care how the orchestration is implemented. They care that the right methods appear, that the amount can be entered or selected, that clicking deposit does what it promises, and that the system ends in the right outcome.

That is exactly what the confidence loop is meant to protect.

![Player Cashier confidence loop showing the payment journey from customer entry to outcome.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/03-payment-confidence-loop.png)

In the Player Cashier, the deposit and withdrawal journey can be described simply enough for any stakeholder to understand. At this stage, there are two core journey shapes for these transaction types: fully embedded journeys and external third-party journeys.

**External third-party journeys**

1. The customer enters the cashier.
2. The available payment methods are shown.
3. A method is selected.
4. The amount or payment information is provided.
5. The payment journey is triggered.
6. The external provider flow takes over where necessary.
7. Control returns to the cashier through redirection.
8. Redirect state resolves.
9. The payment outcome is shown.

**Fully embedded journeys**

1. The customer enters the cashier.
2. The available payment methods are shown.
3. A method is selected.
4. The amount or payment information is provided.
5. The payment journey is triggered.
6. The relevant UI is shown integrated through SDKs.
7. Payment outcome resolves through an API response or SSE event.

These are the loops that deserve protection first.

| ![Deposit experience embedded inside the wider account area.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/04-deposit-experience-embedded.png) | ![Close-up view of the payment widget the customer actually interacts with.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/05-payment-widget-close-up.png) |
| :---: | :---: |
| *The deposit experience embedded inside the wider account area.* | *The close-up view of the payment widget the customer actually interacts with.* |

These two journey shapes differ in how control moves through the system, but they share the same testing need.

In both cases, the confidence loop is the minimum journey that must remain true from entry to outcome.

The details of the payment route may change, but the need for the customer to see the right method, trigger the right action, and reach the right result does not.

## Why integration became the primary confidence engine

Once the boundaries and the confidence loop became clear, the role of integration testing became much easier to understand.

A modern testing strategy still needs static checks and unit tests.

* Static checks give fast feedback on safety.
* Unit tests help validate complex isolated business logic like taxation.
* Selective end-to-end tests remain useful when the full environment itself must be proven.

But in a payment orchestration frontend, **integration tests** **become the widest part of the confidence model** because it is the layer that can actually validate runtime context, feature flags, API responses, state transitions, adapter behaviour, and user-visible outcomes together.

That is why the testing trophy matters here. It does not say every kind of test has equal value. It shows that the greatest return comes from the tests that preserve the most meaningful customer behaviour while still providing stable and fast enough feedback for day-to-day engineering work. In the Player Cashier, that sweet spot sits squarely in integration.

| ![Testing hourglass showing integration as the primary pre-deployment confidence layer.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/06-testing-hourglass-integration-confidence.png) | ![Testing trophy model showing customer-facing confidence higher up the stack.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/07-testing-trophy-payments.png) |
| :---: | :---: |
| *The practical hourglass: integration carries most of the pre-deployment confidence, while end-to-end remains more selective and slower.* | *The wider testing trophy model: static and unit tests matter, but most customer-facing confidence sits higher up the stack. (credits to Daniel Alonso for illustration)* |

This is also why end-to-end cannot be the only answer. End-to-end gives maximum realism, but it also comes with slower feedback, more environmental fragility, more difficult debugging, and higher operational cost. In practice, integration becomes the place where confidence is most usable before deployment.

It is close enough to reality to matter, but controlled enough to remain trustworthy.

That is what makes the next examples useful: they are not isolated test snippets, but concrete proofs of how this confidence model works in practice.

## Code walkthrough: validating the customer reality in Player Cashier

The most useful way to read the rest of this article is as a repeated split pattern.

At the top sits a customer-visible state or interaction. Underneath sits the integration test that proves that state is real. This is where the article stops being theory and becomes evidence.

That split matters because it links four things together at once:

* what the customer sees
* which boundary is being exercised
* what the test code is actually validating
* why that test deserves confidence

Each example in the following sections follows that same structure. The UI on top reflects the behaviour the customer experiences. The code underneath reflects the integration test that proves that behaviour is real.

That is the practical payoff of the strategy described so far. Once the boundaries are visible and the confidence loop is clear, the next step is to validate customer-visible truths where production risk actually enters the system.

From here, the article moves boundary by boundary, showing how the Player Cashier protects that reality in practice.

### Boundary 1: URL and environment context

The first truth to protect is that the cashier boots into the correct environment.

In an embedded payment system, the journey starts before the first click. The domain and URL shape which runtime context is resolved, which jurisdiction is active, and what assumptions the system can safely make. If this boundary is wrong, everything that follows can be wrong too, even if the UI still renders.

The test underneath reflects that reality. It mounts the application with the expected stage domain, waits for the runtime to settle, then asserts that the store contains the environment context the cashier should have derived from the URL.

This is a good example of outside-in thinking: the team is not testing a helper in isolation; it is proving that the user entered the right system state before the visible journey even begins.

![Runtime environment context derived from the Player Cashier URL and domain.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/08-url-boundary-runtime-context.png)

### Boundary 2: Feature flags shape what the customer can do

In payments, feature flags are operational controls like kill switches as much as experimentation tools.

A payment method may need to be turned off immediately. A payment group may need to be restricted for a specific rollout or environment. That means the customer-visible journey can change at runtime without any application code changing.

The split example makes that explicit. At the top, the disabled-state UI shows a warning instead of an active payment option. Underneath, the integration test sets the feature flag state and proves that the cashier renders the correct behaviour.

This is exactly why feature flags belong in the boundary model: they are external configurations that directly reshape the real product experience.

![Feature-flag-driven disabled payment state in the Player Cashier.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/09-feature-flag-payment-state.png)

### Boundary 3: The API layer is mocked at the boundary, not inside the journey

The Player Cashier needs to preserve its real request path if the tests are going to be useful.

That is why Mock Service Worker is such a good fit. Instead of bypassing the API layer from inside the application, the tests replace the backend at the network boundary. The cashier still talks to its own API layer exactly as it would in production. The difference is that the response is controlled by the test.

This preserves the internal orchestration path while keeping the suite deterministic. It lets the team validate that the cashier interprets backend responses correctly, renders the right methods, and reacts to user actions in a realistic way. In other words, the backend is simulated where the system meets it, not where the customer journey depends on it.

This is an important principle of the whole strategy: **we mock at the boundary, not inside the journey**.

That is what keeps the test close to reality without giving up control.

![Mock Service Worker setup intercepting Player Cashier API requests at the network boundary.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/10-api-boundary-msw-setup.png)

### Boundary 4, part one: The journey must reflect what the customer just did

One of the simplest but most important customer truths in the deposit journey is that selecting a quick amount should actually update the amount the cashier will use.

The customer sees those buttons as real actions, not as decorative UI. So the test underneath proves that choosing 50, 150, or 200 updates the input field exactly as the interface promises.

This is a small example, but it shows why integration matters. The test validates the visible UI control, the interaction path, and the resulting state together. That is much closer to user reality than proving that a local value changed inside a single component.

![Quick amount selection updating the deposit amount in the Player Cashier UI.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/11-quick-amount-selection.png)

### Boundary 4, part two: Creating the deposit and withdrawal and handing off to the payment provider

The strongest journey-level example is the one that goes beyond rendering and proves orchestration. Once the customer has selected an amount and clicked deposit:

1. The cashier must create the deposit request.
2. Receive the provider response.
3. Redirect correctly into the payment journey.

That is not a single unit of behaviour. It is the coordinated result of the URL context, the feature flag state, the API boundary, and the journey logic all holding together.

![Deposit flow creating the payment request and redirecting to the payment provider.](/images/blog/testing-payment-flows-with-outside-in-testing-part-2/12-provider-handoff-deposit-flow.png)

The split view works especially well here.

The screenshot at the top shows the interface the customer trusts.

The integration test below proves that the click is meaningful: the request is created, the correct provider URL is produced, and the handoff to the payment journey happens as expected.

This is exactly the kind of test that earns trust because it protects a real business-critical transition, not just a local implementation detail.

## Bringing the Player Cashier testing strategy together

Once you line these examples up, the strategy becomes much easier to see.

Each test is doing more than validating an isolated piece of behaviour. It is protecting a customer-visible truth at one of the boundaries where production risk actually enters the system.

* The URL boundary proves the cashier started in the correct context.
* The feature flag boundary proves the customer is seeing the right runtime configuration.
* The API boundary proves the cashier is interpreting backend reality correctly.
* The journey-level tests prove that the visible interactions still lead to the real outcome the customer expects.

This is why the strategy works.

If we review the methodology described at Part 1 for Outside-In Testing Strategy, confidence comes from protecting journeys, not isolated units. In Player Cashier, that means the most valuable tests are the ones that preserve customer truth where the system meets the world.

#### Key takeaways

* Confidence comes from protecting customer journeys, not just isolated units.
* The Player Cashier testing strategy is shaped by four key boundaries: URL, feature flags, API, and adapters.
* Integration tests are the primary confidence engine because they validate runtime context, configuration, orchestration, and user-visible outcomes together.
* The value of the strategy is not test count. It is the amount of real production risk removed before release.
* The outcome is a clearer path to releasing payment changes with confidence.

## Player Cashier testing strategy: what's next

This strategy is already useful, but it is not finished.

The next step is to deepen journey completion so more of the payment flow is validated end to end within the integration model before selective real end-to-end checks are added.

The adapter boundary can also be externalised further so communication across web, Android, and iOS can be validated more explicitly and with stronger cross-platform confidence. A practical next step here is to explore browser mode in Vitest 4 alongside iframe and web view scenarios, so the real adapter boundary can be exercised through integration tests whenever possible.

Beyond that, the same outside-in model should be extended into accessibility and visual validation. Payments do not only need to work logically.

They also need to be understandable, usable, and visually trustworthy for customers. That makes accessibility and visual checks natural next layers in the same confidence model, rather than separate concerns living outside it.

The strategy remains evolutionary: deepen the journey, harden cross-platform boundaries, and add accessibility and visual confidence deliberately.

## Closing thoughts

The most important lesson from the Player Cashier is that the article and the test suite should tell the same story.

* The transaction type, payment option and methods are visible because a feature flag allowed it.
* The amount changes because the customer selected it. A deposit starts because the cashier created the request and redirected correctly.
* The system boots into the right state because the URL and environment context were resolved correctly.

When the images on top and the code underneath say the same thing, the strategy becomes much easier to understand and much easier to trust.

That is the real promise of outside-in testing.

It gives the team a way to connect customer-visible behaviour, architecture boundaries, and engineering proof into one model. In a payment system, that is the difference between having tests and having confidence.

I hope you found this real case study useful. If it resonated with you, share it with your team, and feel free to reach out with comments or questions.
