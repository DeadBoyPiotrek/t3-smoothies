/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#ab7bee",
        },
        blue: {
          DEFAULT: "#63acf0",
          dark: "#2363a0",
        },
        red: {
          DEFAULT: "#f77373",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
