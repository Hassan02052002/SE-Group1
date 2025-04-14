// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './components/**/*.{js,ts,jsx,tsx,mdx}',
	  './app/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	  extend: {
		fontFamily: {
		  sans: ['Helvetica Neue', 'system-ui', 'sans-serif'],
		  heading: ['Helvetica Neue', 'sans-serif'],
		},
		fontSize: {
		  // Custom type scale for more precise typography control
		  'xs': '0.75rem',     // 12px
		  'sm': '0.875rem',    // 14px
		  'base': '1rem',      // 16px
		  'lg': '1.125rem',    // 18px
		  'xl': '1.25rem',     // 20px
		  '2xl': '1.5rem',     // 24px
		  '3xl': '1.875rem',   // 30px
		  '4xl': '2.25rem',    // 36px
		  '5xl': '3rem',       // 48px
		  '6xl': '3.75rem',    // 60px
		  '7xl': '4.5rem',     // 72px
		  '8xl': '6rem',       // 96px
		  '9xl': '8rem',       // 128px
		},
		letterSpacing: {
		  tightest: '-.05em',
		  tighter: '-.025em',
		  tight: '-.0125em',
		  normal: '0',
		  wide: '.0125em',
		  wider: '.025em',
		  widest: '.05em',
		},
		lineHeight: {
		  tighter: '1.1',
		  tight: '1.25',
		  snug: '1.375',
		  normal: '1.5',
		  relaxed: '1.625',
		  loose: '2',
		},
		colors: {
		  emerald: colors.emerald,
		  teal: colors.teal,
		  gray: colors.gray,
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
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		  "fade-in-right": {
			from: { opacity: 0, transform: "translateX(20px)" },
			to: { opacity: 1, transform: "translateX(0)" },
		  },
		  "fade-in": {
			from: { opacity: 0 },
			to: { opacity: 1 },
		  },
		  "fade-out": {
			from: { opacity: 1 },
			to: { opacity: 0 },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in-right": "fade-in-right 0.5s ease-out",
		  "fade-in": "fade-in 0.5s ease-out",
		  "fade-out": "fade-out 0.5s ease-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }