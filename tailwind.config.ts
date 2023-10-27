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
      },
      colors: {
        default: "rgb(250,250,250)",
      },
      borderColor: {
        default: "",
      },
    },
  },
  plugins: [],
};
export default config;
