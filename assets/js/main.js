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
    let n = 0;
    $$('.service').forEach((s) => {
      const show = cat === 'todos' || s.dataset.cat === cat;
      s.hidden = !show;
      s.style.opacity = '';
      s.classList.remove('is-shown');
      if (show) { s.style.setProperty('--sd', `${n++ * 0.05}s`); void s.offsetWidth; s.classList.add('is-shown'); }
    });
  }));

  /* ---------- projetos: abas ---------- */
  const tabs = $$('.works__tab');
  // troca de projeto: a imagem abre como uma cortina e o texto sobe em sequência
  const playPanel = (panel) => {
    if (!hasGsap || reduced) return;
    gsap.fromTo($('.work__media', panel), { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' });
    gsap.fromTo($('.work__media img', panel), { scale: 1.12 }, { scale: 1.02, duration: 1.2, ease: 'expo.out', clearProps: 'scale,transform' });
    gsap.fromTo($$('.work__text > *', panel), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, delay: 0.1, clearProps: 'opacity,transform' });
  };
  const selectTab = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      const was = t.getAttribute('aria-selected') === 'true';
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) { panel.hidden = !on; panel.classList.toggle('is-on', on); if (on && !was) playPanel(panel); }
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
  const motion = hasGsap && !reduced;
  // títulos de seção: cada linha sobe por trás de uma máscara
  const splitLines = (el) => {
    el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i).map((h, i) => `<span class="tl" style="--i:${i}"><span class="tl__in">${h.trim()}</span></span>`).join('');
    el.classList.add('split');
  };
  if (!reduced && 'IntersectionObserver' in window) {
    const titles = $$('main .section .title, .cs-block h2, .cs-scroll__head h2');
    titles.forEach(splitLines);
    const fades = $$('.section-head__text, .about__text > :not(.title), .process__intro > :not(.title), .contact__intro > p, .cta__side > p, .filters, .cs-text > p, .cs-scroll__head p, .cs-switch, .type-specimen');
    const groups = new Map();
    fades.forEach((el) => {
      el.classList.add('reveal');
      const i = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, i + 1);
      el.style.setProperty('--d', `${0.15 + Math.min(i, 5) * 0.07}s`);
    });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    [...titles, ...fades].forEach((el) => io.observe(el));

    // serviços: a primeira aparição da grade entra em cascata
    const grid = $('.service-grid');
    if (grid) {
      const first = $$('.service:not([hidden])', grid);
      first.forEach((s) => { s.style.opacity = '0'; });
      const gio = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        first.forEach((s, i) => { s.style.opacity = ''; s.style.setProperty('--sd', `${i * 0.07}s`); s.classList.add('is-shown'); });
        gio.disconnect();
      }, { threshold: 0.12 });
      gio.observe(grid);
    }
  }

  // listas que aparecem como listas: cartões em cascata
  if (motion) {
    ['.help__track > li', '.contact-rows > li', '.cta__chips > li', '.cs-list > li', '.swatches > li', '.footer__top > *'].forEach((sel) => {
      const items = $$(sel);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 34 });
      ScrollTrigger.batch(items, {
        start: 'top 92%', once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true, clearProps: 'transform' }),
      });
    });
  }

  /* ---------- topo: o momento de abertura ---------- */
  if ($('.hero') && motion) {
    const lines = $$('.hero__title .line');
    lines.forEach((l) => { l.innerHTML = `<span class="tl__in">${l.innerHTML}</span>`; });
    gsap.set(lines, { clipPath: 'inset(0 -50% 0 -50%)' });
    const count = $('[data-count]');
    const counter = { v: 0 };
    if (count) count.textContent = '0';
    gsap.timeline({ delay: cameFromNav ? 0.5 : 0.15 })
      .from('.hero__title .tl__in', { yPercent: 112, duration: 1.3, ease: 'expo.out', stagger: 0.12, onComplete: () => gsap.set(lines, { clearProps: 'clipPath' }) }, 0)
      .from('.hero__index', { opacity: 0, y: 12, duration: 0.8, ease: 'expo.out' }, 0.25)
      .from('.hero__lead, .hero__actions, .hero__proof', { opacity: 0, y: 24, duration: 1, ease: 'expo.out', stagger: 0.09 }, 0.4)
      .fromTo('.faces span', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, clearProps: 'opacity,transform' }, 0.75)
      .from('.hero__media picture', { yPercent: 10, opacity: 0, duration: 1.5, ease: 'expo.out' }, 0.1)
      .fromTo('.hero__track path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power3.inOut' }, 0.15)
      .fromTo('.orbit ellipse', { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.6)
      .from('.hero__chip', { opacity: 0, x: -18, duration: 1, ease: 'expo.out' }, 0.8)
      .to(counter, { v: Number(count?.dataset.count || 100), duration: 1.6, ease: 'power3.out', onUpdate: () => { if (count) count.textContent = Math.round(counter.v); } }, 0.8);
    // ao rolar: o texto sobe um pouco mais rápido que o retrato
    gsap.to('.hero__copy', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
  // retrato do topo: leve aproximação ao rolar
  if ($('.hero__photo') && motion) {
    gsap.fromTo('.hero__photo', { scale: 1 }, { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- sobre: três sites em cascata, entrando um depois do outro ---------- */
  const stack = $('.stack');
  if (stack && motion) {
    const items = $$('.stack__item', stack);
    // cada site entra pelo lado em que fica na cascata: esquerda, direita, esquerda
    gsap.set(items, { opacity: 0, x: (i) => (i % 2 ? 90 : -90), rotate: (i) => (i % 2 ? 3 : -3) });
    const sio = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      gsap.to(items, { opacity: 1, x: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: 0.28 });
      sio.disconnect();
    }, { threshold: 0.2 });
    sio.observe(stack);
    // ao rolar, o de baixo sobe mais rápido e a cascata se abre e fecha
    items.forEach((it, i) => {
      gsap.fromTo(it, { y: 30 + i * 30 }, { y: -(30 + i * 30), ease: 'none', scrollTrigger: { trigger: stack, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* ---------- luz que segue o cursor nos cartões ---------- */
  if (matchMedia('(hover: hover)').matches) {
    $$('.need, .service, .step, .contact-row').forEach((el) => el.classList.add('spot'));
    document.addEventListener('pointermove', (e) => {
      const el = e.target.closest?.('.spot');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });

    // projetos: bolha "Ver estudo de caso" que acompanha o cursor
    $$('.work__media').forEach((m) => {
      m.insertAdjacentHTML('beforeend', '<span class="work__cursor" aria-hidden="true">Ver estudo de caso</span>');
      const bub = $('.work__cursor', m);
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const loop = () => {
        cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
        bub.style.setProperty('--cx', `${cx}px`); bub.style.setProperty('--cy', `${cy}px`);
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
      };
      const at = (e) => { const r = m.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; };
      m.addEventListener('pointerenter', (e) => { at(e); cx = tx; cy = ty; loop(); });
      m.addEventListener('pointermove', (e) => { at(e); if (!raf) raf = requestAnimationFrame(loop); });
    });

    // botões principais com leve atração magnética
    if (motion) {
      $$('.hero__actions .btn, .cta__side .btn, .process__intro .btn, .cs-next__arrow').forEach((b) => {
        const xTo = gsap.quickTo(b, 'x', { duration: 0.6, ease: 'expo.out' });
        const yTo = gsap.quickTo(b, 'y', { duration: 0.6, ease: 'expo.out' });
        b.addEventListener('pointermove', (e) => {
          const r = b.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.22); yTo((e.clientY - r.top - r.height / 2) * 0.32);
        });
        b.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
      });
    }
  }

  /* ---------- como funciona: a onda se desenha e as etapas entram dos lados ---------- */
  if ($('.process') && motion) {
    gsap.fromTo('.process__wave path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.process', start: 'top 75%', end: 'bottom 70%', scrub: 1 } });
    $$('.step').forEach((s, i) => {
      gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 90%', once: true } })
        .from(s, { opacity: 0, x: i % 2 ? 60 : -60, duration: 1.1, ease: 'expo.out', clearProps: 'transform' })
        .from($('.step__num', s), { scale: 0.4, rotate: -90, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0.15);
    });
  }

  /* ---------- chamada: o cartão se abre e o retrato sobe ---------- */
  if ($('.cta__card') && motion) {
    gsap.fromTo('.cta__card', { clipPath: 'inset(8% 6% 8% 6% round 16px)' }, { clipPath: 'inset(0% 0% 0% 0% round 16px)', ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top 95%', end: 'top 35%', scrub: true } });
    gsap.fromTo('.cta__bg', { yPercent: 14 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'center center', scrub: true } });
  }

  /* ---------- rodapé: as letras do nome sobem ---------- */
  const mark = $('.footer__mark');
  if (mark) {
    mark.innerHTML = [...mark.textContent.trim()].map((c) => `<span class="fm">${c}</span>`).join('');
    if (motion) gsap.from($$('.fm', mark), { yPercent: 105, duration: 1.2, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: mark, start: 'top 98%', once: true } });
  }

  /* ---------- estudos de caso: abertura ---------- */
  if ($('.cs-hero') && motion) {
    gsap.timeline({ delay: cameFromNav ? 0.5 : 0.1 })
      .from('.cs-back', { opacity: 0, x: -14, duration: 0.8, ease: 'expo.out' }, 0)
      .from('.cs-title .ln__in', { yPercent: 112, duration: 1.3, ease: 'expo.out', stagger: 0.12 }, 0.05)
      .from('.cs-lead', { opacity: 0, y: 22, duration: 1, ease: 'expo.out' }, 0.35)
      .from('.cs-meta > div', { opacity: 0, y: 16, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.45)
      .from('.cs-cover .browser', { opacity: 0, y: 70, duration: 1.5, ease: 'expo.out' }, 0.3);
    gsap.fromTo('.cs-cover .browser', { scale: 0.93 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.cs-cover', start: 'top 90%', end: 'top 15%', scrub: true } });
    gsap.fromTo('.cs-cover img', { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.cs-cover', start: 'top 90%', end: 'bottom top', scrub: true } });
  }

  /* ---------- estudos de caso: a tela fica parada e a página passa por dentro ---------- */
  const csScroll = $('.cs-scroll');
  if (csScroll) {
    const csStage = $('.cs-scroll__stage', csScroll);
    const devBtns = $$('.cs-switch button', csScroll);
    devBtns.forEach((b) => b.addEventListener('click', () => {
      csStage.dataset.view = b.dataset.device;
      devBtns.forEach((x) => x.setAttribute('aria-pressed', x === b));
    }));
    if (motion) {
      csScroll.classList.add('is-pinned');
      const views = $$('[data-autoscroll]', csScroll);
      const pct = $('.cs-scroll__pct', csScroll);
      const travel = (v) => Math.max(0, $('img', v).offsetHeight - v.clientHeight);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: csScroll, pin: $('.cs-scroll__pin', csScroll), start: 'top top', scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          end: () => `+=${Math.min(4200, Math.max(1400, Math.max(...views.map(travel)) * 0.6))}`,
          onUpdate: (st) => { if (pct) pct.textContent = `${Math.round(st.progress * 100)}%`; },
        },
      });
      views.forEach((v) => tl.fromTo($('img', v), { y: 0 }, { y: () => -travel(v), ease: 'none' }, 0));
      tl.fromTo($('.cs-scroll__progress span', csScroll), { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
      views.forEach((v) => { const img = $('img', v); if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true }); });
    }
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
