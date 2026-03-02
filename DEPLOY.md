# 🚀 CalcHub — Firebase Hosting Deployment Guide

## Prerequisites

Before you begin, make sure you have:

1. **A Google Account** (Gmail works)
2. **Node.js installed** (v18+ recommended) — [Download here](https://nodejs.org/)
3. **A terminal** (PowerShell, Command Prompt, or Git Bash on Windows)

---

## Step 1: Install Firebase CLI

Open your terminal and run:

```bash
npm install -g firebase-tools
```

Verify it installed correctly:

```bash
firebase --version
```

You should see something like `13.x.x` or higher.

---

## Step 2: Log In to Firebase

```bash
firebase login
```

This opens a browser window. Sign in with your Google account and grant permissions.
Once done, you'll see: **✔ Success! Logged in as your-email@gmail.com**

---

## Step 3: Create a Firebase Project

### Option A: Through the Firebase Console (Recommended for first-timers)

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Enter a project name — e.g. `calchub` or `calchub-prod`
4. Disable Google Analytics (not needed for static hosting) or enable it if you want
5. Click **"Create project"**
6. Wait for it to finish, then click **"Continue"**
7. Copy your **Project ID** from the project settings — it looks like `calchub-12345`

### Option B: Through the CLI

```bash
firebase projects:create calchub-prod --display-name "CalcHub"
```

> Replace `calchub-prod` with your desired project ID (must be globally unique).

---

## Step 4: Connect Your Project

Open the file `.firebaserc` in the CalcHub folder and replace the placeholder:

```json
{
  "projects": {
    "default": "YOUR-FIREBASE-PROJECT-ID"
  },
  "targets": {},
  "etags": {}
}
```

Replace `YOUR-FIREBASE-PROJECT-ID` with the actual project ID from Step 3.

**Example:**
```json
{
  "projects": {
    "default": "calchub-12345"
  },
  "targets": {},
  "etags": {}
}
```

Alternatively, run this command from the CalcHub folder:

```bash
firebase use --add
```

Select your project from the list and give it the alias `default`.

---

## Step 5: Preview Locally (Optional but Recommended)

Before deploying to the internet, preview your site locally:

```bash
cd d:\calchub
firebase emulators:start --only hosting
```

This starts a local server at `http://localhost:5000`. Open it in your browser to verify everything looks right.

Press `Ctrl+C` to stop the local server.

---

## Step 6: Deploy to Firebase Hosting

From your CalcHub project folder:

```bash
cd d:\calchub
firebase deploy --only hosting
```

You'll see output like:

```
=== Deploying to 'calchub-12345'...

i  deploying hosting
i  hosting[calchub-12345]: beginning deploy...
i  hosting[calchub-12345]: found 25 files in .
✔  hosting[calchub-12345]: file upload complete
i  hosting[calchub-12345]: finalizing version...
✔  hosting[calchub-12345]: version finalized
i  hosting[calchub-12345]: releasing new version...
✔  hosting[calchub-12345]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/calchub-12345/overview
Hosting URL: https://calchub-12345.web.app
```

**Your site is now live!** 🎉

You'll get two free URLs:
- `https://calchub-12345.web.app`
- `https://calchub-12345.firebaseapp.com`

---

## Step 7: Connect a Custom Domain (Optional)

If you own `calchub.com` or another domain:

### Via Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/) → Your project → **Hosting**
2. Click **"Add custom domain"**
3. Enter your domain: `calchub.com`
4. Firebase will give you **DNS records** to add to your domain registrar:
   - Usually a **TXT record** for verification
   - Then **A records** pointing to Firebase IPs

### DNS Records to Add (at your domain registrar):

| Type | Host/Name    | Value                      |
|------|-------------|----------------------------|
| TXT  | @           | (Firebase gives you this)  |
| A    | @           | 151.101.1.195              |
| A    | @           | 151.101.65.195             |
| AAAA | @           | (Firebase gives you this)  |
| CNAME| www         | calchub-12345.web.app      |

> The exact IP addresses and values will be shown in the Firebase Console. Use those values, not the ones above.

5. Wait for DNS propagation (can take 5 minutes to 48 hours)
6. Firebase will automatically provision a **free SSL certificate** for your domain

---

## What's Already Configured

Your `firebase.json` is already production-optimized. Here's what it does:

| Feature | Configuration | Effect |
|---------|--------------|--------|
| **Clean URLs** | `"cleanUrls": true` | `/mortgage-calculator` works (no `.html` needed) |
| **No trailing slash** | `"trailingSlash": false` | `/about` not `/about/` |
| **Custom 404** | `"404": "_404.html"` | Your branded error page |
| **HTML caching** | `max-age=3600, stale-while-revalidate=86400` | 1hr cache, serves stale for 24hr while revalidating |
| **CSS/JS caching** | `max-age=31536000, immutable` | 1-year cache, never re-downloaded until file changes |
| **Security headers** | CSP, X-Frame-Options, etc. | Protection against XSS, clickjacking, MIME sniffing |
| **Template ignored** | `_base-template.html` in ignore list | Template never uploaded to hosting |

---

## Common Commands Reference

```bash
# Log in to Firebase
firebase login

# See which project is active
firebase use

# Preview locally before deploying
firebase emulators:start --only hosting

# Deploy to production
firebase deploy --only hosting

# Deploy with a custom message (useful for tracking)
firebase deploy --only hosting -m "Added 5 new calculators"

# See deployment history
firebase hosting:channel:list

# Create a temporary preview URL (for testing before going live)
firebase hosting:channel:deploy preview

# Open your live site
firebase open hosting:site

# Log out
firebase logout
```

---

## Redeploying After Changes

Every time you make changes to your HTML, CSS, or JS files, just run:

```bash
cd d:\calchub
firebase deploy --only hosting
```

That's it. Firebase handles everything else — cache invalidation, CDN distribution, SSL.

---

## Estimated Costs

Firebase Hosting is **free** for most static sites:

| Resource | Free Tier (Spark Plan) |
|----------|----------------------|
| Storage | 10 GB |
| Data transfer | 360 MB/day (~10 GB/month) |
| Custom domain | ✅ Included |
| SSL certificate | ✅ Auto-provisioned |
| Global CDN | ✅ Included |

For a calculator site, you'd need **millions** of daily visitors to exceed the free tier.

---

## Troubleshooting

### "Permission denied" error
```bash
firebase login --reauth
```

### "Project not found" error
Verify your project ID in `.firebaserc` matches exactly what's in the Firebase Console.

### Changes not showing after deploy
- Hard refresh: `Ctrl + Shift + R` in your browser
- Or clear browser cache
- CSS/JS have 1-year immutable cache — Firebase auto-busts this on deploy

### "Command not found: firebase"
Reinstall the CLI:
```bash
npm install -g firebase-tools
```

### Deploy from a different computer
Just install Firebase CLI, run `firebase login`, and `firebase deploy` from the project folder. The config files (`firebase.json`, `.firebaserc`) travel with the project.
