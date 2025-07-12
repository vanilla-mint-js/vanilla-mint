# @vanilla-mint/component-pdf-viewer

A powerful, reactive PDF viewer web component with navigation controls and automatic scaling.

## Installation

```bash
npm install @vanilla-mint/component-pdf-viewer
```

## Features

- 📄 **PDF Document Rendering** - Displays PDF files directly in the browser using PDF.js
- 🖱️ **Navigation Controls** - Built-in Previous/Next buttons for multi-page documents
- 📏 **Automatic Scaling** - Responsive scaling based on container width
- 🔄 **Reactive Updates** - Real-time updates when URL or page attributes change
- 📱 **Responsive Design** - Adapts to different screen sizes and orientations
- ⚡ **Efficient Loading** - Lazy loading and optimized rendering performance
- 🌐 **External PDF Support** - Load PDFs from any URL or local file

## Basic Usage

### Simple PDF Display

```html
<pdf-viewer url="https://example.com/document.pdf"></pdf-viewer>
```

### With Specific Page

```html
<pdf-viewer url="/assets/manual.pdf" page="5"></pdf-viewer>
```

### Programmatic Usage

```javascript
import { PdfViewer, define } from '@vanilla-mint/component-pdf-viewer';

// Register the custom element
define(PdfViewer);

// Create and configure the component
const pdfViewer = document.createElement('pdf-viewer');
pdfViewer.setAttribute('url', '/documents/report.pdf');
pdfViewer.setAttribute('page', '1');

document.body.appendChild(pdfViewer);
```

### Dynamic PDF Loading

```javascript
// Change PDF document dynamically
const viewer = document.querySelector('pdf-viewer');
viewer.setAttribute('url', '/new-document.pdf');

// Navigate to specific page
viewer.setAttribute('page', '10');

// Listen for page changes
viewer.addEventListener('pagechange', (event) => {
  console.log('Current page:', event.detail.page);
});
```

## API Documentation

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | string | - | URL of the PDF document to display |
| `page` | number | `1` | Current page number to display |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `scale` | number | Current scale factor (default: 0.94) |
| `pageCount` | number | Total number of pages in the document |
| `canvas` | HTMLCanvasElement | Canvas element used for rendering |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `loadPdf(url)` | url: string | Load a PDF document from the specified URL |
| `renderPage(pdf, pageNumber, width)` | pdf: object, pageNumber: number, width: number | Render a specific page |

### Events

The component dispatches custom events:

```javascript
// Listen for successful connection
pdfViewer.addEventListener('onconnected', () => {
  console.log('PDF viewer initialized');
});
```

## Advanced Examples

### Custom Styling

```html
<style>
  .pdf-container {
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .pdf-container pdf-viewer button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 4px;
    margin: 8px;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  .pdf-container pdf-viewer button:hover {
    opacity: 0.8;
  }
  
  .pdf-container pdf-viewer button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>

<div class="pdf-container">
  <pdf-viewer url="/documents/presentation.pdf"></pdf-viewer>
</div>
```

### Custom Navigation

```javascript
class CustomPdfViewer extends HTMLElement {
  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 0;
  }
  
  connectedCallback() {
    this.innerHTML = `
      <div class="pdf-controls">
        <button id="first-page">First</button>
        <button id="prev-page">Previous</button>
        <span id="page-info">Page 1 of 1</span>
        <button id="next-page">Next</button>
        <button id="last-page">Last</button>
      </div>
      <pdf-viewer url="${this.getAttribute('url')}"></pdf-viewer>
    `;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    const viewer = this.querySelector('pdf-viewer');
    const pageInfo = this.querySelector('#page-info');
    
    // Update page info when PDF loads
    viewer.addEventListener('onconnected', () => {
      this.totalPages = viewer.pageCount;
      this.updatePageInfo();
    });
    
    // Navigation buttons
    this.querySelector('#first-page').onclick = () => this.goToPage(1);
    this.querySelector('#prev-page').onclick = () => this.goToPage(this.currentPage - 1);
    this.querySelector('#next-page').onclick = () => this.goToPage(this.currentPage + 1);
    this.querySelector('#last-page').onclick = () => this.goToPage(this.totalPages);
  }
  
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.querySelector('pdf-viewer').setAttribute('page', page);
      this.updatePageInfo();
    }
  }
  
  updatePageInfo() {
    this.querySelector('#page-info').textContent = 
      `Page ${this.currentPage} of ${this.totalPages}`;
  }
}

customElements.define('custom-pdf-viewer', CustomPdfViewer);
```

### Responsive Container

```javascript
// Create a responsive PDF viewer that adapts to container size
function createResponsivePdfViewer(container, pdfUrl) {
  const viewer = document.createElement('pdf-viewer');
  viewer.setAttribute('url', pdfUrl);
  
  // Monitor container size changes
  const resizeObserver = new ResizeObserver(() => {
    // The component automatically handles scaling
    console.log('Container resized, PDF will auto-scale');
  });
  
  resizeObserver.observe(container);
  container.appendChild(viewer);
  
  return viewer;
}
```

## Configuration

### PDF.js Worker Configuration

The component automatically configures PDF.js to use the Mozilla CDN worker. If you need to use a different worker source:

```javascript
// Before creating any pdf-viewer elements
window.pdfjsLib = window.pdfjsLib || {};
window.pdfjsLib.GlobalWorkerOptions = {
  workerSrc: '/path/to/your/pdf.worker.mjs'
};
```

### CORS Considerations

When loading PDFs from different domains, ensure proper CORS headers are set on the server hosting the PDF files.

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

Requires support for:
- ES6 Modules
- Web Components
- Canvas API
- Fetch API

## License

MIT License - see LICENSE file for details.