/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        seashell: {
          50: '#fafafa',
          100: '#f1f1f1f2',
          200: '#e6e6e6',
          300: '#d6d6d6',
          400: '#a5a5a5',
          500: '#767676',
          600: '#575757',
          700: '#434343',
          800: '#292929',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}