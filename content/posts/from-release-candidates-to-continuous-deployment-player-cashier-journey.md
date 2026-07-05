---
title: "Migrating from Release Candidates to Continuous Deployment: The Player Cashier Journey"
description: "How Player Cashier moved from release candidates to continuous deployment through validation, trunk-based development, and rollout automation."
summary: "How Player Cashier moved from release candidates to continuous deployment through validation, trunk-based development, and rollout automation."
date: "2026-07-05"
author: "Eduardo Aparicio Cardenes"
tags: ["Continuous Deployment", "Trunk-Based Development", "Release Strategy", "Frontend Delivery", "Player Cashier"]
topic: "Frontend Architecture and Platform Design"
topicSlug: "frontend-architecture"
image: "/images/blog/from-release-candidates-to-continuous-deployment-player-cashier-journey/the_journey_from_release_candidates_to_deployment.png"
imageAlt: "Feature image for From Release Candidates to Continuous Deployment: The Player Cashier Journey, showing the move from manual release candidates to automated continuous deployment."
---

Over the past year and a half, one very rewarding change that I have been driving in my current company has been the move from release candidates to continuous deployment.

It is fair to say that this is not the first time I have worked through this kind of transition. I have seen different versions of it at previous companies, with different stacks, teams, and levels of maturity. I had never taken the time to write about those lessons before, but this particular project felt worth sharing because it happened inside a product surface where delivery speed, operational safety, security boundaries, and customer trust are tightly connected.

The project was Player Cashier, and it started with a clear purpose: solving two related challenges. The first was enhancing security by isolating payments from the website's third-party libraries and scripts. The second was reducing time-to-market by unifying the channel-native implementations across web, Android, and iOS into a single owned surface.

The security side mattered because payment journeys handle sensitive customer information. Keeping that experience within the main website meant sharing space with everything else that typically exists in a broad web product: analytics, Google Tag Manager, experiments, marketing scripts, and other integrations that may be valuable for the wider product but are not necessarily desirable around a payment surface. Extracting Player Cashier into its own iframe or WebView created a cleaner boundary and reduced the surface area exposed inside the main applications.

The time-to-market side mattered just as much. Multiple channels consumed payments, and every channel had its own release rhythm. The website could take one or two weeks to release. Native applications had their own lifecycle, originally around two weeks, and later reduced to once a week. That may sound acceptable in many product areas, but in payments, it quickly becomes a bottleneck.

When you need to add a payment method, fix a jurisdiction-specific issue, improve a deposit flow, or respond to a provider issue, waiting for every consuming channel to complete its own release cycle slows the whole organisation down. The ambition behind Player Cashier was to create a single owned surface where payment experiences could be built, validated, and delivered once, then consumed everywhere.

The first extraction simplified part of the problem, but it did not fully change the delivery reality. When I joined, the release process still carried many of the habits from the systems around it, which meant the new payment surface had inherited part of the old operating model.

## The release model we inherited

At that point, the project used a Git Flow-inspired model with two long-lived branches: `nonprod` and `production`.

`nonprod` behaved like the development branch. Feature branches and bug fixes were merged there so QA could validate the changes in staging. `production` behaved like the release branch. When a release was ready, the `nonprod` branch was merged into `production`, and all accumulated changes were shipped together under the same semantic version.

On paper, this looked simpler than the broader website release process because we had reduced the number of places from three to two. In practice, it still behaved like a gated release flow. A developer would complete a change, merge it into `nonprod`, validate it there, and later a release candidate would be created. A pull request into the `production` branch represented that release candidate. It would be reviewed, validated, merged, and then released to customers.

The process also created a recurring escape hatch: cherry-picking. When one change had passed QA, but other changes in `nonprod` were not ready, engineers had to cherry-pick the safe change into the release path. That allowed us to isolate work, but it created pressure on developers and QA. A process that should have helped us move faster was still asking people to coordinate around what could and could not be released together.

![Existing Player Cashier Git Flow hybrid with nonprod, production, feature, hotfix, and cherry-pick paths](/images/blog/from-release-candidates-to-continuous-deployment-player-cashier-journey/git-flow-hybrid.png)

The problem was not that this model was unreasonable. Many teams operate with release candidates for valid reasons. The problem was that Player Cashier was intended to reduce dependence on website and native release cycles, while our own delivery process still behaved like a smaller version of those release trains.

Changes accumulated over several days, sometimes over a week. Developers had to remember that merging their work was not enough; they also had to remember the subsequent release process. As the team grew, that friction became more visible. Some changes were ready but not released. Some releases contained several unrelated changes. A scheduled release every Monday was attempted, but it depended on someone having the time and capacity to drive it. When that person was busy, the release could slip, and when releases slip, confidence starts depending on memory and coordination rather than on the system.

## The real problem was the operating model

The issue was not only that releases were manual. The deeper problem was that the operating model created a bigger blast radius than necessary. When changes wait together before going to production, the release becomes harder to reason about. If something goes wrong, the first question becomes: which change caused the issue?

That question is expensive in a payment journey. Player Cashier is not a decorative frontend surface. It sits inside flows where customers deposit, withdraw, verify, return from providers, and complete journeys that directly affect trust. If a release contains too many unrelated changes, rolling back and investigating become harder than they need to be.

There was also a people problem. The process required developers to remember the hidden ritual after the merge. New developers needed to learn that their change was not really done until it was manually promoted. Experienced developers could still forget. Some changes were behind feature flags, so there was less urgency to release immediately. Over time, that created gaps between the version developers thought existed and the version customers were actually using.

Good delivery systems reduce the number of hidden rituals, and that became the direction of the migration.

## The first pillar: validation in isolation

Before changing the release model, we needed confidence that individual changes could be trusted. Continuous deployment without strong validation only moves risk faster, and that was not what we wanted.

For Player Cashier, validation had to focus on the boundaries that mattered: the URL and host context, jurisdiction configuration, feature flags, API contracts, host application behaviour, and the handoff between the embedded payment surface and the systems around it.

The outside-in testing strategy became one of the foundations of that work. I wrote about it in more detail in [Outside-In Testing Strategy: Building Confidence for Continuous Deployment](/blog/outside-in-testing-strategy-building-confidence-for-continuous-deployment), but the important point for this story is that validation had to move closer to the change.

Instead of asking whether everything in `nonprod` was ready, we asked whether this specific change was ready.

That distinction changed the shape of delivery. We introduced a way for developers and QA to validate pull request changes in isolation. A pull request could produce a version of Player Cashier identified by branch and commit hash. Using feature flags and cookies on the website, we could choose which version of Player Cashier the host application should load.

That meant QA and developers could test a change in a standalone version of the application or inside the real host experience, depending on what needed to be validated.

![Feature branch deployments as isolated QA environments](/images/blog/from-release-candidates-to-continuous-deployment-player-cashier-journey/feature-branch-deployments.png)

This mattered because Player Cashier was embedded. It was consumed by different channels and shaped by jurisdiction-specific configuration. If every validation required waiting for a shared environment to contain the right combination of changes, we would keep recreating the same bottleneck under a different name.

Feature-branch deployments gave us clearer boundaries. QA no longer had to rely only on the shared `nonprod` branch to validate work. Developers could get faster feedback. Regressions caused by unrelated changes became easier to avoid because the change under review had its own deployable version.

There was a trade-off. Supporting multiple isolated validation environments requires automation, and QA may need to validate changes individually rather than as part of a batch. But that trade-off was aligned with the goal: reduce coupling, reduce ambiguity, and make each change easier to trust.

The outcome was meaningful. Over roughly a year, with more than 10 deployments per week, we had only one production incident. For a payment surface consumed across multiple channels and jurisdictions, that level of stability gave us the confidence to continue changing the process.

## The second pillar: trunk-based development

Once validation was stronger, we could change the branching model. The old model had `nonprod` and `production`, which encouraged release candidates and manual promotion. It kept two realities alive: the place where developers merged, and the place customers eventually received from.

We moved towards a single branch: `main`. `main` became the source of truth for development. `nonprod` was deprecated, and production was replaced with `main` as the branch representing the product's current state.

![Proposed trunk-based development flow with short-lived branches and production as the source of truth](/images/blog/from-release-candidates-to-continuous-deployment-player-cashier-journey/trunk-based-development.png)

At first, this did not mean jumping straight into full continuous deployment. We moved through continuous delivery.

Every merge into `main` created a new version of Player Cashier using `semantic-release` in GitHub Actions. The assets were created, the version existed, and the release was available. But promotion still required manual approval.

That intermediate step was important. It allowed the team to understand the new flow without immediately removing all human control. Developers could see that their merge produced a real version. QA could validate it. The release process became more explicit and more repeatable.

It also exposed the next limitation. Even with `main`, people could still forget to promote their version to production. Some changes were behind feature flags, so developers did not feel a sense of urgency. Other times, people simply moved on to the next piece of work. The result was better than before, but it was still not continuous deployment.

We had reduced the branching complexity, but the system still depended on people remembering the final step. When people do not promote each version immediately, releases start accumulating again. A release may include ten or twelve versions in a row, each one created as an isolated change, but now grouped because the final step was delayed. The process had improved, but it was still incomplete.

## The third pillar: rollout automation

The third pillar was automation, and the principle behind it was simple: if a task is repetitive, easy to forget, and important for production consistency, it should not depend on someone remembering to do it manually.

That is where customer rollout came in. Customer rollout became responsible for orchestrating the path from merge to customer availability. Once changes were merged into `main`, the system could create the version, prepare the assets, switch traffic from the previous version to the new one, and notify the right people that something had changed.

This included updating the Player Cashier release notes and notifying stakeholders through our scheduled maintenance flow. In our context, this mattered because product support needed to know when something changed. When you release multiple times a day, the ability to correlate a customer issue with a specific release becomes part of the operational model.

If something goes wrong, you need to know what changed, when it changed, where it was released, and which previous version is safe to roll back to.

That is difficult when releases are large and irregular. It becomes much easier when each change moves through the same automated path. Automation closed the gap between continuous delivery and continuous deployment. Developers no longer needed to carry a release through the final mile manually. The system could do that consistently, while still leaving a clear record of what happened.

## The cost question

I wanted to validate cost before pushing the model further.

It is easy to propose more automation in theory, but every extra deployment has a cost somewhere. In this case, we had to look at GitHub Actions minutes and S3 storage.


The GitHub Actions side was less concerning than expected. In the test we ran, each deployment took around thirteen seconds. That made the cost of deploying feature branches to staging environments negligible compared with the operational value of validating changes in isolation.

![S3 upload output showing Player Cashier assets being uploaded during deployment](/images/blog/from-release-candidates-to-continuous-deployment-player-cashier-journey/s3-asset-upload.png)

The S3 side was also small per deployment. At the time, the project size was around 4.3MB. One deployment was not the issue. The real question was accumulation. If every branch and every release can create assets, storage remains cheap in the short term but still needs a cleanup model over time.

![GitHub Actions deployment job showing build, deploy to S3, and post-deployment steps](/images/blog/from-release-candidates-to-continuous-deployment-player-cashier-journey/github-actions-deployment.png)

That cost analysis did not block the migration, but it revealed something important that became more relevant later: as deployments become more frequent, assets start to accumulate. Solving release speed raises the next operational question: how long those versions and assets should remain alive.

That question became the foundation for the next article in this series.

## What changed after the migration

The most obvious change was speed, but speed was not the only outcome. The more important change was that Player Cashier began operating as a product with its own delivery model. It was no longer an extracted frontend surface still constrained by the release habits of the systems around it.

Validation moved closer to the change. Branching became simpler. Deployments became smaller. Release information became easier to trace. Rollback became clearer because each version had a sharper boundary.

A delivery model that works only because a few people remember the right steps does not scale. Eventually, someone is busy, someone is new, someone assumes a feature flag means there is no urgency, or someone simply does not know the hidden part of the process.

By moving validation into the pull request flow, simplifying the branch model, and automating rollout, we reduced the number of things people had to remember. The system started carrying more of the operational discipline.

That is what made the migration valuable. It was not just a faster pipeline. It was a more reliable way of operating the payment surface.

## Why the pillars had to move together

Looking back, the order mattered.

If we had automated the old release process without improving validation, we would have moved risk faster. If we had moved to `main` without automation, we would have continued to rely on people to remember the final step. If we had improved testing but kept release candidates, we would still have carried the blast radius of batched releases.

The solution had multiple sides, each addressing a different part of the problem.

Validation gave us confidence that a change could be tested in the right context before it reached customers. Trunk-based development reduced the distance between development and production by establishing a single source of truth. Rollout automation removed the manual final step and made production delivery consistent. Together, those pillars changed the operating model.

That is an important lesson for this kind of migration. Continuous deployment is rarely achieved by changing a single configuration file or a single CI/CD workflow. The workflow matters, but the workflow only works when the surrounding system supports it.

The team needs confidence in the change. The branch model needs to reduce unnecessary gaps. The release path needs to be repeatable. The observability and communication around releases need to help people understand what happened in production.

Otherwise, the system may look modern on paper while still depending on manual coordination in practice.

## Conclusion

Player Cashier was created to reduce security exposure and improve time-to-market for payment changes across web, Android, and iOS. Extracting the payment surface into its own iframe and WebView experience helped, but extraction alone did not guarantee the operating model we needed. As long as the release process still behaved like the systems around it, we were carrying some of the same friction into the new architecture.

Moving from release candidates into continuous deployment required more than CI/CD automation. Validation, trunk-based development, and rollout automation had to move together. Validation gave us confidence in each change before it reached customers. Trunk-based development reduced the distance between development and production. Rollout automation removed the manual final step and made delivery consistent.

The result was a delivery model with smaller releases, clearer ownership, better traceability, and fewer hidden manual rituals for the team to remember. Player Cashier became closer to the operating model it needed: a payment surface that could evolve quickly without asking customers or consuming channels to absorb unnecessary release friction.

But continuous deployment created the next operational question. Once you release many times a day, you also create many versions a day. Every merge can produce new assets, new entry points, and a new runtime reality for customers. Some customers adopt immediately. Some keep older assets because of cache, long-lived sessions, WebViews, or explicit version targeting.

Continuous deployment answers the question of how we move forward. It does not fully answer how long yesterday's version should remain alive.

That is the next layer of the story: version lifecycles, operational support, and asset retirement.
