// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          accent: {
            DEFAULT: "#F47C57",
            100: "#FFECE7",
            200: "#FFD4C5",
            300: "#FFBDA3",
            400: "#FFA582",
            500: "#F47C57",
            600: "#E76E4C",
            700: "#CC5F41",
            800: "#B35036",
            900: "#99402C",
          },
        },
      },
    },
    plugins: [],
  }
  