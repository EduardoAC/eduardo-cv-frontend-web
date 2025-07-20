---
title: "React Higher-Order Components vs Vue.js Slots: A Dynamic Components Comparison"
description: "Recently, I faced the interesting challenge of customising the experience of a button group component on VueJS as part of my job at…"
date: "2025-03-29"
author: "eduardo aparicio cardenes"
tags: ["React", "Vue.js", "Component Design", "Web Development"]
image: "https://cdn-images-1.medium.com/max/800/1*LypxaBmmCX6tbTYHKEEauA.png"
---

Recently, I faced the interesting challenge of customising the experience of a button group component on VueJS as part of my job at Happenning. As someone deeply experienced in React but a newcomer to VueJS, I approached the problem as I would on React by turning the value property from a string into a ReactNode (component) and attempting to pass it down to be evaluated within the loop but quickly realise that it wasn’t as simple as I thought so I decided to bring today my learnings on how to achieve such a things on VueJS but more interestingly how React compares to VueJS to achieve such a thing.

So please fasten your seatbelts and put your tray table in the upright position. This will be an incredible journey you won’t want to miss.

### The challenge

![Example: deposit amount quick select large devices](https://cdn-images-1.medium.com/max/800/1*ti-8jF0LUvTS5GP6HU_zAg.png)

Imagine we have a RadioButtonGroup component responsible for showing multiple buttons arranged uniformly, behaving like a radio button, and allowing one choice. However, on smaller devices, the currency text in the buttons breaks onto the following line due to insufficient horizontal spacing.

![example: deposit amount quick select in smaller devices](https://cdn-images-1.medium.com/max/800/1*pI2GBC89ionNhtyLwofm6Q.png)

In addition, this particular component is expected to receive a list of objects containing various properties such as icons, badges, and key-value pairs.

For this article, we will focus exclusively on the key-value pair and the challenge of customising the option label field within the RadioButtonGroup component, considering that the product decision is to hide the currency in smaller devices.

![VueJS vs React — Radio Button Group component](https://cdn-images-1.medium.com/max/1200/0*QD23vtJ6G6YGwNUs)

At first glance, Vue.js and React components seem pretty similar. However, our goal here is to explore in more depth how each library tackles supporting passing a custom component to handle the label customisation, minimising RadioButtonGroup behaviour disruptions and supporting product requirements.

### Design Considerations

To tackle this challenge effectively while minimising disruptions, we made the following key decisions:

1.  **Maintain Backward Compatibility**: Ensure that existing consumers of the component experience no unexpected breakages.
2.  **Keep the Component Agnostic**: The component should not dictate how labels are rendered, preserving flexibility.
3.  **Support Label Customisation**: Introduce a mechanism for customising the label rendering.
4.  **Delegate data manipulation**: The component should delegate label rendering to a customization layer, avoiding rigid implementations (e.g., treating “100 EUR” differently from { amount: “100”, currency: “EUR” }).

For those interested in best practices, trade-offs, and the reasoning behind these decisions, refer to the Annexe section below.

### The Solution

When we approach this problem with an open mind, we can see multiple ways to tackle dynamic components and customization in Vue.js and React. This article will explore how each library handles these challenges and compare their approaches.

I’d like to mention that I received valuable support from great colleagues in finding these answers, but they’re not perfect. So, as you go through the solutions, please use your own judgment. If you have any improvements, feel free to leave a comment below; I’d love to hear your thoughts on how they can be improved. 👇

### Solving this with VueJS

VueJS 3 currently support two ways of providing this kind of customisation into the RadioButtonGroup component, both are different towards developer experience and value, so we will explore them to guide a holistic view of the alternatives.

**Option 1: Using a Dynamic Component**

```gist:965c7d0ede07741e012ac1a235be9cd9```

What this option provides:
This approach uses the `h` function in Vue.js to create a VNode (similar to a ReactNode) that can be passed down to the component for rendering. The `component :is="option.label"` directive is used to dynamically render the passed component as the label.

✅ **Pros**:
- Simple and Declarative: Allows dynamic rendering of custom components in a very Vue-idiomatic way.
- Flexible: Provides full flexibility for passing any component to render.

🚫 **Cons**:
- Type Safety: This approach may have issues with type checking, as it doesn’t enforce specific types when passing custom components.
- No Prop Management: Props may be splattered and not properly scoped for the child component.

**Option 2: Using a Slot**

Here, we use a slot inside the **RadioButtonGroup**., allowing the parent component to control how the **label** is rendered.

```gist:d78ccf9f7f05e77d5ae1083857a6e25b```

Slots are more idiomatic and more powerful in Vue.js (you can pass anything from the parent component, apply styling, and avoid prop drilling or overrides). Slots preserve type checking, whereas `<component :is="option.label" />` generally drops types.

✅ **Pros**:
- Strong Type Checking: Slot usage maintains proper type integrity.
- Flexibility: The parent has full control over the content rendered in the slot.
- Idiomatically Vue: Using slots is the preferred and idiomatic way to customize content.

🚫 **Cons**:
- Less Explicit: The lack of a clear render mechanism can be confusing to new Vue.js developers.
- Requires More Setup: You must define the slot in the child and pass the custom content from the parent.

### Solving This with React

React, unlike Vue.js, does not have a built-in slot system. Instead, it relies on **composition through ReactNode**, **render props**, or **higher-order components (HOCs)** to achieve similar levels of customization.

#### Option 1: Using ReactNode as a Prop

The simplest way to customise the label is to pass a ReactNode (JSX element) instead of a string.

```gist:220b3510ee05b585f8ac2524becdb24c```

The `RadioButtonGroup` component accepts an array of `option` objects, each containing `value` and `label` properties. The `label` property can either be a string or a JSX element. Here, `label` is passed as a JSX element (`<CustomElement displayName="100 EUR" />`), which is then rendered as part of the `RadioButtonGroup`.

✅ **Pros:**
- Simple and intuitive.
- Full flexibility to pass in components.
- React naturally supports JSX as children.

🚫 **Cons:**
- Not as explicit as Vue slots for customization.
- TypeScript can struggle with mixed types (e.g., string | JSX.Element).

#### Option 2: Using Render Props

To explicitly define how the label is rendered, we can provide a **render function** as a prop:

```gist:f18633ff5f0a77bac4c6642a48d4e520```

The `RadioButtonGroup` component accepts a `renderLabel` function as a prop. The `renderLabel` function is called for each `option` in the `optionList`. This function receives the `option` object, and it's responsible for rendering the label, which can be a custom JSX element or component based on the data in `option`.

✅ **Pros:**
- More explicit than passing ReactNode directly.
- Works well with TypeScript (explicit types).

🚫 **Cons:**
- More verbose than Vue slots.
- Requires additional function calls, which can be slightly less performant.

#### Option 3: Using Higher-Order Components (HOCs)

A more advanced pattern in React is to **wrap** the RadioButtonGroup with an HOC that injects label customization logic:

```gist:3e0250e6e464274a5dae42b087815c6f```

The `withCustomLabel` HOC wraps the `RadioButtonGroup` component and injects custom label logic. In this case, the `label` field of each `option` is transformed into a JSX element (`<CustomElement displayName={option.label} />`). The HOC provides an enhanced version of the `RadioButtonGroup` with custom label logic.

✅ **Pros:**
- Encapsulates logic cleanly.
- Works well in component libraries.

🚫 **Cons:**
- Overkill for simple cases.
- Less popular since React Hooks became the norm.

### Comparing Vue.js and React Approaches

The tables highlight these key differences by showing that while **Vue.js slots** provide an easy and explicit way to customize components, **React’s JSX and render props** offer more fine-grained control at the cost of complexity. Both systems prioritise flexibility but in different ways. Vue focuses on simplicity, and React on extensive composability, making the choice of framework depend on the developer’s need for clarity versus dynamic flexibility.

```gist:44bc0b2479734d88297ae9789f8b53a8```

Vue.js and React take fundamentally different approaches to component customisation. Vue.js offers a **declarative system** with **slots**, making it easy to inject custom content into components in a clear and structured way. Vue requires you to explicitly declare the slot in the template, which adds an additional layer of setup.

The **slots system** is ideal for clear and intuitive customisations, though it **may not scale well for more complex dynamic content scenarios.** This is particularly noticeable when defining **dynamic components** or handling more complex customisations, as Vue often requires extra steps to specify slot names and pass content into them.

In contrast, React provides more **flexibility** through **JSX, render props, and higher-order components (HOCs)**. React’s approach allows for explicit control over component behavior, particularly with render props and JSX elements, making it highly customisable.

**React’s JSX** system, on the other hand, **allows for more direct composition**, meaning you can simply pass **ReactNodes** or **components** directly into the parent component without explicitly defining placeholders like Vue’s slots. The simplicity of this model often means less boilerplate and easier customizations in smaller applications, especially for developers familiar with JSX.

### Final Thoughts

When compared, **Vue.js** and **React** both offer powerful tools for component customisation, but they approach the task differently.

**Personally, I lean towards React’s composition model** for the reasons already exposed, especially as projects grow in complexity; handling side effects, re-renders, and customisation can be managed in a more predictable and scalable manner. Particularly, Vue’s Single File Components (SFCs) can become large, making them harder to read and maintain. Additionally, Vue requires **explicit setup for reactivity** (e.g., `ref()` and `reactive()` in the Composition API), while React’s state management is **implicitly handled** through hooks like useState and useEffect.

However, I acknowledge that **Higher-Order Components (HOCs) are more fragile than slots**, as HOCs require awareness of a child component’s implementation details, potentially introducing unintended dependencies. In contrast, Vue’s **slots** promote encapsulation by allowing flexible content injection, making it easier to create declarative and highly customisable UI structures.

However, while coding **React’s broader architecture** naturally lead us towards **KISS over DRY**, encouraging a clear, composable interfaces over tightly coupled logic. Vue.js, on the other hand, naturally encourages **encapsulating logic within components**, given the convenience of scoped slots and its reactivity system.

Over the years, we have seen how the industry has evolved towards **clearer component interfaces,** as seen in modern UI libraries such as Ant Design and Material UI (Check the Annexe 👇 for more details). These libraries favour **composability and customisation** over deeply nested, all-inclusive components. Given the varied nature of web applications and the increasing demand for flexibility, **React’s approach tends to align better with modern UI component architecture trends**.

### Annexe: Design Considerations

As we tackle every problem we encounter in our daily lives, we must understand the context to provide effective solutions that consider our system's constraints. Otherwise, we will fix our particular issue but affect other developers and customers along the way.

### Understanding the current architecture

The mindset of DRY (Don’t repeat yourself) components where all the logic is self-contained has fallen out of favour because it presents the challenges towards flexibility, adaptability and maintainability as the component can be used in multiple different contexts, for instance, if RadioButtonGroup is used to display notifications, menus, navigation, etc.

These days, component libraries have moved towards a different philosophy, easy to read and change, showing components that explore KISS (keep it simple and stupid), exposing an easy-to-use interface that allows you to customize the component and adjust to your particular use case using syntax like Ant Design does for their [radio component](https://ant.design/components/radio). _Explore the Ant Design Radio Button Playground_ [_here_](https://codesandbox.io/p/sandbox/37pcq7)_._

```
<Radio.Group>
  <Radio.Button value={}>{label}</Radio.Button>
  <Radio.Button value={}>{label}</Radio.Button>
  <Radio.Button value={}>{label}</Radio.Button>
</Radio>
```

As with most engineering decisions, there is no clear winner but rather trade-offs: DRY components will sacrifice flexibility to minimise boilerplate code, while KISS is the way around.

### Scoping your change

While doing our work, we tend to improve things, but this can quickly increase the scope of changes we aim to make, leading to wasted engineering effort, frustration, and disagreement.

Hence, it’s vital to keep yourself grounded, particularly when you enter a new job, project, or organisation. Based on your experience, personal preferences, and surrounding tech debt, you can start making large changes that will delay your fix from reaching the customers.

First, allow yourself to go through the brainstorming as your curiosity, passion and drive should always be encourage but take the time to write them down how things are and how you will do things in a piece of paper or document so you can take a step back when written to break it down in quick win and medium and short term solutions like I am doing on this article, I wanted to compare VueJS vs React but I am writing also about principles and philosophies towards better architect solutions and insights on how to approach this challenges.

### Be mindful of the existing consumers.

When you are altering any existing behavior, it is tempting to change the component in a way that fixes your issue. Still, you must always think about how other people will adopt the change and the importance of caring for them so always aim to be backwards compatible or minimise disruptions like React does within his ecosystem when function components replaced classes or hooks replaces classes lifecycles and avoid outcome like Angular 1 to 2 fiasco that drive a lot of developers away from a great framework.

However, if you need to make a disruptive change, you must provide a clear path forward with examples, migration guides, and tools to enable them to do so. Expo is an excellent example of tooling for migrating between versions.

### Document your decisions

While we were talking about scoping your change, it’s valuable to document what decisions and why you have taken them to add to your ticket or PR to allow others have the necessary context to provide effective feedback as it happens to you while you are looking into all the potential solutions, scope and context same it will be experience by people that are outside of the work that you have done so it could help them to trim the decision tree and get better perspective on what you achieving with you changes. 