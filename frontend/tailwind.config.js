/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          600: "#5046e3",
          200: "#e0e6ff",
          400: "#7d79cd"
        },
        gray: {
          200: "#f9fbfc"
        }
      }
    },
  },
  plugins: [],
}

