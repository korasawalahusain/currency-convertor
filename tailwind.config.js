/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#5347DE",
      secondary: "#E2AD5E",
      tertiary: "#E2815E",
      quaternary: "#8eb991",
      quaternary2: "#709874",
      quinary: "#FFFFFF",
      quinary2: "#A80000",
      black: "#161616",
      grey: "#262221",
    },
    extend: {},
    fontFamily: {
      futura: ["Futura"],
      futura_bold: ["FuturaBold"],
    },
  },
  plugins: [],
};
