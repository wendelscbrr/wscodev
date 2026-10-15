/* ==========================================================
   AFTERAll — interações do site
   (mesma base dos sites de Lillian Whitaker e da Banda OÁZ)
   Os conteúdos repetidos (destaque, lançamentos, vídeos, sessions,
   agenda, fotos) ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.vercel.app/afterall/';
const EMAIL = 'officialafterall@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/afterallmusic.in';
const SPOTIFY = 'https://open.spotify.com/artist/1Hew6hpsPVoH8J7yBR6cJD';

// Lançamento em destaque (hero e seção Music). album = id do álbum/single no Spotify · cover = assets/img/covers/<cover>.webp
const FEATURED = {
  type: 'Latest release · Single',
  title: 'Challa',
  artists: 'AFTERAll, Mitika Kanwar',
  text: 'The newest single — and the artist’s pick on Spotify. A club anthem built for the dance floor, out now with an extended mix.',
  album: '1zSrstWnyTPd5nG3XD4rmJ',
  cover: 'challa',
};

// Discografia (Spotify, conferida em out/2026). cat: original | collab | remix — o briefing pede não misturar os tipos.
// Novo lançamento: capa 640x640 em covers/<cover>.webp e <cover>-320.webp, e uma linha aqui (o mais recente primeiro)
const RELEASES = [
  { title: 'Challa', artists: 'AFTERAll, Mitika Kanwar', type: 'Single', cat: 'collab', date: '2026-08-13', cover: 'challa', album: '1zSrstWnyTPd5nG3XD4rmJ' },
  { title: 'Raanjhan Mora', artists: 'AFTERAll, Shreya Jain, Shubham Shirule', type: 'Single', cat: 'collab', date: '2026-06-04', cover: 'raanjhan-mora', album: '6GUcCKMAaa9c3uoaoABKxf' },
  { title: 'Paranda', artists: 'AFTERAll', type: 'Single', cat: 'original', date: '2026-03-19', cover: 'paranda', album: '6aaePTEn3WFsTyWFxtyiSM' },
  { title: 'Tadke Tadke (Remixes)', artists: 'AFTERAll', type: 'Remix album · 7 tracks', cat: 'remix', date: '2026-01-08', cover: 'tadke-tadke-remixes', album: '7zLVXqLCHq2GtS1Dy8cYbT' },
  { title: 'Johri', artists: 'AFTERAll', type: 'Single', cat: 'original', date: '2025-12-11', cover: 'johri', album: '5JSKvyODNG4Z3gHviB7QTz' },
  { title: 'Saajan', artists: 'AFTERAll', type: 'Single', cat: 'original', date: '2025-10-10', cover: 'saajan', album: '5K1rdGxkpTU7GlymYzgg3M' },
  { title: 'Tadke Tadke', artists: 'AFTERAll', type: 'Single', cat: 'original', date: '2025-08-07', cover: 'tadke-tadke', album: '0r71TiNmyBc6HscXXQTvW4' },
  { title: 'Vatta Vatta', artists: 'AFTERAll', type: 'Single', cat: 'original', date: '2025-04-03', cover: 'vatta-vatta', album: '69sa70fksjBzuk9AFI7bqr' },
  { title: 'Naina Tarse', artists: 'AFTERAll, Chitralekha Sen', type: 'Single', cat: 'collab', date: '2024-06-21', cover: 'naina-tarse', album: '3MLc1DVeueiPx3NKN9q9qJ' },
  { title: 'Galliyan Returns Remix', artists: 'Ankit Tiwari · AFTERAll remix', type: 'Remix', cat: 'remix', date: '2022-10-04', cover: 'galliyan-returns', album: '19Y5A2Dg2EvHoxViB4Zz6D' },
];

// Vídeos (Reels do Instagram @afterallmusic.in, out/2026). id = código do post · capa em assets/img/videos/<id>.webp
// cat: official (clipes e visualizers) | live (apresentações) | set (momentos de DJ set e remixes) · views = contagem pública na coleta
const VIDEOS = [
  { id: 'DPnm3nxCBz4', title: 'Saajan', sub: 'Official music video', cat: 'official', views: '759K' },
  { id: 'DWEJ9bziMTR', title: 'Paranda', sub: 'Official visualizer', cat: 'official', views: '141K' },
  { id: 'DZEtI5whRmj', title: 'Raanjhan Mora', sub: 'Release · w/ Shreya Jain', cat: 'official', views: '936K' },
  { id: 'DcTXCqgIzfq', title: 'Challa', sub: 'Song ID · w/ Mitika Kanwar', cat: 'official', views: '71K' },
  { id: 'DWgcCvBiDVv', title: 'Salim Merchant didn’t see it coming', sub: 'Bolly Tech', cat: 'set', views: '9.7M' },
  { id: 'DZ6Kkr1IBvf', title: 'Cancel the Uber', sub: 'DJ set moment', cat: 'set', views: '6.5M' },
  { id: 'Dd1PG_GI9Au', title: 'Spain debut', sub: 'Habibi Please', cat: 'live', views: '3M' },
  { id: 'Dcp-U9yogGN', title: 'Who needs this remix', sub: 'DJ set moment', cat: 'set', views: '2.5M' },
  { id: 'DcfkodqolRp', title: 'A favourite remix', sub: 'Habibi Please', cat: 'set', views: '1.7M' },
  { id: 'DUU2uUfkwOS', title: 'B2B with HUGEL', sub: 'Closing the show', cat: 'live', views: '1.2M' },
  { id: 'DThWzndE0DY', title: 'Makar Sankranti', sub: 'Rooftop · Jaipur', cat: 'live', views: '1.2M' },
  { id: 'DdaUAu1I1l-', title: 'The controversial remix', sub: 'DJ set moment', cat: 'set', views: '811K' },
  { id: 'DeWBNxaMvw6', title: 'Sharaarat, tech house', sub: 'Live · London', cat: 'live', views: '124K' },
  { id: 'DcYfLFcT1tq', title: 'Raanjhan Mora live', sub: 'w/ Shreya Jain · Habibi Please', cat: 'live', views: '122K' },
  { id: 'DdRKDuKzsm_', title: 'Kolkata finale', sub: 'Habibi Please tour', cat: 'live', views: '103K' },
  { id: 'DeUW_SqtrLy', title: 'A London night', sub: 'Live · MVM', cat: 'live', views: '77K' },
];

// AFTRHRS Sessions — PROVISÓRIO: sets ao ar livre publicados no Instagram. Trocar pelos episódios oficiais da série
const SESSIONS = [
  { id: 'Ddtbtj5I681', n: '01', title: 'Balcony set', place: 'Los Angeles · USA', text: 'A full balcony set in LA — the Wake Up Sid era of Bollywood nostalgia, reworked for the after hours.', pos: '50% 40%' },
  { id: 'DYwR19VReBm', n: '02', title: 'Rooftop session', place: 'New York · USA', text: 'Skyline, dusk and a Bolly Tech edit over Manhattan.', pos: '50% 50%' },
  { id: 'DcSsKTIIbBL', n: '03', title: '2000s jam', place: 'Toronto · Canada', text: 'Romanticising the 2000s on the decks in Toronto — the sound of AFTERAll, outdoors.', pos: '50% 50%' },
];

// Agenda. Só datas confirmadas (fonte: página de turnê do Spotify). Datas passadas saem sozinhas dos próximos shows.
// status: Confirmed | Announced | Sold out · link = ingressos ou página oficial do evento
const SHOWS = [
  { date: '2026-10-23', time: '7:00 PM', city: 'Bengaluru', country: 'India', venue: 'Sunburn Union', status: 'Announced', link: 'https://open.spotify.com/concert/1AcRPBCPzkxB5LROReeghJ', linkLabel: 'Event details' },
];

// Shows recentes (posts do Instagram, ago–out/2026) — vídeo = Reel daquela noite
const PAST = [
  { month: 'Oct 2026', city: 'London', country: 'United Kingdom', venue: 'MVM', video: 'DeWBNxaMvw6' },
  { month: 'Sep 2026', city: 'Kolkata', country: 'India', venue: 'Habibi Please · tour finale', video: 'DdRKDuKzsm_' },
  { month: 'Sep 2026', city: 'Hyderabad', country: 'India', venue: 'Habibi Please', video: 'DdLWL-vvqEd' },
  { month: 'Sep 2026', city: 'Spain', country: 'Debut', venue: 'Habibi Please × Mara Rooftop', video: 'Dd1PG_GI9Au' },
  { month: 'Sep 2026', city: 'Delhi', country: 'India', venue: 'Habibi Please × Naarma', video: 'DdGOvETT6fm' },
  { month: 'Sep 2026', city: 'Bhopal', country: 'India', venue: 'Habibi Please', video: 'Dc-2QGbogJh' },
  { month: 'Sep 2026', city: 'Amsterdam', country: 'Netherlands', venue: 'Live set', video: 'Dc5UpPLPXNm' },
  { month: 'Sep 2026', city: 'Pune', country: 'India', venue: 'Habibi Please', video: 'DcuuB3LorCv' },
  { month: 'Aug 2026', city: 'Mumbai', country: 'India', venue: 'Habibi Please', video: 'DcbF3B5Iftj' },
  { month: 'Aug 2026', city: 'Toronto', country: 'Canada', venue: 'Live set', video: 'DcSsKTIIbBL' },
];

// Fotos dos carrosséis do Instagram · photos/<img>.webp (lado maior até 1280 px) e <img>-480.webp
// land: true = foto horizontal (a versão pequena tem 640 px de largura) · pos = foco do recorte (object-position)
const GALLERY = [
  { img: 'toronto-crowd', cap: 'Rooftop crowd · Toronto', span: 'col-span-2 row-span-2', w: 1280, h: 720, land: true },
  { img: 'habibi-booth', cap: 'Habibi Please · on the decks', span: 'row-span-2', w: 720, h: 900 },
  { img: 'madrid-night', cap: 'Night walk · Madrid', span: 'row-span-2', w: 960, h: 1280 },
  { img: 'habibi-lasers', cap: 'Lasers · Habibi Please', span: 'row-span-2', w: 1024, h: 1280 },
  { img: 'toronto-decks', cap: 'Live · Toronto', span: 'col-span-2', w: 1280, h: 721, land: true },
  { img: 'platinum-award', cap: 'Platinum DJ award 2026', span: 'row-span-2', w: 960, h: 1280, pos: '50% 30%' },
  { img: 'seaside', cap: 'Golden hour', span: '', w: 960, h: 1280 },
  { img: 'madrid-portrait', cap: 'Madrid', span: 'col-span-2 row-span-2', w: 1280, h: 958, land: true, pos: '60% 40%' },
  { img: 'habibi-crowd', cap: 'Packed floor', span: '', w: 720, h: 900 },
  { img: 'retiro-boat', cap: 'Retiro Park · Madrid', span: 'row-span-2', w: 960, h: 1280 },
  { img: 'city-lights', cap: 'City lights · Toronto', span: '', w: 960, h: 1280 },
  { img: 'beach-walk', cap: 'Off duty', span: '', w: 720, h: 960 },
];

// Grade do Instagram (capas de Reels recentes) — cada uma abre o post
const INSTA = ['DeNU8tnIENv', 'DdOBDEqTgdX', 'DYwR19VReBm', 'DcQwAuMokBh', 'DazauCVvpQQ', 'DcbF3B5Iftj'];

const MARQUEE = ['Beyond the Beat', 'Afro House', 'Bolly Tech', 'Into the Experience', 'Original productions', 'Live DJ sets', 'Mumbai', 'London', 'Toronto', 'Madrid'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const brand = (s) => esc(s).replace(/AFTERAll/g, '<span class="normal-case">AFTERAll</span>');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const igUrl = (id) => `https://www.instagram.com/p/${id}/`;
const spUrl = (album) => `https://open.spotify.com/album/${album}`;
const video = (id) => VIDEOS.find((v) => v.id === id) || SESSIONS.find((v) => v.id === id) || PAST.find((p) => p.video === id);
const year = (d) => d.slice(0, 4);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Métricas (RF-09): cada clique em [data-track] vira um evento no dataLayer. Sem ferramenta de análise instalada, não sai nada do site.
// Para medir, instale GA4/Plausible (e cite na Política de Privacidade) — os eventos já estarão prontos.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'afterall_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

// Fotos responsivas: versão pequena (480 px; 640 px nas horizontais) e versão maior
function photo(g, sizes, alt, cls, style = '') {
  const small = g.land ? 640 : 480;
  return `<img src="${IMG}photos/${g.img}-480.webp" srcset="${IMG}photos/${g.img}-480.webp ${small}w, ${IMG}photos/${g.img}.webp ${g.w}w" sizes="${sizes}" width="${g.w}" height="${g.h}" alt="${esc(alt)}" class="${cls}"${style ? ` style="${style}"` : ''} loading="lazy" decoding="async">`;
}

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${t}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- DESTAQUE ----------
$$('[data-feat]').forEach((el) => {
  const k = el.dataset.feat;
  if (k === 'cover') { el.src = `${IMG}covers/${FEATURED.cover}-320.webp`; return; }
  el.innerHTML = brand(k === 'meta' ? `${FEATURED.type.split('·').pop().trim()} · ${FEATURED.artists}` : FEATURED[k]);
});
$$('[data-feat-link]').forEach((a) => { a.href = spUrl(FEATURED.album); });

// ---------- HERO: vídeo do show ----------
// Baixa o vídeo só depois do load (o quadro estático é o LCP). Sem vídeo com "reduzir movimento" ou economia de dados.
(() => {
  const v = $('#heroVideo');
  if (!v || reduceMotion || navigator.connection?.saveData) return;
  addEventListener('load', () => {
    v.src = matchMedia('(max-width: 767px)').matches ? v.dataset.srcMobile : v.dataset.src;
    v.addEventListener('playing', () => v.classList.remove('opacity-0'), { once: true });
    v.play().catch(() => { /* autoplay bloqueado: fica o quadro estático */ });
  });
  // fora da tela, pausa (economiza bateria)
  new IntersectionObserver(([en]) => { if (!v.src) return; en.isIntersecting ? v.play().catch(() => {}) : v.pause(); }).observe(v);
})();

// Grades abaixo da dobra: o HTML de cada uma só é montado quando a pessoa chega perto (1500px antes),
// deixando o carregamento inicial leve. Tudo que falta é montado antes de seguir um link interno (#secao)
// ou quando a página já abre com um # no endereço, para nada "empurrar" o conteúdo num salto.
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

// Filtros (catálogo e vídeos): esconde os itens de outra categoria
function setupFilter(group, grid) {
  $(group).addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    renderGrid($(grid));
    $$('[data-filter]', $(group)).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('[data-cat]', $(grid)).forEach((it) => { it.hidden = b.dataset.filter !== 'all' && it.dataset.cat !== b.dataset.filter; });
  });
}

// ---------- DISCOGRAFIA (capa + vinil saindo) ----------
const CAT_LABEL = { original: 'Original', collab: 'Collaboration', remix: 'Remix' };
whenNear('#discGrid', () => RELEASES.map((r, i) => `
  <button type="button" data-album="${r.album}" data-cat="${r.cat}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 5) * 60}">
    <span class="relative block aspect-square">
      <span class="vinyl absolute inset-[4%] rounded-full"></span>
      <span class="relative block h-full w-full overflow-hidden rounded-lg shadow-2xl shadow-black/70">
        <img src="${IMG}covers/${r.cover}-320.webp" srcset="${IMG}covers/${r.cover}-320.webp 320w, ${IMG}covers/${r.cover}.webp 640w" sizes="(min-width: 1024px) 230px, (min-width: 768px) 30vw, 46vw" width="640" height="640" alt="${esc(`Cover of ${r.title}`)}" class="h-full w-full object-cover" loading="lazy" decoding="async">
        <span class="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${CAT_LABEL[r.cat]}</span>
        <span class="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-flame text-ink">${icon('h-play', 'ml-1 h-7 w-7')}</span>
        </span>
      </span>
    </span>
    <span class="mt-4 block font-display text-xl uppercase leading-tight tracking-wide transition group-hover:text-flame">${esc(r.title)}</span>
    <span class="mt-1 block truncate text-xs text-bone/60">${esc(r.artists)}</span>
    <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/45">${esc(r.type)} · ${year(r.date)}</span>
  </button>`).join(''));
setupFilter('#discFilters', '#discGrid');

// ---------- VÍDEOS ----------
whenNear('#liveGrid', () => VIDEOS.map((v, i) => `
  <button type="button" data-video="${v.id}" data-cat="${v.cat}" class="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-white/10 text-left" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
    <img src="${IMG}videos/${v.id}.webp" width="480" height="854" alt="${esc(`AFTERAll — ${v.title}`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></span>
    <span class="absolute left-3 top-3 max-w-[70%] truncate rounded-full bg-flame px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">${esc(v.sub)}</span>
    <span class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-flame group-hover:bg-flame group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
    <span class="absolute bottom-3 left-3 right-3">
      <span class="block font-display text-xl uppercase leading-tight sm:text-2xl">${esc(v.title)}</span>
      <span class="mt-1 flex flex-wrap items-center gap-x-3 font-mono text-[10px] uppercase tracking-[.25em] text-bone/70"><span>Instagram</span><span class="text-flame">${v.views} views</span></span>
    </span>
  </button>`).join(''));
setupFilter('#videoFilters', '#liveGrid');

// ---------- AFTRHRS SESSIONS (estilo app de streaming) ----------
let sessionBars = [];
whenNear('#sessionsGrid', () => SESSIONS.map((s, i) => `
  <article class="session group rounded-2xl border border-white/10 bg-white/[.03] p-4 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-flame/50 hover:bg-white/[.05]" data-aos="fade-up" data-aos-delay="${i * 80}">
    <button type="button" data-video="${s.id}" class="relative block aspect-[4/5] w-full overflow-hidden rounded-xl" aria-label="${esc(`Watch ${s.title} — ${s.place}`)}">
      <img src="${IMG}videos/${s.id}.webp" width="480" height="854" alt="" class="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" style="object-position:${s.pos}" loading="lazy" decoding="async">
      <span class="absolute inset-0 bg-gradient-to-br from-flame via-ember/60 to-ink opacity-70 mix-blend-multiply transition duration-500 group-hover:opacity-30"></span>
      <span class="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"></span>
      <span class="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest backdrop-blur">AFTRHRS · ${s.n}</span>
      <span class="absolute bottom-4 left-4 font-display text-6xl leading-none text-bone/90">${s.n}</span>
      <span class="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-flame text-ink shadow-[0_10px_25px_-5px_rgba(247,179,43,.7)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-0.5 h-5 w-5')}</span>
    </button>
    <div class="px-1 pt-4">
      <p class="font-mono text-[10px] uppercase tracking-[.25em] text-flame">${esc(s.place)}</p>
      <h3 class="mt-1 font-display text-2xl uppercase leading-tight">${esc(s.title)}</h3>
      <p class="mt-2 text-sm text-bone/55">${esc(s.text)}</p>
      <!-- player: a barra avança com o scroll -->
      <div class="mt-5 flex items-center gap-3">
        <span class="eq flex h-3.5 items-end" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        <span class="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"><span class="ss-bar absolute inset-y-0 left-0 rounded-full bg-flame" style="width:35%"></span></span>
        <span class="font-mono text-[10px] uppercase tracking-widest text-bone/50">Reel</span>
      </div>
    </div>
  </article>`).join(''), (el) => { sessionBars = $$('.session', el).map((s) => ({ el: s, bar: $('.ss-bar', s) })); });

// ---------- AGENDA ----------
const todayISO = new Date().toISOString().slice(0, 10);
const upcoming = SHOWS.filter((s) => s.date >= todayISO).sort((a, b) => a.date.localeCompare(b.date));
const fmt = (d, o) => new Date(d + 'T12:00').toLocaleDateString('en-US', o);
$('#upcoming').innerHTML = upcoming.length ? upcoming.map((s) => `
  <article class="ticket grid overflow-hidden rounded-2xl bg-flame text-ink sm:grid-cols-[1fr_auto]" style="--cut:${matchMedia('(min-width: 640px)').matches ? '72%' : '200%'}" data-aos="fade-up">
    <span class="ticket-cut hidden sm:block" aria-hidden="true"></span>
    <div class="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
      <div class="shrink-0 text-center sm:w-28">
        <p class="font-mono text-xs font-bold uppercase tracking-[.3em]">${fmt(s.date, { month: 'short' })}</p>
        <p class="font-display text-7xl leading-none">${fmt(s.date, { day: '2-digit' })}</p>
        <p class="font-mono text-[10px] uppercase tracking-[.2em] text-ink/70">${fmt(s.date, { weekday: 'long' })} · ${fmt(s.date, { year: 'numeric' })}</p>
      </div>
      <div class="min-w-0">
        <p class="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-flame"><span class="pulse-dot h-1.5 w-1.5 rounded-full bg-flame text-flame"></span> ${esc(s.status)}</p>
        <h3 class="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">${esc(s.city)}</h3>
        <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold"><span class="flex items-center gap-1.5">${icon('h-map-pin')} ${esc(s.venue)} · ${esc(s.country)}</span><span class="flex items-center gap-1.5">${icon('h-clock')} ${esc(s.time)}</span></p>
      </div>
    </div>
    <div class="flex items-center justify-center border-t-2 border-dashed border-ink/30 p-6 sm:border-0 sm:px-10">
      <a href="${s.link}" target="_blank" rel="noopener" data-track="event-${esc(s.city.toLowerCase())}" class="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xs uppercase tracking-[.2em] text-bone transition hover:bg-white hover:text-ink sm:w-auto">${icon('h-ticket')} ${esc(s.linkLabel || 'Tickets')}</a>
    </div>
  </article>`).join('') : `
  <div class="rounded-2xl border border-white/10 bg-panel/60 p-10 text-center" data-aos="fade-up">
    <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-flame/15 text-flame">${icon('h-calendar', 'h-6 w-6')}</span>
    <p class="mt-4 font-display text-3xl uppercase">No upcoming shows announced.</p>
    <p class="mt-2 text-bone/60">Check back soon — or follow <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="text-flame underline">@afterallmusic.in</a> for the next dates.</p>
  </div>`;

whenNear('#pastShows', () => PAST.map((p, i) => `
  <li>
    <button type="button" data-video="${p.video}" class="group relative grid w-full items-center gap-2 border-b border-white/10 py-6 text-left transition hover:bg-white/[.02] sm:grid-cols-12 sm:gap-4 sm:py-7">
      <span class="font-mono text-[11px] uppercase tracking-[.2em] text-bone/45 sm:col-span-2">${pad(i + 1)} · ${esc(p.month)}</span>
      <span class="stage-fill font-display text-5xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 sm:col-span-5 lg:text-6xl">${esc(p.city)}</span>
      <span class="text-sm leading-relaxed text-bone/60 sm:col-span-4"><span class="text-bone">${esc(p.venue)}</span> · ${esc(p.country)}</span>
      <span class="hidden items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-bone/40 transition group-hover:text-flame sm:col-span-1 sm:flex">${icon('h-play', 'h-6 w-6')}</span>
    </button>
  </li>`).join(''));

// ---------- GALERIA ----------
whenNear('#galleryGrid', () => GALLERY.map((g, i) => `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
    ${photo(g, g.span.includes('col-span-2') ? '(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw' : '(min-width: 1280px) 300px, (min-width: 768px) 24vw, 46vw', `AFTERAll — ${g.cap}`, 'duo h-full w-full object-cover', g.pos ? `object-position:${g.pos}` : '')}
    <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
    <span class="absolute bottom-3 left-3 translate-y-2 font-mono text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(g.cap)}</span>
  </button>`).join(''));

// ---------- INSTAGRAM ----------
whenNear('#instaGrid', () => INSTA.map((id, i) => `
  <a href="${igUrl(id)}" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden rounded-lg" data-aos="zoom-in" data-aos-delay="${i * 60}" aria-label="Post by @afterallmusic.in on Instagram">
    <img src="${IMG}videos/${id}.webp" width="480" height="854" alt="" class="duo h-full w-full object-cover" loading="lazy" decoding="async">
    <span class="absolute right-2 top-2 text-white/80">${icon('b-instagram', 'h-4 w-4')}</span>
    <span class="absolute inset-0 bg-flame/0 transition group-hover:bg-flame/40"></span>
  </a>`).join(''));

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
const CONSENT_KEY = 'afterall-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// Players: o oficial do Instagram (Reels) e o do Spotify só carregam quando a pessoa clica para assistir/ouvir
// (o clique é a autorização). Quem escolheu "Essential only" vê antes um aviso com a opção de abrir no app.
const EMBED = {
  ig: { name: 'Instagram', brand: 'b-instagram', url: igUrl, src: (id) => `https://www.instagram.com/p/${id}/embed/` },
  sp: { name: 'Spotify', brand: 'b-spotify', url: spUrl, src: (id) => `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0` },
};
const embedFrame = (kind, id) => `<iframe class="h-full w-full" src="${EMBED[kind].src(id)}" title="AFTERAll on ${EMBED[kind].name}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" loading="eager" allowfullscreen></iframe>`;
const embedNotice = (kind, id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon(EMBED[kind].brand, 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-embed-once="${kind}:${id}" class="w-full rounded-full bg-flame px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] text-ink">Play here</button>` : ''}
      <a href="${EMBED[kind].url(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center font-display text-xs uppercase tracking-[.2em]">Open on ${EMBED[kind].name}</a>
    </div>
  </div>`;
function openEmbed(kind, id, caption) {
  const frame = $('#videoFrame');
  // Spotify: player compacto (352 px) · Instagram: player vertical
  frame.className = kind === 'sp' ? 'h-[352px] w-full overflow-hidden rounded-xl bg-[#1c1c1e] shadow-2xl' : 'h-[80vh] max-h-[760px] w-full overflow-hidden rounded-xl bg-black shadow-2xl';
  $('#videoCaption').innerHTML = `${caption ? `${brand(caption)} · ` : ''}<a href="${EMBED[kind].url(id)}" target="_blank" rel="noopener" class="text-flame hover:underline">${EMBED[kind].name} ↗</a>`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${kind}-${id}`);
  // O modal abre ANTES de o iframe entrar, para o player inicializar já com tamanho
  requestAnimationFrame(() => {
    if (location.protocol === 'file:') {
      frame.innerHTML = embedNotice(kind, id, `The ${EMBED[kind].name} player only works on pages opened through http(s). To test locally, run <code class="text-flame">npm run dev</code> and open http://localhost:8080.`, false);
    } else if (getConsent() === 'essential') {
      frame.innerHTML = embedNotice(kind, id, `This is played by ${EMBED[kind].name}, which may set its own cookies. See our <a href="privacy.html" class="text-flame underline">Privacy Policy</a>.`, true);
    } else {
      frame.innerHTML = embedFrame(kind, id);
    }
  });
}
// Player do destaque: carrega o Spotify DENTRO da caixa da seção Music e já começa a tocar.
// Usa a iFrame API oficial (o script só é baixado no clique). Sem login no Spotify, o player toca a prévia de 30 s.
let spController = null;
let spAllowed = false;
function loadSpotifyBox() {
  const box = $('#spotifyBox');
  if (spController) { spController.play(); return; }
  const notice = (text, showPlay) => `
    <div class="flex flex-col items-center gap-4">
      <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon('b-spotify', 'h-7 w-7')}</span>
      <p class="max-w-sm text-sm text-bone/70">${text}</p>
      <div class="flex w-full max-w-xs flex-col gap-2">
        ${showPlay ? '<button type="button" data-spotify-allow class="w-full rounded-full bg-flame px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] text-ink">Play here</button>' : ''}
        <a href="${spUrl(FEATURED.album)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center font-display text-xs uppercase tracking-[.2em]">Open on Spotify</a>
      </div>
    </div>`;
  if (location.protocol === 'file:') { box.innerHTML = notice('The Spotify player only works on pages opened through http(s). To test locally, run <code class="text-flame">npm run dev</code>.', false); return; }
  if (getConsent() === 'essential' && !spAllowed) { box.innerHTML = notice('This is played by Spotify, which may set its own cookies. See our <a href="privacy.html" class="text-flame underline">Privacy Policy</a>.', true); return; }
  track('play-spotify-featured');
  box.className = 'relative h-[352px] w-full overflow-hidden rounded-xl bg-[#1c1c1e]';
  box.innerHTML = `<div class="absolute inset-0 grid place-items-center text-bone/50"><span class="eq flex h-3.5 items-end"><span></span><span></span><span></span><span></span></span></div><div class="relative z-10"><div id="spotifyEmbed"></div></div>`;
  const create = (API) => API.createController($('#spotifyEmbed'), { uri: `spotify:album:${FEATURED.album}`, width: '100%', height: 352 }, (c) => {
    spController = c;
    c.addListener('ready', () => c.play());
  });
  if (window.SpotifyIframeApi) { create(window.SpotifyIframeApi); return; }
  window.onSpotifyIframeApiReady = (API) => { window.SpotifyIframeApi = API; create(API); };
  const s = document.createElement('script');
  s.src = 'https://open.spotify.com/embed/iframe-api/v1';
  s.async = true;
  document.body.appendChild(s);
}

document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-embed-once]');
  if (once) { const [k, id] = once.dataset.embedOnce.split(':'); $('#videoFrame').innerHTML = embedFrame(k, id); return; }
  if (e.target.closest('[data-spotify-allow]')) { spAllowed = true; loadSpotifyBox(); return; }
  const feat = e.target.closest('[data-spotify-featured]');
  if (feat) {
    // o botão do hero leva até a caixa do player na seção Music
    if (!feat.closest('#spotifyBox')) $('#spotifyBox').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    loadSpotifyBox();
    return;
  }
  const al = e.target.closest('[data-album]');
  if (al) { const r = RELEASES.find((x) => x.album === al.dataset.album); openEmbed('sp', al.dataset.album, r ? `${r.title} · ${year(r.date)}` : ''); return; }
  const b = e.target.closest('[data-video]');
  if (b) { const v = video(b.dataset.video); openEmbed('ig', b.dataset.video, v ? (v.title || v.city) : ''); }
});

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  $('#lbImg').src = `${IMG}photos/${GALLERY[lbIndex].img}.webp`; // maior versão de cada foto
  $('#lbImg').alt = `AFTERAll — ${GALLERY[lbIndex].cap}`;
  $('#lbCap').textContent = `${pad(lbIndex + 1)} / ${pad(GALLERY.length)} — ${GALLERY[lbIndex].cap}`;
}
$('#galleryGrid').addEventListener('click', (e) => {
  const b = e.target.closest('[data-lb-index]');
  if (!b) return;
  showLb(+b.dataset.lbIndex);
  openModal($('#lightbox'));
});
$$('[data-lb]').forEach((b) => b.addEventListener('click', () => showLb(lbIndex + (b.dataset.lb === 'next' ? 1 : -1))));

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
    const dec = +(el.dataset.decimals || 0);
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1600);
      el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counters.unobserve(el);
  });
}, { threshold: 0.6 });
$$('[data-count]').forEach((el) => counters.observe(el));

// ---------- FORMULÁRIO DE CONTRATAÇÃO (monta a mensagem e abre o app de e-mail) ----------
// Sem servidor: nada é guardado pelo site. Anti-spam: campo-armadilha + tempo mínimo de preenchimento.
// Para receber sem depender do app de e-mail, troque por um serviço de formulário (ex.: Formspree) e envie via fetch.
const form = $('#bookingForm');
const formMsg = $('#formMsg');
const openedAt = Date.now();
function say(text, ok) {
  formMsg.innerHTML = text;
  formMsg.className = `mt-4 text-sm ${ok ? 'text-bone' : 'text-flame'}`;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(form);
  // Robôs preenchem o campo escondido ou enviam em menos de 3 s: finge sucesso e não faz nada
  if (f.get('website') || Date.now() - openedAt < 3000) { say('Thank you! Your request is ready to send.', true); return; }
  const name = f.get('nome').trim();
  const email = f.get('email').trim();
  if (!name || !email || !f.get('mensagem').trim()) { say('Please fill in your name, email and message.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Please enter a valid email address.'); return; }
  if (!f.get('lgpd')) { say('Please confirm you agree with the Privacy Policy so the team can reply.'); return; }
  const date = f.get('data') ? fmt(f.get('data'), { month: 'long', day: 'numeric', year: 'numeric' }) : '-';
  const where = [f.get('cidade'), f.get('pais')].filter(Boolean).join(', ') || '-';
  const subject = `Booking request — ${f.get('tipo') || 'Inquiry'} — ${where !== '-' ? where : name}`;
  const body = [
    'Hi AFTERAll team,',
    '',
    f.get('mensagem').trim(),
    '',
    '—',
    `Name: ${name}`,
    `Company / organization: ${f.get('empresa') || '-'}`,
    `Email: ${email}`,
    `Opportunity: ${f.get('tipo') || '-'}`,
    `Location: ${where}`,
    `Preferred date: ${date}`,
    '',
    `Sent from ${SITE}`,
  ].join('\n');
  track('booking-submit');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  say(`Thank you, ${esc(name)}! Your email app should open with the request ready — just hit send. If nothing opened, write to <a href="mailto:${EMAIL}" class="text-flame underline">${EMAIL}</a>.`, true);
});
async function copy(btn, text, done) {
  const label = $('span', btn);
  const old = label.textContent;
  try { await navigator.clipboard.writeText(text); label.textContent = done; } catch { label.textContent = 'Select & copy'; }
  setTimeout(() => { label.textContent = old; }, 2500);
}
$('#copyEmail').addEventListener('click', (e) => copy(e.currentTarget, EMAIL, 'Copied!'));

// Tipos de oportunidade: o clique já preenche o formulário
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tipo]');
  if (t) form.elements.tipo.value = t.dataset.tipo;
});

// ---------- PRESS KIT: biografia curta / completa ----------
$$('[data-bio]').forEach((b) => b.addEventListener('click', () => {
  $$('[data-bio]').forEach((x) => { const on = x === b; x.setAttribute('aria-pressed', String(on)); x.setAttribute('aria-selected', String(on)); });
  $('#bio-short').hidden = b.dataset.bio !== 'short';
  $('#bio-full').hidden = b.dataset.bio !== 'full';
}));
$('#copyBio').addEventListener('click', (e) => {
  const panel = $('#bio-short').hidden ? $('#bio-full') : $('#bio-short');
  copy(e.currentTarget, $$('p', panel).map((p) => p.textContent.trim()).join('\n\n'), 'Bio copied!');
});

// ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
// • as cidades da agenda acendem da esquerda para a direita • nas sessions, a barra do player avança como se tocasse.
// Só roda com as seções na tela; com "reduzir movimento" fica tudo estático e preenchido.
(() => {
  if (reduceMotion) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const visible = new Set(); let raf = 0;
  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    $$('#pastShows .stage-fill').forEach((el) => {
      const p = clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4));
      el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    });
    sessionBars.forEach(({ el, bar }, n) => {
      const b = el.getBoundingClientRect();
      bar.style.width = `${(clamp((vh - b.top) / (vh + b.height) * 1.15 - 0.05 + n * 0.04) * 100).toFixed(1)}%`;
    });
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
    if (visible.size && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '150px 0px' });
  [$('#tour'), $('#sessions')].forEach((s) => io.observe(s));
})();

$('#year').textContent = new Date().getFullYear();

// ---------- AOS ----------
// AOS (só anima o que está abaixo da dobra): inicia na primeira interação ou 5 s após o load,
// fora do caminho crítico da primeira pintura
const aosEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
let aosTimer;
function initAOS() {
  clearTimeout(aosTimer);
  aosEvents.forEach((ev) => removeEventListener(ev, initAOS));
  if (window.AOS) AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' });
}
aosEvents.forEach((ev) => addEventListener(ev, initAOS, { once: true, passive: true }));
window.addEventListener('load', () => { aosTimer = setTimeout(initAOS, 5000); });
