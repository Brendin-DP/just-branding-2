/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1A1A1A',
          charcoal: '#333333',
          mid: '#666666',
          accent: '#00AEEF',
          red: '#E63946',
          muted: '#666666',
          light: '#F8F8F8',
        },
      },
    },
  },
  plugins: [],
}
