/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '.5rem'
    },
    screen: {
      sm: '640px',
      md: '768',
      lg: '992px',
      xl: '1200px'
    }
  },
  plugins: [
  ],
}
