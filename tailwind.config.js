/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enables .dark class switching
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A9FF',
      },
      fontFamily:{
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
