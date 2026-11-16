/* ==========================================================
   AMADOR • Violinist — interações do site (todas as páginas ES/EN)
   Mesma base do site de Amparo. Os conteúdos ficam no HTML gerado
   por scripts/build-pages.cjs; aqui só há comportamento.
   ========================================================== */

const LANG = document.documentElement.lang === 'en' ? 'en' : 'es';
const WHATSAPP = '34647697892';

// Textos usados pelo JS (os do HTML estão em scripts/build-pages.cjs)
const I18N = {
  es: {
    required: 'Este campo es obligatorio.',
    email: 'Introduce un correo electrónico válido.',
    date: 'Indica la fecha o marca «Por confirmar».',
    past: 'La fecha no puede ser anterior a hoy.',
    fix: 'Revisa los campos marcados.',
    ok: '<strong>Recibido.</strong> Gracias por enviarme los detalles. Te responderé por correo para hablar de la disponibilidad y la propuesta.',
    fail: (wa) => `<strong>Error de envío.</strong> No se ha podido enviar tu consulta. Vuelve a intentarlo o <a href="${wa}" target="_blank" rel="noopener" class="underline">escríbeme por WhatsApp</a>.`,
    song: 'Canción que me gustaría proponer: ',
    ensemble: 'Me interesa el Amador Violin Ensemble. ',
    count: (n) => `${n} vídeos`,
    fileNotice: 'Los vídeos de YouTube solo se cargan en páginas abiertas por http(s). Para probar en local, ejecuta <code class="text-varnish">npm run dev</code>.',
    essentialNotice: 'Este vídeo se reproduce desde YouTube, que puede usar sus propias cookies.',
    playHere: 'Ver aquí', openYt: 'Abrir en YouTube',
    waIntro: 'Hola, David. Te escribo desde la web:',
    labels: { name: 'Nombre', email: 'Correo', date: 'Fecha', city: 'Ciudad', venue: 'Espacio', type: 'Tipo de evento', message: 'Mensaje' },
    tbc: 'Por confirmar',
    types: { wedding: 'Boda', hotel: 'Hotel', corporate: 'Empresa', other: 'Otro' },
  },
  en: {
    required: 'This field is required.',
    email: 'Enter a valid email address.',
    date: 'Add the date or tick “To be confirmed”.',
    past: 'The date can’t be in the past.',
    fix: 'Please check the highlighted fields.',
    ok: '<strong>Received.</strong> Thanks for sending your details. I’ll reply by email to discuss availability and your proposal.',
    fail: (wa) => `<strong>Sending failed.</strong> Your enquiry couldn’t be sent. Try again or <a href="${wa}" target="_blank" rel="noopener" class="underline">message me on WhatsApp</a>.`,
    song: 'A song I’d like to suggest: ',
    ensemble: 'I’m interested in the Amador Violin Ensemble. ',
    count: (n) => `${n} videos`,
    fileNotice: 'YouTube videos only load on pages served over http(s). To test locally, run <code class="text-varnish">npm run dev</code>.',
    essentialNotice: 'This video plays from YouTube, which may set its own cookies.',
    playHere: 'Play here', openYt: 'Open on YouTube',
    waIntro: 'Hi David, I’m writing from your website:',
    labels: { name: 'Name', email: 'Email', date: 'Date', city: 'City', venue: 'Venue', type: 'Event type', message: 'Message' },
    tbc: 'To be confirmed',
    types: { wedding: 'Wedding', hotel: 'Hotel', corporate: 'Corporate', other: 'Other' },
  },
}[LANG];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;

// Métricas (briefing: cliques em WhatsApp, envios, idioma e página de origem). Cada clique em [data-track]
// vira um evento no dataLayer; sem ferramenta de análise instalada, nada sai do site.
// Ao instalar GA4/Plausible, cite-a na Política de Privacidade e no aviso de consentimento.
function track(label, extra = {}) {
  (window.dataLayer = window.dataLayer || []).push({ event: 'amador_click', label, lang: LANG, page: document.body.dataset.page, ...extra });
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-track]');
  if (t) track(t.dataset.track);
  // Idioma escolhido manualmente: a raiz do site passa a respeitar a escolha
  const l = e.target.closest('a[hreflang]');
  if (l) { try { localStorage.setItem('amador-lang', l.getAttribute('hreflang')); } catch { /* sem storage */ } }
});

// ---------- MODAIS ----------
let lastFocus = null;
function openModal(m) {
  lastFocus = document.activeElement;
  m.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => $('[data-close], button', m)?.focus());
}
function closeModal(m) {
  m.classList.remove('is-open');
  document.body.style.overflow = '';
  if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
  if (m.id === 'mobileMenu') $('#menuOpen')?.setAttribute('aria-expanded', 'false');
  lastFocus?.focus?.();
}
$$('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); }));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') $$('.modal.is-open').forEach(closeModal);
  if ($('#lightbox')?.classList.contains('is-open')) {
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
  }
});

// Menu mobile
$('#menuOpen')?.addEventListener('click', () => { openModal($('#mobileMenu')); $('#menuOpen').setAttribute('aria-expanded', 'true'); });
$('#menuClose')?.addEventListener('click', () => closeModal($('#mobileMenu')));
$$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => closeModal($('#mobileMenu'))));

// ---------- PRIVACIDADE ----------
// Sem cookies próprios. A escolha (all | essential) fica no localStorage só para não perguntar de novo.
const CONSENT_KEY = 'amador-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
$$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => $('#consentBar').classList.remove('hidden')));

// ---------- VÍDEOS (YouTube em modo de privacidade mejorada, só no clique) ----------
const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const embedFrame = (id, title) => `<iframe class="h-full w-full" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1" title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
const embedNotice = (id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-[#ff0000]">${icon('b-youtube', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/75">${text}</p>
    <div class="flex w-full max-w-xs flex-col gap-2">
      ${showPlay ? `<button type="button" data-embed-once="${id}" class="w-full rounded-full bg-varnish px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">${I18N.playHere}</button>` : ''}
      <a href="${ytUrl(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[.2em]">${I18N.openYt}</a>
    </div>
  </div>`;
let currentTitle = '';
function openVideo(btn) {
  const { video: id, title = '', sub = '' } = btn.dataset;
  const vertical = btn.hasAttribute('data-vertical');
  const box = $('#videoBox');
  const frame = $('#videoFrame');
  currentTitle = title;
  // Shorts (9:16) ocupam a altura da tela; horizontais, a largura
  box.classList.toggle('max-w-5xl', !vertical);
  box.style.maxWidth = vertical ? 'min(24rem, calc((100svh - 9rem) * 0.5625))' : '';
  frame.classList.toggle('aspect-video', !vertical);
  frame.classList.toggle('aspect-[9/16]', vertical);
  $('#videoCaption').innerHTML = `${title ? `${esc(title)}${sub ? ` · ${esc(sub)}` : ''} · ` : ''}<a href="${ytUrl(id)}" target="_blank" rel="noopener" class="text-varnish hover:underline">YouTube ↗</a>`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${id}`);
  requestAnimationFrame(() => {
    if (location.protocol === 'file:') frame.innerHTML = embedNotice(id, I18N.fileNotice, false);
    else if (getConsent() === 'essential') frame.innerHTML = embedNotice(id, I18N.essentialNotice, true);
    else frame.innerHTML = embedFrame(id, title);
  });
}
document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-embed-once]');
  if (once) { $('#videoFrame').innerHTML = embedFrame(once.dataset.embedOnce, currentTitle); return; }
  const b = e.target.closest('[data-video]');
  if (b) openVideo(b);
});

// ---------- FILTROS (Vídeos y repertorio) ----------
const filters = $('[data-filters]');
if (filters) {
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    const f = b.dataset.filter;
    $$('[data-filter]', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const match = (el) => f === 'all' || el.dataset.cats.split(' ').includes(f);
    let n = 0;
    $$('#videoGrid [data-cats]').forEach((el) => { const ok = match(el); el.hidden = !ok; if (ok) n++; });
    $$('#repList [data-cats]').forEach((el) => { el.hidden = !match(el); });
    const counter = $('[data-count]');
    if (counter) counter.textContent = I18N.count(n);
    track(`filter-${f}`);
  });
}

// ---------- LIGHTBOX (galeria de Sobre David) ----------
const lbItems = $$('[data-lb-src]');
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const it = lbItems[lbIndex];
  $('#lbImg').src = it.dataset.lbSrc;
  $('#lbImg').alt = `David Amador — ${it.dataset.lbCap}`;
  $('#lbCap').textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(lbItems.length).padStart(2, '0')} — ${it.dataset.lbCap}`;
}
lbItems.forEach((b, i) => b.addEventListener('click', () => { showLb(i); openModal($('#lightbox')); }));
$$('[data-lb]').forEach((b) => b.addEventListener('click', () => showLb(lbIndex + (b.dataset.lb === 'next' ? 1 : -1))));

// ---------- HEADER / BOTÕES FLUTUANTES ----------
const header = $('#header');
const floaters = [$('#toTop'), $('#waFloat')];
function onScroll() {
  const y = window.scrollY;
  ['bg-ink/85', 'backdrop-blur-lg', 'border-b', 'border-white/5'].forEach((c) => header.classList.toggle(c, y > 40));
  floaters.forEach((el) => ['opacity-0', 'translate-y-4', 'pointer-events-none'].forEach((c) => el.classList.toggle(c, y < 600)));
}
window.addEventListener('scroll', onScroll, { passive: true });
requestAnimationFrame(onScroll);

// ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
// Títulos do repertório acendem da esquerda para a direita; a linha do dia se preenche.
(() => {
  const fills = $$('#repList .stage-fill');
  const line = $('.flight-line');
  if (reduceMotion || (!fills.length && !line)) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const visible = new Set(); let raf = 0;
  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    fills.forEach((el) => el.style.setProperty('--p', `${(clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4)) * 100).toFixed(1)}%`));
    if (line) {
      const b = line.getBoundingClientRect();
      line.style.setProperty('--p', `${(clamp((vh * 0.6 - b.top) / b.height) * 100).toFixed(1)}%`);
    }
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
    if (visible.size && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '150px 0px' });
  [$('#repertorio'), $('#momentos')].filter(Boolean).forEach((el) => io.observe(el));
})();

// ---------- FORMULÁRIO DE CONSULTA ----------
// Envia para api/enquiry.php (validação também no servidor). Regras do briefing:
// • confirmação só depois do aceite do servidor • em erro, os dados continuam preenchidos
// • sem envios repetidos enquanto processa • data pode ficar "Por confirmar"
const form = $('#enquiryForm');
if (form) {
  const status = $('#formStatus');
  const submit = $('button[type="submit"]', form);
  const date = form.elements.date;
  const tbc = form.elements.date_tbc;
  date.min = new Date().toISOString().slice(0, 10);

  // Pré-preenchimento vindo de outros botões (?song=1, ?type=corporate|ensemble)
  const q = new URLSearchParams(location.search);
  if (q.get('song')) form.elements.message.value = I18N.song;
  if (q.get('type') === 'corporate' || q.get('type') === 'ensemble') form.elements.type.value = 'corporate';
  if (q.get('type') === 'ensemble') form.elements.message.value = I18N.ensemble;
  if (q.get('song') || q.get('type')) setTimeout(() => (q.get('song') || q.get('type') === 'ensemble' ? form.elements.message : form.elements.name).focus({ preventScroll: true }), 400);

  tbc.addEventListener('change', () => { date.disabled = tbc.checked; if (tbc.checked) { date.value = ''; setError('date', ''); } });

  function setError(name, msg) {
    const field = form.elements[name];
    const out = $(`#e-${name}`);
    if (field) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) { out.textContent = msg; out.classList.toggle('hidden', !msg); }
  }
  function validate() {
    const v = (n) => (form.elements[n].value || '').trim();
    const errors = {};
    if (!v('name')) errors.name = I18N.required;
    if (!v('email')) errors.email = I18N.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) errors.email = I18N.email;
    if (!tbc.checked) {
      if (!v('date')) errors.date = I18N.date;
      else if (v('date') < date.min) errors.date = I18N.past;
    }
    if (!v('type')) errors.type = I18N.required;
    if (!v('city')) errors.city = I18N.required;
    ['name', 'email', 'date', 'type', 'city'].forEach((n) => setError(n, errors[n] || ''));
    return errors;
  }
  // Valida cada campo ao sair dele, depois da primeira tentativa
  let tried = false;
  form.addEventListener('focusout', () => { if (tried) validate(); });

  function say(html, ok) {
    status.innerHTML = html;
    status.className = `mt-5 rounded-xl border p-4 text-sm leading-relaxed ${ok ? 'border-varnish/50 bg-varnish/10 text-bone' : 'border-[#f08a7a]/50 bg-[#f08a7a]/10 text-bone'}`;
    status.focus({ preventScroll: false });
  }
  // Mensagem de WhatsApp com o que a pessoa já preencheu (alternativa quando o envio falha)
  function waFallback() {
    const f = new FormData(form);
    const L = I18N.labels;
    const lines = [I18N.waIntro, ''];
    if (f.get('name')) lines.push(`${L.name}: ${f.get('name')}`);
    lines.push(`${L.date}: ${f.get('date_tbc') ? I18N.tbc : f.get('date') || '—'}`);
    if (f.get('city')) lines.push(`${L.city}: ${f.get('city')}${f.get('venue') ? ` · ${f.get('venue')}` : ''}`);
    if (f.get('type')) lines.push(`${L.type}: ${I18N.types[f.get('type')] || f.get('type')}`);
    if (f.get('message')) lines.push('', f.get('message'));
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  let busy = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    tried = true;
    const errors = validate();
    const first = Object.keys(errors)[0];
    if (first) { say(I18N.fix, false); form.elements[first].focus(); return; }
    if (form.elements.website.value) return; // robô (honeypot)

    busy = true;
    submit.disabled = true;
    $('span', submit).textContent = submit.dataset.sending;
    $('svg', submit).outerHTML = `<svg class="spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="40 20"/></svg>`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: ctrl.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      track('form-sent', { type: form.elements.type.value });
      form.reset();
      date.disabled = false;
      say(I18N.ok, true);
    } catch (err) {
      track('form-error', { reason: String(err.message || err) });
      say(I18N.fail(waFallback()), false);
    } finally {
      clearTimeout(timer);
      busy = false;
      submit.disabled = false;
      $('span', submit).textContent = submit.dataset.label;
      $('svg', submit).outerHTML = icon('h-arrow-right');
    }
  });

  // Sem JavaScript o formulário vai direto para o PHP, que volta com ?sent=1 ou ?error=1
  if (q.get('sent')) say(I18N.ok, true);
  if (q.get('error')) say(I18N.fail(`https://wa.me/${WHATSAPP}`), false);
}

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

// ---------- AOS ----------
// Inicia na primeira interação ou 4 s após o load (fora do caminho crítico da primeira pintura)
const aosEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
let aosTimer;
function initAOS() {
  clearTimeout(aosTimer);
  aosEvents.forEach((ev) => removeEventListener(ev, initAOS));
  if (window.AOS) AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic', disable: reduceMotion });
}
aosEvents.forEach((ev) => addEventListener(ev, initAOS, { once: true, passive: true }));
window.addEventListener('load', () => { aosTimer = setTimeout(initAOS, 4000); });
