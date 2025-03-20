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
        primary: {
          DEFAULT: '#6c5ce7',
          dark: '#5a4bd1',
        },
        secondary: {
          DEFAULT: '#a363d9',
          dark: '#8c4fc0',
        },
      },
    },
  },
  plugins: [],
};
