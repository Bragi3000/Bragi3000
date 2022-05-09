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
        192: "48rem",
      },
      keyframes: {
        kermit: {
          '0%, 10%, 90%, 100%': {transform: 'translate(0, 200px)'},
          '40%, 60%': {transform: 'translate(0, 0)'},
        }
      },
      animation: {
        kermit: 'kermit 5s ease-in-out infinite'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
