/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0c0c13',
          surface: '#13131f',
          card: '#1a1a2e',
        },
      },
      fontFamily: {
        sans: ['Kodchasan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
