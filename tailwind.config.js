const colors = require("tailwindcss/colors");

module.exports = {
  content: ["public/index.html", "src/**/*.js"],
  theme: {
    colors: {
      white: "#fff",
      transparent: "transparent",
      gray: colors.zinc,
      green: colors.green,
      red: colors.red,
      blue: colors.blue,
      gold: "#ffdf00",
    },
    extend: {
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
