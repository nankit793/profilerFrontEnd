/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // color_1: "#ebfdff",
        color_1: "#a3ddf0",
        color_2: "#03254c",
      },
    },
  },
  plugins: [],
};
