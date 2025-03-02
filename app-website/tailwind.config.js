const { join } = require('path');

const colors = {
  hate: 'var(--hate)',
  cake: 'var(--cake)',
  love: 'var(--love)',
  icing: 'var(--icing)',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
  ],
  theme: {
    colors: {
      'primary': 'var(--primary)',
      'primary-contrast': 'var(--primary-contrast)',
      'secondary': 'var(--secondary)',
      'secondary-contrast': 'var(--secondary-contrast)',
      'background': 'var(--background)',
      'background-contrast': 'var(--background-contrast)',
      'success': 'var(--success)',
      'success-contrast': 'var(--success-contrast)',
      'error': 'var(--error)',
      'error-contrast': 'var(--error-contrast)',
      'warning': 'var(--warning)',
      'warning-contrast': 'var(--warning-contrast)',
      'info': 'var(--info)',
      'info-contrast': 'var(--info-contrast)',
      'text': 'var(--text)',
      'text-contrast': 'var(--text-contrast)',
      'surface': 'var(--surface)',
      'surface-contrast': 'var(--surface-contrast)',
    }
  },
  plugins: [],
};
