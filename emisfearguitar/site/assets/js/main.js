/* ==========================================================
   Emiliano Bonanomi (EmisFearGuitar) — interações do site
   (mesma base do site de AFTERAll)
   Os conteúdos repetidos (vídeos, galeria) ficam nos arrays abaixo
   para facilitar a edição. Um único arquivo para todas as páginas:
   cada bloco só roda se o elemento existir na página.
   ========================================================== */

// ---------- DADOS ----------

const SITE = 'https://wscodev.vercel.app/emisfearguitar/site/';
const EMAIL = 'emisfear@gmail.com';
const WHATSAPP = '447565016969'; // +44 7565 016969, sem o zero inicial (formato do wa.me)

// Formulário de contato: vazio = abre o app de e-mail com a mensagem pronta (nada fica guardado no site).
// Para receber direto na caixa de entrada, crie um formulário no Formspree (ou similar) e cole a URL aqui (POST em JSON).
const FORM_ENDPOINT = '';
// Lista das tablaturas (RF02): URL de envio da ferramenta de e-mail (MailerLite, Kit, Mailchimp ou Formspree).
// A automação da ferramenta envia o link dos PDFs. Vazio = abre o app de e-mail com o pedido pronto.
const TABS_ENDPOINT = '';

// Vídeos do canal @EmisFearGuitar (YouTube, out/2026 — todos com incorporação liberada).
// id = código do vídeo · capa em assets/img/videos/<id>.webp (hqdefault recortada em 16:9, 480 px)
// cat: live (ao vivo e teatro) | studio (estúdio, demos e ensino) | tech (vida de gig e music tech) — o mais recente primeiro
const VIDEOS = [
  { id: 'XNTCf1_SotE', title: 'I Replaced My Dead Rig With an iPad', sub: 'Music tech', cat: 'tech' },
  { id: 'Q9LaZbVvAb4', title: 'My Guitar Rig Died 1 Hour Before the Gig', sub: 'Gig life', cat: 'tech' },
  { id: 'qrSI33zhCNk', title: 'I Had 48 Hours to Memorise Music I’d Never Heard', sub: 'Dep life', cat: 'tech' },
  { id: 'Lzpsa8sLodE', title: 'When the Band Joins the Party', sub: 'Come From Away · bows', cat: 'live' },
  { id: 'LfVVo8YuIcE', title: 'Why Some Musicians Get Called Back and Others Don’t', sub: 'Gig life', cat: 'tech' },
  { id: 'VyomPh68C7I', title: 'The System I Use to Run Every Paid Gig', sub: 'Paperless gigs', cat: 'tech' },
  { id: '3_YLy4AzNt4', title: 'Playing a London Food Festival', sub: 'Behind the music', cat: 'live' },
  { id: 'towJhAtRRME', title: 'How I Survived 3 Musical Theatre Gigs in 1 Month', sub: 'Theatre life', cat: 'tech' },
  { id: 'Ww1Lbv6I5fA', title: 'My Function Band Guitar Setup', sub: 'Wireless, iPad & Quad Cortex', cat: 'tech' },
  { id: 'NRe-pQG1ndM', title: 'This iPad Hack Will Transform Your Live Gigs', sub: 'Music tech', cat: 'tech' },
  { id: 'Wi1ghcv6WWQ', title: 'Do You Need a Music Degree to Teach Guitar?', sub: 'Teaching', cat: 'tech' },
  { id: '5oxnLxUvZB4', title: 'Big Band, Big Night', sub: 'Wedding gig · first dance to fireworks', cat: 'live' },
  { id: 'u81xbeAVn2M', title: 'Student Compositions for Guitar & Orchestra Instruments', sub: 'Teaching', cat: 'studio' },
  { id: 'aNibtF2V0Pc', title: 'Passages (Frank Gambale)', sub: 'Live at Druso, Bergamo · 2023', cat: 'live' },
  { id: '--wxqxQC6zk', title: 'Guitar Sound With Only 2 Mics', sub: 'Studio', cat: 'studio' },
  { id: '8YJo6WJANJk', title: 'Stupendo — Intro Acoustic Guitar Solo', sub: 'Studio version', cat: 'studio' },
  { id: 'uEJRs9en0Zg', title: 'The Way Home', sub: 'LAG Tramontane T88ACE demo', cat: 'studio' },
];

// Vídeos em destaque na Home (teatro, ao vivo, estúdio)
const FEATURED_HOME = ['Lzpsa8sLodE', 'aNibtF2V0Pc', '8YJo6WJANJk'];

// Galeria (About) · photos/<img>.webp e <img>-480.webp (640 px nas horizontais: land: true)
// pos = foco do recorte (object-position)
const GALLERY = [
  { img: 'live-blue', cap: 'Live · function band', span: 'col-span-2 row-span-2', w: 1178, h: 1168 },
  { img: 'portrait-suit', cap: 'Ready for the gig', span: 'row-span-2', w: 1100, h: 1376, pos: '50% 20%' },
  { img: 'red-guitar', cap: 'Red Strat', span: 'row-span-2', w: 640, h: 1136 },
  { img: 'theatre-stage', cap: 'From the pit', span: 'col-span-2', w: 720, h: 540, land: true },
  { img: 'rent-cast', cap: 'Rent · closing night', span: 'row-span-2', w: 1100, h: 1956, pos: '50% 30%' },
  { img: 'guitar-wall', cap: 'The guitar wall · NW1 studio', span: 'col-span-2 row-span-2', w: 1400, h: 984, land: true },
  { img: 'red-light', cap: 'Backstage', span: '', w: 1100, h: 1466 },
  { img: 'strat-close', cap: 'Practice time', span: 'row-span-2', w: 640, h: 1136 },
  { img: 'camera-balcony', cap: 'Filming for the channel', span: 'row-span-2', w: 1100, h: 1466 },
  { img: 'london-eye', cap: 'London nights', span: '', w: 640, h: 1136 },
  { img: 'portrait-bench', cap: 'Off stage', span: '', w: 1100, h: 1374, pos: '50% 30%' },
  { img: 'acoustic-garden', cap: 'Acoustic sessions', span: '', w: 900, h: 1199, pos: '50% 60%' },
];

// Assunto do formulário: o mesmo valor em ?enquiry=, data-enquiry e nas <option> do formulário
const ENQUIRY_LABEL = {
  taster: 'Taster Lesson (£20, 20 mins)',
  block: '10-Lesson Block Booking',
  single: 'Single Guitar Lesson',
  live: 'Musical Theatre / Function Band / Dep',
  studio: 'Studio Session / Collaboration / Other',
};

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ROOT = document.body.dataset.root || '';
const PAGE = document.body.dataset.page;
const IMG = `${ROOT}assets/img/`;
const pad = (n) => String(n).padStart(2, '0');
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ytUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Métricas: cada clique em [data-track] (e envio de formulário) vira um evento no dataLayer. Sem ferramenta de análise
// instalada, não sai nada do site. Para medir, instale o GA4 (e cite na Política de Privacidade) — os eventos já estarão prontos.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'efg_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });
// Cliques em WhatsApp / telefone / e-mail também contam (KPI de conversão)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a || a.dataset.track) return;
  if (a.href.includes('wa.me/')) track(`whatsapp-${PAGE}`);
  else if (a.href.startsWith('tel:')) track(`tel-${PAGE}`);
  else if (a.href.startsWith('mailto:')) track(`email-${PAGE}`);
});

// Fotos responsivas: versão pequena (480 px; 640 px nas horizontais) e versão maior
function photo(g, sizes, alt, cls, style = '') {
  const small = g.land ? 640 : 480;
  return `<img src="${IMG}photos/${g.img}-480.webp" srcset="${IMG}photos/${g.img}-480.webp ${small}w, ${IMG}photos/${g.img}.webp ${g.w}w" sizes="${sizes}" width="${g.w}" height="${g.h}" alt="${esc(alt)}" class="${cls}"${style ? ` style="${style}"` : ''} loading="lazy" decoding="async">`;
}

// ---------- VÍDEOS (RF04: capa leve; o player do YouTube só carrega no clique) ----------
const CAT_LABEL = { live: 'Live & theatre', studio: 'Studio', tech: 'Gig life & tech' };
const videoCard = (v, i) => `
  <button type="button" data-yt="${v.id}" data-cat="${v.cat}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
    <span class="relative block aspect-video overflow-hidden rounded-xl border border-white/10 bg-panel">
      <img src="${IMG}videos/${v.id}.webp" width="480" height="270" alt="" class="duo h-full w-full object-cover" loading="lazy" decoding="async">
      <span class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></span>
      <span class="absolute left-3 top-3 rounded-full ${v.cat === 'live' ? 'bg-crimson text-white' : 'bg-black/70 text-bone'} px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">${CAT_LABEL[v.cat]}</span>
      <span class="absolute inset-0 grid place-items-center">
        <span class="play-ring grid h-14 w-14 place-items-center rounded-full bg-amber text-ink shadow-[0_10px_30px_-5px_rgba(229,169,60,.7)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-1 h-6 w-6')}</span>
      </span>
    </span>
    <span class="mt-4 block font-display text-lg font-bold leading-snug tracking-tight transition group-hover:text-amber">${esc(v.title)}</span>
    <span class="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-bone/55">${icon('b-youtube', 'h-3.5 w-3.5 text-[#FF0000]')} ${esc(v.sub)}</span>
  </button>`;

// Showreel completo (Live & Session): ao vivo e teatro primeiro — é o que diretores musicais procuram
const CAT_ORDER = { live: 0, studio: 1, tech: 2 };
$$('[data-videos]').forEach((grid) => {
  const k = grid.dataset.videos;
  let list = k === 'home' ? FEATURED_HOME.map((id) => VIDEOS.find((v) => v.id === id)).filter(Boolean)
    : k === 'all' ? [...VIDEOS].sort((a, b) => CAT_ORDER[a.cat] - CAT_ORDER[b.cat]) : VIDEOS.filter((v) => v.cat === k);
  if (grid.dataset.limit) list = list.slice(0, +grid.dataset.limit);
  grid.innerHTML = list.map(videoCard).join('');
});

// Filtros do showreel
const filters = $('#videoFilters');
if (filters) {
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    $$('[data-filter]', filters).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('#liveVideos [data-cat]').forEach((it) => { it.hidden = b.dataset.filter !== 'all' && it.dataset.cat !== b.dataset.filter; });
  });
}

// ---------- GALERIA ----------
const galleryGrid = $('#galleryGrid');
if (galleryGrid) {
  galleryGrid.innerHTML = GALLERY.map((g, i) => `
    <button type="button" data-lb-index="${i}" class="group relative overflow-hidden rounded-xl ${g.span}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}">
      ${photo(g, g.span.includes('col-span-2') ? '(min-width: 1280px) 600px, (min-width: 768px) 48vw, 92vw' : '(min-width: 1280px) 300px, (min-width: 768px) 24vw, 46vw', `Emiliano Bonanomi — ${g.cap}`, 'duo h-full w-full object-cover', g.pos ? `object-position:${g.pos}` : '')}
      <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
      <span class="absolute bottom-3 left-3 translate-y-2 font-mono text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(g.cap)}</span>
    </button>`).join('');
}

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
const CONSENT_KEY = 'efg-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
function setConsent(v) {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada: vale só nesta visita */ }
  $('#consentBar').classList.add('hidden');
}
if (!getConsent()) $('#consentBar').classList.remove('hidden');
$$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
document.addEventListener('click', (e) => { if (e.target.closest('[data-consent-open]')) $('#consentBar').classList.remove('hidden'); });

// Player do YouTube (youtube-nocookie): o clique é a autorização. Quem escolheu "Essential only" vê antes um aviso.
const ytFrame = (id) => `<iframe class="h-full w-full" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="Emiliano Bonanomi on YouTube" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
const ytNotice = (id, text, showPlay) => `
  <div class="flex h-full flex-col items-center justify-center gap-4 bg-panel p-6 text-center">
    <span class="grid h-14 w-14 place-items-center rounded-full bg-white text-[#FF0000]">${icon('b-youtube', 'h-7 w-7')}</span>
    <p class="max-w-md text-sm text-bone/70">${text}</p>
    <div class="flex w-full max-w-xs flex-col justify-center gap-2">
      ${showPlay ? `<button type="button" data-yt-once="${id}" class="w-full rounded-full bg-amber px-5 py-2.5 text-xs font-bold uppercase tracking-[.14em] text-ink">Play here</button>` : ''}
      <a href="${ytUrl(id)}" target="_blank" rel="noopener" class="w-full rounded-full border border-white/15 px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[.14em]">Watch on YouTube</a>
    </div>
  </div>`;
function openVideo(id) {
  const v = VIDEOS.find((x) => x.id === id);
  const frame = $('#videoFrame');
  $('#videoCaption').innerHTML = `${v ? `${esc(v.title)} · ` : ''}<a href="${ytUrl(id)}" target="_blank" rel="noopener" class="text-amber hover:underline">YouTube ↗</a>`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-yt-${id}`);
  // O modal abre ANTES de o iframe entrar, para o player inicializar já com tamanho
  requestAnimationFrame(() => {
    if (location.protocol === 'file:') frame.innerHTML = ytNotice(id, 'The YouTube player only works on pages opened through http(s). To test locally, run <code class="text-amber">npm run dev</code> and open http://localhost:8080.', false);
    else if (getConsent() === 'essential') frame.innerHTML = ytNotice(id, `This video is played by YouTube, which may set its own cookies. See the <a href="${ROOT}privacy/" class="text-amber underline">Privacy Policy</a>.`, true);
    else frame.innerHTML = ytFrame(id);
  });
}
document.addEventListener('click', (e) => {
  const once = e.target.closest('[data-yt-once]');
  if (once) { $('#videoFrame').innerHTML = ytFrame(once.dataset.ytOnce); return; }
  const b = e.target.closest('[data-yt]');
  if (b) openVideo(b.dataset.yt);
});

// Lightbox
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  $('#lbImg').src = `${IMG}photos/${GALLERY[lbIndex].img}.webp`; // maior versão de cada foto
  $('#lbImg').alt = `Emiliano Bonanomi — ${GALLERY[lbIndex].cap}`;
  $('#lbCap').textContent = `${pad(lbIndex + 1)} / ${pad(GALLERY.length)} — ${GALLERY[lbIndex].cap}`;
}
galleryGrid?.addEventListener('click', (e) => {
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

// ---------- HEADER / TOPO ----------
const header = $('#header');
const toTop = $('#toTop');
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('bg-ink/85', y > 40);
  header.classList.toggle('backdrop-blur-lg', y > 40);
  header.classList.toggle('border-b', y > 40);
  header.classList.toggle('border-white/5', y > 40);
  toTop.classList.toggle('opacity-0', y < 600);
  toTop.classList.toggle('pointer-events-none', y < 600);
  toTop.classList.toggle('translate-y-4', y < 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
requestAnimationFrame(onScroll);

// ---------- CONTADORES ----------
const counters = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const target = parseFloat(el.dataset.count);
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counters.unobserve(el);
  });
}, { threshold: 0.6 });
if (!reduceMotion) $$('[data-count]').forEach((el) => counters.observe(el));

// ---------- FORMULÁRIO DE CONTATO (RF01) ----------
// Monta a mensagem e abre o app de e-mail ou o WhatsApp (ou envia ao FORM_ENDPOINT, se configurado).
// Anti-spam: campo-armadilha + tempo mínimo de preenchimento.
const form = $('#enquiryForm');
const openedAt = Date.now();
function say(el, text, ok) {
  el.innerHTML = text;
  el.className = `mt-4 text-sm ${ok ? 'text-bone' : 'text-amber'}`;
}
function setEnquiry(v) { if (form && v && ENQUIRY_LABEL[v]) form.elements.enquiry.value = v; }
if (form) {
  // Assunto pré-selecionado: ?enquiry=taster no endereço, ou padrão da página (Live & Session → live)
  setEnquiry(new URLSearchParams(location.search).get('enquiry') || (PAGE === 'live' ? 'live' : ''));
  // Botões de preço / cards com data-enquiry escolhem o assunto
  document.addEventListener('click', (e) => { const t = e.target.closest('[data-enquiry]'); if (t) setEnquiry(t.dataset.enquiry); });

  const formMsg = $('#formMsg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const via = e.submitter?.dataset.via || 'email';
    const f = new FormData(form);
    // Robôs preenchem o campo escondido ou enviam em menos de 3 s: finge sucesso e não faz nada
    if (f.get('website') || Date.now() - openedAt < 3000) { say(formMsg, 'Thank you! Your message is ready to send.', true); return; }
    const name = [f.get('first'), f.get('last')].map((s) => String(s || '').trim()).filter(Boolean).join(' ');
    const email = String(f.get('email') || '').trim();
    const message = String(f.get('message') || '').trim();
    const topic = ENQUIRY_LABEL[f.get('enquiry')];
    if (!f.get('first').trim() || !email || !message || !topic) { say(formMsg, 'Please fill in your first name, email, the subject and your message.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say(formMsg, 'Please enter a valid email address.'); return; }
    if (!f.get('consent')) { say(formMsg, 'Please confirm you agree with the Privacy Policy so I can reply.'); return; }
    const details = [`Name: ${name}`, `Email: ${email}`, `Phone / WhatsApp: ${String(f.get('phone') || '').trim() || '-'}`, `Enquiry: ${topic}`];
    track(`enquiry-${f.get('enquiry')}-${via}`);

    if (via === 'whatsapp') {
      const text = ['Hi Emiliano,', '', message, '', '—', ...details].join('\n');
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      say(formMsg, `Thanks, ${esc(f.get('first').trim())}! WhatsApp should open with your message ready — just hit send.`, true);
      return;
    }
    if (FORM_ENDPOINT) {
      try {
        const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, phone: f.get('phone'), enquiry: topic, message, _subject: `Website enquiry — ${topic}` }) });
        if (!r.ok) throw new Error(r.status);
        form.reset();
        say(formMsg, `Thank you, ${esc(name)}! Your message has been sent — I'll get back to you within 24 hours.`, true);
        return;
      } catch { /* sem conexão ou serviço fora: cai no app de e-mail */ }
    }
    const subject = `Website enquiry — ${topic} — ${name}`;
    const body = ['Hi Emiliano,', '', message, '', '—', ...details, '', `Sent from ${SITE}`].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    say(formMsg, `Thank you, ${esc(name)}! Your email app should open with the message ready — just hit send. If nothing opened, write to <a href="mailto:${EMAIL}" class="text-amber underline">${EMAIL}</a> or use WhatsApp.`, true);
  });
}

// ---------- FREE TABS (RF02) ----------
const tabsForm = $('#tabsForm');
if (tabsForm) {
  const msg = $('#tabsMsg');
  tabsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = new FormData(tabsForm);
    if (f.get('website') || Date.now() - openedAt < 2500) { say(msg, 'Thank you! Check your inbox.', true); return; }
    const first = String(f.get('first') || '').trim();
    const email = String(f.get('email') || '').trim();
    if (!first || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say(msg, 'Please enter your first name and a valid email address.'); return; }
    if (!f.get('consent')) { say(msg, 'Please tick the box so I can email you the tabs.'); return; }
    track('tabs-signup');
    if (TABS_ENDPOINT) {
      try {
        const r = await fetch(TABS_ENDPOINT, { method: 'POST', body: f, headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error(r.status);
        tabsForm.reset();
        say(msg, `You're in, ${esc(first)}! 🎸 Check your inbox for the download link (and the spam folder, just in case).`, true);
        return;
      } catch { /* serviço fora: cai no app de e-mail */ }
    }
    const body = [`Hi Emiliano,`, '', `Please send me the free guitar tabs and add me to your mailing list.`, '', `First name: ${first}`, `Email: ${email}`, '', `Sent from ${SITE}guitar-tabs/`].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Free guitar tabs request')}&body=${encodeURIComponent(body)}`;
    say(msg, `Thanks, ${esc(first)}! Your email app should open with the request ready — just hit send and the tabs will be on their way.`, true);
  });
}

// ---------- ANIMAÇÕES ----------
// Com "reduzir movimento" nada disso roda (e o CSS desliga o restante). Efeitos de cursor só em mouse/trackpad.
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Título do hero palavra por palavra: cada palavra vira <span class="w" style="--i:n"> (mantém os destaques em âmbar)
$$('.hero-h1').forEach((h) => {
  if (!reduceMotion) {
    let i = 0;
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 1) { walk(n); return; }
      if (n.nodeType !== 3 || !n.textContent.trim()) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (!part.trim()) { frag.append(part); return; }
        const w = document.createElement('span');
        w.className = 'w';
        w.style.setProperty('--i', i++);
        w.textContent = part;
        frag.append(w);
      });
      n.replaceWith(frag);
    });
    walk(h);
    // destaque em âmbar ganha um sublinhado que se desenha depois das palavras
    $$('.text-amber', h).forEach((el) => {
      if (el.textContent.trim().length < 3) return;
      el.classList.add('draw-line');
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-drawn')));
    });
  }
  h.classList.add('split');
});

// Seis cordas no rodapé do hero: um "strum" ao abrir a página e vibração quando o cursor (ou o dedo) cruza uma corda
const hero = $('main > section');
if (hero && !reduceMotion) {
  const box = document.createElement('div');
  box.className = 'hero-strings';
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<span class="hstring"></span>'.repeat(6);
  hero.appendChild(box);
  const strings = $$('.hstring', box);
  const pluck = (s) => { s.classList.remove('pluck'); void s.offsetWidth; s.classList.add('pluck'); };
  setTimeout(() => strings.forEach((s, i) => setTimeout(() => pluck(s), i * 70)), 1300);
  let lastY = null;
  hero.addEventListener('pointermove', (e) => {
    if (lastY !== null) strings.forEach((s) => { const sy = s.getBoundingClientRect().top; if ((lastY - sy) * (e.clientY - sy) < 0) pluck(s); });
    lastY = e.clientY;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { lastY = null; });
}

if (finePointer && !reduceMotion) {
  // Holofote âmbar seguindo o cursor nos cards e formulários
  $$('main article, main form, .faq').forEach((el) => el.classList.add('spot'));
  document.addEventListener('pointermove', (e) => {
    const el = e.target.closest?.('.spot');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  // Botões âmbar: brilho atravessando e leve atração magnética pelo cursor
  $$('a.bg-amber.rounded-full, button.bg-amber.rounded-full').forEach((b) => {
    b.classList.add('shine');
    if (b.closest('#consentBar, #header, #mobileMenu')) return;
    b.classList.add('magnetic');
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--tx', `${((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px`);
      b.style.setProperty('--ty', `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
    });
    b.addEventListener('pointerleave', () => { b.style.setProperty('--tx', '0px'); b.style.setProperty('--ty', '0px'); });
  });

  // Foto do hero inclina em 3D acompanhando o cursor
  $$('.hero-photo').forEach((f) => {
    const t = f.parentElement;
    t.classList.add('tilt');
    t.addEventListener('pointermove', (e) => {
      const r = t.getBoundingClientRect();
      t.style.setProperty('--ry', `${(((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2)}deg`);
      t.style.setProperty('--rx', `${(((e.clientY - r.top) / r.height - 0.5) * -10).toFixed(2)}deg`);
    });
    t.addEventListener('pointerleave', () => { t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg'); });
  });
}

// Guiadas pelo scroll: barra de progresso, títulos fantasma deslizando, brilho do hero e linha do tempo do About
if (!reduceMotion) {
  const prog = $('#progress');
  const ghosts = $$('.ghost');
  const glows = $$('.hero-glow');
  const tl = $('#qualifications ol');
  let tlFill = null;
  if (tl) { tlFill = document.createElement('span'); tlFill.className = 'tl-fill'; tlFill.setAttribute('aria-hidden', 'true'); tl.prepend(tlFill); }
  let ticking = false;
  const frame = () => {
    ticking = false;
    const vh = innerHeight;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - vh;
    prog.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
    ghosts.forEach((g) => {
      const r = g.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      g.style.setProperty('--gx', `${(((r.top + r.height / 2) - vh / 2) / vh * 90).toFixed(1)}px`);
    });
    glows.forEach((g) => { g.style.translate = `0 ${Math.min(y * 0.15, 140).toFixed(1)}px`; });
    if (tlFill) {
      const r = tl.getBoundingClientRect();
      tlFill.style.setProperty('--p', Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height)).toFixed(3));
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame);
  frame();
}

// Mais entradas no scroll (AOS) sem marcar elemento por elemento no HTML: listas e itens ganham animação em cascata.
// Só abaixo da dobra — o que já aparece na primeira tela não fica escondido esperando o AOS.
if (!reduceMotion) {
  const AUTO_AOS = [
    ['main section[aria-label] li', 'fade-up', 80],      // faixa de credenciais / "at a glance"
    ['main ul.space-y-5 > li', 'fade-left', 80],         // listas com ícones (qualificações, "why join")
    ['main .space-y-3 > a, main .space-y-3 > div', 'fade-left', 80], // canais de contato
    ['#qualifications ol > li', 'fade-up', 90],          // linha do tempo
    ['main .faq', 'fade-up', 60],
    ['main ul.flex-wrap > li', 'zoom-in', 40],           // bancas, gêneros, hubs, logos
    ['main ul.grid > li', 'fade-up', 60],                // créditos de teatro, itens do pacote
  ];
  const fold = innerHeight * 0.92;
  AUTO_AOS.forEach(([sel, anim, step]) => $$(sel).forEach((el) => {
    if (el.hasAttribute('data-aos') || el.getBoundingClientRect().top < fold) return;
    const idx = [...el.parentElement.children].indexOf(el);
    el.setAttribute('data-aos', anim);
    el.setAttribute('data-aos-delay', String(Math.min(400, Math.round((idx * step) / 20) * 20)));
  }));
}

$('#year').textContent = new Date().getFullYear();

// ---------- AOS ----------
// AOS (só anima o que está abaixo da dobra): inicia na primeira interação ou 4 s após o load,
// fora do caminho crítico da primeira pintura
const aosEvents = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'];
let aosTimer;
function initAOS() {
  clearTimeout(aosTimer);
  aosEvents.forEach((ev) => removeEventListener(ev, initAOS));
  // duration = 900: é a duração definida em src/aos.css (outro valor deixaria as entradas sem transição)
  if (window.AOS) AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic', disable: reduceMotion });
}
aosEvents.forEach((ev) => addEventListener(ev, initAOS, { once: true, passive: true }));
window.addEventListener('load', () => { aosTimer = setTimeout(initAOS, 4000); });
