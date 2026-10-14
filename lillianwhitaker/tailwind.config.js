/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js monta destaques, vídeos, repertório, galeria e Instagram — as classes de lá também entram no build
  content: ['./site/index.html', './site/privacy.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b',
        panel: '#121214',
        bone: '#ece8e1',
        // Mesma paleta do site da Banda OÁZ (projeto de referência). Para mudar o acento do site, troque flame aqui
        flame: { DEFAULT: '#fc8618', deep: '#c45f00' },
        tie: '#f5c518',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
      letterSpacing: { mega: '.35em' },
    },
  },
};
