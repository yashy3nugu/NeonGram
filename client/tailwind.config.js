module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    variants: {
      extend: {
        opacity: ['disabled'],
        cursor: ['disabled']
      }
    },
    
    plugins: [],
    theme: {
      extend: {
        colors: {
          'neon-purple': '#7a27ff',
          'neon-green' : '#26ffae'
        }
      }
    }
  }