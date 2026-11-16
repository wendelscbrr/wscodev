/** @type {import('tailwindcss').Config} */
module.exports = {
  // As páginas são montadas a partir de src/ (build.ps1); main.js também gera HTML com classes
  content: ['./src/**/*.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        // Mesma base do site de Amparo (preto quente, papel e grão de filme), recolorida para o flamenco:
        // vermelho cravo (das flores do videoclipe «Marianas») e dourado albero (a areia das praças andaluzas)
        ink: '#0e0b0a',
        panel: '#18120f',
        bone: '#efe6d8',
        // clavel = texto/realces sobre fundo escuro (contraste AA) · clavel.deep = fundo de botões com texto bone
        clavel: { DEFAULT: '#e5484d', deep: '#a3122a' },
        albero: { DEFAULT: '#d9a441', deep: '#9a6d1f' },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: { mega: '.35em' },
    },
  },
};
