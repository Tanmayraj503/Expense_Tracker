/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide-arrows': {
          '&::-webkit-scrollbar-button': {
            display: 'none',
          },
        },
      })
    },
  ],
}
