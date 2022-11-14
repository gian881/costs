/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      borderRadius: {
        '4': '4px'
      },
      colors: {
        yellow: {
          500: "#FFBB33"
        },
        gray: {
          200: "#CCCCCC",
          500: "#7A7A7A",
          800: "#222"
        }
      }
    },
  },
  plugins: [],
}
