/** @type {import('tailwindcss').Config} */
export default {
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
          dark: '#0D0D0D',
          charcoal: '#1A1A1A',
          mid: '#2A2A2A',
          accent: '#E8FF00',
          muted: '#666666',
          light: '#F5F5F0',
        },
      },
    },
  },
  plugins: [],
}
