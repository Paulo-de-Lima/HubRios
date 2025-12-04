/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#FF6B35',
          blue: '#004E89',
          purple: '#6C5CE7',
          white: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}


