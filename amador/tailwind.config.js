/** @type {import('tailwindcss').Config} */
module.exports = {
  // As páginas são geradas por scripts/build-pages.cjs; main.js também monta classes
  content: ['./site/**/*.html', './site/assets/js/main.js', './scripts/build-pages.cjs'],
  theme: {
    extend: {
      colors: {
        // Mesma base do site de Amparo (preto quente e creme), com acento próprio do David:
        // verniz de violino (cobre) e bordô. Para mudar o acento, troque aqui e em src/input.css (:root)
        ink: '#0e0b0a',
        panel: '#171210',
        bone: '#f0e7da',
        varnish: { DEFAULT: '#d4894a', deep: '#9b5a27' },
        oxblood: { DEFAULT: '#5e1b20', deep: '#3a0d11' },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: { mega: '.35em' },
    },
  },
};
