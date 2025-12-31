/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body text
        sans: ['"Inter"', 'sans-serif'],

        // Headings
        display: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
