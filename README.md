# Robert Frederick — Portfolio Site

Built with React 18 + Vite. Deployed on Vercel.

---

## Before You Deploy — Required Steps

### 1. Add Your PDF Assets

Place the following three files in `/public/assets/`:

| File | Path in project |
|------|----------------|
| Your resume | `public/assets/RobertFrederick_Resume.pdf` |
| NSF work sample | `public/assets/RobertFrederick_StrategicInitiativesWorkSample.pdf` |
| Finance transformation POV essay | `public/assets/RobertFrederick_FinanceTransformation_POV.pdf` |

These match the paths in `src/App.jsx` under the `ASSETS` constant at the top of the file.
If you rename files, update the `ASSETS` constant to match.

### 2. Confirm the Cycle Time Analyzer URL

The tool URL is currently set to your Vercel preview URL:
```
https://cycle-time-analyzer-75v48q9lr-robert-fs-projects-2268098e.vercel.app/
```
Preview URLs rotate when the project redeployes. Before going live, point the Cycle Time
Analyzer at a stable production domain or alias, then update `ASSETS.tool_CycleTimeAnalyzer`
in `src/App.jsx`.

### 3. Confirm Your LinkedIn URL

The `ASSETS.linkedin` value is currently:
```
https://www.linkedin.com/in/roberthfrederick/
```
Confirm this is the canonical URL for your profile.

---

## Local Development

```bash
# Install dependencies (first time only)
npm install

# Run local dev server at http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deploying to Vercel

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI if you don't have it
npm install -g vercel

# From the project root:
vercel

# Follow the prompts:
#   Set up and deploy? Y
#   Which scope? (your account)
#   Link to existing project? N
#   Project name: robert-frederick-portfolio (or whatever you prefer)
#   Directory: ./  (press Enter)
#   Override settings? N
```

Vercel will auto-detect Vite, set the build command to `vite build`,
and output directory to `dist`. No manual config needed.

For subsequent deploys:
```bash
vercel --prod
```

### Option B — GitHub + Vercel (recommended for ongoing updates)

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → Add New Project.
3. Import the GitHub repo.
4. Vercel auto-detects Vite — accept all defaults.
5. Click **Deploy**.

Every push to `main` will trigger an automatic redeploy.

---

## Custom Domain

1. In the Vercel dashboard, open your project → **Settings** → **Domains**.
2. Add `robertfrederick-mba.com` (and `www.robertfrederick-mba.com`).
3. Follow Vercel's DNS instructions (usually two CNAME/A records at your registrar).
4. Vercel provisions SSL automatically — no action needed.

---

## Adding Content Over Time

### New work sample or essay
1. Drop the PDF into `public/assets/`.
2. Add a new entry to the `ASSETS` constant in `src/App.jsx`.
3. Add a new card in the relevant section (Work Samples or Insights).

### New tool
1. Deploy the tool to Vercel (it can be a separate project/repo).
2. Add a stable production URL to `ASSETS` in `src/App.jsx`.
3. Add a new tool card in the Tools section, following the existing pattern.

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg          # RF monogram favicon (navy + gold)
│   └── assets/              # ← DROP YOUR PDFs HERE
│       ├── RobertFrederick_Resume.pdf
│       ├── RobertFrederick_StrategicInitiativesWorkSample.pdf
│       └── RobertFrederick_FinanceTransformation_POV.pdf
├── src/
│   ├── App.jsx              # Main site component (all content lives here)
│   └── main.jsx             # React entry point (do not edit)
├── index.html               # HTML shell with meta tags and OG data
├── package.json
├── vite.config.js
├── vercel.json              # SPA routing + security headers + asset caching
├── .gitignore
└── README.md
```

---

## Updating Meta / SEO

Open `index.html` and update:
- `<title>` — page title shown in browser tab and search results
- `<meta name="description">` — search snippet
- `<meta property="og:url">` — your canonical domain once live
- `<meta property="og:title">` and `og:description` — LinkedIn/social preview text
