/* ==========================================================
   Flagship — interações do site
   (mesma base dos sites de AFTERAll, Lillian Whitaker e Banda OÁZ)
   Os conteúdos repetidos (destaque, lançamentos, vídeos, trajetória,
   palcos, agenda, fotos) ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.vercel.app/flagship/site/';
// E-mail profissional: ainda não confirmado pela equipe (o briefing pede para não inventar contatos).
// Enquanto estiver vazio, o formulário copia a mensagem e abre a DM do Instagram. Preencha quando houver um endereço autorizado.
const EMAIL = '';
const DM = 'https://ig.me/m/drakemargolnick';
const INSTAGRAM = 'https://www.instagram.com/drakemargolnick/';
const SPOTIFY = 'https://open.spotify.com/artist/54CUt2S6hufxE1MTYqVpmT';

// Faixa em destaque (hero e seção Music). album = id do single no Spotify · cover = assets/img/covers/<cover>.webp
// Links vindos do smart link oficial (ffm.to/sad-parade). Trocar tudo aqui quando mudar o lançamento prioritário
const FEATURED = {
  type: 'Featured track · Single · 2026',
  title: 'Sad Parade',
  artists: 'Flagship + Pale Catherine',
  text: 'A duet with Pale Catherine, released in June 2026. Listen to “Sad Parade” on your preferred streaming platform.',
  album: '6CV5PbL5XhejnOaRys4oMB',
  cover: 'sad-parade',
  links: {
    spotify: 'https://open.spotify.com/album/6CV5PbL5XhejnOaRys4oMB',
    apple: 'https://music.apple.com/us/album/sad-parade-single/6782348201',
    amazon: 'https://music.amazon.com/albums/B0H65YKL2N',
    all: 'https://ffm.to/sad-parade',
  },
};

// Discografia (Spotify + Apple Music, conferida em out/2026). cat: album | ep | single (selo na capa)
// Singles que depois entraram em álbuns/EPs ficam de fora (o briefing pede para evitar duplicações).
// Exit Row Pt. One / Pt.2: o Spotify classifica como álbum — classificação final a confirmar com a equipe.
// Novo lançamento: capa 640x640 em covers/<cover>.webp e <cover>-320.webp, e uma linha aqui (o mais recente primeiro)
const RELEASES = [
  { title: 'Exit Row, Pt.2', type: 'Album · 13 tracks', cat: 'album', date: '2026-07-29', cover: 'exit-row-pt2', album: '0MG9CUSJTze43SdB0sWDOw' },
  { title: 'Sad Parade', type: 'Single · w/ Pale Catherine', cat: 'single', date: '2026-06-24', cover: 'sad-parade', album: '6CV5PbL5XhejnOaRys4oMB' },
  { title: 'Cilan 2.0', type: 'Single', cat: 'single', date: '2026-03-18', cover: 'cilan-2', album: '7y9B6rStzBx2KgzRpqiJOi' },
  { title: 'The Real American Way', type: 'Single', cat: 'single', date: '2026-01-28', cover: 'the-real-american-way', album: '22KvjRK7PMlKuXftIkMa2p' },
  { title: 'Carolina Called', type: 'Single', cat: 'single', date: '2025-12-03', cover: 'carolina-called', album: '6mBPhvV8ew9de4jvO5VADS' },
  { title: 'Exit Row, Pt. One', type: 'Album · 7 tracks', cat: 'album', date: '2025-10-08', cover: 'exit-row-pt1', album: '2bBlzYkbDF2qVtnaAHusMv' },
  { title: 'Wish You Were Here', type: 'Single', cat: 'single', date: '2025-08-13', cover: 'wish-you-were-here', album: '2aihCDA2uTGnGvkYi8297T' },
  { title: 'Faces on the Wall', type: 'Album · 9 tracks', cat: 'album', date: '2024-09-04', cover: 'faces-on-the-wall', album: '3xnJvfmjSxPT4LNm4TWZrG' },
  { title: 'The Ladder', type: 'EP · 4 tracks', cat: 'ep', date: '2018-04-13', cover: 'the-ladder-ep', album: '35R5mWQ40KeXkY4oemXcJH' },
  { title: 'The Electric Man', type: 'Album · 11 tracks', cat: 'album', date: '2017-03-10', cover: 'the-electric-man', album: '5CW1TVXlD940lMZR07MPTe' },
  { title: 'Faded', type: 'EP · 5 tracks', cat: 'ep', date: '2015-07-10', cover: 'faded', album: '3m9jhJJr8lv8Ay6BU879FK' },
  { title: 'Flagship', type: 'Album · 17 tracks', cat: 'album', date: '2013-10-04', cover: 'flagship', album: '43vlYvriwIC89rlS4Ki3fA' },
  { title: 'Blackbush', type: 'EP · 6 tracks', cat: 'ep', date: '2012-05-08', cover: 'blackbush', album: '1GeMkxijQVUGwrFD4eeJup' },
];

// Vídeos (canal oficial youtube.com/@flagshipband + sessões do JBTV e da Bright Antenna, out/2026).
// id = id do vídeo no YouTube · capa em assets/img/videos/<id>.webp · cat: official | live | studio | interview
// O primeiro da lista é o vídeo em destaque. Sem datas: o briefing pede para mostrar datas só quando confirmadas
const VIDEOS = [
  { id: 'GFAwb8uqUtI', title: 'Measure of a Man', sub: 'Official video', cat: 'official', from: 'Exit Row, Pt.2' },
  { id: 'qgnpFfUpQT0', title: 'Sad Parade', sub: 'Official video · w/ Pale Catherine', cat: 'official' },
  { id: 'xoNuAilqZrc', title: 'Honey Bee', sub: 'Official music video', cat: 'official' },
  { id: 'OEx9SBl615g', title: 'Guilt Trippin’', sub: 'Official music video', cat: 'official' },
  { id: 'HLdNT7JKVE4', title: 'The Ladder', sub: 'Official video', cat: 'official' },
  { id: 'WMHaBKT9Q4g', title: 'Midnight', sub: 'Official video', cat: 'official' },
  { id: 'KipHeHb5n3Q', title: 'Mexican Jackpot', sub: 'Official video', cat: 'official' },
  { id: 'hkWHNOgx3WE', title: 'I Want You', sub: 'Official video', cat: 'official' },
  { id: 'b1sontka_Hk', title: 'Life Underwater', sub: 'Official video', cat: 'official' },
  { id: 'mmZAXtvnGYY', title: 'Are You Calling', sub: 'Official video', cat: 'official' },
  { id: 'QQmd6a2jDHo', title: 'Break the Sky', sub: 'Official video', cat: 'official' },
  { id: '-ctyGd6_Ubk', title: 'The Ladder', sub: 'Live @ JBTV', cat: 'live' },
  { id: '2yynUY-ZtzM', title: 'Are You Calling', sub: 'Live @ JBTV', cat: 'live' },
  { id: 'vU22G3LtdN4', title: 'Mexican Jackpot', sub: 'Live @ JBTV', cat: 'live' },
  { id: '6ZyI3_Pl_bc', title: 'Midnight', sub: 'Live @ JBTV', cat: 'live' },
  { id: '5CXHYIJ8_ho', title: 'Burn It Up', sub: 'Live @ JBTV', cat: 'live' },
  { id: 'N8BNbvtNjrY', title: 'The Ladder', sub: 'Live in studio', cat: 'studio' },
  { id: 'Gb23fEnyM2Q', title: 'Waste Them All', sub: 'Live in studio', cat: 'studio' },
  { id: 'irOjakBKW10', title: 'Still I Wait', sub: 'Stripped down', cat: 'studio' },
  { id: '8k7dadnCgoU', title: 'Flagship on Flagship', sub: 'Interview · Bright Antenna', cat: 'interview' },
  { id: 'WaEyrCXzTgs', title: 'Flagship gives an update', sub: 'Behind the scenes', cat: 'interview' },
];

// Trajetória (briefing, seção 3 + biografia oficial no Spotify). year = rótulo livre
const TIMELINE = [
  { year: '2011', title: 'Formed in Charlotte', text: 'Drake Margolnick and Michael Finster start Flagship in Charlotte, North Carolina.' },
  { year: '2012', title: 'Blackbush', text: 'The debut EP — six tracks that set the tone.' },
  { year: '2013', title: 'Flagship', text: 'The self-titled album, with “Break the Sky”, “Are You Calling” and “Life Underwater”.' },
  { year: '2015', title: 'Faded', text: 'A five-track EP, led by the single “I Want You”.' },
  { year: '2017', title: 'The Electric Man', text: 'The second album, featuring “Mexican Jackpot”, “The Ladder” and “Midnight”.' },
  { year: '2018', title: 'The Ladder', text: 'An EP built around one of the band’s best-known songs.' },
  { year: 'Interlude', title: 'Margolnick', text: 'Drake explores a solo chapter under his own name.' },
  { year: '2024', title: 'Faces on the Wall', text: 'Flagship returns with a new album.' },
  { year: '2025', title: 'Exit Row, Pt. One', text: 'The first part of a two-part story.' },
  { year: '2026', title: 'Sad Parade & Exit Row, Pt.2', text: 'A duet with Pale Catherine — and the second half of Exit Row.', now: true },
];

// Palcos e festivais (biografia oficial no Spotify). Sem datas: é histórico, não agenda. video = sessão para assistir
const STAGES = [
  { name: 'BottleRock', place: 'Napa, California', kind: 'Festival' },
  { name: 'Shaky Knees', place: 'Atlanta, Georgia', kind: 'Festival' },
  { name: 'Forecastle', place: 'Louisville, Kentucky', kind: 'Festival' },
  { name: 'SXSW', place: 'Austin, Texas', kind: 'Festival & conference' },
  { name: 'JBTV', place: 'Chicago, Illinois', kind: 'Live TV session', video: '-ctyGd6_Ubk' },
];

// Agenda. ATENÇÃO: datas FICTÍCIAS para demonstração do layout (pedido do cliente, out/2026) — nenhum destes shows foi anunciado.
// Trocar pelas datas confirmadas antes de publicar (e então adicionar MusicEvent nos dados estruturados do index.html).
// Datas passadas saem sozinhas. O primeiro show futuro vira o ingresso em destaque; os demais entram na lista.
// status: On sale | Few tickets left | Sold out | Announced · link = ingressos (vazio = "Tickets soon")
const TOUR = 'Exit Row Tour';
const SHOWS = [
  { date: '2026-11-07', time: '8:00 PM', city: 'Charlotte', region: 'NC', country: 'USA', venue: 'The Fillmore Charlotte', status: 'On sale', note: 'Hometown show', link: '' },
  { date: '2026-11-14', time: '8:00 PM', city: 'Atlanta', region: 'GA', country: 'USA', venue: 'Terminal West', status: 'On sale', link: '' },
  { date: '2026-11-21', time: '9:00 PM', city: 'Nashville', region: 'TN', country: 'USA', venue: 'Exit/In', status: 'Sold out', link: '' },
  { date: '2026-12-05', time: '8:30 PM', city: 'Chicago', region: 'IL', country: 'USA', venue: 'Lincoln Hall', status: 'Few tickets left', link: '' },
  { date: '2027-01-16', time: '8:00 PM', city: 'Brooklyn', region: 'NY', country: 'USA', venue: 'Music Hall of Williamsburg', status: 'Announced', link: '' },
  { date: '2027-02-06', time: '7:30 PM', city: 'London', region: '', country: 'UK', venue: 'The Lexington', status: 'Announced', link: '' },
];

// Fotos da galeria oficial no Spotify · photos/<img>.webp (lado maior 640 px) · pos = foco do recorte (object-position)
const GALLERY = [
  { img: 'in-the-grass', cap: 'Tall grass', span: 'col-span-2 row-span-2', w: 640, h: 401, pos: '30% 50%' },
  { img: 'monochrome', cap: 'Black & white', span: 'row-span-2', w: 360, h: 640 },
  { img: 'alley', cap: 'Afternoon light', span: 'row-span-2', w: 514, h: 640 },
  { img: 'skyline', cap: 'Skyline', span: 'col-span-2', w: 640, h: 360 },
  { img: 'portrait', cap: 'Drake Margolnick', span: 'row-span-2', w: 543, h: 640, pos: '50% 30%' },
  { img: 'dusk', cap: 'Blue hour', span: 'row-span-2', w: 640, h: 640 },
  { img: 'on-the-rocks', cap: 'On the rocks', span: 'col-span-2', w: 640, h: 360 },
  { img: 'rooftop', cap: 'Rooftop', span: 'col-span-2 row-span-2', w: 640, h: 427 },
  { img: 'exit-row', cap: 'Exit Row', span: 'col-span-2 row-span-2', w: 661, h: 496 },
];

const MARQUEE = ['Alternative rock', 'Charlotte, NC', 'Exit Row, Pt.2 — out now', 'Sad Parade', 'Since 2011', 'A story still unfolding', 'Flagship + Pale Catherine', 'Listen now'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const spUrl = (album) => `https://open.spotify.com/album/${album}`;
const year = (d) => d.slice(0, 4);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Métricas: cada clique em [data-track] vira um evento no dataLayer. Sem ferramenta de análise instalada, não sai nada do site.
// Para medir, instale GA4/Plausible (e cite na Política de Privacidade) — os eventos já estarão prontos.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'flagship_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${esc(t)}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- DESTAQUE ----------
$$('[data-feat]').forEach((el) => {
  const k = el.dataset.feat;
  if (k === 'cover') { el.src = `${IMG}covers/${FEATURED.cover}-320.webp`; return; }
  el.textContent = k === 'meta' ? `${FEATURED.artists} · ${FEATURED.type.split('·')[1].trim()}` : FEATURED[k];
});
$$('[data-feat-link]').forEach((a) => { a.href = FEATURED.links[a.dataset.featLink]; });

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
const CAT_LABEL = { album: 'Album', ep: 'EP', single: 'Single' };
whenNear('#discGrid', () => RELEASES.map((r) => `
  <button type="button" data-album="${r.album}" class="group block text-left">
    <span class="relative block aspect-square">
      <span class="vinyl absolute inset-[4%] rounded-full"></span>
      <span class="relative block h-full w-full overflow-hidden rounded-lg shadow-2xl shadow-black/70">
        <img src="${IMG}covers/${r.cover}-320.webp" srcset="${IMG}covers/${r.cover}-320.webp 320w, ${IMG}covers/${r.cover}.webp 640w" sizes="(min-width: 1024px) 230px, (min-width: 768px) 30vw, 46vw" width="640" height="640" alt="${esc(`Cover of ${r.title}`)}" class="h-full w-full object-cover" loading="lazy" decoding="async">
        <span class="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${CAT_LABEL[r.cat]}</span>
        <span class="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-amber text-ink">${icon('h-play', 'ml-1 h-7 w-7')}</span>
        </span>
      </span>
    </span>
    <span class="mt-4 block truncate font-display text-xl uppercase leading-tight tracking-wide transition group-hover:text-amber" title="${esc(r.title)}">${esc(r.title)}</span>
    <span class="mt-1 block truncate font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">${esc(r.type)} · ${year(r.date)}</span>
  </button>`).join(''));

// ---------- VÍDEOS ----------
const [FEAT_VIDEO, ...GRID_VIDEOS] = VIDEOS;
whenNear('#videoFeatured', () => `
  <button type="button" data-video="${FEAT_VIDEO.id}" class="group relative grid w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 text-left lg:grid-cols-[1.6fr_1fr]">
    <span class="relative block aspect-video overflow-hidden">
      <img src="${IMG}videos/${FEAT_VIDEO.id}.webp" width="640" height="360" alt="${esc(`Flagship — ${FEAT_VIDEO.title}`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 grid place-items-center"><span class="grid h-20 w-20 place-items-center rounded-full bg-amber text-ink shadow-[0_10px_25px_-5px_rgba(224,164,88,.7)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-1 h-8 w-8')}</span></span>
    </span>
    <span class="flex flex-col justify-center p-6 sm:p-10">
      <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-amber"><span class="pulse-dot h-2 w-2 rounded-full bg-amber text-amber"></span> Featured video</span>
      <span class="mt-3 block font-display text-5xl uppercase leading-none sm:text-6xl">${esc(FEAT_VIDEO.title)}</span>
      <span class="mt-3 block font-mono text-[11px] uppercase tracking-[.2em] text-bone/60">${esc(FEAT_VIDEO.sub)}${FEAT_VIDEO.from ? ` · from <em class="normal-case">${esc(FEAT_VIDEO.from)}</em>` : ''}</span>
      <span class="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bone/80 transition group-hover:text-amber">${icon('b-youtube')} Watch now</span>
    </span>
  </button>`);

whenNear('#videoGrid', () => GRID_VIDEOS.map((v, i) => `
  <button type="button" data-video="${v.id}" data-cat="${v.cat}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
    <span class="relative block aspect-video overflow-hidden rounded-xl border border-white/10">
      <img src="${IMG}videos/${v.id}.webp" width="640" height="360" alt="${esc(`Flagship — ${v.title} (${v.sub})`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></span>
      <span class="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
    </span>
    <span class="mt-4 block font-display text-xl uppercase leading-tight transition group-hover:text-amber">${esc(v.title)}</span>
    <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">${esc(v.sub)}</span>
  </button>`).join(''));
setupFilter('#videoFilters', '#videoGrid');
// O vídeo em destaque some quando um filtro de outra categoria está ativo
$('#videoFilters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-filter]');
  if (b) $('#videoFeatured').hidden = !['all', FEAT_VIDEO.cat].includes(b.dataset.filter);
});

// ---------- TRAJETÓRIA ----------
let flightLine = null;
whenNear('#timeline', () => `
  <span class="flight-line absolute bottom-3 left-[7px] top-3 w-px" aria-hidden="true"></span>
  ${TIMELINE.map((t) => `
  <li class="relative pb-8 last:pb-0">
    <span class="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border ${t.now ? 'border-amber bg-amber' : 'border-amber/60 bg-ink'}">${t.now ? '<span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink text-ink"></span>' : ''}</span>
    <p class="font-mono text-[10px] uppercase tracking-[.3em] ${t.now ? 'text-amber' : 'text-bone/50'}">${esc(t.year)}</p>
    <p class="mt-1 font-display text-xl uppercase leading-tight">${esc(t.title)}</p>
    <p class="mt-1 text-sm leading-relaxed text-bone/60">${esc(t.text)}</p>
  </li>`).join('')}`, (el) => { flightLine = $('.flight-line', el); });

// ---------- SHOWS ----------
const todayISO = new Date().toISOString().slice(0, 10);
const upcoming = SHOWS.filter((s) => s.date >= todayISO).sort((a, b) => a.date.localeCompare(b.date));
const fmt = (d, o) => new Date(d + 'T12:00').toLocaleDateString('en-US', o);
const where = (s) => [s.city, s.region || s.country].join(', ');
const ticketBtn = (s, cls) => s.status === 'Sold out'
  ? `<span class="${cls} cursor-default opacity-60">Sold out</span>`
  : s.link
    ? `<a href="${s.link}" target="_blank" rel="noopener" data-track="event-${esc(s.city.toLowerCase())}" class="${cls} transition hover:bg-white hover:text-ink">${icon('h-ticket')} Tickets</a>`
    : `<span class="${cls} cursor-default">${icon('h-clock')} Tickets soon</span>`;
const [nextShow, ...laterShows] = upcoming;
$('#upcoming').innerHTML = nextShow ? `
  <article class="ticket grid overflow-hidden rounded-2xl bg-amber text-ink sm:grid-cols-[1fr_auto]" style="--cut:${matchMedia('(min-width: 640px)').matches ? '72%' : '200%'}" data-aos="fade-up">
    <span class="ticket-cut hidden sm:block" aria-hidden="true"></span>
    <div class="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
      <div class="shrink-0 text-center sm:w-28">
        <p class="font-mono text-xs font-bold uppercase tracking-[.3em]">${fmt(nextShow.date, { month: 'short' })}</p>
        <p class="font-display text-7xl leading-none">${fmt(nextShow.date, { day: '2-digit' })}</p>
        <p class="font-mono text-[10px] uppercase tracking-[.2em] text-ink/70">${fmt(nextShow.date, { weekday: 'long' })} · ${fmt(nextShow.date, { year: 'numeric' })}</p>
      </div>
      <div class="min-w-0">
        <p class="flex flex-wrap items-center gap-2"><span class="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-amber"><span class="pulse-dot h-1.5 w-1.5 rounded-full bg-amber text-amber"></span> Next show · ${esc(nextShow.status)}</span><span class="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-ink/70">${esc(TOUR)}${nextShow.note ? ` · ${esc(nextShow.note)}` : ''}</span></p>
        <h3 class="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">${esc(nextShow.city)}</h3>
        <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold"><span class="flex items-center gap-1.5">${icon('h-map-pin')} ${esc(nextShow.venue)} · ${esc(nextShow.region || nextShow.country)}</span><span class="flex items-center gap-1.5">${icon('h-clock')} ${esc(nextShow.time)}</span></p>
      </div>
    </div>
    <div class="flex items-center justify-center border-t-2 border-dashed border-ink/30 p-6 sm:border-0 sm:px-10">
      ${ticketBtn(nextShow, 'flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[.2em] text-bone sm:w-auto')}
    </div>
  </article>
  ${laterShows.length ? `
  <ul class="divide-y divide-white/10 border-b border-white/10" data-aos="fade-up">
    ${laterShows.map((s) => `
    <li class="grid items-center gap-3 py-5 sm:grid-cols-[120px_1fr_auto] sm:gap-6">
      <p class="flex items-baseline gap-2 sm:block"><span class="font-display text-4xl leading-none text-amber">${fmt(s.date, { day: '2-digit' })}</span> <span class="whitespace-nowrap font-mono text-[10px] uppercase tracking-[.2em] text-bone/60 sm:mt-1 sm:block">${fmt(s.date, { month: 'short' })} · ${fmt(s.date, { year: 'numeric' })}</span></p>
      <div class="min-w-0">
        <p class="font-display text-2xl uppercase leading-tight">${esc(where(s))}</p>
        <p class="mt-0.5 text-sm text-bone/60">${esc(s.venue)} · ${esc(s.time)} <span class="ml-2 font-mono text-[9px] uppercase tracking-widest ${s.status === 'Sold out' ? 'text-bone/40' : 'text-amber'}">${esc(s.status)}</span></p>
      </div>
      ${ticketBtn(s, 'flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] sm:w-auto')}
    </li>`).join('')}
  </ul>` : ''}` : `
  <div class="rounded-2xl border border-white/10 bg-panel/60 p-10 text-center" data-aos="fade-up">
    <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber/15 text-amber">${icon('h-calendar', 'h-6 w-6')}</span>
    <p class="mt-4 font-display text-3xl uppercase">There are no upcoming shows currently listed.</p>
    <p class="mt-2 text-bone/60">Follow Flagship on social media for announcements and updates — <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="text-amber underline">Instagram</a>, <a href="https://www.facebook.com/flagshipmusicofficial" target="_blank" rel="noopener" class="text-amber underline">Facebook</a> and <a href="${SPOTIFY}" target="_blank" rel="noopener" class="text-amber underline">Spotify</a>.</p>
  </div>`;

whenNear('#stages', () => STAGES.map((s, i) => {
  const tag = s.video ? 'button' : 'div';
  const attr = s.video ? ` type="button" data-video="${s.video}" aria-label="${esc(`Watch Flagship on ${s.name}`)}"` : '';
  return `
  <li>
    <${tag}${attr} class="group relative grid w-full items-center gap-2 border-b border-white/10 py-6 text-left transition hover:bg-white/[.02] sm:grid-cols-12 sm:gap-4 sm:py-7">
      <span class="font-mono text-[11px] uppercase tracking-[.2em] text-bone/45 sm:col-span-2">${pad(i + 1)} · ${esc(s.kind)}</span>
      <span class="stage-fill font-display text-5xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 lg:text-6xl">${esc(s.name)}</span>
      <span class="text-sm leading-relaxed text-bone/60 sm:col-span-3">${icon('h-map-pin', 'mr-1.5 inline h-4 w-4 align-[-3px] text-amber')}${esc(s.place)}</span>
      <span class="hidden items-center justify-end text-bone/40 transition group-hover:text-amber sm:col-span-1 sm:flex">${s.video ? icon('h-play', 'h-6 w-6') : ''}</span>
    </${tag}>
  </li>`;
}).join(''));

// ---------- GALERIA ----------
whenNear('#galleryGrid', () => GALLERY.map((g, i) => `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
    <img src="${IMG}photos/${g.img}.webp" width="${g.w}" height="${g.h}" alt="${esc(`Flagship — ${g.cap}`)}" class="duo h-full w-full object-cover"${g.pos ? ` style="object-position:${g.pos}"` : ''} loading="lazy" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
    <span class="absolute bottom-3 left-3 translate-y-2 font-mono text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(g.cap)}</span>
  </button>`).join(''));

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
const CONSENT_KEY = 'flagship-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// Players: o do YouTube (versão sem cookies, youtube-nocookie) e o do Spotify só carregam quando a pessoa clica
// (o clique é a autorização). Quem escolheu "Essential only" vê antes um aviso com a opção de abrir no app.
const EMBED = {
  yt: { name: 'YouTube', brand: 'b-youtube', url: ytUrl, src: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1` },
  sp: { name: 'Spotify', brand: 'b-spotify', url: spUrl, src: (id) => `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0` },
};
const embedFrame = (kind, id) => `<iframe class="h-full w-full" src="${EMBED[kind].src(id)}" title="Flagship on ${EMBED[kind].name}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" loading="eager" allowfullscreen></iframe>`;
const embedNotice = (kind, id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon(EMBED[kind].brand, 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-embed-once="${kind}:${id}" class="w-full rounded-full bg-amber px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">Play here</button>` : ''}
      <a href="${EMBED[kind].url(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[.2em]">Open on ${EMBED[kind].name}</a>
    </div>
  </div>`;
function openEmbed(kind, id, caption) {
  const frame = $('#videoFrame');
  // Spotify: player compacto (352 px) · YouTube: 16:9
  frame.className = kind === 'sp' ? 'h-[352px] w-full max-w-2xl overflow-hidden rounded-xl bg-[#1c1917] shadow-2xl' : 'aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl';
  $('#videoCaption').innerHTML = `${caption ? `${esc(caption)} · ` : ''}<a href="${EMBED[kind].url(id)}" target="_blank" rel="noopener" class="text-amber hover:underline">${EMBED[kind].name} ↗</a>`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${kind}-${id}`);
  // O modal abre ANTES de o iframe entrar, para o player inicializar já com tamanho
  requestAnimationFrame(() => {
    if (location.protocol === 'file:') {
      frame.innerHTML = embedNotice(kind, id, `The ${EMBED[kind].name} player only works on pages opened through http(s). To test locally, run <code class="text-amber">npm run dev</code> and open http://localhost:8080.`, false);
    } else if (getConsent() === 'essential') {
      frame.innerHTML = embedNotice(kind, id, `This is played by ${EMBED[kind].name}, which may set its own cookies. See our <a href="privacy.html" class="text-amber underline">Privacy Policy</a>.`, true);
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
        ${showPlay ? '<button type="button" data-spotify-allow class="w-full rounded-full bg-amber px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">Play here</button>' : ''}
        <a href="${spUrl(FEATURED.album)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[.2em]">Open on Spotify</a>
      </div>
    </div>`;
  if (location.protocol === 'file:') { box.innerHTML = notice('The Spotify player only works on pages opened through http(s). To test locally, run <code class="text-amber">npm run dev</code>.', false); return; }
  if (getConsent() === 'essential' && !spAllowed) { box.innerHTML = notice('This is played by Spotify, which may set its own cookies. See our <a href="privacy.html" class="text-amber underline">Privacy Policy</a>.', true); return; }
  track('play-spotify-featured');
  box.className = 'relative h-[352px] w-full overflow-hidden rounded-xl bg-[#1c1917]';
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
  if (once) { const [k, id] = once.dataset.embedOnce.split(/:(.+)/); $('#videoFrame').innerHTML = embedFrame(k, id); return; }
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
  if (b) { const v = VIDEOS.find((x) => x.id === b.dataset.video); openEmbed('yt', b.dataset.video, v ? `${v.title} · ${v.sub}` : ''); }
});

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  $('#lbImg').src = `${IMG}photos/${GALLERY[lbIndex].img}.webp`;
  $('#lbImg').alt = `Flagship — ${GALLERY[lbIndex].cap}`;
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
    const from = +(el.dataset.from || 0);
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1600);
      el.textContent = (from + (target - from) * (1 - Math.pow(1 - p, 3))).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counters.unobserve(el);
  });
}, { threshold: 0.6 });
if (!reduceMotion) $$('[data-count]').forEach((el) => counters.observe(el));
else $$('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });

// ---------- FORMULÁRIO DE CONTATO ----------
// Sem servidor: nada é guardado pelo site. Anti-spam: campo-armadilha + tempo mínimo de preenchimento.
// Com EMAIL preenchido: monta a mensagem e abre o app de e-mail. Sem EMAIL: copia a mensagem e abre a DM do Instagram.
// Para receber sem depender de app, troque por um serviço de formulário (ex.: Formspree) e envie via fetch.
const form = $('#contactForm');
const formMsg = $('#formMsg');
const openedAt = Date.now();
if (EMAIL) {
  $('#formHint').textContent = 'Fill in the details — your email app opens with the message ready to send.';
  $('#submitLabel').textContent = 'Send message';
} else {
  $('#submitLabel').textContent = 'Copy & send via Instagram';
}
function say(html, ok) {
  formMsg.innerHTML = html;
  formMsg.className = `mt-4 text-sm ${ok ? 'text-bone' : 'text-amber'}`;
}
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = new FormData(form);
  // Robôs preenchem o campo escondido ou enviam em menos de 3 s: finge sucesso e não faz nada
  if (f.get('website') || Date.now() - openedAt < 3000) { say('Thank you! Your message is ready to send.', true); return; }
  const name = f.get('nome').trim();
  const email = f.get('email').trim();
  const subjectIn = f.get('assunto').trim();
  const message = f.get('mensagem').trim();
  if (!name || !email || !subjectIn || !message) { say('Please fill in your name, email, subject and message.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Please enter a valid email address.'); return; }
  if (!f.get('consent')) { say('Please confirm you agree with the Privacy Policy so the team can reply.'); return; }
  const category = f.get('tipo') || 'General inquiries';
  const subject = `[${category}] ${subjectIn}`;
  const body = ['Hi Flagship team,', '', message, '', '—', `Name: ${name}`, `Email: ${email}`, `Category: ${category}`, '', `Sent from ${SITE}`].join('\n');
  track('contact-submit');
  if (EMAIL) {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    say(`Thank you, ${esc(name)}! Your email app should open with the message ready — just hit send. If nothing opened, write to <a href="mailto:${EMAIL}" class="text-amber underline">${EMAIL}</a>.`, true);
    return;
  }
  let copied = false;
  try { await navigator.clipboard.writeText(`${subject}\n\n${body}`); copied = true; } catch { /* sem permissão: mostra o texto para copiar à mão */ }
  window.open(DM, '_blank', 'noopener');
  say(copied
    ? `Thank you, ${esc(name)}! Your message was copied — paste it in the Instagram chat that just opened. If it didn't open, <a href="${DM}" target="_blank" rel="noopener" class="text-amber underline">open the DM here</a>.`
    : `Thank you, ${esc(name)}! Copy your message below and paste it in the <a href="${DM}" target="_blank" rel="noopener" class="text-amber underline">Instagram chat</a>:<textarea readonly rows="6" class="field mt-3 resize-none">${esc(`${subject}\n\n${body}`)}</textarea>`, true);
});
async function copy(btn, text, done) {
  const label = $('span', btn);
  const old = label.textContent;
  try { await navigator.clipboard.writeText(text); label.textContent = done; } catch { label.textContent = 'Select & copy'; }
  setTimeout(() => { label.textContent = old; }, 2500);
}

// Categorias e "On request": o clique já preenche o formulário
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tipo]');
  if (t) form.elements.tipo.value = t.dataset.tipo;
});

// ---------- PRESS: biografia curta / completa ----------
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
// • a linha da trajetória se preenche • os nomes dos palcos acendem da esquerda para a direita.
// Só roda com as seções na tela; com "reduzir movimento" fica tudo estático e preenchido.
(() => {
  if (reduceMotion) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const visible = new Set(); let raf = 0;
  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    $$('#stages .stage-fill').forEach((el) => {
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
  [$('#shows'), $('#about')].forEach((s) => io.observe(s));
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
