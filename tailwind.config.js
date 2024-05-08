module.exports = {
  content: [
    './dist/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './*.html',
    'node_modules/preline/dist/*.js'
  ],
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  }
}
