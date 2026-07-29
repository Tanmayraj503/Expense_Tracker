/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This creates the 'font-playfair' utility
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'hard': '4px 4px 0 #0d0d14',
        'hardLg': '6px 6px 0 #0d0d14',   // camelCase
        'hardGold': '4px 4px 0 #c9a84c',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
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