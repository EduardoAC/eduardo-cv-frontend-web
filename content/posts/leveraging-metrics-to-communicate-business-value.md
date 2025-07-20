---
title: "Leveraging Metrics to Communicate Business Value"
description: "Discover how to harness the power of metrics to improve communication and decision-making within engineering teams."
date: "2024-10-06"
author: "eduardo aparicio cardenes"
tags: ["Metrics", "Engineering", "Business Value", "Web Development"]
image: "/images/blog/leveraging-metrics-to-communicate-business-value-frontmatter.png"
---

Over the past decades, it’s been a transformative reality where metrics have become part of our day-to-day lives with different flavours. We use them to compare products, select vacations, choose banks, decide between job opportunities or compare graphic cards; metrics provide us with simple to digest information to guide our decisions.

![Metrics usage across products to communicate value (Booking, Amazon, Npm, etc)](/images/blog/leveraging-communicate-business-value-introduction.webp)

My goal with this article is to share my view on how you can enhance communications within your organisation through the use of metrics. Over the years of working within different organisations, I’ve noticed that technical conversations among engineers often revolve around opinions and personal preferences. While this might work to cause discussions, it becomes pretty ineffective in decision-making as it might lead to long, drawn-out conversations, as there is an invisible gap between understanding and knowing.

Therefore, I want to share three ways metrics can help elevate these conversations in your organisation and among your peers. Imagine walking into a room filled with strong opinions. By bringing data to the table, we can transform those heated debates into clear, fact-based discussions that everyone can rally around. Metrics offer an unbiased foundation to support your viewpoint, making it easier for your audience to understand your perspective and move past the subjective opinions.

#### Why Should Engineers Care About Metrics?

You might be asking why we engineers, of all people, should care about metrics; honestly, this is a valid question. Consider the last time you talked to your colleagues and didn’t convince them of your point of view. While strong opinions can drive passionate debates, they don’t always lead to predictive outcomes. Metrics, on the other hand, shift the focus from opinions to facts as an engineer who knows how to use the organisation’s data to measure value effectively. These are some of the benefits I found when metrics using metrics effectively:

- **Move from opinions to data:** Make conversations objective and centred around facts.
- **Simplify complex discussions:** Clear data simplifies complex subjects like architectural decisions.
- **Bridge knowledge gaps**: Audiences with different expertise levels can easily follow a data-driven argument.
- **Easy to optimise for**: Metrics provide a baseline to measure progress and optimise effectively.
- **Enhance decision-making**: Transition from qualitative to quantitative discussions.

### The Power of Metrics to Communicate Business Value

Let’s talk about one of the most critical areas where metrics can make a positive impact: communicating business value. Recently, I started conversations with our organisation’s product, engineering and design teams about the importance of investing resources into improving our design system. While we all understood its significance, the reality is that we were struggling to get dedicated resources. We were competing with other high-priority items in the company roadmap, and without clear return of investment (ROI) metrics, we lacked enough evidence to justify moving forward.

Consequently, this led me to take a step back and think critically about how we could quantify the value of the design system in a way that resonated with the team; I realised that by presenting a clear and simple message using metrics, we could cut through the noise and provide a compelling case based in data, not just a gut feeling. To illustrate this example, let’s look at an example of how these two ways of presenting arguments can look like

![Component Usage across projects](/images/blog/qualitative-vs-quantitative.webp)

Looking at the example above, both messages have merit and describe the same reality. However, the second one offers a clearer, measurable message for the audience that we can optimise. Therefore, the next time you have to talk to others, think about ways to provide a clear message using metrics.

![Design system — Component Usage across projects](/images/blog/overall-component-adoption-library.webp)

To further reinforce the concept, let’s take a closer look at the image above to understand how components are used in this design system. By examining the usage of components within a design system library, we can easily understand how we are utilising the available components. This provides us with actionable metrics we can optimise for, enabling better communication within the engineering team to understand why people may not use the components to their full extent. This could be due to various reasons, such as lack of need, difficulty in use, or lack of discoverability.

![Component usage over time](/images/blog/component-usage-overtime.webp)

If we combine the component usage data above with their use over time, we can identify patterns to help us make better decisions. In this case, a likely cause of underutilisation could be that while the design team’s design has evolved, the design system itself hasn’t kept pace. As a result, engineers may be forced to create custom components to deliver new features.

**Note**: Are you curious to dive deeper into design systems? Stay tuned for my upcoming article series, where I will explore how I apply this and other techniques to improve a real-life design system within our organisation, touching on metrics and standardization to how to write strategic and roll-out plans.

### Shift Left Decision-Making Using Metrics

We’ve already discussed the importance of using metrics to enhance conversations. Now, let’s take this concept further by shifting left. By integrating metrics earlier in the decision-making process, we can catch issues sooner, make informed decisions earlier, and ultimately reduce unnecessary costs.

#### Using Issue Triage as an Example

A great example of where this “shift left” approach can bring value is issue triage. In many organisations, it’s common to jump straight into fixing an issue as soon as it’s spotted, often without fully understanding its impact. On the flip side, some issues get added to the backlog and are forgotten until a stakeholder suddenly demands action; sometimes, the bug can remain years in the backlog from the team without having provided any value in the meantime.

![Incident Priority Matrix](/images/blog/leveraging-incident-mess.webp)

Here’s where metrics can help us give the right level of attention to each issue. Mature organisations typically have some form of triage process in place, but it’s often inefficient and requires multiple teams to weigh in, consuming time and resources. By using data more effectively, we can streamline this process.

#### Why Is This Important?

Consider how often you’ve been asked to fix a bug that affected only a single internal user, or you had to drop what you were doing because the product team wanted to know how severe a particular issue was. These situations can be avoided by using the available data to create metrics that automatically triage most cases.

With proper metrics in place, we can assess the real impact of an issue, whether it affects a single user, a specific user group, or the entire customer base. This allows engineers to prioritise their time and focus on what matters most, providing the following benefits:

- **Efficient triage**: Using metrics to assess the priority and impact of issues helps teams focus on the most critical tasks, avoiding unnecessary work on low-impact problems.
- **Preventing wasted effort**: It reduces the chances of working on problems that don’t significantly affect business value, like minor bugs that affect only a few users.
- **Reduced context-switching**: Metrics-driven triage minimises interruptions caused by urgent, last-minute requests, allowing engineers to focus on their priorities and maintain productivity.
- **Clear impact visibility**: Metrics provide transparency across teams, making it easy to see the direct impact of decisions, which fosters accountability and better cross-functional collaboration.

#### Measuring Impact

This approach applies to many different cases, but when it comes to issue triage, a common method of measurement is an incident prioritisation matrix. This allows us to quickly and straightforwardly evaluate incoming issues to engineering and assign them a priority based on the category they fall into.

![Incident Priority Matrix](/images/blog/leveraging-metrics-to-communicate-business-value-markdown.png)

In the image above, we illustrate a series of cases that can bring us some clarity on how to approach this. Nevertheless, this requires us to measure things correctly to know what’s causing each problem and categorise it, considering things like:

**How many users are affected?**

Is it fewer than 10 users out of millions, or does it impact a significant portion of the user base?

**Metrics**: Number of users who logged the issue, usage frequency, and user segments affected.

**What is the nature of the issue?**

Does the issue have regulatory implications? Is it purely a visual or style-related problem, or is it a critical API failure?

**Metrics**: System affected (e.g., payments, authorisation, user profiles), geographic regions, countries, or specific markets impacted.

**If it’s an API failure, what is the scope of the impact?**

Does it affect the web, mobile, or both? Are all devices affected, or just specific ones (e.g., Android, iOS, Windows)?

**Metrics**: Device ID, user-agent, trace ID, platform (e.g., web or mobile), and request failure patterns.

**What’s the criticality of the affected system?**

Is it related to core functionality like login, payments, or user account changes?

**Metrics**: Meta information about the system, results from regression testing, aggregated data from the metrics above, and historical failure patterns.

**What is the user’s journey at the time of the incident?**

Collecting stack traces, logs, and events can provide context about where in the workflow the issue occurred and help pinpoint its impact more accurately.

By measuring and answering these questions, engineering teams can make informed decisions about how to address each issue, prioritise their work, and minimise the impact on the user experience. This data-driven approach reduces guesswork and improves the efficiency of issue triage, ensuring that high-priority problems get the attention they deserve while lower-impact issues don’t unnecessarily consume valuable resources.

### Aim for completeness

When sharing information, it is easy to get caught providing only part of the information to influence decision-making in a certain direction. While this might work in the short term, it risks undermining your credibility in the long run and can lead to costly mistakes or larger issues down the line.

It’s essential to present a full picture for yourself and others when exploring alternatives, including the impact, trade-offs and implications of the situation. By aiming for completeness, you build trust with your audience and help ensure that decisions are based on accurate data.

#### Real-life Example: CI Costs in GitHub Actions

Let’s explore the cost of using GitHub Actions as part of a continuous integration (CI) pipeline using a real-world example. For context, the CI cost of a GitHub project is generally expressed in GitHub minutes, and the price will vary depending on the machine used to run the actions.

![Understanding CI Costs in GitHub Actions: A Real-Life Example](/images/blog/real-life-example-github-pr-costs.webp)

For simplicity, we will use the [smallest standard GitHub runner](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions#per-minute-rates-for-standard-runners), which costs **$0.008 per minute.**

Consider the mobile application within your organisation shared across all the teams with an average of **100 pull requests (PRs) per week**. Due to the complexity of the project and the number of tests required, each CI execution for this repository takes **90 minutes** on average.

At first glance, the weekly cost of running CI for this repository looks manageable:

100 PRs / week * 90 minutes/PR * 0.008 $/minutes = $72/week

However, let’s dig deeper. Metrics show that tests in this project are unreliable, failing **2.2 times on average per PR**, with some PRs failing up to **7 times**. This increases the cost significantly:

$72/week * 2.2 retries/PR = $158.40/week

#### Understanding the Bigger Picture

This isolated figure might not seem alarming. But if we compare it to the overall infrastructure cost, say **$1,500 per week** for your AWS infrastructure, running the CI for this single repository costs the equivalent of **10%** of your total infrastructure budget. These numbers provide clear, actionable insights for the audience, allowing us to see the reality of the project. This enables us to prioritise technical debt reduction, thereby reducing costs, while also providing a baseline for optimisation, as described in previous sections.

#### Beyond Financial Impact

The cost implications are not just financial. Frequent test retries can negatively impact **engineer morale**, leading to frustration and a loss of confidence in the system’s quality. This, in turn, can slow down development and increase the risk of further issues in the long run.

Furthermore, the calculation provided only covers pull requests (PRs). Continuous Integration (CI) also runs on feature branches after every developer push, so the real cost is likely even higher. By tracking the number of branch runs, total pushes, and their corresponding CI executions, you can get a more accurate picture of the total cost.

#### Work towards making data-informed decisions

By gathering and presenting comprehensive metrics for cost, performance, or reliability, you create a clear, data-driven basis for decision-making. This allows for better prioritisation of efforts, such as optimising CI, addressing technical debt, or improving test reliability as discussed in earlier sections. Ultimately, complete and transparent information is essential for making informed, strategic decisions that drive long-term success.

### **Final thoughts**

After discussing these three key areas for elevating your conversations to the next level using metrics to engage the business and improve systems, mitigate tech debt, and optimise resources, we provided practical examples of improving critical areas such as incident management, design systems, and prioritising technical debt. These real-life examples allow for clearer and more impactful conversations.

It’s essential to bridge the gap between understanding specific problems and knowing the trade-offs and cost opportunities of different alternatives. Metrics pave the road to success, enabling a smoother ride for the next challenge and improvement. When considering what data could enable the creation of necessary metrics to describe your optimisation goals, it’s crucial to think about the next challenge and improvement.

Ultimately, it’s not just about collecting data but using it to tell a compelling story. Metrics provide the clarity and context needed to make informed decisions, align cross-functional teams, and move the organisation forward with confidence. By aiming for completeness, transparency, and consistency in the way we present and act on metrics, we can create a more efficient, reliable, and scalable engineering process.

Start thinking beyond assumptions, close the invisible gap, and let metrics be the foundation of your next decision.

### Resources

- [ITIL Priority Matrix: How to Use it for Incident, Problem, Service Request, and Change Management](https://blog.invgate.com/itil-priority-matrix) by [Sophie Danby](https://blog.invgate.com/author/sophie-danby)
- [The challenge of Design Systems adoption metrics](https://uxdesign.cc/design-systems-adoption-metrics-over-the-past-5-years-b389308d6663) by [Matheus Cervo](https://medium.com/@cervomatheus?source=post_page-----b389308d6663--------------------------------)
- [Design system metrics](https://github.com/EduardoAC/design-system-metrics) by [Eduardo Aparicio Cardenes](https://github.com/EduardoAC) 