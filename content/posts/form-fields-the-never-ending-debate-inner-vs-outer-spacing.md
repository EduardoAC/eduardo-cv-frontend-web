---
title: "Form fields the never-ending debate inner vs outer spacing"
description: "Explore the key trade-offs between inner and outer spacing in form design. Learn how to create effective form layouts"
date: "2024-08-24"
author: "eduardo aparicio cardenes"
tags: ["Web Development", "UI Design", "Forms", "Best Practices"]
image: "/images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing-frontmatter.jpg"
---

### Form fields the never-ending debate inner vs outer spacing

When discussing creating a great user experience, we must address forms

—the standard method for collecting user information in our applications.

For many years, the ongoing debate about the best way to design form fields and create reusable components has been a cornerstone of our field. Forms can have fields arranged vertically, horizontally, or in combination. In this article, we will delve into the two most common approaches to creating effective form layouts and discuss the trade-offs associated with each. By the end, you will have a deep understanding of form field spacing and layout, which you can immediately apply to your projects.

Let’s begin by defining a form text field as a component comprising a label, an input, and a crucial element- the state/subtext. This element plays a pivotal role in providing feedback to the user based on their input, thereby enhancing their interaction with the form.

![](/images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing-frontmatter.jpg)

Form field component alternatives, inner or outer spacing

The image doesn’t adhere to exact pixel measurements, but let’s clarify the key dimensions. Assume the label uses a 16px font size with a total height of 32px, including 8px spacing above and below. The subtext/feedback below the input has a 12px font size with 10px spacing on both the top and bottom. The input itself uses a 16px font size with a line height of 24px, along with 16px of vertical padding and a 1px solid border, resulting in a total height of 58px as displayed on the screen.

### Spacing is not just an attribute but a component.

Now that we have the overall context of how the component was initially composed let’s take a step back and think about what defines this component. We can consider the label, input, and subtext/feedback as three separate elements that conform to the text field experience, and no one will argue against this mindset. But what about spacing? Will you consider it part of the component or the form layout?

Depending on your choice, this will have implications for how you build your experience; applying some analytical thinking, we can see the ramifications of this choice. Let’s consider the following contact form as an example.

![](/images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing-markdown.jpeg)

Outer spacing contact form example for different devices

In the examples above, both the image and the [form](https://demo.mobiscroll.com/forms/responsive) from Mobiscroll.com treat spacing as external to the Text Field. This approach offers the advantage of separating concerns between the component and the layout, which results in a cleaner design. However, it comes with a trade-off. Subtext and feedback elements, such as error messages, can disrupt the visual spacing within the form. These changes in height can be more expensive for the browser to render and visually jarring for the user. Since the component itself does not directly manage the layout, the parent form component must handle these scenarios, adding complexity and requiring additional consideration.

![](/images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing-markdown.jpeg)

Alternatively, consider incorporating the spacing directly within the component itself using inner spacing. This approach allows the component to manage the spacing internally, freeing the layout from handling this responsibility. It also enables the component to seamlessly transition between different subtext/feedback states, such as error and success. The benefit here is that the component maintains control over the additional real estate it occupies, ensuring smooth adjustments in various scenarios.

![](/images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing-markdown.jpeg)

Inner spacing contact form example for different devices

However, this approach introduces new considerations. For instance, what happens when no text is displayed or when an error message requires two lines instead of one? These situations may still impact the overall layout. If the error text expands, will the component push other content down, reintroducing layout shifts that we aimed to avoid?

![](/images/blog/form-fields-the-never-ending-debate-inner-vs-outer-spacing-markdown.jpeg)

### Inner vs. Outer Spacing Trade-offs

We have explored the differences between inner and outer spacing and how they impact content. By now, you should have a clear understanding of what each approach entails: inner spacing, also known as padding, and outer spacing, also known as margin.

Let’s dive deeper into the benefits and drawbacks of each approach.

#### Outer Spacing

**Pros:**

*   Keeps components simple, with minimal logic and a clear purpose.
*   Positions are dictated by outer containers, making it easier to manage layout consistency.

**Cons:**

*   Additional feedback, such as error messages, can disrupt the experience by causing unexpected changes in width if not appropriately handled.
*   Forces the outer container to make decisions based on the component’s nature rather than focusing on organising content.
*   Requires the outer container to consider each field’s nature and data to make layout decisions, adding complexity to the design.

#### Inner Spacing

**Pros:**

*   Maintains a consistent user experience within the same context, which is especially important as the form evolves. For example, labels may appear above, to the left, or even inside the input at different stages.
*   Allows layout decisions to be made within the context of the data, including feedback such as error, success, or warning states.

**Cons:**

*   Requires more granular control of the layout flow and stricter criteria on what can be allowed within the component.
*   Offers less flexibility in complex forms that require heterogeneous spacing for the same field type.

### Conclusion

Designing forms and fields within a design system requires careful consideration of spacing, layout, and feedback to create a seamless user experience. Throughout this article, we’ve explored the trade-offs between inner and outer spacing strategies, the importance of maintaining consistency, and the challenges of managing component behaviour in various states.

Inner spacing, or padding, offers the advantage of maintaining a consistent experience within the component’s context, especially as forms evolve over time. On the other hand, outer spacing, or margin, simplifies component logic but places greater responsibility on the layout to manage potential disruptions caused by feedback elements like error messages. Each approach has its own merits and drawbacks, and the choice between them should be guided by the specific needs of your design system and the complexity of your forms.

Ultimately, a well-crafted design system balances these considerations, providing reusable, adaptable components that ensure both visual consistency and functional flexibility. By standardising how spacing and feedback are handled, you empower developers and designers to build forms that are not only aesthetically pleasing but also highly user-friendly. As you continue to refine your design system, remember that the goal is to create a unified experience across all touchpoints, enhancing usability while maintaining a clear, cohesive design language. 