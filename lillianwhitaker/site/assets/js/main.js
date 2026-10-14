/* ==========================================================
   Lillian Whitaker Music — interações do site
   (mesma base do site da Banda OÁZ)
   Os conteúdos repetidos (destaque, músicas/vídeos, lançamentos,
   playlists, fotos) ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.com/lillianwhitaker/';
const EMAIL = 'whitaker.lillian12@gmail.com';
const TIKTOK = 'https://www.tiktok.com/@lillaymae';
const INSTAGRAM = 'https://www.instagram.com/lillaymae/';

// Músicas que ela já gravou nas redes (TikTok @lillaymae, out/2026). id = vídeo do TikTok.
// views: contagem pública na data da coleta · cover: true = tem capa em assets/img/videos/<id>.webp e entra na grade de Vídeos
const SONGS = [
  { id: '7606089891608300814', title: '500 Miles', artist: 'Peter, Paul and Mary', views: '9M', cover: true },
  { id: '7682594801706863885', title: 'My All', artist: 'Mariah Carey', views: '8M', cover: true },
  { id: '7583098194008001805', title: 'Good Morning Gorgeous', artist: 'Mary J. Blige', views: '6.5M', cover: true },
  { id: '7591352967320702263', title: 'You Stole the Show', artist: 'Sienna Spiro', views: '5.5M', cover: true },
  { id: '7592002901170474254', title: 'Die on This Hill', artist: 'Sienna Spiro', views: '5.4M', cover: true },
  { id: '7621280477814574349', title: 'Creep', artist: 'Radiohead', views: '5.3M', cover: true },
  { id: '7642783580816428301', title: 'Memory', artist: 'Cats', views: '4.5M', cover: true },
  { id: '7606154053743070477', title: 'Never Enough', artist: 'The Greatest Showman', views: '1.9M', cover: true },
  { id: '7636846575062371598', title: 'Human Nature', artist: 'Michael Jackson', views: '1.4M', cover: true },
  { id: '7623872269298715917', title: 'My Way', artist: 'Frank Sinatra', views: '1.1M', cover: true },
  { id: '7639185539731557645', title: 'He Has Done Marvelous Things', artist: 'Gospel', views: '825K', cover: true },
  { id: '7613624535341878559', title: 'Delta Dawn', artist: 'Tanya Tucker', views: '678K' },
  { id: '7606821645273074957', title: 'Super Trouper', artist: 'ABBA', views: '673K', cover: true },
  { id: '7625061007093763342', title: 'Because He Lives', artist: 'Hymn', views: '640K', cover: true },
  { id: '7681140933047438605', title: 'Love', artist: 'Keyshia Cole', views: '577K' },
  { id: '7610879407149894926', title: 'Skyfall', artist: 'Adele', views: '448K', cover: true },
  { id: '7611245439743954189', title: 'River Lullaby', artist: 'The Prince of Egypt', views: '333K' },
  { id: '7648864242115939597', title: 'From This Moment On', artist: 'Shania Twain', views: '300K' },
  { id: '7607919179278175501', title: 'Wild Mountain Thyme', artist: 'Irish folk', views: '226K' },
  { id: '7618451492445392142', title: 'Moon River', artist: 'Breakfast at Tiffany’s', views: '152K' },
  { id: '7608654962674961677', title: 'Like Real People Do', artist: 'Hozier', views: '120K' },
  { id: '7649959813127982350', title: 'Once Upon a December', artist: 'Anastasia', views: '103K' },
  { id: '7606528388458728717', title: 'Tennessee Whiskey', artist: 'Chris Stapleton', views: '95K' },
  { id: '7695148056202726670', title: 'I Love You Lord Today', artist: 'Worship', views: '7K', cover: true },
];

// Destaque (hero e seção Music). Enquanto não há lançamento oficial confirmado, destaca uma das performances mais vistas.
// Para um lançamento: troque os textos e aponte video para o clipe (id do TikTok) ou use link (Spotify, Apple Music…).
const FEATURED = {
  type: 'Featured performance',
  title: 'My All',
  sub: 'Mariah Carey cover',
  stat: '8M views',
  text: 'One of her most-watched performances — a song she admits took more takes than she can count, carried by a soaring vocal that has reached millions of listeners on TikTok.',
  video: '7682594801706863885',
  link: null,
};

// Lançamentos oficiais (singles, EPs, álbuns) — grade com capa e vinil, como na OÁZ. Ex.:
// { title: 'Nome', sub: 'Single', cover: 'nome', year: 2026, link: 'https://open.spotify.com/…' }
// cover: assets/img/covers/<cover>.webp (640x640) e <cover>-320.webp
const RELEASES = [];

// Playlists da seção "Work with me" (3 humores do repertório) · img: assets/img/photos/<img> · total: duração exibida (s)
const PLAYLISTS = [
  { title: 'Pop & R&B classics', tag: 'Playlist · Pop', text: 'The songs everybody knows, in her own key.', img: 'red-dress', pos: '50% 25%', songs: ['7682594801706863885', '7636846575062371598', '7606821645273074957'], total: 1460 },
  { title: 'Stage & screen', tag: 'Playlist · Musicals', text: 'Broadway, film and the big ballads.', img: 'arena', pos: '50% 35%', songs: ['7642783580816428301', '7606154053743070477', '7610879407149894926'], total: 1310 },
  { title: 'Faith & worship', tag: 'Playlist · Sunday', text: 'Hymns and worship songs close to her heart.', img: 'piano-performance', pos: '50% 20%', songs: ['7625061007093763342', '7639185539731557645', '7695148056202726670'], total: 1190 },
];

// Fotos do Instagram @lillaymae · photos/<img>.webp (até 960 px) e <img>-480.webp · pos = foco do recorte (object-position)
const GALLERY = [
  { img: 'dove-awards-red-carpet', cap: '57th GMA Dove Awards · Nashville', span: 'row-span-2', pos: '50% 30%', w: 960, h: 1280 },
  { img: 'beach', cap: 'By the ocean', span: 'col-span-2 row-span-2', w: 960, h: 960 },
  { img: 'red-dress', cap: 'Sunday best', span: 'row-span-2', pos: '50% 30%' },
  { img: 'lakeside', cap: 'Lakeside', span: 'row-span-2', pos: '50% 35%' },
  { img: 'el-angelito', cap: 'On the road', span: '', w: 960, h: 960 },
  { img: 'white-coat', cap: 'Winter whites', span: '', pos: '50% 30%' },
  { img: 'arena', cap: 'Before the show', span: 'col-span-2', pos: '50% 35%' },
  { img: 'fur-coat', cap: 'Holiday season', span: 'row-span-2', pos: '50% 30%' },
  { img: 'pumpkin-patch', cap: 'Autumn evenings', span: '', w: 960, h: 1280 },
  { img: 'striped-dress', cap: 'Spring', span: '', pos: '50% 30%' },
  { img: 'camel-coat', cap: 'Church day', span: 'col-span-2', pos: '50% 30%' },
];

const INSTA = ['dove-awards-red-carpet', 'lakeside', 'piano-performance', 'beach', 'red-dress', 'fur-coat'];

const MARQUEE = ['Music that speaks beyond words', 'Layered harmonies', 'Montgomery · Texas', 'Pop & R&B classics', 'Musical theatre', 'Folk & country', 'Worship', 'Covers'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const song = (id) => SONGS.find((s) => s.id === id);
const ttUrl = (id) => `${TIKTOK}/video/${id}`;

// Fotos responsivas: 480 px e versão maior (até 960 px)
function photo(name, sizes, alt, cls, { w = 960, h = 1200, style = '' } = {}) {
  return `<img src="${IMG}photos/${name}-480.webp" srcset="${IMG}photos/${name}-480.webp 480w, ${IMG}photos/${name}.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" class="${cls}"${style ? ` style="${style}"` : ''} loading="lazy" decoding="async">`;
}

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${t}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- DESTAQUE ----------
$$('[data-feat]').forEach((el) => {
  const k = el.dataset.feat;
  el.textContent = k === 'meta' ? `${FEATURED.sub} · ${FEATURED.stat}` : FEATURED[k];
});

// Grades abaixo da dobra (setlist, vídeos, lançamentos, playlists, fotos, Instagram): o HTML de cada uma só é montado
// quando a pessoa chega perto (1500px antes), deixando o carregamento inicial leve.
// Para nada "empurrar" o conteúdo num salto, tudo que falta é montado antes de seguir um link
// interno (#secao) ou quando a página já abre com um # no endereço.
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

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- SETLIST (papel colado no palco) ----------
whenNear('#setlist', () => SONGS.slice(0, 18).map((s, i) => `
  <li><button type="button" data-video="${s.id}" class="text-left transition hover:text-[#c45f00]">${i === 1 ? `<span class="circled">${esc(s.title)}</span>` : esc(s.title)}</button> <span class="font-sans text-[11px] text-ink/50">${esc(s.artist)}</span></li>`).join(''));

// ---------- VÍDEOS ----------
whenNear('#liveGrid', () => SONGS.filter((s) => s.cover).map((v, i) => `
  <button type="button" data-video="${v.id}" class="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-white/10 text-left" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
    <img src="${IMG}videos/${v.id}.webp" width="480" height="854" alt="${esc(`Lillian Whitaker sings ${v.title} (${v.artist})`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></span>
    <span class="absolute left-3 top-3 max-w-[70%] truncate rounded-full bg-flame px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">${esc(v.artist)}</span>
    <span class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-flame group-hover:bg-flame group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
    <span class="absolute bottom-3 left-3 right-3">
      <span class="block font-display text-xl uppercase leading-tight sm:text-2xl">${esc(v.title)}</span>
      <span class="mt-1 flex flex-wrap items-center gap-x-3 font-mono text-[10px] uppercase tracking-[.25em] text-bone/70"><span>TikTok</span><span class="text-flame">${v.views} views</span></span>
    </span>
  </button>`).join(''));

// ---------- LANÇAMENTOS (capa + vinil saindo, como os singles da OÁZ) ----------
if (RELEASES.length) {
  $('#discGrid').classList.replace('hidden', 'grid');
  whenNear('#discGrid', () => RELEASES.map((s, i) => `
    <a href="${s.link}" target="_blank" rel="noopener" class="group block" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="relative aspect-square">
        <div class="vinyl absolute inset-[4%] rounded-full"></div>
        <div class="relative h-full w-full overflow-hidden rounded-lg shadow-2xl shadow-black/70">
          <img src="${IMG}covers/${s.cover}-320.webp" srcset="${IMG}covers/${s.cover}-320.webp 320w, ${IMG}covers/${s.cover}.webp 640w" sizes="(min-width: 1280px) 300px, (min-width: 640px) 28vw, 80vw" width="640" height="640" alt="${esc(`Cover of ${s.title}`)}" class="duo h-full w-full object-cover" loading="lazy" decoding="async">
          <span class="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${esc(s.sub)}</span>
          <span class="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
            <span class="grid h-14 w-14 place-items-center rounded-full bg-flame text-ink">${icon('h-play', 'ml-1 h-7 w-7')}</span>
          </span>
        </div>
      </div>
      <h3 class="mt-4 font-display text-xl uppercase tracking-wide transition group-hover:text-flame">${esc(s.title)}</h3>
      <p class="font-mono text-[10px] uppercase tracking-[.25em] text-bone/60">Lillian Whitaker · ${s.year}</p>
    </a>`).join(''));
}

// ---------- PLAYLISTS (estilo app de streaming) ----------
// Lista declarada antes das grades: com # no endereço elas são montadas na hora (renderAllGrids) e chamam playlistsReady
let lists = [];
function playlistsReady(el) {
  lists = $$('.playlist', el).map((p) => ({ el: p, bar: $('.pl-bar', p), time: $('.pl-time', p) }));
}
whenNear('#playlists', () => PLAYLISTS.map((p, i) => `
  <article class="playlist group rounded-2xl border border-white/10 bg-white/[.03] p-4 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-flame/50 hover:bg-white/[.05]" data-aos="fade-up" data-aos-delay="${i * 80}">
    <button type="button" data-video="${p.songs[0]}" class="relative block aspect-[16/9] w-full overflow-hidden rounded-xl" aria-label="${esc(`Play ${p.title}`)}">
      ${photo(p.img, '(min-width: 768px) 30vw, 92vw', '', 'absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105', { style: `object-position:${p.pos}` })}
      <span class="absolute inset-0 bg-gradient-to-br from-flame via-flame/60 to-ink mix-blend-multiply"></span>
      <span class="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"></span>
      <span class="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest backdrop-blur">${esc(p.tag)}</span>
      <span class="absolute bottom-4 right-4 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-flame text-ink opacity-0 shadow-[0_10px_25px_-5px_rgba(252,134,24,.7)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">${icon('h-play', 'ml-0.5 h-5 w-5')}</span>
    </button>
    <div class="px-1 pt-4">
      <h4 class="font-display text-2xl uppercase leading-tight">${esc(p.title)}</h4>
      <p class="mt-1 text-sm text-bone/55">${esc(p.text)}</p>
      <ol class="mt-4 border-t border-white/10 pt-2">
        ${p.songs.map((id, n) => { const s = song(id); return `<li><button type="button" data-video="${id}" class="flex w-full items-center gap-3 py-1.5 text-left transition hover:text-flame"><span class="w-4 font-mono text-[10px] text-bone/40">${n + 1}</span><span class="min-w-0 flex-1 truncate text-sm">${esc(s.title)}</span><span class="shrink-0 text-xs text-bone/45">${esc(s.artist)}</span></button></li>`; }).join('')}
      </ol>
      <!-- player: barra de progresso e tempo avançam com o scroll -->
      <div class="mt-4 flex items-center gap-3">
        <span class="eq flex h-3.5 items-end" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        <span class="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"><span class="pl-bar absolute inset-y-0 left-0 rounded-full bg-flame" style="width:35%"></span></span>
        <span class="pl-time font-mono text-[10px] tabular-nums text-bone/50" data-total="${p.total}">—</span>
      </div>
    </div>
  </article>`).join(''), (el) => playlistsReady(el));

// ---------- GALERIA ----------
whenNear('#galleryGrid', () => GALLERY.map((g, i) => `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
    ${photo(g.img, g.span.includes('col-span-2') ? '(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw' : '(min-width: 1280px) 300px, (min-width: 768px) 24vw, 46vw', `Lillian Whitaker — ${g.cap}`, 'duo h-full w-full object-cover', { w: g.w, h: g.h, style: g.pos ? `object-position:${g.pos}` : '' })}
    <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
    <span class="absolute bottom-3 left-3 translate-y-2 font-mono text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(g.cap)}</span>
  </button>`).join(''));

// ---------- INSTAGRAM ----------
whenNear('#instaGrid', () => INSTA.map((src, i) => `
  <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden rounded-lg" data-aos="zoom-in" data-aos-delay="${i * 60}">
    ${photo(src, '(min-width: 1280px) 200px, (min-width: 768px) 16vw, 32vw', 'Post by @lillaymae', 'duo h-full w-full object-cover', { style: 'object-position:50% 25%' })}
    <span class="absolute right-2 top-2 text-white/80">${icon('b-instagram', 'h-4 w-4')}</span>
    <span class="absolute inset-0 grid place-items-center bg-flame/0 transition group-hover:bg-flame/40"></span>
  </a>`).join(''));

if (location.hash) renderAllGrids();

// ---------- MODAIS ----------
function openModal(m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
function closeModal(m) {
  m.classList.remove('is-open'); document.body.style.overflow = '';
  if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
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
const CONSENT_KEY = 'lw-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// Vídeo: o player oficial do TikTok só carrega quando a pessoa clica para assistir (o clique é a autorização).
// Quem escolheu "Essential only" vê antes um aviso com a opção de assistir aqui ou no TikTok.
// O modal abre ANTES de o iframe entrar, para o player inicializar já com tamanho.
const ttEmbed = (id) => `<iframe class="h-full w-full" src="https://www.tiktok.com/player/v1/${id}?autoplay=1&music_info=0&description=0&rel=0&native_context_menu=0" title="Lillian Whitaker on TikTok" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
const ttNotice = (id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon('b-tiktok', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-tt-once="${id}" class="w-full rounded-full bg-flame px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] text-ink">Watch here</button>` : ''}
      <a href="${ttUrl(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center font-display text-xs uppercase tracking-[.2em]">Open on TikTok</a>
    </div>
  </div>`;
function playVideo(id) {
  const frame = $('#videoFrame');
  // Aberto direto do disco (file://) o player do TikTok não carrega: ele exige um site http(s)
  if (location.protocol === 'file:') {
    frame.innerHTML = ttNotice(id, 'The TikTok player only works on pages opened through http(s). To test locally, run <code class="text-flame">npm run dev</code> and open http://localhost:8080.', false);
  } else if (getConsent() === 'essential') {
    frame.innerHTML = ttNotice(id, 'This video is played by TikTok, which may set its own cookies. See our <a href="privacy.html" class="text-flame underline">Privacy Policy</a>.', true);
  } else {
    frame.innerHTML = ttEmbed(id);
  }
}
function openVideo(id) {
  const s = song(id);
  $('#videoCaption').innerHTML = s ? `${esc(s.title)} · ${esc(s.artist)} · <a href="${ttUrl(id)}" target="_blank" rel="noopener" class="text-flame hover:underline">TikTok ↗</a>` : '';
  $('#videoFrame').innerHTML = '';
  openModal($('#videoModal'));
  requestAnimationFrame(() => playVideo(id));
}
document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-tt-once]');
  if (once) { $('#videoFrame').innerHTML = ttEmbed(once.dataset.ttOnce); return; }
  if (e.target.closest('[data-video-featured]')) {
    if (FEATURED.video) openVideo(FEATURED.video); else if (FEATURED.link) window.open(FEATURED.link, '_blank', 'noopener');
    return;
  }
  const b = e.target.closest('[data-video]');
  if (b) openVideo(b.dataset.video);
});

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  $('#lbImg').src = `${IMG}photos/${GALLERY[lbIndex].img}.webp`; // maior versão de cada foto
  $('#lbImg').alt = `Lillian Whitaker — ${GALLERY[lbIndex].cap}`;
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

// ---------- FORMULÁRIO (monta a mensagem e abre o app de e-mail) ----------
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
  if (f.get('website') || Date.now() - openedAt < 3000) { say('Thank you! Your message is ready to send.', true); return; }
  const name = f.get('nome').trim();
  const email = f.get('email').trim();
  if (!name || !email || !f.get('mensagem').trim()) { say('Please fill in your name, email and message.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Please enter a valid email address.'); return; }
  if (!f.get('lgpd')) { say('Please confirm you agree with the Privacy Policy so Lillian can reply.'); return; }
  const date = f.get('data') ? new Date(f.get('data') + 'T12:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '-';
  const subject = `${f.get('tipo') || 'Message'} — ${name}`;
  const body = [
    'Hi Lillian,',
    '',
    f.get('mensagem').trim(),
    '',
    '—',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${f.get('tipo') || '-'}`,
    `Format: ${f.get('formato') || '-'}`,
    `Date: ${date}`,
    `City / Company: ${f.get('cidade') || '-'}`,
    '',
    `Sent from ${SITE}`,
  ].join('\n');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  say(`Thank you, ${esc(name)}! Your email app should open with the message ready — just hit send. If nothing opened, write to <a href="mailto:${EMAIL}" class="text-flame underline">${EMAIL}</a>.`, true);
});
$('#copyEmail').addEventListener('click', async (e) => {
  const label = $('span', e.currentTarget);
  try { await navigator.clipboard.writeText(EMAIL); label.textContent = 'Copied!'; } catch { label.textContent = EMAIL; }
  setTimeout(() => { label.textContent = 'Copy address'; }, 2500);
});

// "Work with me": escolher projeto ou formato já preenche o formulário
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tipo], [data-formato]');
  if (!t) return;
  if (t.dataset.tipo) form.elements.tipo.value = t.dataset.tipo;
  if (t.dataset.formato) form.elements.formato.value = t.dataset.formato;
});

// ---------- PERGUNTAS FREQUENTES (chat estilo app de mensagens) ----------
// A pergunta vira mensagem enviada; a Lillian "digita..." e responde. As respostas ficam no HTML (.faq-a).
const faqChat = $('#faqChat');
const faqStatus = $('#faqStatus');
const hhmm = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
let faqBusy = false;
function bubble(cls, text) {
  const b = document.createElement('div');
  b.className = cls; b.dataset.time = hhmm(); b.textContent = text;
  faqChat.appendChild(b);
  faqChat.scrollTo({ top: faqChat.scrollHeight, behavior: 'smooth' });
  return b;
}
function askFaq(btn) {
  if (faqBusy) return;
  faqBusy = true;
  $$('[data-faq]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  bubble('chat-out', btn.querySelector('.flex-1').textContent);
  const typing = document.createElement('div');
  typing.className = 'chat-in chat-typing'; typing.innerHTML = '<span></span><span></span><span></span>';
  setTimeout(() => {
    faqStatus.textContent = 'typing…';
    faqChat.appendChild(typing);
    faqChat.scrollTo({ top: faqChat.scrollHeight, behavior: 'smooth' });
  }, reduceMotion ? 0 : 350);
  setTimeout(() => {
    typing.remove();
    faqStatus.textContent = 'online';
    bubble('chat-in', btn.nextElementSibling.textContent);
    faqBusy = false;
  }, reduceMotion ? 0 : 1300);
  // no celular a conversa fica abaixo da lista: rola até ela
  if (!matchMedia('(min-width: 1024px)').matches) $('#faqPhone').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
$$('[data-faq]').forEach((b) => b.addEventListener('click', () => askFaq(b)));
// marca a hora da mensagem de boas-vindas
$$('.chat-in', faqChat).forEach((b) => { b.dataset.time = hhmm(); });

// ---------- WORK WITH ME: animação guiada pelo scroll ----------
// • a onda sonora ganha volume com a velocidade do scroll
// • os nomes dos projetos acendem da esquerda para a direita • o VU dos microfones enche
//   e o ON AIR acende • nas playlists, a barra de progresso e o tempo avançam como num player tocando.
// Só roda enquanto a seção está na tela; com "reduzir movimento" fica tudo estático e preenchido.
(() => {
  const sec = $('#work');
  if (!sec || reduceMotion) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const titles = $$('.stage-fill', sec);
  const mics = $$('.mic', sec);
  const mmss = (v) => `${Math.floor(v / 60)}:${pad(Math.floor(v % 60))}`; // m:ss (cada playlist ≈ 20 min)
  const wave = $('#evWave');
  const waveBack = $('#evWaveBack');
  let active = false; let raf = 0; let lastY = scrollY; let vel = 0; let t = 0;

  function frame() {
    raf = 0;
    if (!active) return;
    const vh = innerHeight; const y = scrollY;
    vel += (Math.min(80, Math.abs(y - lastY)) - vel) * 0.1; lastY = y; t += 0.05;

    titles.forEach((el) => {
      const p = clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4));
      el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    });
    mics.forEach((el) => {
      const p = clamp((vh * 0.95 - el.getBoundingClientRect().top) / (vh * 0.5));
      el.style.setProperty('--kp', p.toFixed(3));
      el.classList.toggle('is-live', p >= 1);
    });
    lists.forEach(({ el, bar, time }, n) => {
      const b = el.getBoundingClientRect();
      const p = clamp((vh - b.top) / (vh + b.height) * 1.15 - 0.05 + n * 0.04);
      bar.style.width = `${(p * 100).toFixed(1)}%`;
      const total = +time.dataset.total;
      time.textContent = `${mmss(total * p)} / ${mmss(total)}`;
    });

    // onda: envelope nas pontas + amplitude pela velocidade do scroll (mínimo para "respirar")
    const amp = Math.min(40, 3 + vel * 1.4);
    let d = 'M0 48'; let d2 = 'M0 48';
    for (let x = 0; x <= 1200; x += 10) {
      const k = x / 1200;
      const env = Math.sin(Math.PI * k);
      const off = Math.sin(k * 30 + t * 3 + y * 0.012) * Math.sin(k * 6.5 - t) * amp * env;
      d += ` L${x} ${(48 + off).toFixed(1)}`;
      d2 += ` L${x} ${(48 - off * 0.55 + Math.sin(k * 14 + t * 2) * 2).toFixed(1)}`;
    }
    wave.setAttribute('d', d); waveBack.setAttribute('d', d2);
    raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver(([en]) => {
    active = en.isIntersecting;
    if (active && !raf) { lastY = scrollY; raf = requestAnimationFrame(frame); }
  }, { rootMargin: '150px 0px' }).observe(sec);
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
