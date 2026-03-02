/**
 * CalcifyAI – Homepage Search Bar
 *
 * Wires the "Search for a calculator..." input + "Find Tool" button
 * on index.html to the window.CALCS registry from common.js.
 *
 * Renders a live dropdown below the search card, navigates on Enter or click.
 * Injected only on the homepage — zero impact on calculator pages.
 */

(function () {
  'use strict';

  // Only run on the homepage
  const isHome = location.pathname.endsWith('index.html') ||
    location.pathname === '/' ||
    location.pathname.endsWith('/');

  if (!isHome) return;

  // Wait for DOM + common.js CALCS to be available
  function init() {
    const input = document.querySelector('input[placeholder="Search for a calculator..."]');
    const btn   = document.querySelector('button span');  // "Find Tool" button text

    if (!input) return;

    // Wrap the search card in a relative container for dropdown positioning
    const card = input.closest('.max-w-3xl');
    if (!card) return;
    card.style.position = 'relative';

    // ── Build dropdown ─────────────────────────────────────────
    const dropdown = document.createElement('div');
    dropdown.id = 'home-search-dropdown';
    dropdown.style.cssText = `
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: 0; right: 0;
      background: #1c2333;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 0.75rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      z-index: 100;
      overflow: hidden;
      max-height: 380px;
      overflow-y: auto;
    `;

    // Light mode override
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      html:not(.dark) #home-search-dropdown {
        background: #fff;
        border-color: #e2e8f0;
        box-shadow: 0 20px 40px rgba(0,0,0,0.12);
      }
      .hsd-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        cursor: pointer;
        text-decoration: none;
        border-bottom: 1px solid rgba(255,255,255,0.04);
        transition: background .12s;
      }
      html:not(.dark) .hsd-item { border-bottom-color: #f1f5f9; }
      .hsd-item:last-child { border-bottom: none; }
      .hsd-item:hover, .hsd-item:focus { background: rgba(43,108,238,0.12); outline: none; }
      html:not(.dark) .hsd-item:hover { background: #eff6ff; }
      .hsd-icon { font-size: 1.25rem; flex-shrink: 0; width: 24px; text-align: center; }
      .hsd-name { font-family: Inter, sans-serif; font-size: 0.875rem; font-weight: 600; color: #e2e8f0; }
      html:not(.dark) .hsd-name { color: #1e293b; }
      .hsd-cat  { font-family: Inter, sans-serif; font-size: 0.7rem; color: #64748b; margin-top: 1px; }
      .hsd-desc { font-family: Inter, sans-serif; font-size: 0.75rem; color: #64748b; margin-top: 1px; }
      .hsd-empty { padding: 20px; text-align: center; font-family: Inter, sans-serif; font-size: 0.875rem; color: #64748b; }
      mark.hsd-hl { background: rgba(43,108,238,0.25); color: #60a5fa; border-radius: 2px; }
      html:not(.dark) mark.hsd-hl { background: rgba(43,108,238,0.12); color: #2b6cee; }
      #home-search-dropdown::-webkit-scrollbar { width: 6px; }
      #home-search-dropdown::-webkit-scrollbar-track { background: transparent; }
      #home-search-dropdown::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
    `;
    document.head.appendChild(styleEl);
    card.appendChild(dropdown);

    // ── Category colour map ────────────────────────────────────
    const catColor = {
      Financial: '#34d399',
      Health:    '#f472b6',
      Math:      '#818cf8',
      Other:     '#fb923c',
    };

    // ── Helpers ────────────────────────────────────────────────
    function esc(s) {
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function highlight(text, q) {
      const idx = text.toLowerCase().indexOf(q.toLowerCase());
      if (idx === -1) return esc(text);
      return esc(text.slice(0, idx)) +
        `<mark class="hsd-hl">${esc(text.slice(idx, idx + q.length))}</mark>` +
        esc(text.slice(idx + q.length));
    }

    function showDropdown(results, q) {
      dropdown.style.display = 'block';

      if (!results.length) {
        dropdown.innerHTML = `<div class="hsd-empty">No results for "<strong>${esc(q)}</strong>"</div>`;
        return;
      }

      dropdown.innerHTML = results.map((c, i) => `
        <a href="${esc(c.url)}" class="hsd-item" tabindex="0" data-idx="${i}">
          <span class="hsd-icon">${c.icon || '🔢'}</span>
          <span style="flex:1; min-width:0;">
            <div class="hsd-name">${highlight(c.name, q)}</div>
            <div class="hsd-cat" style="color:${catColor[c.cat] || '#64748b'}">${esc(c.cat)}</div>
            ${c.desc ? `<div class="hsd-desc">${esc(c.desc)}</div>` : ''}
          </span>
        </a>
      `).join('');
    }

    function hideDropdown() {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
    }

    function runSearch(q) {
      q = q.trim();
      if (!q) { hideDropdown(); return; }

      const CALCS = window.CALCS || [];
      const results = CALCS.filter(c =>
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.cat.toLowerCase().includes(q.toLowerCase()) ||
        (c.tags || []).some(t => t.includes(q.toLowerCase())) ||
        (c.desc || '').toLowerCase().includes(q.toLowerCase())
      ).slice(0, 8);

      showDropdown(results, q);
    }

    // ── Keyboard navigation inside dropdown ────────────────────
    function getItems() {
      return [...dropdown.querySelectorAll('.hsd-item')];
    }

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const first = getItems()[0];
        if (first) first.focus();
      } else if (e.key === 'Escape') {
        hideDropdown();
        input.blur();
      } else if (e.key === 'Enter') {
        const q = input.value.trim();
        const CALCS = window.CALCS || [];
        const match = CALCS.find(c =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          (c.tags || []).some(t => t.includes(q.toLowerCase()))
        );
        if (match) window.location.href = match.url;
      }
    });

    dropdown.addEventListener('keydown', e => {
      const items = getItems();
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < items.length - 1) items[idx + 1].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) items[idx - 1].focus(); else input.focus();
      } else if (e.key === 'Escape') {
        hideDropdown(); input.focus();
      }
    });

    // ── Wire input ─────────────────────────────────────────────
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => runSearch(input.value), 120);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) runSearch(input.value);
    });

    // Find Tool button
    const findBtn = input.closest('div.relative')?.querySelector('button');
    if (findBtn) {
      findBtn.addEventListener('click', () => {
        const q = input.value.trim();
        if (!q) { input.focus(); return; }
        const CALCS = window.CALCS || [];
        const match = CALCS.find(c =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          (c.tags || []).some(t => t.includes(q.toLowerCase()))
        );
        if (match) window.location.href = match.url;
        else runSearch(q);
      });
    }

    // Click outside closes
    document.addEventListener('click', e => {
      if (!card.contains(e.target)) hideDropdown();
    });

    // "/" shortcut focuses search
    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // Wait for both DOM and common.js to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Give common.js a moment to define window.CALCS
      setTimeout(init, 50);
    });
  } else {
    setTimeout(init, 50);
  }
})();
