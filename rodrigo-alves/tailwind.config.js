/** @type {import('tailwindcss').Config} */
module.exports = {
  // main.js monta discografia, vídeos e projetos — as classes de lá também entram no build
  content: ['./site/index.html', './site/privacy.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0b',
        panel: '#121214',
        graphite: '#1a1a1c', // grafite (briefing)
        bone: '#ece8e1',     // off-white (briefing)
        // Acento dourado (luzes de palco) — mesma paleta do site AFTERAll. Para mudar o acento, altere aqui e em src/input.css (:root)
        gold: { DEFAULT: '#f7b32b', deep: '#a8730a' },
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
