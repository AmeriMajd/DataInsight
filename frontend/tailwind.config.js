/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2", // MUI-inspired blue
        dark: "#121212", // Dark background
        secondary: "#bbdefb", // Light blue for accents
      },
    },
  },
  plugins: [],
};
