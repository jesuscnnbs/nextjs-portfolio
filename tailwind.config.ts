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
        primary: {
          DEFAULT: 'rgb(228, 57, 16)',
          light: 'rgb(244, 129, 102)',
          dark: 'rgb(228, 57, 16)',
          content: 'rgb(37, 9, 3)',
        },
        secondary: {
          DEFAULT: 'rgb(183, 38, 241)',
          light: 'rgb(200, 102, 244)',
          dark: 'rgb(162, 16, 228)',
          content: 'rgb(255, 255, 255)',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
