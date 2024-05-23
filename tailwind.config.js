module.exports = {
  content: [
    './dist/**/*.html',
    './web/**/*.{js,jsx,ts,tsx}',
    './*.html',
    'node_modules/preline/dist/*.js'
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('tailwind-scrollbar-hide')
  ],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
