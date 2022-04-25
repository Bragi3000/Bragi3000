const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "public/index.html",
    "src/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      white: "#fff",
      main: colors.zinc,
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
