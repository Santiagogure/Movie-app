/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#1C1B29',
      },
      screens: {
        mobile: {
          max: '768px',
        },
      },
      transitionProperty: {
        margin: 'margin',
        opacity: 'opacity',
        transform: 'transform',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
}
