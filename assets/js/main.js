/* Wscodev — interações (JavaScript puro + GSAP/Lenis quando disponíveis) */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  // memória da aba (pode estar bloqueada em janelas privadas)
  const store = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del: (k) => { try { sessionStorage.removeItem(k); } catch (e) {} },
  };

  /* ---------- WhatsApp: um número só, mensagem pronta em cada botão ---------- */
  const WA_NUMBER = (document.body.dataset.whatsapp || '').replace(/\D/g, '');
  const waUrl = (text) => `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  $$('[data-wa]').forEach((a) => { a.href = waUrl(a.dataset.wa); });

  /* ---------- rolagem suave ---------- */
  let lenis = null;
  if (hasGsap && window.Lenis && !reduced) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id === '#' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    scrollToTarget(target);
    try { history.replaceState(null, '', id); } catch (err) {}
  });

  /* ---------- cortina entre páginas ---------- */
  const curtain = $('.curtain span');
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin || url.pathname === location.pathname || !/\.html$|\/$/.test(url.pathname)) return;
    e.preventDefault();
    store.set('ws-curtain', '1');
    if (!hasGsap || reduced || !curtain) { location.href = url.href; return; }
    gsap.fromTo(curtain, { yPercent: 100, y: 0 }, { yPercent: 0, y: 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => { location.href = url.href; } });
  });
  const cameFromNav = store.get('ws-curtain') === '1';
  store.del('ws-curtain');
  if (cameFromNav && hasGsap && curtain) {
    gsap.fromTo(curtain, { yPercent: 0, y: 0 }, { yPercent: -100, y: 0, duration: 0.7, ease: 'expo.inOut', delay: 0.05, onComplete: () => root.classList.remove('from-nav') });
  } else root.classList.remove('from-nav');
  addEventListener('pageshow', (e) => {
    if (e.persisted && curtain) { if (hasGsap) gsap.set(curtain, { yPercent: 100, y: 0 }); root.classList.remove('from-nav'); }
  });

  /* ---------- cabeçalho: cor conforme a seção por baixo ---------- */
  const header = $('.site-header');
  const toned = $$('[data-tone]').filter((el) => el !== header);
  const dock = $('.wa-dock');
  const hero = $('.hero, .cs-hero');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('is-solid', y > 10);
    const probe = header.offsetHeight / 2;
    const under = toned.find((el) => { const r = el.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; });
    if (under) header.dataset.tone = under.dataset.tone;
    const menuOpen = document.body.classList.contains('menu-open');
    if (!menuOpen && y > lastY + 4 && y > 400) header.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 400) header.classList.remove('is-hidden');
    lastY = y;
    if (dock && hero) dock.classList.toggle('is-on', hero.getBoundingClientRect().bottom < 80);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // item do menu da seção atual
  const navLinks = $$('.main-nav a');
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => (a.getAttribute('href') === `#${e.target.id}` ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => sectionIO.observe(s));

  /* ---------- menu (celular e tablet) ---------- */
  const menuBtn = $('.menu-btn');
  const menu = $('#menu');
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
    if (open) {
      lenis?.stop();
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      header.classList.remove('is-hidden');
    } else {
      lenis?.start();
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 350);
    }
  }
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  menu && $$('a', menu).forEach((a) => a.addEventListener('click', () => { if (!a.hash) setMenu(false); }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });

  /* ---------- faixa de serviços em movimento ---------- */
  const tickerRow = $('.ticker__row');
  if (tickerRow) {
    tickerRow.insertAdjacentHTML('beforeend', tickerRow.innerHTML.replace(/<li/g, '<li aria-hidden="true"'));
    if (!reduced) {
      let x = 0, last = performance.now();
      const step = (now) => {
        const dt = Math.min(now - last, 50); last = now;
        const v = lenis ? Math.min(Math.abs(lenis.velocity) * 0.04, 1.5) : 0;
        x -= (0.035 + v * 0.06) * dt;
        const half = tickerRow.scrollWidth / 2;
        if (-x >= half) x += half;
        tickerRow.style.transform = `translate3d(${x}px,0,0)`;
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }

  /* ---------- "Como podemos ajudar?": setas do carrossel ---------- */
  const track = $('#help-track');
  if (track) {
    const btns = $$('[data-scroll]');
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      btns.forEach((b) => { b.disabled = b.dataset.scroll === '-1' ? track.scrollLeft <= 2 : track.scrollLeft >= max; });
    };
    btns.forEach((b) => b.addEventListener('click', () => {
      const card = track.querySelector('li');
      track.scrollBy({ left: (card ? card.offsetWidth + 16 : 300) * Number(b.dataset.scroll), behavior: reduced ? 'auto' : 'smooth' });
    }));
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  /* ---------- serviços: filtros ---------- */
  const filters = $$('.filter');
  // a grade fica sempre com a altura da maior área, para a página não "pular" ao trocar de opção
  const serviceGrid = $('.service-grid');
  const lockGridHeight = () => {
    if (!serviceGrid || !filters.length) return;
    const cards = $$('.service', serviceGrid);
    const shown = cards.map((s) => s.hidden);
    serviceGrid.style.minHeight = '';
    let max = 0;
    filters.forEach((f) => {
      cards.forEach((s) => { s.hidden = s.dataset.cat !== f.dataset.filter; });
      max = Math.max(max, serviceGrid.offsetHeight);
    });
    cards.forEach((s, i) => { s.hidden = shown[i]; });
    serviceGrid.style.minHeight = `${max}px`;
  };
  lockGridHeight();
  let gridTimer;
  addEventListener('resize', () => { clearTimeout(gridTimer); gridTimer = setTimeout(lockGridHeight, 150); });
  document.fonts?.ready.then(lockGridHeight);
  filters.forEach((f) => f.addEventListener('click', () => {
    const cat = f.dataset.filter;
    filters.forEach((x) => { const on = x === f; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
    $$('.service').forEach((s) => {
      const show = cat === 'todos' || s.dataset.cat === cat;
      s.hidden = !show;
      s.classList.remove('is-shown');
      if (show) { void s.offsetWidth; s.classList.add('is-shown'); }
    });
  }));

  /* ---------- projetos: abas ---------- */
  const tabs = $$('.works__tab');
  const selectTab = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) { panel.hidden = !on; panel.classList.toggle('is-on', on); }
    });
    if (focus) tab.focus();
    if (matchMedia('(max-width: 960px)').matches) {
      const list = tab.parentElement;
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) { e.preventDefault(); selectTab(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
    });
  });

  /* ---------- entradas ao rolar ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    // um momento só: títulos de seção e as etapas do processo
    const targets = $$('.section-head, .about__text .title, .process__intro, .step, .contact__intro .title, .cta__body .title, .cs-block h2, .cs-scroll__head');
    const groups = new Map();
    targets.forEach((el) => {
      el.classList.add('reveal');
      const i = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, i + 1);
      el.style.setProperty('--d', `${Math.min(i, 5) * 0.07}s`);
    });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- topo: título e órbita ---------- */
  if ($('.hero') && hasGsap && !reduced) {
    gsap.timeline({ delay: cameFromNav ? 0.5 : 0.1 })
      .from('.hero__index, .hero__title .line, .hero__lead, .hero__actions, .hero__proof', { opacity: 0, y: 24, duration: 1, ease: 'expo.out', stagger: 0.08 })
      .from('.hero__media', { opacity: 0, scale: 0.97, duration: 1.2, ease: 'expo.out' }, 0.1)
      .fromTo('.orbit ellipse', { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.5);
  }
  // retrato do topo: leve aproximação ao rolar
  if ($('.hero__photo') && hasGsap && !reduced) {
    gsap.fromTo('.hero__photo', { scale: 1 }, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- estudos de caso: página inteira rolando dentro da moldura ---------- */
  if (hasGsap && !reduced) {
    $$('[data-autoscroll]').forEach((view) => {
      const img = $('img', view);
      const run = () => {
        gsap.to(img, {
          y: () => -Math.max(0, img.offsetHeight - view.clientHeight), ease: 'none',
          scrollTrigger: { trigger: view.closest('section'), start: 'top 70%', end: 'bottom 60%', scrub: 1, invalidateOnRefresh: true },
        });
        ScrollTrigger.refresh();
      };
      img.complete ? run() : img.addEventListener('load', run, { once: true });
    });
  }

  /* ---------- formulário → WhatsApp (sem perder o que foi digitado) ---------- */
  const form = $('#contact-form');
  if (form) {
    const status = $('.form-status', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;
      $$('[required]', form).forEach((f) => {
        const ok = f.value.trim() !== '';
        f.closest('.field').classList.toggle('is-invalid', !ok);
        f.setAttribute('aria-invalid', !ok);
        if (!ok && !firstBad) firstBad = f;
      });
      if (firstBad) {
        status.className = 'form-status is-error';
        status.textContent = firstBad.name === 'nome' ? 'Escreva o seu nome para a gente saber com quem fala.' : 'Conte em uma frase o que você quer no site.';
        firstBad.focus();
        return;
      }
      const d = new FormData(form);
      const tipos = d.getAll('tipo');
      const negocio = (d.get('negocio') || '').trim();
      const text = `Olá! Vim pelo site da Wscodev.\n\nNome: ${d.get('nome').trim()}` +
        (negocio ? `\nNegócio: ${negocio}` : '') +
        (tipos.length ? `\nPreciso de: ${tipos.join(', ')}` : '') + `\n\n${d.get('mensagem').trim()}`;
      const url = waUrl(text);
      status.className = 'form-status';
      status.innerHTML = `Se o WhatsApp não abriu, <a href="${url}" target="_blank" rel="noopener">toque aqui para abrir</a>. A sua mensagem continua no formulário.`;
      const coarse = matchMedia('(pointer: coarse)').matches;
      const win = coarse ? null : window.open(url, '_blank', 'noopener');
      if (coarse || !win) location.href = url;
    });
    $$('input, textarea', form).forEach((f) => f.addEventListener('input', () => {
      f.closest('.field')?.classList.remove('is-invalid');
      f.removeAttribute('aria-invalid');
    }));
  }

  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  if (hasGsap) {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    addEventListener('load', () => ScrollTrigger.refresh());
  }
})();
