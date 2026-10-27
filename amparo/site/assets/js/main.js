/* ==========================================================
   Amparo — Pianista bodas y eventos · interações do site
   (mesma base e mesmo estilo do site de Flagship)
   Os conteúdos repetidos (repertório, momentos, vídeos, fotos)
   ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.vercel.app/amparo/site/';
const WHATSAPP = '34614334138'; // +34 614 33 41 38 (link do briefing e bio do Instagram)
const INSTAGRAM = 'https://www.instagram.com/amparo.pianista.eventos/';

// Repertório: só peças que a Amparo já tocou em vídeos publicados no Instagram (out/2026).
// cats: clasica | bandas | pop | contemporanea | romantica (botões de filtro no index.html) · v = id do reel para ouvir
const REPERTORIO = [
  { t: 'Canon en Re mayor', a: 'Johann Pachelbel', cats: ['clasica', 'romantica'], v: 'DZcE-oYCwzq' },
  { t: 'Ave María', a: 'Giulio Caccini', cats: ['clasica'], v: 'DaXNSDcCR_a' },
  { t: 'Moon River', a: 'Henry Mancini · «Desayuno con diamantes»', cats: ['bandas', 'romantica'], v: 'DZcE-oYCwzq' },
  { t: 'A Thousand Years', a: 'Christina Perri · «Crepúsculo»', cats: ['pop', 'bandas', 'romantica'], v: 'DZcE-oYCwzq' },
  { t: 'Nuvole Bianche', a: 'Ludovico Einaudi', cats: ['contemporanea', 'romantica'], v: 'DcqqnFliEon' },
  { t: 'Lothlórien', a: 'Enya', cats: ['contemporanea'], v: 'Dby5FaxCHiN' },
  { t: 'Hallelujah', a: 'Leonard Cohen', cats: ['pop'], v: 'DaPtXXTCK6X' },
  { t: 'What a Wonderful World', a: 'Louis Armstrong', cats: ['pop', 'romantica'], v: 'DepSuNviTtW' },
  { t: 'Piano Man', a: 'Billy Joel', cats: ['pop'], v: 'DdQ0Aq6C_Bd' },
  { t: 'Total Eclipse of the Heart', a: 'Bonnie Tyler', cats: ['pop'], v: 'DbQm5kvCzoR' },
];

// Momentos da boda (briefing seção 5). Sugestões tiradas das legendas da própria artista
// (Lothlórien: "entrada de los invitados"; Ave María: "comunión, ofrendas"; Hallelujah: "firma de los novios")
const MOMENTOS = [
  { m: 'Entrada de invitados y familiares', p: 'Lothlórien — Enya', d: 'Una propuesta delicada mientras todos ocupan su lugar.' },
  { m: 'Entrada de la pareja', p: 'Canon en Re mayor — Pachelbel', d: 'Un clásico atemporal para el momento más esperado.' },
  { m: 'Intercambio de alianzas', p: 'A Thousand Years — Christina Perri', d: 'Romántica y emotiva, para el «sí, quiero».' },
  { m: 'Firma, ofrendas o comunión', p: 'Hallelujah · Ave María de Caccini', d: 'Serenidad y emoción para los momentos de reflexión.' },
  { m: 'Salida de los novios', p: 'What a Wonderful World — Louis Armstrong', d: 'La banda sonora perfecta para un nuevo comienzo.' },
  { m: 'Cóctel y recepción', p: 'Moon River · Piano Man · Nuvole Bianche', d: 'Clásicos y bandas sonoras para recibir a tus invitados.' },
];

// Vídeos: reels do Instagram oficial. id = código do reel · capa em assets/img/videos/<id>.webp (quadro do próprio vídeo).
// O primeiro é o vídeo em destaque (capa horizontal). Novo vídeo: capa 508x635 em videos/<id>.webp e uma linha aqui
// Ave María: a capa é um quadro da mesma sessão na igreja (vídeo de Lothlórien) — trocar por um quadro do próprio reel se quiser
const VIDEOS = [
  { id: 'DZcE-oYCwzq', title: 'Pianista para bodas y eventos', sub: 'Canon en Re M · Nuvole Bianche · A Thousand Years · Moon River', tag: 'Vídeo de presentación' },
  { id: 'Dby5FaxCHiN', title: 'Lothlórien', sub: 'Enya', tag: 'En la iglesia' },
  { id: 'DaXNSDcCR_a', title: 'Ave María', sub: 'Caccini', tag: 'Ceremonia religiosa' },
  { id: 'DaPtXXTCK6X', title: 'Hallelujah', sub: 'Leonard Cohen', tag: 'Ceremonia' },
  { id: 'DcqqnFliEon', title: 'Nuvole Bianche', sub: 'Ludovico Einaudi', tag: 'Terraza en Valencia' },
  { id: 'DepSuNviTtW', title: 'What a Wonderful World', sub: 'Louis Armstrong', tag: 'Piano en el aeropuerto' },
  { id: 'DdQ0Aq6C_Bd', title: 'Piano Man', sub: 'Billy Joel', tag: 'Piano de cola' },
  { id: 'DbQm5kvCzoR', title: 'Total Eclipse of the Heart', sub: 'Bonnie Tyler', tag: 'Sesión' },
];

// Fotos (quadros dos vídeos oficiais) · photos/<img>.webp · span = tamanho na grade · pos = foco do recorte (object-position)
// Quando a artista enviar fotos profissionais de eventos reais, acrescentar aqui (lado maior ~1200 px, .webp)
const GALERIA = [
  { img: 'piano-man', cap: 'Piano de cola', span: 'row-span-2', w: 508, h: 743, pos: '40% 40%' },
  { img: 'retrato-jardin', cap: 'En el jardín', span: 'col-span-2 row-span-2', w: 640, h: 556, pos: '50% 30%' },
  { img: 'iglesia', cap: 'Ceremonia en la iglesia', span: 'row-span-2', w: 508, h: 903, pos: '50% 62%' },
  { img: 'manos-teclado', cap: 'Al teclado', span: 'row-span-2', w: 508, h: 903, pos: '40% 45%' },
  { img: 'aeropuerto', cap: 'Piano en el aeropuerto', span: 'col-span-2', w: 720, h: 454, pos: '40% 40%' },
  { img: 'retrato-canon', cap: 'Canon en Re mayor', span: 'row-span-2', w: 640, h: 556, pos: '45% 30%' },
  { img: 'palmeras', cap: 'Entre palmeras', span: 'col-span-2', w: 720, h: 576, pos: '50% 45%' },
  { img: 'retrato-perfil', cap: 'Nuvole Bianche', span: 'col-span-2 row-span-2', w: 720, h: 602, pos: '40% 35%' },
  { img: 'about', cap: 'Ensayo', span: 'row-span-2', w: 508, h: 903, pos: '50% 40%' },
  { img: 'servicio-privados', cap: 'Terraza en Valencia', span: 'row-span-2', w: 508, h: 635, pos: '50% 40%' },
];


// Fitas inclinadas abaixo do hero (mesmo componente do Flagship)
const MARQUEE = ['Pianista bodas y eventos', 'Alicante', 'Valencia', 'Murcia', 'Ceremonias', 'Cócteles', 'Eventos privados', 'Música en directo', 'Tu canción especial', 'Piano y voz'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const igUrl = (id) => `https://www.instagram.com/reel/${id}/`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Métricas: cada clique em [data-track] vira um evento no dataLayer. Sem ferramenta de análise instalada, não sai nada do site.
// Para medir os cliques no WhatsApp (indicador de sucesso do briefing), instale GA4/Plausible e cite na Política de Privacidade
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'amparo_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

// ---------- WHATSAPP ----------
// Mensagem pré-preenchida do briefing (seção 11). A pessoa envia manualmente: o site só abre a conversa com o texto pronto.
function waText({ nombre = '', tipo = '', fecha = '', localidad = '', lugar = '', extra = '', mensaje = '' } = {}) {
  const lines = ['¡Hola, Amparo! He visitado tu página web y me gustaría recibir información sobre tus servicios musicales.', ''];
  if (nombre) lines.push(`Nombre: ${nombre}`);
  lines.push(`Tipo de evento: ${tipo}`, `Fecha: ${fecha}`, `Localidad: ${localidad}`, `Lugar de celebración: ${lugar}`);
  if (extra) lines.push(extra);
  if (mensaje) lines.push('', mensaje);
  lines.push('', '¡Muchas gracias!');
  return lines.join('\n');
}
const waLink = (data) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText(data))}`;
// data-wa = tipo de evento já preenchido (vazio = genérico) · data-wa-extra = linha extra (ex.: "Canción especial: ")
$$('[data-wa]').forEach((a) => { a.href = waLink({ tipo: a.dataset.wa, extra: a.dataset.waExtra || '' }); });

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${esc(t)}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

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

// ---------- REPERTÓRIO (lista no estilo "Stages & festivals" do Flagship) ----------
const CAT_LABEL = { clasica: 'Clásica', bandas: 'Banda sonora', pop: 'Pop internacional', contemporanea: 'Contemporánea', romantica: 'Romántica' };
whenNear('#repList', () => REPERTORIO.map((r, i) => `
  <li data-cats="${r.cats.join(' ')}">
    <button type="button" data-video="${r.v}" aria-label="${esc(`Escuchar ${r.t} — ${r.a}`)}" class="group relative grid w-full items-center gap-2 border-b border-white/10 py-6 text-left transition hover:bg-white/[.02] sm:grid-cols-12 sm:gap-4 sm:py-7">
      <span class="font-mono text-[11px] uppercase tracking-[.2em] text-bone/45 sm:col-span-2">${pad(i + 1)} · ${esc(CAT_LABEL[r.cats[0]])}</span>
      <span class="stage-fill font-display text-4xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 lg:text-6xl">${esc(r.t)}</span>
      <span class="text-sm leading-relaxed text-bone/60 sm:col-span-3">${icon('h-note', 'mr-1.5 inline h-4 w-4 align-[-3px] text-amber')}${esc(r.a)}</span>
      <span class="hidden items-center justify-end text-bone/40 transition group-hover:text-amber sm:col-span-1 sm:flex">${icon('h-play', 'h-6 w-6')}</span>
    </button>
  </li>`).join(''));

$('#repFilters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-filter]');
  if (!b) return;
  renderGrid($('#repList'));
  $$('[data-filter]', $('#repFilters')).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  $$('[data-cats]', $('#repList')).forEach((li) => { li.hidden = b.dataset.filter !== 'all' && !li.dataset.cats.split(' ').includes(b.dataset.filter); });
});

// ---------- MOMENTOS DA BODA (linha do tempo do Flagship: a linha se preenche com o scroll) ----------
let flightLine = null;
whenNear('#momentos', () => `
  <span class="flight-line absolute bottom-3 left-[7px] top-3 w-px" aria-hidden="true"></span>
  ${MOMENTOS.map((m, i) => `
  <li class="relative pb-10 last:pb-0">
    <span class="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border ${i === 1 ? 'border-amber bg-amber' : 'border-amber/60 bg-ink'}">${i === 1 ? '<span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink text-ink"></span>' : ''}</span>
    <p class="font-mono text-[10px] uppercase tracking-[.3em] ${i === 1 ? 'text-amber' : 'text-bone/50'}">${pad(i + 1)} · ${esc(m.m)}</p>
    <p class="mt-1 font-display text-2xl uppercase leading-tight">${esc(m.p)}</p>
    <p class="mt-1 text-sm leading-relaxed text-bone/60">${esc(m.d)}</p>
  </li>`).join('')}`, (el) => { flightLine = $('.flight-line', el); });

// ---------- VÍDEOS ----------
const [FEAT_VIDEO, ...GRID_VIDEOS] = VIDEOS;
whenNear('#videoFeatured', () => `
  <button type="button" data-video="${FEAT_VIDEO.id}" class="group relative grid w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 text-left lg:grid-cols-[1.6fr_1fr]">
    <span class="relative block aspect-video overflow-hidden">
      <img src="${IMG}videos/${FEAT_VIDEO.id}.webp" width="960" height="540" alt="${esc(`Amparo — ${FEAT_VIDEO.title}`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 grid place-items-center"><span class="grid h-20 w-20 place-items-center rounded-full bg-amber text-ink shadow-[0_10px_25px_-5px_rgba(224,164,88,.7)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-1 h-8 w-8')}</span></span>
    </span>
    <span class="flex flex-col justify-center p-6 sm:p-10">
      <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-amber"><span class="pulse-dot h-2 w-2 rounded-full bg-amber text-amber"></span> ${esc(FEAT_VIDEO.tag)}</span>
      <span class="mt-3 block font-display text-5xl uppercase leading-none sm:text-6xl">${esc(FEAT_VIDEO.title)}</span>
      <span class="mt-3 block font-mono text-[11px] uppercase tracking-[.2em] text-bone/60">${esc(FEAT_VIDEO.sub)}</span>
      <span class="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bone/80 transition group-hover:text-amber">${icon('b-instagram')} Ver el vídeo</span>
    </span>
  </button>`);

whenNear('#videoGrid', () => GRID_VIDEOS.map((v, i) => `
  <button type="button" data-video="${v.id}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
    <span class="relative block aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
      <img src="${IMG}videos/${v.id}.webp" width="508" height="635" alt="${esc(`Amparo tocando ${v.title} (${v.tag})`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></span>
      <span class="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${esc(v.tag)}</span>
      <span class="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
    </span>
    <span class="mt-4 block font-display text-xl uppercase leading-tight transition group-hover:text-amber">${esc(v.title)}</span>
    <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">${esc(v.sub)}</span>
  </button>`).join('') + `
  <a href="${INSTAGRAM}" target="_blank" rel="noopener" data-track="videos-instagram" class="group flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/20 p-6 text-center transition hover:border-amber" data-aos="fade-up" data-aos-delay="${(GRID_VIDEOS.length % 4) * 80}">
    <span class="grid h-16 w-16 place-items-center rounded-full border border-white/20 text-bone/75 transition group-hover:border-amber group-hover:text-amber">${icon('b-instagram', 'h-6 w-6')}</span>
    <span class="font-display text-2xl uppercase leading-none transition group-hover:text-amber">Más vídeos</span>
    <span class="font-mono text-[9px] uppercase tracking-widest text-bone/50">@amparo.pianista.eventos</span>
  </a>`);

// ---------- GALERIA ----------
whenNear('#galleryGrid', () => GALERIA.map((g, i) => `
  <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
    <img src="${IMG}photos/${g.img}.webp" width="${g.w}" height="${g.h}" alt="${esc(`Amparo — ${g.cap}`)}" class="duo h-full w-full object-cover"${g.pos ? ` style="object-position:${g.pos}"` : ''} loading="lazy" decoding="async">
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
const CONSENT_KEY = 'amparo-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// Player do Instagram: só carrega quando a pessoa clica (o clique é a autorização).
// Quem escolheu "Solo esenciales" vê antes um aviso com a opção de abrir no Instagram.
const embedFrame = (id) => `<iframe class="h-full w-full" src="https://www.instagram.com/reel/${id}/embed/" title="Vídeo de Amparo en Instagram" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" loading="eager" allowfullscreen></iframe>`;
const embedNotice = (id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon('b-instagram', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-embed-once="${id}" class="w-full rounded-full bg-amber px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">Ver aquí</button>` : ''}
      <a href="${igUrl(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[.2em]">Abrir en Instagram</a>
    </div>
  </div>`;
function openVideo(id) {
  const v = VIDEOS.find((x) => x.id === id);
  const frame = $('#videoFrame');
  $('#videoCaption').innerHTML = `${v ? `${esc(v.title)} · ${esc(v.sub.split(' · ')[0])} · ` : ''}<a href="${igUrl(id)}" target="_blank" rel="noopener" class="text-amber hover:underline">Instagram ↗</a>`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${id}`);
  // O modal abre ANTES de o iframe entrar, para o player inicializar já com tamanho
  requestAnimationFrame(() => {
    if (location.protocol === 'file:') {
      frame.innerHTML = embedNotice(id, 'El vídeo de Instagram solo se carga en páginas abiertas por http(s). Para probar en local, ejecuta <code class="text-amber">npm run dev</code> y abre http://localhost:8080.', false);
    } else if (getConsent() === 'essential') {
      frame.innerHTML = embedNotice(id, 'Este vídeo se reproduce desde Instagram, que puede usar sus propias cookies. Consulta la <a href="privacidad.html" class="text-amber underline">Política de privacidad</a>.', true);
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
  $('#lbImg').src = `${IMG}photos/${GALERIA[lbIndex].img}.webp`;
  $('#lbImg').alt = `Amparo — ${GALERIA[lbIndex].cap}`;
  $('#lbCap').textContent = `${pad(lbIndex + 1)} / ${pad(GALERIA.length)} — ${GALERIA[lbIndex].cap}`;
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
$$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => closeModal($('#mobileMenu'))));

// ---------- HEADER / SCROLL SPY / BOTÕES FLUTUANTES ----------
const header = $('#header');
const floaters = [$('#toTop'), $('#waFloat')];
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

// ---------- FORMULÁRIO → WHATSAPP ----------
// Sem servidor: nada é guardado pelo site. Monta a mensagem do briefing e abre a conversa no WhatsApp.
// Anti-spam: campo-armadilha (honeypot).
const form = $('#contactForm');
const formMsg = $('#formMsg');
function say(html, ok) {
  formMsg.innerHTML = html;
  formMsg.className = `mt-4 text-sm ${ok ? 'text-bone' : 'text-amber'}`;
}
const fmtDate = (d) => (d ? new Date(d + 'T12:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(form);
  if (f.get('web')) return; // robô
  const data = {
    nombre: f.get('nombre').trim(),
    tipo: f.get('tipo'),
    fecha: fmtDate(f.get('fecha')),
    localidad: f.get('localidad').trim(),
    lugar: f.get('lugar').trim(),
    mensaje: f.get('mensaje').trim(),
  };
  const missing = [['nombre', 'nombre'], ['tipo', 'tipo de evento'], ['fecha', 'fecha'], ['localidad', 'localidad']].filter(([k]) => !data[k]);
  if (missing.length) {
    say(`Por favor, completa: ${missing.map(([, label]) => label).join(', ')}.`);
    form.elements[missing[0][0]].focus();
    return;
  }
  const url = waLink(data);
  track('form-whatsapp');
  window.open(url, '_blank', 'noopener');
  say(`¡Gracias, ${esc(data.nombre)}! Se ha abierto WhatsApp con tu mensaje: solo tienes que enviarlo. Si no se abrió, <a href="${url}" target="_blank" rel="noopener" class="text-amber underline">pulsa aquí</a>.`, true);
});

// ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
// • os títulos do repertório acendem da esquerda para a direita • a linha dos momentos se preenche.
// Só roda com as seções na tela; com "reduzir movimento" fica tudo estático e preenchido.
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
  io.observe($('#repertorio'));
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
