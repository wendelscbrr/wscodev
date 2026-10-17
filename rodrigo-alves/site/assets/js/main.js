/* ==========================================================
   Rodrigo Alves — interações do site
   (base técnica herdada do projeto AFTERAll)
   Os conteúdos repetidos (destaque, discografia, vídeos, projetos,
   linha do tempo, canais) ficam nos arrays abaixo para facilitar a edição.
   Fonte dos dados: briefing estratégico — itens marcados "CONFIRMAR" dependem do artista.
   ========================================================== */

// ---------- DADOS ----------

// E-mail profissional: ainda não informado. Preencha para ativar o cartão de e-mail, o botão "Copiar e-mail",
// o link do rodapé e o envio do formulário por e-mail. Vazio = o formulário orienta a falar pelo Instagram.
const EMAIL = '';
const INSTAGRAM = 'https://www.instagram.com/rodrigoalves_music';
const INSTAGRAM_DM = 'https://ig.me/m/rodrigoalves_music';
const YOUTUBE = 'https://www.youtube.com/rodrigoalvesmusic';
const APPLE = 'https://music.apple.com/br/artist/rodrigo-alves/1553481499';

// Retrato oficial da seção Sobre: coloque o arquivo em assets/img/ e informe o nome aqui (ex.: 'rodrigo.webp').
const PHOTO = '';

// Lançamento em destaque (hero e seção Discografia). Link direto do álbum no Apple Music: substitua `link` quando disponível.
const FEATURED = {
  type: 'Lançamento em destaque · 2025',
  title: 'Covers & Collabs Vol. 3',
  meta: 'Heavy Metal · 2025',
  artists: 'Heavy Metal · 2025',
  text: 'Releituras de clássicos do heavy metal com cantores e instrumentistas convidados. Faixas como Destination Unknown, Dream Warriors, Run To The Hills e We’re Not Gonna Take It.',
  link: APPLE,
  hue: 8,
};

// Catálogo. cat: autoral | collab | single | part · hue = cor da capa provisória.
// Capa oficial: salve em assets/img/covers/<cover>.webp (600x600) e preencha `cover`. `link` = página do lançamento
// (hoje todos apontam para o perfil no Apple Music; troque pelos links diretos de cada lançamento).
const RELEASES = [
  { title: 'Covers & Collabs Vol. 3', sub: 'Heavy Metal', year: '2025', cat: 'collab', hue: 8 },
  { title: 'Tribute To Andre Matos', sub: 'Homenagem colaborativa', year: '2025', cat: 'single', hue: 12 },
  { title: 'Perfect Strangers', sub: 'com KAKÁ CAMPOLONGO', year: '2025', cat: 'single', hue: 24 },
  { title: 'Hot Rockin’', sub: 'Judas Priest · com Mario Pastore', year: '2025', cat: 'single', hue: 4 },
  { title: 'For Those About To Rock', sub: 'com Cristopher Clark', year: '2024', cat: 'single', hue: 16 },
  { title: 'Is This Love', sub: 'com Alexandre Ciaglia', year: '2024', cat: 'single', hue: 34 },
  { title: 'Covers & Collabs Vol. 2', sub: 'Smooth Jazz', year: '2023', cat: 'collab', hue: 38 },
  { title: 'Covers & Collabs Vol. 1', sub: 'Pop/Rock', year: '2022', cat: 'collab', hue: 28 },
  { title: 'Smiley', sub: 'Single instrumental autoral', year: '2022', cat: 'single', hue: 44 },
  { title: 'Hours', sub: 'Álbum autoral', year: '2017', cat: 'autoral', hue: 32 },
  { title: 'Spiritua', sub: 'Álbum autoral', year: '2007', cat: 'autoral', hue: 40 },
  { title: 'Retratos', sub: 'Álbum autoral', year: '2001', cat: 'autoral', hue: 26 },
  // CONFIRMAR: o briefing aponta 1997 (biografia) ou 1998 (lista de discografia)
  { title: 'Suddenly', sub: 'Álbum autoral', year: '1997–98', cat: 'autoral', hue: 36 },
  { title: 'Alexandre Ciaglia', sub: 'Hysteria · Rhythm of Love · Every Breath You Take', year: 'Participação', cat: 'part', hue: 210 },
  { title: 'Parallax', sub: 'Safe And Sound', year: 'Participação', cat: 'part', hue: 200 },
  { title: 'Rygel', sub: 'A Long Way To… · Realities… Life As It Is', year: 'Participação', cat: 'part', hue: 220 },
  { title: 'Julia Crystal', sub: 'A Journey To Shamballa', year: 'Participação', cat: 'part', hue: 195 },
  { title: 'Herman Júnior', sub: 'Doce Latitude', year: 'Participação', cat: 'part', hue: 205 },
  { title: 'Miguel Mega', sub: 'Projeto paralelo', year: 'Participação', cat: 'part', hue: 215 },
  { title: 'The Scuba Divers', sub: 'Projeto paralelo', year: 'Participação', cat: 'part', hue: 190 },
];
const CAT_LABEL = { autoral: 'Autoral', collab: 'Covers & Collabs', single: 'Single', part: 'Participação' };

// Vídeos. Sem os links oficiais, o cartão abre uma busca pelo título no canal do YouTube.
// Para ativar o player no próprio site, informe `yt` (código do vídeo, ex.: 'dQw4w9WgXcQ') — o vídeo abre no modal.
// cat: autoral | tributo
const VIDEOS = [
  { title: 'Smiley', sub: 'Trabalho instrumental autoral', cat: 'autoral', hue: 44 },
  { title: 'Tribute to Triumph', sub: 'Releitura do repertório da banda canadense Triumph', cat: 'tributo', hue: 18 },
  { title: 'Tribute to Iron Maiden', sub: 'Medley de heavy metal', cat: 'tributo', hue: 6 },
  { title: 'Hearts In Peace', sub: 'Vídeo do catálogo anterior', cat: 'autoral', hue: 30 },
  { title: 'Prayer', sub: 'Vídeo do catálogo anterior', cat: 'autoral', hue: 36 },
  { title: 'Tribute to Def Leppard', sub: 'Tributo', cat: 'tributo', hue: 14 },
];

// Projetos (briefing, seção 7 › Página Projetos)
const PROJECTS = [
  {
    icon: 'h-users', kicker: 'Releituras e convidados', title: 'Covers & Collabs',
    text: 'Série que revisita clássicos de diferentes estilos com a participação de cantores e instrumentistas convidados.',
    items: ['Vol. 1 — Pop/Rock · 2022', 'Vol. 2 — Smooth Jazz · 2023', 'Vol. 3 — Heavy Metal · 2025'],
  },
  {
    icon: 'h-sparkles', kicker: 'Composição e instrumental', title: 'Trabalho autoral',
    text: 'Desde 1994, música instrumental que combina rock, música brasileira, new age e smooth jazz.',
    items: ['Suddenly', 'Retratos · 2001', 'Spiritua · 2007', 'Hours · 2017', 'Smiley · single, 2022'],
  },
  {
    icon: 'h-bolt', kicker: 'Registros históricos e trabalhos conjuntos', title: 'Bandas e participações',
    text: 'Passagens por grupos de diferentes vertentes do rock e participações em projetos de outros artistas.',
    items: ['Viper — guitarrista (1987–1988)', 'Warkings', 'Merlin — rock progressivo (1991–1995)', 'Parallax (2009–2014)', 'Rygel · Julia Crystal · Herman Júnior'],
  },
];

// Linha do tempo (briefing, seção 3). CONFIRMAR com o artista as datas de álbuns antigos e períodos em bandas.
const TIMELINE = [
  { when: '1984', text: 'Início da trajetória musical como guitarrista e violonista.' },
  { when: '1986–1990', text: 'Primeiras bandas e experiências no rock; participação no Warkings e no Viper (1987–1988).' },
  { when: '1990', text: 'Profissionalização; ensino de música e trabalhos com bandas de covers.' },
  { when: '1991–1995', text: 'Atuação com a banda de rock progressivo Merlin.' },
  { when: '1994', text: 'Início do trabalho solo autoral instrumental.' },
  { when: '1997–2007', text: 'Primeiros álbuns solo, incluindo Suddenly, Retratos e Spiritua.' },
  { when: '1999', text: 'Início da atuação em produção musical e trabalho em estúdios (Vila do Sossêgo e R.A.Studio).' },
  { when: '2009–2014', text: 'Participação na banda Parallax.' },
  { when: '2017–2022', text: 'Lançamento de Hours, do single Smiley e de Covers & Collabs Vol. 1 — Pop/Rock.' },
  { when: '2023', text: 'Covers & Collabs Vol. 2, dedicado ao smooth jazz.' },
  { when: '2024–2025', text: 'Novos singles, participações e Covers & Collabs Vol. 3 — Heavy Metal.' },
];

// Canais oficiais (links fornecidos no briefing)
const PLATFORMS = [
  { name: 'Apple Music', icon: 'h-note', url: APPLE, handle: 'Rodrigo Alves', text: 'Álbuns, singles e colaborações disponíveis.' },
  { name: 'YouTube', icon: 'b-youtube', url: YOUTUBE, handle: '/rodrigoalvesmusic', text: 'Performances, videoclipes, covers e conteúdo audiovisual.' },
  { name: 'SoundCloud', icon: 'h-wave', url: 'https://soundcloud.com/rodrigoalves-com', handle: '/rodrigoalves-com', text: 'Faixas publicadas nessa plataforma.' },
  { name: 'Instagram', icon: 'b-instagram', url: INSTAGRAM, handle: '@rodrigoalves_music', text: 'Fotos, bastidores e anúncios de lançamentos.' },
  { name: 'Facebook', icon: 'b-facebook', url: 'https://www.facebook.com/rodrigoalvesmusic', handle: '/rodrigoalvesmusic', text: 'Lançamentos, vídeos, notícias e publicações.' },
];

const MARQUEE = ['Guitarra', 'Violão', 'Rock', 'Heavy Metal', 'Smooth Jazz', 'Música instrumental', 'Covers & Collabs', 'Produção musical', 'Desde 1984'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Métricas: cada clique em [data-track] vira um evento no dataLayer. Sem ferramenta de análise instalada, nada sai do site.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'ra_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

// Capa provisória (arte tipográfica em CSS) — vira <img> quando `cover` é informado
function coverArt(r, big = false) {
  if (r.cover) return `<img src="${IMG}covers/${esc(r.cover)}.webp" width="600" height="600" alt="${esc(`Capa de ${r.title}`)}" class="absolute inset-0 h-full w-full object-cover" loading="lazy">`;
  return `<span class="absolute inset-0 flex flex-col justify-between p-4 ${big ? 'sm:p-6' : ''}">
    <span class="font-mono text-[8px] uppercase tracking-[.3em] text-bone/55">${big ? 'Rodrigo Alves' : ''}</span>
    <span class="font-display ${big ? 'text-4xl' : 'text-2xl'} uppercase leading-[.95] text-bone">${esc(r.title)}</span>
  </span>`;
}

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${t}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- DESTAQUE ----------
$$('[data-feat]').forEach((el) => { el.textContent = FEATURED[el.dataset.feat] ?? ''; });
$$('[data-feat-link]').forEach((a) => { a.href = FEATURED.link; });
['#heroCover', '#featCover'].forEach((s) => {
  const el = $(s);
  el.style.setProperty('--h', FEATURED.hue);
  el.innerHTML = s === '#featCover' ? coverArt({ title: FEATURED.title }, true) : '';
});

// Retrato oficial
if (PHOTO) {
  const f = $('#portrait');
  f.className = 'relative overflow-hidden rounded-2xl';
  f.innerHTML = `<img src="${IMG}${esc(PHOTO)}" alt="Rodrigo Alves com a guitarra" class="aspect-[4/5] w-full object-cover" width="800" height="1000" loading="lazy">`;
}

// ---------- BIOGRAFIA COMPLETA ----------
$('#bioToggle').addEventListener('click', (e) => {
  const b = e.currentTarget;
  const open = b.getAttribute('aria-expanded') !== 'true';
  b.setAttribute('aria-expanded', String(open));
  $('#bioFull').classList.toggle('hidden', !open);
  $('span', b).textContent = open ? 'Mostrar menos' : 'Ler biografia completa';
});

// ---------- LINHA DO TEMPO ----------
$('#timeline').innerHTML = TIMELINE.map((t, i) => `
  <li class="relative pl-10" data-aos="fade-up" data-aos-delay="${(i % 4) * 50}">
    <p class="font-display text-2xl uppercase text-gold">${esc(t.when)}</p>
    <p class="mt-1 text-bone/70">${esc(t.text)}</p>
  </li>`).join('');

// ---------- FILTROS ----------
function setupFilter(group, grid) {
  $(group).addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    $$('[data-filter]', $(group)).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('[data-cat]', $(grid)).forEach((it) => { it.hidden = b.dataset.filter !== 'all' && it.dataset.cat !== b.dataset.filter; });
  });
}

// ---------- DISCOGRAFIA ----------
$('#discGrid').innerHTML = RELEASES.map((r, i) => `
  <a href="${r.link || APPLE}" target="_blank" rel="noopener" data-cat="${r.cat}" data-track="disco-${i}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 5) * 60}">
    <span class="relative block aspect-square">
      <span class="vinyl absolute inset-[4%] rounded-full"></span>
      <span class="cover-ph relative block h-full w-full overflow-hidden rounded-lg shadow-2xl shadow-black/70" style="--h:${r.hue}">
        ${coverArt(r)}
        <span class="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${CAT_LABEL[r.cat]}</span>
        <span class="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink">${icon('h-play', 'ml-1 h-7 w-7')}</span>
        </span>
      </span>
    </span>
    <span class="mt-4 block font-display text-xl uppercase leading-tight tracking-wide transition group-hover:text-gold">${esc(r.title)}</span>
    <span class="mt-1 block text-xs text-bone/60">${esc(r.sub)}</span>
    <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/45">${esc(r.year)}</span>
  </a>`).join('');
setupFilter('#discFilters', '#discGrid');

// ---------- VÍDEOS ----------
const ytSearch = (q) => `${YOUTUBE}/search?query=${encodeURIComponent(q)}`;
$('#videoGrid').innerHTML = VIDEOS.map((v, i) => {
  const inner = `
    <span class="cover-ph absolute inset-0" style="--h:${v.hue}"></span>
    <span class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></span>
    <span class="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">${v.cat === 'autoral' ? 'Autoral' : 'Tributo'}</span>
    <span class="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">${icon('h-play', 'ml-0.5 h-5 w-5')}</span>
    <span class="absolute bottom-4 left-4 right-4">
      <span class="block font-display text-2xl uppercase leading-tight sm:text-3xl">${esc(v.title)}</span>
      <span class="mt-1 block text-xs text-bone/70">${esc(v.sub)}</span>
    </span>`;
  const cls = 'group relative block aspect-video overflow-hidden rounded-xl border border-white/10 text-left';
  const aos = `data-aos="fade-up" data-aos-delay="${(i % 3) * 80}"`;
  return v.yt
    ? `<button type="button" data-yt="${esc(v.yt)}" data-cat="${v.cat}" data-title="${esc(v.title)}" class="${cls}" ${aos}>${inner}</button>`
    : `<a href="${ytSearch(v.title)}" target="_blank" rel="noopener" data-cat="${v.cat}" data-track="video-${i}" class="${cls}" ${aos} aria-label="${esc(`Assistir ${v.title} no YouTube`)}">${inner}</a>`;
}).join('');
setupFilter('#videoFilters', '#videoGrid');

// ---------- PROJETOS ----------
$('#projectsGrid').innerHTML = PROJECTS.map((p, i) => `
  <article class="group rounded-2xl border border-white/10 bg-ink/60 p-7 transition hover:-translate-y-1 hover:border-gold/50" data-aos="fade-up" data-aos-delay="${i * 80}">
    <span class="grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-gold">${icon(p.icon, 'h-5 w-5')}</span>
    <p class="mt-5 font-mono text-[10px] uppercase tracking-[.25em] text-gold">${esc(p.kicker)}</p>
    <h3 class="mt-1 font-display text-3xl uppercase">${esc(p.title)}</h3>
    <p class="mt-3 text-sm leading-relaxed text-bone/65">${esc(p.text)}</p>
    <ul class="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm text-bone/80">
      ${p.items.map((t) => `<li class="flex items-start gap-3"><span class="mt-2 h-1 w-3 shrink-0 bg-gold"></span>${esc(t)}</li>`).join('')}
    </ul>
  </article>`).join('');

// ---------- CANAIS ----------
$('#platforms').innerHTML = PLATFORMS.map((p, i) => `
  <li data-aos="fade-up" data-aos-delay="${i * 60}">
    <a href="${p.url}" target="_blank" rel="noopener" data-track="canal-${esc(p.name.toLowerCase().replace(/\s/g, ''))}" class="group flex h-full flex-col gap-3 rounded-xl border border-white/10 bg-panel/80 p-5 transition hover:border-gold">
      <span class="flex items-center justify-between">
        <span class="grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-gold">${icon(p.icon, 'h-5 w-5')}</span>
        <span class="text-bone/30 transition group-hover:text-gold">${icon('h-arrow-up-right')}</span>
      </span>
      <span class="block font-display text-xl uppercase">${esc(p.name)}</span>
      <span class="block font-mono text-[10px] tracking-wide text-gold">${esc(p.handle)}</span>
      <span class="block text-sm text-bone/55">${esc(p.text)}</span>
    </a>
  </li>`).join('');

// ---------- MODAIS ----------
let lastFocus = null;
function openModal(m) { lastFocus = document.activeElement; m.classList.add('is-open'); document.body.style.overflow = 'hidden'; requestAnimationFrame(() => $('[data-close], button, a', m)?.focus()); }
function closeModal(m) {
  m.classList.remove('is-open'); document.body.style.overflow = '';
  if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
  lastFocus?.focus?.();
}
$$('.modal').forEach((m) => {
  m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); });
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.modal.is-open').forEach(closeModal); });

// Player do YouTube (youtube-nocookie): o iframe só entra na página depois do clique
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-yt]');
  if (!b) return;
  $('#videoCaption').textContent = b.dataset.title;
  $('#videoFrame').innerHTML = location.protocol === 'file:'
    ? `<div class="grid h-full place-items-center p-6 text-center text-sm text-bone/70">O player do YouTube só funciona em páginas abertas por http(s). Rode <code class="text-gold">npm run dev</code> e abra http://localhost:8080.</div>`
    : `<iframe class="h-full w-full" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt)}?autoplay=1&rel=0" title="${esc(b.dataset.title)}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  openModal($('#videoModal'));
  track(`play-yt-${b.dataset.yt}`);
});

// Menu mobile
$('#menuOpen').addEventListener('click', () => openModal($('#mobileMenu')));
$('#menuClose').addEventListener('click', () => closeModal($('#mobileMenu')));
$$('#mobileMenu nav a').forEach((a) => a.addEventListener('click', () => closeModal($('#mobileMenu'))));

// ---------- HEADER / SCROLL SPY / TOPO ----------
const header = $('#header');
const toTop = $('#toTop');
const navLinks = $$('.nav-link');
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('bg-ink/85', y > 40);
  header.classList.toggle('backdrop-blur-lg', y > 40);
  header.classList.toggle('border-b', y > 40);
  header.classList.toggle('border-white/5', y > 40);
  toTop.classList.toggle('opacity-0', y < 600);
  toTop.classList.toggle('translate-y-4', y < 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
requestAnimationFrame(onScroll);

// Link ativo do menu: a seção que cruza a faixa logo abaixo do header
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
    if (reduceMotion) { el.textContent = target; counters.unobserve(el); return; }
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
$$('[data-count]').forEach((el) => counters.observe(el));

// ---------- CONTATO ----------
const form = $('#contatoForm');
const formMsg = $('#formMsg');
const openedAt = Date.now();
function say(text, ok) {
  formMsg.innerHTML = text;
  formMsg.className = `mt-4 text-sm ${ok ? 'text-bone' : 'text-gold'}`;
}
// Elementos que dependem do e-mail só aparecem quando EMAIL estiver preenchido
if (EMAIL) {
  $$('[data-needs-email]').forEach((el) => { el.classList.remove('hidden'); el.classList.add('flex'); });
  $('#emailCard').href = `mailto:${EMAIL}`;
  $('#emailText').textContent = EMAIL;
  $('#footerEmail').href = `mailto:${EMAIL}`;
  $('#footerEmail').textContent = EMAIL;
} else {
  $('#formLead').innerHTML = `Preencha os dados e envie. Se preferir, fale direto pelo <a href="${INSTAGRAM_DM}" target="_blank" rel="noopener" class="text-gold underline">Instagram</a>.`;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(form);
  // Robôs preenchem o campo escondido ou enviam em menos de 3 s: finge sucesso e não faz nada
  if (f.get('website') || Date.now() - openedAt < 3000) { say('Obrigado! Sua mensagem está pronta para envio.', true); return; }
  const name = f.get('nome').trim();
  const email = f.get('email').trim();
  if (!name || !email || !f.get('mensagem').trim()) { say('Preencha seu nome, e-mail e a mensagem.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Informe um e-mail válido.'); return; }
  if (!f.get('lgpd')) { say('Confirme a leitura da Política de Privacidade para podermos responder.'); return; }
  if (!EMAIL) {
    say(`O canal de e-mail ainda não foi configurado. Envie sua mensagem pelo <a href="${INSTAGRAM_DM}" target="_blank" rel="noopener" class="text-gold underline">Instagram @rodrigoalves_music</a>.`);
    return;
  }
  const subject = `Contato pelo site — ${f.get('tipo') || 'Assunto geral'} — ${name}`;
  const body = [
    'Olá, Rodrigo!',
    '',
    f.get('mensagem').trim(),
    '',
    '—',
    `Nome: ${name}`,
    `Empresa / projeto: ${f.get('empresa') || '-'}`,
    `E-mail: ${email}`,
    `Telefone: ${f.get('telefone') || '-'}`,
    `Cidade: ${f.get('cidade') || '-'}`,
    `Assunto: ${f.get('tipo') || '-'}`,
  ].join('\n');
  track('contato-enviar');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  say(`Obrigado, ${esc(name)}! Seu app de e-mail deve abrir com a mensagem pronta — é só enviar. Se nada abrir, escreva para <a href="mailto:${EMAIL}" class="text-gold underline">${EMAIL}</a>.`, true);
});
$('#copyEmail').addEventListener('click', async (e) => {
  const label = $('span', e.currentTarget);
  const old = label.textContent;
  try { await navigator.clipboard.writeText(EMAIL); label.textContent = 'Copiado!'; } catch { label.textContent = 'Selecione e copie'; }
  setTimeout(() => { label.textContent = old; }, 2500);
});

// Tipos de solicitação: o clique já preenche o formulário
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tipo]');
  if (t) form.elements.tipo.value = t.dataset.tipo;
});

$('#year').textContent = new Date().getFullYear();

// ---------- AOS ----------
// Só anima o que está abaixo da dobra; inicia na primeira interação ou 5 s após o load (fora do caminho crítico)
const aosEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
let aosTimer;
function initAOS() {
  clearTimeout(aosTimer);
  aosEvents.forEach((ev) => removeEventListener(ev, initAOS));
  if (window.AOS) AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic', disable: () => reduceMotion });
}
addEventListener('load', () => {
  aosEvents.forEach((ev) => addEventListener(ev, initAOS, { passive: true, once: true }));
  aosTimer = setTimeout(initAOS, 5000);
});
