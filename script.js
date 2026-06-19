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
    waGreeting: 'Hola GRUPEN 👋, estoy interesado en repuestos para mi carro clásico.',
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
          ctx.fillStyle = 'rgba(95,206,58,' + p.a + ')';
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
     8. CATÁLOGO — filtros
     ======================================================= */
  function initCatalog() {
    const chips = $$('.chip');
    const items = $$('#catalogGrid .product');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const f = chip.dataset.filter;
        items.forEach(it => {
          const show = f === 'all' || it.dataset.cat === f;
          it.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* =======================================================
     9. GALERÍA — Lightbox
     ======================================================= */
  function initLightbox() {
    const figs = $$('.gitem');
    const lb = $('#lightbox');
    if (!figs.length || !lb) return;
    const img = $('#lbImg'), cap = $('#lbCap');
    const data = figs.map(f => ({ src: f.dataset.src, cap: (f.querySelector('figcaption') || {}).textContent || '' }));
    let idx = 0;

    const show = i => {
      idx = (i + data.length) % data.length;
      img.src = data[idx].src;
      img.alt = data[idx].cap;
      cap.textContent = data[idx].cap;
    };
    const open = i => { show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };

    figs.forEach((f, i) => f.addEventListener('click', () => open(i)));
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', () => show(idx - 1));
    $('#lbNext').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
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
    initCatalog();
    initLightbox();
    initTestimonials();
    initForm();
    initMarquee();
    initMisc();
  });
})();
