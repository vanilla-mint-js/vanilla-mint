# @vanilla-mint/component-sig-pad

A touch-friendly signature pad web component for capturing digital signatures with canvas-based drawing.

## Installation

```bash
npm install @vanilla-mint/component-sig-pad
```

## Features

- ✍️ **Digital Signature Capture** - Smooth drawing experience for signatures
- 📱 **Touch and Mouse Support** - Works with both touch devices and mouse input
- 📏 **Customizable Dimensions** - Set custom width and height
- 🎨 **Canvas-Based Drawing** - High-quality vector drawing with HTML5 Canvas
- 📱 **Mobile Optimized** - Responsive design for mobile and tablet devices
- 💾 **Data Export** - Extract signature as image data or canvas content
- 🎯 **Pointer Events** - Modern pointer event handling for all input types

## Basic Usage

### Simple Signature Pad

```html
<sig-pad width="400" height="200"></sig-pad>
```

### Full-Width Signature Pad

```html
<sig-pad width="100%" height="150"></sig-pad>
```

### Programmatic Usage

```javascript
import { SigPad, define } from '@vanilla-mint/component-sig-pad';

// Register the custom element
define(SigPad);

// Create and configure the component
const sigPad = document.createElement('sig-pad');
sigPad.setAttribute('width', '500');
sigPad.setAttribute('height', '250');

document.body.appendChild(sigPad);
```

### Capture Signature Data

```javascript
// Get the canvas element from the signature pad
const sigPad = document.querySelector('sig-pad');
const canvas = sigPad.querySelector('canvas');

// Export as image data URL
const signatureDataURL = canvas.toDataURL('image/png');
console.log('Signature:', signatureDataURL);

// Export as blob for file upload
canvas.toBlob((blob) => {
  const formData = new FormData();
  formData.append('signature', blob, 'signature.png');
  
  // Upload to server
  fetch('/api/signatures', {
    method: 'POST',
    body: formData
  });
});
```

## API Documentation

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | number \| string | `window.innerWidth` | Width of the signature pad in pixels |
| `height` | number \| string | `window.innerHeight` | Height of the signature pad in pixels |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `canvas` | HTMLCanvasElement | The canvas element used for drawing |
| `context` | CanvasRenderingContext2D | The 2D rendering context |

### Methods

The component extends the standard HTMLElement and includes all vanilla-mint lifecycle methods:

- `vmConnected()` - Called when component is added to DOM, sets up canvas and event handlers
- `vmDisconnected()` - Called when component is removed from DOM
- `vmAdopted()` - Called when component is moved to new document

### Canvas Methods

Access standard canvas methods through the canvas element:

```javascript
const sigPad = document.querySelector('sig-pad');
const canvas = sigPad.querySelector('canvas');

// Clear the signature
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Export signature
const imageData = canvas.toDataURL();
```

## Advanced Examples

### Signature Form Integration

```html
<div class="signature-form">
  <h3>Please sign below:</h3>
  
  <div class="signature-container">
    <sig-pad id="signature" width="600" height="200"></sig-pad>
  </div>
  
  <div class="signature-controls">
    <button type="button" onclick="clearSignature()">Clear</button>
    <button type="button" onclick="saveSignature()">Save</button>
  </div>
  
  <div id="signature-preview" style="display: none;">
    <h4>Signature Preview:</h4>
    <img id="signature-image" alt="Signature preview" />
  </div>
</div>

<script>
function clearSignature() {
  const sigPad = document.getElementById('signature');
  const canvas = sigPad.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Hide preview
  document.getElementById('signature-preview').style.display = 'none';
}

function saveSignature() {
  const sigPad = document.getElementById('signature');
  const canvas = sigPad.querySelector('canvas');
  const dataURL = canvas.toDataURL('image/png');
  
  // Show preview
  const preview = document.getElementById('signature-preview');
  const img = document.getElementById('signature-image');
  img.src = dataURL;
  preview.style.display = 'block';
  
  // Save to localStorage or send to server
  localStorage.setItem('signature', dataURL);
  console.log('Signature saved:', dataURL);
}
</script>
```

### Responsive Signature Pad

```html
<style>
  .responsive-signature {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .responsive-signature sig-pad {
    width: 100%;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #fafafa;
  }
  
  @media (max-width: 768px) {
    .responsive-signature sig-pad {
      height: 150px;
    }
  }
  
  @media (min-width: 769px) {
    .responsive-signature sig-pad {
      height: 200px;
    }
  }
</style>

<div class="responsive-signature">
  <sig-pad id="responsive-sig"></sig-pad>
</div>

<script>
// Dynamically set dimensions based on container
function setupResponsiveSignature() {
  const container = document.querySelector('.responsive-signature');
  const sigPad = document.getElementById('responsive-sig');
  
  const resizeObserver = new ResizeObserver(() => {
    const width = container.offsetWidth - 4; // Account for border
    const height = window.innerWidth <= 768 ? 150 : 200;
    
    sigPad.setAttribute('width', width.toString());
    sigPad.setAttribute('height', height.toString());
  });
  
  resizeObserver.observe(container);
}

setupResponsiveSignature();
</script>
```

### Multi-Signature Document

```html
<div class="document-signatures">
  <h3>Document Approval</h3>
  
  <div class="signature-section">
    <label>Customer Signature:</label>
    <sig-pad id="customer-sig" width="400" height="150"></sig-pad>
    <button onclick="clearSig('customer-sig')">Clear</button>
  </div>
  
  <div class="signature-section">
    <label>Witness Signature:</label>
    <sig-pad id="witness-sig" width="400" height="150"></sig-pad>
    <button onclick="clearSig('witness-sig')">Clear</button>
  </div>
  
  <div class="signature-section">
    <label>Agent Signature:</label>
    <sig-pad id="agent-sig" width="400" height="150"></sig-pad>
    <button onclick="clearSig('agent-sig')">Clear</button>
  </div>
  
  <button onclick="submitDocument()">Submit Document</button>
</div>

<script>
function clearSig(sigId) {
  const sigPad = document.getElementById(sigId);
  const canvas = sigPad.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function submitDocument() {
  const signatures = ['customer-sig', 'witness-sig', 'agent-sig'];
  const documentData = {
    timestamp: new Date().toISOString(),
    signatures: {}
  };
  
  signatures.forEach(sigId => {
    const sigPad = document.getElementById(sigId);
    const canvas = sigPad.querySelector('canvas');
    documentData.signatures[sigId] = canvas.toDataURL('image/png');
  });
  
  // Send to server
  fetch('/api/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(documentData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Document submitted:', data);
    alert('Document submitted successfully!');
  });
}
</script>
```

### Signature with Validation

```html
<div class="validated-signature">
  <sig-pad id="validated-sig" width="500" height="200"></sig-pad>
  
  <div class="validation-controls">
    <button onclick="validateSignature()">Validate Signature</button>
    <div id="validation-result"></div>
  </div>
</div>

<script>
function validateSignature() {
  const sigPad = document.getElementById('validated-sig');
  const canvas = sigPad.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  
  // Get image data to check if anything was drawn
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  // Check if any pixels are not transparent
  let hasContent = false;
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] > 0) { // Alpha channel
      hasContent = true;
      break;
    }
  }
  
  const resultDiv = document.getElementById('validation-result');
  
  if (hasContent) {
    resultDiv.innerHTML = '<span style="color: green;">✓ Valid signature detected</span>';
    
    // Additional validation could include:
    // - Minimum stroke length
    // - Signature complexity
    // - Comparison with reference signature
    
  } else {
    resultDiv.innerHTML = '<span style="color: red;">✗ Please provide a signature</span>';
  }
}
</script>
```

### Custom Styling

```html
<style>
  .custom-sig-pad {
    border: 3px solid #007bff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,123,255,0.2);
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    padding: 8px;
  }
  
  .custom-sig-pad canvas {
    border-radius: 8px;
    background: white;
    cursor: crosshair;
  }
  
  .signature-instructions {
    text-align: center;
    font-style: italic;
    color: #666;
    margin-bottom: 10px;
  }
  
  .signature-actions {
    text-align: center;
    margin-top: 10px;
  }
  
  .signature-actions button {
    margin: 0 5px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .clear-btn {
    background: #dc3545;
    color: white;
  }
  
  .save-btn {
    background: #28a745;
    color: white;
  }
</style>

<div class="custom-sig-pad">
  <div class="signature-instructions">
    Please sign using your finger or stylus
  </div>
  <sig-pad width="600" height="250"></sig-pad>
  <div class="signature-actions">
    <button class="clear-btn" onclick="clearCustomSig()">Clear</button>
    <button class="save-btn" onclick="saveCustomSig()">Save</button>
  </div>
</div>
```

## Performance Considerations

- Canvas rendering is optimized for smooth drawing
- Pointer events provide better performance than mouse events
- Consider debouncing for high-frequency drawing operations
- For large signature pads, monitor memory usage

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

Requires support for:
- HTML5 Canvas
- Pointer Events
- Web Components
- ES6 Modules

## Accessibility

- The component supports keyboard navigation
- Screen readers can access the canvas content through ARIA labels
- Consider providing alternative input methods for users with disabilities

## License

MIT License - see LICENSE file for details.