/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js monta repertório, momentos, vídeos e galeria — as classes de lá também entram no build
  content: ['./site/index.html', './site/privacidad.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        // Mesma paleta do site de Flagship (projeto de referência): preto quente, creme de papel, âmbar e vinho
        ink: '#0f0d0c',
        panel: '#171412',
        bone: '#ece4d6',
        // Para mudar o acento do site, troque amber aqui e em src/input.css (:root)
        amber: { DEFAULT: '#e0a458', deep: '#a8722f' },
        wine: { DEFAULT: '#7a1a2e', deep: '#51071c' },
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
