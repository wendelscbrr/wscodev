/* ==========================================================
   Miguel Ángel | Pianista — interações do site
   (mesma base do site de Amparo, projeto de referência)
   Os conteúdos que mudam com frequência (atuações, vídeos, repertório)
   ficam nos arrays abaixo para facilitar a edição.
   ========================================================== */

// ---------- DADOS ----------

// Ao mudar algum destes, mude também em scripts/build.pl e rode "perl scripts/build.pl"
const WHATSAPP = '34654578928'; // +34 654 57 89 28 (briefing, fontes [2] e [6])
const EMAIL = 'pianistamiguelangel@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/el_pianista_miguel/';

// Formulário → e-mail via FormSubmit (serviço gratuito, sem servidor próprio).
// 1º envio: o FormSubmit manda um e-mail de ATIVAÇÃO para o endereço abaixo — o artista precisa clicar em "Activate".
// Depois da ativação, o FormSubmit mostra um código aleatório: troque o e-mail na URL por esse código para não expor o endereço.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

// Atuações do portfólio público do artista (briefing, "Registros para a seleção inicial", fonte [2]).
// Legendas sem afirmar o tipo de evento até confirmação (pedido do briefing).
// media: null enquanto não houver vídeo aprovado. Formatos aceitos:
//   { type: 'youtube', id: 'dQw4w9WgXcQ' }              → player youtube-nocookie
//   { type: 'instagram', id: 'C1a2B3c4D5e' }            → reel/post do Instagram
//   { type: 'file', src: 'assets/video/lepanto.mp4' }   → vídeo hospedado no próprio site (caminho a partir de site/)
// thumb: imagem 16:9 em assets/img/videos/ (≈1280×720, .webp). Sem thumb, usa a ilustração provisória.
const ACTUACIONES = [
  { titulo: 'Señorío de Lepanto', fecha: '2023', tipo: 'Actuación', contexto: 'Piano en directo en Señorío de Lepanto.', media: null, thumb: null },
  { titulo: 'Concierto privado', fecha: 'Noviembre de 2023', tipo: 'Concierto', contexto: 'Un concierto de piano en un encuentro privado.', media: null, thumb: null },
  { titulo: 'Noche en Blanco', fecha: '2022', tipo: 'Programación cultural', contexto: 'Actuación en la Noche en Blanco de Vélez-Málaga.', media: null, thumb: null },
  { titulo: 'Club de Golf Río Real', fecha: 'Julio de 2022', tipo: 'Actuación', contexto: 'Piano en directo en el Club de Golf Río Real.', media: null, thumb: null },
  { titulo: 'La Viñuela', fecha: '', tipo: 'Sesión privada', contexto: 'Sesión de piano en La Viñuela.', media: null, thumb: null },
];

// Repertório aprovado por Miguel (vazio até ele enviar a lista). Exemplo: { t: 'Título', a: 'Compositor', estilo: 'Clásica' }
// Com itens, a lista aparece na página Repertorio y vídeos.
const REPERTORIO = [];

// Fita abaixo do hero
const MARQUEE = ['Piano en directo', 'Bodas', 'Ceremonias', 'Cócteles', 'Eventos privados', 'Música clásica', 'Canciones actuales al piano', 'Málaga'];

// ---------- HELPERS ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const icon = (id, cls = 'i') => `<svg class="${cls}"><use href="#${id}"/></svg>`;
const pad = (n) => String(n).padStart(2, '0');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Caminho até a raiz do site (as páginas internas ficam um nível abaixo)
const ROOT = new URL($('link[rel="manifest"]').getAttribute('href'), location.href).href.replace(/site\.webmanifest$/, '');
const asset = (p) => ROOT + p;

// Métricas (briefing, "Indicadores"): cada clique em [data-track] vira um evento no dataLayer.
// Sem ferramenta de análise instalada, nada sai do site. Ao instalar GA4/Plausible, citar na página de privacidade.
function track(label) { (window.dataLayer = window.dataLayer || []).push({ event: 'miguel_click', label }); }
document.addEventListener('click', (e) => { const t = e.target.closest('[data-track]'); if (t) track(t.dataset.track); });

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-visible');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('is-visible'), 3200);
}

// ---------- WHATSAPP ----------
// Mensagem sugerida no briefing. Os colchetes ficam para a pessoa completar; com dados (formulário), já vão preenchidos.
function waText({ tipo, fecha, lugar, momento, extra, nombre, mensaje } = {}) {
  let t = `Hola, Miguel. Quería consultar disponibilidad para ${tipo || '[tipo de evento]'} el ${fecha || '[fecha]'} en ${lugar || '[localidad o espacio]'}. Me interesa contar con piano en directo para ${momento || '[momento del evento]'}. ¿Podemos hablar de las opciones y del presupuesto?`;
  if (extra) t += `\n\n${extra}`;
  if (mensaje) t += `\n\n${mensaje}`;
  if (nombre) t += `\n\n${nombre}`;
  return t;
}
const waLink = (data) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText(data))}`;
// data-wa = tipo de evento já preenchido (vazio = genérico) · data-wa-extra = linha extra
$$('[data-wa]').forEach((a) => { a.href = waLink({ tipo: a.dataset.wa, extra: a.dataset.waExtra }); });

// ---------- FITA ----------
$$('[data-marquee]').forEach((el) => {
  const run = MARQUEE.map((t) => `<span>${esc(t)}</span><span class="star">✦</span>`).join('');
  el.innerHTML = run + run; // duplicado para o loop contínuo
});

// ---------- ATUAÇÕES E VÍDEOS ----------
const PH_VIDEO = 'assets/img/videos/placeholder.svg';
const actMeta = (a) => [a.tipo, a.fecha].filter(Boolean).join(' · ');
const hasMedia = (a) => Boolean(a.media);
// Sem vídeo: o item vira link para o Instagram (alternativa por link, briefing "Lançamento · portfólio")
function actAttrs(a, i) {
  return hasMedia(a)
    ? `type="button" data-play="${i}" aria-label="${esc(`Ver vídeo: ${a.titulo}${a.fecha ? `, ${a.fecha}` : ''}`)}"`
    : `href="${INSTAGRAM}" target="_blank" rel="noopener" data-track="act-instagram-${i}" aria-label="${esc(`${a.titulo}: ver más en Instagram (se abre en una pestaña nueva)`)}"`;
}
const actTag = (a) => (hasMedia(a) ? 'button' : 'a');

// Lista com títulos que "acendem" com o scroll
$$('[data-acts="list"]').forEach((ul) => {
  const limit = +ul.dataset.limit || ACTUACIONES.length;
  ul.innerHTML = ACTUACIONES.slice(0, limit).map((a, i) => `
    <li>
      <${actTag(a)} class="act" ${actAttrs(a, i)}>
        <span class="kicker">${pad(i + 1)} · ${esc(actMeta(a))}</span>
        <span class="act__title stage-fill">${esc(a.titulo)}</span>
        <span class="act__ctx">${esc(a.contexto)}</span>
        <span class="act__icon" aria-hidden="true">${icon(hasMedia(a) ? 'h-play' : 'h-arrow-up-right')}</span>
      </${actTag(a)}>
    </li>`).join('');
});

// Grade de vídeos (16:9)
$$('[data-acts="grid"]').forEach((grid) => {
  const skip = +grid.dataset.skip || 0;
  grid.innerHTML = ACTUACIONES.map((a, i) => (i < skip ? '' : `
    <${actTag(a)} class="vcard group" ${actAttrs(a, i)} data-reveal style="--d:${((i - skip) % 3) * 0.08}s">
      <span class="vcard__media">
        <img src="${asset(a.thumb || PH_VIDEO)}" width="1280" height="720" alt="" loading="lazy" decoding="async" class="duo">
        <span class="vcard__tag">${esc(a.tipo)}</span>
        <span class="vcard__play" aria-hidden="true">${icon(hasMedia(a) ? 'h-play' : 'b-instagram')}</span>
      </span>
      <span class="vcard__title">${esc(a.titulo)}</span>
      <span class="vcard__sub">${esc(a.fecha || 'Sesión de piano')}</span>
      <span class="vcard__ctx">${esc(a.contexto)}${hasMedia(a) ? '' : ' <em>Vídeo en preparación · ver en Instagram.</em>'}</span>
    </${actTag(a)}>`)).join('');
});

// Destaque (primeiro item)
$$('[data-video-featured]').forEach((box) => {
  const a = ACTUACIONES[0];
  if (!a) return;
  box.innerHTML = `
    <${actTag(a)} class="vfeat group" ${actAttrs(a, 0)}>
      <span class="vcard__media">
        <img src="${asset(a.thumb || PH_VIDEO)}" width="1280" height="720" alt="" loading="lazy" decoding="async" class="duo">
        <span class="vcard__play" aria-hidden="true">${icon(hasMedia(a) ? 'h-play' : 'b-instagram')}</span>
      </span>
      <span class="vfeat__body">
        <span class="live"><span class="pulse-dot"></span> ${hasMedia(a) ? 'Piano en directo' : 'Vídeo en preparación'}</span>
        <span class="vfeat__title">${esc(a.titulo)}</span>
        <span class="vcard__sub">${esc(actMeta(a))}</span>
        <span class="muted">${esc(a.contexto)}</span>
        <span class="link-arrow">${hasMedia(a) ? `${icon('h-play')} Ver el vídeo` : `${icon('b-instagram')} Ver en Instagram`}</span>
      </span>
    </${actTag(a)}>`;
});

// Repertório aprovado (opcional)
$$('[data-rep-list]').forEach((ul) => {
  if (!REPERTORIO.length) return;
  ul.hidden = false;
  ul.innerHTML = REPERTORIO.map((r, i) => `
    <li class="act" style="cursor:default">
      <span class="kicker">${pad(i + 1)} · ${esc(r.estilo || '')}</span>
      <span class="act__title stage-fill">${esc(r.t)}</span>
      <span class="act__ctx">${icon('h-note')} ${esc(r.a)}</span>
      <span></span>
    </li>`).join('');
});

// ---------- MODAIS ----------
let lastFocus = null;
function openModal(m) {
  lastFocus = document.activeElement;
  m.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => $('[data-close], button, a', m)?.focus());
}
function closeModal(m) {
  m.classList.remove('is-open');
  document.body.style.overflow = '';
  if (m.id === 'videoModal') $('#videoFrame').innerHTML = '';
  if (m.id === 'mobileMenu') $('#menuOpen').setAttribute('aria-expanded', 'false');
  lastFocus?.focus?.();
}
$$('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); }));
document.addEventListener('keydown', (e) => {
  const open = $('.modal.is-open');
  if (!open) return;
  if (e.key === 'Escape') closeModal(open);
  // Mantém o foco do teclado dentro do modal aberto
  if (e.key === 'Tab') {
    const f = $$('a[href], button, input, iframe, video, [tabindex]:not([tabindex="-1"])', open).filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});

// Menu móvel
$('#menuOpen').addEventListener('click', () => { openModal($('#mobileMenu')); $('#menuOpen').setAttribute('aria-expanded', 'true'); });
$('#menuClose').addEventListener('click', () => closeModal($('#mobileMenu')));
$$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => closeModal($('#mobileMenu'))));

// ---------- PLAYER DE VÍDEO ----------
// O player externo só carrega quando a pessoa pede. Na primeira vez, um aviso explica que YouTube/Instagram
// podem usar cookies; a escolha "recordar" fica no localStorage (sem cookies próprios).
const MEDIA_KEY = 'miguel-media-ok';
const mediaOk = () => { try { return localStorage.getItem(MEDIA_KEY) === '1'; } catch { return false; } };
const setMediaOk = (v) => { try { v ? localStorage.setItem(MEDIA_KEY, '1') : localStorage.removeItem(MEDIA_KEY); } catch { /* navegação privada */ } };
const PLATFORM = { youtube: 'YouTube', instagram: 'Instagram' };
const externalUrl = (m) => (m.type === 'youtube' ? `https://www.youtube.com/watch?v=${m.id}` : m.type === 'instagram' ? `https://www.instagram.com/p/${m.id}/` : asset(m.src));
function embedHtml(m) {
  if (m.type === 'youtube') return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.id)}?autoplay=1&rel=0" title="Vídeo de Miguel Ángel al piano" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  if (m.type === 'instagram') return `<iframe src="https://www.instagram.com/p/${encodeURIComponent(m.id)}/embed/" title="Vídeo de Miguel Ángel en Instagram" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  return `<video src="${esc(asset(m.src))}" controls autoplay playsinline preload="metadata"></video>`;
}
function playVideo(i) {
  const a = ACTUACIONES[i];
  if (!a?.media) return;
  const m = a.media;
  const frame = $('#videoFrame');
  frame.className = `vframe${m.type === 'instagram' ? ' vframe--vertical' : ''}`;
  $('#videoCaption').innerHTML = `${esc(a.titulo)}${a.fecha ? ` · ${esc(a.fecha)}` : ''} · ${esc(a.contexto)}`;
  frame.innerHTML = '';
  openModal($('#videoModal'));
  track(`play-${i}`);
  requestAnimationFrame(() => {
    if (m.type === 'file' || mediaOk()) { frame.innerHTML = embedHtml(m); return; }
    const name = PLATFORM[m.type];
    frame.innerHTML = `
      <div class="vnotice dark">
        <span class="eyebrow">Vídeo en ${name}</span>
        <p>Este vídeo se reproduce desde ${name}, que puede usar sus propias cookies. Consulta la <a href="${ROOT}privacidad/" class="text-link">política de privacidad</a>.</p>
        <label><input type="checkbox" data-media-remember checked> Recordar mi elección</label>
        <div class="btn-row center">
          <button type="button" class="btn btn--ivory" data-media-accept="${i}">${icon('h-play')} Ver aquí</button>
          <a href="${externalUrl(m)}" target="_blank" rel="noopener" class="btn btn--line">Abrir en ${name}</a>
        </div>
      </div>`;
    $('[data-media-accept]', frame).focus();
  });
}
document.addEventListener('click', (e) => {
  const acc = e.target.closest('[data-media-accept]');
  if (acc) {
    if ($('[data-media-remember]')?.checked) setMediaOk(true);
    $('#videoFrame').innerHTML = embedHtml(ACTUACIONES[+acc.dataset.mediaAccept].media);
    return;
  }
  const p = e.target.closest('[data-play]');
  if (p) playVideo(+p.dataset.play);
});
$$('[data-privacy-reset]').forEach((b) => b.addEventListener('click', () => { setMediaOk(false); toast('Preferencia restablecida: se te preguntará antes de cargar vídeos externos.'); }));

// ---------- CABEÇALHO E BOTÕES FLUTUANTES ----------
const header = $('#header');
const floaters = $$('[data-float]');
function onScroll() {
  const y = scrollY;
  header.classList.toggle('is-scrolled', y > 30);
  floaters.forEach((el) => el.classList.toggle('is-visible', y > 600));
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- REVELAÇÃO NO SCROLL ----------
const revealIO = 'IntersectionObserver' in window && !reduceMotion
  ? new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealIO.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' })
  : null;
$$('[data-reveal]').forEach((el) => (revealIO ? revealIO.observe(el) : el.classList.add('is-in')));

// ---------- ANIMAÇÃO GUIADA PELO SCROLL ----------
// Os títulos das atuações acendem da esquerda para a direita; a linha dos momentos se preenche.
// Só roda com as seções na tela; com "reduzir movimento" tudo fica estático e preenchido.
(() => {
  const targets = [...$$('[data-acts="list"]'), ...$$('[data-rep-list]'), ...$$('[data-timeline]')];
  if (reduceMotion || !targets.length) return;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const visible = new Set();
  let raf = 0;
  function frame() {
    raf = 0;
    if (!visible.size) return;
    const vh = innerHeight;
    visible.forEach((box) => {
      $$('.stage-fill', box).forEach((el) => {
        const p = clamp((vh * 0.9 - el.getBoundingClientRect().top) / (vh * 0.4));
        el.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
      });
      const line = $('.tl__line', box);
      if (line) {
        const b = line.getBoundingClientRect();
        line.style.setProperty('--p', `${(clamp((vh * 0.62 - b.top) / b.height) * 100).toFixed(1)}%`);
      }
    });
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    if (visible.size && !raf) raf = requestAnimationFrame(frame);
  }, { rootMargin: '150px 0px' });
  targets.forEach((t) => io.observe(t));
})();

// ---------- FORMULÁRIO ----------
// Validação no navegador (mensagens junto a cada campo) + envio ao e-mail via FormSubmit.
// O sucesso só aparece depois da confirmação do servidor; em falha, nada é apagado e o WhatsApp
// aparece como alternativa, já com os dados preenchidos (briefing, "Lançamento · formulário").
(() => {
  const form = $('#contactForm');
  if (!form) return;
  const status = $('#formStatus');
  const btn = $('button[type="submit"]', form);
  const label = $('[data-btn-label]', form);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const RULES = {
    nombre: (v) => (v ? '' : 'Escribe tu nombre.'),
    email: (v) => (!v ? 'Escribe tu correo electrónico.' : EMAIL_RE.test(v) ? '' : 'Revisa el correo: parece incompleto (ejemplo: nombre@correo.com).'),
    tipo: (v) => (v ? '' : 'Elige el tipo de evento.'),
    localidad: (v) => (v ? '' : 'Indica la localidad del evento.'),
    telefono: (v) => (!v || /^[+()\d\s.-]{6,20}$/.test(v) ? '' : 'Revisa el teléfono: usa solo números, espacios y el prefijo (+34).'),
  };
  const val = (name) => (form.elements[name]?.value || '').trim();
  function check(name) {
    const msg = RULES[name](val(name));
    const field = form.elements[name];
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    $(`#e-${name}`).textContent = msg;
    return !msg;
  }
  let tried = false;
  Object.keys(RULES).forEach((n) => {
    form.elements[n].addEventListener('blur', () => { if (tried || val(n)) check(n); });
    form.elements[n].addEventListener('input', () => { if (form.elements[n].getAttribute('aria-invalid') === 'true') check(n); });
  });

  // Pré-preenchimento pelos links do site (?tipo=boda&momento=ceremonia&cancion=1&organizador=1)
  const q = new URLSearchParams(location.search);
  const TIPO = { boda: 'Boda', evento: 'Evento privado', otro: 'Otro' };
  const MOMENTO = { ceremonia: 'la ceremonia', coctel: 'el cóctel', ambos: 'la ceremonia y el cóctel', recepcion: 'una recepción (música de ambiente)', concierto: 'un pequeño concierto' };
  if (TIPO[q.get('tipo')]) form.elements.tipo.value = TIPO[q.get('tipo')];
  const pre = [];
  if (MOMENTO[q.get('momento')]) pre.push(`Me interesa contar con piano para ${MOMENTO[q.get('momento')]}.`);
  if (q.get('cancion')) pre.push('Canción:\nIntérprete:\nMomento del evento:\nVersión de referencia (enlace):');
  if (q.get('organizador')) pre.push('Horario previsto:\n¿El espacio dispone de piano?:\n¿La actuación será al aire libre?:');
  if (pre.length && !val('mensaje')) form.elements.mensaje.value = pre.join('\n\n');

  function showError(html) {
    status.innerHTML = html;
    status.hidden = false;
  }
  function busy(on) {
    btn.setAttribute('aria-busy', on ? 'true' : 'false');
    btn.querySelector('use').setAttribute('href', on ? '#h-spinner' : '#h-envelope');
    label.textContent = on ? 'Enviando…' : 'Enviar consulta';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    tried = true;
    status.hidden = true;
    const bad = Object.keys(RULES).filter((n) => !check(n));
    if (bad.length) {
      form.elements[bad[0]].focus();
      return;
    }
    if (val('_honey')) return; // robô

    const data = {
      nombre: val('nombre'), email: val('email'), telefono: val('telefono'), tipo: val('tipo'),
      localidad: val('localidad'), fecha: val('fecha'), espacio: val('espacio'), mensaje: val('mensaje'),
    };
    const payload = {
      'Nombre': data.nombre, 'Email': data.email, 'Teléfono': data.telefono || '—', 'Tipo de evento': data.tipo,
      'Localidad': data.localidad, 'Fecha prevista': data.fecha || '—', 'Espacio': data.espacio || '—', 'Mensaje': data.mensaje || '—',
      _subject: `Consulta web: ${data.tipo} en ${data.localidad}${data.fecha ? ` (${data.fecha})` : ''}`,
      _replyto: data.email, _template: 'table', _captcha: 'false', _honey: '',
    };

    busy(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload), signal: ctrl.signal,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !(json.success === true || json.success === 'true')) throw new Error(json.message || `HTTP ${res.status}`);
      track('form-enviado');
      $('[data-form-body]', form).hidden = true;
      const ok = $('[data-form-ok]', form);
      ok.hidden = false;
      ok.focus();
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    } catch (err) {
      track('form-error');
      const wa = waLink({ tipo: data.tipo.toLowerCase(), fecha: data.fecha, lugar: [data.espacio, data.localidad].filter(Boolean).join(', '), mensaje: data.mensaje, nombre: data.nombre });
      showError(`No se ha podido enviar tu consulta. Inténtalo de nuevo o <a href="${wa}" target="_blank" rel="noopener" data-track="form-error-whatsapp">escríbeme por WhatsApp</a>.`);
      console.warn('Formulario:', err);
    } finally {
      clearTimeout(timer);
      busy(false);
    }
  });
})();

// ---------- ANO NO RODAPÉ ----------
$$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
