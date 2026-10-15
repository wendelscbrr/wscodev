/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js monta discografia, vídeos, galeria e trajetória — as classes de lá também entram no build
  content: ['./site/index.html', './site/privacy.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        // Paleta "Exit Row": preto quente, creme de papel, âmbar de luz de cabine e vinho (#51071C do briefing, clareado)
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
