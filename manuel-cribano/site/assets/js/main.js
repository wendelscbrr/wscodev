/* ==========================================================
   Manuel Cribaño · El Niño de Peñaflor — interações do site
   (mesma base e mesmo estilo do site de Amparo)
   Os conteúdos repetidos (cantes, trajetória, vídeos, singles,
   fotos e agenda) ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.com/manuel-cribano/site/';
// E-mail de contratação: o da bio do Instagram ("Abierta Contratación", nov/2026).
// O briefing citava isacripla@gmail.com (descrição do YouTube) — confirmar com o artista qual fica.
const EMAIL = 'manuelsellamacopla@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/manuel_cribano/';
const YOUTUBE = 'https://www.youtube.com/channel/UCxmcFiyQAkpSCjx8dxdPVCA';
// FormSubmit (o mesmo serviço do site do Miguel): no 1.º envio chega um e-mail de ativação ao artista ("Activate Form").
// Depois, troque o e-mail na URL pelo código aleatório que o FormSubmit mostra.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

// Cantes: cada um leva a um vídeo do canal oficial do YouTube (v = id) ou a um link externo (url).
// cats: fandangos | cantes | copla (botões de filtro no index.html)
const CANTES = [
  { t: 'Fandangos', a: 'Sus primeros cantes, en Peñaflor', cats: ['fandangos'], v: 'x3S94hVMU3E' },
  { t: 'Ronda de fandangos', a: 'Sin micrófono, con Miguel de Tena · Villanueva de la Serena', cats: ['fandangos'], v: 'bbOBTJQBUvI' },
  { t: 'Fandangos en Monesterio', a: 'A Leonardo Hernández y Andy Cartagena', cats: ['fandangos'], v: 'VJc24KF_i7I' },
  { t: 'En Navidad por fandangos', a: 'Single · 2025', cats: ['fandangos'], v: '4KSKbTNkoVg' },
  { t: 'Soleá', a: 'Villanueva de la Serena (Badajoz)', cats: ['cantes'], v: 'kg0sERaXBT4' },
  { t: 'Tangos', a: 'Peligros (Granada)', cats: ['cantes'], v: 'aCwiElodIFk' },
  { t: 'Malagueñas', a: 'Cante y guitarra', cats: ['cantes'], v: 'WgTY26frXqY' },
  { t: 'Marianas', a: 'Videoclip con Javi Santiago y Tamara Vargas', cats: ['cantes'], v: '-bFQLDr8fyU' },
  { t: 'Milonga', a: 'Villanueva de la Serena (Badajoz)', cats: ['cantes'], v: 'wJb796XkG_0' },
  { t: 'Saeta', a: 'A la Virgen de la Merced · Córdoba', cats: ['cantes'], v: 'T96RK5tbeWU' },
  { t: 'El Cristo de los Faroles', a: 'Tierra de talento · Canal Sur', cats: ['copla'], url: 'https://www.canalsur.es/television/tierra-de-talento/nino-penaflor-pasa-fase-gracias_1_1269142.html' },
  { t: 'El emigrante', a: 'De Juanito Valderrama · fase de desafíos, Canal Sur', cats: ['copla'], url: 'https://www.canalsur.es/rtva/comunicacion/tierra-talento-carlos-baute-marisol_1_1276200.html' },
];

// Trajetória (linha do tempo dos "momentos" do Amparo). hi = ponto em destaque
const MOMENTOS = [
  { m: 'Infancia · Peñaflor', p: 'Las cintas del abuelo Pedro', d: 'Empieza a cantar con ocho años. Canta en casa, en el colegio y en las fiestas de su pueblo.' },
  { m: 'A los once años', p: 'Primera actuación en televisión', d: '' },
  { m: '2011 · Canal Sur', p: 'Se llama copla', d: 'La copla entra en su trayectoria.' },
  { m: '2019 · Chipiona (Cádiz)', p: 'Segundo puesto en el concurso de fandangos', d: 'Organizado por la Peña Flamenca José Mercé.', hi: true },
  { m: '2022 – 2023 · Extremadura', p: 'Villanueva de la Serena, Don Benito y Monesterio', d: 'Recitales con guitarra y rondas de fandangos.' },
  { m: '2024 · Canal Sur', p: 'Tierra de talento', d: 'Unas colombinas y «El Cristo de los Faroles».' },
  { m: '2025', p: 'Videoclip «Marianas» y «En Navidad por Fandangos»', d: 'Con Javi Santiago a la guitarra y Tamara Vargas en los coros.' },
  { m: '2026', p: 'Circuito Andaluz de Peñas y nuevos singles', d: 'Martos y Lentejí; «Mi Jaca» y «Mi compás y mi razón».' },
];

// Vídeos: canal oficial do YouTube (feed público, nov/2026). id = código do vídeo · capa em assets/img/videos/<id>.jpg (400x500).
// vertical: true = gravado em pé (o player abre em 9:16). O primeiro é o vídeo em destaque (capa horizontal videos/destacado.jpg)
const VIDEOS = [
  { id: '-bFQLDr8fyU', title: 'Marianas', sub: 'Con Javi Santiago a la guitarra y Tamara Vargas en los coros', tag: 'Videoclip oficial · 2025' },
  { id: 'epaeQcJOpkY', title: 'Actuación completa', sub: 'Don Benito (Badajoz)', tag: 'Recital', vertical: true },
  { id: '4KSKbTNkoVg', title: 'En Navidad por fandangos', sub: 'Single · 2025', tag: 'Navidad' },
  { id: 'kg0sERaXBT4', title: 'Soleá', sub: 'Villanueva de la Serena', tag: 'Cante y guitarra', vertical: true },
  { id: 'aCwiElodIFk', title: 'Tangos', sub: 'Peligros (Granada)', tag: 'En directo' },
  { id: 'WgTY26frXqY', title: 'Malagueñas', sub: 'Villanueva de la Serena', tag: 'Cante y guitarra', vertical: true },
  { id: 'bbOBTJQBUvI', title: 'Ronda de fandangos', sub: 'Con Miguel de Tena · sin micrófono', tag: 'Villanueva de la Serena' },
  { id: 'T96RK5tbeWU', title: 'Saeta', sub: 'A la Virgen de la Merced', tag: 'Córdoba' },
  { id: 'VJc24KF_i7I', title: 'Fandango en Monesterio', sub: 'A Leonardo Hernández y Andy Cartagena', tag: 'Badajoz', vertical: true },
  { id: 'Hykbvr44CZM', title: 'Fandangazo', sub: 'A Hernández y Cartagena', tag: 'Plaza de toros', vertical: true },
  { id: 'nHEjKEAjBiM', title: 'Tarde flamenca', sub: 'Peña flamenca «La Soleá»', tag: 'Palma del Río', vertical: true },
  { id: 'lmazaQumKvs', title: 'Fandango con guitarra', sub: 'Peña flamenca «La Soleá»', tag: 'Palma del Río', vertical: true },
  { id: 'x3S94hVMU3E', title: 'Fandango', sub: 'Cante y guitarra en la peña', tag: 'Peña', vertical: true },
  { id: 'wJb796XkG_0', title: 'Milonga', sub: 'Villanueva de la Serena', tag: 'Cante y guitarra', vertical: true },
  { id: '6wcOYMcBlJI', title: 'Marianas en directo', sub: 'Villanueva de la Serena', tag: 'Cante y guitarra', vertical: true },
];

// Singles (briefing): título como na plataforma · v = vídeo no canal, se houver
const GRABACIONES = [
  { t: 'Marianas (feat. Tamara Vargas)', y: 2025, p: 'Apple Music', url: 'https://music.apple.com/us/album/marianas-feat-javi-santiago-tamara-vargas-single/1845872300', v: '-bFQLDr8fyU' },
  { t: 'En Navidad por Fandangos', y: 2025, p: 'Amazon Music', url: 'https://music.amazon.in/albums/B0G2G7P9HV', v: '4KSKbTNkoVg' },
  { t: 'Mi compás y mi razón', y: 2026, p: 'Amazon Music', url: 'https://music.amazon.com/albums/B0G6VKNG35' },
  { t: 'Mi Jaca', y: 2026, p: 'Apple Music', url: 'https://music.apple.com/us/album/mi-jaca-single/1895547525' },
];

// Fotos (quadros dos vídeos oficiais) · photos/<img>.jpg · span = tamanho na grade · pos = foco do recorte
// Quando o artista enviar fotos oficiais com crédito, trocar/acrescentar aqui
// (a grade tem 4 colunas: as áreas somadas devem fechar em múltiplos de 4 para não sobrar buraco)
const GALERIA = [
  { img: 'villanueva', cap: 'Villanueva de la Serena', span: 'col-span-2 row-span-2', w: 960, h: 540, pos: '60% 50%' },
  { img: 'guitarra', cap: 'Cante y guitarra', span: 'row-span-2', w: 405, h: 720, pos: '50% 60%' },
  { img: 'pena', cap: 'En la peña', span: 'row-span-2', w: 405, h: 720, pos: '50% 40%' },
  { img: 'saeta-cordoba', cap: 'Saeta en Córdoba', span: 'col-span-2', w: 960, h: 540, pos: '40% 40%' },
  { img: 'retrato', cap: 'Videoclip «Marianas»', span: 'row-span-2', w: 600, h: 680, pos: '50% 25%' },
  { img: 'monesterio', cap: 'Monesterio', span: 'row-span-2', w: 405, h: 720, pos: '50% 40%' },
  { img: 'tangos-peligros', cap: 'Tangos en Peligros', span: 'col-span-2', w: 640, h: 360, pos: '55% 40%' },
];

// Agenda. fecha 'AAAA-MM-DD' | 'AAAA-MM' (só o mês) | '' (sem data publicada) · hora 'HH:MM' (vazio = "Horario por confirmar")
// estado: confirmado | aplazado | cancelado | realizado · entradas = bilheteria OFICIAL, se houver
// As futuras aparecem em "Próximas actuaciones" por data; as passadas vão sozinhas para o arquivo.
const EVENTOS = [
  { titulo: 'Noche de fandangos en Ronda', estado: 'realizado', fecha: '2020-01-13', recinto: 'Peña Flamenca de Ronda', ciudad: 'Ronda', region: 'Málaga', nota: 'Fecha de la noticia', url: 'https://www.andaluciainformacion.es/articulo/ronda/francisco-hurtado-morilito-actuo-en-la-pena-flamenca/202001131700392247494.amp.html', urlLabel: 'Andalucía Información' },
  { titulo: 'Circuito Andaluz de Peñas · Martos', estado: 'realizado', fecha: '2026-06-06', recinto: 'Peña Flamenca de Martos', ciudad: 'Martos', region: 'Jaén', url: 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/el-cantaor-nino-de-penaflor-en-martos', urlLabel: 'Ver programa' },
  { titulo: 'Circuito Andaluz de Peñas · Lentejí', estado: 'realizado', fecha: '2026-10-16', recinto: 'Peña Flamenca El Cantor', ciudad: 'Lentejí', region: 'Granada', url: 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/el-cantaor-nino-de-penaflor-en-lenteji', urlLabel: 'Ver programa' },
  { titulo: 'Otoño Flamenco · Mancha Real', estado: 'realizado', fecha: '2026-10', recinto: 'Peña Cultural Flamenca El Trillo', ciudad: 'Mancha Real', region: 'Jaén', nota: 'Fecha según prensa', url: 'https://lacontradejaen.eldiario.es/penaflor-mancha-real-flamenco-jaen/', urlLabel: 'La Contra de Jaén' },
  // Do Instagram do artista (nov/2026): post "mañana estaré en Riogordo…" — confirmar o dia exato
  { titulo: 'Peña Flamenca Río del Cante · Riogordo', estado: 'realizado', fecha: '2026-11', recinto: 'Peña Flamenca Río del Cante', ciudad: 'Riogordo', region: 'Málaga', nota: 'Con Juan Manuel Cadenas «El Chino» a la guitarra · Instagram', url: INSTAGRAM, urlLabel: 'Instagram' },
  // Do Instagram (post "Empezamos la temporada…"): sem data publicada — preencher fecha quando o artista confirmar
  { titulo: 'Inicio de temporada · Fuente Palmera', estado: 'realizado', fecha: '', recinto: '', ciudad: 'Fuente Palmera', region: 'Córdoba', nota: 'Según Instagram', url: INSTAGRAM, urlLabel: 'Instagram' },
  { titulo: 'Aguilar de la Frontera', estado: 'realizado', fecha: '', recinto: '', ciudad: 'Aguilar de la Frontera', region: 'Córdoba', nota: 'Según Instagram', url: INSTAGRAM, urlLabel: 'Instagram' },
];

// Fitas inclinadas abaixo do hero (mesmo componente do Amparo)
const MARQUEE = ['Cantaor de flamenco y copla', 'Peñaflor · Sevilla', 'Fandangos', 'Soleá', 'Tangos', 'Malagueñas', 'Marianas', 'Saetas', 'Copla', 'Peñas y festivales', 'Canal Sur'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Métricas: cada clique em [data-track] vira um evento no dataLayer. Sem ferramenta de análise instalada, não sai nada do site.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'mc_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${esc(t)}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// Grades abaixo da dobra: o HTML de cada uma só é montado quando a pessoa chega perto (1500px antes)
const pendingGrids = new Map();
const gridIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) renderGrid(en.target); });
}, { rootMargin: '1500px 0px' });
function renderGrid(el) {
  const job = pendingGrids.get(el);
  if (!job) return;
  pendingGrids.delete(el);
  gridIO.unobserve(el);
  el.innerHTML = job.render();
  if (job.after) job.after(el);
}
function whenNear(sel, render, after) {
  const el = $(sel);
  pendingGrids.set(el, { render, after });
  gridIO.observe(el);
}
const renderAllGrids = () => [...pendingGrids.keys()].forEach(renderGrid);
document.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) renderAllGrids(); }, true);

// ---------- CANTES (lista no estilo "Stages & festivals" do Flagship) ----------
const CAT_LABEL = { fandangos: 'Fandangos', cantes: 'Cante', copla: 'Copla' };
whenNear('#repList', () => CANTES.map((r, i) => {
  const inner = `
      <span class="font-mono text-[11px] uppercase tracking-[.2em] text-bone/45 sm:col-span-2">${pad(i + 1)} · ${esc(CAT_LABEL[r.cats[0]])}</span>
      <span class="stage-fill font-display text-4xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 lg:text-6xl">${esc(r.t)}</span>
      <span class="text-sm leading-relaxed text-bone/60 sm:col-span-3">${icon(r.v ? 'h-note' : 'h-tv', 'mr-1.5 inline h-4 w-4 align-[-3px] text-amber')}${esc(r.a)}</span>
      <span class="hidden items-center justify-end text-bone/40 transition group-hover:text-amber sm:col-span-1 sm:flex">${icon(r.v ? 'h-play' : 'h-arrow-up-right', 'h-6 w-6')}</span>`;
  const cls = 'group relative grid w-full items-center gap-2 border-b border-white/10 py-6 text-left transition hover:bg-white/[.02] sm:grid-cols-12 sm:gap-4 sm:py-7';
  return `
  <li data-cats="${r.cats.join(' ')}">
    ${r.v
      ? `<button type="button" data-video="${r.v}" aria-label="${esc(`Escuchar ${r.t} — ${r.a}`)}" class="${cls}">${inner}</button>`
      : `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${esc(`${r.t} — ${r.a} (Canal Sur, se abre en otra pestaña)`)}" class="${cls}">${inner}</a>`}
  </li>`;
}).join(''));

$('#repFilters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-filter]');
  if (!b) return;
  renderGrid($('#repList'));
  $$('[data-filter]', $('#repFilters')).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  $$('[data-cats]', $('#repList')).forEach((li) => { li.hidden = b.dataset.filter !== 'all' && !li.dataset.cats.split(' ').includes(b.dataset.filter); });
});

// ---------- TRAJETÓRIA (linha do tempo do Flagship: a linha se preenche com o scroll) ----------
let flightLine = null;
whenNear('#momentos', () => `
  <span class="flight-line absolute bottom-3 left-[7px] top-3 w-px" aria-hidden="true"></span>
  ${MOMENTOS.map((m, i) => `
  <li class="relative pb-10 last:pb-0">
    <span class="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border ${m.hi ? 'border-amber bg-amber' : 'border-amber/60 bg-ink'}">${m.hi ? '<span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink text-ink"></span>' : ''}</span>
    <p class="font-mono text-[10px] uppercase tracking-[.3em] ${m.hi ? 'text-amber' : 'text-bone/50'}">${pad(i + 1)} · ${esc(m.m)}</p>
    <p class="mt-1 font-display text-2xl uppercase leading-tight">${esc(m.p)}</p>
    ${m.d ? `<p class="mt-1 text-sm leading-relaxed text-bone/60">${esc(m.d)}</p>` : ''}
  </li>`).join('')}`, (el) => { flightLine = $('.flight-line', el); });

// ---------- VÍDEOS ----------
const [FEAT_VIDEO, ...GRID_VIDEOS] = VIDEOS;
whenNear('#videoFeatured', () => `
  <button type="button" data-video="${FEAT_VIDEO.id}" class="group relative grid w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 text-left lg:grid-cols-[1.6fr_1fr]">
    <span class="relative block aspect-video overflow-hidden">
      <img src="${IMG}videos/destacado.jpg" width="960" height="540" alt="${esc(`Manuel Cribaño — ${FEAT_VIDEO.title}`)}" class="duo absolute inset-0 h-full w-full object-cover" decoding="async">
      <span class="absolute inset-0 grid place-items-center"><span class="grid h-20 w-20 place-items-center rounded-full bg-amber text-ink shadow-[0_10px_25px_-5px_rgba(224,164,88,.7)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-1 h-8 w-8')}</span></span>
    </span>
    <span class="flex flex-col justify-center p-6 sm:p-10">
      <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-amber"><span class="pulse-dot h-2 w-2 rounded-full bg-amber text-amber"></span> ${esc(FEAT_VIDEO.tag)}</span>
      <span class="mt-3 block font-display text-5xl uppercase leading-none sm:text-6xl">${esc(FEAT_VIDEO.title)}</span>
      <span class="mt-3 block font-mono text-[11px] uppercase tracking-[.2em] text-bone/60">${esc(FEAT_VIDEO.sub)}</span>
      <span class="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bone/80 transition group-hover:text-amber">${icon('b-youtube')} Ver el videoclip</span>
    </span>
  </button>`);

whenNear('#videoGrid', () => GRID_VIDEOS.map((v, i) => `
  <button type="button" data-video="${v.id}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
    <span class="relative block aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
      <img src="${IMG}videos/${v.id}.jpg" width="400" height="500" alt="${esc(`Manuel Cribaño — ${v.title} (${v.tag})`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></span>
      <span class="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${esc(v.tag)}</span>
      <span class="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
    </span>
    <span class="mt-4 block font-display text-xl uppercase leading-tight transition group-hover:text-amber">${esc(v.title)}</span>
    <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">${esc(v.sub)}</span>
  </button>`).join('') + `
  <a href="${YOUTUBE}" target="_blank" rel="noopener" data-track="videos-youtube" class="group flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/20 p-6 text-center transition hover:border-amber" data-aos="fade-up" data-aos-delay="${(GRID_VIDEOS.length % 4) * 80}">
    <span class="grid h-16 w-16 place-items-center rounded-full border border-white/20 text-bone/75 transition group-hover:border-amber group-hover:text-amber">${icon('b-youtube', 'h-6 w-6')}</span>
    <span class="font-display text-2xl uppercase leading-none transition group-hover:text-amber">Más vídeos</span>
    <span class="font-mono text-[9px] uppercase tracking-widest text-bone/50">Ir al canal de YouTube</span>
  </a>`);

// ---------- SINGLES ----------
whenNear('#recGrid', () => GRABACIONES.map((g, i) => `
  <article class="flex flex-col rounded-2xl border border-white/10 bg-ink/60 p-6 transition hover:-translate-y-1 hover:border-amber/50" data-aos="fade-up" data-aos-delay="${i * 80}">
    <div class="flex items-center justify-between gap-3">
      <span class="grid h-11 w-11 place-items-center rounded-lg bg-amber/15 text-amber">${icon('h-note', 'h-5 w-5')}</span>
      <span class="font-display text-4xl leading-none text-amber">${pad(i + 1)}</span>
    </div>
    <p class="mt-5 font-mono text-[10px] uppercase tracking-[.3em] text-bone/50">Single · ${g.y}</p>
    <h4 class="mt-1 font-display text-2xl uppercase leading-tight">${esc(g.t)}</h4>
    <div class="mt-auto grid gap-2 pt-6">
      <a href="${g.url}" target="_blank" rel="noopener" data-track="escuchar-${esc(g.p)}" class="flex items-center justify-center gap-2 rounded-full bg-amber px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[.14em] text-ink transition hover:bg-white">${icon('h-note')} Escuchar en ${esc(g.p)}</a>
      ${g.v ? `<button type="button" data-video="${g.v}" class="flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[.14em] transition hover:border-amber hover:text-amber">${icon('h-play')} Ver el vídeo</button>` : ''}
    </div>
  </article>`).join(''));

// ---------- GALERIA ----------
whenNear('#galleryGrid', () => GALERIA.map((g, i) => `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
    <img src="${IMG}photos/${g.img}.jpg" width="${g.w}" height="${g.h}" alt="${esc(`Manuel Cribaño — ${g.cap}`)}" class="duo h-full w-full object-cover"${g.pos ? ` style="object-position:${g.pos}"` : ''} loading="lazy" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
    <span class="absolute bottom-3 left-3 translate-y-2 font-mono text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(g.cap)}</span>
  </button>`).join(''));

// ---------- AGENDA ----------
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const parseFecha = (f) => { const [y, m, d] = (f || '').split('-').map(Number); return { y, m, d: d || null }; };
const fechaTexto = (ev) => {
  if (!ev.fecha) return 'Fecha por confirmar';
  const { y, m, d } = parseFecha(ev.fecha);
  return d ? `${d} ${MESES[m - 1].slice(0, 3)} ${y}` : `${MESES[m - 1]} ${y}`;
};
// Fim do dia (ou do mês) do evento: até lá ele ainda é "próximo"
const fimEvento = (ev) => { const { y, m, d } = parseFecha(ev.fecha); return d ? new Date(y, m - 1, d, 23, 59) : new Date(y, m, 0, 23, 59); };
const hoy = new Date();
const proximos = EVENTOS.filter((ev) => ev.fecha && ev.estado !== 'realizado' && fimEvento(ev) >= hoy).sort((a, b) => a.fecha.localeCompare(b.fecha));
const pasados = EVENTOS.filter((ev) => !proximos.includes(ev)).sort((a, b) => (b.fecha || '0').localeCompare(a.fecha || '0'));
const lugar = (ev) => [ev.recinto, [ev.ciudad, ev.region].filter(Boolean).join(' · ')].filter(Boolean).join(' — ');
const ESTADO = { aplazado: 'Aplazado', cancelado: 'Cancelado' };

// Próximas: ingresso picotado (mesmo componente do Amparo). Sem datas: aviso do briefing
$('#agendaUpcoming').innerHTML = proximos.length ? proximos.map((ev) => {
  const { y, m, d } = parseFecha(ev.fecha);
  return `
  <article class="ticket mb-6 grid overflow-hidden rounded-2xl bg-bone text-ink sm:grid-cols-[1fr_220px]" style="--cut:200%">
    <div class="p-6 sm:p-8">
      <p class="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[.3em] text-wine">${ESTADO[ev.estado] ? `<span class="rounded-full bg-ink px-3 py-1 text-amber">${ESTADO[ev.estado]}</span>` : ''} ${esc(fechaTexto(ev))}</p>
      <h3 class="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">${esc(ev.titulo)}</h3>
      <dl class="mt-5 grid gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[.2em] sm:grid-cols-3">
        <div><dt class="text-ink/55">Lugar</dt><dd class="mt-1 text-xs font-bold normal-case tracking-normal">${esc(lugar(ev))}</dd></div>
        <div><dt class="text-ink/55">Hora</dt><dd class="mt-1 text-xs font-bold normal-case tracking-normal">${ev.hora ? `${esc(ev.hora)} h (hora local)` : 'Horario por confirmar'}</dd></div>
        ${ev.acceso ? `<div><dt class="text-ink/55">Acceso</dt><dd class="mt-1 text-xs font-bold normal-case tracking-normal">${esc(ev.acceso)}</dd></div>` : ''}
      </dl>
    </div>
    <div class="flex flex-col justify-center gap-2 border-t-2 border-dashed border-ink/25 p-6 sm:border-l-2 sm:border-t-0">
      <p class="text-center font-display text-6xl leading-none">${d ? pad(d) : '—'}</p>
      <p class="text-center font-mono text-[10px] uppercase tracking-[.3em] text-ink/60">${MESES[m - 1].slice(0, 3)} · ${y}</p>
      ${ev.entradas ? `<a href="${ev.entradas}" target="_blank" rel="noopener" class="mt-3 flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-bone transition hover:bg-wine">${icon('h-ticket')} Comprar entradas</a>` : ''}
      ${ev.url ? `<a href="${ev.url}" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 rounded-full border border-ink/30 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] transition hover:border-ink">Ver información del evento</a>` : ''}
    </div>
  </article>`;
}).join('') : `
  <div class="rounded-2xl border border-dashed border-white/20 bg-panel/40 p-8 text-center sm:p-10">
    <span class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber/15 text-amber">${icon('h-calendar', 'h-6 w-6')}</span>
    <p class="mx-auto mt-5 max-w-xl leading-relaxed text-bone/75">Las próximas fechas se publicarán aquí cuando estén confirmadas. También puedes seguir las novedades en Instagram.</p>
    <a href="${INSTAGRAM}" target="_blank" rel="noopener" data-track="agenda-instagram" class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-amber hover:text-amber">${icon('b-instagram')} Seguir en Instagram</a>
  </div>`;

// Arquivo: lista no mesmo desenho das linhas do repertório
$('#agendaArchive').innerHTML = pasados.map((ev) => `
  <li class="grid gap-1 border-b border-white/10 py-5 sm:grid-cols-12 sm:items-center sm:gap-4">
    <span class="font-mono text-[11px] uppercase tracking-[.2em] text-amber sm:col-span-2">${esc(fechaTexto(ev))}</span>
    <span class="font-display text-2xl uppercase leading-tight sm:col-span-4">${esc(ev.titulo)}</span>
    <span class="text-sm leading-relaxed text-bone/60 sm:col-span-4">${esc(lugar(ev))}${ev.nota ? `<span class="block font-mono text-[9px] uppercase tracking-[.2em] text-bone/45">${esc(ev.nota)}</span>` : ''}</span>
    <span class="sm:col-span-2 sm:text-right">${ev.url ? `<a href="${ev.url}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-bone/60 transition hover:text-amber">${esc(ev.urlLabel || 'Más información')} ${icon('h-arrow-up-right', 'h-3 w-3')}</a>` : ''}</span>
  </li>`).join('');

// Dados estruturados dos eventos futuros com dia definido
const ld = proximos.filter((ev) => parseFecha(ev.fecha).d && ev.estado !== 'cancelado').map((ev) => ({
  '@context': 'https://schema.org', '@type': 'MusicEvent', name: ev.titulo,
  startDate: ev.hora ? `${ev.fecha}T${ev.hora}` : ev.fecha,
  eventStatus: `https://schema.org/Event${ev.estado === 'aplazado' ? 'Postponed' : 'Scheduled'}`,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: ev.recinto || ev.ciudad, address: { '@type': 'PostalAddress', addressLocality: ev.ciudad, addressRegion: ev.region, addressCountry: 'ES' } },
  performer: { '@id': `${SITE}#manuel` },
  ...(ev.url ? { url: ev.url } : {}),
}));
if (ld.length) { const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s); }

if (location.hash) renderAllGrids();

// ---------- MODAIS ----------
let lastFocus = null;
function openModal(m) { lastFocus = document.activeElement; m.classList.add('is-open'); document.body.style.overflow = 'hidden'; requestAnimationFrame(() => $('[data-close], button', m)?.focus()); }
function closeModal(m) {
  m.classList.remove('is-open'); document.body.style.overflow = '';
  if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
  lastFocus?.focus?.();
}
$$('.modal').forEach((m) => {
  m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') $$('.modal.is-open').forEach(closeModal);
  if ($('#lightbox').classList.contains('is-open')) {
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
  }
});

// ---------- PRIVACIDADE ----------
// Sem cookies próprios. A escolha (all | essential) fica no localStorage só para não perguntar de novo.
const CONSENT_KEY = 'cribano-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// Player do YouTube (youtube-nocookie): só carrega quando a pessoa clica (o clique é a autorização).
// Quem escolheu "Solo esenciales" vê antes um aviso com a opção de abrir no YouTube.
const embedFrame = (id) => `<iframe class="h-full w-full" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Vídeo de Manuel Cribaño en YouTube" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
const embedNotice = (id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon('b-youtube', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-embed-once="${id}" class="w-full rounded-full bg-amber px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">Ver aquí</button>` : ''}
      <a href="${ytUrl(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[.2em]">Abrir en YouTube</a>
    </div>
  </div>`;
function openVideo(id) {
  const v = VIDEOS.find((x) => x.id === id);
  const frame = $('#videoFrame');
  // Vídeo gravado em pé: quadro 9:16; deitado: 16:9
  $('#videoBox').className = `flex w-full flex-col items-center ${v?.vertical ? 'max-w-sm' : 'max-w-5xl'}`;
  frame.className = `${v?.vertical ? 'aspect-[9/16] max-h-[78vh]' : 'aspect-video'} w-full overflow-hidden rounded-xl bg-panel shadow-2xl`;
  $('#videoCaption').innerHTML = `${v ? `${esc(v.title)} · ${esc(v.tag)} · ` : ''}<a href="${ytUrl(id)}" target="_blank" rel="noopener" class="text-amber hover:underline">YouTube ↗</a>`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${id}`);
  requestAnimationFrame(() => {
    if (location.protocol === 'file:') {
      frame.innerHTML = embedNotice(id, 'El vídeo solo se carga en páginas abiertas por http(s). Para probar en local, ejecuta <code class="text-amber">npm run dev</code> (o tools\\serve.ps1) y abre http://localhost:8080.', false);
    } else if (getConsent() === 'essential') {
      frame.innerHTML = embedNotice(id, 'Este vídeo se reproduce desde YouTube, que puede usar sus propias cookies. Consulta la <a href="privacidad.html" class="text-amber underline">Política de privacidad</a>.', true);
    } else {
      frame.innerHTML = embedFrame(id);
    }
  });
}
document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-embed-once]');
  if (once) { $('#videoFrame').innerHTML = embedFrame(once.dataset.embedOnce); return; }
  const b = e.target.closest('[data-video]');
  if (b) openVideo(b.dataset.video);
});

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + GALERIA.length) % GALERIA.length;
  $('#lbImg').src = `${IMG}photos/${GALERIA[lbIndex].img}.jpg`;
  $('#lbImg').alt = `Manuel Cribaño — ${GALERIA[lbIndex].cap}`;
  $('#lbCap').textContent = `${pad(lbIndex + 1)} / ${pad(GALERIA.length)} — ${GALERIA[lbIndex].cap}`;
}
$('#galleryGrid').addEventListener('click', (e) => {
  const b = e.target.closest('[data-lb-index]');
  if (!b) return;
  showLb(+b.dataset.lbIndex);
  openModal($('#lightbox'));
});
$$('[data-lb]').forEach((b) => b.addEventListener('click', () => showLb(lbIndex + (b.dataset.lb === 'next' ? 1 : -1))));

// Copiar a biografia breve (Prensa)
$$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  const label = $('[data-copy-label]', b);
  try { await navigator.clipboard.writeText($(b.dataset.copy).innerText.trim()); label.textContent = 'Copiado'; }
  catch { label.textContent = 'Selecciona y copia'; }
  setTimeout(() => { label.textContent = 'Copiar texto'; }, 2200);
}));

// Menu mobile
$('#menuOpen').addEventListener('click', () => openModal($('#mobileMenu')));
$('#menuClose').addEventListener('click', () => closeModal($('#mobileMenu')));
$$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => closeModal($('#mobileMenu'))));

// ---------- HEADER / SCROLL SPY / BOTÕES FLUTUANTES ----------
const header = $('#header');
const floaters = [$('#toTop'), $('#ctaFloat')];
const navLinks = $$('.nav-link');
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('bg-ink/85', y > 40);
  header.classList.toggle('backdrop-blur-lg', y > 40);
  header.classList.toggle('border-b', y > 40);
  header.classList.toggle('border-white/5', y > 40);
  floaters.forEach((el) => {
    el.classList.toggle('opacity-0', y < 600);
    el.classList.toggle('translate-y-4', y < 600);
    el.classList.toggle('pointer-events-none', y < 600);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
requestAnimationFrame(onScroll);

const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-140px 0px -60% 0px' });
navLinks.forEach((a) => { const sec = $(a.getAttribute('href')); if (sec) spy.observe(sec); });

// ---------- CONTADORES ----------
const counters = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = parseFloat(el.dataset.count);
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1600);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counters.unobserve(el);
  });
}, { threshold: 0.6 });
if (!reduceMotion) $$('[data-count]').forEach((el) => counters.observe(el));

// ---------- FORMULÁRIO → E-MAIL (FormSubmit, como no site do Miguel) ----------
// Campos e mensagens do briefing. O sucesso só aparece após a confirmação do servidor;
// em falha, nada é apagado e o e-mail aparece como alternativa.
const form = $('#contactForm');
const formMsg = $('#formMsg');
const btn = $('button[type="submit"]', form);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const val = (n) => (form.elements[n]?.value || '').trim();
const porDefinir = () => form.elements.porDefinir.checked;
const RULES = {
  nombre: (v) => (v ? '' : 'Escribe tu nombre y apellidos.'),
  email: (v) => (!v ? 'Escribe tu correo electrónico.' : EMAIL_RE.test(v) ? '' : 'Revisa el correo: parece incompleto (ej.: nombre@correo.com).'),
  telefono: (v) => (!v || /^[+()\d\s.-]{6,20}$/.test(v) ? '' : 'Revisa el teléfono: solo números, espacios y el prefijo (+34).'),
  tipo: (v) => (v ? '' : 'Elige el tipo de evento.'),
  localidad: (v) => (v ? '' : 'Indica la localidad y el recinto.'),
  fecha: (v) => (v || porDefinir() ? '' : 'Indica la fecha prevista o marca «Por definir».'),
  mensaje: (v) => (v ? '' : 'Escribe tu mensaje.'),
};
function check(n) {
  const msg = RULES[n](val(n));
  form.elements[n].setAttribute('aria-invalid', msg ? 'true' : 'false');
  form.elements[n].classList.toggle('!border-[#ff9b8a]', Boolean(msg));
  $(`#e-${n}`).textContent = msg;
  return !msg;
}
let tried = false;
Object.keys(RULES).forEach((n) => {
  form.elements[n].addEventListener('blur', () => { if (tried || val(n)) check(n); });
  form.elements[n].addEventListener('input', () => { if (form.elements[n].getAttribute('aria-invalid') === 'true') check(n); });
});
form.elements.porDefinir.addEventListener('change', () => {
  form.elements.fecha.disabled = porDefinir();
  if (porDefinir()) form.elements.fecha.value = '';
  if (tried) check('fecha');
});
form.elements.fecha.min = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

// Botões do site que já preenchem o formulário (data-prefill)
const PREFILL = {
  recital: { tipo: 'Peña flamenca', msg: 'Me interesa programar un recital flamenco con guitarra.\nRecinto:\nHorario previsto:' },
  copla: { tipo: 'Ciclo o programación cultural', msg: 'Me interesa una actuación con repertorio de copla.\nRecinto:\nHorario previsto:' },
  pena: { tipo: 'Peña flamenca', msg: 'Recinto:\nHorario previsto:\nPrograma del ciclo:' },
  prensa: { tipo: 'Prensa o entrevista', msg: 'Medio:\nFecha de publicación:\nMaterial que necesitas (fotografías, entrevista…):' },
};
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-prefill]');
  const p = a && PREFILL[a.dataset.prefill];
  if (!p) return;
  if (p.tipo) form.elements.tipo.value = p.tipo;
  if (!val('mensaje') || Object.values(PREFILL).some((x) => x.msg === val('mensaje'))) form.elements.mensaje.value = p.msg;
});

function busy(on) {
  btn.disabled = on;
  btn.classList.toggle('opacity-70', on);
  $('use', btn).setAttribute('href', on ? '#h-spinner' : '#h-envelope');
  $('svg', btn).classList.toggle('animate-spin', on);
  $('[data-btn-label]', btn).textContent = on ? 'Enviando…' : 'Enviar consulta';
}
const fmtDate = (d) => (d ? new Date(d + 'T12:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  tried = true;
  formMsg.classList.add('hidden');
  const bad = Object.keys(RULES).filter((n) => !check(n));
  if (bad.length) { form.elements[bad[0]].focus(); return; }
  if (val('_honey')) return; // robô

  const fecha = porDefinir() ? 'Por definir' : fmtDate(val('fecha'));
  const payload = {
    'Nombre y apellidos': val('nombre'), 'Correo electrónico': val('email'), 'Teléfono': val('telefono') || '—',
    'Tipo de evento': val('tipo'), 'Localidad y recinto': val('localidad'), 'Fecha prevista': fecha, 'Mensaje': val('mensaje'),
    _subject: `Consulta de actuación — ${val('localidad')} — ${fecha}`, _replyto: val('email'), _template: 'table', _captcha: 'false',
  };
  busy(true);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !(json.success === true || json.success === 'true')) throw new Error(json.message || `HTTP ${res.status}`);
    track('form-enviado');
    $('[data-form-body]', form).classList.add('hidden');
    const ok = $('[data-form-ok]', form);
    ok.classList.remove('hidden');
    ok.focus();
  } catch (err) {
    track('form-error');
    const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(Object.entries(payload).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `${k}: ${v}`).join('\n'))}`;
    formMsg.innerHTML = `No se ha podido enviar tu consulta. Inténtalo de nuevo o utiliza el contacto indicado en esta página: <a href="${mail}" class="font-semibold text-amber underline">${EMAIL}</a>.`;
    formMsg.classList.remove('hidden');
    console.warn('Formulario:', err);
  } finally {
    clearTimeout(timer);
    busy(false);
  }
});

// ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
// • os cantes acendem da esquerda para a direita • a linha da trajetória se preenche.
(() => {
  if (reduceMotion) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const visible = new Set(); let raf = 0;
  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    $$('#repList .stage-fill').forEach((el) => {
      const p = clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4));
      el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    });
    if (flightLine) {
      const b = flightLine.getBoundingClientRect();
      flightLine.style.setProperty('--p', `${(clamp((vh * 0.6 - b.top) / b.height) * 100).toFixed(1)}%`);
    }
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
    if (visible.size && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '150px 0px' });
  io.observe($('#cantes'));
})();

$('#year').textContent = new Date().getFullYear();

// ---------- AOS ----------
// Os estados "ocultos" do CSS só valem com .aos-ready: se o aos.js não carregar, o conteúdo continua visível
if (window.AOS && !reduceMotion) {
  document.documentElement.classList.add('aos-ready');
  AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' });
}
