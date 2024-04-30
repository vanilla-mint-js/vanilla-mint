# VanillMint

A tightly-focused project that leverages `"vanilla"` JavaScript to `"mint"` custom elements.

<img src="vanilla-mint.jpeg" height="320" width="320"/>

## Library Documentation

1. [@vanilla-mint/core](libs/core/README.md)


## Justification

### Because you want:

    1. Basic ability to customize the web
    1. True reactivity (via rxjs Observables currently but could easily be ported to signals resulting in two flavors from which to choose)
    1. Ability to author most of my SIMPLE components in one agnostic technology instead of re-implementing the same thing every time I have to work on a different framework
    1. Portability to run my components inside another framework or in a simple HTML file w/ a script block or in dynamic content (think CMS) where framework evaluation/compilation isn't practical
    1. Fast builds and small bundles (using Vite) (currently under 60kB)
    1. Super simple API that rides as close to the rails of the web as possible
    1. Typescript and strong typing for authoring components and consuming components
    1. Ability to integrate with a big, full-featured library/framework while dehydrating/preserving the fruit of my labor in an ubiquitously reusable place where the library/framework can't dictate how I write and manage my code

### But you don't want:

    1. A devtime compiler (other than TypeScript processors) (Svelte)
    1. A runtime (other than JavaScript) (Angular/React)
    1. A virtual DOM (React)
    1. A massive framework (Angular) or any framework at all
    1. Technological lock-in (All frameworks/libraries basically limit code portability)
    1. Change-detection cycles and batching (Angular)
    1. Arbitrarily magic expressions in native JavaScript (React's use* as well as Svelte's $ and =)
    1. Obfuscation due to excessive abstraction
    1. An ever-changing framework/library API that forces me to rewrite simple components that haven't functionally changed
    1. Component templates as one big string (Lit)

## Design goals:

    1. Minimal abstraction
    1. Minimal package size
    1. Maximum expressiveness
    1. Minimal boilerplate (there is a small amount)
    1. Maximal stability (aka minimal API changes)
    1. Maximal distinction between library idioms and native web APIs

## Why might you want to avoid using this library?

    1. You don't understand the value propisition which means you probably don't have a valid use-case
    1. You love writing HTML and hate using the JavaScript API to interact with elements
    1. Only bare-minimum features are currently implemented

## TODO
    1. Possibly implement management of event handler binding similar to how rxjs subscription management works
    1. Library-level demo and documentation via prefabbed components defined in a separate library
    1. Add a component-level self-documentation feature in the base class that can use abstract members of subclasses to spit out example code for subclasses
    1. Possibly implement stuff like `hide` or `visibility` attributes that are common framework primitives


