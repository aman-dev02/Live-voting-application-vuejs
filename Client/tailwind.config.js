/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3F72AF', 
        Secondary: '#E4F1FF', 
        Third: '#DBE2EF',
        Fourth:'#112D4E',
        black:'#393E46'
        // white:'#fff'
      },
      fontFamily: {
        primary: ['Space Grotesk', 'sans-serif'], 
        secondary: [ 'Inter', 'sans-serif'], 
        third: [ 'Roboto', 'sans-serif'], 
        fourth:[ 'Rubik',' sans-serif']

     
  
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

