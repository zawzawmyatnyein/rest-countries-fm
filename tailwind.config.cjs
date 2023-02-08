const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'dark-blue-bg': 'hsl(207, 26%, 17%)',
        'dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'light-gray': 'hsl(0, 0%, 98%)',
      },
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
