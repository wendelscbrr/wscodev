/* ==========================================================
   Forró em Milão — interações do site (textos em italiano)
   (mesma base do site de Lillian Whitaker / Banda OÁZ)
   Os conteúdos que mudam com frequência (eventos, galeria,
   equipe, parceiros) ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.vercel.app/forroemmilao/site/';
const EMAIL = 'forroemmilao@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/forro_em_milao/';
const TZ = 'Europe/Rome';
const LOCALE = 'it-IT';

// Rádio (AzuraCast do projeto). A API pública devolve música atual, capa, ouvintes e histórico.
const RADIO = {
  stream: 'https://radio.forroemmilao.com/listen/radiofem/radio.mp3',
  api: 'https://radio.forroemmilao.com/api/nowplaying/radiofem',
};

// Google Agenda do projeto (o mesmo do site atual). A chave só responde no domínio autorizado (forroemmilao.com):
// em outros endereços (prévia, localhost) o site usa a lista EVENTS abaixo. Para outro domínio, libere-o na chave
// (Google Cloud Console → Credenciais → restrições de referenciador HTTP).
const GCAL = {
  id: '1c5ce48a1b0e082d965f975e838eb38e736716d3a53b4bdbd864ebde34a2bc56@group.calendar.google.com',
  key: 'AIzaSyBPfeindn1HCRy_fecbFN5G6sZeSukVaxg',
};

// Eventos (cópia do Google Agenda do projeto em out/2026, textos em italiano). Datas no fuso de Milão.
// cat: baile | ao-vivo | workshop | aula | cultural · img: assets/img/photos/<img> (foto de arquivo do projeto)
// status (opcional): 'cancelado' | 'adiado' · link (opcional): ingressos ou inscrição · price (opcional)
// Não inventar datas, locais ou preços: só o que estiver confirmado pela equipe.
const EVENTS = [
  { title: 'Festa FEM — Forró do Inverno', start: '2026-01-17T21:00+01:00', end: '2026-01-18T01:00+01:00', cat: 'baile', img: 'jam-mood-cafe', place: '', address: '' },
  { title: 'Festa FEM — Forró dos Namorados · Trio Girico dal vivo', start: '2026-02-14T21:00+01:00', end: '2026-02-15T01:00+01:00', cat: 'ao-vivo', img: 'everton-coron', place: 'Milord Milano', address: 'Piazza Gian Lorenzo Bernini, 20133 Milano' },
  { title: 'Casa Forró e Gruppo Toc Toc', start: '2026-02-22T19:00+01:00', end: '2026-02-22T23:00+01:00', cat: 'cultural', img: 'baile-mood-cafe', place: 'Alzaia Naviglio Grande, 160', address: 'Alzaia Naviglio Grande, 160, 20144 Milano', text: 'Aperitivo brasiliano e stage di danza forró. Prenotazione obbligatoria.' },
  { title: 'Festa FEM — DJ set con DJ Gringa e DJ Ricardo', start: '2026-03-14T21:00+01:00', end: '2026-03-15T01:00+01:00', cat: 'baile', img: 'dj-set-fevereiro', place: 'Milord Milano', address: 'Piazza Gian Lorenzo Bernini, 20133 Milano', text: 'Apericena con prenotazione, lezione introduttiva di forró e DJ set con DJ Ricardo e DJ Gringa.' },
  { title: 'Festa FEM — Forró Esquenta Dominguinho · DJ Marcio e DJ Gringa', start: '2026-04-11T19:30+02:00', end: '2026-04-11T23:30+02:00', cat: 'baile', img: 'dj-set-mood-cafe', place: 'Milord Milano', address: 'Piazza Gian Lorenzo Bernini, 20133 Milano', text: 'Apericena con prenotazione, lezione introduttiva di forró e DJ set con DJ Marcio e DJ Gringa.' },
  { title: 'Festa Junina FEM', start: '2026-06-14T15:00+02:00', end: '2026-06-14T21:00+02:00', cat: 'cultural', img: 'pista', place: 'Barrio’s — Teatro Edi / Barrio’s Live', address: 'Piazza Donne Partigiane, 20142 Milano', text: 'Ogni giugno il Brasile si trasforma: le piazze si colorano di bandierine, l’odore di mais riempie l’aria e il forró invita tutti a ballare. E qui a Milano facciamo il possibile per ricreare quell’atmosfera, anche a distanza!' },
  { title: 'Lezione aperta — Capoeira Sul da Bahia ASD', start: '2026-09-21T21:00+02:00', end: '2026-09-21T22:30+02:00', cat: 'aula', img: 'aula-musica', place: 'Capoeira Sul da Bahia ASD', address: 'Via Filippo Argelati, 35, 20143 Milano', text: 'Lezione aperta per conoscere Forró em Milão e provare il ballo prima di iscriversi.' },
  {
    title: 'Forró do Recomeço — live con Jorge do Rojão', start: '2026-09-27T18:00+02:00', end: '2026-09-27T22:00+02:00', cat: 'ao-vivo', img: 'sanfoneiro',
    place: 'Canottieri Milano', address: 'Alzaia Naviglio Grande, 160, 20144 Milano', price: 'Ingresso €20 · consumazione inclusa · cibo alla carta',
    text: 'Il primo evento dell’anno per ripartire con la giusta energia, con musica dal vivo e un ospite molto speciale. Jorge do Rojão — paulistano, fisarmonicista, cantante e compositore — è una delle voci di riferimento del forró pé de serra in Brasile e all’estero. Ha iniziato a suonare la fisarmonica da bambino, dal 2013 porta avanti la sua carriera solista e ha pubblicato tre album.',
    program: [['18:00–19:00', 'Lezione introduttiva di forró — aperta a tutti, anche a chi non ha mai ballato'], ['19:00–20:30', 'DJ set in vinile con DJ Gringa'], ['20:30–22:00', 'Show dal vivo: Jorge do Rojão & Trio']],
  },
  { title: 'Workshop con Mari Brasil', start: '2026-09-28T21:30+02:00', end: '2026-09-28T23:00+02:00', cat: 'workshop', img: 'danca', place: 'Capoeira Sul da Bahia ASD', address: 'Via Filippo Argelati, 35, 20143 Milano' },
  { title: 'Lezione aperta — SLAP', start: '2026-09-29T20:30+02:00', end: '2026-09-29T22:00+02:00', cat: 'aula', img: 'festa-junina-2025', place: 'SLAP — Spazio Lambrate Arti Performative', address: 'Viale delle Rimembranze di Lambrate, 16, 20134 Milano', text: 'Lezione aperta di Base 1 per chi vuole iniziare da zero.' },
];

const CATS = {
  baile: { label: 'Serata', img: 'pista' },
  'ao-vivo': { label: 'Musica dal vivo', img: 'musica-ao-vivo' },
  workshop: { label: 'Workshop', img: 'danca' },
  aula: { label: 'Lezione aperta', img: 'aula-musica' },
  cultural: { label: 'Incontro culturale', img: 'grupo' },
};

// Galeria · photos/<img>.webp (1200 px) e <img>-600.webp · todas 3:2 · pos = foco do recorte
// A ordem forma blocos que fecham linhas inteiras (4 colunas no desktop, 2 no celular), então a grade termina alinhada:
//   bloco 2 linhas: [2x2] + [1x2] + [1x2]   ·   bloco 1 linha: [1] + [2x1] + [1]   ·   bloco 2 linhas: [2x2] + [1x2] + [1] + [1]
// Ao incluir ou remover fotos, mantenha esses blocos completos.
const GALLERY_CATS = ['Serate e feste', 'Musica dal vivo', 'DJ e ricerca musicale', 'Lezioni e workshop', 'Incontri culturali'];
const GALLERY = [
  // bloco 1 (2 linhas)
  { img: 'pista', cap: 'Festa FEM · giugno 2026', cat: 'Serate e feste', span: 'col-span-2 row-span-2' },
  { img: 'sanfoneiro', cap: 'Fisarmonica dal vivo · Festa FEM, giugno 2026', cat: 'Musica dal vivo', span: 'row-span-2', pos: '62% 50%' },
  { img: 'dj-vinil', cap: 'DJ set in vinile · Festa FEM, giugno 2026', cat: 'DJ e ricerca musicale', span: 'row-span-2', pos: '58% 50%' },
  // bloco 2 (1 linha)
  { img: 'encontro', cap: 'Abbraccio di forró · Festa FEM, giugno 2026', cat: 'Serate e feste', span: '', pos: '70% 40%' },
  { img: 'roda-percussao', cap: 'Cerchio di percussioni · Festa FEM, giugno 2026', cat: 'Incontri culturali', span: 'col-span-2' },
  { img: 'musica-ao-vivo', cap: 'Musica dal vivo · Festa FEM, giugno 2026', cat: 'Musica dal vivo', span: '', pos: '55% 50%' },
  // bloco 3 (2 linhas)
  { img: 'grupo', cap: 'La comunità al completo · giugno 2026', cat: 'Incontri culturali', span: 'col-span-2 row-span-2' },
  { img: 'aula-musica', cap: 'Lezione di musica · Capoeira Sul da Bahia, maggio 2025', cat: 'Lezioni e workshop', span: 'row-span-2' },
  { img: 'danca', cap: 'In pista · Festa FEM, giugno 2026', cat: 'Serate e feste', span: '' },
  { img: 'festa-junina-2025', cap: 'Festa junina · giugno 2025', cat: 'Lezioni e workshop', span: '', pos: '60% 40%' },
  // bloco 4 (1 linha)
  { img: 'jam-milord', cap: 'Jam session · Milord, ottobre 2025', cat: 'Musica dal vivo', span: '', pos: '40% 40%' },
  { img: 'everton-coron', cap: 'Serata al Milord · novembre 2025', cat: 'Serate e feste', span: 'col-span-2' },
  { img: 'jam-mood-cafe', cap: 'Jam session · Mood Café, gennaio 2026', cat: 'Incontri culturali', span: '', pos: '50% 35%' },
  // bloco 5 (2 linhas) — fecha a grade
  { img: 'baile-mood-cafe', cap: 'Serata · Mood Café', cat: 'Serate e feste', span: 'col-span-2 row-span-2' },
  { img: 'dj-vinil-vermelho', cap: 'DJ set · Mood Café, marzo 2025', cat: 'DJ e ricerca musicale', span: 'row-span-2', pos: '50% 30%' },
  { img: 'dj-set-mood-cafe', cap: 'DJ set · Mood Café, gennaio 2025', cat: 'DJ e ricerca musicale', span: '', pos: '35% 40%' },
  { img: 'dj-set-fevereiro', cap: 'DJ set · Mood Café, febbraio 2025', cat: 'DJ e ricerca musicale', span: '', pos: '55% 40%' },
];

// Parceiros · partners/<logo>.webp
const PARTNERS = [
  { name: 'Forró em Vinil', logo: 'forro-em-vinil', w: 426, h: 240, tag: 'Ricerca musicale · Vinile', url: 'https://www.forroemvinil.com/', text: 'Iniziativa dedicata alla ricerca, alla conservazione e alla diffusione del forró tradizionale su vinile, che riunisce collezionisti, DJ e musicisti interessati al patrimonio musicale del genere.' },
  { name: 'É Que Mescapuliu', logo: 'e-que-mescapuliu', w: 600, h: 200, tag: 'Giornalismo · Fotografia', url: 'https://mescapuliu.blogspot.com/', text: 'Progetto editoriale di giornalismo, fotografia e opinione sul forró pé de serra, con uno sguardo attento alla scena culturale brasiliana ed europea.' },
];

// Equipe — funções descritas publicamente (validar com cada integrante). photo: assets/img/team/<photo>.webp quando houver foto oficial autorizada
const TEAM = [
  { name: 'Arianna', alias: 'DJ Gringa', role: 'Fondatrice', text: 'Coordinamento del progetto, relazioni e collaborazioni, gestione generale e corsi.', color: 'bg-flame text-ink' },
  { name: 'Roberto', role: 'Insegnante', text: 'Corsi regolari, workshop e attività amministrative.', color: 'border border-flame/50 text-flame' },
  { name: 'Chiara', role: 'Insegnante', text: 'Corsi regolari, workshop e amministrazione.', color: 'border border-flame/50 text-flame' },
  { name: 'Igor', role: 'Radio e musica', text: 'Co-fondatore della radio; iniziative musicali, innovazione e corsi.', color: 'border border-flame/50 text-flame' },
  { name: 'Carlo Gaetano', role: 'Fotografia', text: 'Fotografia e documentazione visiva del percorso del progetto.', color: 'border border-white/15 text-bone/70' },
];

// Grade da seção Seguici (leva ao Instagram) · photos/<img>
const INSTA = ['pista', 'sanfoneiro', 'dj-vinil', 'encontro', 'grupo', 'jam-mood-cafe'];

const MARQUEE = ['Forró pé de serra', 'Corsi', 'Serate', 'Musica dal vivo', 'Radio 24h', 'Workshop', 'Cultura nordestina', 'Milano'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function photo(name, sizes, alt, cls, { style = '' } = {}) {
  return `<img src="${IMG}photos/${name}-600.webp" srcset="${IMG}photos/${name}-600.webp 600w, ${IMG}photos/${name}.webp 1200w" sizes="${sizes}" width="1200" height="800" alt="${esc(alt)}" class="${cls}"${style ? ` style="${style}"` : ''} loading="lazy" decoding="async">`;
}

// ---------- PRIVACIDADE ----------
// Sem cookies próprios. A escolha (all | essential) fica no localStorage só para não perguntar de novo.
const CONSENT_KEY = 'fem-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
  if (v === 'all') { loadCalendar(); fetchNowPlaying(); }
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${t}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- VÍDEO DO HERO ----------
// Só carrega depois da página pronta (não disputa com a foto do LCP) e nunca com "reduzir movimento" ou economia de dados
window.addEventListener('load', () => {
  const v = $('#heroVideo');
  if (!v || reduceMotion || navigator.connection?.saveData) return;
  v.src = v.dataset.src;
  v.addEventListener('playing', () => v.classList.remove('opacity-0'), { once: true });
  v.play().catch(() => {});
});

// ---------- MODAIS ----------
let lastFocus = null;
function openModal(m) { lastFocus = document.activeElement; m.classList.add('is-open'); document.body.style.overflow = 'hidden'; $('[data-close], button', m)?.focus({ preventScroll: true }); }
function closeModal(m) {
  m.classList.remove('is-open'); document.body.style.overflow = '';
  if (m.id === 'eventModal' && location.hash.startsWith('#evento-')) history.replaceState(null, '', location.pathname + location.search);
  lastFocus?.focus?.({ preventScroll: true });
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

// Menu mobile
$('#menuOpen').addEventListener('click', () => openModal($('#mobileMenu')));
$('#menuClose').addEventListener('click', () => closeModal($('#mobileMenu')));
$$('#mobileMenu nav a').forEach((a) => a.addEventListener('click', () => closeModal($('#mobileMenu'))));

// ---------- EVENTOS ----------
const dfDay = new Intl.DateTimeFormat(LOCALE, { day: '2-digit', timeZone: TZ });
const dfMon = new Intl.DateTimeFormat(LOCALE, { month: 'short', timeZone: TZ });
const dfWeek = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: TZ });
const dfYear = new Intl.DateTimeFormat(LOCALE, { year: 'numeric', timeZone: TZ });
const dfLong = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ });
const dfTime = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit', timeZone: TZ });
const hm = (d) => dfTime.format(d);
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
const gcalStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function normalizeEvent(e) {
  const start = new Date(e.start);
  const end = e.end ? new Date(e.end) : new Date(start.getTime() + 3 * 36e5);
  return { ...e, start, end, id: `${e.start.slice(0, 10)}-${slug(e.title)}`, img: e.img || CATS[e.cat]?.img || 'pista' };
}
let events = EVENTS.map(normalizeEvent);
let evTab = 'next';
let evSource = 'local';

// Google Agenda → mesmo formato da lista local (a foto e a categoria vêm do evento local da mesma data, se houver)
function guessCat(t) {
  t = t.toLowerCase();
  if (/workshop|stage/.test(t)) return 'workshop';
  if (/lezione|aula|lesson/.test(t)) return 'aula';
  if (/live|ao vivo|trio|show|concerto/.test(t)) return 'ao-vivo';
  if (/festa junina|cultur|cinema|film/.test(t)) return 'cultural';
  return 'baile';
}
function fromGcal(it) {
  const s = it.start.dateTime || `${it.start.date}T00:00:00`;
  const local = EVENTS.find((e) => e.start.slice(0, 10) === s.slice(0, 10));
  const [place, ...rest] = (it.location || '').split(', ');
  return normalizeEvent({
    title: it.summary || 'Evento Forró em Milão',
    start: s, end: it.end?.dateTime || it.end?.date,
    cat: local?.cat || guessCat(`${it.summary} ${it.description || ''}`),
    img: local?.img, place: place || '', address: rest.join(', ').replace(/, Ital(ia|y)$/, ''),
    text: local?.text || (it.description || '').replace(/<[^>]+>/g, ' ').trim(),
    program: local?.program, price: local?.price, link: local?.link,
    status: it.status === 'cancelled' ? 'cancelado' : local?.status,
  });
}
async function loadCalendar() {
  if (getConsent() !== 'all' || location.protocol === 'file:') return;
  const params = new URLSearchParams({ key: GCAL.key, singleEvents: 'true', orderBy: 'startTime', maxResults: '60', timeMin: new Date(Date.now() - 400 * 864e5).toISOString() });
  try {
    const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GCAL.id)}/events?${params}`);
    if (!r.ok) throw new Error(r.status);
    const data = await r.json();
    if (!Array.isArray(data.items) || !data.items.length) return;
    events = data.items.map(fromGcal);
    evSource = 'gcal';
    renderEvents();
    eventFromHash(); // link compartilhado de um evento que só existe no Google Agenda
  } catch { /* chave restrita a outro domínio, sem rede ou sem permissão: segue com a lista local */ }
}

const isPast = (e) => e.end < new Date();
function dateTile(e, dark) {
  return `<div class="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl ${dark ? 'bg-white/5 text-bone' : 'bg-flame text-ink'} py-3 text-center">
    <span class="font-mono text-[10px] uppercase tracking-[.2em] opacity-70">${dfMon.format(e.start).replace('.', '')}</span>
    <span class="font-display uppercase text-4xl leading-none">${dfDay.format(e.start)}</span>
    <span class="mt-1 font-mono text-[9px] uppercase tracking-[.15em] opacity-60">${dfYear.format(e.start)}</span>
  </div>`;
}
function statusBadge(e) {
  if (e.status === 'cancelado') return '<span class="rounded-full bg-red-500/15 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-red-300">Annullato</span>';
  if (e.status === 'adiado') return '<span class="rounded-full bg-flame/15 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-flame">Rinviato</span>';
  const now = new Date();
  if (e.start <= now && now < e.end) return '<span class="flex items-center gap-1.5 rounded-full bg-flame px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink"><span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink text-ink"></span> In corso ora</span>';
  if (isPast(e)) return '<span class="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-bone/60">Concluso</span>';
  return '';
}
function eventCard(e, i) {
  const past = isPast(e);
  return `
  <article class="group grid overflow-hidden rounded-2xl border border-white/10 bg-ink/60 transition hover:border-flame/50 md:grid-cols-12 ${past ? 'opacity-80 hover:opacity-100' : ''}" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
    <button type="button" data-event="${e.id}" class="relative block aspect-[16/9] overflow-hidden md:col-span-4 md:aspect-auto" aria-label="${esc(`Dettagli: ${e.title}`)}">
      ${photo(e.img, '(min-width: 768px) 30vw, 92vw', '', `duo absolute inset-0 h-full w-full object-cover ${past ? 'grayscale' : ''}`)}
      <span class="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-ink/40"></span>
      <span class="absolute left-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-bone backdrop-blur">${esc(CATS[e.cat]?.label || 'Evento')}</span>
    </button>
    <div class="flex gap-5 p-5 sm:p-7 md:col-span-8">
      ${dateTile(e, true)}
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">${statusBadge(e)}<span class="font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">${esc(dfWeek.format(e.start))}</span></div>
        <h3 class="mt-2 font-display uppercase text-2xl leading-tight sm:text-3xl ${e.status === 'cancelado' ? 'line-through decoration-1' : ''}">${esc(e.title)}</h3>
        <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-bone/65">
          <span class="flex items-center gap-1.5">${icon('h-clock', 'h-4 w-4 text-flame')} ${hm(e.start)}–${hm(e.end)}</span>
          ${e.place ? `<span class="flex min-w-0 items-center gap-1.5">${icon('h-map-pin', 'h-4 w-4 shrink-0 text-flame')} <span class="truncate">${esc(e.place)}</span></span>` : ''}
        </p>
        ${e.text ? `<p class="mt-3 line-clamp-2 text-sm leading-relaxed text-bone/60">${esc(e.text)}</p>` : ''}
        <div class="mt-5 flex flex-wrap gap-2">
          <button type="button" data-event="${e.id}" class="inline-flex items-center gap-2 rounded-full ${past ? 'border border-white/15 hover:border-flame' : 'bg-flame text-ink hover:bg-white'} px-4 py-2 font-display text-xs uppercase tracking-[.2em] transition">${past ? 'Dettagli' : 'Info e partecipazione'} ${icon('h-arrow-right')}</button>
          ${!past ? `<button type="button" data-share="${e.id}" class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-display text-xs uppercase tracking-[.2em] transition hover:border-flame">${icon('h-share')} <span>Condividi</span></button>` : ''}
        </div>
      </div>
    </div>
  </article>`;
}
function emptyUpcoming() {
  return `
  <div class="grid items-center gap-8 rounded-2xl border border-dashed border-white/15 p-8 sm:p-10 md:grid-cols-12">
    <div class="md:col-span-8">
      <p class="font-marker text-xl text-flame">la pista si sta già scaldando…</p>
      <h3 class="mt-1 font-display uppercase text-3xl leading-tight">Nuove date in arrivo</h3>
      <p class="mt-3 max-w-xl leading-relaxed text-bone/65">Al momento non ci sono eventi confermati per i prossimi giorni. In attesa della prossima serata, i corsi continuano ogni settimana — e le novità escono prima su Instagram.</p>
    </div>
    <div class="flex flex-col gap-2 md:col-span-4">
      <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 rounded-full bg-flame px-5 py-3 font-display text-xs uppercase tracking-[.2em] text-ink transition hover:bg-white">${icon('b-instagram')} Segui @forro_em_milao</a>
      <a href="#orari" class="flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-display text-xs uppercase tracking-[.2em] transition hover:border-flame">${icon('h-calendar')} Corsi della settimana</a>
      <button type="button" data-ev-tab="past" class="text-sm text-bone/60 underline underline-offset-4 hover:text-flame">Vedi le edizioni passate</button>
    </div>
  </div>`;
}
function renderEvents() {
  const next = events.filter((e) => !isPast(e)).sort((a, b) => a.start - b.start);
  const past = events.filter(isPast).sort((a, b) => b.start - a.start);
  $('[data-ev-count="next"]').textContent = `(${next.length})`;
  $('[data-ev-count="past"]').textContent = `(${past.length})`;
  const list = evTab === 'next' ? next : past;
  $('#eventList').innerHTML = list.length ? list.map(eventCard).join('') : (evTab === 'next' ? emptyUpcoming() : '<p class="rounded-2xl border border-white/10 p-8 text-center text-bone/60">Nessun evento passato registrato.</p>');
  $$('[data-ev-tab][role="tab"]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.evTab === evTab)));
  $('#evSource').innerHTML = evSource === 'gcal'
    ? `<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Sincronizzato con Google Calendar`
    : `${icon('h-calendar', 'h-3.5 w-3.5')} Calendario del progetto`;
  injectEventSchema(next);
  if (window.AOS?.refreshHard) AOS.refreshHard();
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-ev-tab]');
  if (!t) return;
  evTab = t.dataset.evTab;
  renderEvents();
  if (!t.matches('[role="tab"]')) $('#eventi').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
});

// Detalhe do evento (modal com link próprio: #evento-<id>, para compartilhar)
function eventDetail(e) {
  const past = isPast(e);
  const map = e.address || e.place ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.place} ${e.address}`.trim())}` : '';
  const cal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${gcalStamp(e.start)}/${gcalStamp(e.end)}&location=${encodeURIComponent([e.place, e.address].filter(Boolean).join(', '))}&details=${encodeURIComponent(`${e.text || ''}\n\n${SITE}#evento-${e.id}`)}`;
  return `
    <div class="relative aspect-[16/8] overflow-hidden rounded-t-2xl bg-ink">
      ${photo(e.img, '(min-width: 672px) 672px, 100vw', '', `h-full w-full object-cover ${past ? 'grayscale' : ''}`)}
      <span class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></span>
      <div class="absolute bottom-5 left-6 right-6 text-bone">
        <div class="flex flex-wrap items-center gap-2"><span class="rounded-full bg-flame px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">${esc(CATS[e.cat]?.label || 'Evento')}</span>${statusBadge(e)}</div>
        <h3 id="evModalTitle" class="mt-2 font-display uppercase text-3xl leading-tight sm:text-4xl">${esc(e.title)}</h3>
      </div>
    </div>
    <div class="p-6 sm:p-8">
      <dl class="grid gap-4 sm:grid-cols-2">
        <div class="flex gap-3">${icon('h-calendar', 'mt-0.5 h-5 w-5 shrink-0 text-flame')}<div><dt class="font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">Data</dt><dd class="mt-0.5 font-semibold first-letter:uppercase">${esc(dfLong.format(e.start))}</dd></div></div>
        <div class="flex gap-3">${icon('h-clock', 'mt-0.5 h-5 w-5 shrink-0 text-flame')}<div><dt class="font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">Orario</dt><dd class="mt-0.5 font-semibold">${hm(e.start)} – ${hm(e.end)}</dd></div></div>
        <div class="flex gap-3 sm:col-span-2">${icon('h-map-pin', 'mt-0.5 h-5 w-5 shrink-0 text-flame')}<div><dt class="font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">Luogo</dt><dd class="mt-0.5 font-semibold">${esc(e.place || 'Luogo comunicato su Instagram')}</dd>${e.address ? `<dd class="text-sm text-bone/60">${esc(e.address)}</dd>` : ''}</div></div>
        ${e.price ? `<div class="flex gap-3 sm:col-span-2">${icon('h-ticket', 'mt-0.5 h-5 w-5 shrink-0 text-flame')}<div><dt class="font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">Partecipazione</dt><dd class="mt-0.5 font-semibold">${esc(e.price)}</dd></div></div>` : ''}
      </dl>
      ${e.text ? `<p class="mt-6 whitespace-pre-line leading-relaxed text-bone/65">${esc(e.text)}</p>` : ''}
      ${e.program ? `<div class="mt-6 rounded-2xl bg-ink/60 p-5"><p class="font-mono text-[10px] uppercase tracking-[.25em] text-flame">Programma</p><ol class="mt-3 space-y-2">${e.program.map(([h, t]) => `<li class="flex gap-4 text-sm"><span class="w-20 shrink-0 font-mono font-bold text-flame">${esc(h)}</span><span>${esc(t)}</span></li>`).join('')}</ol></div>` : ''}
      <div class="mt-7 flex flex-wrap gap-2">
        ${!past && e.link ? `<a href="${esc(e.link)}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] text-ink transition hover:bg-white">${icon('h-ticket')} Prendi il biglietto</a>` : ''}
        ${map ? `<a href="${map}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full ${!past && !e.link ? 'bg-flame text-ink hover:bg-white' : 'border border-white/15 hover:border-flame'} px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] transition">${icon('h-map-pin')} Come arrivare</a>` : ''}
        ${!past ? `<a href="${cal}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] transition hover:border-flame">${icon('h-calendar')} Salva in agenda</a>
        <button type="button" data-share="${e.id}" class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] transition hover:border-flame">${icon('h-share')} <span>Condividi</span></button>` : ''}
        <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-display text-xs uppercase tracking-[.2em] transition hover:border-flame">${icon('b-instagram')} ${past ? 'Foto e novità' : 'Novità su Instagram'}</a>
      </div>
      ${past ? '<p class="mt-5 text-sm text-bone/50">Questo evento si è già svolto. Scopri i prossimi in calendario o guarda le foto nella galleria.</p>' : ''}
    </div>`;
}
function openEvent(id) {
  const ev = events.find((x) => x.id === id);
  if (!ev) return;
  $('#evModalBody').innerHTML = eventDetail(ev);
  history.replaceState(null, '', `#evento-${id}`);
  openModal($('#eventModal'));
}
document.addEventListener('click', async (e) => {
  const open = e.target.closest('[data-event]');
  if (open) { openEvent(open.dataset.event); return; }
  const sh = e.target.closest('[data-share]');
  if (!sh) return;
  const ev = events.find((x) => x.id === sh.dataset.share);
  const url = `${SITE}#evento-${ev.id}`;
  const text = `${ev.title} — ${dfLong.format(ev.start)}, ${hm(ev.start)}${ev.place ? ` · ${ev.place}` : ''}`;
  try {
    if (navigator.share) await navigator.share({ title: ev.title, text, url });
    else { await navigator.clipboard.writeText(`${text}\n${url}`); const l = $('span', sh); l.textContent = 'Link copiato!'; setTimeout(() => { l.textContent = 'Condividi'; }, 2500); }
  } catch { /* compartilhamento cancelado */ }
});

// Dados estruturados dos próximos eventos (só os confirmados no calendário)
function injectEventSchema(list) {
  $('#eventSchema')?.remove();
  if (!list.length) return;
  const s = document.createElement('script');
  s.type = 'application/ld+json'; s.id = 'eventSchema';
  s.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': list.slice(0, 10).map((e) => ({
      '@type': 'DanceEvent', name: e.title, startDate: e.start.toISOString(), endDate: e.end.toISOString(),
      eventStatus: e.status === 'cancelado' ? 'https://schema.org/EventCancelled' : e.status === 'adiado' ? 'https://schema.org/EventPostponed' : 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: e.place || 'Milano', address: e.address || 'Milano, Italia' },
      image: `${SITE}${IMG}photos/${e.img}.webp`, description: e.text || e.title, url: `${SITE}#evento-${e.id}`,
      organizer: { '@type': 'Organization', name: 'Forró em Milão', url: SITE },
    })),
  });
  document.head.appendChild(s);
}

renderEvents();
loadCalendar();
const eventFromHash = () => { if (location.hash.startsWith('#evento-') && !$('#eventModal').classList.contains('is-open')) openEvent(location.hash.slice(8)); };
eventFromHash();
window.addEventListener('hashchange', eventFromHash);

// ---------- RÁDIO ----------
const audio = $('#radioAudio');
const statusEl = $('#radioStatus');
let radioOn = false;
let npTimer = 0;
const STATUS = {
  idle: ['bg-bone/60', 'Pronta a suonare'],
  loading: ['bg-flame animate-pulse', 'Connessione…'],
  live: ['bg-emerald-400', 'In diretta'],
  paused: ['bg-bone/60', 'In pausa'],
  error: ['bg-red-400', 'Non disponibile'],
};
function setStatus(k) {
  const [dot, label] = STATUS[k];
  statusEl.innerHTML = `<span class="h-1.5 w-1.5 rounded-full ${dot}"></span> ${label}`;
  $('#radioError').classList.toggle('hidden', k !== 'error');
  $('#radioError').classList.toggle('flex', k === 'error');
}
function setPlaying(on) {
  radioOn = on;
  document.body.classList.toggle('is-playing', on);
  $$('[data-radio-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    $('.radio-icon-play', b)?.classList.toggle('hidden', on);
    $('.radio-icon-pause', b)?.classList.toggle('hidden', !on);
    const l = $('[data-radio-label]', b);
    if (l) l.textContent = on ? 'Pausa' : 'Ascolta ora';
  });
  updateMini();
}
function playRadio() {
  setStatus('loading');
  setPlaying(true);
  audio.src = `${RADIO.stream}?t=${Date.now()}`; // sempre o "ao vivo", sem trecho em cache
  audio.volume = +$('#radioVolume').value;
  audio.play().catch(() => { setStatus('error'); setPlaying(false); });
  fetchNowPlaying();
  clearInterval(npTimer);
  npTimer = setInterval(fetchNowPlaying, 20000);
}
function stopRadio() {
  audio.pause();
  audio.removeAttribute('src'); audio.load(); // para de baixar o stream
  clearInterval(npTimer);
  setPlaying(false);
  setStatus('paused');
}
audio.addEventListener('playing', () => setStatus('live'));
audio.addEventListener('waiting', () => { if (radioOn) setStatus('loading'); });
audio.addEventListener('error', () => { if (radioOn) { setStatus('error'); setPlaying(false); clearInterval(npTimer); } });
$$('[data-radio-toggle]').forEach((b) => b.addEventListener('click', (e) => {
  e.preventDefault();
  if (radioOn) stopRadio(); else playRadio();
}));
$('#radioRetry').addEventListener('click', playRadio);
$('#radioVolume').addEventListener('input', (e) => { audio.volume = +e.target.value; });

const ago = (ts) => { const m = Math.max(1, Math.round((Date.now() / 1000 - ts) / 60)); return m < 60 ? `${m} min fa` : `${Math.round(m / 60)} h fa`; };
async function fetchNowPlaying() {
  if (!radioOn && getConsent() !== 'all') return;
  try {
    const r = await fetch(RADIO.api, { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    const d = await r.json();
    const s = d.now_playing?.song;
    if (s) {
      $$('[data-np="title"]').forEach((el) => { el.textContent = s.title || s.text; });
      $$('[data-np="artist"]').forEach((el) => { el.textContent = [s.artist, s.album].filter(Boolean).join(' · '); });
      const art = $('#npArt');
      if (s.art && !/\/generic_song/.test(s.art)) { art.src = s.art; art.alt = `Copertina di ${s.title}`; art.classList.remove('hidden'); art.onerror = () => art.classList.add('hidden'); } else art.classList.add('hidden');
      if ('mediaSession' in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: s.title || s.text, artist: s.artist || 'Radio Forró em Milão', album: 'Radio Forró em Milão', artwork: s.art ? [{ src: s.art, sizes: '500x500' }] : [] });
    }
    const n = d.listeners?.current;
    const le = $('#radioListeners');
    if (n) { le.textContent = `${n} ${n === 1 ? 'persona in ascolto' : 'persone in ascolto'} ora`; le.classList.remove('hidden'); }
    // Setlist de papel: a música atual (circulada) + as últimas que tocaram
    const hist = (d.song_history || []).slice(0, 9);
    if (s || hist.length) {
      const row = (song, ts, now) => `<li>${now ? `<span class="circled">${esc(song.title || song.text)}</span>` : esc(song.title || song.text)} <span class="font-sans text-[11px] text-ink/50">${esc(song.artist)}${now ? ' · in onda ora' : ts ? ` · ${ago(ts)}` : ''}</span></li>`;
      $('#radioHistory').innerHTML = (s ? row(s, 0, true) : '') + hist.map((h) => row(h.song, h.played_at)).join('');
    }
  } catch { /* API fora do ar: mantém os textos padrão — o áudio continua independente */ }
}
fetchNowPlaying();

// Mini player: com a rádio tocando, aparece quando a seção da rádio sai da tela
let radioInView = false;
function updateMini() { $('#miniPlayer').classList.toggle('is-shown', radioOn && !radioInView); }
new IntersectionObserver(([en]) => { radioInView = en.isIntersecting; updateMini(); }).observe($('#radio'));

// ---------- GALERIA ----------
let galleryList = GALLERY;
let galleryCat = '';
// Com filtro, as fotos ficam do mesmo tamanho; para a última linha não sobrar incompleta,
// as primeiras ocupam 2 colunas até fechar a grade (2 colunas no celular, 4 a partir de md)
function filteredSpan(i, n) {
  const wideMobile = n % 2 === 1 && i === 0;
  const wideDesktop = i < (4 - (n % 4)) % 4;
  return [wideMobile ? 'col-span-2' : '', wideDesktop ? 'md:col-span-2' : wideMobile ? 'md:col-span-1' : ''].join(' ');
}
function renderGallery() {
  galleryList = galleryCat ? GALLERY.filter((g) => g.cat === galleryCat) : GALLERY;
  $('#galleryGrid').innerHTML = galleryList.map((g, i) => {
    const span = galleryCat ? filteredSpan(i, galleryList.length) : g.span;
    return `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-2xl bg-panel ${span}" aria-label="${esc(`Ingrandisci la foto: ${g.cap}`)}">
    ${photo(g.img, span.includes('col-span-2') ? '(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw' : '(min-width: 1280px) 300px, (min-width: 768px) 24vw, 46vw', `Forró em Milão — ${g.cap}`, 'duo h-full w-full object-cover', { style: g.pos ? `object-position:${g.pos}` : '' })}
    <span class="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition group-hover:opacity-100"></span>
    <span class="absolute bottom-3 left-3 right-3 translate-y-2 text-left font-mono text-[10px] uppercase tracking-[.15em] text-bone opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(g.cap)}</span>
  </button>`;
  }).join('');
}
$('#galleryFilters').innerHTML = ['', ...GALLERY_CATS].map((c) => `<button type="button" data-gcat="${esc(c)}" aria-pressed="${c === ''}" class="chip rounded-full border border-white/15 px-4 py-2 font-display text-xs uppercase tracking-[.2em] transition hover:border-flame">${c || 'Tutte'}</button>`).join('');
$('#galleryFilters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-gcat]');
  if (!b) return;
  galleryCat = b.dataset.gcat;
  $$('[data-gcat]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  renderGallery();
});
renderGallery();

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + galleryList.length) % galleryList.length;
  const g = galleryList[lbIndex];
  $('#lbImg').src = `${IMG}photos/${g.img}.webp`;
  $('#lbImg').alt = `Forró em Milão — ${g.cap}`;
  $('#lbCap').textContent = `${pad(lbIndex + 1)} / ${pad(galleryList.length)} — ${g.cap}`;
}
$('#galleryGrid').addEventListener('click', (e) => {
  const b = e.target.closest('[data-lb-index]');
  if (!b) return;
  showLb(+b.dataset.lbIndex);
  openModal($('#lightbox'));
});
$$('[data-lb]').forEach((b) => b.addEventListener('click', () => showLb(lbIndex + (b.dataset.lb === 'next' ? 1 : -1))));
// Deslizar no celular
let touchX = null;
$('#lightbox').addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
$('#lightbox').addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

// ---------- PARCEIROS E EQUIPE ----------
$('#partnerGrid').innerHTML = PARTNERS.map((p, i) => `
  <a href="${p.url}" target="_blank" rel="noopener" class="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel transition hover:-translate-y-1 hover:border-flame/50 hover:shadow-xl sm:flex-row" data-aos="fade-up" data-aos-delay="${i * 100}">
    <span class="grid shrink-0 place-items-center bg-white p-6 sm:w-56"><img src="${IMG}partners/${p.logo}.webp" width="${p.w}" height="${p.h}" alt="Logo ${esc(p.name)}" class="max-h-24 w-auto object-contain" loading="lazy" decoding="async"></span>
    <span class="flex flex-1 flex-col p-6">
      <span class="font-mono text-[10px] uppercase tracking-[.25em] text-flame">${esc(p.tag)}</span>
      <span class="mt-1 font-display uppercase text-2xl">${esc(p.name)}</span>
      <span class="mt-2 text-sm leading-relaxed text-bone/60">${esc(p.text)}</span>
      <span class="mt-4 inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[.2em] text-flame">Scopri ${icon('h-arrow-up-right', 'h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5')}</span>
    </span>
  </a>`).join('');

const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
$('#teamGrid').innerHTML = TEAM.map((m, i) => `
  <article class="rounded-2xl border border-white/10 bg-panel p-6" data-aos="fade-up" data-aos-delay="${i * 70}">
    ${m.photo
      ? `<img src="${IMG}team/${m.photo}.webp" width="160" height="160" alt="${esc(m.name)}" class="h-20 w-20 rounded-full object-cover" loading="lazy">`
      : `<span class="grid h-20 w-20 place-items-center rounded-full font-display uppercase text-3xl ${m.color}" aria-hidden="true">${esc(initials(m.name))}</span>`}
    <p class="mt-5 font-mono text-[10px] uppercase tracking-[.25em] text-flame">${esc(m.role)}</p>
    <h4 class="mt-1 font-display uppercase text-2xl leading-tight">${esc(m.name)}${m.alias ? ` <span class="block font-marker text-lg text-bone/60">${esc(m.alias)}</span>` : ''}</h4>
    <p class="mt-2 text-sm leading-relaxed text-bone/60">${esc(m.text)}</p>
  </article>`).join('');

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
  toTop.classList.toggle('pointer-events-none', y < 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
requestAnimationFrame(onScroll);

const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-140px 0px -60% 0px' });
// Todas as seções entram no espião: nas que não estão no menu (início, rádio, dúvidas…) nenhum link fica ativo
$$('main > section[id]').forEach((sec) => spy.observe(sec));

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

// ---------- ANIMAÇÕES GUIADAS PELO SCROLL ----------
// • "O que fazemos": os nomes acendem da esquerda para a direita (stage-fill, como na referência)
// • Aulas: o VU dos cards do trio enche e, cheio, os instrumentos "tocam" (is-live) • a linha da metodologia avança
// Cada seção só anima enquanto está na tela; com "reduzir movimento" fica tudo estático e preenchido.
(() => {
  if (reduceMotion) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const fills = $$('.stage-fill');
  const mics = $$('#corsi .mic');
  const line = $('.step-line');
  const visible = new Set();
  let raf = 0;
  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    fills.forEach((el) => {
      const p = clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4));
      el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    });
    mics.forEach((el) => {
      const p = clamp((vh * 0.95 - el.getBoundingClientRect().top) / (vh * 0.5));
      el.style.setProperty('--kp', p.toFixed(3));
      el.classList.toggle('is-live', p >= 1);
    });
    if (line) line.style.setProperty('--p', `${(clamp((vh * 0.85 - line.getBoundingClientRect().top) / (vh * 0.45)) * 100).toFixed(1)}%`);
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
    if (visible.size && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '150px 0px' });
  ['#chi-siamo', '#corsi'].forEach((s) => io.observe($(s)));
})();

// ---------- CONECTE-SE (fotos que levam ao Instagram) ----------
$('#instaGrid').innerHTML = INSTA.map((src, i) => `
  <a href="${INSTAGRAM}" target="_blank" rel="noopener" class="group relative aspect-square overflow-hidden rounded-lg" data-aos="zoom-in" data-aos-delay="${i * 60}" aria-label="Instagram @forro_em_milao">
    ${photo(src, '(min-width: 1280px) 200px, (min-width: 768px) 16vw, 32vw', '', 'duo h-full w-full object-cover')}
    <span class="absolute right-2 top-2 text-white/80">${icon('b-instagram', 'h-4 w-4')}</span>
    <span class="absolute inset-0 grid place-items-center bg-flame/0 transition group-hover:bg-flame/40"></span>
  </a>`).join('');

// ---------- FORMULÁRIO (monta a mensagem e abre o app de e-mail) ----------
// Sem servidor: nada é guardado pelo site. Anti-spam: campo-armadilha + tempo mínimo de preenchimento.
// Para receber direto (e só confirmar "enviado" quando o envio for confirmado), troque por um serviço de
// formulário (ex.: Formspree) e envie via fetch, mostrando a confirmação apenas se a resposta for ok.
const form = $('#contactForm');
const formMsg = $('#formMsg');
const openedAt = Date.now();
function say(text, ok) {
  formMsg.innerHTML = text;
  formMsg.className = `mt-4 text-sm ${ok ? 'text-bone' : 'text-flame'}`;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(form);
  $$('.field', form).forEach((el) => el.removeAttribute('aria-invalid'));
  if (f.get('website') || Date.now() - openedAt < 3000) { say('Grazie! Il tuo messaggio è pronto per l’invio.', true); return; }
  const name = f.get('nome').trim();
  const email = f.get('email').trim();
  const msg = f.get('mensagem').trim();
  const bad = [];
  if (!name) bad.push('nome');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push('email');
  if (!msg) bad.push('mensagem');
  if (bad.length) {
    bad.forEach((n) => form.elements[n].setAttribute('aria-invalid', 'true'));
    form.elements[bad[0]].focus();
    say(bad.includes('email') && email ? 'Controlla l’indirizzo e-mail.' : 'Compila nome, e-mail e messaggio.');
    return;
  }
  if (!f.get('privacidade')) { say('Per poterti rispondere, conferma di aver letto l’Informativa sulla privacy.'); return; }
  const tipo = f.get('tipo') || 'Contatto';
  const subject = `[${tipo}] ${f.get('assunto').trim() || 'Messaggio dal sito'} — ${name}`;
  const body = [
    'Ciao, team di Forró em Milão!',
    '',
    msg,
    '',
    '—',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Tipo di contatto: ${f.get('tipo') || '-'}`,
    '',
    `Inviato dal sito ${SITE}`,
  ].join('\n');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  say(`Grazie, ${esc(name)}! La tua app di posta dovrebbe aprirsi con il messaggio pronto: ti basta premere invia. Se non si è aperto nulla, scrivi a <a href="mailto:${EMAIL}" class="font-semibold underline">${EMAIL}</a>.`, true);
});
$('#copyEmail').addEventListener('click', async (e) => {
  const label = $('span', e.currentTarget);
  try { await navigator.clipboard.writeText(EMAIL); label.textContent = 'Copiato!'; } catch { label.textContent = EMAIL; }
  setTimeout(() => { label.textContent = 'Copia l’indirizzo'; }, 2500);
});
// Botões espalhados pelo site já preenchem o tipo de contato e o assunto
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tipo], [data-assunto]');
  if (!t) return;
  if (t.dataset.tipo) form.elements.tipo.value = t.dataset.tipo;
  if (t.dataset.assunto) form.elements.assunto.value = t.dataset.assunto;
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
    faqStatus.textContent = 'sta scrivendo…';
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

$('#year').textContent = new Date().getFullYear();

// ---------- AOS ----------
// Inicia na primeira interação ou 5 s após o load, fora do caminho crítico da primeira pintura
const aosEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
let aosTimer;
function initAOS() {
  clearTimeout(aosTimer);
  aosEvents.forEach((ev) => removeEventListener(ev, initAOS));
  if (window.AOS) AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' });
}
aosEvents.forEach((ev) => addEventListener(ev, initAOS, { once: true, passive: true }));
window.addEventListener('load', () => { aosTimer = setTimeout(initAOS, 5000); });
