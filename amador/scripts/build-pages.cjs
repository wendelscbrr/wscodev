// ==========================================================
// AMADOR • Violinist — gerador das páginas ES/EN
// Uso: npm run build   (gera site/**/index.html, sitemap.xml e robots.txt e depois compila o CSS)
// Textos: blocos de publicação do briefing (páginas 3 a 7), em espanhol da Espanha e inglês.
// Dados (vídeos, depoimentos, contatos): scripts/data.cjs
// ==========================================================
const fs = require('fs');
const path = require('path');
const { SITE, CONTACT, CATS, VIDEOS, TESTIMONIALS } = require('./data.cjs');

const OUT = path.resolve(__dirname, '../site');
const VERSION = 1; // aumente ao alterar main.js ou o CSS (cache longo no .htaccess)

// ---------- ROTAS (briefing: caminhos legíveis /es/bodas/ e /en/weddings/) ----------
const ROUTES = {
  home: { es: 'es/', en: 'en/' },
  weddings: { es: 'es/bodas/', en: 'en/weddings/' },
  events: { es: 'es/eventos/', en: 'en/events/' },
  about: { es: 'es/sobre-david/', en: 'en/about-david/' },
  videos: { es: 'es/videos-repertorio/', en: 'en/videos-repertoire/' },
  contact: { es: 'es/contacto/', en: 'en/contact/' },
  privacy: { es: 'es/privacidad/', en: 'en/privacy/' },
};
const NAV = ['home', 'weddings', 'events', 'about', 'videos', 'contact'];

// ---------- HELPERS ----------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const depth = (p) => p.split('/').filter(Boolean).length;
const icon = (id, cls = 'h-4 w-4') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const waUrl = (text) => `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const ytThumb = (c, v) => c.a(`assets/img/videos/${v.id}.webp`);

// ---------- TEXTOS DE INTERFACE ----------
const L = {
  es: {
    locale: 'es_ES', htmlLang: 'es', other: 'en', otherName: 'English', otherShort: 'EN',
    skip: 'Saltar al contenido',
    nav: { home: 'Inicio', weddings: 'Bodas', events: 'Eventos', about: 'Sobre David', videos: 'Vídeos y repertorio', contact: 'Contacto', privacy: 'Privacidad' },
    menuOpen: 'Abrir menú', menuClose: 'Cerrar menú', menu: 'Menú',
    headerCta: 'Consultar fecha',
    tagline: 'Violinista para bodas y eventos',
    cities: 'Barcelona · Madrid · España',
    // Briefing: mensagem inicial de WhatsApp no idioma da página
    wa: 'Hola, David. Me gustaría consultar disponibilidad para un evento el [fecha] en [ciudad]. Es [tipo de evento] y me interesa contar con violín en [momento].',
    waLabel: 'Escribir a David por WhatsApp',
    checkAvailability: 'Consultar disponibilidad', watch: 'Ver actuaciones', checkDate: 'Consultar mi fecha', proposal: 'Solicitar una propuesta', suggestSong: 'Proponer una canción',
    play: 'Reproducir', watchOnYt: 'Ver en YouTube', allVideos: 'Ver todas las actuaciones', more: 'Más vídeos', moreOnYt: 'Más en YouTube',
    vertical: 'Vídeo vertical', horizontal: 'Vídeo',
    soloViolin: 'Violín solo',
    moments: { ceremony: 'Ceremonia', drinks: 'Cóctel', dinner: 'Banquete', party: 'Fiesta' },
    testiKicker: 'Testimonios', testiTitle: 'Lo que cuentan las parejas', testiOrig: 'Texto original en inglés',
    footerAbout: 'Violín en directo para bodas y eventos en Barcelona, Madrid y otros destinos de España.',
    footerNav: 'Páginas', footerContact: 'Contacto', privacyPrefs: 'Preferencias de privacidad', webBy: 'Web por',
    toTop: 'Volver arriba', close: 'Cerrar', prev: 'Anterior', next: 'Siguiente', video: 'Vídeo', photo: 'Fotografía',
    consentTitle: 'Tu privacidad',
    consentText: (c) => `Esta web no utiliza cookies propias ni de análisis. Los vídeos se reproducen desde YouTube (modo de privacidad mejorada), que puede usar sus propias cookies, y solo se cargan cuando pulsas para verlos. Más información en la <a href="${c.link('privacy')}" class="text-varnish underline">Política de privacidad</a>.`,
    consentAll: 'Permitir vídeos de YouTube', consentEssential: 'Solo esenciales',
    marquee: ['Violín en directo', 'Barcelona', 'Madrid', 'Ceremonia', 'Cóctel', 'Recepción y fiesta', 'Hoteles y empresas', 'AMADOR • Violinist', 'Clásica · Pop · Latina'],
    ensemble: 'Amador Violin Ensemble',
  },
  en: {
    locale: 'en_GB', htmlLang: 'en', other: 'es', otherName: 'Español', otherShort: 'ES',
    skip: 'Skip to content',
    nav: { home: 'Home', weddings: 'Weddings', events: 'Events', about: 'About David', videos: 'Videos & Repertoire', contact: 'Contact', privacy: 'Privacy' },
    menuOpen: 'Open menu', menuClose: 'Close menu', menu: 'Menu',
    headerCta: 'Check my date',
    tagline: 'Wedding and event violinist',
    cities: 'Barcelona · Madrid · Spain',
    wa: 'Hi David, I’d like to check availability for an event on [date] in [city]. It’s a [type of event] and I’d like live violin for [part of the event].',
    waLabel: 'Message David on WhatsApp',
    checkAvailability: 'Check availability', watch: 'Watch performances', checkDate: 'Check my date', proposal: 'Request a proposal', suggestSong: 'Suggest a song',
    play: 'Play', watchOnYt: 'Watch on YouTube', allVideos: 'See all performances', more: 'More videos', moreOnYt: 'More on YouTube',
    vertical: 'Vertical video', horizontal: 'Video',
    soloViolin: 'Solo violin',
    moments: { ceremony: 'Ceremony', drinks: 'Drinks', dinner: 'Dinner', party: 'Party' },
    testiKicker: 'Testimonials', testiTitle: 'What couples say', testiOrig: 'Original text in Spanish',
    footerAbout: 'Live violin for weddings and events in Barcelona, Madrid and other destinations across Spain.',
    footerNav: 'Pages', footerContact: 'Contact', privacyPrefs: 'Privacy preferences', webBy: 'Website by',
    toTop: 'Back to top', close: 'Close', prev: 'Previous', next: 'Next', video: 'Video', photo: 'Photo',
    consentTitle: 'Your privacy',
    consentText: (c) => `This website doesn’t use its own or analytics cookies. Videos play from YouTube (privacy-enhanced mode), which may set its own cookies, and only load when you choose to watch them. Read more in the <a href="${c.link('privacy')}" class="text-varnish underline">Privacy Policy</a>.`,
    consentAll: 'Allow YouTube videos', consentEssential: 'Essential only',
    marquee: ['Live violin', 'Barcelona', 'Madrid', 'Ceremony', 'Drinks reception', 'Reception & party', 'Hotels & corporate', 'AMADOR • Violinist', 'Classical · Pop · Latin'],
    ensemble: 'Amador Violin Ensemble',
  },
};

// ---------- COMPONENTES ----------
const btn = (href, label, { primary = false, ic = '', track = '', ext = false, cls = '' } = {}) => `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}${track ? ` data-track="${track}"` : ''} class="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[.2em] transition ${primary ? 'bg-varnish text-ink shadow-[0_10px_30px_-10px_rgba(212,137,74,.8)] hover:bg-white' : 'border border-white/20 hover:border-varnish hover:text-varnish'} ${cls}">${ic ? icon(ic) : ''} ${label}</a>`;

const sectionHead = ({ ghost, kicker, title, intro = '', center = true, tag = 'h2' }) => `
        <header class="relative mb-14 ${center ? 'text-center' : ''}" data-aos="fade-up">
          <span class="ghost pointer-events-none absolute -top-6 ${center ? 'left-1/2 -translate-x-1/2' : 'left-0'} whitespace-nowrap font-display text-[18vw] uppercase sm:-top-10 sm:text-[140px]" aria-hidden="true">${ghost}</span>
          <p class="relative font-mono text-[11px] uppercase tracking-mega text-varnish">${kicker}</p>
          <${tag} class="relative mt-3 font-display text-5xl uppercase leading-[.95] sm:text-6xl">${title}</${tag}>
          ${intro ? `<p class="relative ${center ? 'mx-auto' : ''} mt-6 max-w-2xl leading-relaxed text-bone/70">${intro}</p>` : ''}
        </header>`;

// Cartão de vídeo (o player do YouTube só carrega no clique — main.js)
function videoCard(c, v, i = 0) {
  const t = c.t;
  const label = `${v.t} — ${v.a}`;
  return `
          <button type="button" data-video="${v.id}" data-title="${esc(v.t)}" data-sub="${esc(v.a)}"${v.vertical ? ' data-vertical' : ''} data-cats="${v.cats.join(' ')}" aria-label="${esc(`${t.play}: ${label}`)}" class="group block text-left" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
            <span class="relative block aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-panel">
              <img src="${ytThumb(c, v)}" width="${v.vertical ? 405 : 960}" height="${v.vertical ? 720 : 540}" alt="" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
              <span class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></span>
              <span class="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest">${esc(CATS[v.cats[0]][c.lang])}</span>
              <span class="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/60 transition duration-300 group-hover:scale-110 group-hover:border-varnish group-hover:bg-varnish group-hover:text-ink">${icon('h-play', 'ml-0.5 h-4 w-4')}</span>
              <span class="absolute bottom-3 left-3 right-16 hidden font-mono sm:block text-[9px] uppercase tracking-widest text-bone/70">${esc(t.moments[v.moment])} · ${esc(t.soloViolin)}</span>
            </span>
            <span class="mt-4 block font-display text-xl uppercase leading-tight transition group-hover:text-varnish">${esc(v.t)}</span>
            <span class="mt-1 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/55">${esc(v.a)}${v.place ? ` · ${esc(v.place)}` : ''}</span>
          </button>`;
}

function videoFeatured(c, v) {
  const t = c.t;
  return `
        <button type="button" data-video="${v.id}" data-title="${esc(v.t)}" data-sub="${esc(v.a)}" aria-label="${esc(`${t.play}: ${v.t} — ${v.a}`)}" class="group relative grid w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/70 text-left lg:grid-cols-[1.6fr_1fr]" data-aos="fade-up">
          <span class="relative block aspect-video overflow-hidden">
            <img src="${ytThumb(c, v)}" width="960" height="540" alt="" class="duo absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
            <span class="absolute inset-0 grid place-items-center"><span class="grid h-20 w-20 place-items-center rounded-full bg-varnish text-ink shadow-[0_10px_25px_-5px_rgba(212,137,74,.7)] transition duration-300 group-hover:scale-110">${icon('h-play', 'ml-1 h-8 w-8')}</span></span>
          </span>
          <span class="flex flex-col justify-center p-6 sm:p-10">
            <span class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-varnish"><span class="pulse-dot h-2 w-2 rounded-full bg-varnish text-varnish"></span> ${esc(t.moments[v.moment])} · ${esc(t.soloViolin)}</span>
            <span class="mt-3 block font-display text-5xl uppercase leading-none sm:text-6xl">${esc(v.t)}</span>
            <span class="mt-3 block font-mono text-[11px] uppercase tracking-[.2em] text-bone/60">${esc(v.a)}${v.place ? ` · ${esc(v.place)}` : ''}</span>
            <span class="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bone/80 transition group-hover:text-varnish">${icon('b-youtube')} ${esc(t.play)}</span>
          </span>
        </button>`;
}

const ytMoreCard = (c, i) => `
          <a href="${CONTACT.youtube}" target="_blank" rel="noopener" data-track="videos-youtube" class="group flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-white/20 p-6 text-center transition hover:border-varnish" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
            <span class="grid h-16 w-16 place-items-center rounded-full border border-white/20 text-bone/75 transition group-hover:border-varnish group-hover:text-varnish">${icon('b-youtube', 'h-6 w-6')}</span>
            <span class="font-display text-2xl uppercase leading-none transition group-hover:text-varnish">${c.t.moreOnYt}</span>
            <span class="font-mono text-[9px] uppercase tracking-widest text-bone/55">${CONTACT.instagramHandle}</span>
          </a>`;

function testimonials(c, list = TESTIMONIALS) {
  const t = c.t;
  return `
    <!-- ==================== TESTIMONIOS ==================== -->
    <!-- Textos publicados em amadorviolin.com/booking, no idioma original. A CONFIRMAR: autorização de cada casal (briefing R04) -->
    <section class="relative border-y border-white/5 bg-panel/40 py-24 sm:py-28" aria-labelledby="testi-${c.key}">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: t.testiKicker, kicker: t.testiKicker, title: `<span id="testi-${c.key}">${t.testiTitle}</span>` })}
        <div class="grid gap-6 ${({ 1: 'mx-auto max-w-3xl', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' })[Math.min(list.length, 3)]}">
          ${list.map((q, i) => `
          <figure class="group flex flex-col rounded-2xl border border-white/10 bg-ink/60 p-7 sm:p-8" data-aos="fade-up" data-aos-delay="${i * 100}">
            <span class="font-serif text-7xl italic leading-[.5] text-varnish" aria-hidden="true">“</span>
            <p class="mt-2 font-mono text-[10px] uppercase tracking-[.3em] text-varnish">${esc(q.topic[c.lang])}</p>
            <blockquote class="mt-4 flex-1 leading-relaxed text-bone/80" lang="${q.lang}"><p>${esc(q.text)}</p></blockquote>
            <div class="string-rule mt-7"></div>
            <figcaption class="mt-5 flex items-center justify-between gap-3">
              <span class="font-display text-xl uppercase tracking-wide">${esc(q.name)}</span>
              ${q.lang !== c.lang ? `<span class="font-mono text-[9px] uppercase tracking-widest text-bone/50">${c.lang === 'es' ? 'Texto original en inglés' : 'Original text in Spanish'}</span>` : ''}
            </figcaption>
          </figure>`).join('')}
        </div>
      </div>
    </section>`;
}

function closingCta(c, { kicker, title, text, primaryLabel, track }) {
  const t = c.t;
  return `
    <!-- ==================== CHAMADA FINAL ==================== -->
    <section class="relative overflow-hidden py-24 sm:py-32">
      <img src="${c.a('assets/img/photos/contacto.webp')}" width="1280" height="720" alt="" class="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"></div>
      <div class="relative mx-auto max-w-4xl px-4 text-center sm:px-6" data-aos="fade-up">
        <p class="font-mono text-[11px] uppercase tracking-mega text-varnish">${kicker}</p>
        <h2 class="mt-4 font-display text-5xl uppercase leading-[.95] sm:text-7xl">${title}</h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bone/75">${text}</p>
        <div class="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          ${btn(`${c.link('contact')}#consulta`, primaryLabel, { primary: true, ic: 'h-calendar', track })}
          ${btn(waUrl(t.wa), 'WhatsApp', { ic: 'b-whatsapp', track: `${track}-whatsapp`, ext: true })}
        </div>
      </div>
    </section>`;
}

// Cabeçalho das páginas internas (mesmo tratamento do hero, mais baixo)
function pageHero(c, { img, imgMobile, kicker, title, intro, ctas = '', pos = '50% 40%' }) {
  return `
    <section class="letterbox relative flex min-h-[78svh] items-end overflow-hidden pb-20 pt-32">
      <picture>
        ${imgMobile ? `<source media="(max-width: 767px)" srcset="${c.a(`assets/img/photos/${imgMobile}.webp`)}" width="600" height="800">` : ''}
        <img src="${c.a(`assets/img/photos/${img}.webp`)}" width="1280" height="720" alt="" fetchpriority="high" class="hero-img absolute inset-0 h-full w-full object-cover" style="object-position:${pos}">
      </picture>
      <div class="absolute inset-0 bg-ink/60"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-oxblood/40 via-transparent to-varnish/10 mix-blend-multiply"></div>
      <div class="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent"></div>
      <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-mega text-varnish"><span class="h-px w-10 bg-varnish/60"></span>${kicker}</p>
        <h1 class="hero-title mt-5 max-w-4xl font-display text-5xl uppercase leading-[.92] sm:text-7xl lg:text-8xl">${title}</h1>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-bone/80 sm:text-lg">${intro}</p>
        ${ctas ? `<div class="mt-9 flex flex-col gap-3 sm:flex-row">${ctas}</div>` : ''}
      </div>
    </section>`;
}

const marquee = (c) => {
  const run = c.t.marquee.map((x) => `<span class="px-6">${esc(x)}</span><span class="opacity-50">✦</span>`).join('');
  return `
    <div class="relative z-20 -mt-6 h-40 overflow-hidden" aria-hidden="true">
      <div class="tape absolute left-[-5%] top-14 w-[110%] -rotate-[2deg] border-y border-white/5 bg-panel py-3 opacity-80">
        <div class="marquee reverse font-display text-2xl uppercase tracking-[.2em] text-bone/[.45]">${run}${run}</div>
      </div>
      <div class="tape absolute left-[-5%] top-16 w-[110%] rotate-[1.5deg] bg-varnish py-3">
        <div class="marquee font-display text-2xl uppercase tracking-[.2em] text-ink">${run}${run}</div>
      </div>
    </div>`;
};

const checklist = (items) => items.map((x) => `<li class="flex items-start gap-2.5">${icon('h-check', 'mt-0.5 h-4 w-4 shrink-0 text-varnish')} <span>${x}</span></li>`).join('');

// ---------- SPRITE DE ÍCONES ----------
const SPRITE = `
  <svg xmlns="http://www.w3.org/2000/svg" class="hidden">
    <defs>
      <symbol id="h-play" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></symbol>
      <symbol id="h-map-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></symbol>
      <symbol id="h-calendar" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></symbol>
      <symbol id="h-envelope" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></symbol>
      <symbol id="h-arrow-up-right" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/></symbol>
      <symbol id="h-arrow-up" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"/></symbol>
      <symbol id="h-arrow-right" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></symbol>
      <symbol id="h-chevron-left" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></symbol>
      <symbol id="h-chevron-right" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></symbol>
      <symbol id="h-x-mark" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></symbol>
      <symbol id="h-bars" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></symbol>
      <symbol id="h-note" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"/></symbol>
      <symbol id="h-heart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></symbol>
      <symbol id="h-users" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></symbol>
      <symbol id="h-building" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21"/></symbol>
      <symbol id="h-glass" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8 3h8l-.6 6.2A3.4 3.4 0 0 1 12 12.3a3.4 3.4 0 0 1-3.4-3.1L8 3Zm4 9.3V20m-3.5 1h7"/></symbol>
      <symbol id="h-sparkles" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"/></symbol>
      <symbol id="h-globe" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></symbol>
      <symbol id="h-academic" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></symbol>
      <symbol id="h-plus" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></symbol>
      <symbol id="h-check" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></symbol>
      <symbol id="b-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></symbol>
      <symbol id="b-instagram" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></symbol>
      <symbol id="b-youtube" viewBox="0 0 24 24"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></symbol>
    </defs>
  </svg>`;

// ---------- LAYOUT ----------
function layout(c, { title, desc, body, schema = null, ogImage = 'assets/img/og-image.jpg', preload = '' }) {
  const t = c.t;
  const url = SITE + c.path;
  const alt = SITE + ROUTES[c.key][t.other];
  const navLinks = NAV.filter((k) => k !== 'home');
  return `<!doctype html>
<html lang="${t.htmlLang}" class="scroll-smooth">
<head>
  <meta charset="utf-8">
  <!-- Garante a barra final (/bodas → /bodas/) para os caminhos relativos funcionarem -->
  <script>if (!/\\/$|\\.html$/.test(location.pathname)) location.replace(location.pathname + '/' + location.search + location.hash);</script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0e0b0a">
  <meta name="format-detection" content="telephone=no">
  <link rel="canonical" href="${url}">
  <!-- hreflang recíproco ES/EN (briefing R07) -->
  <link rel="alternate" hreflang="es" href="${SITE + ROUTES[c.key].es}">
  <link rel="alternate" hreflang="en" href="${SITE + ROUTES[c.key].en}">
  <link rel="alternate" hreflang="x-default" href="${SITE + ROUTES[c.key].es}">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:locale:alternate" content="${L[t.other].locale}">
  <meta property="og:site_name" content="AMADOR • Violinist">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${SITE}${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="David Amador tocando el violín en Montjuïc, Barcelona">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="icon" href="${c.a('favicon.ico')}" sizes="48x48">
  <link rel="icon" href="${c.a('assets/img/icon-192.png')}" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="${c.a('assets/img/apple-touch-icon.png')}">
  <link rel="manifest" href="${c.a('site.webmanifest')}">
${schema ? `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n` : ''}
  <link rel="preload" href="${c.a('assets/fonts/anton-400-latin.woff2')}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${c.a('assets/fonts/inter-400-700-latin.woff2')}" as="font" type="font/woff2" crossorigin>
${preload}
  <!-- Tailwind compilado (fonte em ../src/input.css — rode "npm run build") -->
  <link rel="stylesheet" href="${c.a(`assets/css/style.css?v=${VERSION}`)}">
</head>
<body class="grain overflow-x-hidden bg-ink font-sans text-bone" data-page="${c.key}">
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-varnish focus:px-5 focus:py-3 focus:text-ink">${t.skip}</a>
${SPRITE}

  <!-- ==================== HEADER ==================== -->
  <header id="header" class="fixed inset-x-0 top-0 z-50 transition-all duration-500">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <a href="${c.link('home')}" class="flex items-baseline gap-2 leading-none" aria-label="AMADOR • Violinist — ${t.nav.home}">
        <span class="wordmark font-display text-2xl uppercase">Amador</span><span class="h-1.5 w-1.5 -translate-y-1 rounded-full bg-varnish"></span><span class="signature hidden text-xl text-bone/80 sm:inline">Violinist</span>
      </a>
      <nav class="hidden items-center gap-6 xl:flex" aria-label="${c.lang === 'es' ? 'Principal' : 'Main'}">
        ${navLinks.map((k) => `<a href="${c.link(k)}"${k === c.key ? ' aria-current="page"' : ''} class="nav-link font-mono text-[11px] uppercase tracking-[.2em] text-bone/70 transition hover:text-white">${t.nav[k]}</a>`).join('\n        ')}
      </nav>
      <div class="flex items-center gap-2">
        <a href="${c.alt}" hreflang="${t.other}" lang="${t.other}" data-track="lang-${t.other}" class="grid h-9 min-w-9 place-items-center rounded-full border border-white/15 px-2.5 font-mono text-[11px] font-bold tracking-widest text-bone/80 transition hover:border-varnish hover:text-white" aria-label="${t.otherName}">${t.otherShort}</a>
        <a href="${waUrl(t.wa)}" target="_blank" rel="noopener" data-track="header-whatsapp" class="hidden items-center gap-2 rounded-full bg-varnish px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink transition hover:bg-white md:flex">${icon('b-whatsapp')} ${t.headerCta}</a>
        <button id="menuOpen" type="button" class="grid h-10 w-10 place-items-center rounded-full border border-white/15 xl:hidden" aria-label="${t.menuOpen}" aria-controls="mobileMenu" aria-expanded="false">${icon('h-bars', 'h-5 w-5')}</button>
      </div>
    </div>
  </header>

  <!-- Menu mobile -->
  <div id="mobileMenu" class="modal fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl xl:hidden" role="dialog" aria-modal="true" aria-label="${t.menu}">
    <div class="flex h-20 items-center justify-between px-4 sm:px-6">
      <span class="wordmark font-display text-2xl uppercase">Amador <span class="signature text-xl text-varnish">Violinist</span></span>
      <button id="menuClose" type="button" class="grid h-10 w-10 place-items-center rounded-full border border-white/15" aria-label="${t.menuClose}">${icon('h-x-mark', 'h-5 w-5')}</button>
    </div>
    <nav class="flex flex-1 flex-col justify-center gap-3 px-8" aria-label="${t.menu}">
      ${NAV.map((k, i) => `<a href="${c.link(k)}"${k === c.key ? ' aria-current="page"' : ''} class="flex items-baseline gap-4 font-display text-3xl uppercase tracking-wide hover:text-varnish sm:text-5xl ${k === c.key ? 'text-varnish' : ''}"><span class="font-mono text-[11px] text-bone/40">${pad(i + 1)}</span>${t.nav[k]}</a>`).join('\n      ')}
    </nav>
    <div class="flex flex-wrap gap-3 px-8 pb-10">
      <a href="${waUrl(t.wa)}" target="_blank" rel="noopener" data-track="menu-whatsapp" class="flex flex-1 items-center justify-center gap-2 rounded-full bg-varnish px-5 py-3 text-[11px] font-semibold uppercase tracking-[.2em] text-ink">${icon('b-whatsapp')} WhatsApp</a>
      <a href="${c.alt}" hreflang="${t.other}" lang="${t.other}" class="grid h-11 place-items-center rounded-full border border-white/15 px-4 font-mono text-[11px] font-bold tracking-widest">${t.otherName}</a>
    </div>
  </div>

  <main id="main" class="overflow-x-clip">
${body}
  </main>

  <!-- ==================== RODAPÉ (briefing: Instagram, WhatsApp, e-mail e páginas legais) ==================== -->
  <!-- Aviso legal (LSSI): criar quando o David enviar titular, NIF e endereço — o briefing pede para validar com os responsáveis -->
  <footer class="relative border-t border-white/5 pt-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div class="max-w-sm">
          <p class="font-display text-5xl uppercase leading-none wordmark">Amador <span class="text-varnish">•</span></p>
          <p class="signature mt-1 text-3xl text-bone/80">Violinist</p>
          <p class="mt-5 text-sm leading-relaxed text-bone/70">${t.footerAbout}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <a href="${waUrl()}" target="_blank" rel="noopener" aria-label="WhatsApp" class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone/75 transition hover:border-varnish hover:text-varnish">${icon('b-whatsapp')}</a>
            <a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram" class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone/75 transition hover:border-varnish hover:text-varnish">${icon('b-instagram')}</a>
            <a href="${CONTACT.youtube}" target="_blank" rel="noopener" aria-label="YouTube" class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone/75 transition hover:border-varnish hover:text-varnish">${icon('b-youtube')}</a>
            <a href="mailto:${CONTACT.email}" aria-label="Email" class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-bone/75 transition hover:border-varnish hover:text-varnish">${icon('h-envelope')}</a>
          </div>
        </div>
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${t.footerNav}</p>
          <ul class="mt-5 space-y-2.5 text-sm text-bone/65">
            ${NAV.map((k) => `<li><a href="${c.link(k)}" class="hover:text-white">${t.nav[k]}</a></li>`).join('\n            ')}
          </ul>
        </div>
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${t.footerContact}</p>
          <ul class="mt-5 space-y-3 text-sm text-bone/65">
            <li class="flex items-start gap-2.5">${icon('b-whatsapp', 'mt-0.5 h-4 w-4 shrink-0 text-varnish')}<a href="${waUrl()}" target="_blank" rel="noopener" data-track="footer-whatsapp" class="hover:text-white">${CONTACT.phone}</a></li>
            <li class="flex items-start gap-2.5">${icon('h-envelope', 'mt-0.5 h-4 w-4 shrink-0 text-varnish')}<a href="mailto:${CONTACT.email}" data-track="footer-email" class="break-all hover:text-white">${CONTACT.email}</a></li>
            <li class="flex items-start gap-2.5">${icon('b-instagram', 'mt-0.5 h-4 w-4 shrink-0 text-varnish')}<a href="${CONTACT.instagram}" target="_blank" rel="noopener" class="hover:text-white">${CONTACT.instagramHandle}</a></li>
            <li class="flex items-start gap-2.5">${icon('h-map-pin', 'mt-0.5 h-4 w-4 shrink-0 text-varnish')}${t.cities}</li>
          </ul>
        </div>
      </div>
      <div class="mt-16 flex flex-col gap-4 border-t border-white/5 py-8 font-mono text-[10px] uppercase tracking-[.2em] text-bone/50 md:flex-row md:items-center md:justify-between">
        <p>© <span id="year">2026</span> AMADOR • Violinist — David Amador</p>
        <p class="flex flex-wrap items-center gap-4"><a href="${c.link('privacy')}" class="transition hover:text-varnish">${t.nav.privacy}</a><button type="button" data-consent-open class="uppercase tracking-[.2em] transition hover:text-varnish">${t.privacyPrefs}</button></p>
        <p>${t.webBy} <a href="https://wscodev.vercel.app/" target="_blank" rel="noopener" class="font-semibold text-bone/70 transition hover:text-varnish">Wendel Silva</a></p>
      </div>
    </div>
  </footer>

  <!-- WhatsApp flutuante + voltar ao topo -->
  <a href="${waUrl(t.wa)}" target="_blank" rel="noopener" data-track="float-whatsapp" id="waFloat" class="wa-ring pointer-events-none fixed bottom-5 right-5 z-40 grid h-14 w-14 translate-y-4 place-items-center rounded-full bg-varnish text-ink opacity-0 shadow-2xl transition duration-300 hover:bg-white" aria-label="${t.waLabel}">${icon('b-whatsapp', 'h-7 w-7')}</a>
  <a href="#main" id="toTop" class="pointer-events-none fixed bottom-24 right-6 z-40 grid h-11 w-11 translate-y-4 place-items-center rounded-full border border-white/15 bg-ink/80 opacity-0 backdrop-blur transition duration-300 hover:border-varnish" aria-label="${t.toTop}">${icon('h-arrow-up')}</a>

  <!-- Modal de vídeo (YouTube em modo de privacidade mejorada, carregado só no clique) -->
  <div id="videoModal" class="modal fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="${t.video}">
    <button type="button" data-close class="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60 transition hover:border-varnish" aria-label="${t.close}">${icon('h-x-mark', 'h-5 w-5')}</button>
    <div id="videoBox" class="flex w-full max-w-5xl flex-col items-center">
      <div id="videoFrame" class="aspect-video w-full overflow-hidden rounded-xl bg-panel"></div>
      <p id="videoCaption" class="mt-4 text-center font-mono text-[11px] uppercase tracking-[.2em] text-bone/70"></p>
    </div>
  </div>

  <!-- Lightbox -->
  <div id="lightbox" class="modal fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label="${t.photo}">
    <button type="button" data-close class="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60" aria-label="${t.close}">${icon('h-x-mark', 'h-5 w-5')}</button>
    <button type="button" data-lb="prev" class="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60" aria-label="${t.prev}">${icon('h-chevron-left', 'h-5 w-5')}</button>
    <img id="lbImg" alt="" class="max-h-[85vh] max-w-full rounded-lg object-contain">
    <button type="button" data-lb="next" class="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60" aria-label="${t.next}">${icon('h-chevron-right', 'h-5 w-5')}</button>
    <p id="lbCap" class="absolute bottom-5 left-0 right-0 text-center font-mono text-[11px] uppercase tracking-[.2em] text-bone/70"></p>
  </div>

  <!-- Privacidade: sem cookies próprios; YouTube só carrega com a ação da pessoa (orientação da AEPD — briefing) -->
  <div id="consentBar" class="fixed inset-x-3 bottom-3 z-[90] hidden max-w-lg rounded-2xl border border-white/10 bg-panel/95 p-5 shadow-2xl backdrop-blur sm:left-5 sm:right-auto" role="dialog" aria-live="polite" aria-label="${t.consentTitle}">
    <p class="font-display text-lg uppercase tracking-wide">${t.consentTitle}</p>
    <p class="mt-2 text-sm leading-relaxed text-bone/75">${t.consentText(c)}</p>
    <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <button type="button" data-consent="all" class="rounded-full bg-varnish px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] text-ink transition hover:bg-white">${t.consentAll}</button>
      <button type="button" data-consent="essential" class="rounded-full border border-white/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-varnish">${t.consentEssential}</button>
    </div>
  </div>

  <script src="${c.a('assets/vendor/aos.js')}" defer></script>
  <script src="${c.a(`assets/js/main.js?v=${VERSION}`)}" defer></script>
</body>
</html>
`;
}

// ---------- DADOS ESTRUTURADOS ----------
const personLd = {
  '@type': 'Person', '@id': `${SITE}#david`, name: 'David Amador', alternateName: 'AMADOR • Violinist',
  jobTitle: 'Violinist', url: SITE, image: `${SITE}assets/img/photos/about.webp`,
  telephone: CONTACT.phone, email: CONTACT.email, sameAs: [CONTACT.instagram, CONTACT.youtube],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Conservatori Superior de Música del Liceu' },
};
const serviceLd = (lang) => ({
  '@type': 'Service', '@id': `${SITE}#service-${lang}`,
  name: lang === 'es' ? 'Violín en directo para bodas y eventos' : 'Live violin for weddings and events',
  provider: { '@id': `${SITE}#david` },
  areaServed: [{ '@type': 'City', name: 'Barcelona' }, { '@type': 'City', name: 'Madrid' }, { '@type': 'Country', name: 'Spain' }],
});

// ==========================================================
// PÁGINAS
// ==========================================================

// ---------- INICIO / HOME ----------
function pageHome(c) {
  const es = c.lang === 'es';
  const t = c.t;
  const S = es ? {
    title: 'Violinista en Barcelona para bodas y eventos | AMADOR • Violinist',
    desc: 'David Amador toca el violín en directo en bodas y eventos en Barcelona, Madrid y otros destinos de España. Escucha sus actuaciones y consulta tu fecha.',
    h1: 'Violinista para bodas y eventos en Barcelona',
    open: 'Soy David Amador. Toco el violín en directo en bodas y eventos en Barcelona, Madrid y otros destinos de España. Desde la entrada a la ceremonia hasta el cóctel y la fiesta, preparo la música para cada momento de vuestra celebración.',
    servKicker: 'Violín en directo', servTitle: 'Música para <span class="signature text-varnish">cada momento</span>',
    services: [
      { img: 'boda-ceremonia', n: 'Ceremonia', k: 'Bodas', ic: 'h-heart', to: 'weddings', text: 'Elegid la música para la entrada, la firma y la salida. Si tenéis una canción especial en mente, contádmelo al consultar la fecha.' },
      { img: 'boda-coctel', n: 'Cóctel', k: 'Bodas', ic: 'h-glass', to: 'weddings', text: 'Recibid a vuestros invitados con violín en directo mientras conversan y brindan. El repertorio puede acompañar el ambiente o darle un ritmo más animado.' },
      { img: 'boda-recepcion', n: 'Recepción y fiesta', k: 'Bodas', ic: 'h-sparkles', to: 'weddings', text: 'Incorporad el violín a la entrada al banquete, la cena o el inicio del baile. Podemos elegir juntos el momento que mejor encaje con el programa.' },
      { img: 'eventos-hotel', n: 'Hoteles y eventos de empresa', k: 'Eventos', ic: 'h-building', to: 'events', text: 'Música en directo para recepciones, cenas de gala y encuentros profesionales. Consultad el formato según el espacio y el programa.' },
    ],
    more: 'Saber más',
    vidKicker: 'Actuaciones', vidTitle: 'Escucha el violín <span class="signature text-varnish">en directo</span>',
    vidIntro: 'Piezas clásicas, canciones románticas, temas de cine y música para el cóctel, grabadas en Barcelona y otros lugares.',
    bioKicker: 'Sobre David', bioTitle: 'Formación clásica, <span class="signature text-varnish">repertorio sin fronteras</span>',
    bio: 'Cursé un máster en violín en el Conservatori Superior de Música del Liceu de Barcelona. En mis actuaciones combino la formación clásica con un repertorio que incluye pop, baladas y ritmos latinos.',
    bioLink: 'Conocer a David',
    chips: ['Máster en violín · Liceu', 'Clásica', 'Pop y baladas', 'Ritmos latinos'],
    cKicker: 'Consultar disponibilidad', cTitle: '¿Ya tenéis <span class="signature text-varnish">fecha?</span>',
    cText: 'Enviadme el lugar y los momentos en los que os gustaría contar con música en directo.',
  } : {
    title: 'Wedding and Event Violinist in Barcelona | AMADOR • Violinist',
    desc: 'David Amador plays live violin for weddings and events in Barcelona, Madrid and across Spain. Watch performances and check availability for your date.',
    h1: 'Wedding and event violinist in Barcelona',
    open: 'I’m David Amador. I play live violin for weddings and events in Barcelona, Madrid and other destinations across Spain. From walking down the aisle to drinks and dancing, I put together music for each part of your celebration.',
    servKicker: 'Live violin', servTitle: 'Music for <span class="signature text-varnish">every moment</span>',
    services: [
      { img: 'boda-ceremonia', n: 'Wedding ceremony', k: 'Weddings', ic: 'h-heart', to: 'weddings', text: 'Choose the music for your entrance, the signing and your exit. If there’s a song that means something to you, tell me when you enquire about your date.' },
      { img: 'boda-coctel', n: 'Drinks reception', k: 'Weddings', ic: 'h-glass', to: 'weddings', text: 'Welcome your guests with live violin while they mingle and raise a glass. The music can sit in the background or bring more energy to the room.' },
      { img: 'boda-recepcion', n: 'Reception and party', k: 'Weddings', ic: 'h-sparkles', to: 'weddings', text: 'Bring live violin into your reception entrance, dinner or the start of the dancing. We can choose where it fits best in your schedule.' },
      { img: 'eventos-hotel', n: 'Hotels and corporate events', k: 'Events', ic: 'h-building', to: 'events', text: 'Live violin for receptions, gala dinners and business gatherings. Get in touch to discuss the format for your venue and programme.' },
    ],
    more: 'Learn more',
    vidKicker: 'Performances', vidTitle: 'Hear the violin <span class="signature text-varnish">live</span>',
    vidIntro: 'Classical pieces, romantic songs, film themes and music for your drinks reception, recorded in Barcelona and beyond.',
    bioKicker: 'About David', bioTitle: 'Classical training, <span class="signature text-varnish">a repertoire without borders</span>',
    bio: 'I completed a master’s degree in violin at the Conservatori Superior de Música del Liceu in Barcelona. My classical training is the foundation for a repertoire that also includes pop, ballads and Latin music.',
    bioLink: 'Meet David',
    chips: ['Master’s in violin · Liceu', 'Classical', 'Pop & ballads', 'Latin music'],
    cKicker: 'Check availability', cTitle: 'Have a date <span class="signature text-varnish">in mind?</span>',
    cText: 'Tell me where you’re celebrating and which moments you’d like to accompany with live music.',
  };
  const featured = VIDEOS.filter((v) => v.featured).sort((a, b) => a.featured - b.featured);
  const [feat, ...rest] = featured;
  const body = `
    <!-- ==================== HERO ==================== -->
    <!-- Fundo: quadro do vídeo "Experience × Interstellar" (Montjuïc, Barcelona) do canal oficial.
         Trocar por foto profissional em evento real quando o David enviar (briefing: versões horizontal e vertical) -->
    <section id="inicio" class="letterbox relative flex min-h-[100svh] items-center overflow-hidden pt-20">
      <picture>
        <source media="(max-width: 767px)" srcset="${c.a('assets/img/photos/hero-mobile.webp')}" width="540" height="960">
        <img src="${c.a('assets/img/photos/hero.webp')}" width="1280" height="720" alt="" fetchpriority="high" class="hero-img absolute inset-0 h-full w-full object-cover object-[60%_40%]">
      </picture>
      <div class="absolute inset-0 bg-ink/55"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-oxblood/30 via-transparent to-varnish/10 mix-blend-multiply"></div>
      <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"></div>
      <div class="hero-glow pointer-events-none absolute left-1/4 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2"></div>

      <!-- Assinatura: as quatro cordas do violino (Sol · Re · La · Mi) -->
      <div class="strings pointer-events-none absolute bottom-[16vh] right-[7%] top-[18vh] z-10 hidden lg:flex" aria-hidden="true">
        <span class="string"><span>${es ? 'Sol' : 'G'}</span></span><span class="string"><span>${es ? 'Re' : 'D'}</span></span><span class="string"><span>${es ? 'La' : 'A'}</span></span><span class="string"><span>${es ? 'Mi' : 'E'}</span></span>
      </div>

      <div class="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-1.5">
            <span class="eq flex h-3.5 items-end"><span></span><span></span><span></span><span></span></span>
            <span class="font-mono text-[10px] uppercase tracking-[.3em] text-bone/85">${t.cities}</span>
          </div>
          <p class="hero-title font-display uppercase leading-[.82]" aria-hidden="true">
            <span class="block text-[24vw] wordmark sm:text-[160px] lg:text-[200px]">Amador</span>
            <span class="signature -mt-2 block text-5xl text-varnish sm:-mt-4 sm:text-7xl">• Violinist</span>
          </p>
          <h1 class="mt-8 max-w-2xl font-display text-xl uppercase leading-snug tracking-[.18em] sm:text-2xl">${S.h1}</h1>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-bone/80 sm:text-base">${S.open}</p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            ${btn(`${c.link('contact')}#consulta`, t.checkAvailability, { primary: true, ic: 'h-calendar', track: 'hero-consulta' })}
            ${btn(c.link('videos'), t.watch, { ic: 'h-play', track: 'hero-videos' })}
          </div>
        </div>
        <a href="#servicios" class="mt-14 hidden flex-col items-start gap-2 text-bone/60 hover:text-bone md:inline-flex" aria-label="${S.servKicker}">
          <span class="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5"><span class="scroll-dot h-2 w-1 rounded-full bg-current"></span></span>
        </a>
      </div>
    </section>
${marquee(c)}

    <!-- ==================== SERVIÇOS (briefing: logo após a abertura) ==================== -->
    <section id="servicios" class="relative py-20 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: es ? 'Servicios' : 'Services', kicker: S.servKicker, title: S.servTitle })}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${S.services.map((s, i) => `
          <article class="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition hover:border-varnish/50" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="relative overflow-hidden"><img src="${c.a(`assets/img/photos/${s.img}.webp`)}" width="600" height="800" alt="${esc(`David Amador — ${s.n}`)}" class="duo aspect-[4/5] w-full object-cover" loading="lazy"><span class="absolute left-4 top-4 font-display text-4xl text-bone/90">${pad(i + 1)}</span></div>
            <div class="flex flex-1 flex-col p-6">
              <p class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.3em] text-varnish">${icon(s.ic, 'h-4 w-4')} ${s.k}</p>
              <h3 class="mt-3 font-display text-3xl uppercase leading-none">${s.n}</h3>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-bone/70">${s.text}</p>
              <div class="string-rule my-6"></div>
              <a href="${c.link(s.to)}" class="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-bone/85 transition hover:text-varnish">${S.more} ${icon('h-arrow-right')}</a>
            </div>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <!-- ==================== VÍDEO (briefing: depois dos serviços) ==================== -->
    <section id="actuaciones" class="relative border-t border-white/5 bg-panel/40 py-24 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: es ? 'Directo' : 'Live', kicker: S.vidKicker, title: S.vidTitle, intro: S.vidIntro })}
        ${videoFeatured(c, feat)}
        <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          ${rest.map((v, i) => videoCard(c, v, i)).join('')}
        </div>
        <div class="mt-12 text-center">${btn(c.link('videos'), t.allVideos, { ic: 'h-play', track: 'home-all-videos' })}</div>
      </div>
    </section>

    <!-- ==================== BIOGRAFIA BREVE ==================== -->
    <section id="sobre" class="relative overflow-hidden py-24 sm:py-28">
      <div class="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <figure class="group relative mx-auto w-full max-w-sm lg:col-span-5" data-aos="fade-right">
          <div class="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl border border-varnish/40 sm:block"></div>
          <div class="relative overflow-hidden rounded-2xl"><img src="${c.a('assets/img/photos/about.webp')}" width="880" height="1100" alt="${es ? 'David Amador tocando el violín al aire libre, con el Mediterráneo al fondo' : 'David Amador playing the violin outdoors with the Mediterranean behind him'}" class="duo aspect-[4/5] w-full object-cover object-[25%_50%]" loading="lazy"></div>
          <figcaption class="absolute -bottom-5 -left-2 -rotate-3 rounded-md bg-varnish px-4 py-2 shadow-xl sm:-left-6">
            <span class="block font-mono text-[9px] font-bold uppercase tracking-[.3em] text-ink">AMADOR • Violinist</span>
            <span class="block font-display text-2xl leading-none text-ink">David Amador</span>
          </figcaption>
        </figure>
        <div class="lg:col-span-7" data-aos="fade-left" data-aos-delay="100">
          <p class="font-mono text-[11px] uppercase tracking-mega text-varnish">${S.bioKicker}</p>
          <h2 class="mt-4 font-display text-4xl uppercase leading-[.95] sm:text-5xl">${S.bioTitle}</h2>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">${S.bio}</p>
          <ul class="mt-7 flex flex-wrap gap-2">${S.chips.map((x) => `<li class="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[.2em] text-bone/75">${x}</li>`).join('')}</ul>
          <div class="mt-9">${btn(c.link('about'), S.bioLink, { ic: 'h-arrow-right', track: 'home-about' })}</div>
        </div>
      </div>
    </section>
${testimonials(c)}
${closingCta(c, { kicker: S.cKicker, title: S.cTitle, text: S.cText, primaryLabel: t.checkAvailability, track: 'home-cierre' })}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: 'AMADOR • Violinist', inLanguage: ['es-ES', 'en'], publisher: { '@id': `${SITE}#david` } },
      personLd, serviceLd(c.lang),
    ],
  };
  const preload = `  <link rel="preload" as="image" href="${c.a('assets/img/photos/hero-mobile.webp')}" media="(max-width: 767px)" fetchpriority="high">
  <link rel="preload" as="image" href="${c.a('assets/img/photos/hero.webp')}" media="(min-width: 768px)" fetchpriority="high">`;
  return layout(c, { title: S.title, desc: S.desc, body, schema, preload });
}

// ---------- BODAS / WEDDINGS ----------
function pageWeddings(c) {
  const es = c.lang === 'es';
  const t = c.t;
  const S = es ? {
    title: 'Violín en directo para bodas en Barcelona | AMADOR • Violinist',
    desc: 'Violín en directo para la ceremonia, el cóctel y el banquete de vuestra boda en Barcelona, Madrid y otros destinos de España. Consulta tu fecha con David Amador.',
    kicker: 'Bodas', h1: 'Violín en directo <span class="signature text-varnish">para vuestra boda</span>',
    intro: 'Podéis contar conmigo para un solo momento o consultar una combinación para distintas partes de la boda. Decidme cómo habéis pensado el día y qué canciones os gustaría escuchar.',
    blocks: [
      { n: 'Ceremonia', img: 'boda-ceremonia', text: 'Podemos elegir una pieza para la entrada y otras para los momentos que marque vuestro guion. Si hay una canción importante para vosotros, indicad el título y la versión que tenéis en mente.' },
      { n: 'Cóctel y banquete', img: 'boda-coctel', text: 'Durante el aperitivo, el violín puede acompañar las conversaciones o preparar el paso a un ambiente más animado. En el banquete, podemos reservar la música para la entrada, la cena o el comienzo del baile.' },
    ],
    dayKicker: 'Ideas para el día', dayTitle: 'Una pieza para <span class="signature text-varnish">cada momento</span>',
    dayIntro: 'Sugerencias tomadas de mi repertorio grabado. La elección final siempre es vuestra.',
    day: [
      ['Entrada a la ceremonia', 'Palladio · Experience × Interstellar', 'Para el momento en que todos os miran.'],
      ['Firma', 'Mariage d’amour · Only Time', 'Música serena mientras se firma el acta.'],
      ['Salida', 'Until I Found You · All You Need Is Love', 'Más luz y ritmo para salir ya casados.'],
      ['Cóctel', 'Sarà perché ti amo · Felicità · Corazón partío', 'Conversación, brindis y canciones que todos reconocen.'],
      ['Entrada al banquete', 'Conquest of Paradise · Now We Are Free', 'Una entrada con aire de película.'],
      ['Cena', 'Caruso · Right Here Waiting', 'De fondo, sin interrumpir la sobremesa.'],
      ['Inicio del baile', 'Don’t Stop Me Now · Paradise', 'El violín abre la pista.'],
    ],
    songKicker: '¿Tenéis una canción especial?', songText: 'Indicad el título y la versión al consultar la fecha y revisaremos si se puede preparar para vuestra boda.',
    intlKicker: 'Bodas desde otro país', intlTitle: '¿Os casáis en España <span class="signature text-varnish">desde fuera?</span>',
    intlText: 'Podemos organizarlo todo a distancia, por correo electrónico o WhatsApp. Actúo en Barcelona, Madrid y otros destinos de España; si la boda es en otro lugar, incluid el país y la ciudad en vuestro mensaje.',
    intlList: ['Primer contacto por correo o WhatsApp', 'Página y conversación en inglés o español', 'Elección de canciones antes del viaje'],
    vidKicker: 'Para vuestra boda', vidTitle: 'Escuchad <span class="signature text-varnish">algunas piezas</span>',
    sendKicker: 'Para preparar la propuesta', send: ['Fecha de la boda', 'Ciudad y espacio, si ya lo tenéis', 'Momentos con música: ceremonia, cóctel, banquete', 'Canciones especiales y su versión'],
    cTitle: '¿Ya tenéis <span class="signature text-varnish">fecha?</span>', cText: 'Enviadme el lugar y los momentos en los que os gustaría contar con música en directo.',
  } : {
    title: 'Live Violin for Weddings in Barcelona | AMADOR • Violinist',
    desc: 'Live violin for your wedding ceremony, drinks and reception in Barcelona, Madrid and across Spain. Check availability for your date with David Amador.',
    kicker: 'Weddings', h1: 'Live violin <span class="signature text-varnish">for your wedding</span>',
    intro: 'You can book live violin for one part of the day or enquire about combining several parts of the wedding. Tell me how you’ve planned the day and what songs you’d like to hear.',
    blocks: [
      { n: 'Ceremony', img: 'boda-ceremonia', text: 'We can choose a piece for the entrance and others for the moments in your ceremony schedule. If you have a special song in mind, send me the title and the version you love.' },
      { n: 'Drinks and reception', img: 'boda-coctel', text: 'During drinks, the violin can sit comfortably behind conversation or build towards a livelier atmosphere. At the reception, we can save the music for your entrance, dinner or the moment the dancing starts.' },
    ],
    dayKicker: 'Ideas for the day', dayTitle: 'A piece for <span class="signature text-varnish">every moment</span>',
    dayIntro: 'Suggestions from my recorded repertoire. The final choice is always yours.',
    day: [
      ['Walking down the aisle', 'Palladio · Experience × Interstellar', 'For the moment all eyes are on you.'],
      ['Signing', 'Mariage d’amour · Only Time', 'Calm music while you sign the register.'],
      ['Exit', 'Until I Found You · All You Need Is Love', 'More light and rhythm as newlyweds.'],
      ['Drinks', 'Sarà perché ti amo · Felicità · Corazón partío', 'Conversation, toasts and songs everyone knows.'],
      ['Reception entrance', 'Conquest of Paradise · Now We Are Free', 'An entrance with a cinematic feel.'],
      ['Dinner', 'Caruso · Right Here Waiting', 'In the background, without interrupting the table.'],
      ['First dance & party', 'Don’t Stop Me Now · Paradise', 'The violin opens the dance floor.'],
    ],
    songKicker: 'Have a special song?', songText: 'Send me the title and version when you enquire about your date, and we’ll check whether it can be prepared for your wedding.',
    intlKicker: 'Planning from abroad', intlTitle: 'Getting married in Spain <span class="signature text-varnish">from another country?</span>',
    intlText: 'We can arrange everything remotely, by email or WhatsApp. I play in Barcelona, Madrid and other destinations across Spain; for other locations, include the country and city in your message.',
    intlList: ['First contact by email or WhatsApp', 'Conversation in English or Spanish', 'Song choices settled before you travel'],
    vidKicker: 'For your wedding', vidTitle: 'Listen to <span class="signature text-varnish">a few pieces</span>',
    sendKicker: 'To prepare your proposal', send: ['Wedding date', 'City and venue, if you have one', 'Parts of the day: ceremony, drinks, reception', 'Special songs and the version you love'],
    cTitle: 'Have a date <span class="signature text-varnish">in mind?</span>', cText: 'Tell me where you’re celebrating and which moments you’d like to accompany with live music.',
  };
  const wedVideos = ['8MivlHhSNkU', 'hjQIFZuAQjY', '4U4tYtzJRIY', 'bNyF-S0rXvU', 'DkjeREtnxnc', '8OFNwYz4fr4', '3tqidZjH6o0'].map((id) => VIDEOS.find((v) => v.id === id));
  const body = `
${pageHero(c, { img: 'about-wide', imgMobile: 'castillo', kicker: S.kicker, title: S.h1, intro: S.intro, pos: '50% 35%', ctas: `${btn(`${c.link('contact')}#consulta`, t.checkDate, { primary: true, ic: 'h-calendar', track: 'bodas-hero' })}${btn(waUrl(t.wa), 'WhatsApp', { ic: 'b-whatsapp', ext: true, track: 'bodas-hero-whatsapp' })}` })}

    <!-- ==================== CERIMÔNIA / COQUETEL E BANQUETE ==================== -->
    <section class="relative py-20 sm:py-24">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        ${S.blocks.map((b, i) => `
        <article class="group grid overflow-hidden rounded-2xl border border-white/10 bg-panel/60 sm:grid-cols-[1fr_1.2fr]" data-aos="fade-up" data-aos-delay="${i * 100}">
          <div class="relative overflow-hidden"><img src="${c.a(`assets/img/photos/${b.img}.webp`)}" width="600" height="800" alt="${esc(`David Amador — ${b.n}`)}" class="duo h-full min-h-[260px] w-full object-cover" loading="lazy"></div>
          <div class="flex flex-col justify-center p-7">
            <span class="font-display text-5xl text-varnish">${pad(i + 1)}</span>
            <h2 class="mt-3 font-display text-4xl uppercase leading-none">${b.n}</h2>
            <p class="mt-4 leading-relaxed text-bone/75">${b.text}</p>
          </div>
        </article>`).join('')}
      </div>
    </section>

    <!-- ==================== LINHA DO TEMPO DO DIA (mesmo componente da referência) ==================== -->
    <section class="relative border-t border-white/5 bg-panel/40 py-24 sm:py-28">
      <div class="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div class="lg:sticky lg:top-28" data-aos="fade-right">
          <p class="font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${S.dayKicker}</p>
          <h2 class="mt-3 font-display text-5xl uppercase leading-[.95]">${S.dayTitle}</h2>
          <p class="mt-4 max-w-md leading-relaxed text-bone/70">${S.dayIntro}</p>
          <figure class="group relative mt-8 overflow-hidden rounded-2xl">
            <img src="${c.a('assets/img/photos/violin-detalle.webp')}" width="720" height="720" alt="${es ? 'Detalle del violín y del arco de David Amador' : 'Close-up of David Amador’s violin and bow'}" class="duo aspect-[6/5] w-full object-cover" loading="lazy">
          </figure>
          <div class="mt-6 rounded-xl border border-varnish/40 bg-varnish/[.06] p-5">
            <p class="font-mono text-[10px] uppercase tracking-[.3em] text-varnish">${S.songKicker}</p>
            <p class="mt-2 text-sm leading-relaxed text-bone/80">${S.songText}</p>
            <a href="${c.link('contact')}?song=1#consulta" data-track="bodas-cancion" class="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-varnish hover:text-white">${t.suggestSong} ${icon('h-arrow-right', 'h-3.5 w-3.5')}</a>
          </div>
        </div>
        <ol id="momentos" class="relative pl-8" data-aos="fade-left" data-aos-delay="100">
          <span class="flight-line absolute bottom-3 left-[7px] top-3 w-px" aria-hidden="true"></span>
          ${S.day.map(([m, p, d], i) => `
          <li class="relative pb-10 last:pb-0">
            <span class="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border ${i === 0 ? 'border-varnish bg-varnish' : 'border-varnish/60 bg-ink'}">${i === 0 ? '<span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink text-ink"></span>' : ''}</span>
            <p class="font-mono text-[10px] uppercase tracking-[.3em] ${i === 0 ? 'text-varnish' : 'text-bone/55'}">${pad(i + 1)} · ${m}</p>
            <p class="mt-1 font-display text-2xl uppercase leading-tight">${p}</p>
            <p class="mt-1 text-sm leading-relaxed text-bone/65">${d}</p>
          </li>`).join('')}
        </ol>
      </div>
    </section>

    <!-- ==================== CASAIS INTERNACIONAIS (briefing: público "casais internacionais") ==================== -->
    <section class="relative py-24 sm:py-28">
      <div class="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div data-aos="fade-right">
          <p class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${icon('h-globe')} ${S.intlKicker}</p>
          <h2 class="mt-3 font-display text-4xl uppercase leading-[.95] sm:text-5xl">${S.intlTitle}</h2>
          <p class="mt-5 leading-relaxed text-bone/75">${S.intlText}</p>
          <ul class="mt-6 space-y-2.5 text-sm text-bone/80">${checklist(S.intlList)}</ul>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            ${btn(`mailto:${CONTACT.email}`, 'Email', { ic: 'h-envelope', track: 'bodas-intl-email' })}
            ${btn(waUrl(t.wa), 'WhatsApp', { ic: 'b-whatsapp', ext: true, track: 'bodas-intl-whatsapp' })}
          </div>
        </div>
        <div class="group grid grid-cols-2 gap-4" data-aos="fade-left">
          <img src="${c.a('assets/img/photos/mar.webp')}" width="600" height="800" alt="${es ? 'David Amador tocando junto al mar' : 'David Amador playing by the sea'}" class="duo aspect-[3/4] w-full rounded-2xl object-cover" loading="lazy">
          <img src="${c.a('assets/img/photos/jardin.webp')}" width="600" height="800" alt="${es ? 'David Amador en el Laberint d’Horta de Barcelona' : 'David Amador at the Laberint d’Horta in Barcelona'}" class="duo mt-10 aspect-[3/4] w-full rounded-2xl object-cover" loading="lazy">
        </div>
      </div>
    </section>

    <!-- ==================== VÍDEOS PARA BODAS ==================== -->
    <section class="relative border-t border-white/5 py-24 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: es ? 'Bodas' : 'Weddings', kicker: S.vidKicker, title: S.vidTitle })}
        <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          ${wedVideos.map((v, i) => videoCard(c, v, i)).join('')}
          ${ytMoreCard(c, wedVideos.length)}
        </div>
      </div>
    </section>
${testimonials(c, [TESTIMONIALS[0], TESTIMONIALS[2]])}

    <!-- ==================== O QUE ENVIAR ==================== -->
    <section class="relative pt-24">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-8 rounded-2xl border border-white/10 bg-panel/60 p-7 sm:p-10 md:flex-row md:items-center md:justify-between" data-aos="fade-up">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[.3em] text-varnish">${S.sendKicker}</p>
            <ul class="mt-4 grid gap-2.5 text-sm text-bone/80 sm:grid-cols-2 sm:gap-x-8">${checklist(S.send)}</ul>
          </div>
          ${btn(`${c.link('contact')}#consulta`, t.checkDate, { primary: true, ic: 'h-calendar', track: 'bodas-preparar', cls: 'shrink-0' })}
        </div>
      </div>
    </section>
${closingCta(c, { kicker: t.checkAvailability, title: S.cTitle, text: S.cText, primaryLabel: t.checkDate, track: 'bodas-cierre' })}`;
  return layout(c, { title: S.title, desc: S.desc, body, schema: { '@context': 'https://schema.org', '@graph': [personLd, serviceLd(c.lang)] } });
}

// ---------- EVENTOS / EVENTS ----------
function pageEvents(c) {
  const es = c.lang === 'es';
  const t = c.t;
  const S = es ? {
    title: 'Violinista para hoteles y eventos de empresa | AMADOR • Violinist',
    desc: 'Violín en directo para recepciones, cenas de gala, presentaciones de producto y encuentros profesionales en Barcelona, Madrid y otros destinos de España.',
    kicker: 'Hoteles y empresas', h1: 'Violín en directo para hoteles y <span class="signature text-varnish">eventos de empresa</span>',
    intro: 'Toco en recepciones, cenas de gala, presentaciones de producto y encuentros profesionales. Contadme cómo será el espacio y qué papel queréis que tenga la música.',
    occKicker: 'Ocasiones', occ: ['Recepciones', 'Cenas de gala', 'Presentaciones de producto', 'Encuentros profesionales'],
    fmtKicker: 'Formatos', fmtTitle: '¿Qué papel tendrá <span class="signature text-varnish">la música?</span>',
    fmtIntro: 'Podemos hablar de una actuación durante la bienvenida, de música durante la cena o de una intervención dentro del programa.',
    formats: [
      ['h-glass', 'Bienvenida', 'Violín en directo mientras llegan los invitados y empieza la recepción.'],
      ['h-note', 'Música durante la cena', 'Un acompañamiento que se adapta al ritmo del servicio y de la sala.'],
      ['h-sparkles', 'Intervención en el programa', 'Una actuación dentro del guion del evento, en el momento que decidáis.'],
    ],
    ensTag: 'Varios músicos', ensTitle: 'Amador Violin Ensemble',
    ensText: 'Si buscáis una actuación con varios músicos, consultad la disponibilidad y la formación del ensemble para vuestra fecha.',
    ensRows: [['Formato', 'Ensemble'], ['Formación', 'Según la fecha'], ['Consulta', 'Con antelación']],
    ensSide: 'Formación a medida', ensSideTitle: 'Consultad disponibilidad del ensemble', ensBtn: 'Consultar el ensemble',
    planKicker: 'Para producción, planners y espacios', planTitle: 'Lo que necesito <span class="signature text-varnish">saber</span>',
    plan: ['Fecha, horario y ciudad', 'Espacio: interior o exterior', 'Papel de la música en el programa', 'Número aproximado de invitados', 'Contacto de la persona responsable'],
    planNote: 'Con esos datos os indicaré el formato y lo que necesito en el espacio para la actuación.',
    vidKicker: 'En directo', vidTitle: 'Para recepciones <span class="signature text-varnish">y cenas</span>',
    cTitle: 'Hablemos de <span class="signature text-varnish">vuestro evento</span>', cText: 'Contadme el espacio, la fecha y el programa, y prepararé una propuesta.',
  } : {
    title: 'Violinist for Hotels and Corporate Events | AMADOR • Violinist',
    desc: 'Live violin for receptions, gala dinners, product launches and business gatherings in Barcelona, Madrid and across Spain.',
    kicker: 'Hotels & corporate', h1: 'Live violin for hotels and <span class="signature text-varnish">corporate events</span>',
    intro: 'I play at receptions, gala dinners, product launches and business gatherings. Tell me about the venue and what you want the music to do.',
    occKicker: 'Occasions', occ: ['Receptions', 'Gala dinners', 'Product launches', 'Business gatherings'],
    fmtKicker: 'Formats', fmtTitle: 'What should <span class="signature text-varnish">the music do?</span>',
    fmtIntro: 'We can discuss a welcome performance, music during dinner or a featured set within the programme.',
    formats: [
      ['h-glass', 'Welcome performance', 'Live violin as guests arrive and the reception begins.'],
      ['h-note', 'Music during dinner', 'Accompaniment that follows the pace of the service and the room.'],
      ['h-sparkles', 'Featured set', 'A performance within the running order, at the moment you choose.'],
    ],
    ensTag: 'Several musicians', ensTitle: 'Amador Violin Ensemble',
    ensText: 'If you’d like a performance with several musicians, ask about availability and the line-up for your date.',
    ensRows: [['Format', 'Ensemble'], ['Line-up', 'Depends on date'], ['Enquiry', 'In advance']],
    ensSide: 'Tailored line-up', ensSideTitle: 'Ask about ensemble availability', ensBtn: 'Ask about the ensemble',
    planKicker: 'For producers, planners and venues', planTitle: 'What I need <span class="signature text-varnish">to know</span>',
    plan: ['Date, time and city', 'Venue: indoors or outdoors', 'Role of the music in the programme', 'Approximate number of guests', 'Contact for the person in charge'],
    planNote: 'With these details I’ll suggest a format and confirm what I need at the venue for the performance.',
    vidKicker: 'Live', vidTitle: 'For receptions <span class="signature text-varnish">and dinners</span>',
    cTitle: 'Let’s talk about <span class="signature text-varnish">your event</span>', cText: 'Tell me about the venue, the date and the programme, and I’ll put together a proposal.',
  };
  const evVideos = ['RIA_TDf-ov0', 'M_tJdHg9GeM', 'T3UoqGRTbqc', 'IrDNlSTihJU'].map((id) => VIDEOS.find((v) => v.id === id));
  const body = `
${pageHero(c, { img: 'eventos-wide', imgMobile: 'eventos-hotel', kicker: S.kicker, title: S.h1, intro: S.intro, ctas: `${btn(`${c.link('contact')}?type=corporate#consulta`, t.proposal, { primary: true, ic: 'h-building', track: 'eventos-hero' })}${btn(`mailto:${CONTACT.email}`, 'Email', { ic: 'h-envelope', track: 'eventos-hero-email' })}` })}

    <!-- Ocasiões -->
    <section class="relative py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-center font-mono text-[11px] uppercase tracking-mega text-varnish">${S.occKicker}</p>
        <ul class="mt-6 grid grid-cols-2 border-y border-white/10 lg:grid-cols-4" data-aos="fade-up">
          ${S.occ.map((o, i) => `<li class="flex items-center gap-3 border-white/10 px-4 py-6 font-display text-xl uppercase leading-tight sm:text-2xl ${i % 2 ? '' : 'border-r'} ${i < 3 ? 'lg:border-r' : ''}"><span class="font-mono text-[10px] text-varnish">${pad(i + 1)}</span>${o}</li>`).join('')}
        </ul>
      </div>
    </section>

    <!-- Formatos -->
    <section class="relative py-20 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: es ? 'Formatos' : 'Formats', kicker: S.fmtKicker, title: S.fmtTitle, intro: S.fmtIntro })}
        <div class="grid gap-6 md:grid-cols-3">
          ${S.formats.map(([ic, n, d], i) => `
          <article class="group rounded-2xl border border-white/10 bg-panel/60 p-7 transition hover:border-varnish/50" data-aos="fade-up" data-aos-delay="${i * 100}">
            <span class="grid h-12 w-12 place-items-center rounded-full border border-varnish/50 text-varnish">${icon(ic, 'h-5 w-5')}</span>
            <h3 class="mt-6 font-display text-3xl uppercase leading-none">${n}</h3>
            <p class="mt-3 text-sm leading-relaxed text-bone/70">${d}</p>
            <div class="string-rule mt-7"></div>
          </article>`).join('')}
        </div>

        <!-- Ensemble: cartão picotado (componente "ingresso" da referência) -->
        <!-- Informação do ensemble: briefing [6] Schubertiades. A CONFIRMAR: formação, nº de músicos e vídeo do ensemble -->
        <article class="ticket mt-14 grid overflow-hidden rounded-2xl bg-bone text-ink lg:grid-cols-[1fr_320px]" style="--cut:200%" data-ticket data-aos="fade-up">
          <span class="ticket-cut hidden lg:block" aria-hidden="true"></span>
          <div class="grid gap-6 p-6 sm:grid-cols-[180px_1fr] sm:p-8">
            <div class="overflow-hidden rounded-xl"><img src="${c.a('assets/img/photos/violin-detalle.webp')}" width="720" height="720" alt="" class="h-full min-h-[180px] w-full object-cover" loading="lazy"></div>
            <div class="min-w-0">
              <p class="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[.25em] text-ink/60"><span class="rounded-full bg-ink px-3 py-1 text-varnish">${S.ensTag}</span> ${icon('h-users')}</p>
              <h2 class="mt-4 font-display text-4xl uppercase leading-none sm:text-5xl">${S.ensTitle}</h2>
              <p class="mt-4 max-w-xl text-sm leading-relaxed text-ink/75">${S.ensText}</p>
              <dl class="mt-6 grid grid-cols-3 gap-4 border-t border-ink/15 pt-5 font-mono text-[10px] uppercase tracking-widest">
                ${S.ensRows.map(([k, v]) => `<div><dt class="text-ink/55">${k}</dt><dd class="mt-1 text-xs font-bold">${v}</dd></div>`).join('')}
              </dl>
            </div>
          </div>
          <div class="flex flex-col justify-center gap-4 border-t-2 border-dashed border-ink/20 p-6 sm:p-8 lg:border-t-0">
            <p class="font-mono text-[10px] uppercase tracking-[.2em] text-ink/60">${S.ensSide}</p>
            <p class="font-display text-2xl uppercase leading-tight">${S.ensSideTitle}</p>
            <a href="${c.link('contact')}?type=ensemble#consulta" data-track="eventos-ensemble" class="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[.2em] text-bone transition hover:bg-oxblood">${icon('h-users')} ${S.ensBtn}</a>
          </div>
        </article>
      </div>
    </section>

    <!-- Para planners e espaços (briefing: formatos, montagem, contato para alinhar a programação) -->
    <!-- A CONFIRMAR com o David: requisitos técnicos (som, tomada, espaço), duração dos sets e condições de deslocamento -->
    <section class="relative border-t border-white/5 bg-panel/40 py-24 sm:py-28">
      <div class="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div class="group relative overflow-hidden rounded-2xl" data-aos="fade-right">
          <img src="${c.a('assets/img/photos/eventos-hotel.webp')}" width="600" height="800" alt="${es ? 'David Amador tocando el violín en un interior junto a la ventana' : 'David Amador playing violin indoors by a window'}" class="duo aspect-[4/5] w-full object-cover" loading="lazy">
        </div>
        <div data-aos="fade-left">
          <p class="font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${S.planKicker}</p>
          <h2 class="mt-3 font-display text-5xl uppercase leading-[.95]">${S.planTitle}</h2>
          <ul class="mt-7 space-y-3 text-bone/80">${checklist(S.plan)}</ul>
          <p class="mt-6 max-w-md text-sm leading-relaxed text-bone/65">${S.planNote}</p>
          <div class="mt-8">${btn(`${c.link('contact')}?type=corporate#consulta`, t.proposal, { primary: true, ic: 'h-arrow-right', track: 'eventos-plan' })}</div>
        </div>
      </div>
    </section>

    <section class="relative py-24 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: es ? 'Eventos' : 'Events', kicker: S.vidKicker, title: S.vidTitle })}
        <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          ${evVideos.map((v, i) => videoCard(c, v, i)).join('')}
        </div>
      </div>
    </section>
${closingCta(c, { kicker: t.proposal, title: S.cTitle, text: S.cText, primaryLabel: t.proposal, track: 'eventos-cierre' })}`;
  return layout(c, { title: S.title, desc: S.desc, body, schema: { '@context': 'https://schema.org', '@graph': [personLd, serviceLd(c.lang)] } });
}

// ---------- SOBRE DAVID / ABOUT DAVID ----------
function pageAbout(c) {
  const es = c.lang === 'es';
  const t = c.t;
  const S = es ? {
    title: 'Sobre David Amador, violinista en Barcelona | AMADOR • Violinist',
    desc: 'David Amador, violinista con máster en violín por el Conservatori Superior de Música del Liceu. Formación clásica y repertorio de pop, baladas y ritmos latinos.',
    kicker: 'Sobre David', h1: 'Soy David Amador, <span class="signature text-varnish">violinista</span>',
    p1: 'Soy David Amador, violinista. Cursé un máster en violín en el Conservatori Superior de Música del Liceu de Barcelona y he participado en el Festival Internacional de Música de Cartagena y en el Festival de Música de Santa Catarina. En mis actuaciones combino la formación clásica con un repertorio que incluye pop, baladas y ritmos latinos.',
    p2: 'En una boda, hay momentos para escuchar y otros para celebrar. Por eso, al preparar la música, tengo en cuenta tanto las canciones que os gustan como el ritmo de cada parte del día.',
    credKicker: 'Trayectoria',
    creds: [
      ['h-academic', 'Máster en violín', 'Conservatori Superior de Música del Liceu, Barcelona'],
      ['h-note', 'Festival Internacional de Música de Cartagena', 'Participación'],
      ['h-note', 'Festival de Música de Santa Catarina', 'Participación'],
    ],
    stylesKicker: 'Estilos', styles: ['Clásica', 'Pop', 'Baladas', 'Ritmos latinos', 'Cine'],
    galKicker: 'En imágenes', galTitle: 'Con el violín, <span class="signature text-varnish">en cualquier lugar</span>',
    cTitle: '¿Hablamos de <span class="signature text-varnish">vuestra música?</span>', cText: 'Contadme cómo será el día y qué canciones os gustaría escuchar.',
  } : {
    title: 'About David Amador, Violinist in Barcelona | AMADOR • Violinist',
    desc: 'David Amador is a violinist with a master’s degree from the Conservatori Superior de Música del Liceu. Classical training and a repertoire of pop, ballads and Latin music.',
    kicker: 'About David', h1: 'I’m David Amador, <span class="signature text-varnish">a violinist</span>',
    p1: 'I’m David Amador, a violinist. I completed a master’s degree in violin at the Conservatori Superior de Música del Liceu in Barcelona and have taken part in the Cartagena Music Festival and the Santa Catarina Music Festival. My classical training is the foundation for a repertoire that also includes pop, ballads and Latin music.',
    p2: 'At a wedding, some moments call for close listening and others are for celebrating. When I put the music together, I consider the songs you love and how each part of the day will unfold.',
    credKicker: 'Background',
    creds: [
      ['h-academic', 'Master’s degree in violin', 'Conservatori Superior de Música del Liceu, Barcelona'],
      ['h-note', 'Cartagena Music Festival', 'Performer'],
      ['h-note', 'Santa Catarina Music Festival', 'Performer'],
    ],
    stylesKicker: 'Styles', styles: ['Classical', 'Pop', 'Ballads', 'Latin', 'Film'],
    galKicker: 'In pictures', galTitle: 'Violin in hand, <span class="signature text-varnish">wherever you celebrate</span>',
    cTitle: 'Shall we talk <span class="signature text-varnish">about your music?</span>', cText: 'Tell me how you’ve planned the day and what songs you’d like to hear.',
  };
  // Fotos: quadros dos vídeos oficiais. A CONFIRMAR: substituir/acrescentar por fotos profissionais em eventos reais
  const GAL = es
    ? [['about-wide', 'Junto al agua', 1280, 720, 'sm:col-span-2'], ['castillo', 'Ante un castillo', 600, 800, ''], ['jardin', 'Laberint d’Horta, Barcelona', 600, 800, ''], ['mar', 'Junto al mar', 600, 800, ''], ['boda-coctel', 'Muro de flores', 600, 800, ''], ['eventos-wide', 'Sobre Barcelona', 1280, 720, 'sm:col-span-2'], ['boda-ceremonia', 'Con la Sagrada Família al fondo', 600, 800, ''], ['violin-detalle', 'El violín', 720, 720, ''], ['hero-mobile', 'Montjuïc, Barcelona', 540, 960, ''], ['eventos-hotel', 'En interior', 600, 800, '']]
    : [['about-wide', 'By the water', 1280, 720, 'sm:col-span-2'], ['castillo', 'At a castle', 600, 800, ''], ['jardin', 'Laberint d’Horta, Barcelona', 600, 800, ''], ['mar', 'By the sea', 600, 800, ''], ['boda-coctel', 'Flower wall', 600, 800, ''], ['eventos-wide', 'Above Barcelona', 1280, 720, 'sm:col-span-2'], ['boda-ceremonia', 'With the Sagrada Família behind', 600, 800, ''], ['violin-detalle', 'The violin', 720, 720, ''], ['hero-mobile', 'Montjuïc, Barcelona', 540, 960, ''], ['eventos-hotel', 'Indoors', 600, 800, '']];
  const body = `
    <!-- Biografia: briefing (fontes [2, 6]). A DECIDIR com o David: listar ou não as orquestras citadas na bio atual,
         com os nomes institucionais aprovados (briefing, prioridade alta) -->
    <section class="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div class="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <figure class="group relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5">
          <div class="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl border border-varnish/40 sm:block"></div>
          <div class="relative overflow-hidden rounded-2xl"><img src="${c.a('assets/img/photos/about.webp')}" width="880" height="1100" alt="${es ? 'Retrato de David Amador con el violín al aire libre' : 'Portrait of David Amador with his violin outdoors'}" fetchpriority="high" class="aspect-[4/5] w-full object-cover object-[25%_50%]"></div>
          <figcaption class="absolute -bottom-5 -left-2 -rotate-3 rounded-md bg-varnish px-4 py-2 shadow-xl sm:-left-6">
            <span class="block font-mono text-[9px] font-bold uppercase tracking-[.3em] text-ink">AMADOR • Violinist</span>
            <span class="block font-display text-2xl leading-none text-ink">David Amador</span>
          </figcaption>
        </figure>
        <div class="lg:col-span-7">
          <p class="font-mono text-[11px] uppercase tracking-mega text-varnish">${S.kicker}</p>
          <h1 class="mt-4 font-display text-5xl uppercase leading-[.92] sm:text-7xl">${S.h1}</h1>
          <div class="mt-8 space-y-5 text-lg leading-relaxed text-bone/80">
            <p>${S.p1}</p>
            <p class="font-serif text-2xl italic leading-snug text-bone sm:text-3xl">${S.p2}</p>
          </div>
          <p class="mt-12 font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${S.credKicker}</p>
          <ul class="mt-5 divide-y divide-white/10 border-y border-white/10">
            ${S.creds.map(([ic, n, d]) => `<li class="flex items-start gap-4 py-5"><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-varnish/50 text-varnish">${icon(ic, 'h-5 w-5')}</span><span><span class="block font-display text-2xl uppercase leading-tight">${n}</span><span class="mt-1 block text-sm text-bone/60">${d}</span></span></li>`).join('')}
          </ul>
          <p class="mt-10 font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${S.stylesKicker}</p>
          <ul class="mt-4 flex flex-wrap gap-2">${S.styles.map((x) => `<li class="rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[.2em] text-bone/80">${x}</li>`).join('')}</ul>
          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            ${btn(`${c.link('contact')}#consulta`, t.checkAvailability, { primary: true, ic: 'h-calendar', track: 'about-consulta' })}
            ${btn(c.link('videos'), t.watch, { ic: 'h-play', track: 'about-videos' })}
          </div>
        </div>
      </div>
    </section>
${marquee(c)}

    <!-- Galeria (lightbox no main.js) -->
    <section class="relative py-20 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: es ? 'Galería' : 'Gallery', kicker: S.galKicker, title: S.galTitle })}
        <div id="galleryGrid" class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          ${GAL.map(([img, cap, w, h, span], i) => `
          <button type="button" data-lb-src="${c.a(`assets/img/photos/${img}.webp`)}" data-lb-cap="${esc(cap)}" class="group relative aspect-[3/4] overflow-hidden rounded-xl ${span ? `${span} sm:aspect-auto` : ''}" data-aos="fade-up" data-aos-delay="${(i % 4) * 60}" aria-label="${esc(cap)}">
            <img src="${c.a(`assets/img/photos/${img}.webp`)}" width="${w}" height="${h}" alt="${esc(`David Amador — ${cap}`)}" class="duo h-full w-full object-cover" loading="lazy" decoding="async">
            <span class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition group-hover:opacity-100"></span>
            <span class="absolute bottom-3 left-3 translate-y-2 font-mono text-[10px] uppercase tracking-[.2em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">${esc(cap)}</span>
          </button>`).join('')}
        </div>
      </div>
    </section>
${testimonials(c, [TESTIMONIALS[1]])}
${closingCta(c, { kicker: t.checkAvailability, title: S.cTitle, text: S.cText, primaryLabel: t.checkAvailability, track: 'about-cierre' })}`;
  return layout(c, { title: S.title, desc: S.desc, body, schema: { '@context': 'https://schema.org', '@graph': [{ ...personLd, description: S.p1 }] } });
}

// ---------- VÍDEOS Y REPERTORIO / VIDEOS & REPERTOIRE ----------
function pageVideos(c) {
  const es = c.lang === 'es';
  const t = c.t;
  const S = es ? {
    title: 'Vídeos y repertorio de violín en directo | AMADOR • Violinist',
    desc: 'Escucha a David Amador: piezas clásicas, canciones románticas, temas de cine y música para el cóctel. Propón una canción para tu boda o evento.',
    kicker: 'Vídeos y repertorio', h1: 'Escucha el violín <span class="signature text-varnish">en directo</span>',
    intro: 'Explora actuaciones y repertorio para distintos momentos del evento. Encontrarás piezas clásicas, canciones románticas, temas de cine y música para el cóctel. Si tenéis una canción en mente, podéis enviármela al consultar vuestra fecha.',
    all: 'Todo', filterLabel: 'Filtrar por estilo',
    repKicker: 'Repertorio', repTitle: 'Toca un título <span class="signature text-varnish">para escucharlo</span>',
    repIntro: 'Una muestra de las piezas que he grabado. El repertorio para cada evento se prepara con vosotros.',
    count: (n) => `${n} vídeos`,
  } : {
    title: 'Live Violin Videos and Repertoire | AMADOR • Violinist',
    desc: 'Watch David Amador perform classical pieces, romantic songs, film themes and drinks reception music. Suggest a song for your wedding or event.',
    kicker: 'Videos & repertoire', h1: 'Hear the violin <span class="signature text-varnish">live</span>',
    intro: 'Explore performances and music for different parts of your event. You’ll find classical pieces, romantic songs, film themes and music for your drinks reception. If you have a particular song in mind, send it when you enquire about your date.',
    all: 'All', filterLabel: 'Filter by style',
    repKicker: 'Repertoire', repTitle: 'Tap a title <span class="signature text-varnish">to listen</span>',
    repIntro: 'A sample of the pieces I’ve recorded. The repertoire for each event is prepared with you.',
    count: (n) => `${n} videos`,
  };
  const [feat] = VIDEOS;
  const grid = VIDEOS.slice(1);
  const chips = `
        <div class="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="${S.filterLabel}" data-filters>
          <button type="button" data-filter="all" aria-pressed="true" class="chip rounded-full border border-white/15 px-5 py-2 font-mono text-[11px] uppercase tracking-[.2em] transition hover:border-varnish">${S.all}</button>
          ${Object.entries(CATS).map(([k, v]) => `<button type="button" data-filter="${k}" aria-pressed="false" class="chip rounded-full border border-white/15 px-5 py-2 font-mono text-[11px] uppercase tracking-[.2em] transition hover:border-varnish">${v[c.lang]}</button>`).join('\n          ')}
        </div>`;
  const body = `
    <section class="relative pb-10 pt-32 sm:pt-40">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header class="relative mb-12 text-center">
          <span class="ghost pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[18vw] uppercase sm:text-[140px]" aria-hidden="true">${es ? 'Vídeos' : 'Videos'}</span>
          <p class="relative font-mono text-[11px] uppercase tracking-mega text-varnish">${S.kicker}</p>
          <h1 class="relative mt-3 font-display text-5xl uppercase leading-[.95] sm:text-7xl">${S.h1}</h1>
          <p class="relative mx-auto mt-6 max-w-2xl leading-relaxed text-bone/75">${S.intro}</p>
          <div class="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            ${btn(`${c.link('contact')}?song=1#consulta`, t.suggestSong, { primary: true, ic: 'h-note', track: 'videos-cancion' })}
            ${btn(CONTACT.youtube, 'YouTube', { ic: 'b-youtube', ext: true, track: 'videos-youtube-top' })}
          </div>
        </header>
        ${videoFeatured(c, feat).replace(' data-aos="fade-up"', '')}
      </div>
    </section>

    <section class="relative py-16" aria-label="${es ? 'Vídeos' : 'Videos'}">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${chips}
        <p class="mb-6 text-center font-mono text-[10px] uppercase tracking-[.3em] text-bone/50" data-count aria-live="polite">${S.count(grid.length)}</p>
        <div id="videoGrid" class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          ${grid.map((v, i) => videoCard(c, v, i)).join('')}
        </div>
      </div>
    </section>

    <!-- Repertório no estilo "lista que acende" da referência — mesmos dados dos vídeos -->
    <section id="repertorio" class="relative border-t border-white/5 bg-panel/40 py-24 sm:py-28">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: S.repKicker, kicker: S.repKicker, title: S.repTitle, intro: S.repIntro })}
        <ul id="repList" class="border-t border-white/10">
          ${VIDEOS.map((v, i) => `
          <li data-cats="${v.cats.join(' ')}">
            <button type="button" data-video="${v.id}" data-title="${esc(v.t)}" data-sub="${esc(v.a)}"${v.vertical ? ' data-vertical' : ''} aria-label="${esc(`${t.play}: ${v.t} — ${v.a}`)}" class="group relative grid w-full items-center gap-2 border-b border-white/10 py-6 text-left transition hover:bg-white/[.02] sm:grid-cols-12 sm:gap-4 sm:py-7">
              <span class="font-mono text-[11px] uppercase tracking-[.2em] text-bone/50 sm:col-span-2">${pad(i + 1)} · ${esc(CATS[v.cats[0]][c.lang])}</span>
              <span class="stage-fill font-display text-4xl uppercase leading-none transition-transform duration-300 group-hover:translate-x-2 sm:col-span-6 lg:text-6xl">${esc(v.t)}</span>
              <span class="text-sm leading-relaxed text-bone/65 sm:col-span-3">${icon('h-note', 'mr-1.5 inline h-4 w-4 align-[-3px] text-varnish')}${esc(v.a)}</span>
              <span class="hidden items-center justify-end text-bone/40 transition group-hover:text-varnish sm:col-span-1 sm:flex">${icon('h-play', 'h-6 w-6')}</span>
            </button>
          </li>`).join('')}
        </ul>
      </div>
    </section>
${closingCta(c, { kicker: t.suggestSong, title: es ? '¿Tenéis una <span class="signature text-varnish">canción en mente?</span>' : 'Have a song <span class="signature text-varnish">in mind?</span>', text: es ? 'Enviádmela al consultar vuestra fecha: indicad el título y la versión.' : 'Send it when you enquire about your date, with the title and the version you love.', primaryLabel: t.checkAvailability, track: 'videos-cierre' })}`;
  return layout(c, { title: S.title, desc: S.desc, body, schema: { '@context': 'https://schema.org', '@graph': [personLd] } });
}

// ---------- CONTACTO / CONTACT ----------
function pageContact(c) {
  const es = c.lang === 'es';
  const t = c.t;
  const S = es ? {
    title: 'Contacto y disponibilidad | AMADOR • Violinist',
    desc: 'Consulta disponibilidad de violín en directo para tu boda o evento en Barcelona, Madrid y otros destinos de España. Envía fecha, ciudad y tipo de evento.',
    kicker: 'Contacto', h1: 'Consulta disponibilidad <span class="signature text-varnish">para tu evento</span>',
    intro: 'Envíame la fecha, la ciudad y el tipo de evento. Si ya sabes en qué momentos quieres música en directo, incluye ese detalle para que podamos hablar de la propuesta.',
    formTitle: 'Enviar consulta', req: 'Campos obligatorios',
    f: { name: 'Nombre', email: 'Correo electrónico', date: 'Fecha del evento', tbc: 'Por confirmar', city: 'Ciudad y lugar', cityPh: 'Ciudad', venuePh: 'Espacio (opcional)', type: 'Tipo de evento', choose: 'Selecciona…', types: [['wedding', 'Boda'], ['hotel', 'Hotel'], ['corporate', 'Empresa'], ['other', 'Otro']], msg: 'Cuéntame sobre tu evento', msgPh: 'Horarios, momentos con música (ceremonia, cóctel, banquete), canciones especiales…', send: 'Enviar consulta', sending: 'Enviando…' },
    notice: (c2) => `Consulta cómo se tratan tus datos en la <a href="${c2.link('privacy')}" class="text-varnish underline">Política de privacidad</a>.`,
    channels: 'Contacto directo', waSub: 'Respuesta rápida', emailSub: 'Reservas', igSub: 'Instagram', areaSub: 'Zona de actuación',
    faqKicker: 'Preguntas frecuentes', faqTitle: 'Antes de <span class="signature text-varnish">escribirme</span>',
    faq: [
      ['¿En qué ciudades actúas?', 'Actúo en Barcelona, Madrid y otros destinos de España. Para consultar un desplazamiento internacional, incluye el país y la ciudad en tu mensaje.'],
      ['¿Puedo pedir una canción?', 'Sí, puedes proponerla. Indícame el título y la versión, y revisaremos si se puede preparar para tu fecha.'],
      ['¿Puedo contratar música para varios momentos?', 'Sí, puedes consultar una combinación de ceremonia, cóctel y recepción. Cuéntame cómo está organizado el día.'],
      ['¿Cómo solicito un presupuesto?', 'Envíame la fecha, la ciudad, el espacio si ya lo has elegido y los momentos que quieres acompañar con música.'],
    ],
  } : {
    title: 'Contact and Availability | AMADOR • Violinist',
    desc: 'Check availability for live violin at your wedding or event in Barcelona, Madrid and across Spain. Send your date, city and event type.',
    kicker: 'Contact', h1: 'Check availability <span class="signature text-varnish">for your event</span>',
    intro: 'Send me your date, city and event type. If you already know which parts of the event you’d like to have live music for, include them so we can discuss a proposal.',
    formTitle: 'Send enquiry', req: 'Required fields',
    f: { name: 'Name', email: 'Email address', date: 'Event date', tbc: 'To be confirmed', city: 'City and venue', cityPh: 'City', venuePh: 'Venue (optional)', type: 'Event type', choose: 'Choose…', types: [['wedding', 'Wedding'], ['hotel', 'Hotel'], ['corporate', 'Corporate'], ['other', 'Other']], msg: 'Tell me about your event', msgPh: 'Timings, parts of the event with music (ceremony, drinks, reception), special songs…', send: 'Send enquiry', sending: 'Sending…' },
    notice: (c2) => `Read the <a href="${c2.link('privacy')}" class="text-varnish underline">Privacy Policy</a> to see how your information is handled.`,
    channels: 'Direct contact', waSub: 'Quick reply', emailSub: 'Bookings', igSub: 'Instagram', areaSub: 'Where I perform',
    faqKicker: 'Frequently asked questions', faqTitle: 'Before you <span class="signature text-varnish">get in touch</span>',
    faq: [
      ['Where do you perform?', 'I play in Barcelona, Madrid and other destinations across Spain. For international enquiries, include the country and city in your message.'],
      ['Can I request a song?', 'Yes, you can suggest one. Send me the title and version, and we’ll check whether it can be prepared for your date.'],
      ['Can I book music for more than one part of the event?', 'Yes, you can enquire about combining the ceremony, drinks and evening reception. Tell me how your day is planned.'],
      ['How do I request a quote?', 'Send me your date, city, venue if you have one, and the parts of the event you’d like to accompany with music.'],
    ],
  };
  const f = S.f;
  const lbl = 'mb-1.5 block font-mono text-[10px] uppercase tracking-[.2em] text-bone/70';
  const channel = (href, ic, sub, main, track, ext = true) => `
            <a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''} data-track="${track}" class="group flex items-center gap-4 rounded-xl border border-white/10 bg-panel/60 p-4 transition hover:border-varnish/60">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-varnish/10 text-varnish">${icon(ic, 'h-5 w-5')}</span>
              <span class="min-w-0 flex-1"><span class="block font-mono text-[9px] uppercase tracking-[.3em] text-bone/55">${sub}</span><span class="block truncate font-semibold">${main}</span></span>
              ${icon('h-arrow-up-right', 'h-4 w-4 text-bone/30 transition group-hover:text-varnish')}
            </a>`;
  const body = `
    <section id="consulta" class="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <img src="${c.a('assets/img/photos/contacto.webp')}" width="1280" height="720" alt="" class="absolute inset-x-0 top-0 h-[520px] w-full object-cover opacity-20" aria-hidden="true">
      <div class="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-ink/40 to-ink"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header class="mb-12 max-w-3xl">
          <p class="font-mono text-[11px] uppercase tracking-mega text-varnish">${S.kicker}</p>
          <h1 class="mt-3 font-display text-5xl uppercase leading-[.92] sm:text-7xl">${S.h1}</h1>
          <p class="mt-6 max-w-2xl leading-relaxed text-bone/75">${S.intro}</p>
        </header>

        <div class="grid gap-6 lg:grid-cols-5">
          <!-- Formulário (briefing: campos, regras e respostas). Envio: api/enquiry.php (validação no servidor + e-mail de reservas).
               A confirmação só aparece depois do aceite do servidor; em caso de erro os dados continuam preenchidos -->
          <form id="enquiryForm" action="${c.a('api/enquiry.php')}" method="post" class="rounded-2xl border border-white/10 bg-panel/80 p-6 backdrop-blur sm:p-8 lg:order-2 lg:col-span-3 lg:self-start" novalidate>
            <input type="hidden" name="lang" value="${c.lang}">
            <input type="hidden" name="page" value="${c.path}">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <h2 class="font-display text-3xl uppercase">${S.formTitle}</h2>
              <p class="font-mono text-[10px] uppercase tracking-[.2em] text-bone/55">* ${S.req}</p>
            </div>
            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div><label for="f-name" class="${lbl}">${f.name} *</label><input id="f-name" name="name" required autocomplete="name" maxlength="120" class="field" aria-describedby="e-name"><p id="e-name" class="field-error mt-1 hidden text-xs"></p></div>
              <div><label for="f-email" class="${lbl}">${f.email} *</label><input id="f-email" name="email" type="email" required autocomplete="email" maxlength="160" class="field" aria-describedby="e-email"><p id="e-email" class="field-error mt-1 hidden text-xs"></p></div>
              <div>
                <label for="f-date" class="${lbl}">${f.date} *</label>
                <input id="f-date" name="date" type="date" required class="field" aria-describedby="e-date">
                <label class="mt-2 flex cursor-pointer items-center gap-2 text-sm text-bone/75"><input type="checkbox" name="date_tbc" value="1" id="f-tbc" class="h-4 w-4 accent-[#d4894a]"> ${f.tbc}</label>
                <p id="e-date" class="field-error mt-1 hidden text-xs"></p>
              </div>
              <div>
                <label for="f-type" class="${lbl}">${f.type} *</label>
                <select id="f-type" name="type" required class="field" aria-describedby="e-type"><option value="">${f.choose}</option>${f.types.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>
                <p id="e-type" class="field-error mt-1 hidden text-xs"></p>
              </div>
              <fieldset class="sm:col-span-2">
                <legend class="${lbl}">${f.city} *</legend>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div><label for="f-city" class="sr-only">${f.cityPh}</label><input id="f-city" name="city" required autocomplete="address-level2" maxlength="120" placeholder="${f.cityPh} *" class="field" aria-describedby="e-city"><p id="e-city" class="field-error mt-1 hidden text-xs"></p></div>
                  <div><label for="f-venue" class="sr-only">${f.venuePh}</label><input id="f-venue" name="venue" maxlength="160" placeholder="${f.venuePh}" class="field"></div>
                </div>
              </fieldset>
              <div class="sm:col-span-2"><label for="f-msg" class="${lbl}">${f.msg}</label><textarea id="f-msg" name="message" rows="5" maxlength="3000" class="field resize-y" placeholder="${f.msgPh}"></textarea></div>
              <div class="hp" aria-hidden="true"><label for="f-web">Web</label><input id="f-web" name="website" tabindex="-1" autocomplete="off"></div>
            </div>
            <div id="formStatus" class="mt-5 hidden rounded-xl border p-4 text-sm leading-relaxed" role="status" aria-live="polite" tabindex="-1"></div>
            <button type="submit" class="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-varnish px-6 py-4 text-xs font-semibold uppercase tracking-[.2em] text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-70" data-label="${f.send}" data-sending="${f.sending}">${icon('h-arrow-right')} <span>${f.send}</span></button>
            <p class="mt-4 text-center text-xs leading-relaxed text-bone/60">${S.notice(c)}</p>
          </form>

          <div class="space-y-3 lg:order-1 lg:col-span-2">
            <p class="font-mono text-[11px] uppercase tracking-[.3em] text-varnish">${S.channels}</p>
            ${channel(waUrl(t.wa), 'b-whatsapp', `WhatsApp · ${S.waSub}`, CONTACT.phone, 'contacto-whatsapp')}
            ${channel(`mailto:${CONTACT.email}`, 'h-envelope', `Email · ${S.emailSub}`, CONTACT.email, 'contacto-email', false)}
            ${channel(CONTACT.instagram, 'b-instagram', S.igSub, CONTACT.instagramHandle, 'contacto-instagram')}
            <div class="flex items-center gap-4 rounded-xl border border-white/10 bg-panel/60 p-4">
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-varnish/10 text-varnish">${icon('h-map-pin', 'h-5 w-5')}</span>
              <span class="min-w-0 flex-1"><span class="block font-mono text-[9px] uppercase tracking-[.3em] text-bone/55">${S.areaSub}</span><span class="block font-semibold">${t.cities}</span></span>
            </div>
            <figure class="group relative mt-3 hidden overflow-hidden rounded-2xl lg:block">
              <img src="${c.a('assets/img/photos/hero-mobile.webp')}" width="540" height="960" alt="${es ? 'David Amador tocando en Montjuïc, Barcelona' : 'David Amador playing at Montjuïc, Barcelona'}" class="duo aspect-[4/5] w-full object-cover" loading="lazy">
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FAQ (briefing: reunir o FAQ no lançamento) ==================== -->
    <section id="faq" class="relative border-t border-white/5 bg-panel/40 py-24 sm:py-28">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        ${sectionHead({ ghost: 'FAQ', kicker: S.faqKicker, title: S.faqTitle })}
        <div class="divide-y divide-white/10 border-y border-white/10" data-aos="fade-up">
          ${S.faq.map(([q, a]) => `
          <details class="faq">
            <summary class="flex items-center justify-between gap-6 py-6 text-left"><span class="font-display text-2xl uppercase leading-tight">${q}</span>${icon('h-plus', 'faq-icon h-5 w-5 shrink-0 text-varnish')}</summary>
            <p class="pb-6 pr-10 leading-relaxed text-bone/75">${a}</p>
          </details>`).join('')}
        </div>
      </div>
    </section>`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ContactPage', '@id': `${SITE + c.path}#page`, url: SITE + c.path, name: S.title, about: { '@id': `${SITE}#david` } },
      personLd,
      { '@type': 'FAQPage', '@id': `${SITE + c.path}#faq`, inLanguage: c.lang, mainEntity: S.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  return layout(c, { title: S.title, desc: S.desc, body, schema });
}

// ---------- PRIVACIDAD / PRIVACY ----------
// A VALIDAR com o responsável (briefing, prioridade alta): titular, NIF/endereço, provedor de hospedagem e de e-mail.
function pagePrivacy(c) {
  const es = c.lang === 'es';
  const S = es ? {
    title: 'Política de privacidad | AMADOR • Violinist',
    desc: 'Cómo se tratan los datos que envías a través del formulario de consulta de AMADOR • Violinist.',
    h1: 'Política de privacidad', updated: 'Última actualización: noviembre de 2026',
    blocks: [
      ['Responsable', `David Amador (AMADOR • Violinist). Contacto: <a href="mailto:${CONTACT.email}" class="text-varnish underline">${CONTACT.email}</a> · ${CONTACT.phone}.`],
      ['Qué datos tratamos', 'Los que nos envías en el formulario de consulta: nombre, correo electrónico, fecha del evento (o «por confirmar»), ciudad y espacio, tipo de evento y el mensaje que escribas. Si escribes por WhatsApp o correo electrónico, los datos que incluyas en esa conversación.'],
      ['Finalidad', 'Responder a tu consulta, comprobar la disponibilidad y preparar una propuesta para tu evento. No usamos tus datos para enviarte publicidad ni elaboramos perfiles.'],
      ['Base legal', 'La aplicación de medidas precontractuales a petición tuya (art. 6.1.b del RGPD) y tu consentimiento al enviar la consulta (art. 6.1.a del RGPD).'],
      ['Conservación', 'Mientras se gestiona tu consulta y, si se contrata el servicio, durante la relación y los plazos legales aplicables. Si no hay contratación, se eliminan en un plazo máximo de 12 meses.'],
      ['Destinatarios', 'No se ceden datos a terceros salvo obligación legal. El formulario se envía por correo electrónico a través del proveedor de alojamiento de la web, que actúa como encargado del tratamiento.'],
      ['Vídeos de YouTube', 'Los vídeos se muestran con el modo de privacidad mejorada de YouTube (youtube-nocookie.com) y solo se cargan cuando pulsas para reproducirlos. A partir de ese momento, Google puede usar sus propias cookies. Puedes cambiar tu elección en «Preferencias de privacidad», al pie de cada página.'],
      ['Cookies y almacenamiento', 'Esta web no instala cookies propias ni de análisis. Solo guarda en tu navegador (localStorage) tu elección sobre los vídeos, para no volver a preguntarte.'],
      ['Tus derechos', `Puedes solicitar el acceso, la rectificación, la supresión, la oposición, la limitación y la portabilidad de tus datos escribiendo a <a href="mailto:${CONTACT.email}" class="text-varnish underline">${CONTACT.email}</a>. Si consideras que no se han atendido tus derechos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener" class="text-varnish underline">aepd.es</a>).`],
    ],
  } : {
    title: 'Privacy Policy | AMADOR • Violinist',
    desc: 'How the information you send through the AMADOR • Violinist enquiry form is handled.',
    h1: 'Privacy Policy', updated: 'Last updated: November 2026',
    blocks: [
      ['Controller', `David Amador (AMADOR • Violinist). Contact: <a href="mailto:${CONTACT.email}" class="text-varnish underline">${CONTACT.email}</a> · ${CONTACT.phone}.`],
      ['What we collect', 'The details you send through the enquiry form: name, email address, event date (or “to be confirmed”), city and venue, event type and your message. If you write via WhatsApp or email, the details you include in that conversation.'],
      ['Purpose', 'To reply to your enquiry, check availability and prepare a proposal for your event. Your details are not used for advertising or profiling.'],
      ['Legal basis', 'Steps taken at your request prior to entering into a contract (Art. 6(1)(b) GDPR) and your consent when you send the enquiry (Art. 6(1)(a) GDPR).'],
      ['Retention', 'While your enquiry is handled and, if you book, for the duration of the relationship and the applicable legal periods. If you don’t book, details are deleted within 12 months at the latest.'],
      ['Recipients', 'Your details are not shared with third parties unless required by law. The form is sent by email through the website’s hosting provider, acting as a data processor.'],
      ['YouTube videos', 'Videos use YouTube’s privacy-enhanced mode (youtube-nocookie.com) and only load when you choose to play them. From that point, Google may use its own cookies. You can change your choice under “Privacy preferences” at the bottom of every page.'],
      ['Cookies and storage', 'This website doesn’t set its own or analytics cookies. It only stores your video choice in your browser (localStorage) so it doesn’t ask again.'],
      ['Your rights', `You can request access, rectification, erasure, objection, restriction and portability of your data by writing to <a href="mailto:${CONTACT.email}" class="text-varnish underline">${CONTACT.email}</a>. If you believe your rights haven’t been respected, you can lodge a complaint with the Spanish Data Protection Agency (<a href="https://www.aepd.es" target="_blank" rel="noopener" class="text-varnish underline">aepd.es</a>).`],
    ],
  };
  const body = `
    <section class="relative pb-24 pt-32 sm:pt-40">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p class="font-mono text-[11px] uppercase tracking-mega text-varnish">AMADOR • Violinist</p>
        <h1 class="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">${S.h1}</h1>
        <p class="mt-4 font-mono text-[10px] uppercase tracking-[.2em] text-bone/55">${S.updated}</p>
        <div class="mt-12 divide-y divide-white/10 border-y border-white/10">
          ${S.blocks.map(([h, p], i) => `
          <div class="grid gap-3 py-7 sm:grid-cols-[220px_1fr]">
            <h2 class="font-display text-xl uppercase leading-tight"><span class="mr-2 font-mono text-[10px] text-varnish">${pad(i + 1)}</span>${h}</h2>
            <p class="leading-relaxed text-bone/75">${p}</p>
          </div>`).join('')}
        </div>
        <button type="button" data-consent-open class="mt-10 rounded-full border border-white/20 px-6 py-3 text-[11px] font-semibold uppercase tracking-[.2em] transition hover:border-varnish hover:text-varnish">${c.t.privacyPrefs}</button>
      </div>
    </section>`;
  return layout(c, { title: S.title, desc: S.desc, body });
}

// ---------- RAIZ (x-default: escolhe o idioma) ----------
function rootPage() {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <script>if (!/\\/$|\\.html$/.test(location.pathname)) location.replace(location.pathname + '/' + location.search + location.hash);</script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AMADOR • Violinist — Violinista en Barcelona / Violinist in Barcelona</title>
  <meta name="description" content="David Amador, violinista para bodas y eventos en Barcelona, Madrid y otros destinos de España. Wedding and event violinist in Spain.">
  <link rel="canonical" href="${SITE}es/">
  <link rel="alternate" hreflang="es" href="${SITE}es/">
  <link rel="alternate" hreflang="en" href="${SITE}en/">
  <link rel="alternate" hreflang="x-default" href="${SITE}">
  <meta name="theme-color" content="#0e0b0a">
  <link rel="icon" href="favicon.ico" sizes="48x48">
  <link rel="stylesheet" href="assets/css/style.css?v=${VERSION}">
  <!-- Idioma do navegador: espanhol (e catalão, galego, basco) → /es/, os demais → /en/. Escolha manual fica salva -->
  <script>
    (function () {
      var pick; try { pick = localStorage.getItem('amador-lang'); } catch (e) {}
      if (!pick) { var l = (navigator.language || 'es').toLowerCase(); pick = /^(es|ca|gl|eu)/.test(l) ? 'es' : 'en'; }
      location.replace(pick + '/');
    })();
  </script>
</head>
<body class="grain grid min-h-screen place-items-center bg-ink px-6 text-center font-sans text-bone">
  <main>
    <p class="font-display text-6xl uppercase wordmark">Amador <span class="text-varnish">•</span></p>
    <p class="signature text-3xl text-bone/80">Violinist</p>
    <div class="mt-10 flex flex-col gap-3 sm:flex-row">
      <a href="es/" hreflang="es" lang="es" class="rounded-full bg-varnish px-7 py-3.5 text-xs font-semibold uppercase tracking-[.2em] text-ink">Español</a>
      <a href="en/" hreflang="en" lang="en" class="rounded-full border border-white/20 px-7 py-3.5 text-xs font-semibold uppercase tracking-[.2em]">English</a>
    </div>
  </main>
</body>
</html>
`;
}

// ---------- GERAÇÃO ----------
const PAGES = { home: pageHome, weddings: pageWeddings, events: pageEvents, about: pageAbout, videos: pageVideos, contact: pageContact, privacy: pagePrivacy };

function ctxFor(key, lang) {
  const p = ROUTES[key][lang];
  const up = '../'.repeat(depth(p));
  return {
    key, lang, path: p, t: L[lang],
    a: (asset) => up + asset,
    link: (k) => up + ROUTES[k][lang],
    alt: up + ROUTES[key][L[lang].other],
  };
}

let count = 0;
for (const [key, fn] of Object.entries(PAGES)) {
  for (const lang of ['es', 'en']) {
    const c = ctxFor(key, lang);
    const file = path.join(OUT, c.path, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, fn(c));
    count++;
  }
}
fs.writeFileSync(path.join(OUT, 'index.html'), rootPage());

// Sitemap com alternâncias hreflang (briefing R07)
const today = new Date().toISOString().slice(0, 10);
const urls = Object.keys(ROUTES).flatMap((k) => ['es', 'en'].map((lang) => `  <url>
    <loc>${SITE}${ROUTES[k][lang]}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${ROUTES[k].es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${ROUTES[k].en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${ROUTES[k].es}"/>
    <priority>${k === 'home' ? '1.0' : k === 'privacy' ? '0.2' : '0.8'}</priority>
  </url>`)).join('\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);
const sitePath = new URL(SITE).pathname;
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: ${sitePath}api/

Sitemap: ${SITE}sitemap.xml
`);
console.log(`Páginas: ${count} (ES/EN) + raiz, sitemap.xml e robots.txt`);
