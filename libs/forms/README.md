# @vanilla-mint/forms

Type-safe, reactive form components with built-in validation and flexible layouts.

## Installation

```bash
npm install @vanilla-mint/forms
```

## Features

- 📝 **Type-Safe Forms** - Strongly typed form fields and data structures
- ✅ **Built-in Validation** - Comprehensive validation with custom error messages
- 🎨 **Flexible Layouts** - Grid-based layout system for responsive forms
- 🔄 **Reactive Updates** - Real-time validation and state management
- 🎯 **Component Library** - Pre-built form components (input, select, form)
- 📱 **Mobile Optimized** - Touch-friendly controls and responsive design

## Basic Usage

### Real Form with Signal Integration

```typescript
import { $div, $h2, $p } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $vmInput } from "@vanilla-mint/forms";
import { signal } from "@preact/signals-core";
import { $pageSection } from "../components/page-section.component";

// Example from apps/website/src/app/pages/forms.page.ts
const thing = signal('things');

export const formsPage: Route['render'] = () => {
    return $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $pageSection({
                children: [
                    $h2({ textContent: 'Forms', className: 'text-6xl' }),
                    $p({ 
                        className: 'text-lg', 
                        innerHTML: 'Out-of-the box Material Design with significant customization via CSS variables.' 
                    }),
                ]
            }),
            $pageSection({
                className: 'bg-neutral-100', 
                children: [
                    $vmInput({
                        placeholder: 'something',
                        value: thing as any,
                        onkeyup: (_: any) => {
                            thing.value = (_.target as any).value;
                        }
                    } as any),
                    $p({ textContent: thing as any }),
                ]
            })
        ],
    });
}
```

### Features Demonstrated

- **Signal Integration**: Real-time reactive updates with @preact/signals-core
- **Material Design Styling**: Built-in styling with CSS variable customization
- **Event Handling**: Direct DOM event handling with onkeyup
- **Component Composition**: Integration with custom $pageSection components
- **Type Safety**: TypeScript integration with proper typing

## API Documentation

### Form Configuration

```typescript
interface FormConfig<T> {
  config: TFormFields<T>;
  layout: TFormLayout<T>;
  value?: T;
  onSubmit: (value: T) => void;
  onChange?: (value: T) => void;
}
```

### Field Types

| Type | Description | Additional Properties |
|------|-------------|----------------------|
| `text` | Text input | `placeholder`, `minLength`, `maxLength` |
| `email` | Email input | `placeholder` |
| `number` | Number input | `min`, `max`, `step` |
| `select` | Dropdown select | `options: FieldOption[]` |
| `checkbox` | Checkbox input | - |
| `textarea` | Multi-line text | `placeholder`, `rows` |

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - see LICENSE file for details.