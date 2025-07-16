import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ["var(--font-noto-sans)"],
        "noto-sans-mono": ["var(--font-noto-sans-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
