/* ==========================================================
   Miguel Ángel | Pianista — interações do site
   (mesma base e mesmo estilo do site de Amparo)
   Os conteúdos repetidos (estilos, momentos, atuações/vídeos)
   ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.com/miguel/site/';
const WHATSAPP = '34654578928'; // +34 654 57 89 28 (briefing, fontes [2] e [6])
const EMAIL = 'pianistamiguelangel@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/el_pianista_miguel/';

// Formulário → e-mail via FormSubmit. No 1º envio o FormSubmit manda um e-mail de ATIVAÇÃO para o endereço:
// o artista clica em "Activate Form". Depois, troque o e-mail na URL pelo código aleatório que o FormSubmit mostra.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

// Repertório por estilos (briefing: clássica e adaptações modernas). Quando Miguel aprovar títulos e compositores,
// eles podem entrar aqui no mesmo formato. go = destino ao clicar
const ESTILOS = [
  { t: 'Música clásica', a: 'La base de mi repertorio desde que empecé a estudiar piano a los ocho años.', cat: 'Clásica', go: '#galeria' },
  { t: 'Canciones actuales', a: 'Temas modernos llevados al piano con recursos de la música clásica.', cat: 'Adaptaciones', go: '#galeria' },
  { t: 'Tu canción', a: 'Envíame el título y una versión de referencia: te confirmaré si puedo prepararla.', cat: 'A petición', go: '#contacto', prefill: 'cancion' },
];

// Momentos da boda (briefing: entrada, firma, salida e cóctel). Sem sugestão de músicas até haver repertório aprovado
const MOMENTOS = [
  { m: 'Ceremonia', p: 'La entrada', d: 'Una pieza para acompañar la llegada. Si tenéis una canción pensada, la llevamos al piano.' },
  { m: 'Ceremonia', p: 'La firma', d: 'La música acompaña lo que está ocurriendo mientras se firma.' },
  { m: 'Ceremonia', p: 'La salida', d: 'Una pieza para marcar el final de la ceremonia.' },
  { m: 'Cóctel', p: 'La recepción', d: 'Piezas clásicas, adaptaciones de temas modernos o una combinación de ambas mientras los invitados conversan.' },
];

// Atuações do portfólio público do artista (briefing, "Registros para a seleção inicial", fonte [2]).
// Legendas sem afirmar o tipo de evento até confirmação. img = capa em assets/img/videos/<img> (4:5).
// media: null enquanto não houver vídeo. Formatos: { type: 'instagram', id: 'CODIGO_DO_REEL' } · { type: 'youtube', id: '...' } · { type: 'file', src: 'assets/video/x.mp4' }
// O primeiro item é o destaque (capa horizontal em videos/destacado.*)
const ACTUACIONES = [
  { title: 'Señorío de Lepanto', sub: '2023', tag: 'Actuación', img: 'lepanto.svg', media: null },
  { title: 'Concierto privado', sub: 'Noviembre de 2023', tag: 'Concierto', img: 'concierto-privado.svg', media: null },
  { title: 'Noche en Blanco', sub: 'Vélez-Málaga · 2022', tag: 'Programación cultural', img: 'noche-en-blanco.svg', media: null },
  { title: 'Club de Golf Río Real', sub: 'Julio de 2022', tag: 'Actuación', img: 'rio-real.svg', media: null },
  { title: 'La Viñuela', sub: 'Sesión de piano', tag: 'Sesión privada', img: 'la-vinuela.svg', media: null },
];
const FEATURED_IMG = 'destacado.svg';

// Fitas inclinadas abaixo do hero
const MARQUEE = ['Pianista bodas y eventos', 'Málaga', 'Ceremonias', 'Cócteles', 'Eventos privados', 'Música en directo', 'Clásica y moderna', 'Tu canción al piano'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = 'assets/img/';
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasVideos = ACTUACIONES.some((a) => a.media);

// Métricas (briefing, "Indicadores"): cada clique em [data-track] vira um evento no dataLayer. Sem analytics instalado, nada sai do site.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'miguel_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

// ---------- WHATSAPP ----------
// Mensagem sugerida no briefing; os colchetes ficam para a pessoa completar (ou vão preenchidos pelo formulário)
function waText({ tipo, fecha, lugar, momento, mensaje, nombre } = {}) {
  let t = `Hola, Miguel. Quería consultar disponibilidad para ${tipo || '[tipo de evento]'} el ${fecha || '[fecha]'} en ${lugar || '[localidad o espacio]'}. Me interesa contar con piano en directo para ${momento || '[momento del evento]'}. ¿Podemos hablar de las opciones y del presupuesto?`;
  if (mensaje) t += `\n\n${mensaje}`;
  if (nombre) t += `\n\n${nombre}`;
  return t;
}
const waLink = (data) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText(data))}`;
$$('[data-wa]').forEach((a) => { a.href = waLink({ tipo: a.dataset.wa }); });

// ---------- MARQUEE ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span class="px-6">${esc(t)}</span><span class="opacity-50">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- REPERTÓRIO (lista no estilo do Amparo: o título "acende" com o scroll) ----------
$('#repList').innerHTML = ESTILOS.map((r, i) => `
  <li>
    <a href="${r.go}"${r.prefill ? ` data-prefill="${r.prefill}"` : ''} class="group relative grid w-full items-center gap-2 border-b border-white/10 py-6 text-left transition hover:bg-white/[.02] sm:grid-cols-12 sm:gap-4 sm:py-7">
      <span class="font-mono text-[11px] uppercase tracking-[.2em] text-bone/45 sm:col-span-2">${pad(i + 1)} · ${esc(r.cat)}</span>
      <span class="stage-fill font-display text-4xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 lg:text-6xl">${esc(r.t)}</span>
      <span class="text-sm leading-relaxed text-bone/60 sm:col-span-3">${icon('h-note', 'mr-1.5 inline h-4 w-4 align-[-3px] text-amber')}${esc(r.a)}</span>
      <span class="hidden items-center justify-end text-bone/40 transition group-hover:text-amber sm:col-span-1 sm:flex">${icon(r.prefill ? 'h-arrow-right' : 'h-play', 'h-6 w-6')}</span>
    </a>
  </li>`).join('');

// ---------- MOMENTOS DA BODA (linha do tempo: a linha se preenche com o scroll) ----------
$('#momentos').innerHTML = `
  <span class="flight-line absolute bottom-3 left-[7px] top-3 w-px" aria-hidden="true"></span>
  ${MOMENTOS.map((m, i) => `
  <li class="relative pb-10 last:pb-0">
    <span class="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border ${i === 0 ? 'border-amber bg-amber' : 'border-amber/60 bg-ink'}">${i === 0 ? '<span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink text-ink"></span>' : ''}</span>
    <p class="font-mono text-[10px] uppercase tracking-[.3em] ${i === 0 ? 'text-amber' : 'text-bone/50'}">${pad(i + 1)} · ${esc(m.m)}</p>
    <p class="mt-1 font-display text-2xl uppercase leading-tight">${esc(m.p)}</p>
    <p class="mt-1 text-sm leading-relaxed text-bone/60">${esc(m.d)}</p>
  </li>`).join('')}`;
const flightLine = $('.flight-line');

// ---------- VÍDEOS ----------
// Com vídeo: abre o player. Sem vídeo: o cartão leva ao Instagram (alternativa por link, briefing)
const cardAttrs = (a, i) => (a.media
  ? `type="button" data-video="${i}" aria-label="${esc(`Ver vídeo: ${a.title}`)}"`
  : `href="${INSTAGRAM}" target="_blank" rel="noopener" data-track="video-instagram-${i}" aria-label="${esc(`${a.title}: ver en Instagram`)}"`);
const cardTag = (a) => (a.media ? 'button' : 'a');
const [FEAT, ...GRID] = ACTUACIONES.map((a, i) => ({ ...a, i }));

$('#videoFeatured').innerHTML = `
  <${cardTag(FEAT)} ${cardAttrs(FEAT, FEAT.i)} class="group relative grid w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 text-left lg:grid-cols-[1.6fr_1fr]">
    <span class="relative block aspect-video overflow-hidden">
      <img src="${IMG}videos/${FEATURED_IMG}" width="1280" height="720" alt="${esc(`Miguel Ángel — ${FEAT.title}`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 grid place-items-center"><span class="grid h-20 w-20 place-items-center rounded-full bg-amber text-ink shadow-[0_10px_25px_-5px_rgba(224,164,88,.7)] transition duration-300 group-hover:scale-110">${icon(FEAT.media ? 'h-play' : 'b-instagram', 'ml-1 h-8 w-8')}</span></span>
    </span>
    <span class="flex flex-col justify-center p-6 sm:p-10">
      <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-amber"><span class="pulse-dot h-2 w-2 rounded-full bg-amber text-amber"></span> ${esc(FEAT.tag)}</span>
      <span class="mt-3 block font-display text-5xl uppercase leading-none sm:text-6xl">${esc(FEAT.title)}</span>
      <span class="mt-3 block font-mono text-[11px] uppercase tracking-[.2em] text-bone/60">${esc(FEAT.sub)}</span>
      <span class="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bone/80 transition group-hover:text-amber">${icon('b-instagram')} ${FEAT.media ? 'Ver el vídeo' : 'Ver en Instagram'}</span>
    </span>
  </${cardTag(FEAT)}>`;

$('#videoGrid').innerHTML = GRID.map((v, n) => `
  <${cardTag(v)} ${cardAttrs(v, v.i)} class="group block text-left" data-aos="fade-up" data-aos-delay="${(n % 3) * 80}">
    <span class="relative block aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
      <img src="${IMG}videos/${v.img}" width="800" height="1000" alt="${esc(`Miguel Ángel — ${v.title} (${v.tag})`)}" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></span>
      <span class="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${esc(v.tag)}</span>
      <span class="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">${icon(v.media ? 'h-play' : 'b-instagram', 'ml-0.5 h-4 w-4')}</span>
    </span>
    <span class="mt-4 block font-display text-xl uppercase leading-tight transition group-hover:text-amber">${esc(v.title)}</span>
    <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/50">${esc(v.sub)}</span>
  </${cardTag(v)}>`).join('') + `
  <a href="${INSTAGRAM}" target="_blank" rel="noopener" data-track="videos-instagram" class="group flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/20 p-6 text-center transition hover:border-amber" data-aos="fade-up" data-aos-delay="${(GRID.length % 3) * 80}">
    <span class="grid h-16 w-16 place-items-center rounded-full border border-white/20 text-bone/75 transition group-hover:border-amber group-hover:text-amber">${icon('b-instagram', 'h-6 w-6')}</span>
    <span class="font-display text-2xl uppercase leading-none transition group-hover:text-amber">Más vídeos</span>
    <span class="font-mono text-[9px] uppercase tracking-widest text-bone/50">@el_pianista_miguel</span>
  </a>`;

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
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.modal.is-open').forEach(closeModal); });

// ---------- PRIVACIDADE ----------
// Sem cookies próprios. A escolha (all | essential) fica no localStorage só para não perguntar de novo.
// O aviso só aparece quando houver vídeos externos em ACTUACIONES.
const CONSENT_KEY = 'miguel-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada */ }
  $('#consentBar').classList.add('hidden');
}
if (hasVideos && !getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

const PLATFORM = { instagram: 'Instagram', youtube: 'YouTube' };
const extUrl = (m) => (m.type === 'instagram' ? `https://www.instagram.com/reel/${m.id}/` : `https://www.youtube.com/watch?v=${m.id}`);
function embedFrame(m) {
  if (m.type === 'instagram') return `<iframe class="h-full w-full" src="https://www.instagram.com/reel/${encodeURIComponent(m.id)}/embed/" title="Vídeo de Miguel Ángel en Instagram" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  if (m.type === 'youtube') return `<iframe class="h-full w-full bg-black" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.id)}?autoplay=1&rel=0" title="Vídeo de Miguel Ángel" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  return `<video class="h-full w-full bg-black" src="${esc(m.src)}" controls autoplay playsinline></video>`;
}
const embedNotice = (i, m, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">${icon('b-instagram', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-embed-once="${i}" class="w-full rounded-full bg-amber px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">Ver aquí</button>` : ''}
      <a href="${extUrl(m)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[.2em]">Abrir en ${PLATFORM[m.type]}</a>
    </div>
  </div>`;
function openVideo(i) {
  const v = ACTUACIONES[i];
  if (!v?.media) return;
  const m = v.media;
  const frame = $('#videoFrame');
  $('#videoCaption').textContent = `${v.title} · ${v.sub}`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${i}`);
  requestAnimationFrame(() => {
    if (m.type === 'file') frame.innerHTML = embedFrame(m);
    else if (location.protocol === 'file:') frame.innerHTML = embedNotice(i, m, 'El vídeo solo se carga en páginas abiertas por http(s). Para probar en local, ejecuta <code class="text-amber">npm run dev</code>.', false);
    else if (getConsent() === 'essential') frame.innerHTML = embedNotice(i, m, `Este vídeo se reproduce desde ${PLATFORM[m.type]}, que puede usar sus propias cookies. Consulta la <a href="privacidad.html" class="text-amber underline">Política de privacidad</a>.`, true);
    else frame.innerHTML = embedFrame(m);
  });
}
document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-embed-once]');
  if (once) { $('#videoFrame').innerHTML = embedFrame(ACTUACIONES[+once.dataset.embedOnce].media); return; }
  const b = e.target.closest('[data-video]');
  if (b) openVideo(+b.dataset.video);
});

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

// ---------- FORMULÁRIO → E-MAIL (FormSubmit) ----------
// Validação no navegador com mensagem junto a cada campo. O sucesso só aparece após a confirmação do servidor;
// em falha, nada é apagado e o WhatsApp aparece como alternativa já com os dados (briefing, "Lançamento · formulário").
const form = $('#contactForm');
const formMsg = $('#formMsg');
const btn = $('button[type="submit"]', form);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RULES = {
  nombre: (v) => (v ? '' : 'Escribe tu nombre.'),
  email: (v) => (!v ? 'Escribe tu correo electrónico.' : EMAIL_RE.test(v) ? '' : 'Revisa el correo: parece incompleto (ej.: nombre@correo.com).'),
  tipo: (v) => (v ? '' : 'Elige el tipo de evento.'),
  localidad: (v) => (v ? '' : 'Indica la localidad del evento.'),
  telefono: (v) => (!v || /^[+()\d\s.-]{6,20}$/.test(v) ? '' : 'Revisa el teléfono: solo números, espacios y el prefijo (+34).'),
};
const val = (n) => (form.elements[n]?.value || '').trim();
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

// Botões do site que já preenchem o formulário (data-prefill="boda:ceremonia" | "evento" | "cancion" | "organizador")
const PREFILL = {
  'boda:ceremonia': { tipo: 'Boda', msg: 'Me interesa contar con piano para la ceremonia.' },
  'boda:coctel': { tipo: 'Boda', msg: 'Me interesa contar con piano para el cóctel.' },
  evento: { tipo: 'Evento privado', msg: '¿Música de ambiente o una actuación con su propio espacio en el programa?: ' },
  cancion: { msg: 'Canción:\nIntérprete:\nMomento del evento:\nVersión de referencia (enlace):' },
  organizador: { msg: 'Nombre del espacio:\nHorario previsto:\n¿El lugar dispone de piano?:\n¿La actuación será al aire libre?:' },
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
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  tried = true;
  formMsg.classList.add('hidden');
  const bad = Object.keys(RULES).filter((n) => !check(n));
  if (bad.length) { form.elements[bad[0]].focus(); return; }
  if (val('_honey')) return; // robô

  const d = { nombre: val('nombre'), email: val('email'), telefono: val('telefono'), tipo: val('tipo'), localidad: val('localidad'), fecha: val('fecha'), espacio: val('espacio'), mensaje: val('mensaje') };
  const payload = {
    'Nombre': d.nombre, 'Email': d.email, 'Teléfono': d.telefono || '—', 'Tipo de evento': d.tipo, 'Localidad': d.localidad,
    'Fecha prevista': d.fecha || '—', 'Espacio': d.espacio || '—', 'Mensaje': d.mensaje || '—',
    _subject: `Consulta web: ${d.tipo} en ${d.localidad}${d.fecha ? ` (${d.fecha})` : ''}`, _replyto: d.email, _template: 'table', _captcha: 'false',
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
    const wa = waLink({ tipo: d.tipo.toLowerCase(), fecha: d.fecha, lugar: [d.espacio, d.localidad].filter(Boolean).join(', '), mensaje: d.mensaje, nombre: d.nombre });
    formMsg.innerHTML = `No se ha podido enviar tu consulta. Inténtalo de nuevo o <a href="${wa}" target="_blank" rel="noopener" class="font-semibold text-amber underline">escríbeme por WhatsApp</a>.`;
    formMsg.classList.remove('hidden');
    console.warn('Formulario:', err);
  } finally {
    clearTimeout(timer);
    busy(false);
  }
});

// ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
// • os títulos do repertório acendem da esquerda para a direita • a linha dos momentos se preenche.
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
    const b = flightLine.getBoundingClientRect();
    flightLine.style.setProperty('--p', `${(clamp((vh * 0.6 - b.top) / b.height) * 100).toFixed(1)}%`);
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
