# @vanilla-mint/dom

Modern DOM manipulation utilities and styled component creation with a functional programming approach.

## Installation

```bash
npm install @vanilla-mint/dom
```

## Features

- 🎯 **Functional DOM API** - Functional approach to creating and styling DOM elements
- 🎨 **CSS-in-JS Styling** - Dynamic styling with type-safe CSS properties
- 📱 **Responsive Design** - Built-in support for responsive styling patterns
- 🔧 **Utility Functions** - Comprehensive set of DOM manipulation helpers
- 🚀 **Performance Optimized** - Efficient element creation and styling
- 🎪 **Event Handling** - Streamlined event management with modern patterns

## Basic Usage

### Creating Elements with Real Examples

```typescript
import {
  $div, $header, $main, $footer, $h1, $h2, $section, $nav, $a, $p
} from '@vanilla-mint/dom';

// Example from apps/website/src/app/app.ts - Complex layout structure
const appLayout = $div({
  className: 'grow flex flex-col items-stretch justify-stretch w-full',
  children: [
    $header({
      className: 'sticky top-0 bg-neutral-100 text-neutral-100-contrast flex flex-row justify-between items-center p-4 drop-shadow-lg',
      children: [
        $h1({
          className: 'font-bold text-2xl text-primary',
          textContent: 'VanillaMintJS',
        }),
        $nav({
          className: 'flex flex-row gap-4 items-center',
          children: [
            $a({
              href: '/',
              className: 'p-3 font-semibold hover:text-primary hover:bg-primary-contrast rounded-sm transition-all',
              textContent: 'Home'
            }),
            $a({
              href: '/forms',
              className: 'p-3 font-semibold hover:text-primary hover:bg-primary-contrast rounded-sm transition-all',
              textContent: 'Forms'
            }),
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
});
```

### Custom Component Pattern with TElementProps

```typescript
import { $section, $a, TElementProps } from '@vanilla-mint/dom';

// Example from apps/website/src/app/components/page-section.component.ts
export const $pageSection = ({className, ...props}: TElementProps<HTMLElement>) => $section({
    className: 'w-full grow flex flex-col justify-center items-center gap-16 h-[80vh] ' + (className || ''), 
    ...props
});

// Example from apps/website/src/app/components/nav-link.component.ts
export const $navLink = (props: TElementProps<HTMLAnchorElement>) =>
  $a({
    ...props,
    className: 'p-3 font-semibold hover:text-primary hover:bg-primary-contrast rounded-sm transition-all',
  });

// Usage example from apps/website/src/app/pages/forms.page.ts
const formsPageContent = $div({
    className: 'grow flex flex-col justify-center items-center gap-16',
    children: [
        $pageSection({
            children: [
                $h2({ textContent: 'Forms', className: 'text-6xl' }),
                $p({ className: 'text-lg', innerHTML: 'Out-of-the box Material Design with significant customization via CSS variables.' }),
            ]
        }),
        $pageSection({
            className: 'bg-neutral-100', 
            children: [
                // Form elements here
            ]
        })
    ],
});
```

### Dynamic Content and Mapping

```typescript
// Example from apps/website/src/app/app.ts - Dynamic library links
const libraries = ['dom', 'router', 'dom-router', 'core'];

const librariesSection = $div({
  children: [
    $h2({ textContent: 'Libraries' }),
    $div({
      className: 'flex flex-wrap flex-row gap-4 items-stretch justify-between',
      children: libraries.map((_) =>
        $a({
          href: `/libraries/${_}`,
          children: [
            $div({
              className: 'p-4 rounded-sm border border-primary',
              textContent: `@vanilla-mint/${_}`,
            }),
          ],
        })
      ),
    }),
    $div({ className: 'outlet' }),
  ],
});

// Example with numbered links
const versionLinks = [1, 2, 3].map((v) =>
  $a({
    className: 'p-2',
    href: `/libraries/some-library/${v}`,
    textContent: v.toString(),
  })
);
```

## API Documentation

### Element Factory Functions

```javascript
import { 
  $div, $span, $p, $h1, $h2, $h3,
  $button, $input, $select, $option,
  $form, $label, $img, $a
} from '@vanilla-mint/dom';
```

### Styling Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `styled(tag, styles)` | tag: string, styles: CSSProperties | Create styled element factory |
| `styleOn(element, event, styles)` | element: Element, event: string, styles: CSSProperties | Apply styles on event |
| `styleOnFocus(element, styles)` | element: Element, styles: CSSProperties | Apply focus styles |
| `styleOnPointerEnter(element, styles)` | element: Element, styles: CSSProperties | Apply hover styles |

### Utility Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `setElementStyle(element, property, value)` | element: Element, property: string, value: string | Set single style property |
| `setElementStyles(element, styles)` | element: Element, styles: CSSProperties | Set multiple styles |
| `setElementAttributes(element, attrs)` | element: Element, attrs: object | Set multiple attributes |

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - see LICENSE file for details.