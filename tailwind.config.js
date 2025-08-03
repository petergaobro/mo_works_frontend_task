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
      /**
       * Using opacity alone does not cause performance lag, but it can easily create the illusion of stuttering
       * When combined with transform, inconsistent timing can cause the animation to look uncoordinated.
       * Abrupt changes in opacity (like from 1 to 0 and back) can make the animation feel harsh or flickery.
       * Setting opacity to 0 causes the element to vanish instantly, creating a visual jump or stutter.
       */
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
