// Monta as páginas do site a partir de src/ e coloca o CSS compilado do Tailwind inline em cada uma.
// • src/layout.html = <head>, header, footer e modais comuns a todas as páginas
// • src/partials/*.html = blocos reutilizados (<!--@nome--> no layout ou nas páginas)
// • src/pages/*.html = conteúdo de cada página; a 1ª linha é <!--meta {...}--> com título, descrição, rota etc.
// CSS inline = nenhuma requisição bloqueando a primeira pintura (ganho no PageSpeed mobile).
// Uso: npm run build   (compila o Tailwind e roda este script). Gera site/**/index.html e site/sitemap.xml
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Endereço de prévia. Ao mover para o domínio do artista (ex.: https://www.emisfearguitar.com/), troque aqui,
// no main.js (SITE) e no robots.txt — e rode o build de novo
const SITE = 'https://wscodev.vercel.app/emisfearguitar/site/';
const TODAY = new Date().toISOString().slice(0, 10);

const read = (p) => readFileSync(p, 'utf8');
const css = read('build/style.css');
const layout = read('src/layout.html');
const partials = Object.fromEntries(readdirSync('src/partials').map((f) => [f.replace(/\.html$/, ''), read(join('src/partials', f))]));
const withPartials = (html) => html.replace(/<!--@([\w-]+)-->/g, (m, name) => {
  if (!(name in partials)) throw new Error(`Partial não encontrado: ${name}`);
  return withPartials(partials[name]);
});

// Dados estruturados comuns (schema.org): só fatos do briefing / perfis oficiais
const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}#person`,
  name: 'Emiliano Bonanomi',
  alternateName: 'EmisFearGuitar',
  url: SITE,
  image: `${SITE}assets/img/og-image.jpg`,
  jobTitle: ['Session Guitarist', 'Musical Theatre Pit Musician', 'Guitar Teacher'],
  description: 'London session guitarist, musical theatre pit musician and Guildhall-qualified guitar educator based in Camden / Euston (NW1).',
  email: 'mailto:emisfear@gmail.com',
  telephone: '+447565016969',
  knowsLanguage: ['en', 'it', 'es'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Guildhall School of Music & Drama' },
    { '@type': 'CollegeOrUniversity', name: 'ICMP / University of East London' },
    { '@type': 'CollegeOrUniversity', name: 'Conservatorio G. Donizetti, Bergamo' },
  ],
  memberOf: { '@type': 'Organization', name: "Musicians' Union" },
  sameAs: [
    'https://www.youtube.com/@EmisFearGuitar',
    'https://www.instagram.com/emisfearguitar',
    'https://www.facebook.com/EmisFearGuitar/',
  ],
};
const BUSINESS = {
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': `${SITE}#business`,
  name: 'Emiliano Bonanomi — EmisFearGuitar',
  url: SITE,
  image: `${SITE}assets/img/og-image.jpg`,
  email: 'emisfear@gmail.com',
  telephone: '+447565016969',
  priceRange: '£20–£550',
  // Só a área (sem endereço residencial): briefing, seção 8.1 (segurança)
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressRegion: 'Camden / Euston', postalCode: 'NW1', addressCountry: 'GB' },
  areaServed: [{ '@type': 'Place', name: 'Camden, London' }, { '@type': 'Place', name: 'Euston, London' }, { '@type': 'Place', name: "King's Cross, London" }, 'Online'],
  founder: { '@id': `${SITE}#person` },
};
const WEBSITE = { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: 'Emiliano Bonanomi — EmisFearGuitar', inLanguage: 'en-GB', publisher: { '@id': `${SITE}#person` } };

const pages = readdirSync('src/pages').filter((f) => f.endsWith('.html')).map((f) => {
  const src = read(join('src/pages', f));
  const m = src.match(/^<!--meta\s*([\s\S]*?)-->\s*/);
  if (!m) throw new Error(`Bloco <!--meta {...}--> não encontrado em ${f}`);
  return { ...JSON.parse(m[1]), body: src.slice(m[0].length) };
});

for (const p of pages) {
  const root = p.path ? '../'.repeat(p.path.split('/').length) : '';
  const url = SITE + (p.path ? `${p.path}/` : '');
  const graph = [WEBSITE, PERSON, BUSINESS, ...(p.schema || [])];
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replaceAll('{{site}}', SITE).replaceAll('{{url}}', url);
  const preload = (p.preload || []).map((h) => `<link rel="preload" as="image" href="${root}${h.href}"${h.media ? ` media="${h.media}"` : ''} fetchpriority="high">`).join('\n  ');
  // No CSS os caminhos são relativos a assets/css/; dentro do HTML passam a ser relativos à página
  const pageCss = css.replaceAll('../fonts/', `${root}assets/fonts/`).replaceAll('../img/', `${root}assets/img/`);

  let html = withPartials(layout).replace('{{content}}', () => withPartials(p.body));
  const vars = {
    root, url, title: p.title, description: p.description, schema, preload, key: p.key,
    // Mensagem inicial do WhatsApp (RF03): cada página pode ter a sua ("wa" no meta)
    wa: encodeURIComponent(p.wa || "Hi Emiliano, I'd like to enquire about guitar lessons in Camden."),
    ogTitle: p.ogTitle || p.title, ogImage: `${SITE}assets/img/${p.ogImage || 'og-image.jpg'}`,
    ogAlt: p.ogAlt || 'Emiliano Bonanomi playing electric guitar on stage under blue and purple lights',
    robots: p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  };
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
  html = html.replace('/*SITE-CSS*/', () => pageCss);
  // Link ativo do menu: aria-current na página atual
  html = html.replace(new RegExp(`data-nav="${p.key}"`, 'g'), `data-nav="${p.key}" aria-current="page"`);
  if (/\{\{\w+\}\}/.test(html)) console.warn(`Aviso: variável não resolvida em ${p.key}: ${html.match(/\{\{\w+\}\}/)[0]}`);

  const dir = join('site', p.path || '');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  console.log(`site/${p.path ? p.path + '/' : ''}index.html  ${(html.length / 1024).toFixed(1)} KB`);
}

// Sitemap (páginas indexáveis, a Home primeiro)
const order = (p) => (p.path ? p.priority || 0.5 : 2);
const urls = pages.filter((p) => !p.noindex).sort((a, b) => order(b) - order(a)).map((p) => `  <url>
    <loc>${SITE}${p.path ? p.path + '/' : ''}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq || 'monthly'}</changefreq>
    <priority>${p.path ? (p.priority || 0.5).toFixed(1) : '1.0'}</priority>
  </url>`).join('\n');
writeFileSync('site/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`site/sitemap.xml  ${pages.filter((p) => !p.noindex).length} URLs · CSS inline ${(css.length / 1024).toFixed(1)} KB`);
