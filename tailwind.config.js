/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clGold: {
          DEFAULT: '#D4AF37',
          dark: '#B89B2B',
          light: '#ECCB5F'
        },
        clChrome: {
          DEFAULT: '#C0C0C0',
          dark: '#939393',
          light: '#E2E2E2'
        },
        clBlack: '#050505',
        clDarkGrey: '#111111'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'shimmer-gold': 'shimmerGold 2s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmerGold: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}
