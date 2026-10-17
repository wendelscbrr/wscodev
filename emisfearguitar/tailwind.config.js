/** @type {import('tailwindcss').Config} */
module.exports = {
  // As páginas são montadas a partir de src/ (layout + páginas); o main.js monta vídeos e galeria — as classes de lá também entram no build
  content: ['./src/**/*.html', './site/assets/js/main.js'],
  theme: {
    extend: {
      // Paleta do briefing (seção 7.2) — "Refined Stage Dark & Academic Clarity"
      colors: {
        ink: '#0F1115',      // Stage Obsidian: hero, header, footer, seções de palco
        panel: '#1C2026',    // Charcoal Fretboard: cards em seções escuras
        paper: '#F8F9FA',    // Warm Ivory: seções de leitura (aulas, preços, FAQ)
        bone: '#ECEDEF',     // texto claro sobre o escuro
        slate: '#4B5563',    // texto corrido sobre o claro
        amber: { DEFAULT: '#E5A93C', deep: '#8F5E0E' }, // Electric Amber: CTAs, selos, hover (deep = texto âmbar sobre o claro, contraste AA)
        crimson: '#C81E3A',  // Theatre Crimson: tags "live", detalhes de teatro
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: { mega: '.32em' },
    },
  },
};
