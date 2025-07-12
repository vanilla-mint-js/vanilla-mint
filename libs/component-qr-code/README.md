# @vanilla-mint/component-qr-code

A reactive QR code generator web component that creates SVG QR codes from text input.

## Installation

```bash
npm install @vanilla-mint/component-qr-code
```

## Features

- 📱 **Dynamic QR Code Generation** - Generate QR codes from any text input
- 🎨 **SVG Output** - High-quality, scalable vector graphics
- ⚙️ **Customizable Size** - Adjustable cell size for different display needs
- 🔄 **Reactive Updates** - Automatically regenerates when text or size changes
- 📊 **High Error Correction** - Built-in error correction level 'H' for reliability
- 🚀 **Zero Dependencies** - Loads QR code library dynamically when needed
- 📱 **Mobile Friendly** - Perfect for mobile scanning applications

## Basic Usage

### Simple QR Code

```html
<qr-code text="Hello World!"></qr-code>
```

### Custom Size

```html
<qr-code text="https://example.com" cell-size="8"></qr-code>
```

### Programmatic Usage

```javascript
import { QrCode, define } from '@vanilla-mint/component-qr-code';

// Register the custom element
define(QrCode);

// Create and configure the component
const qrCode = document.createElement('qr-code');
qrCode.setAttribute('text', 'https://vanilla-mint.dev');
qrCode.setAttribute('cell-size', '6');

document.body.appendChild(qrCode);
```

### Dynamic Content

```javascript
// Update QR code content dynamically
const qrCode = document.querySelector('qr-code');
qrCode.setAttribute('text', 'New content here!');

// Change size
qrCode.setAttribute('cell-size', '10');
```

## API Documentation

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | - | The text content to encode in the QR code |
| `cell-size` | number | `4` | Size of each QR code cell in pixels |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `qrcode` | function | Reference to the loaded QR code library |

### Methods

The component extends the standard HTMLElement and includes all vanilla-mint lifecycle methods:

- `vmConnected()` - Called when component is added to DOM, loads QR library if needed
- `vmDisconnected()` - Called when component is removed from DOM
- `vmAdopted()` - Called when component is moved to new document

## Advanced Examples

### URL QR Codes

```html
<!-- Website URL -->
<qr-code text="https://vanilla-mint.dev" cell-size="6"></qr-code>

<!-- Email link -->
<qr-code text="mailto:contact@example.com?subject=Hello" cell-size="5"></qr-code>

<!-- Phone number -->
<qr-code text="tel:+1234567890" cell-size="7"></qr-code>
```

### WiFi QR Code

```javascript
// Generate WiFi connection QR code
function createWiFiQR(ssid, password, security = 'WPA') {
  const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;
  const qrCode = document.createElement('qr-code');
  qrCode.setAttribute('text', wifiString);
  qrCode.setAttribute('cell-size', '8');
  return qrCode;
}

const wifiQR = createWiFiQR('MyNetwork', 'MyPassword');
document.body.appendChild(wifiQR);
```

### Contact Information (vCard)

```javascript
// Generate contact information QR code
function createContactQR(contact) {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.organization}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.website}
END:VCARD`;

  const qrCode = document.createElement('qr-code');
  qrCode.setAttribute('text', vcard);
  qrCode.setAttribute('cell-size', '6');
  return qrCode;
}

const contactQR = createContactQR({
  name: 'John Doe',
  organization: 'Example Corp',
  phone: '+1234567890',
  email: 'john@example.com',
  website: 'https://johndoe.com'
});
```

### Custom Styling

```html
<style>
  .qr-container {
    display: inline-block;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    text-align: center;
  }
  
  .qr-container qr-code {
    display: block;
    margin: 0 auto 10px;
  }
  
  .qr-container .qr-label {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }
  
  /* Style the SVG output */
  .qr-container qr-code svg {
    border: 2px solid #eee;
    border-radius: 8px;
  }
</style>

<div class="qr-container">
  <qr-code text="https://vanilla-mint.dev" cell-size="8"></qr-code>
  <div class="qr-label">Scan to visit our website</div>
</div>
```

### QR Code Generator Form

```html
<div class="qr-generator">
  <h3>QR Code Generator</h3>
  <form id="qr-form">
    <div>
      <label for="qr-text">Text to encode:</label>
      <textarea id="qr-text" placeholder="Enter text, URL, or other content"></textarea>
    </div>
    <div>
      <label for="qr-size">Cell size:</label>
      <input type="range" id="qr-size" min="2" max="12" value="6">
      <span id="size-display">6</span>
    </div>
  </form>
  
  <div class="qr-output">
    <qr-code id="generated-qr" text="Sample text" cell-size="6"></qr-code>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('qr-text');
  const sizeInput = document.getElementById('qr-size');
  const sizeDisplay = document.getElementById('size-display');
  const qrCode = document.getElementById('generated-qr');
  
  function updateQR() {
    if (textInput.value.trim()) {
      qrCode.setAttribute('text', textInput.value);
    }
    qrCode.setAttribute('cell-size', sizeInput.value);
    sizeDisplay.textContent = sizeInput.value;
  }
  
  textInput.addEventListener('input', updateQR);
  sizeInput.addEventListener('input', updateQR);
});
</script>
```

### Bulk QR Code Generation

```javascript
// Generate multiple QR codes from a list
function generateBulkQRCodes(items, container) {
  items.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'qr-item';
    
    const qrCode = document.createElement('qr-code');
    qrCode.setAttribute('text', item.text);
    qrCode.setAttribute('cell-size', item.size || '6');
    
    const label = document.createElement('div');
    label.textContent = item.label || `Item ${index + 1}`;
    label.className = 'qr-label';
    
    wrapper.appendChild(qrCode);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
}

// Usage
const qrData = [
  { text: 'https://example.com', label: 'Website', size: 6 },
  { text: 'tel:+1234567890', label: 'Phone', size: 5 },
  { text: 'mailto:info@example.com', label: 'Email', size: 5 }
];

generateBulkQRCodes(qrData, document.getElementById('qr-grid'));
```

## Configuration

### Error Correction Level

The component uses error correction level 'H' (High) by default, which provides:
- ~30% error correction capability
- Best for scenarios where QR codes might be partially damaged or obscured
- Suitable for printing and mobile scanning

### External Library

The component automatically loads the QR code generation library from CDN:
```javascript
// Library loaded from: https://cdn.jsdelivr.net/npm/qrcode-generator/qrcode.min.js
```

To use a different version or local copy, load it before using the component:
```html
<script src="/path/to/qrcode.min.js"></script>
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

Requires support for:
- ES6 Modules
- Web Components
- SVG rendering

## Common Use Cases

- Website URLs and landing pages
- Contact information sharing
- WiFi network credentials
- Product information and links
- Event tickets and check-ins
- Payment and donation links
- Social media profiles
- App download links

## License

MIT License - see LICENSE file for details.