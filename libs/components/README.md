# @vanilla-mint/components

A collection of reusable UI components built with the vanilla-mint framework, including CSV tables, frosted buttons, and Monaco editor integration.

## Installation

```bash
npm install @vanilla-mint/components
```

## Features

- 📊 **CSV Table Component** - Display CSV data in formatted tables
- 🎨 **Frosted Button** - Modern glass-morphism styled buttons
- 💻 **Monaco Editor** - Full-featured code editor integration
- 🔄 **Reactive Components** - All components update automatically
- 🎯 **Custom Elements** - Standards-based web components
- 🚀 **Performance Optimized** - Efficient rendering and updates

## Basic Usage

### Import All Components

```javascript
import { define, CsvTable, FrostedButton, MonacoEditor } from '@vanilla-mint/components';

// Register all components
define(CsvTable);
define(FrostedButton);
define(MonacoEditor);
```

### CSV Table

```html
<csv-table has-header>
Name,Age,City
John Doe,30,New York
Jane Smith,25,San Francisco
</csv-table>
```

### Frosted Button

```html
<frosted-button onclick="handleClick()">Click Me</frosted-button>
```

### Monaco Editor

```html
<monaco-editor 
  language="javascript" 
  value="console.log('Hello World!');"
  theme="vs-dark">
</monaco-editor>
```

## API Documentation

### CSV Table

| Attribute | Type | Description |
|-----------|------|-------------|
| `has-header` | boolean | Treat first row as headers |

### Frosted Button

| Property | Type | Description |
|----------|------|-------------|
| Standard button properties | - | Supports all standard button attributes |

### Monaco Editor

| Attribute | Type | Description |
|-----------|------|-------------|
| `language` | string | Programming language for syntax highlighting |
| `value` | string | Initial editor content |
| `theme` | string | Editor theme (vs, vs-dark, hc-black) |

## Advanced Examples

### Interactive Data Dashboard

```html
<div class="dashboard">
  <h2>Data Dashboard</h2>
  
  <!-- CSV Data Display -->
  <div class="data-section">
    <h3>Sales Data</h3>
    <csv-table has-header id="sales-table">
    Product,Revenue,Units
    Laptops,$45000,150
    Phones,$32000,320
    Tablets,$18000,90
    </csv-table>
  </div>
  
  <!-- Interactive Controls -->
  <div class="controls">
    <frosted-button onclick="refreshData()">Refresh Data</frosted-button>
    <frosted-button onclick="exportData()">Export CSV</frosted-button>
  </div>
  
  <!-- Code Editor for Custom Queries -->
  <div class="editor-section">
    <h3>Custom Query Editor</h3>
    <monaco-editor 
      id="query-editor"
      language="sql"
      value="SELECT * FROM sales WHERE revenue > 20000"
      theme="vs-dark">
    </monaco-editor>
    <frosted-button onclick="executeQuery()">Execute Query</frosted-button>
  </div>
</div>

<script>
function refreshData() {
  // Fetch new data and update table
  fetch('/api/sales')
    .then(response => response.text())
    .then(csvData => {
      document.getElementById('sales-table').textContent = csvData;
    });
}

function exportData() {
  const table = document.getElementById('sales-table');
  const csvContent = table.textContent;
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sales-data.csv';
  a.click();
}

function executeQuery() {
  const editor = document.getElementById('query-editor');
  const query = editor.getValue();
  console.log('Executing query:', query);
  // Process query...
}
</script>
```

## Component Styling

### Frosted Button Customization

```css
frosted-button {
  --frost-bg: rgba(255, 255, 255, 0.1);
  --frost-border: rgba(255, 255, 255, 0.2);
  --frost-hover: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
}
```

### CSV Table Styling

```css
csv-table {
  --table-border: #e1e5e9;
  --header-bg: #f8f9fa;
  --row-hover: #f1f3f4;
}

csv-table table {
  width: 100%;
  border-collapse: collapse;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - see LICENSE file for details.