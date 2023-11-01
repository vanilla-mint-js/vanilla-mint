# VanillaMints

## Why?

### Because I don't want:

    1. A devtime compiler (other than TypeScript processors) (Svelte)
    1. A runtime (other than JavaScript) (Angular/React)
    1. A virtual DOM (React)
    1. A massive framework (Angular)
    1. Technological lock-in (All frameworks/libraries basically limit code portability)
    1. Change-detection cycles and batching (Angular)
    1. Obfuscation due to excessive abstraction (Angular)
    1. An ever-changing framework/library API (React)
    1. Component templates as one big string (Lit)

### And because I do want:

    1. Basic ability to customize the web
    1. True reactivity (via Observables)
    1. Ability to author most of my components in one agnostic technology instead of re-implementing the same thing every time I have to work on a different framework
    1. Portability to run my components inside another framework or in a simple HTML file w/ a script block or import
    1. Fast builds and small bundles (using Vite) (currently under 60kB)
    1. Typescript and strong typing for authoring components and consuming components

## Why might you want to avoid using this library?

    1. You hate Observables
    1. You don't understand Observables
    1. You think signals are better than Observables because that's what everyone is talking about now
    1. I wrote it in like an hour
    1. No one is using it (yet) not even me (but it works)
    1. The name isn't cool
    1. Creating component templates is currently straight vanillaJS (jsx or something hackier is planned though)
    1. Only bare-minimum features are currently implemented (but I think they're pretty slick and can get better)

## TODO

    1. Implement a method in the base class that composes DOM elements
    1. Add better typing support
    1. Add a documentation feature in the base class that can use abstract members of subclasses to spit out dox/example code for subclasses
    1. create vanilla-mints/components lib
    1. Create example projects (starting w/ Angular)
    1. Create vanilla-mints/angular to wrap vanilla-mints/components as a module or something (repeat for other frameworks)
    1. Expose properties of VanillaMint subclass to the handler evaluation
    1. Decide how to avoid naming collisions with DOM and frameworks for eventHandlers
    1. Define standard attributes/events
    1. Implement stuff like `hide` or `visibility` attributes

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)


