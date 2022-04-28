const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "public/index.html",
    "src/**/*.js",
  ],
  theme: {
    colors: {
      white: "#fff",
      main: colors.zinc,
      green: colors.green,
      red: colors.red,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
