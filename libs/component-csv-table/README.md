# @vanilla-mint/component-csv-table

A lightweight, custom web component for rendering CSV data as HTML tables with zero dependencies.

## Installation

```bash
npm install @vanilla-mint/component-csv-table
```

## Features

- 📊 **CSV to HTML Table Conversion** - Automatically parses CSV data and renders as a formatted table
- 🎨 **Built-in Styling** - Clean, professional table styling with borders and padding
- 📋 **Header Row Support** - Optional header row treatment with `has-header` attribute
- 🚀 **Zero Dependencies** - Pure vanilla JavaScript implementation
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- ⚡ **Reactive** - Automatically updates when CSV content changes

## Basic Usage

### Inline CSV Data

```html
<csv-table has-header>
Name,Age,City
John Doe,30,New York
Jane Smith,25,San Francisco
Bob Johnson,35,Chicago
</csv-table>
```

### Programmatic Usage

```javascript
import { CsvTable, define } from '@vanilla-mint/component-csv-table';

// Register the custom element
define(CsvTable);

// Create and configure the component
const csvTable = document.createElement('csv-table');
csvTable.setAttribute('has-header', 'true');
csvTable.textContent = `
Name,Age,City
John Doe,30,New York
Jane Smith,25,San Francisco
Bob Johnson,35,Chicago
`;

document.body.appendChild(csvTable);
```

### Dynamic CSV Loading

```javascript
// Load CSV from an API or file
async function loadCsvData() {
  const response = await fetch('/api/data.csv');
  const csvData = await response.text();
  
  const csvTable = document.querySelector('csv-table');
  csvTable.textContent = csvData;
}
```

## API Documentation

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `has-header` | boolean | `false` | Treats the first row as table headers (`<th>` elements) |

### Methods

The component extends the standard HTMLElement and includes all vanilla-mint lifecycle methods:

- `vmConnected()` - Called when component is added to DOM
- `vmDisconnected()` - Called when component is removed from DOM
- `vmAdopted()` - Called when component is moved to new document

### CSS Styling

The component applies default styling to table elements:

```css
table {
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid;
}
```

You can override these styles by targeting the component:

```css
csv-table table {
  width: 100%;
  border: 2px solid #333;
}

csv-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

csv-table td {
  border-right: 1px solid #ddd;
}
```

## Advanced Examples

### Custom Styling

```html
<style>
  .custom-csv-table table {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .custom-csv-table th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .custom-csv-table tr:nth-child(even) {
    background-color: #f8f9fa;
  }
</style>

<csv-table class="custom-csv-table" has-header>
Product,Price,Stock
Laptop,$999,15
Mouse,$25,100
Keyboard,$75,50
</csv-table>
```

### Large Dataset Handling

```javascript
// For large CSV files, consider chunking or pagination
function createPaginatedCsvTable(csvData, rowsPerPage = 100) {
  const lines = csvData.split('\n');
  const header = lines[0];
  const dataRows = lines.slice(1);
  
  let currentPage = 0;
  const totalPages = Math.ceil(dataRows.length / rowsPerPage);
  
  function renderPage(page) {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageData = [header, ...dataRows.slice(startIndex, endIndex)].join('\n');
    
    const csvTable = document.querySelector('csv-table');
    csvTable.textContent = pageData;
  }
  
  renderPage(currentPage);
  return { renderPage, totalPages };
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - see LICENSE file for details.