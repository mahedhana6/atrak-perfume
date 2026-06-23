import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          950: "#21091f",
          900: "#32102f",
          800: "#4a1844",
          700: "#61205a"
        },
        gold: {
          300: "#f7df9a",
          400: "#e8c76d",
          500: "#c99b3d",
          600: "#9d7429"
        },
        ivory: "#fff8ea",
        ink: "#171017"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(201, 155, 61, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
