import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        screen: "100svh",
      },
      backgroundColor: {
        default: "rgb(15,23,42)",
        ghost: "rgb(75, 85, 99)",
      },
      backgroundOpacity: {
        default: "0.8",
      },
      colors: {
        default: "rgb(250,250,250)",
        blue: "rgb(56, 189, 248)",
      },
      borderColor: {
        default: "rgb(250,250,250)",
      },
    },
  },
  plugins: [],
};
export default config;
