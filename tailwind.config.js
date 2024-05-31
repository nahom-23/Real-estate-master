module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Black: "#0D0D0D",
        grayish: "#736B62",
        brown: "#BF9D7E",
        red: "#FF0000",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
