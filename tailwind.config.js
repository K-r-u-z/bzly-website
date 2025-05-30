/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'red': {
          100: '#BF0B02',
          200: '#AE0603',
          300: '#880203',
          400: '#560000',
          500: '#250100',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.01em',
        wider: '0.02em',
      }
    },
  },
  plugins: [],
}

