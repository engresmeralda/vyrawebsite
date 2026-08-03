/* ==========================================================================
   VYRA — main.js
   Shared behaviour loaded on every page: loader, navbar, mobile menu,
   cursor glow, scroll progress, reveal animations, counters, ripple/tilt,
   newsletter validation, toast helper, and the canvas hero animation.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* Loading screen                                                          */
/* ---------------------------------------------------------------------- */
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 450);
});

/* ---------------------------------------------------------------------- */
/* Toast notifications — showToast(title, message, type)                   */
/* ---------------------------------------------------------------------- */
function showToast(title, message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<strong>${title}</strong>${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
window.showToast = showToast;

(() => {
  'use strict';

  /* ---------------------------------------------------------------------- */
  /* Navbar: scrolled state                                                  */
  /* ---------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------- */
  /* Mobile menu (hamburger slide-out)                                       */
  /* ---------------------------------------------------------------------- */
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');

  function closeMenu() {
    toggleBtn?.classList.remove('active');
    navLinks?.classList.remove('mobile-open');
    navCta?.classList.remove('mobile-open');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    const isOpen = navLinks?.classList.toggle('mobile-open');
    navCta?.classList.toggle('mobile-open', isOpen);
    toggleBtn?.classList.toggle('active', isOpen);
    toggleBtn?.setAttribute('aria-expanded', String(!!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMenu);
    navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (e) => {
      if (!navLinks?.classList.contains('mobile-open')) return;
      if (navLinks.contains(e.target) || toggleBtn.contains(e.target)) return;
      closeMenu();
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Active nav-link highlighting                                            */
  /* ---------------------------------------------------------------------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  /* ---------------------------------------------------------------------- */
  /* Scroll progress bar                                                     */
  /* ---------------------------------------------------------------------- */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = h.scrollHeight > h.clientHeight
        ? (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
        : 0;
      progress.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------- */
  /* Cursor glow / mouse-follow light                                        */
  /* ---------------------------------------------------------------------- */
  const glow = document.querySelector('.cursor-glow');
  if (glow && !window.matchMedia('(hover: none)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    (function animate() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    })();
  }

  /* ---------------------------------------------------------------------- */
  /* Back to top                                                             */
  /* ---------------------------------------------------------------------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------------------------------------------------------------------- */
  /* Reveal on scroll                                                        */
  /* ---------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('.reveal');
  if (revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(t => io.observe(t));
  }

  /* ---------------------------------------------------------------------- */
  /* Animated counters                                                       */
  /* ---------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.num[data-count]');
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = target * eased;
        el.textContent = (Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------------------------------------------------------------------- */
  /* Ripple effect on buttons                                                */
  /* ---------------------------------------------------------------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const circle = document.createElement('span');
      circle.className = 'ripple';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ---------------------------------------------------------------------- */
  /* Hover tilt (opt-in via .tilt class)                                     */
  /* ---------------------------------------------------------------------- */
  if (!window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* Magnetic primary buttons */
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.16}px, ${y * 0.32}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Newsletter validation (footer + blog sidebar, every page)               */
  /* ---------------------------------------------------------------------- */
  document.querySelectorAll('.newsletter-mini').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (!ok) {
        showToast('Invalid email', 'Please enter a valid email address.', 'error');
        input.focus();
        return;
      }
      showToast('Subscribed', 'You\u2019re on the list for VYRA insights.', 'success');
      input.value = '';
    });
  });

  /* ---------------------------------------------------------------------- */
  /* Lazy-loaded images (progressive enhancement, data-src)                  */
  /* ---------------------------------------------------------------------- */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          io.unobserve(img);
        }
      });
    });
    lazyImgs.forEach(img => io.observe(img));
  }
})();

/* ==========================================================================
   Canvas hero animation — glowing neural network of nodes and connections
   with traveling data-packet particles. Runs on every .hero canvas found
   (full network on the home hero, a calmer version on inner-page heroes).
   ========================================================================== */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvases = document.querySelectorAll('.hero canvas');
  if (!canvases.length) return;

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    const section = canvas.closest('.hero');
    let width, height, nodes, dpr;
    const isMainHero = !section.classList.contains('hero-sub');
    const nodeCount = isMainHero ? 60 : 30;
    const maxDist = isMainHero ? 170 : 150;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 1,
        pulse: Math.random() * Math.PI * 2,
        packet: Math.random(),
        packetSpeed: Math.random() * 0.006 + 0.003,
        target: null
      }));
    }

    resize();
    makeNodes();
    window.addEventListener('resize', () => { resize(); makeNodes(); });

    if (reducedMotion) {
      drawStatic();
      return;
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(0,217,255,0.25)';
      nodes.forEach((n, i) => {
        nodes.slice(i + 1).forEach((m) => {
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        });
      });
      ctx.fillStyle = '#00D9FF';
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); });
    }

    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.pulse += 0.02;
      });

      // Draw connections + traveling data packets
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n = nodes[i], m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35;
            const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, `rgba(138,43,226,${alpha})`);
            grad.addColorStop(1, `rgba(0,217,255,${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            // Occasional traveling packet along this edge
            if ((i * 31 + j * 17 + frame) % 240 === 0) {
              n.packet = 0;
              n.target = m;
            }
          }
        }
      }

      // Draw packets that are currently traveling
      nodes.forEach(n => {
        if (n.target && n.packet < 1) {
          n.packet += n.packetSpeed * 2;
          const px = n.x + (n.target.x - n.x) * n.packet;
          const py = n.y + (n.target.y - n.y) * n.packet;
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
          if (n.packet >= 1) n.target = null;
        }
      });

      // Draw nodes with soft pulse glow
      nodes.forEach(n => {
        const pulseR = n.r + Math.sin(n.pulse) * 0.8;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 6);
        glow.addColorStop(0, 'rgba(0,217,255,0.55)');
        glow.addColorStop(1, 'rgba(0,217,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(tick);
    }
    tick();
  });
})();

/* ==========================================================================
   Homepage hero background video — pause when the tab isn't visible to
   save battery/bandwidth, and never autoplay if the user prefers reduced
   motion (CSS already hides the element; this stops the actual playback).
   ========================================================================== */
(() => {
  'use strict';
  const video = document.querySelector('.hero-video');
  if (!video) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    video.removeAttribute('autoplay');
    return;
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      video.play().catch(() => { /* autoplay can be blocked; poster/gradient fallback still shows */ });
    }
  });
})();
