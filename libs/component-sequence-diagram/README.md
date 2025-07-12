# @vanilla-mint/component-sequence-diagram

A declarative sequence diagram component for visualizing system interactions and workflows with automatic layout and beautiful styling.

## Installation

```bash
npm install @vanilla-mint/component-sequence-diagram
```

## Features

- 📊 **Visual System Interactions** - Create beautiful sequence diagrams from JSON data
- 🎨 **Automatic Color Coding** - Systems get distinct colors from a predefined palette
- 📱 **Responsive Grid Layout** - Automatically adapts to different screen sizes
- 🔄 **Reactive Updates** - Real-time updates when steps or systems change
- 📋 **Rich Step Properties** - Support for various interaction types and metadata
- 🎯 **Declarative Syntax** - Simple JSON-based configuration
- 🚀 **Performance Optimized** - Efficient rendering with minimal DOM updates

## Basic Usage

### Real E-commerce Order Flow Example

```typescript
import { $div, $h2 } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $sequence } from "@vanilla-mint/component-sequence-diagram";

// Example from apps/website/src/app/pages/sequence.page.ts
const customer = 'customer';
const amazon = 'amazon';
const driver = 'driver';

export const sequencePage: Route<any, {}>['render'] = () =>
    $div({
        className: 'flex flex-col grow items-stretch justify-stretch border border-solid',
        children: [
            $h2({ 
                className: 'text-lg text-center font-bold', 
                textContent: 'Sequence Diagram' 
            }),
            $div({
                className: 'flex flex-col grow items-stretch justify-stretch border border-solid',
                children: [
                    $sequence({
                        style: {
                            maxHeight: 'calc(100vh - 9.8rem)'
                        },
                        systems: [
                            customer,
                            amazon,
                            driver,
                        ],
                        steps: [
                            { internally: customer, will: 'decide to place an order' },
                            { from: customer, to: amazon, with: 'order', withJson: { things: 'and stuff' } },
                            { internally: amazon, will: 'process the order' },
                            { from: amazon, to: driver, with: 'package' },
                            { from: driver, to: customer, with: 'package' },
                        ],
                    })
                ]
            })
        ],
    });
```

### Features Demonstrated

- **Functional Component Integration**: Works seamlessly with @vanilla-mint/dom
- **Internal Actions**: Use `internally` property for system-internal processes
- **Data Payload**: Include JSON data with `withJson` property
- **Flexible Styling**: Custom CSS styling with maxHeight constraints
- **Route Integration**: Perfect integration with @vanilla-mint/router
- **Modern Layout**: Uses CSS Flexbox for responsive layout

## API Documentation

### Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `systems` | string (JSON array) | Yes | Array of system names participating in the sequence |
| `steps` | string (JSON array) | Yes | Array of step objects defining the interactions |

### Step Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `from` | string | Source system for the interaction |
| `to` | string | Target system for the interaction |
| `the` | string | Description of the action or message |
| `with` | string \| string[] | Additional context or parameters |
| `because` | string | Reason or condition for the action |
| `will` | string | Expected outcome or consequence |
| `internally` | string | Internal processing description |
| `withJson` | object | JSON payload or data structure |
| `if` | string | Conditional logic or branching |
| `viaUrl` | string | URL or endpoint information |

### CSS Custom Properties

The component uses CSS custom properties for theming:

```css
sequence-diagram {
  --sequence-gap: 0.4rem;
  --sequence-padding: 0.25rem;
  --sequence-frost: rgba(255, 255, 255, 0.8);
}
```

## Advanced Examples

### Complex Workflow

```javascript
const ecommerceFlow = {
  systems: ['Customer', 'Frontend', 'API Gateway', 'Order Service', 'Payment Service', 'Inventory'],
  steps: [
    {
      from: 'Customer',
      to: 'Frontend',
      the: 'Add item to cart',
      with: 'Product ID: 12345'
    },
    {
      from: 'Frontend',
      to: 'API Gateway',
      the: 'Create order request',
      viaUrl: '/api/orders',
      withJson: { productId: 12345, quantity: 2 }
    },
    {
      from: 'API Gateway',
      to: 'Order Service',
      the: 'Process order',
      because: 'Valid request received'
    },
    {
      from: 'Order Service',
      to: 'Inventory',
      the: 'Check availability',
      with: 'Product ID: 12345'
    },
    {
      from: 'Inventory',
      to: 'Order Service',
      the: 'Confirm stock',
      will: 'Reserve items'
    },
    {
      from: 'Order Service',
      to: 'Payment Service',
      the: 'Process payment',
      withJson: { amount: 99.99, currency: 'USD' }
    },
    {
      from: 'Payment Service',
      to: 'Order Service',
      the: 'Payment confirmed',
      if: 'Transaction successful'
    },
    {
      from: 'Order Service',
      to: 'API Gateway',
      the: 'Order completed',
      will: 'Send confirmation'
    },
    {
      from: 'API Gateway',
      to: 'Frontend',
      the: 'Success response'
    },
    {
      from: 'Frontend',
      to: 'Customer',
      the: 'Order confirmation',
      with: 'Order #ORD-001'
    }
  ]
};

document.querySelector('sequence-diagram').setAttribute('systems', JSON.stringify(ecommerceFlow.systems));
document.querySelector('sequence-diagram').setAttribute('steps', JSON.stringify(ecommerceFlow.steps));
```

### Authentication Flow

```html
<sequence-diagram id="auth-flow"></sequence-diagram>

<script>
const authFlow = {
  systems: ['User', 'App', 'Auth Server', 'Resource Server'],
  steps: [
    {
      from: 'User',
      to: 'App',
      the: 'Initiate login',
      because: 'Needs access to protected resource'
    },
    {
      from: 'App',
      to: 'Auth Server',
      the: 'Redirect for authorization',
      viaUrl: '/oauth/authorize'
    },
    {
      from: 'Auth Server',
      to: 'User',
      the: 'Present login form',
      if: 'User not authenticated'
    },
    {
      from: 'User',
      to: 'Auth Server',
      the: 'Submit credentials',
      with: ['username', 'password']
    },
    {
      from: 'Auth Server',
      to: 'App',
      the: 'Authorization code',
      because: 'Credentials valid',
      viaUrl: '/callback'
    },
    {
      from: 'App',
      to: 'Auth Server',
      the: 'Exchange code for token',
      withJson: { grant_type: 'authorization_code' }
    },
    {
      from: 'Auth Server',
      to: 'App',
      the: 'Access token',
      will: 'Enable API access'
    },
    {
      from: 'App',
      to: 'Resource Server',
      the: 'API request',
      with: 'Bearer token'
    },
    {
      from: 'Resource Server',
      to: 'App',
      the: 'Protected data',
      if: 'Token valid'
    },
    {
      from: 'App',
      to: 'User',
      the: 'Display dashboard',
      because: 'Authentication successful'
    }
  ]
};

const diagram = document.getElementById('auth-flow');
diagram.setAttribute('systems', JSON.stringify(authFlow.systems));
diagram.setAttribute('steps', JSON.stringify(authFlow.steps));
</script>
```

### Error Handling Flow

```javascript
const errorFlow = {
  systems: ['Client', 'Load Balancer', 'Service A', 'Service B', 'Database'],
  steps: [
    {
      from: 'Client',
      to: 'Load Balancer',
      the: 'HTTP Request',
      viaUrl: '/api/data'
    },
    {
      from: 'Load Balancer',
      to: 'Service A',
      the: 'Route request',
      because: 'Service A selected'
    },
    {
      from: 'Service A',
      to: 'Service B',
      the: 'Downstream call',
      internally: 'Process business logic'
    },
    {
      from: 'Service B',
      to: 'Database',
      the: 'Query data',
      with: 'SELECT * FROM users'
    },
    {
      from: 'Database',
      to: 'Service B',
      the: 'Connection timeout',
      because: 'Database overloaded'
    },
    {
      from: 'Service B',
      to: 'Service A',
      the: '500 Internal Error',
      will: 'Trigger retry logic'
    },
    {
      from: 'Service A',
      to: 'Load Balancer',
      the: '503 Service Unavailable',
      if: 'Max retries exceeded'
    },
    {
      from: 'Load Balancer',
      to: 'Client',
      the: 'Error response',
      withJson: { error: 'Service temporarily unavailable' }
    }
  ]
};
```

### Dynamic Diagram Builder

```html
<div class="diagram-builder">
  <h3>Sequence Diagram Builder</h3>
  
  <div class="controls">
    <div>
      <label>Systems (comma-separated):</label>
      <input type="text" id="systems-input" value="Client,Server,Database" />
    </div>
    
    <div>
      <label>Add Step:</label>
      <select id="from-select"></select>
      <span>→</span>
      <select id="to-select"></select>
      <input type="text" id="action-input" placeholder="Action description" />
      <button onclick="addStep()">Add Step</button>
    </div>
    
    <div>
      <button onclick="clearSteps()">Clear All</button>
      <button onclick="exportDiagram()">Export JSON</button>
    </div>
  </div>
  
  <sequence-diagram id="builder-diagram"></sequence-diagram>
</div>

<script>
let currentSteps = [];
let currentSystems = ['Client', 'Server', 'Database'];

function updateSystemSelects() {
  const fromSelect = document.getElementById('from-select');
  const toSelect = document.getElementById('to-select');
  
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';
  
  currentSystems.forEach(system => {
    fromSelect.appendChild(new Option(system, system));
    toSelect.appendChild(new Option(system, system));
  });
}

function updateDiagram() {
  const diagram = document.getElementById('builder-diagram');
  diagram.setAttribute('systems', JSON.stringify(currentSystems));
  diagram.setAttribute('steps', JSON.stringify(currentSteps));
}

function addStep() {
  const from = document.getElementById('from-select').value;
  const to = document.getElementById('to-select').value;
  const action = document.getElementById('action-input').value;
  
  if (action.trim()) {
    currentSteps.push({ from, to, the: action });
    document.getElementById('action-input').value = '';
    updateDiagram();
  }
}

function clearSteps() {
  currentSteps = [];
  updateDiagram();
}

function exportDiagram() {
  const data = {
    systems: currentSystems,
    steps: currentSteps
  };
  console.log('Diagram JSON:', JSON.stringify(data, null, 2));
}

// Handle systems input
document.getElementById('systems-input').addEventListener('change', (e) => {
  currentSystems = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
  updateSystemSelects();
  updateDiagram();
});

// Initialize
updateSystemSelects();
updateDiagram();
</script>
```

## Styling and Customization

### Custom Color Scheme

```css
sequence-diagram {
  /* Override default colors */
  --color-1: #ff6b6b;
  --color-2: #4ecdc4;
  --color-3: #45b7d1;
  --color-4: #96ceb4;
  --color-5: #ffeaa7;
}
```

### Layout Customization

```css
.custom-sequence {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.custom-sequence sequence-diagram {
  --sequence-gap: 1rem;
  --sequence-padding: 0.5rem;
}
```

## Performance Considerations

- Use `JSON.stringify()` when setting attributes programmatically
- For large diagrams (>50 steps), consider pagination or virtualization
- The component efficiently updates only when attributes change
- Colors are automatically assigned from a predefined palette

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

Requires support for:
- ES6 Modules
- Web Components
- CSS Grid
- JSON parsing

## License

MIT License - see LICENSE file for details.