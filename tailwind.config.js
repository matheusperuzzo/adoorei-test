/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#292d32',
      neutral: {
        50: '#fafafa',
        100: '#f4f4f4',
        200: '#ececec',
        300: '#e4e4e4',
        400: '#dfdfdf',
        500: '#d9d9d9',
        600: '#d5d5d5',
        700: 'cfcfcf',
        800: 'cacaca',
        900: 'c0c0c0',
        DEFAULT: '#d9d9d9'
      },
      primary: {
        50: '#fee1ed',
        100: '#fbb3d2',
        200: '#f980b4',
        300: '#f74d95',
        400: '#f5277f',
        500: '#f30168',
        600: '#f10160',
        700: '#ef0155',
        800: '#ed014b',
        900: '#ea003a',
        DEFAULT: '#f30168'
      },
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
        DEFAULT: '#64748b'
      },
      white: '#ffffff'
    },
    extend: {
      fontSize: {
        7: '1.75rem'
      },
      maxWidth: {
        244: '61rem'
      },
      spacing: {
        1.25: '0.313rem',
        3.75: '0.938rem',
        6.25: '1.563rem',
        7.5: '1.875rem',
        9.5: '2.35rem',
        13: '3.25rem',
        47.5: '11.875rem'
      }
    }
  },
  plugins: []
}
