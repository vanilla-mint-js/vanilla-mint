# @vanilla-mint/custom

The core framework for building reactive web components with vanilla JavaScript and RxJS observables.

## Installation

```bash
npm install @vanilla-mint/custom
```

## Features

- 🔄 **Reactive Components** - Built on RxJS observables for reactive state management
- 🎯 **Custom Elements** - Standards-based web components with enhanced capabilities
- 📝 **Declarative API** - Simple, declarative syntax for building components
- 🔧 **Utility Functions** - Comprehensive set of DOM manipulation utilities
- 🎨 **Styling System** - Dynamic styling with CSS-in-JS capabilities
- 📊 **Lifecycle Management** - Complete component lifecycle with automatic cleanup
- 🚀 **Performance Optimized** - Efficient rendering and memory management

## Basic Usage

### Creating a Custom Component

```javascript
import { VanillaMint, define } from '@vanilla-mint/custom';

class MyComponent extends VanillaMint {
  static observedAttributes = ['message', 'count'];
  static tagName = 'my-component';

  constructor() {
    super(MyComponent.observedAttributes);
  }

  async vmConnected() {
    // Component initialization
    this.vmAppendChild({
      tag: 'div',
      attrs: { textContent: 'Hello from VanillaMint!' },
      styles: { padding: '1rem', background: '#f0f0f0' }
    });

    // Reactive attribute observation
    this.vmSubscribe(
      this.vmObserveAttr('message').pipe(
        tap(message => this.updateMessage(message))
      )
    );
  }

  updateMessage(message) {
    // Update component based on attribute changes
  }

  vmDisconnected() {
    // Cleanup when component is removed
  }

  vmAdopted() {
    // Handle component adoption to new document
  }
}

// Register the component
define(MyComponent);
```

### Using the Component

```html
<my-component message="Hello World" count="5"></my-component>
```

## API Documentation

### VanillaMint Base Class

The core class for creating reactive web components.

#### Constructor

```javascript
constructor(observedAttributes: string[])
```

#### Lifecycle Methods

| Method | Description |
|--------|-------------|
| `vmConnected()` | Called when component is added to DOM |
| `vmDisconnected()` | Called when component is removed from DOM |
| `vmAdopted()` | Called when component is moved to new document |

#### Reactive Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `vmObserveAttr(attr)` | attr: string | Returns observable for attribute changes |
| `vmObserveAttrs(attrs)` | attrs: string[] | Returns observable for multiple attributes |
| `vmObserveEvent(event)` | event: string | Returns observable for DOM events |
| `vmSubscribe(observable)` | observable: Observable | Subscribe with automatic cleanup |

#### DOM Manipulation

| Method | Parameters | Description |
|--------|------------|-------------|
| `vmAppendChild(config)` | config: ElementConfig | Create and append child element |
| `vmPrependChild(config)` | config: ElementConfig | Create and prepend child element |
| `vmSetAttrs(attrs)` | attrs: object | Set multiple attributes |
| `vmSetStyles(styles)` | styles: object | Set multiple styles |

#### Utility Functions

```javascript
import { 
  createElement, 
  appendChild, 
  setAttrs, 
  setStyles,
  classListAdd,
  classListRemove,
  insertCss,
  mint,
  define
} from '@vanilla-mint/custom';
```

## Advanced Examples

### Counter Component

```javascript
import { VanillaMint, define } from '@vanilla-mint/custom';
import { tap, map } from 'rxjs';

class CounterComponent extends VanillaMint {
  static observedAttributes = ['value'];
  static tagName = 'counter-component';

  constructor() {
    super(CounterComponent.observedAttributes);
  }

  async vmConnected() {
    this.vmSetStyles({
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px'
    });

    // Display current count
    const display = this.vmAppendChild({
      tag: 'span',
      attrs: { textContent: '0' },
      styles: { 
        fontSize: '1.5rem',
        fontWeight: 'bold',
        minWidth: '3rem',
        textAlign: 'center'
      }
    });

    // Decrement button
    this.vmAppendChild({
      tag: 'button',
      attrs: { 
        textContent: '-',
        onclick: () => this.updateCount(-1)
      },
      styles: {
        padding: '0.5rem 1rem',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '4px',
        background: '#dc3545',
        color: 'white',
        cursor: 'pointer'
      }
    });

    // Increment button
    this.vmAppendChild({
      tag: 'button',
      attrs: { 
        textContent: '+',
        onclick: () => this.updateCount(1)
      },
      styles: {
        padding: '0.5rem 1rem',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '4px',
        background: '#28a745',
        color: 'white',
        cursor: 'pointer'
      }
    });

    // React to value changes
    this.vmSubscribe(
      this.vmObserveAttr('value').pipe(
        map(value => parseInt(value) || 0),
        tap(count => {
          display.textContent = count.toString();
          this.vmDispatch('countchange', { count });
        })
      )
    );
  }

  updateCount(delta) {
    const currentValue = parseInt(this.vmAttr('value')) || 0;
    const newValue = currentValue + delta;
    this.vmSetAttr('value', newValue.toString());
  }

  vmDisconnected() {}
  vmAdopted() {}
}

define(CounterComponent);
```

### Data List Component

```javascript
import { VanillaMint, define } from '@vanilla-mint/custom';
import { tap, map } from 'rxjs';

class DataListComponent extends VanillaMint {
  static observedAttributes = ['items', 'template'];
  static tagName = 'data-list';

  constructor() {
    super(DataListComponent.observedAttributes);
  }

  async vmConnected() {
    this.vmSetStyles({
      display: 'block',
      width: '100%'
    });

    this.vmSubscribe(
      this.vmObserveAttrs(['items', 'template']).pipe(
        tap(([items, template]) => this.renderList(items, template))
      )
    );
  }

  renderList(itemsJson, template) {
    // Clear existing content
    this.innerHTML = '';

    try {
      const items = JSON.parse(itemsJson || '[]');
      const templateName = template || 'default';

      items.forEach((item, index) => {
        const listItem = this.vmAppendChild({
          tag: 'div',
          styles: {
            padding: '0.75rem',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        });

        this.renderItem(listItem, item, index, templateName);
      });
    } catch (error) {
      this.vmAppendChild({
        tag: 'div',
        attrs: { textContent: 'Error parsing items data' },
        styles: { color: 'red', padding: '1rem' }
      });
    }
  }

  renderItem(container, item, index, template) {
    switch (template) {
      case 'user':
        this.renderUserTemplate(container, item);
        break;
      case 'product':
        this.renderProductTemplate(container, item);
        break;
      default:
        this.renderDefaultTemplate(container, item, index);
    }
  }

  renderDefaultTemplate(container, item, index) {
    container.appendChild(createElement({
      tag: 'span',
      attrs: { textContent: `${index + 1}. ${JSON.stringify(item)}` }
    }));
  }

  renderUserTemplate(container, user) {
    container.appendChild(createElement({
      tag: 'div',
      children: [
        { tag: 'strong', attrs: { textContent: user.name } },
        { tag: 'div', attrs: { textContent: user.email }, styles: { fontSize: '0.9rem', color: '#666' } }
      ]
    }));
  }

  renderProductTemplate(container, product) {
    container.appendChild(createElement({
      tag: 'div',
      styles: { display: 'flex', justifyContent: 'space-between', width: '100%' },
      children: [
        { tag: 'span', attrs: { textContent: product.name } },
        { tag: 'span', attrs: { textContent: `$${product.price}` }, styles: { fontWeight: 'bold' } }
      ]
    }));
  }

  vmDisconnected() {}
  vmAdopted() {}
}

define(DataListComponent);
```

### Form Component with Validation

```javascript
import { VanillaMint, define } from '@vanilla-mint/custom';
import { combineLatest, tap, debounceTime } from 'rxjs';

class FormComponent extends VanillaMint {
  static observedAttributes = ['validation-rules'];
  static tagName = 'form-component';

  constructor() {
    super(FormComponent.observedAttributes);
    this.formData = {};
    this.validationErrors = {};
  }

  async vmConnected() {
    this.vmSetStyles({
      display: 'block',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px'
    });

    // Create form fields
    this.createField('name', 'text', 'Full Name');
    this.createField('email', 'email', 'Email Address');
    this.createField('phone', 'tel', 'Phone Number');

    // Submit button
    this.submitButton = this.vmAppendChild({
      tag: 'button',
      attrs: { 
        textContent: 'Submit',
        type: 'button',
        onclick: () => this.handleSubmit()
      },
      styles: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '1rem'
      }
    });

    // Validation status
    this.statusDiv = this.vmAppendChild({
      tag: 'div',
      styles: { marginTop: '1rem', fontSize: '0.9rem' }
    });

    this.updateValidationStatus();
  }

  createField(name, type, label) {
    const fieldContainer = this.vmAppendChild({
      tag: 'div',
      styles: { marginBottom: '1rem' }
    });

    fieldContainer.appendChild(createElement({
      tag: 'label',
      attrs: { textContent: label, for: name },
      styles: { 
        display: 'block', 
        marginBottom: '0.5rem',
        fontWeight: 'bold'
      }
    }));

    const input = fieldContainer.appendChild(createElement({
      tag: 'input',
      attrs: { 
        type, 
        name, 
        id: name,
        placeholder: label
      },
      styles: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
      }
    }));

    const errorDiv = fieldContainer.appendChild(createElement({
      tag: 'div',
      styles: { 
        color: 'red', 
        fontSize: '0.8rem',
        marginTop: '0.25rem',
        minHeight: '1rem'
      }
    }));

    // Real-time validation
    this.vmSubscribe(
      this.vmObserveEvent('input', input).pipe(
        debounceTime(300),
        tap(() => {
          this.formData[name] = input.value;
          this.validateField(name, input.value, errorDiv);
          this.updateValidationStatus();
        })
      )
    );
  }

  validateField(name, value, errorDiv) {
    let isValid = true;
    let errorMessage = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          isValid = false;
          errorMessage = 'Name is required';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!value.trim()) {
          isValid = false;
          errorMessage = 'Email is required';
        } else if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        const phoneRegex = /^[\\d\\s\\-\\(\\)\\+]+$/;
        if (value && !phoneRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number';
        }
        break;
    }

    errorDiv.textContent = errorMessage;
    this.validationErrors[name] = !isValid;
  }

  updateValidationStatus() {
    const hasErrors = Object.values(this.validationErrors).some(error => error);
    const allFieldsFilled = Object.keys(this.formData).length >= 2; // name and email required

    if (hasErrors) {
      this.statusDiv.textContent = 'Please fix validation errors';
      this.statusDiv.style.color = 'red';
      this.submitButton.disabled = true;
      this.submitButton.style.opacity = '0.5';
    } else if (allFieldsFilled) {
      this.statusDiv.textContent = 'Form is valid';
      this.statusDiv.style.color = 'green';
      this.submitButton.disabled = false;
      this.submitButton.style.opacity = '1';
    } else {
      this.statusDiv.textContent = 'Please fill in required fields';
      this.statusDiv.style.color = '#666';
      this.submitButton.disabled = true;
      this.submitButton.style.opacity = '0.5';
    }
  }

  handleSubmit() {
    const hasErrors = Object.values(this.validationErrors).some(error => error);
    
    if (!hasErrors) {
      this.vmDispatch('formsubmit', { data: this.formData });
      console.log('Form submitted:', this.formData);
      
      // Reset form
      this.querySelectorAll('input').forEach(input => input.value = '');
      this.formData = {};
      this.validationErrors = {};
      this.updateValidationStatus();
    }
  }

  vmDisconnected() {}
  vmAdopted() {}
}

define(FormComponent);
```

## Utility Functions

### DOM Manipulation

```javascript
import { 
  createElement, 
  appendChild, 
  prependChild,
  setAttrs, 
  setStyles,
  classListAdd,
  classListRemove 
} from '@vanilla-mint/custom';

// Create elements with configuration
const button = createElement({
  tag: 'button',
  attrs: { textContent: 'Click me', onclick: handleClick },
  styles: { padding: '1rem', background: '#007bff', color: 'white' }
});

// Manipulate DOM
appendChild(document.body, button);
setAttrs(button, { disabled: true });
setStyles(button, { opacity: '0.5' });
```

### Styling Utilities

```javascript
import { insertCss, setCssVar, setCssVars } from '@vanilla-mint/custom';

// Insert global CSS
insertCss(`
  .my-component {
    display: flex;
    gap: 1rem;
  }
`);

// Set CSS custom properties
setCssVar(document.documentElement, '--primary-color', '#007bff');
setCssVars(document.documentElement, {
  '--primary-color': '#007bff',
  '--secondary-color': '#6c757d'
});
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

Requires support for:
- Custom Elements v1
- ES6 Modules
- RxJS 7+

## License

MIT License - see LICENSE file for details.