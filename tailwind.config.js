/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      green:colors.green,
      orange: colors.orange,
      pink:colors.pink,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      'twitter-color':"#1d9bf0",
      'twitter-background-color':"#e7e7e8",
      'twitter-hover-background':"#e8f5fd",
      'username-color':"#536471",
    },
    extend: {},
  },
  plugins: [],
}
