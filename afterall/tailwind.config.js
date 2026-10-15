/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js monta lançamentos, vídeos, sessions, agenda, galeria e Instagram — as classes de lá também entram no build
  content: ['./site/index.html', './site/privacy.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b',
        panel: '#121214',
        bone: '#ece8e1',
        // Acento dourado (luzes de palco / Bolly Tech). Para mudar o acento do site, troque flame aqui e em src/input.css (:root)
        flame: { DEFAULT: '#f7b32b', deep: '#a8730a' },
        ember: '#e2342d',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: { mega: '.35em' },
    },
  },
};
