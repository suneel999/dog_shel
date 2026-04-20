/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3f0',
          100: '#e8e3dd',
          200: '#d4c9bd',
          300: '#bba898',
          400: '#a18977',
          500: '#8b6f5c',
          600: '#715a4a',
          700: '#5c493c',
          800: '#4e3f35',
          900: '#44372f',
        },
        accent: {
          50: '#f7f3f0',
          100: '#ece1d9',
          200: '#d9c2b3',
          300: '#c29d85',
          400: '#ac7c5c',
          500: '#8b5a2b', // Logo Monkey/Dog Brown
          600: '#7a4f26',
          700: '#664221',
          800: '#52351c',
          900: '#432c18', // Logo Banner Text Dark Brown
        },
        navy: {
          50: '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3f51b5',
          600: '#3949ab',
          700: '#303f9f',
          800: '#283593',
          900: '#1a237e',
        },
      },
    },
  },
  plugins: [],
}


