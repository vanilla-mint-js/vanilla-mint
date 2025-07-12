# @vanilla-mint/router

Lightweight, declarative client-side routing with promise-based route handlers and nested routing support.

## Installation

```bash
npm install @vanilla-mint/router
```

## Features

- 🛣️ **Declarative Routing** - Simple route configuration with pattern matching
- 🔄 **Promise-Based** - Async route handlers with built-in loading states
- 📱 **Hash & History API** - Support for both hash and pushState routing
- 🎯 **Route Parameters** - Extract dynamic segments from URLs
- 🔧 **Route Guards** - Authentication and authorization controls
- 📊 **Nested Routes** - Hierarchical routing with layout components

## Basic Usage

### Route Type and Parameter Access

```typescript
import { Route } from '@vanilla-mint/router';

// Example from apps/website/src/app/pages/forms.page.ts
export const formsPage: Route['render'] = () => {
    return $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $pageSection({
                children: [
                    $h2({ textContent: 'Forms', className: 'text-6xl' }),
                    $p({ className: 'text-lg', innerHTML: 'Out-of-the box Material Design with significant customization via CSS variables.' }),
                ]
            }),
        ],
    });
}

// Example with typed parameters from apps/website/src/app/app.ts
export const libraryPage: Route<any, {}>['render'] = ({ params }) => {
  console.warn({ params });
  return $section({
    children: [
      $h2({ textContent: params?.library }),
      $div({ className: 'outlet' }),
      ...[1, 2, 3].map((v) =>
        $a({
          className: 'p-2',
          href: `/libraries/${params.library}/${v}`,
          textContent: v.toString(),
        })
      ),
    ],
  });
};

// Example with version parameter
export const versionPage: Route<any, {}>['render'] = ({ params }) => {
  console.warn({ params });
  return $section({
    children: [$h2({ textContent: params?.version })],
  });
};
```

### Route Configuration with Data Loading

```typescript
// Example from apps/website/src/app/app.ts
const routes = [
  {
    path: '/notes',
    render: notesPage,
    loader: async () => {
      const response = await fetch(`${apiBase}/note`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const notes = await response.json();
      return { notes };
    },
  },
  {
    path: '/libraries/:library/:version',
    render: ({ params }) => {
      return $section({
        children: [
          $h2({ textContent: `${params?.library} v${params?.version}` }),
        ],
      });
    },
  },
];
```

## API Documentation

### Router Class

```typescript
class Router {
  constructor(config: RouterConfig);
  start(): void;
  navigate(path: string): void;
  back(): void;
  forward(): void;
  getCurrentRoute(): Route | null;
}
```

### Route Definition

```typescript
interface Route {
  path: string;
  handler: (params: object, query: object) => void | Promise<void>;
  guard?: (params: object, query: object) => boolean | Promise<boolean>;
  meta?: object;
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - see LICENSE file for details.