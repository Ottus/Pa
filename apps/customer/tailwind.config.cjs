/** @type {import('tailwindcss').Config} */
const sharedPreset = require('../../packages/shared/src/theme/tailwind-preset.cjs');

module.exports = {
  presets: [sharedPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

