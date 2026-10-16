/* ==========================================================
   The Ambassadors Live Show — interações do site
   (mesma base do site de Lillian Whitaker)
   Os conteúdos repetidos (vídeos, formatos, setlist, locais,
   fotos) ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.vercel.app/theambassadors/site/';
const EMAIL = 'theambassadors.liveshow@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/theambassadors_live_show/';

// Reels do Instagram (out/2026). id = código do post · capa em assets/img/reels/<id>.webp
// local: true = vídeo hospedado no site (assets/video/<id>.mp4), toca sem depender do Instagram
// live: true = entra na grade "The live experience"
const REELS = [
  { id: 'DI8pOZHM7O0', title: 'A voice that rules the spotlight', tag: 'Full band', live: true, local: true },
  { id: 'DdvJnarqffp', title: 'Music and sunset', tag: 'Grand Hotel Cocumella · Sorrento', live: true, local: true },
  { id: 'DYfbeYPqX39', title: 'Show-time with our 8-piece band', tag: 'Full band', live: true, local: true },
  { id: 'DO5pGpZilCk', title: 'At Last', artist: 'Etta James', tag: 'Villa Serbelloni · Bellagio', live: true },
  { id: 'DZW_yNXKQjO', title: 'So groovy', tag: 'La Villa · Piedmont', live: true, local: true },
  { id: 'DY6npw0KDCE', title: 'A piano, a voice', tag: 'Ceremony', live: true },
  { id: 'DMSQ6WCsT65', title: 'Can you feel the vibe?', tag: 'Cascina Lagoscuro', live: true, local: true },
  { id: 'Dd_i2vKqepm', title: 'She got the blues', tag: 'Palazzo Gambara', live: true },
  { id: 'DZpyU0iqsF4', title: 'Party band & full production', tag: 'Audio & lights', live: true, local: true },
  { id: 'C7jv15wNQi8', title: 'A terrace above Rome', tag: 'Rome', live: true },
  { id: 'DbiLwfGKvWy', title: 'An unforgettable night for Carpisa', tag: 'Corporate event', live: true },
  { id: 'DZj3z3-qe4M', title: 'Music brought us to Antiparos', tag: 'Greece', live: true },
  { id: 'DaY98fdqaMf', title: 'A touch of Brazil', tag: 'Cascina Lagoscuro', live: true },
  { id: 'DYoiqaaKVGO', title: 'Hot Stuff', artist: 'Donna Summer', tag: 'Disco', live: true },
  { id: 'DbgR6qRKCKM', title: 'Toxic', artist: 'Britney Spears', tag: 'Piano · Aperitivo', live: true },
  { id: 'DNaA-G4sFtN', title: 'Pure magic in Porto Rotondo', tag: 'Sardinia', live: true },
  // Só na setlist / nos atos
  { id: 'Dbqz_njK8vh', title: 'Easy to Fall in Love', artist: 'Olivia Dean', tag: 'Castello di Montegioco' },
  { id: 'DbgT7avq3Rn', title: 'The Way You Make Me Feel', artist: 'Michael Jackson', tag: 'Aperitivo' },
  { id: 'DVvk5xJqQrM', title: 'Crazy', artist: 'Gnarls Barkley', tag: 'Funky rework', owner: 'matteoghione' },
  { id: 'DZVS7EVKBPc', title: 'We Are Family', artist: 'Sister Sledge', tag: 'House-funk rework', owner: 'matteoghione' },
  { id: 'DaZ1lV9KrHw', title: 'Sarà perché ti amo', artist: 'Ricchi e Poveri', tag: 'Cascina Lagoscuro' },
  { id: 'DahdGN2K0OH', title: 'Canta, Canta, Minha Gente', artist: 'Martinho da Vila', tag: 'Brazilian' },
  { id: 'DYh__fcK2_f', title: 'We love house music', tag: 'DJ + live' },
];

// Setlist do cartão de menu: só músicas que a banda publicou tocando ao vivo (ids de REELS)
const SETLIST = ['DO5pGpZilCk', 'Dbqz_njK8vh', 'DbgT7avq3Rn', 'DbgR6qRKCKM', 'DaZ1lV9KrHw', 'DahdGN2K0OH', 'DVvk5xJqQrM', 'DZVS7EVKBPc', 'DYoiqaaKVGO'];

// Formatos de show (destaques e legendas do Instagram) · img: assets/img/photos/<img> · musicians: luzes acesas no card
const FORMATS = [
  { title: 'Full Band Show', tag: 'Party time', text: 'Our 8-piece band with voices, live horns and percussion — the energy that fills the dance floor.', img: 'white-jackets', pos: '50% 40%', musicians: 8 },
  { title: 'Roaming Band', tag: 'Aperitivo · Welcome', text: 'Musicians moving among the guests, so nobody stays quietly seated.', img: 'roaming-aperitivo', pos: '50% 40%' },
  { title: 'Dinner Live Show', tag: 'Dinner', text: 'Soul, blues and timeless classics that set the tone between courses.', img: 'friccico-dinner', pos: '50% 30%' },
  { title: 'Ceremony', tag: 'Piano & voice', text: 'A piano, a voice and the perfect soundtrack for the most meaningful moment.', img: 'garden-ceremony', pos: '50% 35%' },
  { title: 'Acoustic Duo', tag: 'Intimate', text: 'Guitar and voice for smaller gatherings, terraces and quieter moments.', img: 'acoustic-duo', pos: '50% 35%' },
  { title: 'DJ Set + Live', tag: 'After party', text: 'House and disco with live horns and percussion on top of the DJ set.', img: 'horns-and-dj', pos: '50% 40%' },
];

// A noite em três atos · songs = ids de REELS · total: duração exibida no "player" (s)
const ACTS = [
  { title: 'Ceremony & aperitivo', tag: 'Act I', text: 'Piano, voice and acoustic soul as the guests arrive.', img: 'roaming-aperitivo', pos: '50% 35%', songs: ['DO5pGpZilCk', 'Dbqz_njK8vh', 'DbgR6qRKCKM'], total: 2700 },
  { title: 'Dinner show', tag: 'Act II', text: 'Timeless classics and Italian favourites around the table.', img: 'dinner-show-tuscany', pos: '50% 40%', songs: ['DbgT7avq3Rn', 'DaZ1lV9KrHw', 'DahdGN2K0OH'], total: 3600 },
  { title: 'Party time', tag: 'Act III', text: 'Disco, funk and house — the full band takes the stage.', img: 'horns-and-dj', pos: '50% 40%', songs: ['DYoiqaaKVGO', 'DZVS7EVKBPc', 'DVvk5xJqQrM'], total: 5400 },
];

// Locais citados nas legendas e destaques do Instagram · img (opcional): foto mostrada no hover
const VENUES = [
  { name: 'Villa Erba', place: 'Lake Como' },
  { name: 'Villa Serbelloni', place: 'Bellagio' },
  { name: 'Villa Arconati', place: 'Milan', img: 'birthday-villa-arconati' },
  { name: 'Casa Giardino', place: 'Milan', img: 'casa-giardino' },
  { name: 'Villa Aurelia', place: 'Lecco' },
  { name: 'Relais Franciacorta', place: 'Franciacorta' },
  { name: 'Palazzo Gambara', place: 'Lombardy', img: 'the-crew' },
  { name: 'Cascina Lagoscuro', place: 'Lombardy', img: 'talent-and-beauty' },
  { name: 'Villa Rizzardi', place: 'Verona', img: 'white-jackets' },
  { name: 'La Villa', place: 'Piedmont', img: 'garden-ceremony' },
  { name: 'Mombaruzzo', place: 'Piedmont', img: 'lets-go' },
  { name: 'Castello di Montegioco', place: 'Piedmont', img: 'red-passion' },
  { name: 'Real Collegio', place: 'Piedmont' },
  { name: 'Villa Durazzo', place: 'Liguria' },
  { name: 'Castelfalfi', place: 'Tuscany' },
  { name: 'Artimino', place: 'Tuscany', img: 'artimino-night' },
  { name: 'Villa La Selva', place: 'Arezzo', img: 'villa-la-selva' },
  { name: 'Friccico Hostaria Romana', place: 'Rome', img: 'friccico-dinner' },
  { name: 'A terrace above Rome', place: 'Rome' },
  { name: 'Giardini del Fuenti', place: 'Amalfi Coast', img: 'roaming-aperitivo' },
  { name: 'Villa Cimbrone', place: 'Ravello' },
  { name: 'Grand Hotel Cocumella', place: 'Sorrento' },
  { name: 'Porto Rotondo', place: 'Sardinia' },
  { name: 'Pantelleria', place: 'Sicily' },
];
const ABROAD = [
  { name: 'Monte Carlo', place: 'Monaco', code: 'MC', note: 'Brunch at Rose des Vents' },
  { name: 'Ibiza', place: 'Spain', code: 'ES', note: 'A birthday by the sea' },
  { name: 'Antiparos', place: 'Greece', code: 'GR', note: 'An exclusive private event' },
];

// Fotos do Instagram @theambassadors_live_show · photos/<img>.webp (até 1200 px) e <img>-480.webp
const GALLERY = [
  { img: 'the-crew', cap: 'The crew · Palazzo Gambara', span: 'row-span-2', pos: '50% 60%' },
  { img: 'red-passion', cap: 'Red passion · Castello di Montegioco', span: 'col-span-2 row-span-2', w: 1200, h: 1200, pos: '50% 30%' },
  { img: 'blues-voice', cap: 'Soul and blues spirit', span: 'row-span-2', pos: '50% 30%' },
  { img: 'the-rhythm', cap: 'First of all: the rhythm · Verona', span: 'row-span-2', pos: '50% 40%' },
  { img: 'two-voices', cap: 'Two voices', span: '', pos: '50% 30%' },
  { img: 'saxophone', cap: 'Saxophone', span: '', pos: '50% 35%' },
  { img: 'artimino-night', cap: 'A wonderful night at Artimino', span: 'col-span-2', w: 1200, h: 800, pos: '50% 40%' },
  { img: 'singer-red-light', cap: 'Under the red lights', span: 'row-span-2', pos: '50% 30%' },
  { img: 'colours', cap: 'A wedding filled with colour', span: 'row-span-2', pos: '50% 35%' },
  { img: 'flamenco', cap: 'Flamenco', span: '', pos: '50% 30%' },
  { img: 'guitar-smoke', cap: 'Villa Rizzardi', span: '', pos: '50% 40%' },
  { img: 'teal-dress', cap: 'Presence', span: 'row-span-2', pos: '50% 35%' },
  { img: 'tuxedo-trio', cap: 'Some occasions deserve a tux', span: '', pos: '50% 35%' },
  { img: 'voice-from-netherland', cap: 'A special voice from the Netherlands', span: '', pos: '50% 25%' },
  { img: 'backstage', cap: 'Backstage', span: 'col-span-2', w: 1200, h: 674, pos: '50% 40%' },
  { img: 'percussion-portrait', cap: 'Percussion', span: '', pos: '50% 30%' },
  { img: 'lets-go', cap: "Let's go · Mombaruzzo", span: '', pos: '50% 30%' },
];

const INSTA = ['production', 'first-dance-trumpet', 'soundcheck', 'casa-giardino', 'tuxedo-cypress', 'talent-and-beauty'];

const MARQUEE = ['Party Mood Makers', 'Music for exclusive events', 'Weddings & celebrations', 'Private events', 'Corporate events', 'Live horns & percussion', 'Audio & lighting production', 'Italy & abroad'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reel = (id) => REELS.find((r) => r.id === id);
const igUrl = (id) => `https://www.instagram.com/${reel(id)?.owner ? `${reel(id).owner}/` : ''}reel/${id}/`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fotos responsivas: 480 px e versão maior (até 1200 px)
function photo(name, sizes, alt, cls, { w = 1200, h = 1600, style = '' } = {}) {
  return `<img src="${IMG}photos/${name}-480.webp" srcset="${IMG}photos/${name}-480.webp 480w, ${IMG}photos/${name}.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" class="${cls}"${style ? ` style="${style}"` : ''} loading="lazy" decoding="async">`;
}

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${t}</span><span class="opacity-60">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// Contador de locais = tamanho da lista
$$('[data-venues]').forEach((el) => { el.dataset.count = VENUES.length + ABROAD.length; });

// ---------- HERO: vídeos em loop ----------
// Os arcos mostram o pôster na hora; o vídeo (sem som) só é baixado depois do load, e só os arcos visíveis
// (no celular, apenas o central). Com "reduzir movimento" ficam só os pôsteres.
function startHeroVideos() {
  if (reduceMotion) return;
  $$('[data-hero-video]').forEach((v) => {
    if (!v.offsetParent) return; // arco escondido (celular)
    v.src = v.dataset.src;
    v.play().catch(() => {});
  });
}
if (document.readyState === 'complete') startHeroVideos(); else window.addEventListener('load', startHeroVideos);
// pausa os vídeos do hero fora da tela (economiza bateria e processamento)
new IntersectionObserver(([en]) => {
  $$('[data-hero-video]').forEach((v) => { if (!v.src) return; if (en.isIntersecting) v.play().catch(() => {}); else v.pause(); });
}).observe($('#home'));

// Grades abaixo da dobra: o HTML de cada uma só é montado quando a pessoa chega perto (1500px antes).
// Tudo que falta é montado antes de seguir um link interno (#secao) ou quando a página já abre com um #.
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

// ---------- THE LIVE EXPERIENCE ----------
whenNear('#liveGrid', () => REELS.filter((r) => r.live).map((r, i) => `
  <button type="button" data-video="${r.id}" class="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-white/10 text-left" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
    <img src="${IMG}reels/${r.id}.webp" width="480" height="854" alt="${esc(`The Ambassadors — ${r.title}${r.artist ? ` (${r.artist})` : ''}`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></span>
    <span class="absolute left-3 top-3 max-w-[70%] truncate rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-ink font-mono">${esc(r.tag)}</span>
    <span class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
    <span class="absolute bottom-3 left-3 right-3">
      <span class="block font-display text-xl leading-tight sm:text-2xl uppercase">${esc(r.title)}</span>
      ${r.artist ? `<span class="mt-1 block text-[10px] uppercase tracking-[.25em] text-gold-light font-mono">${esc(r.artist)}</span>` : ''}
    </span>
  </button>`).join(''));

// ---------- FORMATOS ----------
// lista declarada antes das grades: com # no endereço elas são montadas na hora e chamam formatsReady
let spots = [];
function formatsReady(el) { spots = $$('.spot', el).map((s) => ({ el: s, lights: $$('.lights i', s) })); }
whenNear('#formatGrid', () => FORMATS.map((f, i) => `
  <a href="#contact" data-formato="${esc(f.title)}" class="group spot relative block overflow-hidden rounded-2xl border border-white/10 bg-ink" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
    <div class="relative aspect-[4/3] overflow-hidden">
      ${photo(f.img, '(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw', `The Ambassadors — ${f.title}`, 'spot-img absolute inset-0 h-full w-full object-cover', { style: `object-position:${f.pos}` })}
      <span class="spot-cone"></span>
      <span class="absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/20 to-transparent"></span>
      <span class="absolute left-4 right-4 top-4 z-[3] flex items-center justify-between">
        <span class="rounded-full bg-black/50 px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur font-mono">${esc(f.tag)}</span>
        <span class="on-stage rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest font-mono">On stage</span>
      </span>
    </div>
    <div class="relative z-[3] -mt-10 p-6 pt-0">
      <p class="font-mono text-xs text-gold">${pad(i + 1)}</p>
      <h3 class="font-display text-3xl uppercase">${esc(f.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-ivory/65">${esc(f.text)}</p>
      <div class="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
        ${f.musicians ? `<span class="lights" aria-label="${f.musicians} musicians on stage">${'<i></i>'.repeat(f.musicians)}</span>` : '<span class="text-[10px] uppercase tracking-[.25em] text-ivory/45 font-mono">Add to inquiry</span>'}
        <span class="text-ivory/40 transition group-hover:rotate-45 group-hover:text-gold">${icon('h-arrow-up-right', 'h-5 w-5')}</span>
      </div>
    </div>
  </a>`).join(''), formatsReady);

// ---------- SETLIST (cartão de menu) ----------
whenNear('#setlist', () => SETLIST.map((id) => {
  const r = reel(id);
  return `<li><button type="button" data-video="${id}" class="text-left transition hover:text-gold-deep">${esc(r.title)}</button> <span class="font-sans text-[11px] text-[#1d1a16]/50">${esc(r.artist || '')}</span></li>`;
}).join(''));

// ---------- A NOITE EM TRÊS ATOS ----------
let acts = [];
function actsReady(el) { acts = $$('.act', el).map((p) => ({ el: p, bar: $('.act-bar', p), time: $('.act-time', p) })); }
whenNear('#acts', () => ACTS.map((a, i) => `
  <article class="act group rounded-2xl border border-white/10 bg-white/[.03] p-4 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[.05]" data-aos="fade-up" data-aos-delay="${i * 80}">
    <button type="button" data-video="${a.songs[0]}" class="relative block aspect-[16/9] w-full overflow-hidden rounded-xl" aria-label="${esc(`Play ${a.title}`)}">
      ${photo(a.img, '(min-width: 768px) 30vw, 92vw', '', 'absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105', { style: `object-position:${a.pos}` })}
      <span class="absolute inset-0 bg-gradient-to-br from-gold via-gold-deep/70 to-ink mix-blend-multiply"></span>
      <span class="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"></span>
      <span class="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-[9px] uppercase tracking-widest backdrop-blur font-mono">${esc(a.tag)}</span>
      <span class="absolute bottom-4 right-4 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-gold text-ink opacity-0 shadow-[0_10px_25px_-5px_rgba(183,154,106,.7)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">${icon('h-play', 'ml-0.5 h-5 w-5')}</span>
    </button>
    <div class="px-1 pt-4">
      <h4 class="font-display text-3xl leading-tight uppercase">${esc(a.title)}</h4>
      <p class="mt-1 text-sm text-ivory/55">${esc(a.text)}</p>
      <ol class="mt-4 border-t border-white/10 pt-2">
        ${a.songs.map((id, n) => { const s = reel(id); return `<li><button type="button" data-video="${id}" class="flex w-full items-center gap-3 py-1.5 text-left transition hover:text-gold"><span class="w-4 text-[10px] text-ivory/40">${n + 1}</span><span class="min-w-0 flex-1 truncate text-sm">${esc(s.title)}</span><span class="shrink-0 text-xs text-ivory/45">${esc(s.artist || '')}</span></button></li>`; }).join('')}
      </ol>
      <div class="mt-4 flex items-center gap-3">
        <span class="eq flex h-3.5 items-end" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
        <span class="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"><span class="act-bar absolute inset-y-0 left-0 rounded-full bg-gold" style="width:35%"></span></span>
        <span class="act-time text-[10px] tabular-nums text-ivory/50" data-total="${a.total}">—</span>
      </div>
    </div>
  </article>`).join(''), actsReady);

// ---------- LOCAIS ----------
whenNear('#venueList', () => VENUES.map((v, i) => `
  <li class="group relative flex items-baseline gap-4 border-b border-white/10 py-3.5">
    <span class="w-7 shrink-0 font-mono text-xs text-gold">${pad(i + 1)}</span>
    <span class="min-w-0 flex-1 font-display text-xl transition group-hover:translate-x-1 group-hover:text-gold-light sm:text-2xl uppercase">${esc(v.name)}</span>
    <span class="shrink-0 text-right text-[10px] uppercase tracking-[.2em] text-ivory/50 font-mono">${esc(v.place)}</span>
    ${v.img ? `<img src="${IMG}photos/${v.img}-480.webp" width="480" height="640" alt="" class="ev-photo pointer-events-none absolute top-1/2 z-10 hidden h-32 w-24 rounded-md object-cover shadow-2xl shadow-black lg:block" loading="lazy">` : ''}
  </li>`).join(''));
whenNear('#abroadList', () => ABROAD.map((v) => `
  <div class="flex items-center gap-4 rounded-xl border border-white/10 bg-ink/60 p-4">
    <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 text-xs font-semibold tracking-widest text-gold">${esc(v.code)}</span>
    <span class="min-w-0"><span class="block font-display text-2xl leading-tight uppercase">${esc(v.name)}</span><span class="block text-[10px] uppercase tracking-[.2em] text-ivory/50 font-mono">${esc(v.place)} · ${esc(v.note)}</span></span>
  </div>`).join(''));

// ---------- GALERIA ----------
whenNear('#galleryGrid', () => GALLERY.map((g, i) => `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
    ${photo(g.img, g.span.includes('col-span-2') ? '(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw' : '(min-width: 1280px) 300px, (min-width: 768px) 24vw, 46vw', `The Ambassadors — ${g.cap}`, 'duo h-full w-full object-cover', { w: g.w, h: g.h, style: g.pos ? `object-position:${g.pos}` : '' })}
    <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
    <span class="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 font-mono">${esc(g.cap)}</span>
  </button>`).join(''));

// ---------- INSTAGRAM ----------
whenNear('#instaGrid', () => INSTA.map((src, i) => `
  <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden rounded-lg" data-aos="zoom-in" data-aos-delay="${i * 60}">
    ${photo(src, '(min-width: 1280px) 200px, (min-width: 768px) 16vw, 46vw', 'Post by @theambassadors_live_show', 'duo h-full w-full object-cover', { style: 'object-position:50% 30%' })}
    <span class="absolute right-2 top-2 text-white/80">${icon('b-instagram', 'h-4 w-4')}</span>
    <span class="absolute inset-0 bg-gold/0 transition group-hover:bg-gold/30"></span>
  </a>`).join(''));

if (location.hash) renderAllGrids();

// ---------- MODAIS ----------
let lastFocus = null;
function openModal(m) {
  lastFocus = document.activeElement;
  m.classList.add('is-open'); document.body.style.overflow = 'hidden';
  const c = $('[data-close], #menuClose', m); if (c) c.focus({ preventScroll: true });
}
function closeModal(m) {
  m.classList.remove('is-open'); document.body.style.overflow = '';
  if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
  if (lastFocus) lastFocus.focus({ preventScroll: true });
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
const CONSENT_KEY = 'ta-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// Vídeo: os reels hospedados no site tocam no player do navegador (com som, pois a pessoa clicou).
// Os demais usam o player oficial do Instagram, que só carrega quando a pessoa clica para assistir.
// Quem escolheu "Essential only" vê antes um aviso com a opção de assistir aqui ou no Instagram.
const igEmbed = (id) => `<iframe class="h-full w-full bg-white" src="https://www.instagram.com/reel/${id}/embed/" title="The Ambassadors on Instagram" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="eager"></iframe>`;
const igNotice = (id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-ivory text-ink">${icon('b-instagram', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-ivory/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-ig-once="${id}" class="w-full rounded-full bg-gold px-5 py-2.5 text-xs uppercase tracking-[.2em] text-ink font-display">Watch here</button>` : ''}
      <a href="${igUrl(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-xs uppercase tracking-[.2em] font-display">Open on Instagram</a>
    </div>
  </div>`;
function playVideo(id) {
  const frame = $('#videoFrame');
  const r = reel(id);
  if (r && r.local) {
    frame.innerHTML = `<video class="h-full w-full bg-black object-contain" src="assets/video/${id}.mp4" poster="${IMG}reels/${id}.webp" controls autoplay playsinline></video>`;
  } else if (location.protocol === 'file:') {
    frame.innerHTML = igNotice(id, 'The Instagram player only works on pages opened through http(s). To test locally, run <code class="text-gold">npm run dev</code> and open http://localhost:8080.', false);
  } else if (getConsent() === 'essential') {
    frame.innerHTML = igNotice(id, 'This video is played by Instagram, which may set its own cookies. See our <a href="privacy.html" class="text-gold underline">Privacy Policy</a>.', true);
  } else {
    frame.innerHTML = igEmbed(id);
  }
}
function openVideo(id) {
  const r = reel(id);
  $('#videoCaption').innerHTML = r ? `${esc(r.title)}${r.artist ? ` · ${esc(r.artist)}` : ''} · <a href="${igUrl(id)}" target="_blank" rel="noopener" class="text-gold hover:underline">Instagram ↗</a>` : '';
  $('#videoFrame').innerHTML = '';
  openModal($('#videoModal'));
  requestAnimationFrame(() => playVideo(id));
}
document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-ig-once]');
  if (once) { $('#videoFrame').innerHTML = igEmbed(once.dataset.igOnce); return; }
  const b = e.target.closest('[data-video]');
  if (b) openVideo(b.dataset.video);
});

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  $('#lbImg').src = `${IMG}photos/${GALLERY[lbIndex].img}.webp`; // maior versão de cada foto
  $('#lbImg').alt = `The Ambassadors — ${GALLERY[lbIndex].cap}`;
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
    if (reduceMotion) { el.textContent = target.toFixed(dec); counters.unobserve(el); return; }
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
// Sem servidor: nada é guardado pelo site. Anti-spam: campo-armadilha + tempo mínimo de preenchimento;
// o botão fica bloqueado alguns segundos depois do envio para evitar mensagens duplicadas.
// Para receber sem depender do app de e-mail, troque por um serviço de formulário (ex.: Formspree) e envie via fetch.
const form = $('#bookingForm');
const formMsg = $('#formMsg');
const openedAt = Date.now();
// opções de formato = FORMATS
form.elements.formato.insertAdjacentHTML('beforeend', FORMATS.map((f) => `<option>${esc(f.title)}</option>`).join('') + '<option>A combination</option>');
// "Not defined yet" desativa a data
form.elements.semData.addEventListener('change', (e) => { form.elements.data.disabled = e.target.checked; if (e.target.checked) form.elements.data.value = ''; });

function say(text, ok) {
  formMsg.innerHTML = text;
  formMsg.className = `mt-4 text-sm ${ok ? 'text-ivory' : 'text-[#e2725b]'}`;
}
function flag(names) {
  $$('.field', form).forEach((f) => f.removeAttribute('aria-invalid'));
  names.forEach((n) => form.elements[n].setAttribute('aria-invalid', 'true'));
  if (names.length) form.elements[names[0]].focus();
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(form);
  const val = (k) => (f.get(k) || '').toString().trim();
  // Robôs preenchem o campo escondido ou enviam em menos de 3 s: finge sucesso e não faz nada
  if (val('website') || Date.now() - openedAt < 3000) { say('Thank you! Your inquiry is ready to send.', true); return; }
  const missing = ['nome', 'email', 'tipo', 'cidade', 'pais', 'mensagem'].filter((k) => !val(k));
  if (missing.length) { flag(missing); say('Please fill in the required fields marked with *.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) { flag(['email']); say('Please enter a valid email address.'); return; }
  if (!f.get('lgpd')) { flag([]); say('Please confirm you agree with the Privacy Policy so the band can reply.'); return; }
  flag([]);
  const name = val('nome');
  const date = f.get('semData') ? 'Not defined yet' : (val('data') ? new Date(val('data') + 'T12:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '-');
  const subject = `${val('tipo')} inquiry — ${name}`;
  const body = [
    'Hello The Ambassadors,',
    '',
    val('mensagem'),
    '',
    '—',
    `Name: ${name}`,
    `Email: ${val('email')}`,
    `Type of event: ${val('tipo')}`,
    `Show format: ${val('formato') || 'Not sure yet'}`,
    `Event date: ${date}`,
    `Location: ${val('cidade')}, ${val('pais')}`,
    `Estimated guests: ${val('convidados') || '-'}`,
    '',
    `Sent from ${SITE}`,
  ].join('\n');
  const btn = $('button[type="submit"]', form);
  btn.disabled = true; setTimeout(() => { btn.disabled = false; }, 6000);
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  say(`Thank you, ${esc(name)}! Your email app should open with the inquiry ready — just hit send. If nothing opened, write to <a href="mailto:${EMAIL}" class="text-gold underline">${EMAIL}</a>.`, true);
});
$('#copyEmail').addEventListener('click', async (e) => {
  const label = $('span', e.currentTarget);
  try { await navigator.clipboard.writeText(EMAIL); label.textContent = 'Copied!'; } catch { label.textContent = EMAIL; }
  setTimeout(() => { label.textContent = 'Copy address'; }, 2500);
});

// Listas de eventos e locais: a foto do hover acompanha o cursor
document.addEventListener('pointermove', (e) => {
  const li = e.target.closest('#events li, #venueList li');
  if (!li || e.pointerType !== 'mouse') return;
  li.style.setProperty('--mx', `${e.clientX - li.getBoundingClientRect().left}px`);
}, { passive: true });

// Eventos e formatos: escolher um item já preenche o formulário
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tipo], [data-formato], [data-tipo-msg]');
  if (!t) return;
  if (t.dataset.tipo) form.elements.tipo.value = t.dataset.tipo;
  if (t.dataset.formato) form.elements.formato.value = t.dataset.formato;
  if (t.dataset.tipoMsg && !form.elements.mensagem.value) form.elements.mensagem.value = t.dataset.tipoMsg;
});

// ---------- PERGUNTAS FREQUENTES (chat estilo app de mensagens) ----------
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
  if (!matchMedia('(min-width: 1024px)').matches) $('#faqPhone').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
$$('[data-faq]').forEach((b) => b.addEventListener('click', () => askFaq(b)));
$$('.chat-in', faqChat).forEach((b) => { b.dataset.time = hhmm(); });

// ---------- ANIMAÇÕES GUIADAS PELO SCROLL ----------
// • os nomes dos eventos acendem da esquerda para a direita • nos formatos, o canhão de luz acende e
//   as luzes da banda completa ligam uma a uma • nos atos, a barra de progresso e o tempo avançam como num player.
// Só roda enquanto as seções estão na tela; com "reduzir movimento" fica tudo estático e preenchido.
(() => {
  const secs = ['#events', '#formats', '#music'].map((s) => $(s));
  if (reduceMotion) {
    const fill = () => { spots.forEach(({ el, lights }) => { el.classList.add('is-live'); lights.forEach((l) => l.classList.add('on')); }); };
    new MutationObserver(fill).observe($('#formatGrid'), { childList: true });
    return;
  }
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const titles = $$('.stage-fill');
  const hms = (v) => `${Math.floor(v / 3600)}:${pad(Math.floor((v % 3600) / 60))}`;
  const visible = new Set();
  let raf = 0;

  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    titles.forEach((el) => {
      const p = clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4));
      el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    });
    spots.forEach(({ el, lights }) => {
      const p = clamp((vh * 0.95 - el.getBoundingClientRect().top) / (vh * 0.55));
      el.classList.toggle('is-live', p >= 1);
      lights.forEach((l, n) => l.classList.toggle('on', p * lights.length > n + 0.2));
    });
    acts.forEach(({ el, bar, time }, n) => {
      const b = el.getBoundingClientRect();
      const p = clamp((vh - b.top) / (vh + b.height) * 1.15 - 0.05 + n * 0.04);
      bar.style.width = `${(p * 100).toFixed(1)}%`;
      const total = +time.dataset.total;
      time.textContent = `${hms(total * p)} / ${hms(total)}`;
    });
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
    if (visible.size && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '150px 0px' });
  secs.forEach((s) => io.observe(s));
})();

$('#year').textContent = new Date().getFullYear();

// ---------- AOS ----------
// AOS (só anima o que está abaixo da dobra): inicia na primeira interação ou 5 s após o load
const aosEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
let aosTimer;
function initAOS() {
  clearTimeout(aosTimer);
  aosEvents.forEach((ev) => removeEventListener(ev, initAOS));
  if (window.AOS) AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' });
}
aosEvents.forEach((ev) => addEventListener(ev, initAOS, { once: true, passive: true }));
window.addEventListener('load', () => { aosTimer = setTimeout(initAOS, 5000); });
