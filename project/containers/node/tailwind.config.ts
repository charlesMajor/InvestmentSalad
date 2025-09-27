import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /*InvestmentSalad - Main Colors*/
        _primary: "#1F93DB",
        _secondary: "#5BBEFB",
        _accent: "#5CABDB",
        _background1: "#FFFFFF",
        _semiBackground1: "rgba(255, 255, 255, 0.4)",
        _background2: "#F1F1F1",
        _semiBackground2: "rgba(241, 241, 241, 0.7)",
        _blackText: "#000000",
        _grayText: "#7F8EA3",
        _lightGrayText: "#B5B5B5",
        _greenText: "#2EC534",
        _redText: "#ed0505",
        _lightRedText: "#db4242",
        _blueBackground: "rgba(170, 214, 255, 0.15)",
        _lightPrimary: "rgba(31, 147, 219, 0.2)",
        /*DarkMode*/
        _darkPrimary: "#2498E0",
        _darkSecondary: "#0467A4",
        _darkBackground1: "#1e293b",
        _darkSemiBackground1: "rgba(30, 41, 59, 0.4)",
        _darkBackground2: "#0f172a",
        _semiDarkBackground2: "rgba(15, 23, 42, 0.7)",
        _darkBlueBackground: "rgba(170, 214, 255, 0.10)",
        _whiteText: "#FBFBFB",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
