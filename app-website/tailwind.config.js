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
      'success': 'var(--success)',
      'success-contrast': 'var(--success-contrast)',
      'danger': 'var(--error)',
      'danger-contrast': 'var(--error-contrast)',
      'warning': 'var(--warning)',
      'warning-contrast': 'var(--warning-contrast)',
      'text': 'var(--text)',
      'text-contrast': 'var(--text-contrast)',
      'surface': 'var(--surface)',
      'surface-contrast': 'var(--surface-contrast)',
      'neutral-100': 'var(--neutral-100)',
      'neutral-200': 'var(--neutral-200)',
      'neutral-300': 'var(--neutral-300)',
      'neutral-400': 'var(--neutral-400)',
      'neutral-100-contrast': 'var(--neutral-100-contrast)',
      'neutral-200-contrast': 'var(--neutral-200-contrast)',
      'neutral-300-contrast': 'var(--neutral-300-contrast)',
      'neutral-400-contrast': 'var(--neutral-400-contrast)',
    }
  },
  plugins: [],
};
