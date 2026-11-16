/* ==========================================================
   Manuel Cribaño · El Niño de Peñaflor — interações do site
   (mesma base do site de Amparo). O conteúdo editável está em data.js.
   Cada bloco só roda se o elemento existir na página atual.
   ========================================================== */
(() => {
  const MC = window.MC || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Caminho até a raiz do site (as páginas internas ficam em subpastas)
  const ROOT = ($('link[rel="stylesheet"][href*="assets/css"]')?.getAttribute('href') || '').split('assets/')[0];
  const IMG = `${ROOT}assets/img/`;
  const ext = 'target="_blank" rel="noopener"';

  // Métricas: cliques em [data-track] viram eventos no dataLayer. Sem ferramenta instalada, nada sai do site.
  // Se instalar uma (GA4, Plausible…), citar na Política de Privacidade e não enviar dados pessoais.
  const track = (label) => (window.dataLayer = window.dataLayer || []).push({ event: 'mc_click', label });
  document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

  // E-mail de contratação vem de data.js (um lugar só para trocar)
  if (MC.email) $$('[data-email]').forEach((a) => { a.href = `mailto:${MC.email}`; if (!a.children.length) a.textContent = MC.email; });

  // ---------- MARQUEE ----------
  $$('[data-marquee]').forEach((el) => {
    const run = (MC.marquee || []).map((t) => `<span class="px-6">${esc(t)}</span><span class="text-[.6em] opacity-60">◆</span>`).join('');
    el.innerHTML = run + run;
  });

  // ---------- DATAS ----------
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const parseFecha = (f) => { const [y, m, d] = f.split('-').map(Number); return { y, m, d: d || null }; };
  const fechaTexto = (ev) => {
    const { y, m, d } = parseFecha(ev.fecha);
    return d ? `${d} de ${MESES[m - 1]} de ${y}` : `${MESES[m - 1][0].toUpperCase()}${MESES[m - 1].slice(1)} de ${y}`;
  };
  // Fim do dia do evento (ou do mês, se só houver o mês) — até lá ele ainda é "próximo"
  const fimEvento = (ev) => { const { y, m, d } = parseFecha(ev.fecha); return d ? new Date(y, m - 1, d, 23, 59) : new Date(y, m, 0, 23, 59); };
  const hoje = new Date();
  const eventos = (MC.eventos || []).slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
  const proximos = eventos.filter((ev) => ev.estado !== 'realizado' && fimEvento(ev) >= hoje);
  const pasados = eventos.filter((ev) => !proximos.includes(ev)).reverse();
  const ESTADO = { aplazado: 'Aplazado', cancelado: 'Cancelado' };
  const lugar = (ev) => [ev.recinto, [ev.ciudad, ev.region].filter(Boolean).join(' · ')].filter(Boolean).join(' — ');

  const cardProximo = (ev) => {
    const { y, m, d } = parseFecha(ev.fecha);
    const tachado = ev.estado === 'cancelado' ? ' line-through opacity-60' : '';
    return `
    <li class="grid overflow-hidden rounded-2xl border border-white/10 bg-panel/70 transition hover:border-clavel/60 sm:grid-cols-[150px_1fr]">
      <div class="flex items-center gap-3 bg-clavel-deep px-6 py-4 text-bone sm:flex-col sm:justify-center sm:gap-0 sm:py-6">
        <span class="font-display text-5xl leading-none">${d ? String(d).padStart(2, '0') : '—'}</span>
        <span class="font-mono text-[11px] uppercase tracking-[.25em]">${MESES[m - 1].slice(0, 3)} · ${y}</span>
      </div>
      <div class="p-6 sm:p-7">
        <div class="flex flex-wrap items-center gap-2">
          ${ESTADO[ev.estado] ? `<span class="rounded-full bg-bone px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">${ESTADO[ev.estado]}</span>` : ''}
          <span class="font-mono text-[10px] uppercase tracking-[.25em] text-albero">${esc(fechaTexto(ev))}</span>
        </div>
        <h3 class="mt-2 font-display text-3xl uppercase leading-tight${tachado}">${esc(ev.titulo)}</h3>
        <ul class="mt-4 grid gap-2 text-sm text-bone/75 sm:grid-cols-2">
          <li class="flex items-start gap-2">${icon('h-map-pin', 'mt-0.5 h-4 w-4 shrink-0 text-clavel')}<span>${esc(lugar(ev))}</span></li>
          <li class="flex items-start gap-2">${icon('h-clock', 'mt-0.5 h-4 w-4 shrink-0 text-clavel')}<span>${ev.hora ? `${esc(ev.hora)} h (hora local)` : 'Horario por confirmar'}</span></li>
          ${ev.acceso ? `<li class="flex items-start gap-2">${icon('h-ticket', 'mt-0.5 h-4 w-4 shrink-0 text-clavel')}<span>${esc(ev.acceso)}</span></li>` : ''}
        </ul>
        <div class="mt-5 flex flex-wrap gap-2">
          ${ev.entradas ? `<a href="${esc(ev.entradas)}" ${ext} data-track="agenda-entradas" class="inline-flex items-center gap-2 rounded-full bg-clavel-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-bone transition hover:bg-bone hover:text-ink">${icon('h-ticket')} Comprar entradas</a>` : ''}
          ${ev.url ? `<a href="${esc(ev.url)}" ${ext} data-track="agenda-info" class="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.16em] transition hover:border-clavel hover:text-clavel">${esc(ev.urlLabel || 'Ver información del evento')} ${icon('h-arrow-up-right', 'h-3.5 w-3.5')}</a>` : ''}
        </div>
      </div>
    </li>`;
  };

  const filaArchivo = (ev) => `
    <li class="grid gap-1 border-b border-white/10 py-5 sm:grid-cols-12 sm:items-center sm:gap-4">
      <span class="font-mono text-[11px] uppercase tracking-[.18em] text-albero sm:col-span-3">${esc(fechaTexto(ev))}${ev.nota ? `<span class="block text-[9px] tracking-[.2em] text-bone/50">${esc(ev.nota)}</span>` : ''}</span>
      <span class="font-display text-2xl uppercase leading-tight sm:col-span-4">${esc(ev.titulo)}</span>
      <span class="text-sm text-bone/65 sm:col-span-3">${esc(lugar(ev))}</span>
      <span class="sm:col-span-2 sm:text-right">${ev.url ? `<a href="${esc(ev.url)}" ${ext} class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-clavel hover:text-white">${esc(ev.urlLabel || 'Más información')} ${icon('h-arrow-up-right', 'h-3 w-3')}</a>` : ''}</span>
    </li>`;

  const vacio = `
    <div class="rounded-2xl border border-dashed border-white/20 p-8 text-center sm:p-10">
      ${icon('h-calendar', 'mx-auto h-8 w-8 text-clavel')}
      <p class="mx-auto mt-4 max-w-xl leading-relaxed text-bone/75">Las próximas fechas se publicarán aquí cuando estén confirmadas. También puedes seguir las novedades en Instagram.</p>
      <a href="${esc(MC.instagram)}" ${ext} data-track="agenda-instagram" class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[.18em] transition hover:border-clavel hover:text-clavel">${icon('b-instagram')} Seguir en Instagram</a>
    </div>`;

  const elProx = $('#agendaUpcoming');
  if (elProx) elProx.innerHTML = proximos.length ? `<ol class="grid gap-5">${proximos.map(cardProximo).join('')}</ol>` : vacio;
  const elArch = $('#agendaArchive');
  if (elArch) elArch.innerHTML = pasados.length ? `<ol class="border-t border-white/10">${pasados.map(filaArchivo).join('')}</ol>` : '';
  // Página inicial: só a próxima data (ou o estado vazio)
  const elNext = $('#agendaNext');
  if (elNext) elNext.innerHTML = proximos.length ? `<ol class="grid gap-5">${proximos.slice(0, 2).map(cardProximo).join('')}</ol>` : vacio;

  // Dados estruturados de eventos (só datas futuras com dia definido e status válido)
  if ((elProx || elNext) && proximos.length) {
    const ld = proximos.filter((ev) => parseFecha(ev.fecha).d && ev.estado !== 'cancelado').map((ev) => ({
      '@context': 'https://schema.org', '@type': 'MusicEvent', name: ev.titulo,
      startDate: ev.hora ? `${ev.fecha}T${ev.hora}` : ev.fecha,
      eventStatus: `https://schema.org/Event${ev.estado === 'aplazado' ? 'Postponed' : 'Scheduled'}`,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: ev.recinto, address: { '@type': 'PostalAddress', addressLocality: ev.ciudad, addressRegion: ev.region, addressCountry: 'ES' } },
      performer: { '@type': 'Person', name: 'Manuel Cribaño', alternateName: 'El Niño de Peñaflor' },
      ...(ev.url ? { url: ev.url } : {}),
    }));
    if (ld.length) { const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s); }
  }

  // ---------- VÍDEOS ----------
  const videos = MC.videos || [];
  const destacado = videos.find((v) => v.destacado) || videos[0];
  const elFeat = $('#featuredVideo');
  if (elFeat && destacado) {
    elFeat.innerHTML = `
    <button type="button" data-yt="${esc(destacado.youtube)}" data-title="${esc(destacado.titulo)}" data-track="video-destacado" class="group relative grid w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/70 text-left lg:grid-cols-[1.6fr_1fr]">
      <span class="relative block aspect-video overflow-hidden">
        <img src="${IMG}videos/${esc(destacado.img)}" width="960" height="540" alt="" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
        <span class="absolute inset-0 bg-gradient-to-tr from-clavel-deep/30 to-transparent mix-blend-multiply"></span>
        <span class="absolute inset-0 grid place-items-center"><span class="grid h-20 w-20 place-items-center rounded-full bg-clavel-deep text-bone shadow-[0_10px_30px_-5px_rgba(163,18,42,.8)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-1 h-8 w-8')}</span></span>
      </span>
      <span class="flex flex-col justify-center p-6 sm:p-10">
        <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-clavel"><span class="pulse-dot h-2 w-2 rounded-full bg-clavel text-clavel"></span> ${esc(destacado.etiqueta)}</span>
        <span class="mt-3 block font-display text-5xl uppercase leading-none sm:text-7xl">${esc(destacado.titulo)}</span>
        <span class="mt-4 block leading-relaxed text-bone/75">${esc(destacado.desc)}</span>
        ${destacado.creditos ? `<span class="mt-4 block font-mono text-[10px] uppercase leading-relaxed tracking-[.18em] text-bone/55">${esc(destacado.creditos)}</span>` : ''}
        <span class="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bone transition group-hover:text-clavel">${icon('b-youtube')} ${esc(destacado.cta)}</span>
      </span>
    </button>`;
  }

  const cardVideo = (v, i) => {
    const media = v.img
      ? `<img src="${IMG}videos/${esc(v.img)}" width="640" height="360" alt="" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">`
      : `<span class="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(229,72,77,.35),transparent_60%),linear-gradient(135deg,#18120f,#0e0b0a)]"><span class="text-center"><span class="block font-mono text-[10px] uppercase tracking-[.3em] text-albero">${esc(v.plataforma || '')}</span><span class="mt-2 block px-6 font-serif text-3xl italic leading-tight">«${esc(v.titulo)}»</span></span></span>`;
    const inner = `
      <span class="relative block aspect-video overflow-hidden rounded-xl border border-white/10">
        ${media}
        <span class="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${esc(v.etiqueta)}</span>
        <span class="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-clavel group-hover:bg-clavel-deep">${v.youtube ? icon('h-play', 'ml-0.5 h-4 w-4') : icon('h-arrow-up-right', 'h-4 w-4')}</span>
      </span>
      <span class="mt-4 block font-display text-2xl uppercase leading-tight transition group-hover:text-clavel">${esc(v.titulo)}</span>
      <span class="mt-2 block text-sm leading-relaxed text-bone/65">${esc(v.desc)}</span>
      <span class="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-clavel">${esc(v.cta)}${v.youtube ? '' : ` ${icon('h-arrow-up-right', 'h-3 w-3')}<span class="sr-only"> (se abre en otra pestaña)</span>`}</span>`;
    const aos = `data-aos="fade-up" data-aos-delay="${(i % 3) * 90}"`;
    return v.youtube
      ? `<button type="button" data-yt="${esc(v.youtube)}" data-title="${esc(v.titulo)}" data-track="video-${esc(v.youtube)}" class="group block w-full text-left" ${aos}>${inner}</button>`
      : `<a href="${esc(v.url)}" ${ext} data-track="video-externo" class="group block" ${aos}>${inner}</a>`;
  };
  const elGrid = $('#videoGrid');
  if (elGrid) {
    const lista = elGrid.hasAttribute('data-skip-featured') ? videos.filter((v) => v !== destacado) : videos;
    elGrid.innerHTML = lista.map(cardVideo).join('');
  }

  // ---------- GRAVAÇÕES ----------
  const elRec = $('#recGrid');
  if (elRec) {
    elRec.innerHTML = (MC.grabaciones || []).map((g, i) => `
    <article class="group flex flex-col rounded-2xl border border-white/10 bg-panel/70 p-5 transition hover:border-clavel/60" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
      <div class="relative aspect-square overflow-hidden rounded-xl">
        ${g.capa
          ? `<img src="${IMG}covers/${esc(g.capa)}" width="600" height="600" alt="Portada de «${esc(g.titulo)}»" class="h-full w-full object-cover" loading="lazy">`
          : `<span class="vinyl absolute inset-[8%] rounded-full" aria-hidden="true"><span class="absolute inset-[34%] grid place-items-center rounded-full bg-clavel-deep"><span class="h-2 w-2 rounded-full bg-ink"></span></span></span>
             <span class="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-between bg-[linear-gradient(160deg,#a3122a,#5e0a19)] p-4 shadow-[12px_0_30px_-8px_rgba(0,0,0,.8)]">
               <span class="font-mono text-[9px] uppercase tracking-[.25em] text-bone/80">${esc(g.tipo)} · ${g.anio}</span>
               <span class="font-serif text-2xl italic leading-tight text-bone">${esc(g.titulo)}</span>
               <span class="font-display text-xs uppercase tracking-[.2em] text-bone/85">M. Cribaño</span>
             </span>`}
      </div>
      <p class="mt-5 font-mono text-[10px] uppercase tracking-[.25em] text-albero">${esc(g.tipo)} · ${g.anio}</p>
      <h3 class="mt-1 font-display text-2xl uppercase leading-tight">${esc(g.titulo)}</h3>
      <div class="mt-auto grid gap-2 pt-5">
        ${(g.links || []).map((l) => `<a href="${esc(l.url)}" ${ext} data-track="escuchar-${esc(l.plataforma)}" class="flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[.14em] transition hover:border-clavel hover:bg-clavel-deep hover:text-bone">${icon('h-note')} Escuchar en ${esc(l.plataforma)}<span class="sr-only"> (se abre en otra pestaña)</span></a>`).join('')}
      </div>
    </article>`).join('');
  }

  // ---------- MODAIS ----------
  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement; m.classList.add('is-open'); document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => $('[data-close], button', m)?.focus());
  }
  function closeModal(m) {
    m.classList.remove('is-open'); document.body.style.overflow = '';
    if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
    if (m.id === 'mobileMenu') $('#menuOpen')?.setAttribute('aria-expanded', 'false');
    lastFocus?.focus?.();
  }
  $$('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') $$('.modal.is-open').forEach(closeModal);
    // Mantém o foco dentro do modal aberto (Tab / Shift+Tab)
    const m = $('.modal.is-open');
    if (m && e.key === 'Tab') {
      const f = $$('a[href], button, iframe, input, select, textarea', m).filter((x) => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  const menu = $('#mobileMenu');
  $('#menuOpen')?.addEventListener('click', (e) => { e.currentTarget.setAttribute('aria-expanded', 'true'); openModal(menu); });
  $('#menuClose')?.addEventListener('click', () => closeModal(menu));
  $$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => closeModal(menu)));

  // ---------- PRIVACIDADE ----------
  const CONSENT_KEY = 'mc-consent';
  const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } };
  const bar = $('#consentBar');
  function setConsent(v) { try { localStorage.setItem(CONSENT_KEY, v); } catch { /* navegação privada */ } bar.classList.add('hidden'); }
  if (!getConsent()) bar.classList.remove('hidden');
  $$('[data-consent]').forEach((b) => b.addEventListener('click', () => setConsent(b.dataset.consent)));
  $$('[data-consent-open]').forEach((b) => b.addEventListener('click', () => bar.classList.remove('hidden')));

  // Player do YouTube (youtube-nocookie): só carrega ao clicar. Quem escolheu "Solo esenciales" vê antes um aviso.
  const ytUrl = (id) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
  const ytFrame = (id, title) => `<iframe class="h-full w-full" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="${esc(title)} — vídeo de YouTube" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  const ytNotice = (id, title, text, showPlay) => `
    <div class="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      ${icon('b-youtube', 'h-10 w-10 text-clavel')}
      <p class="max-w-md text-sm text-bone/75">${text}</p>
      <div class="flex w-full max-w-xs flex-col gap-2">
        ${showPlay ? `<button type="button" data-yt-once="${esc(id)}" data-title="${esc(title)}" class="w-full rounded-full bg-clavel-deep px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.18em] text-bone">Ver aquí</button>` : ''}
        <a href="${ytUrl(id)}" ${ext} class="w-full rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.18em]">Abrir en YouTube</a>
      </div>
    </div>`;
  function openVideo(id, title) {
    const frame = $('#videoFrame');
    $('#videoCaption').innerHTML = `${esc(title)} · <a href="${ytUrl(id)}" ${ext} class="text-clavel hover:underline">YouTube ↗</a>`;
    frame.innerHTML = '';
    openModal($('#videoModal'));
    requestAnimationFrame(() => {
      if (location.protocol === 'file:') frame.innerHTML = ytNotice(id, title, 'El vídeo solo se carga en páginas abiertas por http(s). Para probar en local, ejecuta <code class="text-clavel">tools\\serve.ps1</code> y abre http://localhost:8080.', false);
      else if (getConsent() === 'essential') frame.innerHTML = ytNotice(id, title, `Este vídeo se reproduce desde YouTube, que puede usar sus propias cookies. Consulta la <a href="${ROOT}privacidad.html" class="text-clavel underline">Política de privacidad</a>.`, true);
      else frame.innerHTML = ytFrame(id, title);
    });
  }
  document.addEventListener('click', (e) => {
    const once = e.target.closest('[data-yt-once]');
    if (once) { $('#videoFrame').innerHTML = ytFrame(once.dataset.ytOnce, once.dataset.title || ''); return; }
    const b = e.target.closest('[data-yt]');
    if (b) { track(`play-${b.dataset.yt}`); openVideo(b.dataset.yt, b.dataset.title || 'Vídeo'); }
  });

  // ---------- COPIAR (biografia para imprensa) ----------
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const txt = $(b.dataset.copy)?.innerText.trim();
    const label = $('[data-copy-label]', b);
    try { await navigator.clipboard.writeText(txt); if (label) { const o = label.textContent; label.textContent = 'Copiado'; setTimeout(() => (label.textContent = o), 2000); } }
    catch { if (label) label.textContent = 'Selecciona y copia'; }
  }));

  // ---------- HEADER / BOTÕES FLUTUANTES ----------
  const header = $('#header');
  const floaters = [$('#toTop'), document.body.dataset.page === 'contacto' ? null : $('#ctaFloat')].filter(Boolean);
  function onScroll() {
    const y = window.scrollY;
    ['bg-ink/85', 'backdrop-blur-lg', 'border-b', 'border-white/5'].forEach((c) => header.classList.toggle(c, y > 40));
    floaters.forEach((el) => ['opacity-0', 'translate-y-4', 'pointer-events-none'].forEach((c) => el.classList.toggle(c, y < 500)));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);
  if (document.body.dataset.page === 'contacto') $('#ctaFloat')?.remove();

  // ---------- FORMULÁRIO DE CONTRATAÇÃO ----------
  // Com MC.formEndpoint: envia em JSON e só mostra sucesso com a confirmação do servidor (2xx).
  // Sem endpoint: prepara o e-mail no programa de correio da pessoa (o site não envia nem guarda nada).
  const form = $('#contactForm');
  if (form) {
    const msg = $('#formMsg');
    const btn = $('button[type="submit"]', form);
    const fecha = form.elements.fecha;
    const porDefinir = form.elements.porDefinir;
    porDefinir.addEventListener('change', () => { fecha.disabled = porDefinir.checked; if (porDefinir.checked) { fecha.value = ''; fecha.removeAttribute('aria-invalid'); } });
    // Data mínima = hoje
    fecha.min = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

    const say = (html, tipo) => {
      msg.innerHTML = html;
      msg.className = `mt-5 rounded-xl border p-4 text-sm leading-relaxed ${tipo === 'ok' ? 'border-albero/50 bg-albero/10 text-bone' : 'border-clavel/60 bg-clavel/10 text-bone'}`;
      msg.focus();
    };
    const fechaFmt = (v) => (v ? new Date(v + 'T12:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Por definir');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = new FormData(form);
      if (f.get('web')) return; // honeypot: robô
      const d = {
        nombre: (f.get('nombre') || '').trim(), email: (f.get('email') || '').trim(), telefono: (f.get('telefono') || '').trim(),
        tipo: f.get('tipo') || '', localidad: (f.get('localidad') || '').trim(),
        fecha: porDefinir.checked ? 'Por definir' : fechaFmt(f.get('fecha')), mensaje: (f.get('mensaje') || '').trim(),
      };
      // Validação com mensagens por campo (rótulos visíveis + aria-invalid)
      const erros = [];
      const need = (name, ok, label) => { const el = form.elements[name]; el.toggleAttribute('aria-invalid', !ok); if (!ok) { el.setAttribute('aria-invalid', 'true'); erros.push([el, label]); } };
      need('nombre', !!d.nombre, 'nombre y apellidos');
      need('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email), 'un correo electrónico válido');
      need('tipo', !!d.tipo, 'tipo de evento');
      need('localidad', !!d.localidad, 'localidad y recinto');
      need('fecha', porDefinir.checked || !!f.get('fecha'), 'fecha prevista (o marca «Por definir»)');
      need('mensaje', !!d.mensaje, 'mensaje');
      need('privacidad', form.elements.privacidad.checked, 'aceptación de la política de privacidad');
      if (erros.length) { say(`Revisa: ${erros.map(([, l]) => l).join(', ')}.`, 'error'); erros[0][0].focus(); return; }

      const asunto = `Consulta de actuación — ${d.localidad} — ${d.fecha}`;
      const cuerpo = [`Nombre: ${d.nombre}`, `Correo: ${d.email}`, d.telefono && `Teléfono: ${d.telefono}`, `Tipo de evento: ${d.tipo}`, `Localidad y recinto: ${d.localidad}`, `Fecha prevista: ${d.fecha}`, '', d.mensaje].filter((x) => x !== '' && x !== undefined && x !== false).join('\n');
      const ERROR = `No se ha podido enviar tu consulta. Inténtalo de nuevo o utiliza el contacto indicado en esta página${MC.email ? `: <a href="mailto:${esc(MC.email)}" class="underline">${esc(MC.email)}</a>` : ''}.`;

      if (!MC.formEndpoint) {
        track('form-mailto');
        const href = `mailto:${MC.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        location.href = href;
        say(`Se ha abierto tu programa de correo con la consulta preparada: revísala y pulsa «Enviar». Si no se ha abierto, escribe a <a href="${esc(href)}" class="underline">${esc(MC.email)}</a>.`, 'ok');
        return;
      }

      btn.disabled = true; btn.classList.add('opacity-60'); btn.setAttribute('aria-busy', 'true');
      try {
        const res = await fetch(MC.formEndpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ _subject: asunto, subject: asunto, ...d, _replyto: d.email }),
        });
        if (!res.ok) throw new Error(res.status);
        track('form-enviado');
        form.reset(); fecha.disabled = false;
        say('Tu consulta se ha enviado. Gracias por incluir los datos del evento.', 'ok');
      } catch {
        track('form-error');
        say(ERROR, 'error');
      } finally { btn.disabled = false; btn.classList.remove('opacity-60'); btn.removeAttribute('aria-busy'); }
    });
  }

  // ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
  // Palos que "acendem" e linha da trajetória que se preenche. Com "reduzir movimento", tudo fica estático e preenchido.
  (() => {
    const fills = $$('.stage-fill'); const line = $('.flight-line');
    if (reduceMotion || (!fills.length && !line)) return;
    const clamp = (v) => Math.min(1, Math.max(0, v));
    let raf = 0;
    const frame = () => {
      raf = 0; const vh = innerHeight;
      fills.forEach((el) => el.style.setProperty('--p', `${(clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.4)) * 100).toFixed(1)}%`));
      if (line) { const b = line.getBoundingClientRect(); line.style.setProperty('--p', `${(clamp((vh * 0.6 - b.top) / b.height) * 100).toFixed(1)}%`); }
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true });
    frame();
  })();

  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  // ---------- AOS ----------
  // Os estados "ocultos" do CSS só valem com .aos-ready: se o aos.js não carregar, o conteúdo continua visível
  if (window.AOS && !reduceMotion) {
    document.documentElement.classList.add('aos-ready');
    AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' });
  }
})();
