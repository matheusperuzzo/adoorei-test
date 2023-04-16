/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#292d32',
      rose: '#F30168',
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617'
      },
      white: '#FFFFFF'
    },
    extend: {
      spacing: {
        1.25: '0.313rem',
        3.75: '0.938rem',
        6.25: '1.563rem',
        7.5: '1.875rem',
        47.5: '11.875rem'
      }
    }
  },
  plugins: []
}
