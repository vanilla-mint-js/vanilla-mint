# @vanilla-mint/svg

SVG manipulation utilities with a functional programming approach and type-safe styling.

## Installation

```bash
npm install @vanilla-mint/svg
```

## Features

- 🎨 **SVG Element Creation** - Functional approach to creating SVG elements
- 📏 **Type-Safe Styling** - Type-safe CSS properties for SVG elements
- 🎯 **Utility Functions** - Comprehensive set of SVG manipulation helpers
- 📱 **Responsive SVGs** - Built-in support for responsive and scalable graphics
- 🔧 **Attribute Management** - Easy SVG attribute setting and manipulation
- 🚀 **Performance Optimized** - Efficient SVG creation and styling

## Basic Usage

### Creating SVG Elements

```javascript
import { _, setSvgAttributes, setSvgStyles } from '@vanilla-mint/svg';

// Create SVG container
const svg = _('svg', {
  width: 200,
  height: 200,
  viewBox: '0 0 200 200'
});

// Create SVG shapes
const circle = _('circle', {
  cx: 100,
  cy: 100,
  r: 50,
  fill: '#3498db',
  stroke: '#2980b9',
  'stroke-width': 2
});

const rect = _('rect', {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  fill: '#e74c3c',
  rx: 10
});

// Append to SVG
svg.appendChild(circle);
svg.appendChild(rect);
document.body.appendChild(svg);
```

### Dynamic SVG Styling

```javascript
import { _, setSvgStyles, setSvgAttributes } from '@vanilla-mint/svg';

const path = _('path', {
  d: 'M10,90 Q90,90 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50',
  fill: 'none',
  stroke: '#2c3e50',
  'stroke-width': 3
});

// Apply responsive styles
setSvgStyles(path, {
  strokeDasharray: '5,5',
  strokeLinecap: 'round',
  transition: 'all 0.3s ease'
});

// Update attributes dynamically
setSvgAttributes(path, {
  'stroke-width': 5,
  stroke: '#e67e22'
});
```

## API Documentation

### Core Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `_(tag, attributes)` | tag: string, attributes: object | Create SVG element with attributes |
| `setSvgAttributes(element, attrs)` | element: SVGElement, attrs: object | Set multiple SVG attributes |
| `setSvgStyles(element, styles)` | element: SVGElement, styles: CSSProperties | Set CSS styles on SVG element |
| `asId(value)` | value: string | Generate unique ID for SVG elements |

### SVG Properties Type

The library provides type-safe SVG properties for common attributes:

```typescript
interface SvgProps {
  // Positioning
  x?: number | string;
  y?: number | string;
  cx?: number | string;
  cy?: number | string;
  
  // Dimensions
  width?: number | string;
  height?: number | string;
  r?: number | string;
  rx?: number | string;
  ry?: number | string;
  
  // Path data
  d?: string;
  
  // Styling
  fill?: string;
  stroke?: string;
  'stroke-width'?: number | string;
  opacity?: number | string;
  
  // Transform
  transform?: string;
}
```

## Advanced Examples

### Interactive Chart Component

```javascript
import { _, setSvgAttributes, setSvgStyles } from '@vanilla-mint/svg';

function createBarChart(data, options = {}) {
  const {
    width = 400,
    height = 300,
    margin = { top: 20, right: 20, bottom: 40, left: 40 },
    color = '#3498db'
  } = options;

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = chartWidth / data.length;

  // Create SVG container
  const svg = _('svg', {
    width,
    height,
    viewBox: `0 0 ${width} ${height}`
  });

  // Create chart group
  const chartGroup = _('g', {
    transform: `translate(${margin.left}, ${margin.top})`
  });

  // Create bars
  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * chartHeight;
    const x = index * barWidth;
    const y = chartHeight - barHeight;

    const bar = _('rect', {
      x: x + barWidth * 0.1,
      y,
      width: barWidth * 0.8,
      height: barHeight,
      fill: color,
      'data-value': item.value,
      'data-label': item.label
    });

    // Add hover effects
    setSvgStyles(bar, {
      cursor: 'pointer',
      transition: 'fill 0.2s ease'
    });

    bar.addEventListener('mouseenter', () => {
      setSvgAttributes(bar, { fill: '#2980b9' });
      showTooltip(item, x + barWidth / 2, y);
    });

    bar.addEventListener('mouseleave', () => {
      setSvgAttributes(bar, { fill: color });
      hideTooltip();
    });

    chartGroup.appendChild(bar);

    // Add labels
    const label = _('text', {
      x: x + barWidth / 2,
      y: chartHeight + 15,
      'text-anchor': 'middle',
      'font-family': 'Arial, sans-serif',
      'font-size': '12px',
      fill: '#333'
    });
    label.textContent = item.label;
    chartGroup.appendChild(label);
  });

  // Add axes
  const xAxis = _('line', {
    x1: 0,
    y1: chartHeight,
    x2: chartWidth,
    y2: chartHeight,
    stroke: '#333',
    'stroke-width': 1
  });

  const yAxis = _('line', {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: chartHeight,
    stroke: '#333',
    'stroke-width': 1
  });

  chartGroup.appendChild(xAxis);
  chartGroup.appendChild(yAxis);
  svg.appendChild(chartGroup);

  return svg;
}

// Usage
const chartData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 75 },
  { label: 'Mar', value: 85 },
  { label: 'Apr', value: 95 },
  { label: 'May', value: 70 }
];

const chart = createBarChart(chartData, {
  width: 500,
  height: 350,
  color: '#e74c3c'
});

document.body.appendChild(chart);
```

### Animated Loading Spinner

```javascript
import { _, setSvgStyles } from '@vanilla-mint/svg';

function createLoadingSpinner(size = 40, color = '#3498db') {
  const svg = _('svg', {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`
  });

  const circle = _('circle', {
    cx: size / 2,
    cy: size / 2,
    r: (size - 4) / 2,
    fill: 'none',
    stroke: color,
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-dasharray': '31.416', // circumference of circle
    'stroke-dashoffset': '31.416'
  });

  // Add CSS animation
  setSvgStyles(circle, {
    animation: 'spin 2s linear infinite, dash 1.5s ease-in-out infinite'
  });

  // Add CSS keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes dash {
      0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
      50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
      100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
    }
  `;

  if (!document.head.querySelector('style[data-svg-animations]')) {
    style.setAttribute('data-svg-animations', '');
    document.head.appendChild(style);
  }

  svg.appendChild(circle);
  return svg;
}

// Usage
const spinner = createLoadingSpinner(60, '#9b59b6');
document.getElementById('loading-container').appendChild(spinner);
```

### SVG Icon System

```javascript
import { _, setSvgAttributes } from '@vanilla-mint/svg';

const icons = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z'
};

function createIcon(name, options = {}) {
  const {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    className = ''
  } = options;

  const path = icons[name];
  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const svg = _('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    'stroke-width': strokeWidth,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    class: `icon icon-${name} ${className}`
  });

  const pathElement = _('path', { d: path });
  svg.appendChild(pathElement);

  return svg;
}

// Icon button component
function createIconButton(iconName, onClick, options = {}) {
  const {
    size = 24,
    color = '#333',
    hoverColor = '#007bff',
    label = ''
  } = options;

  const button = document.createElement('button');
  button.className = 'icon-button';
  button.setAttribute('aria-label', label);
  
  const icon = createIcon(iconName, { size, color });
  button.appendChild(icon);

  // Hover effects
  button.addEventListener('mouseenter', () => {
    setSvgAttributes(icon, { stroke: hoverColor });
  });

  button.addEventListener('mouseleave', () => {
    setSvgAttributes(icon, { stroke: color });
  });

  button.addEventListener('click', onClick);

  return button;
}

// Usage
const homeButton = createIconButton('home', () => {
  window.location.href = '/';
}, { label: 'Go to home page', hoverColor: '#28a745' });

const searchButton = createIconButton('search', () => {
  document.getElementById('search-input').focus();
}, { label: 'Search', size: 20 });

document.getElementById('toolbar').appendChild(homeButton);
document.getElementById('toolbar').appendChild(searchButton);
```

### Responsive SVG Graphics

```javascript
import { _, setSvgStyles } from '@vanilla-mint/svg';

function createResponsiveLogo() {
  const svg = _('svg', {
    viewBox: '0 0 200 60',
    preserveAspectRatio: 'xMidYMid meet'
  });

  // Make SVG responsive
  setSvgStyles(svg, {
    width: '100%',
    height: 'auto',
    maxWidth: '200px'
  });

  // Logo elements
  const logoGroup = _('g', {});

  // Background shape
  const bg = _('rect', {
    x: 10,
    y: 10,
    width: 180,
    height: 40,
    rx: 8,
    fill: '#3498db',
    stroke: '#2980b9',
    'stroke-width': 2
  });

  // Text
  const text = _('text', {
    x: 100,
    y: 35,
    'text-anchor': 'middle',
    'font-family': 'Arial, sans-serif',
    'font-size': '18px',
    'font-weight': 'bold',
    fill: 'white'
  });
  text.textContent = 'VanillaMint';

  logoGroup.appendChild(bg);
  logoGroup.appendChild(text);
  svg.appendChild(logoGroup);

  return svg;
}

// Usage
const logo = createResponsiveLogo();
document.getElementById('header').appendChild(logo);
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

Requires support for:
- SVG 1.1
- ES6 Modules
- CSS3 Transitions (for animations)

## License

MIT License - see LICENSE file for details.