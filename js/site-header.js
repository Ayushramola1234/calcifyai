/**
 * CalcHub – <site-header> Web Component
 *
 * Usage in every page:
 *   <site-header category="financial"></site-header>
 *
 * The `category` attribute highlights the correct nav group in the search
 * dropdown and is used for breadcrumb colouring. Optional.
 *
 * Works on Firebase Hosting (and any static host) — zero backend required.
 */

class SiteHeader extends HTMLElement {

  /* ── Observed attributes ─────────────────────────────────── */
  static get observedAttributes() {
    return ['category'];
  }

  /* ── Lifecycle: element added to DOM ─────────────────────── */
  connectedCallback() {
    this.classList.add('block', 'sticky', 'top-0', 'z-50', 'w-full');
    this._render();
    this._bindSearch();
    this._bindThemeToggle();
    this._markActivePage();
  }

  /* ── Render nav HTML ─────────────────────────────────────── */
  _render() {
    // --- NEW STITCH HEADER INTERFACE ---
    this.innerHTML = `
      <header class="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <a href="index.html" class="flex items-center gap-3" style="text-decoration: none;">
                  <div class="size-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20" style="width: 32px; height: 32px;">
                      <span class="material-symbols-outlined text-[20px]" style="font-size: 20px;">calculate</span>
                  </div>
                  <h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white" style="margin: 0; font-size: 1.25rem;">CalcifyAI</h1>
              </a>
              <nav class="hidden md:flex items-center gap-8">
                  <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="index.html">Tools</a>
                  <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">API</a>
                  <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Pricing</a>
                  <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Company</a>
              </nav>
              <div class="flex items-center gap-3">
                  <button id="theme-toggle" class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full transition-colors flex items-center justify-center" aria-label="Toggle Dark Mode" style="background:none; border:none; cursor:pointer;">
                      <span class="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                      <span class="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                  </button>
                  <button class="hidden sm:flex text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm px-3 py-2" style="background:none; border:none; cursor:pointer;">Log In</button>
                  <button class="bg-primary hover:bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40" style="border:none; cursor:pointer;">Get Started</button>
              </div>
          </div>
      </header>
    `;
  }

  /* ── Theme Toggle logic ───────────────────────────────────── */
  _bindThemeToggle() {
    const btn = this.querySelector('#theme-toggle');
    if (!btn) return;

    // Check saved preference or system preference
    if (localStorage.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }

    btn.addEventListener('click', () => {
      // Toggle the 'dark' class on the HTML element
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }
    });
  }

  /* ── Live search logic ───────────────────────────────────── */
  _bindSearch() {
    const input = this.querySelector('#ch-search');
    const drawer = this.querySelector('#ch-search-results');
    if (!input || !drawer) return;

    // Debounce for performance
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this._runSearch(input, drawer), 120);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) this._runSearch(input, drawer);
    });

    // Keyboard: Escape closes drawer
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this._closeDrawer(input, drawer);
        input.blur();
      }
      // Arrow-key navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const first = drawer.querySelector('a');
        if (first) first.focus();
      }
    });

    // Trap arrow keys inside results
    drawer.addEventListener('keydown', e => {
      const items = [...drawer.querySelectorAll('a')];
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && idx < items.length - 1) {
        e.preventDefault(); items[idx + 1].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) items[idx - 1].focus(); else input.focus();
      } else if (e.key === 'Escape') {
        this._closeDrawer(input, drawer); input.focus();
      }
    });

    // Click outside → close
    document.addEventListener('click', e => {
      if (!this.contains(e.target)) this._closeDrawer(input, drawer);
    });
  }

  _runSearch(input, drawer) {
    const q = input.value.trim().toLowerCase();

    if (!q) { this._closeDrawer(input, drawer); return; }

    // CALCS is the global registry defined in common.js
    const results = (window.CALCS || [])
      .filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.cat.toLowerCase().includes(q) ||
        (c.tags || []).some(t => t.includes(q))
      )
      .slice(0, 8);

    const catColors = {
      Financial: 'var(--accent)',
      Health: 'var(--green)',
      Math: 'var(--accent2)',
      Other: 'var(--accent3)',
    };

    if (!results.length) {
      drawer.innerHTML = `
        <div class="search-no-results" role="option">
          No calculators match "<strong>${this._escape(q)}</strong>"
        </div>`;
    } else {
      drawer.innerHTML = results.map((c, i) => `
        <a
          href="${c.url}"
          class="search-result-item"
          role="option"
          id="ch-opt-${i}"
          tabindex="-1"
        >
          <span class="sri-icon" aria-hidden="true">${c.icon}</span>
          <span class="sri-text">
            <span class="sri-name">${this._highlight(c.name, q)}</span>
            <span class="sri-cat" style="color:${catColors[c.cat] || 'var(--muted)'}">
              ${c.cat}
            </span>
          </span>
        </a>
      `).join('');
    }

    drawer.classList.add('open');
    input.setAttribute('aria-expanded', 'true');
  }

  _closeDrawer(input, drawer) {
    drawer.classList.remove('open');
    input.setAttribute('aria-expanded', 'false');
  }

  /** Highlight the matched portion of a result name */
  _highlight(text, query) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return this._escape(text);
    return (
      this._escape(text.slice(0, idx)) +
      `<mark style="background:rgba(108,99,255,.25);color:var(--accent);border-radius:2px;">` +
      this._escape(text.slice(idx, idx + query.length)) +
      `</mark>` +
      this._escape(text.slice(idx + query.length))
    );
  }

  /** Basic XSS guard for user-typed query reflected into innerHTML */
  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Highlight logo/home when on index page ──────────────── */
  _markActivePage() {
    const page = location.pathname.split('/').pop() || 'index.html';
    if (page === 'index.html' || page === '') {
      const logo = this.querySelector('.nav-logo');
      if (logo) logo.setAttribute('aria-current', 'page');
    }
  }
}

/* ── Register ────────────────────────────────────────────── */
customElements.define('site-header', SiteHeader);
