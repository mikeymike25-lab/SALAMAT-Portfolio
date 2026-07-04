/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F17',
        surface: '#161B22',
        accent: '#00F2FE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 242, 254, 0.15)',
        'glow-strong': '0 0 25px rgba(0, 242, 254, 0.3)',
      }
    },
  },
  plugins: [],
}
