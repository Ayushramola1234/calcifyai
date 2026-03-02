# CalcHub — Multi-Page Static Website

Production-ready static site with 40+ calculator pages.
Deploys to Firebase Hosting (or any static CDN) with zero backend.

---

## Folder Structure

```
calchub/
│
├── firebase.json              Firebase Hosting config
│                              (cache headers, clean URLs, 404 routing)
├── .firebaserc                Project ID alias — edit before deploying
│
├── _base-template.html        COPY THIS to create a new calculator page
├── _404.html                  Custom 404 — searchable, links to popular calcs
│
├── index.html                 Homepage (all 40 calculators, category grid)
├── mortgage-calculator.html
├── loan-calculator.html
├── bmi-calculator.html
├── [... 37 more pages follow the same pattern]
│
├── css/
│   ├── styles.css             Master stylesheet (design tokens, all components)
│   └── extras.css             Addons: sr-only, footer-tagline, search-input
│
└── js/
    ├── common.js              Data + pure utilities (no DOM)
    │                          ↳ window.CALCS[]    — calculator registry
    │                          ↳ window.UNIT_DATA  — conversion tables
    │                          ↳ window.fmt()      — number formatter
    │                          ↳ window.$()        — getElementById shorthand
    │                          ↳ window.showResult() / hideResult()
    │                          ↳ window.today(), gcd(), parseTimeStr(), fmtTime()
    │                          ↳ window.Sci         — scientific calc state
    │
    ├── site-header.js         <site-header> Web Component
    │                          ↳ Renders nav with logo + live search + home btn
    │                          ↳ Search reads window.CALCS[], highlights matches
    │                          ↳ Keyboard: ArrowUp/Down, Escape
    │                          ↳ Accepts `category` attribute for context
    │
    ├── site-footer.js         <site-footer> Web Component
    │                          ↳ Renders 4-column footer with all calc links
    │                          ↳ Highlights current page link automatically
    │
    └── page-init.js           Bootstrap (loaded last on every page)
                               ↳ "/" shortcut → focuses nav search
                               ↳ Smooth scroll offset for fixed nav
                               ↳ IntersectionObserver fade-in for homepage sections
                               ↳ Back-to-top button (auto-injected if page is tall)
                               ↳ window.trackCalc() stub for analytics
```

---

## How Every Page Works

```
<head>
  <!-- 1. SEO meta (unique per page) -->
  <!-- 2. Shared CSS -->
  <script src="js/common.js"></script>       ← loads CALCS[], fmt(), $ etc.
  <script src="js/site-header.js"></script>  ← registers <site-header>
  <script src="js/site-footer.js"></script>  ← registers <site-footer>
</head>

<body>
  <site-header category="financial"></site-header>   ← renders nav

  <div class="page-wrap">
    <main class="calc-page">
      <!-- breadcrumb, h1, form, result-box, related, seo-article -->
    </main>
  </div>

  <site-footer></site-footer>                         ← renders footer
  <script src="js/page-init.js"></script>             ← bootstrap

  <script>
    /* page-specific calculator logic only */
  </script>
</body>
```

**Script load order is intentional:**
`common.js` runs first so `window.CALCS` exists before the web components
call `connectedCallback()` and try to access it for search.

---

## Adding a New Calculator Page

1. **Copy the template**
   ```bash
   cp _base-template.html my-new-calculator.html
   ```

2. **Fill in every `<!-- EDIT -->` comment** in the file:
   - `<title>`, `<meta name="description">`, `<meta name="keywords">`
   - `<link rel="canonical">`
   - JSON-LD structured data
   - `<site-header category="...">` attribute
   - H1, subtitle, breadcrumb text
   - Form inputs and result rows
   - Related calculator links (pick 3–4 nearby pages)
   - SEO article section (~200 words)

3. **Write the calc logic** in the `<script>` block at the bottom:
   ```js
   function calculate() {
     const x = parseFloat($('my-input').value);
     if (!x) return alert('Enter a value');
     $('r-main').textContent = fmt(x * 2);
     showResult('result');
     trackCalc('my-calculator');   // analytics hook
   }
   ```

4. **Register in common.js** — add an entry to `window.CALCS[]`:
   ```js
   {
     id:   'myCalc',
     name: 'My New Calculator',
     cat:  'Financial',   // Financial | Health | Math | Other
     icon: '📊',
     url:  'my-new-calculator.html',
     tags: ['keyword1', 'keyword2', 'keyword3'],
     desc: 'Short description shown in search',
   },
   ```

5. **Add a card to index.html** in the right `<section>`:
   ```html
   <a href="my-new-calculator.html" class="calc-card">
     <div class="calc-card-icon">📊</div>
     <h3>My New Calculator</h3>
     <p>Short description</p>
   </a>
   ```

6. **Add 2–3 links in related-calcs sections** of nearby pages.

That's it. The shared header/footer/search update automatically.

---

## Deploying to Firebase Hosting

### First-time setup
```bash
npm install -g firebase-tools
firebase login
firebase init hosting       # select your project, set public dir to "."
```

### Edit .firebaserc
Replace `"your-firebase-project-id"` with your actual Firebase project ID.

### Deploy
```bash
firebase deploy --only hosting
```

Firebase will serve the site with:
- **Clean URLs** — `/mortgage-calculator` instead of `/mortgage-calculator.html`
- **Custom 404** — `_404.html` with search functionality
- **Cache headers** — HTML: 1 hour. CSS/JS: 7 days (immutable). Fonts: 1 year.
- **Security headers** — X-Frame-Options, X-Content-Type-Options, XSS protection

### Deploying to other static hosts

| Host | Command |
|------|---------|
| Netlify | `netlify deploy --dir . --prod` |
| Vercel | `vercel --prod` |
| GitHub Pages | push to `gh-pages` branch |
| Cloudflare Pages | connect GitHub repo, build command: none |

For Netlify, rename `_404.html` → `404.html` and add a `_redirects` file:
```
/*    /index.html    200
```

---

## CSS Class Quick Reference

### Layout
| Class | Use |
|-------|-----|
| `.page-wrap` | Outer wrapper with `padding-top:60px` for fixed nav |
| `.calc-page` | Centered content (max 580px) |
| `.calc-page.wide` | Wider content (max 740px) |
| `.row2` / `.row3` | 2- or 3-column input grid |

### Forms
| Class | Element |
|-------|---------|
| `.fg` | Form group `<div>` wrapper |
| `.fl` | Form label |
| `.fi` | `<input>` |
| `.fs` | `<select>` |
| `.pill-row` / `.pill` | Preset quick-fill buttons |
| `.check-row` | Checkbox row |

### Results
| Class | Appearance |
|-------|------------|
| `.result-box` | Container — hidden by default |
| `.result-box.show` | Visible (add via `showResult(id)`) |
| `.rr` | Result row (label + value, flex) |
| `.rr.big` | Large value row (1.4rem, green) |
| `.rr.big2` | Medium value row (1.2rem, cyan) |
| `.rv` | Value (cyan) |
| `.rv.good` / `.rv.warn` / `.rv.bad` | Green / yellow / red value |

### Components
| Class | Description |
|-------|-------------|
| `.tabs` / `.tab` / `.tab.active` | Tab switcher |
| `.badge.good/warn/bad/info` | Rounded status badge |
| `.info-box` | Cyan-tinted tip or disclaimer box |
| `.back-btn` | ← Back link (styled as pill) |
| `.breadcrumb` | SEO breadcrumb nav |
| `.related-calcs` | Related calculators section |
| `.related-card` | Individual related link card |
| `.table-wrap` | Horizontally scrollable table container |
| `.swap-btn` / `.conv-row` | Unit converter swap button |

---

## Design Tokens

```css
--bg:      #07070f   /* Page background          */
--surf:    #10101c   /* Cards, nav               */
--surf2:   #181828   /* Inputs, result boxes     */
--surf3:   #1e1e32   /* Hover states             */
--border:  #252540   /* All borders              */
--accent:  #6c63ff   /* Purple — primary action  */
--accent2: #00d4ff   /* Cyan — result values     */
--accent3: #ff6b35   /* Orange — logo accent     */
--green:   #00e676   /* Success / good           */
--red:     #ff4757   /* Error / cost / bad       */
--yellow:  #ffd32a   /* Warning                  */
--text:    #eeeef8   /* Primary text             */
--muted:   #6b6b9a   /* Placeholder, subtle text */
--muted2:  #9090b8   /* Labels, captions         */
```

---

## SEO Checklist (per page)

- [ ] Unique `<title>` — "Calculator Name – Description | CalcHub"
- [ ] `<meta name="description">` — 150–160 chars, starts with primary keyword
- [ ] `<meta name="keywords">` — 8–12 relevant phrases
- [ ] `<link rel="canonical">` — exact URL, no trailing slash
- [ ] JSON-LD `WebPage` schema with `name`, `description`, `url`, `isPartOf`
- [ ] Breadcrumb `<nav>` — Home › Calculator Name
- [ ] H1 contains exact primary keyword
- [ ] SEO article section (200+ words, 1–2 secondary keywords)
- [ ] 3–4 internal links to related pages
- [ ] Footer links back through all categories (automatic via `<site-footer>`)
