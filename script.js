/* =========================================================
   GRUPEN · Repuestos para Vehículos — script.js
   ========================================================= */
(function () {
  'use strict';

  /* =======================================================
     ⚙️  CONFIGURACIÓN  —  EDITA AQUÍ TUS DATOS REALES
     ======================================================= */
  const CONFIG = {
    whatsapp: '573000000000',           // ← número de WhatsApp (formato internacional, sin + ni espacios)
    phone:    '+57 300 000 0000',       // ← teléfono visible / para llamadas
    email:    'ventas@grupen.com.co',   // ← correo de contacto
    city:     'Colombia',               // ← ciudad / ubicación
    waGreeting: 'Hola GRUPEN 👋, estoy interesado en repuestos para transporte pesado.',
    social: {                           // ← enlaces de redes (deja '#' si aún no tienes)
      facebook:  '#',
      instagram: '#',
      tiktok:    '#'
    }
  };

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const waLink = (text) =>
    'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text || CONFIG.waGreeting);

  /* =======================================================
     1. LOADER  (partículas + barra de progreso)
     ======================================================= */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    const bar = $('#loaderBar');
    const pct = $('#loaderPct');
    const canvas = $('#loaderParticles');

    // --- partículas sutiles ---
    let raf, particles = [], running = true;
    if (canvas && !prefersReduced) {
      const ctx = canvas.getContext('2d');
      const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
      resize();
      const N = Math.min(46, Math.floor(innerWidth / 26));
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + .5,
          vy: -(Math.random() * .5 + .15),
          a: Math.random() * .5 + .2
        });
      }
      const draw = () => {
        if (!running) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.y += p.vy;
          if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(61,168,30,' + (p.a * 0.5) + ')';
          ctx.fill();
        });
        raf = requestAnimationFrame(draw);
      };
      draw();
    }

    // --- progreso ---
    let progress = 0, loaded = false;
    window.addEventListener('load', () => { loaded = true; });
    const tick = () => {
      const cap = loaded ? 100 : 90;
      const step = loaded ? 6 : Math.max(.6, (cap - progress) * 0.06);
      progress = Math.min(cap, progress + step);
      if (bar) bar.style.width = progress + '%';
      if (pct) pct.textContent = Math.floor(progress) + '%';
      if (progress >= 100) {
        running = false; cancelAnimationFrame(raf);
        setTimeout(() => {
          loader.classList.add('is-done');
          document.body.style.overflow = '';
          startHeroReveal();
        }, 250);
        return;
      }
      setTimeout(tick, 90);
    };
    document.body.style.overflow = 'hidden';
    setTimeout(tick, 150);

    // failsafe
    setTimeout(() => { if (!loader.classList.contains('is-done')) { loaded = true; } }, 5000);
  }

  function startHeroReveal() {
    $$('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-in'), i * 90);
    });
  }

  /* =======================================================
     2. WIRING de contacto (WhatsApp / llamada / correo / redes)
     ======================================================= */
  function initContactLinks() {
    $$('[data-wa]').forEach(el => {
      if (!el.hasAttribute('data-quote')) el.setAttribute('href', waLink());
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
    $$('[data-call]').forEach(el => el.setAttribute('href', 'tel:' + CONFIG.phone.replace(/\s/g, '')));
    $$('[data-email]').forEach(el => el.setAttribute('href', 'mailto:' + CONFIG.email));
    $$('[data-phone-text]').forEach(el => el.textContent = CONFIG.phone);
    $$('[data-email-text]').forEach(el => el.textContent = CONFIG.email);
    // redes
    const map = { facebook: CONFIG.social.facebook, instagram: CONFIG.social.instagram, tiktok: CONFIG.social.tiktok };
    $$('[data-social]').forEach(el => {
      const k = el.getAttribute('data-social');
      if (map[k] && map[k] !== '#') { el.setAttribute('href', map[k]); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
    });
    // botones cotizar producto
    $$('[data-quote]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prod = btn.getAttribute('data-quote');
        window.open(waLink('Hola GRUPEN 👋, quiero cotizar este repuesto: *' + prod + '*. ¿Tienen disponibilidad?'), '_blank');
      });
    });
  }

  /* =======================================================
     3. HEADER sticky + barra de progreso de scroll
     ======================================================= */
  function initHeader() {
    const header = $('#header');
    const prog = $('#scrollProgress');
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-stuck', y > 20);
      if (prog) {
        const h = document.documentElement.scrollHeight - innerHeight;
        prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
      const tt = $('#toTop'); if (tt) tt.classList.toggle('is-show', y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =======================================================
     4. NAV móvil + scroll suave + link activo
     ======================================================= */
  function initNav() {
    const nav = $('#nav'), burger = $('#hamburger');
    const close = () => { nav.classList.remove('is-open'); burger.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__link').forEach(l => l.addEventListener('click', close));

    // scroll suave para todos los anchors internos
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    });

    // link activo según sección visible
    const links = $$('.nav__link');
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            const id = '#' + en.target.id;
            links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => io.observe(s));
    }
  }

  /* =======================================================
     5. REVEAL on scroll
     ======================================================= */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || prefersReduced) {
      items.forEach(i => i.classList.add('is-in')); return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const d = parseInt(en.target.dataset.delay || '0', 10);
          setTimeout(() => en.target.classList.add('is-in'), d);
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    items.forEach(i => { if (!i.closest('.hero')) io.observe(i); });
  }

  /* =======================================================
     6. CONTADORES animados
     ======================================================= */
  function initCounters() {
    const nums = $$('.count');
    if (!nums.length) return;
    const fmt = new Intl.NumberFormat('es-CO');
    const run = (el) => {
      const target = parseFloat(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      const dur = 1800; const t0 = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      const frame = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const val = Math.floor(ease(p) * target);
        el.textContent = fmt.format(val) + suffix;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = fmt.format(target) + suffix;
      };
      requestAnimationFrame(frame);
    };
    if (!('IntersectionObserver' in window) || prefersReduced) {
      nums.forEach(n => n.textContent = new Intl.NumberFormat('es-CO').format(n.dataset.target) + (n.dataset.suffix || '')); return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  }

  /* =======================================================
     7. PARALLAX (scroll + mouse en el hero)
     ======================================================= */
  function initParallax() {
    if (prefersReduced) return;
    // Scroll parallax SOLO en el fondo (grid + beams): no tienen animación float,
    // así evitamos conflictos con el `transform` de las piezas flotantes.
    const bg = $$('.hero__bg [data-parallax]');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        bg.forEach(el => {
          const f = parseFloat(el.dataset.parallax) || 0;
          el.style.transform = 'translate3d(0,' + (y * f) + 'px,0)';
        });
        ticking = false;
      });
    };
    // Mouse parallax en los productos del hero: usa `translate` (propiedad
    // independiente) para componerse con el `transform` de la animación float.
    const hero = $('.hero');
    if (hero && window.matchMedia('(pointer:fine)').matches) {
      hero.addEventListener('mousemove', e => {
        const cx = (e.clientX / innerWidth - .5);
        const cy = (e.clientY / innerHeight - .5);
        $$('.hero__product').forEach((p, i) => {
          const d = (i + 1) * 7;
          p.style.translate = (cx * d) + 'px ' + (cy * d) + 'px';
        });
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =======================================================
     8. CATÁLOGO escalable: categorías + buscador + productos
     ======================================================= */
  const ICO = {
    luces:'<path d="M9 18h6m-5 3h4M12 2a7 7 0 0 1 4 12.7c-.6.5-1 .9-1 1.8H9c0-.9-.4-1.3-1-1.8A7 7 0 0 1 12 2Z"/>',
    muelles:'<path d="M3 8c4-3 14-3 18 0M4 13c4-2.5 12-2.5 16 0M6 18c3-2 9-2 12 0"/>',
    filtros:'<path d="M6 4h12l-1 3H7L6 4Zm1 3 1.2 13a1 1 0 0 0 1 .9h3.6a1 1 0 0 0 1-.9L17 7M9 11h6M9.4 15h5.2"/>',
    correas:'<path d="M8 8a8 4 0 1 0 8 0 8 4 0 1 0-8 0ZM6 8v8a8 4 0 0 0 12 0V8"/>',
    'bombas-freno':'<circle cx="12" cy="13" r="6"/><path d="M12 3v4M10 5h4M12 11v5M10 13.5h4"/>',
    pastillas:'<rect x="4" y="6" width="16" height="6" rx="2"/><path d="M7 14v4m4-4v4m4-4v4"/>',
    soporteria:'<path d="M5 4v10a4 4 0 0 0 4 4h9M5 8h6"/><circle cx="19" cy="18" r="2"/>',
    electrico:'<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    'freno-aire':'<circle cx="12" cy="12" r="3"/><path d="M3 8h5m-5 8h5m13-8h-5m5 8h-5M12 3v5m0 8v5"/>',
    retenedores:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.4"/>',
    rodamientos:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="6" r="1.2"/><circle cx="12" cy="18" r="1.2"/><circle cx="6" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
    bombillos:'<path d="M12 2a6 6 0 0 1 3.5 10.9c-.5.4-.5 1.1-.5 2.1H9c0-1 0-1.7-.5-2.1A6 6 0 0 1 12 2ZM9 18h6m-5 3h4"/>',
    llantas:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="M12 3v4m0 10v4m9-9h-4M7 12H3"/>',
    lubricantes:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/>',
    turbos:'<circle cx="12" cy="12" r="2.6"/><path d="M12 9.4c0-4 5-5 5-5M14.6 12c4 0 5 5 5 5M12 14.6c0 4-5 5-5 5M9.4 12c-4 0-5-5-5-5"/>',
    otros:'<path d="M14.7 6.3a3.5 3.5 0 0 0-4.5 4.5L4 17l3 3 6.2-6.2a3.5 3.5 0 0 0 4.5-4.5l-2 2-2-2 2-2Z"/>'
  };
  const svgIco = id => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICO[id] || ICO.otros) + '</svg>';

  const CATEGORIES = [
    { id:'luces', name:'Luces' }, { id:'muelles', name:'Hojas de Muelle' },
    { id:'filtros', name:'Filtros' }, { id:'correas', name:'Correas' },
    { id:'bombas-freno', name:'Bombas de Freno' }, { id:'pastillas', name:'Pastillas' },
    { id:'soporteria', name:'Soportería' }, { id:'electrico', name:'Sistema Eléctrico' },
    { id:'freno-aire', name:'Freno de Aire' }, { id:'retenedores', name:'Retenedores' },
    { id:'rodamientos', name:'Rodamientos' }, { id:'bombillos', name:'Bombillos' },
    { id:'llantas', name:'Llantas' }, { id:'lubricantes', name:'Lubricantes' },
    { id:'turbos', name:'Turbos' }, { id:'otros', name:'Otros Repuestos' }
  ];
  const CAT_NAME = {}; CATEGORIES.forEach(c => CAT_NAME[c.id] = c.name);

  // Catálogo escalable: agrega/edita aquí (o cárgalo desde JSON/API a futuro).
  // SOLO productos reales enviados por el cliente (con foto). Agrega aquí los nuevos.
  const PRODUCTS = [
    { name:'Faro Sellado Halógeno H4651', ref:'H4651', brand:'Wagner', cat:'luces', img:'assets/products/lampara1.webp' },
    { name:'Faro Halógeno H6054 Alto/Bajo', ref:'H6054', brand:'Wagner', cat:'luces', img:'assets/products/lampara3.webp' },
    { name:'Faro Sellado Stanley', ref:'Sealed Beam', brand:'Stanley', cat:'luces', img:'assets/products/lampara2.webp' },
    { name:'Stop Toyota Land Cruiser', ref:'STOP-TOY', brand:'', cat:'luces', img:'assets/products/stop1.webp' },
    { name:'Stop Daihatsu 4-105', ref:'4-105', brand:'Multipartes', cat:'luces', img:'assets/products/stop2.webp' },
    { name:'Stop Renault 6', ref:'4-95', brand:'Multipartes', cat:'luces', img:'assets/products/stop3.webp' },
    { name:'Stop Chevrolet Chevette', ref:'STOP-CHEV', brand:'', cat:'luces', img:'assets/products/stop4.webp' },
    { name:'Lámpara Triple Cromada', ref:'LT-CROM', brand:'', cat:'luces', img:'assets/products/stop5.webp' },
    { name:'Stop Chevrolet LUV 1600', ref:'4-117', brand:'Multipartes', cat:'luces', img:'assets/products/stop6.webp' },
    { name:'Lámpara Stop Renault 4', ref:'R-4-72', brand:'', cat:'luces', img:'assets/products/stop7.webp' },
    { name:'Tapa Distribuidor Denso EDC-72', ref:'EDC-72', brand:'Valley Forge', cat:'electrico', img:'assets/products/tapadistribuidor.webp' },
    { name:'Tapa Distribuidor Chrysler DC-85', ref:'DC-85', brand:'Valley Forge', cat:'electrico', img:'assets/products/tapadistribuidor2.webp' },
    { name:'Tapa Distribuidor DR-450', ref:'DR-450', brand:'Standard', cat:'electrico', img:'assets/products/tapadistribuidor3.webp' },
    { name:'Switch de Encendido MAX', ref:'SW-MAX', brand:'MAX', cat:'electrico', img:'assets/products/llaves2.webp' },
    { name:'Switch de Encendido Ford Truck', ref:'16-40X', brand:'', cat:'electrico', img:'assets/products/llaves3.webp' },
    { name:'Switch de Encendido con Llaves', ref:'SW-ENC', brand:'', cat:'electrico', img:'assets/products/llaves4.webp' },
    { name:'Switches de Encendido (surtido)', ref:'LS-40X', brand:'Valley Forge', cat:'electrico', img:'assets/products/llaves1.webp' }
  ];

  let activeCat = 'all', searchQuery = '';
  const escAttr = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  function initCatalog() {
    const catsGrid = $('#catsGrid'), prodsGrid = $('#prodsGrid');
    if (!catsGrid || !prodsGrid) return;
    const countEl = $('#prodsCount'), emptyEl = $('#prodsEmpty'), resetEl = $('#catReset');
    const input = $('#searchInput'), clearBtn = $('#searchClear');
    const counts = {}; PRODUCTS.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);

    catsGrid.innerHTML = CATEGORIES.map(c =>
      '<button class="cat" type="button" data-cat="' + c.id + '">' +
      '<span class="cat__ico">' + svgIco(c.id) + '</span>' +
      '<span class="cat__name">' + c.name + '</span>' +
      (counts[c.id] ? '<span class="cat__n">' + counts[c.id] + '</span>' : '') + '</button>'
    ).join('');

    const matches = p => {
      if (activeCat !== 'all' && p.cat !== activeCat) return false;
      if (searchQuery) return (p.name + ' ' + p.ref + ' ' + p.brand + ' ' + CAT_NAME[p.cat]).toLowerCase().indexOf(searchQuery) >= 0;
      return true;
    };
    const render = () => {
      const list = PRODUCTS.filter(matches);
      prodsGrid.innerHTML = list.map(p =>
        '<article class="prod">' +
        '<div class="prod__media">' + (p.img ? '<img src="' + p.img + '" alt="' + escAttr(p.name) + '" loading="lazy" decoding="async">' : '<span class="prod__ico">' + svgIco(p.cat) + '</span>') + '</div>' +
        '<div class="prod__body">' +
        '<span class="prod__cat">' + CAT_NAME[p.cat] + '</span>' +
        '<h4 class="prod__name">' + p.name + '</h4>' +
        '<div class="prod__meta"><span class="prod__ref">Ref. ' + p.ref + '</span>' + (p.brand ? '<span class="prod__brand">' + p.brand + '</span>' : '') + '</div>' +
        '<div class="prod__foot">' +
        '<button class="btn btn--sm btn--primary prod__add" type="button" data-key="' + escAttr(p.ref || p.name) + '">+ Agregar</button>' +
        '<button class="prod__quote" type="button" data-pn="' + escAttr(p.name) + '" data-pr="' + escAttr(p.ref) + '">Cotizar</button>' +
        '</div></div></article>'
      ).join('');
      if (countEl) countEl.textContent = (activeCat === 'all' && !searchQuery)
        ? 'Productos disponibles'
        : list.length + ' resultado' + (list.length === 1 ? '' : 's') + (activeCat !== 'all' ? ' · ' + CAT_NAME[activeCat] : '');
      if (emptyEl) emptyEl.hidden = list.length > 0;
      if (resetEl) resetEl.hidden = activeCat === 'all';
      $$('.cat', catsGrid).forEach(b => b.classList.toggle('is-active', b.dataset.cat === activeCat));
    };

    catsGrid.addEventListener('click', e => {
      const b = e.target.closest('.cat'); if (!b) return;
      activeCat = (activeCat === b.dataset.cat) ? 'all' : b.dataset.cat;
      render();
      const t = $('#catalogo').getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: t, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
    if (resetEl) resetEl.addEventListener('click', () => { activeCat = 'all'; render(); });
    if (input) input.addEventListener('input', () => {
      searchQuery = input.value.trim().toLowerCase();
      if (clearBtn) clearBtn.hidden = !searchQuery;
      render();
    });
    if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; searchQuery = ''; clearBtn.hidden = true; render(); input.focus(); });
    prodsGrid.addEventListener('click', e => {
      const add = e.target.closest('.prod__add');
      if (add) { const p = PRODUCTS.find(x => (x.ref || x.name) === add.dataset.key); if (p) Cart.add(p); return; }
      const q = e.target.closest('.prod__quote');
      if (q) window.open(waLink('Hola GRUPEN 👋, quiero cotizar: *' + q.dataset.pn + '* (Ref. ' + q.dataset.pr + '). ¿Disponibilidad para transporte pesado?'), '_blank');
    });
    render();
  }

  /* =======================================================
     8b. CARRITO de cotización → WhatsApp
     ======================================================= */
  const Cart = {
    items: [],
    load() { try { this.items = JSON.parse(localStorage.getItem('grupen_cart') || '[]'); } catch (e) { this.items = []; } },
    save() { try { localStorage.setItem('grupen_cart', JSON.stringify(this.items)); } catch (e) {} },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    add(p) {
      const key = p.ref || p.name;
      const ex = this.items.find(i => i.key === key);
      if (ex) ex.qty++; else this.items.push({ key, name: p.name, ref: p.ref, brand: p.brand || '', qty: 1 });
      this.save(); this.render(); this.flash(); this.open();
    },
    setQty(key, d) {
      const it = this.items.find(i => i.key === key); if (!it) return;
      it.qty += d; if (it.qty <= 0) this.items = this.items.filter(i => i.key !== key);
      this.save(); this.render();
    },
    remove(key) { this.items = this.items.filter(i => i.key !== key); this.save(); this.render(); },
    clear() { this.items = []; this.save(); this.render(); },
    flash() { const b = $('#cartBtn'); if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); } },
    open() { const c = $('#cart'); if (c) { c.classList.add('is-open'); c.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; } },
    close() { const c = $('#cart'); if (c) { c.classList.remove('is-open'); c.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; } },
    render() {
      const n = this.count();
      const cnt = $('#cartCount'); if (cnt) { cnt.textContent = n; cnt.classList.toggle('is-show', n > 0); }
      const hc = $('#cartHeadCount'); if (hc) hc.textContent = n;
      const wrap = $('#cartItems'); if (wrap) wrap.innerHTML = this.items.map(i =>
        '<div class="citem"><div class="citem__info"><strong>' + i.name + '</strong><span>Ref. ' + i.ref + (i.brand ? ' · ' + i.brand : '') + '</span></div>' +
        '<div class="citem__qty"><button type="button" data-q="-" data-k="' + escAttr(i.key) + '" aria-label="Menos">&minus;</button><span>' + i.qty + '</span><button type="button" data-q="+" data-k="' + escAttr(i.key) + '" aria-label="Más">+</button></div>' +
        '<button class="citem__rm" type="button" data-rm="' + escAttr(i.key) + '" aria-label="Quitar">&times;</button></div>'
      ).join('');
      const empty = $('#cartEmpty'); if (empty) empty.hidden = this.items.length > 0;
      const send = $('#cartSend'); if (send) send.disabled = this.items.length === 0;
    },
    sendWA() {
      if (!this.items.length) return;
      let msg = '🛒 *Solicitud de cotización — GRUPEN*%0A_Repuestos para transporte pesado_%0A%0A';
      this.items.forEach((i, idx) => { msg += (idx + 1) + '. ' + i.name + ' (Ref. ' + i.ref + ') x' + i.qty + '%0A'; });
      msg += '%0ATotal de ítems: ' + this.count() + '%0A%0A¿Me confirman disponibilidad y precio? Gracias.';
      window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + msg, '_blank');
    }
  };
  function initCart() {
    Cart.load(); Cart.render();
    const c = $('#cart'); if (!c) return;
    const on = (sel, fn) => { const el = $(sel); if (el) el.addEventListener('click', fn); };
    on('#cartBtn', () => Cart.open());
    on('#cartClose', () => Cart.close());
    on('#cartOverlay', () => Cart.close());
    on('#cartClear', () => Cart.clear());
    on('#cartSend', () => Cart.sendWA());
    const items = $('#cartItems');
    if (items) items.addEventListener('click', e => {
      const q = e.target.closest('[data-q]'); if (q) { Cart.setQty(q.dataset.k, q.dataset.q === '+' ? 1 : -1); return; }
      const rm = e.target.closest('[data-rm]'); if (rm) Cart.remove(rm.dataset.rm);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && c.classList.contains('is-open')) Cart.close(); });
  }

  /* =======================================================
     9. GALERÍA — Coverflow 3D (showroom) + Lightbox
     ======================================================= */
  function initGallery() {
    const stage = $('#coverStage');
    const lb = $('#lightbox');
    if (!stage || !lb) return;
    const items = $$('.cover__item', stage);
    const capEl = $('#coverCap'), dotsEl = $('#coverDots');
    const data = items.map(it => ({ src: it.dataset.src, cap: it.dataset.cap || '' }));
    const len = items.length;
    let active = 0, timer = null, moved = false, down = false, sx = 0;

    const gapFor = () => { const w = innerWidth; return w < 420 ? 118 : w < 680 ? 140 : w < 1024 ? 176 : 214; };

    function render() {
      const gap = gapFor();
      items.forEach((it, i) => {
        let off = i - active;
        if (off > len / 2) off -= len;       // recorrido circular (más corto)
        if (off < -len / 2) off += len;
        const abs = Math.abs(off), sign = Math.sign(off), vis = abs <= 3;
        const rot = -sign * Math.min(abs, 3) * 38;
        const sc = Math.max(0.6, 1 - abs * 0.16);
        it.style.transform = 'translate(-50%,-50%) translateX(' + (off * gap) + 'px) rotateY(' + rot + 'deg) scale(' + sc + ')';
        it.style.zIndex = String(100 - abs);
        it.style.opacity = vis ? String(Math.max(0, 1 - abs * 0.16)) : '0';
        it.style.filter = abs >= 2 ? 'brightness(.78)' : 'none';
        it.style.pointerEvents = vis ? 'auto' : 'none';
        it.classList.toggle('is-active', i === active);
      });
      if (capEl) capEl.textContent = data[active].cap;
      Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('is-active', i === active));
    }
    const go = n => { active = (n + len) % len; render(); };
    const next = () => go(active + 1), prev = () => go(active - 1);
    const reset = () => { clearInterval(timer); if (!prefersReduced) timer = setInterval(next, 3800); };

    // puntos
    data.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', 'Ver imagen ' + (i + 1));
      b.addEventListener('click', () => { go(i); reset(); });
      dotsEl.appendChild(b);
    });
    $('#coverPrev').addEventListener('click', () => { prev(); reset(); });
    $('#coverNext').addEventListener('click', () => { next(); reset(); });

    // lightbox
    const lbImg = $('#lbImg'), lbCap = $('#lbCap'); let lbIdx = 0;
    const showLB = i => { lbIdx = (i + len) % len; lbImg.src = data[lbIdx].src; lbImg.alt = data[lbIdx].cap; lbCap.textContent = data[lbIdx].cap; };
    const openLB = i => { showLB(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    const closeLB = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    $('#lbClose').addEventListener('click', closeLB);
    $('#lbPrev').addEventListener('click', () => showLB(lbIdx - 1));
    $('#lbNext').addEventListener('click', () => showLB(lbIdx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowRight') showLB(lbIdx + 1);
      if (e.key === 'ArrowLeft') showLB(lbIdx - 1);
    });

    // clic: pieza central → ampliar; otra → centrarla
    items.forEach((it, i) => it.addEventListener('click', () => {
      if (moved) { moved = false; return; }
      if (i === active) openLB(i); else { go(i); reset(); }
    }));

    // arrastrar / deslizar
    const px = e => e.touches ? e.touches[0].clientX : (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
    const onDown = e => { down = true; moved = false; sx = px(e); clearInterval(timer); };
    const onMove = e => { if (down && Math.abs(px(e) - sx) > 6) moved = true; };
    const onUp = e => { if (!down) return; down = false; const dx = px(e) - sx; if (dx > 50) prev(); else if (dx < -50) next(); reset(); };
    stage.addEventListener('mousedown', onDown);
    stage.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    stage.addEventListener('touchstart', onDown, { passive: true });
    stage.addEventListener('touchmove', onMove, { passive: true });
    stage.addEventListener('touchend', onUp);
    stage.addEventListener('mouseenter', () => clearInterval(timer));
    stage.addEventListener('mouseleave', reset);

    let rT; window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(render, 150); });
    render(); reset();
  }

  /* =======================================================
     10. TESTIMONIOS — carrusel auto
     ======================================================= */
  function initTestimonials() {
    const track = $('#testiTrack');
    const dotsWrap = $('#testiDots');
    if (!track) return;
    const cards = $$('.testi__card', track);
    const perView = () => innerWidth >= 1080 ? 3 : innerWidth >= 760 ? 2 : 1;
    let idx = 0, timer;

    const pages = () => Math.max(1, cards.length - perView() + 1);
    const buildDots = () => {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < pages(); i++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Testimonio ' + (i + 1));
        b.addEventListener('click', () => { idx = i; update(); reset(); });
        dotsWrap.appendChild(b);
      }
    };
    const update = () => {
      const card = cards[0];
      const gap = parseFloat(getComputedStyle(card).marginRight) || 0;
      const w = card.getBoundingClientRect().width + gap;
      if (idx > pages() - 1) idx = 0;
      track.style.transform = 'translateX(' + (-idx * w) + 'px)';
      $$('button', dotsWrap).forEach((d, i) => d.classList.toggle('is-active', i === idx));
    };
    const next = () => { idx = (idx + 1) % pages(); update(); };
    const reset = () => { clearInterval(timer); if (!prefersReduced) timer = setInterval(next, 4500); };

    buildDots(); update(); reset();
    let rT; window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { buildDots(); update(); }, 200); });
    const vp = $('.testi__viewport');
    vp.addEventListener('mouseenter', () => clearInterval(timer));
    vp.addEventListener('mouseleave', reset);
  }

  /* =======================================================
     11. FORMULARIO buscador → WhatsApp
     ======================================================= */
  function initForm() {
    const form = $('#finderForm');
    if (!form) return;
    const toast = $('#toast');
    const showToast = (msg) => {
      toast.textContent = msg; toast.classList.add('is-show');
      setTimeout(() => toast.classList.remove('is-show'), 3500);
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const required = ['nombre', 'telefono', 'marca', 'repuesto'];
      let ok = true;
      required.forEach(name => {
        const input = form.elements[name];
        if (!input.value.trim()) { input.classList.add('is-error'); ok = false; }
        else input.classList.remove('is-error');
      });
      if (!ok) { showToast('Completa los campos obligatorios (*)');
        const firstErr = $('.is-error', form); if (firstErr) firstErr.focus(); return; }

      const v = n => (form.elements[n].value.trim() || '—');
      const msg =
        '🔧 *Solicitud de repuesto — GRUPEN*%0A%0A' +
        '👤 Nombre: ' + v('nombre') + '%0A' +
        '📞 Teléfono: ' + v('telefono') + '%0A' +
        '🚗 Marca: ' + v('marca') + '%0A' +
        '🚙 Modelo: ' + v('modelo') + '%0A' +
        '📅 Año: ' + v('anio') + '%0A' +
        '⚙️ Repuesto: ' + v('repuesto') + '%0A%0A' +
        '_Envío por Interrapidísimo con pago contraentrega._';
      window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + msg, '_blank');
      showToast('¡Listo! Te conectamos con un asesor por WhatsApp ✅');
      form.reset();
    });
    // limpia error al escribir
    $$('input', form).forEach(i => i.addEventListener('input', () => i.classList.remove('is-error')));
  }

  /* =======================================================
     12. MARQUEE (duplicar para loop continuo)
     ======================================================= */
  function initMarquee() {
    const track = $('#marcasTrack');
    if (!track) return;
    track.innerHTML += track.innerHTML; // duplica para -50% sin saltos
  }

  /* =======================================================
     12b. Video del hero (autoplay seguro + reduced-motion)
     ======================================================= */
  function initHeroVideo() {
    const v = document.querySelector('.hero__video');
    if (!v) return;
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); // requisito para autoplay
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('canplay', tryPlay, { once: true });
    // Si el navegador bloquea el autoplay, arrancar al primer gesto del usuario
    const evs = ['pointerdown', 'touchstart', 'scroll', 'keydown'];
    const kick = () => { tryPlay(); evs.forEach(ev => window.removeEventListener(ev, kick)); };
    evs.forEach(ev => window.addEventListener(ev, kick, { passive: true }));
  }

  /* =======================================================
     13. Misceláneos
     ======================================================= */
  function initMisc() {
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    const tt = $('#toTop');
    if (tt) tt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
  }

  /* =======================================================
     INIT
     ======================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initContactLinks();
    initHeader();
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initHeroVideo();
    initCatalog();
    initCart();
    initGallery();
    initTestimonials();
    initForm();
    initMarquee();
    initMisc();
  });
})();
