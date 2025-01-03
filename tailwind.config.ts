import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config = {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      screens: {
        sLaptop: "1025px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        pulse: {
          "0%": { scale: "1" },
          "50%": { scale: "1.2 " },
          "100%": { scale: "1" },
        },
        skeleton: {
          "0%": { opacity: "1" },
          "50%": { opacity: ".5 " },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "meteor-effect": "meteor 5s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        skeleton: "skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
      },
      colors: {
        lightPrime: "#ffffff",
        lightText: "#072d44",
        extraItem: "#9ccddb",
        extraText: "#5790AB",
        extraBg: "#064469",
        cardBg: "#BCC4CE ",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        "inner-custom": "inset 6px 5px 4px 0 rgba(0, 0, 0, 0.06)",
        flagShadow:
          "6.7px 6.7px 5.3px rgba(0, 0, 0, 0.024), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.036), 100px 100px 80px rgba(0, 0, 0, 0.06)",
      },
    },
  },

  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
