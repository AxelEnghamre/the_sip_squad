/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "charcoal": "#373F51",
        "celestial-blue": "#008DD5",
        "pale-dogwood": "#DFBBB1",
        "bright-pink": "#F56476",
        "cerise": "#E43F6F",
      }
    },
  },
  plugins: [],
}

