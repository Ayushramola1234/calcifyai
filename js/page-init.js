/**
 * CalcHub – page-init.js
 *
 * Loaded at the end of <body> on every page (after common.js,
 * site-header.js, and site-footer.js).
 *
 * Responsibilities:
 *  1. Scroll-to-top on internal page links (SPA-feel, no actual SPA)
 *  2. Keyboard shortcut: "/" focuses search
 *  3. Analytics hook (stubbed — wire up GA4 / Plausible here)
 *  4. Lazy intersection observer for .cat-section fade-in
 *  5. Print-friendly cleanup
 */

(function () {
  'use strict';

  /* ── 1. "/" shortcut → focus search ─────────────────────── */
  document.addEventListener('keydown', e => {
    // Only when no input is focused
    if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const input = document.getElementById('ch-search');
      if (input) { input.focus(); input.select(); }
    }
  });

  /* ── 2. Smooth scroll offset for fixed nav ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + scrollY - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 3. Fade-in animation for home page sections ─────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 }
    );

    document.querySelectorAll('.cat-section').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }

  /* ── 4. Analytics hook ───────────────────────────────────── */
  // Replace this stub with your GA4 / Plausible / Fathom tracking:
  //
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){ dataLayer.push(arguments); }
  //   gtag('js', new Date());
  //   gtag('config', 'G-XXXXXXXXXX');
  //
  // For Plausible:
  //   <script defer data-domain="calchub.com" src="https://plausible.io/js/script.js"></script>
  //
  // Firing calc-complete custom events:
  window.trackCalc = function (calculatorId) {
    if (typeof gtag === 'function') {
      gtag('event', 'calc_complete', { calculator: calculatorId });
    }
    // Plausible: plausible('Calc Complete', { props: { calculator: calculatorId }});
  };

  /* ── 5. Back-to-top button (injected if page > 1 screen) ── */
  const injectBackToTop = () => {
    if (document.body.scrollHeight <= window.innerHeight * 1.5) return;

    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    btn.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:100;
      width:42px; height:42px; border-radius:50%;
      background:var(--accent); color:#fff;
      border:none; cursor:pointer;
      font-size:1.1rem; font-weight:700;
      box-shadow:0 4px 16px rgba(108,99,255,.4);
      opacity:0; transform:translateY(8px);
      transition:opacity .25s, transform .25s;
      display:flex; align-items:center; justify-content:center;
    `;

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);

    const toggle = () => {
      const show = window.scrollY > 300;
      btn.style.opacity = show ? '1' : '0';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(8px)';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    };

    window.addEventListener('scroll', toggle, { passive: true });
  };

  // Wait for layout to settle
  window.addEventListener('load', injectBackToTop);

})();
