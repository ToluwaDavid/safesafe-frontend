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
        // brand: '#00A9FF',        // primary brand color
        bgLight: '#F9FAFB',      // page background light
        bgDark: '#0D1117',       // page background dark
        surfaceLight: '#FFFFFF', // card / surface light
        surfaceDark: '#161B22',  // card / surface dark
        textLight: '#1E293B',    // primary text light
        textDark: '#E6EDF3',     // primary text dark
        // helper blues for hover / emphasis
        brandDark: '#0090E0',

      },
      fontFamily:{
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
