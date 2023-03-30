/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.pug"],
  theme: {
    extend: {
      fontFamily: {
        PT: ["PT sans", "sans"],
      },
    },
  },
  plugins: [],
};
