/**
 * CalcHub – ads.js
 *
 * <ad-unit> Web Component
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Attributes
 *   slot-id     Google AdSense ad slot ID              e.g. "1234567890"
 *   format      Ad format                              "auto" | "rectangle" | "leaderboard"
 *   label       Override the "Advertisement" label     optional
 *
 * Usage
 *   <ad-unit slot-id="1234567890" format="auto"></ad-unit>
 *
 * ── HOW TO GO LIVE ─────────────────────────────────────────
 *
 *  Step 1 — Add your publisher ID (once per site, in <head>):
 *
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 *
 *  Step 2 — Set the global flag BEFORE ads.js loads:
 *
 *    <script>window.CH_ADS_ENABLED = true; window.CH_ADS_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';</script>
 *
 *  Step 3 — Replace slot-id attributes with real slot IDs from AdSense dashboard.
 *
 *  Step 4 — Deploy. Placeholders become live ads automatically.
 *
 * ── AD FORMAT GUIDE ────────────────────────────────────────
 *
 *   format="auto"         Responsive — fills container width. Best default.
 *   format="rectangle"   300×250 medium rectangle. Highest CTR. Use in-article.
 *   format="leaderboard"  728×90 desktop / 320×50 mobile. Use between sections.
 *
 * ── ADSENSE POLICIES ───────────────────────────────────────
 *   • Max 3 content ads per page (auto-ads may add more)
 *   • Do not place ads above the fold if they crowd content
 *   • Label every ad unit "Advertisement" or "Sponsored"
 *   • Do not modify adsbygoogle.js or manipulate ad rendering
 *   • Calculator/tool pages must have substantial original content — ✅ done
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

class AdUnit extends HTMLElement {

  static get observedAttributes() {
    return ['slot-id', 'format', 'label'];
  }

  connectedCallback() {
    // Defer rendering until after main content paints — ads never block layout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this._render(), { timeout: 2000 });
    } else {
      setTimeout(() => this._render(), 300);
    }
  }

  _render() {
    const slotId  = this.getAttribute('slot-id') || '0000000000';
    const format  = this.getAttribute('format')  || 'auto';
    const label   = this.getAttribute('label')   || 'Advertisement';
    const enabled = window.CH_ADS_ENABLED === true;
    const client  = window.CH_ADS_CLIENT  || 'ca-pub-XXXXXXXXXXXXXXXX';

    // ── Height map for placeholders and min-height hints ──
    const heights = {
      'auto':        '120px',
      'rectangle':   '280px',
      'leaderboard': '90px',
    };
    const minH = heights[format] || heights['auto'];

    this.innerHTML = `
      <div class="ad-unit ad-unit--${format}" role="complementary" aria-label="${label}">
        <span class="ad-label">${label}</span>
        <div class="ad-slot" style="min-height:${minH};">
          ${enabled ? this._liveAd(client, slotId, format) : this._placeholder(format, slotId)}
        </div>
      </div>
    `;

    // Push live ad after inserting into DOM
    if (enabled) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense not loaded yet — auto-ads or deferred script will handle it
      }
    }
  }

  /** Real AdSense ins tag (production) */
  _liveAd(client, slotId, format) {
    const isResponsive = format === 'auto';
    const isRectangle  = format === 'rectangle';

    if (isResponsive) {
      return `<ins class="adsbygoogle"
                   style="display:block"
                   data-ad-client="${client}"
                   data-ad-slot="${slotId}"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>`;
    }
    if (isRectangle) {
      return `<ins class="adsbygoogle"
                   style="display:inline-block;width:336px;height:280px"
                   data-ad-client="${client}"
                   data-ad-slot="${slotId}"></ins>`;
    }
    // leaderboard
    return `<ins class="adsbygoogle"
                 style="display:inline-block;width:728px;height:90px"
                 data-ad-client="${client}"
                 data-ad-slot="${slotId}"></ins>`;
  }

  /** Development placeholder — matches dark theme */
  _placeholder(format, slotId) {
    const labels = {
      'auto':        'Responsive Ad (Auto)',
      'rectangle':   '336×280 In-Article Rectangle',
      'leaderboard': '728×90 Leaderboard / 320×50 Mobile',
    };
    const desc = labels[format] || labels['auto'];

    return `
      <div class="ad-placeholder">
        <svg class="ad-ph-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        <span class="ad-ph-format">${desc}</span>
        <span class="ad-ph-slot">slot-id: ${slotId}</span>
        <span class="ad-ph-note">Replace <code>window.CH_ADS_ENABLED = true</code> to go live</span>
      </div>
    `;
  }
}

customElements.define('ad-unit', AdUnit);
