/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js monta vídeos, repertório, locais, galeria e Instagram — as classes de lá também entram no build
  content: ['./site/index.html', './site/privacy.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      // Paleta do briefing (seção 7): preto profundo, marfim, dourado suave e cinza neutro
      colors: {
        ink: '#121110',
        panel: '#1b1918',
        ivory: '#f5f0e8',
        gold: { DEFAULT: '#b79a6a', light: '#d8c29a', deep: '#8c7348' },
        mute: '#777777',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { mega: '.35em' },
    },
  },
};
