import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        heading: ["var(--font-chakra)", "sans-serif"],
        editorial: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(2, 132, 199, 0.35)",
        card: "0 10px 30px -5px rgba(11, 29, 58, 0.08)",
        "card-hover": "0 20px 40px -10px rgba(2, 132, 199, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
