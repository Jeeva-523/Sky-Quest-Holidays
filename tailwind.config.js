/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ['"Audiowide"', 'cursive', 'sans-serif'],
        bruno: ['"Bruno Ace SC"', 'sans-serif'],
        transcity: ['Transcity', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: "#0B1D3A",
          "navy-light": "#162C52",
          sky: "#0284C7",
          "sky-light": "#38BDF8",
          "sky-pale": "#E0F2FE",
          gold: "#C5A059",
          "gold-dark": "#9A7B3E",
          "gold-light": "#FDF9F0",
        },
      },
    },
  },
  plugins: [],
};
