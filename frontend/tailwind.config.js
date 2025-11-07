/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        'primary-dark': '#991B1B',
        'primary-light': '#FEE2E2',
        secondary: '#FFFFFF',
        accent: '#F97316',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bloodbridge: {
          "primary": "#DC2626",
          "primary-content": "#FFFFFF",
          "secondary": "#EA580C",
          "secondary-content": "#FFFFFF",
          "accent": "#D97706",
          "accent-content": "#FFFFFF",
          "neutral": "#111827",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F9FAFB",
          "base-300": "#F3F4F6",
          "base-content": "#111827",
          "info": "#2563EB",
          "info-content": "#FFFFFF",
          "success": "#059669",
          "success-content": "#FFFFFF",
          "warning": "#D97706",
          "warning-content": "#FFFFFF",
          "error": "#DC2626",
          "error-content": "#FFFFFF",
        },
      },
    ],
  },
}