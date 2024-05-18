/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'dirtywhite': '#e7e5e4',
      'tahiti': '#ffffff',
      'gray': '#1f2937',
      'dark': '#000000',
      'red': '#FF0000',
      'dark-blue': '#00008B',
      'menuitemcolor': '#FCB900',
      'addtocartcolor': "#FFA500"
    },
    extend: {},
  },
  plugins: [],
}
