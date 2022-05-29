module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      red: "#FC4747",
      darkBlue: "#10141E",
      semiDarkBlue: "#161D2F",
      greyishBlue: "#5A698F",
      white: "#FFFFFF",
      black: "#000000",
      green: "#00FF00",
      yellow: "#FFFF00",
    },
    extend: {
      screens: {
        xl: "1444px",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
