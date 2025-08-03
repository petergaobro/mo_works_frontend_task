/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "arrow-move": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "25%": {
            transform: "translateX(12px)",
            opacity: "0",
          },
          "50%": {
            transform: "translateX(20px)",
            opacity: "0",
          },
          "75%": {
            transform: "translateX(8px)",
            opacity: "0.3",
          },
          "85%": {
            transform: "translateX(6px)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateX(4px)",
            opacity: "1",
          },
        },
      },
      animation: {
        "arrow-move": "arrow-move 0.8s ease-in-out",
      },
    },
  },
  plugins: [],
};
