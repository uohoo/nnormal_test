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
        ink: "#0c0d0d",
        sand: "#f3f2ed",
        lime: "#b3ff36",
        steel: "#9aa0a6"
      },
      boxShadow: {
        card: "0 16px 40px rgba(0, 0, 0, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
