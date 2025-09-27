/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', 'sans-serif'], // A friendly, rounded font
      },
      colors: {
        // Sky Blue Theme
        'primary': '#0ea5e9',    // sky-500
        'primary-dark': '#0284c7', // sky-600
        'accent': '#f97316',     // orange-500
        'accent-dark': '#ea580c',  // orange-600
        'light-bg': '#f0f9ff',      // sky-50
        'text-dark': '#0c4a6e',    // sky-900
        'text-light': '#075985',   // sky-800
        'grass-light': '#bbf7d0', // green-200
        'grass-dark': '#86efac',  // green-300
      },
      animation: {
        'breathe': 'breathe 6s infinite ease-in-out',
        'cloud-slow': 'cloud-slow 25s infinite alternate ease-in-out',
        'cloud-fast': 'cloud-fast 18s infinite alternate ease-in-out',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'cloud-slow': {
          '0%': { transform: 'translateX(-20px)' },
          '100%': { transform: 'translateX(20px)' },
        },
        'cloud-fast': {
          '0%': { transform: 'translateX(15px)' },
          '100%': { transform: 'translateX(-15px)' },
        }
      }
    },
  },
  plugins: [],
}

