/* ═══════════════════════════════════════════════════════
   Portfolio — JS
   Scroll animations, hamburger menu, counter animation
════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── HAMBURGER MENU ── */
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
    });
  }

  /* ══════════════════════════════════
     INTERSECTION OBSERVER — fade in
  ══════════════════════════════════ */
  const revealTargets = document.querySelectorAll(`
    .card,
    .work-card,
    .exp-card,
    .stats-section,
    .see-more-section,
    .testimonial-card,
    .footer-card,
    .bottom-bar,
    .section-heading,
    .status-bar
  `);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings inside experience grid
        const delay = entry.target.closest('.experience-grid')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 120
          : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => observer.observe(el));

  /* ══════════════════════════════════
     COUNTER ANIMATION for stats
  ══════════════════════════════════ */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const rawText = el.textContent.trim();
    const suffix = rawText.replace(/[0-9]/g, '');   // e.g. '+', '%'
    const target = parseInt(rawText.replace(/\D/g, ''), 10);
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ══════════════════════════════════
     MARQUEE — duplicate for seamless loop
     (already duplicated in HTML, but
      let's ensure it's always enough)
  ══════════════════════════════════ */
  const track = document.querySelector('.email-marquee-track');
  if (track) {
    // Already has 6 copies; make sure width fills at least 2× container
    const containerWidth = track.parentElement.offsetWidth;
    const trackWidth = track.scrollWidth / 2; // half because we duplicated

    if (trackWidth < containerWidth * 2) {
      // Clone more spans if needed
      const spans = Array.from(track.querySelectorAll('span'));
      spans.forEach(s => {
        const clone = s.cloneNode(true);
        track.appendChild(clone);
      });
    }
  }

  /* ══════════════════════════════════
     WORK CARDS — subtle hover tilt
  ══════════════════════════════════ */
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      card.style.transform = 'translate(-3px, -3px)';
      card.style.boxShadow = '9px 9px 0 #0a0a0a';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  /* ══════════════════════════════════
     SOCIAL BUTTONS — ripple on click
  ══════════════════════════════════ */
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;width:6px;height:6px;background:#E88020;
        border-radius:50%;pointer-events:none;
        animation:ripple-out 0.45s ease forwards;
        left:50%;top:50%;transform:translate(-50%,-50%);
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 450);
    });
  });

  // Inject ripple keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-out {
      0%   { width: 6px; height: 6px; opacity: 1; }
      100% { width: 60px; height: 60px; opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  /* ══════════════════════════════════
     PIXEL CURSOR (desktop only)
  ══════════════════════════════════ */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.id = 'pixel-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: #E88020;
      pointer-events: none;
      z-index: 9999;
      top: 0; left: 0;
      transform: translate(-50%, -50%);
      transition: transform 0.08s, width 0.15s, height 0.15s, background 0.15s;
      image-rendering: pixelated;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });

    // Grow on hovering links/buttons
    document.querySelectorAll('a, button, .work-card, .exp-card, .social-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '18px';
        cursor.style.height = '18px';
        cursor.style.background = '#0a0a0a';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.background = '#E88020';
      });
    });
  }

  /* ══════════════════════════════════
     PAGE LOAD — animate hero first
  ══════════════════════════════════ */
  window.addEventListener('load', () => {
    const navCard = document.querySelector('.card--nav');
    if (navCard) {
      navCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      navCard.classList.add('visible');
    }
  });

});
