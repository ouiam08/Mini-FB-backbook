/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'green-custom': '#5BB595', 
      },
    fontFamily: {
        'beezee': ['ABeeZee', 'sans'],
        'acmi': ['Acmi', 'sans'],
    },
    },
  },
  plugins: [],
}