/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Alata", "sans-serif"],
      },
      colors: {
        primary: "#1c1f24",
        inverse: "#e3e0db",
      },
    },
  },
  plugins: [],
};
