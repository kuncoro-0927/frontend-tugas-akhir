/** @type {import('tailwindcss').Config} */

import flowbiteReact from "flowbite-react/plugin/tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json",
    "./node_modules/flowbite-react/**/*.js", // ini untuk komponen React-nya
    "./node_modules/flowbite/**/*.js", // ini buat plugin dan style default-nya
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', "Helvetica", "Arial", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
      colors: {
        coklat: "#D0CCC7",
        birulaut: "#C4E0E9",
        abu: "#f2f2f2",
        hijau: "#D1F068",
        darkgray: "#2A2A2A",
        primary: "#FFD858",
        birumuda: "#DFF5FF80",
        graytext: "#344054",
      },
    },
  },

  plugins: [flowbiteReact, scrollbarHide],
};
