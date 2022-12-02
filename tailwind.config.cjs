/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      s: "520px",
      sm: "640px",
      md: "768px",
      mmd: "860px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "2560px",
    },
    extend: {
      // extend the bg-neutral colors to include this color: #070606 as neutral-1000
      colors: {
        "neutral-1000": "#070606",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
