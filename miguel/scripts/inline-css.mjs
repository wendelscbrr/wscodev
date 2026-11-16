// Coloca o CSS compilado do Tailwind dentro do <style id="site-css"> das páginas do site.
// CSS inline = nenhuma requisição bloqueando a primeira pintura (ganho no PageSpeed mobile).
// Uso: npm run build   (compila o Tailwind e roda este script)
import { readFileSync, writeFileSync } from 'node:fs';

const PAGES = ['site/index.html', 'site/privacidad.html'];
const CSS = 'build/style.css';

// No CSS os caminhos são relativos a assets/css/; dentro do HTML passam a ser relativos à página
const css = readFileSync(CSS, 'utf8').replaceAll('../fonts/', 'assets/fonts/').replaceAll('../img/', 'assets/img/');
const re = /<style id="site-css">[\s\S]*?<\/style>/;
for (const page of PAGES) {
  const html = readFileSync(page, 'utf8');
  if (!re.test(html)) throw new Error(`Bloco <style id="site-css"> não encontrado em ${page}`);
  writeFileSync(page, html.replace(re, () => `<style id="site-css">${css}</style>`));
}
console.log(`CSS inline em ${PAGES.join(', ')}: ${(css.length / 1024).toFixed(1)} KB`);
