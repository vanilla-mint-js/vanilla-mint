# @vanilla-mint/router-dom

DOM-integrated routing component that seamlessly combines client-side routing with reactive web components.

## Installation

```bash
npm install @vanilla-mint/router-dom
```

## Features

- 🎯 **Component-Based Routing** - Declarative router component for DOM integration
- 🔄 **Reactive Routes** - Automatic re-rendering on route changes
- 📱 **History API Support** - Modern browser navigation with pushState
- 🎨 **Template-Based** - Define routes using HTML-like templates
- 🚀 **Lazy Loading** - Dynamic component loading for performance

## Basic Usage

### Router Setup with Nested Routes

```typescript
import { $router } from '@vanilla-mint/router-dom';
import { $div, $header, $main, $footer, $h1 } from '@vanilla-mint/dom';

// Example from apps/website/src/app/app.ts
document.querySelector('#app')!.appendChild(
  $router({
    className: 'min-h-[100vh] flex flex-col items-stretch justify-stretch w-full bg-neutral-300 text-neutral-300-contrast',
    children: [
      {
        path: '/sequence',
        render: sequencePage
      },
      {
        path: '/',
        render: () =>
          $div({
            className: 'grow flex flex-col items-stretch justify-stretch w-full',
            children: [
              $header({
                className: 'sticky top-0 bg-neutral-100 text-neutral-100-contrast flex flex-row justify-between items-center p-4 drop-shadow-lg',
                children: [
                  $h1({
                    className: 'font-bold text-2xl text-primary',
                    textContent: 'VanillaMintJS',
                  }),
                  $navBar({
                    children: [
                      $navLink({ href: '/', textContent: 'Home' }),
                      $navLink({ href: '/forms', textContent: 'Forms' }),
                      $navLink({ href: '/notes', textContent: 'Notes' }),
                    ],
                  }),
                ],
              }),
              $main({
                className: 'grow flex flex-col justify-stretch items-stretch',
                children: [$div({ className: 'outlet grow flex flex-col justify-stretch items-stretch' })],
              }),
              $footer({
                className: 'bg-neutral-200 text-neutral-200-contrast flex flex-row justify-center items-center p-4',
                children: [
                  $div({
                    className: 'font-semibold text-primary',
                    textContent: 'VanillaMintJS 2025',
                  }),
                ],
              }),
            ],
          }),
        children: [
          {
            path: '/',
            render: landingPage
          },
          {
            path: '/forms',
            render: formsPage
          },
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
            path: '/libraries',
            render: () =>
              $div({
                textContent: 'Libraries',
                className: 'libs',
                children: [$div({ className: 'outlet' })],
              }),
            children: [
              {
                path: '/:library',
                render: ({ params }) => {
                  return $section({
                    children: [
                      $h2({ textContent: params?.library }),
                      $div({ className: 'outlet' }),
                    ],
                  });
                },
                children: [
                  {
                    path: '/:version',
                    render: ({ params }) => {
                      return $section({
                        children: [$h2({ textContent: params?.version })],
                      });
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })
);
```

### Key Features Demonstrated

- **Nested Routes**: Complex route hierarchies with parent-child relationships
- **Data Loading**: Async data loading with the `loader` function for API calls
- **Dynamic Parameters**: Route parameters like `/:library` and `/:version`
- **Layout Components**: Shared layouts with outlet placeholders for child routes
- **CSS Integration**: Full integration with CSS classes and styling

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - see LICENSE file for details.