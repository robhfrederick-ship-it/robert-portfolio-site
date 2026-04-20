import { useState, useEffect, useRef } from "react";

// ── Assets ─────────────────────────────────────────────────────────────────
// All external URLs and hosted file paths live here. Swap in production paths
// as you upload to Vercel. PDFs assumed to live under /assets/ in the public dir.
const ASSETS = {
  resume:                   "/assets/RobertFrederick_Resume.pdf",
  workSample_NSF:           "/assets/RobertFrederick_StrategicInitiativesWorkSample.pdf",
  article_FinanceTransform: "/assets/RobertFrederick_FinanceTransformation_POV.pdf",
  tool_CycleTimeAnalyzer:   "https://cycle-time-analyzer-75v48q9lr-robert-fs-projects-2268098e.vercel.app/",
  linkedin:                 "https://www.linkedin.com/in/roberthfrederick/",
  email:                    "rob.h.frederick@gmail.com",
  calendly:                 "https://calendly.com/rob-h-frederick/30min",
  headshot:                 "/assets/RobertFrederick_Headshot.png",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');`;

const CSS = `
${FONTS}

:root {
  --navy:    #0d1b2a;
  --navy2:   #132236;
  --navy3:   #1a2f47;
  --gold:    #c8960a;
  --gold2:   #e8b020;
  --gold3:   #f5c842;
  --cream:   #f5f0e8;
  --cream2:  #ede8df;
  --warm:    #7a6e5f;
  --text:    #1a1a2e;
  --muted:   #5a6070;
  --border:  rgba(200,150,10,0.18);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--cream);
  color: var(--text);
  overflow-x: hidden;
}

/* ── Navigation ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
  height: 68px;
  background: rgba(13,27,42,0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(200,150,10,0.15);
  transition: all .3s;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.3px;
}

.nav-headshot {
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center top;
  border-radius: 50%;
  border: 1px solid rgba(232,176,32,0.45);
  flex-shrink: 0;
  display: block;
}

.nav-logo-text {
  display: inline-block;
}

.nav-logo span { color: var(--gold2); }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-link {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  text-decoration: none;
  transition: color .2s;
  background: none; border: none;
}
.nav-link:hover { color: var(--gold2); }
.nav-cta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 8px 18px;
  background: var(--gold);
  border: 1px solid var(--gold);
  color: var(--navy);
  cursor: pointer;
  text-decoration: none;
  transition: all .2s;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.nav-cta:hover { background: var(--gold3); border-color: var(--gold3); }

/* ── Hero ── */
.hero {
  min-height: 100vh;
  background: var(--navy);
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 48px 80px;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(200,150,10,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200,150,10,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}
.hero::after {
  content: '';
  position: absolute; left: 0; top: 20%; bottom: 20%;
  width: 3px;
  background: linear-gradient(to bottom, transparent, var(--gold), transparent);
}
.hero-inner { max-width: 1000px; position: relative; z-index: 1; }
.hero-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 28px;
  opacity: 0;
  animation: fadeUp .6s ease .1s forwards;
}
.hero-sequence { margin-bottom: 36px; }
.hero-step {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  opacity: 0;
  transform: translateX(-20px);
}
.hero-step.gold { color: var(--gold2); }
.hero-step:nth-child(1) { animation: slideIn .5s ease .2s forwards; }
.hero-step:nth-child(2) { animation: slideIn .5s ease .4s forwards; }
.hero-step:nth-child(3) { animation: slideIn .5s ease .6s forwards; }

@keyframes slideIn { to { opacity: 1; transform: translateX(0); } }
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(8px); }
}

.hero-sub {
  font-size: 17px;
  font-weight: 300;
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 48px;
  opacity: 0;
  animation: fadeUp .6s ease .85s forwards;
}
.hero-sub em {
  font-style: normal;
  color: rgba(255,255,255,0.95);
  font-weight: 400;
}
.hero-ctas {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp .6s ease 1s forwards;
}
.btn-primary {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 14px 30px;
  background: var(--gold);
  color: var(--navy);
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all .2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.btn-primary:hover { background: var(--gold3); }
.btn-outline {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 14px 30px;
  background: transparent;
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.28);
  cursor: pointer;
  text-decoration: none;
  transition: all .2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold2); }

.hero-credentials {
  position: absolute;
  bottom: 40px; right: 48px;
  display: flex; gap: 28px;
  opacity: 0;
  animation: fadeUp .6s ease 1.15s forwards;
}
.hero-cred { text-align: right; }
.hero-cred-num {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 600;
  color: var(--gold2);
  line-height: 1;
}
.hero-cred-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-top: 4px;
}

/* ── Proof Strip ── */
.proof-strip {
  background: var(--navy2);
  padding: 40px 48px;
  border-top: 1px solid rgba(200,150,10,0.08);
  border-bottom: 1px solid rgba(200,150,10,0.08);
}
.proof-strip-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 28px;
}
.proof-item {
  padding-left: 14px;
  border-left: 2px solid var(--gold);
}
.proof-text {
  font-size: 12.5px;
  font-weight: 400;
  color: rgba(255,255,255,0.78);
  line-height: 1.55;
}
.proof-text strong {
  color: var(--gold2);
  font-weight: 500;
}

/* ── Best Fit Roles ── */
.roles-section {
  background: var(--cream2);
  padding: 72px 48px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.roles-intro {
  font-size: 15px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.7;
  max-width: 680px;
  margin-bottom: 40px;
}
.roles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.role-tile {
  padding: 18px 22px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-left: 3px solid var(--gold);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all .2s;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}
.role-tile:hover {
  border-color: var(--gold);
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  transform: translateY(-2px);
}
.role-tile-icon {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: var(--gold);
  flex-shrink: 0;
}
.role-tile-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
}

.role-tile.active {
  border-color: var(--gold);
  background: #fffdf5;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.role-tile.active .role-tile-icon {
  color: var(--gold);
  transform: rotate(90deg);
}
.role-tile-icon {
  transition: transform .2s;
}
.role-summary-box {
  margin-top: 20px;
  padding: 28px 32px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-left: 3px solid var(--gold);
  animation: fadeUp .25s ease forwards;
}
.role-summary-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}
.role-summary-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 12px;
  line-height: 1.3;
}
.role-summary-body {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 18px;
}
.role-summary-highlight-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--warm);
  margin-bottom: 8px;
}
.role-summary-highlight {
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  padding-left: 14px;
  border-left: 2px solid var(--gold);
}

/* ── Employers Strip ── */
.employers-strip {
  background: var(--cream);
  padding: 40px 48px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.employers-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}
.employers-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--warm);
  flex-shrink: 0;
  padding-right: 32px;
  border-right: 1px solid rgba(0,0,0,0.12);
}
.employers-logos {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
}
.employer-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0,0,0,0.28);
  letter-spacing: 0.3px;
  white-space: nowrap;
  transition: color .2s;
}
.employer-name:hover { color: var(--text); }

/* ── Section common ── */
.section { padding: 100px 48px; }
.section-dark { background: var(--navy); }
.section-light { background: var(--cream); }
.section-mid { background: var(--cream2); }

.section-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}
.section-label-dark {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(200,150,10,0.7);
  margin-bottom: 14px;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 3.5vw, 46px);
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 16px;
}
.section-title-light {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 3.5vw, 46px);
  font-weight: 600;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 16px;
}
.section-sub {
  font-size: 16px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 56px;
}
.section-sub-light {
  font-size: 16px;
  font-weight: 300;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 56px;
}
.max-w { max-width: 1100px; margin: 0 auto; }

/* ── Pillars ── */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 2px;
}
.pillar {
  background: var(--navy2);
  padding: 44px 36px;
  position: relative;
  overflow: hidden;
  transition: transform .2s;
}
.pillar:hover { transform: translateY(-4px); }
.pillar::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .3s;
}
.pillar:hover::before { transform: scaleX(1); }
.pillar-num {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 700;
  color: rgba(200,150,10,0.12);
  line-height: 1;
  margin-bottom: 20px;
}
.pillar-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 18px;
}
.pillar-body {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  line-height: 1.75;
  margin-bottom: 28px;
}
.pillar-proofs { list-style: none; }
.pillar-proof {
  font-size: 13px;
  color: rgba(255,255,255,0.78);
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding-left: 14px;
  position: relative;
  line-height: 1.5;
}
.pillar-proof::before {
  content: '→';
  position: absolute; left: 0;
  color: var(--gold);
  font-size: 11px;
}
.pillar-proof:last-child { border-bottom: none; }

/* ── Evidence Card (Work Samples) ── */
.evidence-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 44px 48px;
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 48px;
  align-items: stretch;
  transition: all .25s;
}
.evidence-card:hover {
  border-color: var(--gold);
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
}
.ev-meta-row {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}
.ev-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 16px;
}
.ev-body {
  font-size: 14.5px;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 22px;
}
.ev-demonstrates-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--warm);
  margin-bottom: 10px;
}
.ev-demo-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ev-demo-list li {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 4px 10px;
  background: var(--cream2);
  color: var(--warm);
  letter-spacing: 0.5px;
}
.ev-action {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 1px solid rgba(0,0,0,0.08);
  padding-left: 32px;
  justify-content: space-between;
}
.ev-action-top {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ev-action-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.4);
}
.ev-action-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: rgba(0,0,0,0.55);
  letter-spacing: 0.3px;
  line-height: 1.6;
}
.btn-dl {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 12px 16px;
  background: var(--navy);
  color: #fff;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all .2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
}
.btn-dl:hover { background: var(--gold); color: var(--navy); }
.btn-dl-secondary {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 12px 16px;
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all .2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
}
.btn-dl-secondary:hover { border-color: var(--gold); color: var(--gold); }

/* ── Writing Card ── */
.writing-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 40px 44px;
  display: grid;
  grid-template-columns: 140px 1fr 200px;
  gap: 36px;
  align-items: stretch;
  transition: all .25s;
}
.writing-card:hover {
  border-color: var(--gold);
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
}
.wr-date-block {
  border-right: 1px solid rgba(0,0,0,0.08);
  padding-right: 28px;
  display: flex;
  flex-direction: column;
}
.wr-date-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}
.wr-date {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.1;
}
.wr-date-year {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  margin-top: 4px;
}
.wr-kind {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--warm);
  margin-top: auto;
  padding-top: 18px;
}
.wr-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.35;
  margin-bottom: 14px;
}
.wr-body {
  font-size: 14.5px;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 16px;
}
.wr-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.wr-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  padding: 3px 10px;
  background: var(--cream2);
  color: var(--warm);
  letter-spacing: 0.5px;
}
.wr-action {
  border-left: 1px solid rgba(0,0,0,0.08);
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.library-note {
  margin-top: 28px;
  padding: 18px 24px;
  border: 1px dashed rgba(0,0,0,0.15);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.4px;
  line-height: 1.6;
}
.library-note strong { color: var(--text); font-weight: 500; }

/* ── Tools ── */
.tool-feature {
  background: var(--navy3);
  border: 1px solid var(--border);
  padding: 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.tool-feature::before {
  content: '';
  position: absolute; bottom: -60px; right: -60px;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200,150,10,0.08), transparent 70%);
  pointer-events: none;
}
.tool-tag-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: center;
}
.tool-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--border);
  padding: 5px 12px;
}
.tool-status {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 12px;
  background: rgba(76,175,130,0.12);
  color: #6fcf97;
  border: 1px solid rgba(76,175,130,0.3);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.tool-status::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #6fcf97;
  box-shadow: 0 0 8px rgba(111,207,151,0.6);
}
.tool-title {
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  line-height: 1.25;
  margin-bottom: 18px;
}
.tool-body {
  font-size: 15px;
  font-weight: 300;
  color: rgba(255,255,255,0.72);
  line-height: 1.75;
  margin-bottom: 28px;
}
.tool-spec {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px 20px;
  margin-bottom: 32px;
  padding: 22px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.tool-spec-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  padding-top: 2px;
}
.tool-spec-value {
  font-size: 13px;
  color: rgba(255,255,255,0.78);
  line-height: 1.6;
}
.btn-launch {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 14px 28px;
  background: var(--gold);
  color: var(--navy);
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all .2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.btn-launch:hover { background: var(--gold3); }
.tool-visual {
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(200,150,10,0.1);
  padding: 32px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tv-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  color: rgba(200,150,10,0.5);
  text-transform: uppercase;
  margin-bottom: 24px;
}
.tv-bars { display: flex; flex-direction: column; gap: 10px; }
.tv-bar-row { display: flex; align-items: center; gap: 12px; }
.tv-bar-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: rgba(255,255,255,0.35);
  width: 80px;
  text-align: right;
  flex-shrink: 0;
}
.tv-bar-track {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.06);
  overflow: hidden;
}
.tv-bar-fill {
  height: 100%;
  transition: width 1.5s ease;
}
.tv-val {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: rgba(255,255,255,0.4);
  width: 36px;
  flex-shrink: 0;
}
.tools-note {
  margin-top: 32px;
  padding: 18px 24px;
  border: 1px dashed rgba(200,150,10,0.25);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.4px;
  line-height: 1.6;
}
.tools-note strong { color: var(--gold2); font-weight: 500; }

/* ── About ── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 80px;
  align-items: start;
}
.about-body p {
  font-size: 16px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.85;
  margin-bottom: 22px;
}
.about-body p strong { color: var(--text); font-weight: 600; }
.about-body p em { font-style: italic; color: var(--text); }
.about-resume-cta {
  margin-top: 36px;
  padding: 24px 28px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  border-left: 3px solid var(--gold);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.about-resume-text {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
}
.about-resume-text strong { color: var(--text); font-weight: 500; }
.about-card {
  background: var(--navy);
  padding: 32px;
  margin-bottom: 16px;
}
.about-card-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 18px;
}
.about-item {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  line-height: 1.5;
}
.about-item:last-child { border-bottom: none; }
.about-item-title { font-weight: 500; color: rgba(255,255,255,0.9); }
.about-item-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: rgba(255,255,255,0.4);
  margin-top: 3px;
}
.about-divider {
  width: 48px;
  height: 3px;
  background: var(--gold);
  margin: 32px 0;
}

/* ── Contact ── */
.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
.contact-intro {
  font-size: 17px;
  font-weight: 300;
  color: rgba(255,255,255,0.75);
  line-height: 1.75;
  margin-bottom: 0;
}
.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contact-method {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 20px 24px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  transition: all .2s;
  text-decoration: none;
  color: inherit;
}
.contact-method:hover {
  border-color: var(--gold);
  background: rgba(200,150,10,0.05);
  transform: translateX(4px);
}
.contact-icon {
  width: 48px; height: 48px;
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  color: var(--gold2);
  flex-shrink: 0;
}
.contact-method-title {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 4px;
}
.contact-method-value {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255,255,255,0.9);
}
.contact-arrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  color: rgba(200,150,10,0.4);
  transition: color .2s;
}
.contact-method:hover .contact-arrow { color: var(--gold2); }

/* ── Footer ── */
.footer {
  background: var(--navy);
  border-top: 1px solid rgba(200,150,10,0.1);
  padding: 32px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: rgba(255,255,255,0.6);
}
.footer-name span { color: var(--gold2); }
.footer-right {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.5px;
}

@media (max-width: 900px) {
  .nav { padding: 0 20px; }
  .nav-links { display: none; }
  .hero { padding: 100px 24px 80px; }
  .hero-credentials { display: none; }
  .roles-grid { grid-template-columns: 1fr; }
  .employers-inner { gap: 20px; }
  .employers-label { border-right: none; padding-right: 0; border-bottom: 1px solid rgba(0,0,0,0.12); padding-bottom: 12px; width: 100%; }
  .employers-logos { gap: 20px; }
  .roles-section { padding: 52px 24px; }
  .employers-strip { padding: 28px 24px; }
  .section { padding: 64px 24px; }
  .pillars-grid { grid-template-columns: 1fr; }
  .evidence-card { grid-template-columns: 1fr; gap: 28px; padding: 32px; }
  .ev-action { border-left: none; border-top: 1px solid rgba(0,0,0,0.08); padding-left: 0; padding-top: 24px; }
  .writing-card { grid-template-columns: 1fr; gap: 20px; padding: 32px; }
  .wr-date-block { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.08); padding-right: 0; padding-bottom: 16px; flex-direction: row; gap: 12px; align-items: baseline; }
  .wr-kind { padding-top: 0; margin-left: auto; }
  .wr-action { border-left: none; padding-left: 0; }
  .tool-feature { grid-template-columns: 1fr; padding: 32px; gap: 36px; }
  .tool-visual { display: none; }
  .about-grid { grid-template-columns: 1fr; gap: 48px; }
  .about-resume-cta { flex-direction: column; align-items: flex-start; }
  .contact-inner { grid-template-columns: 1fr; gap: 40px; }
  .footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px; }
}
`;

// ── Content Data ───────────────────────────────────────────────────────────

const PROOFS = [
  { text: "Built <strong>NSF's PMO</strong> from the ground up — 100+ projects governed" },
  { text: "Delivered congressionally mandated federal publication — <strong>first on-time release in 7 years</strong>" },
  { text: "Standardized <strong>50+ BPMN workflows</strong> across 10 Marriott functions" },
  { text: "Stood up <strong>USCIS E-Verify</strong> analytics & case management unit from zero" },
  { text: "AI-enabled proposal workflow — <strong>cut cycle time 50%</strong>; anchored $2M pursuit" },
];

const ROLE_SUMMARIES = {
  "Operating Model & Execution Design": {
    body: "I design the structures that make execution work: operating models, governance, decision paths, and execution frameworks. This is especially valuable when organizations are trying to deliver through complexity, scale, or ambiguity and need a stronger foundation underneath the work.",
    highlight: "Built the operating model, organizational structure, and core processes for the E-Verify Monitoring & Compliance business unit from the ground up, helping the organization achieve full operational capability in its first year.",
  },
  "Business Process Architecture & Optimization": {
    body: "I map, redesign, and improve business processes so work flows more clearly, efficiently, and predictably. My focus is not just on fixing individual bottlenecks, but on designing process structures that are scalable, measurable, and sustainable over time.",
    highlight: "Led process reengineering efforts across multiple environments, including The Hartford, HUD, and most recently Marriott, where I helped standardize and strengthen enterprise process architecture.",
  },
  "Project Management & Governance": {
    body: "I build and lead governance structures that improve visibility, accountability, prioritization, and delivery control. That includes PMO design, portfolio oversight, executive reporting, risk management, and the operating cadence needed to keep complex initiatives on track.",
    highlight: "Built the PMO at the National Science Foundation from the ground up, creating the governance structure, reporting cadence, and oversight model needed to manage a complex project portfolio.",
  },
  "Business & Digital Transformation": {
    body: "I help organizations move from broad transformation goals to practical execution by designing the structures, workflows, and governance needed to support change. My work often sits between strategy and implementation, helping ensure transformation produces durable business improvement rather than isolated activity.",
    highlight: "Served as process lead within Marriott's Business Process Center of Excellence in support of a major global digital transformation effort, helping connect process design to enterprise execution.",
  },
  "Data Analysis & Performance Measurement": {
    body: "I use data to make performance visible, strengthen decisions, and identify where improvement is most needed. This includes designing metrics, interpreting operational patterns, and building analytical views that support clearer recommendations and stronger management action.",
    highlight: "Built Six Sigma and work-capacity forecasting dashboards at NSF and supported data optimization at NRECA through SQL-based analysis and validation, improving visibility into performance and delivery.",
  },
  "Change Enablement & Adoption": {
    body: "I help organizations put change into practice by aligning process, communication, governance, and adoption support. The goal is not just to launch new ways of working, but to make them stick in day-to-day execution.",
    highlight: "Supported adoption of new workflows, governance structures, and operating practices across federal and commercial environments by aligning stakeholders, clarifying roles, and reinforcing execution discipline.",
  },
  "Systems Development": {
    body: "My background in systems development helps me bridge business needs and technical design more effectively. I understand how structure, requirements, workflow logic, and system behavior connect, which allows me to design solutions that are more practical, usable, and scalable.",
    highlight: "Supported every phase of the SDLC across both Agile and waterfall environments, including serving as a systems developer for the Maryland Department of Transportation and supporting Agile implementations at NRECA in close partnership with IT and business stakeholders.",
  },
  "AI Enablement & Governance": {
    body: "I use AI where it creates real operational leverage, but always with design and governance in mind. My approach focuses on structuring the questions, workflows, controls, and decision logic that allow AI to produce more useful, scalable, and responsible business outcomes.",
    highlight: "Accelerated proposal development through custom AI scripts and built analytical applications, including a Six Sigma-based process diagnostic tool, to turn AI into a practical engine for faster and more structured solution development.",
  },
};

const PILLARS = [
  {
    num: "01",
    title: "Process & Operating Model",
    body: "Diagnosing where work actually breaks down and designing the flow, controls, ownership, and operating logic that make improvement hold. Lean Six Sigma rigor, BPMN process architecture, and operating-model design all come together here.",
    proofs: [
      "Applied Six Sigma at NSF — cycle-time variance down 45%, idle time 60%, rework 15%",
      "Standardized 50+ BPMN workflows across finance, procurement, customer service, and digital at Marriott",
      "Built Marriott's L1–L4 process taxonomy across 10 global business functions",
      "Cut ERISA pension delivery defects and waste 60% through workflow redesign",
    ],
  },
  {
    num: "02",
    title: "PMO & Portfolio Governance",
    body: "Designing the operating infrastructure that makes complex delivery possible — governance forums, prioritization frameworks, risk visibility, decision rights, and accountability structures that hold across teams and executive reporting lines.",
    proofs: [
      "Built NSF's PMO from the ground up — governed a 100+ project portfolio",
      "Delivered $400K congressionally mandated report — first on-time release in 7 years",
      "Architected enterprise product prioritization framework adopted across NSF",
      "Built USCIS E-Verify analytics and case management business unit from zero",
    ],
  },
  {
    num: "03",
    title: "AI-Enabled Analysis",
    body: "AI and analytics create the most value when the design underneath them is sound. I use AI to accelerate structured analysis, strengthen decision support, and build better questions, recommendations, and workflows — grounded in process design, operating logic, and real business constraints.",
    proofs: [
      "Built AI governance framework and delivery model anchoring a $2M government pursuit",
      "Designed multi-persona AI review workflow to strengthen proposal rigor",
      "AI-enabled proposal workflow cut solution design cycle time 50%",
      "Applied Data Science with Python (U. Michigan) · Advanced Tableau · 2025",
    ],
  },
];

const TV_BARS = [
  { label: "Intake",     pct: 18, color: "#4caf82" },
  { label: "Review",     pct: 35, color: "#4caf82" },
  { label: "Approval",   pct: 72, color: "#e05550" },
  { label: "Processing", pct: 48, color: "#4caf82" },
  { label: "QC",         pct: 28, color: "#f0a500" },
  { label: "Closure",    pct: 12, color: "#4caf82" },
];

// ── Components ─────────────────────────────────────────────────────────────

function ToolVisual() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="tool-visual" ref={ref}>
      <div className="tv-label">Cycle Time Analysis — Sample Output</div>
      <div className="tv-bars">
        {TV_BARS.map((b, i) => (
          <div className="tv-bar-row" key={b.label}>
            <div className="tv-bar-label">{b.label}</div>
            <div className="tv-bar-track">
              <div
                className="tv-bar-fill"
                style={{
                  width: animated ? `${b.pct}%` : "0%",
                  background: b.color,
                  transitionDelay: `${i * 0.12}s`,
                }}
              />
            </div>
            <div className="tv-val">{b.pct}%</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[
          { label: "Avg Cycle", val: "4.2d" },
          { label: "CV",        val: "38%" },
          { label: "Sigma",     val: "3.2σ" },
          { label: "VA Ratio",  val: "31%" },
        ].map(m => (
          <div key={m.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 16, fontWeight: 600, color: "#f0a500", lineHeight: 1 }}>{m.val}</div>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 8, color: "rgba(255,255,255,0.35)", letterSpacing: 1, marginTop: 3 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <style>{CSS}</style>

      {/* ── Navigation ── */}
      <nav className="nav" style={{ boxShadow: navSolid ? "0 4px 32px rgba(0,0,0,0.4)" : "none" }}>
        <div className="nav-logo">
          <img
            src={ASSETS.headshot}
            alt="Robert Frederick headshot"
            className="nav-headshot"
          />
          <div className="nav-logo-text">
            Robert Frederick<span>, MBA</span>
          </div>
        </div>
        <div className="nav-links">
          {[
            ["Capabilities", "capabilities"],
            ["Work",    "work"],
            ["Insights", "writing"],
            ["Tools",   "tools"],
            ["About",   "about"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
        <a className="nav-cta" href={ASSETS.resume} download>
          Download Resume ↓
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-eyebrow">Operating Model Design · Governance · Execution</div>

          <div className="hero-sequence">
            <span className="hero-step">Diagnose.</span>
            <span className="hero-step gold">Design.</span>
            <span className="hero-step">Deliver.</span>
          </div>

          <p className="hero-sub">
            I <em>design</em> the structures that make execution work — governance, process,
            operating model, and analytical frameworks. Across federal, enterprise, and
            regulated environments, I am typically brought in when the foundation is broken,
            unclear, or missing and execution needs to hold.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo("work")}>
              View Work →
            </button>
            <a className="btn-outline" href={ASSETS.resume} download>
              Download Resume ↓
            </a>
            <a className="btn-outline" href={`mailto:${ASSETS.email}?subject=Inquiry — Robert Frederick`}>
              Email
            </a>
          </div>
        </div>

        <div className="hero-credentials">
          {[
            ["25+",  "Years"],
            ["100+", "Projects Governed"],
            ["15+",  "Agencies & Firms"],
          ].map(([n, l]) => (
            <div className="hero-cred" key={l}>
              <div className="hero-cred-num">{n}</div>
              <div className="hero-cred-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proof Strip ── */}
      <section className="proof-strip">
        <div className="proof-strip-inner">
          {PROOFS.map((p, i) => (
            <div className="proof-item" key={i}>
              <div className="proof-text" dangerouslySetInnerHTML={{ __html: p.text }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Best Fit Roles ── */}
      <section className="roles-section" id="capabilities">
        <div className="max-w">
          <div className="section-label">Core Capabilities</div>
          <h2 className="section-title">Where I add the most value.</h2>
          <p className="roles-intro">
            Select a capability to see how I work and a representative example.
          </p>
          <div className="roles-grid">
            {[
              "Operating Model & Execution Design",
              "Business Process Architecture & Optimization",
              "Project Management & Governance",
              "Business & Digital Transformation",
              "Data Analysis & Performance Measurement",
              "Change Enablement & Adoption",
              "Systems Development",
              "AI Enablement & Governance",
            ].map((role) => (
              <button
                key={role}
                className={`role-tile${activeRole === role ? " active" : ""}`}
                onClick={() => setActiveRole(activeRole === role ? null : role)}
                type="button"
              >
                <div className="role-tile-icon">→</div>
                <div className="role-tile-text">{role}</div>
              </button>
            ))}
          </div>

          {activeRole && ROLE_SUMMARIES[activeRole] && (
            <div className="role-summary-box">
              <div className="role-summary-label">Capability</div>
              <h3 className="role-summary-title">{activeRole}</h3>
              <p className="role-summary-body">{ROLE_SUMMARIES[activeRole].body}</p>
              <div className="role-summary-highlight-label">Representative Example</div>
              <p className="role-summary-highlight">{ROLE_SUMMARIES[activeRole].highlight}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Selected Employers ── */}
      <div className="employers-strip">
        <div className="employers-inner">
          <div className="employers-label">Selected Organizations</div>
          <div className="employers-logos">
            {["Marriott International", "NSF", "USCIS / E-Verify", "Accenture", "Publicis Sapient"].map((e) => (
              <div className="employer-name" key={e}>{e}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What I Build (Pillars) ── */}
      <section className="section section-dark" id="approach">
        <div className="max-w">
          <div className="section-label-dark">What I Build</div>
          <h2 className="section-title-light">Three layers.<br />One designed system.</h2>
          <p className="section-sub-light">
            Execution breaks down when governance, process, and analytical logic are treated
            as separate problems. I work across all three because durable solutions depend on
            how well those layers are designed to work together. That is especially true in
            the age of AI, where better outputs depend on better structure, better questions,
            and better underlying design.
          </p>

          <div className="pillars-grid">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.num}>
                <div className="pillar-num">{p.num}</div>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-body">{p.body}</p>
                <ul className="pillar-proofs">
                  {p.proofs.map((pr, i) => (
                    <li className="pillar-proof" key={i}>{pr}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Samples ── */}
      <section className="section section-light" id="work">
        <div className="max-w">
          <div className="section-label">Work Samples</div>
          <h2 className="section-title">Selected artifacts,<br />anonymized for portfolio use.</h2>
          <p className="section-sub">
            Representative work products from live engagements, structured so an evaluator can
            see the actual thinking — governance design, portfolio sequencing, executive reporting,
            risk management — rather than read a summary of it.
          </p>

          <div className="evidence-card">
            <div>
              <div className="ev-meta-row">PMO Governance · Federal Science Agency · 2020–2024</div>
              <h3 className="ev-title">
                Enterprise Governance, Portfolio Prioritization &amp; Executive Reporting
              </h3>
              <p className="ev-body">
                Anonymized materials from a multi-year engagement at a federal science agency
                supporting a congressionally mandated publication program and a broader portfolio
                prioritization effort. Includes executive status reporting, risk register design,
                stakeholder coordination structures, and a five-tier criteria framework for
                sequencing competing releases across a shared production environment. The
                publication program delivered on time for the first time in seven years.
              </p>

              <div className="ev-demonstrates-label">What it demonstrates</div>
              <ul className="ev-demo-list">
                <li>PMO Governance</li>
                <li>Portfolio Sequencing</li>
                <li>Executive Reporting</li>
                <li>Risk Management</li>
                <li>Stakeholder Coordination</li>
              </ul>
            </div>

            <div className="ev-action">
              <div className="ev-action-top">
                <div className="ev-action-label">Work Sample</div>
                <div className="ev-action-meta">
                  11-page PDF<br />
                  Anonymized<br />
                  Direct download
                </div>
              </div>
              <a className="btn-dl" href={ASSETS.workSample_NSF} target="_blank" rel="noopener noreferrer">
                View Sample →
              </a>
            </div>
          </div>

          <div className="library-note">
            <strong>Library growing.</strong> Additional work samples — operating model
            artifacts, process architecture, and governance frameworks — publishing throughout 2026.
          </div>
        </div>
      </section>

      {/* ── Writing / Insights ── */}
      <section className="section section-mid" id="writing">
        <div className="max-w">
          <div className="section-label">Insights</div>
          <h2 className="section-title">Points of view on operating model,<br />transformation, and execution.</h2>
          <p className="section-sub">
            Essays on the questions I keep seeing in large-scale transformation work — especially
            the gap between the technology being implemented and the operating model underneath it.
          </p>

          <div className="writing-card">
            <div className="wr-date-block">
              <div className="wr-date-label">Published</div>
              <div className="wr-date">Mar 28</div>
              <div className="wr-date-year">2026</div>
              <div className="wr-kind">Point of View</div>
            </div>

            <div>
              <h3 className="wr-title">
                The System Is the Visible Investment. The Operating Model Is the Real Transformation.
              </h3>
              <p className="wr-body">
                A brief perspective on what large state finance modernization programs —
                Washington's One Washington and Maryland's 21st Century Financial Systems
                initiative among them — reveal about the part of transformation that rarely
                gets discussed: the operating-model decisions underneath the technology. The
                system gets announced, funded, and measured. The operating burden is what
                actually determines whether modernization produces durable improvement.
              </p>
              <div className="wr-tags">
                {["Finance Transformation", "Operating Model", "Public Sector", "State Government"].map(t => (
                  <span className="wr-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="wr-action">
              <a className="btn-dl" href={ASSETS.article_FinanceTransform} target="_blank" rel="noopener noreferrer">
                Read Essay →
              </a>
            </div>
          </div>

          <div className="library-note">
            <strong>More essays in progress.</strong> Additional pieces on governance design,
            PMO operating rhythms, and AI-enabled workflow publishing throughout 2026.
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="section section-dark" id="tools">
        <div className="max-w">
          <div className="section-label-dark">Tools</div>
          <h2 className="section-title-light">Analytical tools I've built,<br />not just described.</h2>
          <p className="section-sub-light">
            Working applications developed to support real analytical work. Not concepts or
            mockups — tools built on the same design logic I apply to operating model,
            governance, and process work.
          </p>

          <div className="tool-feature">
            <div>
              <div className="tool-tag-row">
                <div className="tool-tag">Interactive Application</div>
                <div className="tool-status">Live</div>
              </div>
              <h3 className="tool-title">Cycle Time Analyzer</h3>
              <p className="tool-body">
                A transaction-level process diagnostic tool. Ingests raw CSV data in wide
                format or event-log format and produces Six Sigma metrics, process capability
                indices, dual analysis windows, data quality audits, and an AI-generated
                narrative report.
              </p>

              <div className="tool-spec">
                <div className="tool-spec-label">Problem</div>
                <div className="tool-spec-value">
                  Cycle-time variance and process drift are easy to claim, hard to demonstrate
                  with transaction data.
                </div>

                <div className="tool-spec-label">Inputs</div>
                <div className="tool-spec-value">
                  Wide-format or event-log CSV; user-mapped columns; configurable analysis windows.
                </div>

                <div className="tool-spec-label">Outputs</div>
                <div className="tool-spec-value">
                  Cp/Cpk indices · coefficient of variation · value-add ratio · sigma levels ·
                  data quality diagnostics · AI narrative report · PDF export.
                </div>

                <div className="tool-spec-label">Supports</div>
                <div className="tool-spec-value">
                  Process redesign decisions, executive capability reporting, and diagnostic
                  conversations with operations leadership.
                </div>
              </div>

              <a className="btn-launch" href={ASSETS.tool_CycleTimeAnalyzer} target="_blank" rel="noopener noreferrer">
                Launch Application →
              </a>
            </div>
            <ToolVisual />
          </div>

          <div className="tools-note">
            <strong>Additional analytical tools in development.</strong> More applications
            publishing as they reach working state.
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section section-light" id="about">
        <div className="max-w">
          <div className="section-label">About</div>
          <h2 className="section-title">Designer of operating<br />infrastructure.</h2>
          <div className="about-divider" />

          <div className="about-grid">
            <div className="about-body">
              <p>
                I design operating infrastructure. That includes PMOs, process taxonomies,
                governance frameworks, analytics capabilities, and the execution structures
                organizations need when delivery is stalled, unclear, or under strain.
              </p>
              <p>
                My work sits across three layers that often live with different people:
                <strong> operating-model design</strong>, <strong>process architecture</strong>,
                and <strong>analytical tooling</strong>. I work across all three because
                transformation usually breaks down at the seams between them. In the age of AI,
                that matters even more. AI can accelerate analysis and improve decision support,
                but only when the structure underneath it is well designed. My background in
                systems, process design, and operating model work allows me to use AI as a
                force multiplier for building solutions that are more effective, scalable,
                and durable.
              </p>
              <p>
                Across 25 years, the pattern has been consistent: stepping into environments
                where the operating model was broken, unclear, or nonexistent and leaving
                behind something structured, usable, and running. That has included
                <strong> building NSF's PMO</strong>, standing up <strong>USCIS E-Verify's
                analytics and case management unit</strong>, standardizing <strong>Marriott's
                process taxonomy</strong> across global functions, and delivering a
                <strong> congressionally mandated federal publication on time for the first
                time in seven years</strong>.
              </p>
              <p>
                I have also served on the Board of Directors of Arlington Thrive since 2022,
                contributing governance and strategic guidance in support of working families
                in Northern Virginia.
              </p>

              <div className="about-resume-cta">
                <div className="about-resume-text">
                  <strong>Full professional history.</strong><br />
                  Resume with detailed engagement history, certifications, and tools.
                </div>
                <a className="btn-dl" href={ASSETS.resume} download style={{ width: "auto", flexShrink: 0 }}>
                  Download Resume ↓
                </a>
              </div>
            </div>

            <div className="about-sidebar">
              <div className="about-card">
                <div className="about-card-title">Education</div>
                <div className="about-item">
                  <div className="about-item-title">MBA</div>
                  <div className="about-item-sub">Dartmouth College, Tuck School of Business · 2001</div>
                </div>
                <div className="about-item">
                  <div className="about-item-title">BS Commerce</div>
                  <div className="about-item-sub">University of Virginia, McIntire School of Commerce · 1995 · MIS &amp; Marketing concentrations</div>
                </div>
              </div>

              <div className="about-card">
                <div className="about-card-title">Certifications</div>
                {[
                  ["PMP",                          "PMI · 2011"],
                  ["Six Sigma Green Belt",         "Kennesaw University · 2025"],
                  ["Applied Data Science · Python", "University of Michigan · 2025"],
                  ["Advanced Data Visualization",  "Tableau · Coursera · 2025"],
                  ["Salesforce Sales Operations",  "Pathstream · 2025"],
                ].map(([title, sub]) => (
                  <div className="about-item" key={title}>
                    <div className="about-item-title">{title}</div>
                    <div className="about-item-sub">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="about-card">
                <div className="about-card-title">Selected Engagements</div>
                {[
                  ["Marriott International",      "Sr. Manager, BP Center of Excellence"],
                  ["Portfolio Alignment Partners", "Sr. Consultant, AI Enablement"],
                  ["Windsor Group · NSF",         "Sr. Manager, PMO"],
                  ["Publicis Sapient",            "Manager, Operations &amp; Transformation"],
                  ["Accenture",                   "Sr. Associate, BPR &amp; Systems Integration"],
                ].map(([org, role]) => (
                  <div className="about-item" key={org}>
                    <div className="about-item-title">{org}</div>
                    <div className="about-item-sub" dangerouslySetInnerHTML={{ __html: role }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section section-dark" id="contact">
        <div className="max-w">
          <div className="section-label-dark">Contact</div>
          <h2 className="section-title-light">Ways to reach me.</h2>

          <div className="contact-inner">
            <div>
              <p className="contact-intro">
                For recruiters, hiring managers, and anyone evaluating fit for a senior
                transformation, PMO, or operating-model role — the fastest path is email.
                I respond the same day.
              </p>
            </div>

            <div className="contact-methods">
              <a className="contact-method" href={`mailto:${ASSETS.email}?subject=Inquiry — Robert Frederick`}>
                <div className="contact-icon">✉</div>
                <div>
                  <div className="contact-method-title">Email</div>
                  <div className="contact-method-value">{ASSETS.email}</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>

              <a className="contact-method" href={ASSETS.linkedin} target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">in</div>
                <div>
                  <div className="contact-method-title">LinkedIn</div>
                  <div className="contact-method-value">linkedin.com/in/roberthfrederick</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>

              <a className="contact-method" href={ASSETS.calendly} target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">◷</div>
                <div>
                  <div className="contact-method-title">Schedule 30 Minutes</div>
                  <div className="contact-method-value">calendly.com/rob-h-frederick/30min</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>

              <a className="contact-method" href={ASSETS.resume} download>
                <div className="contact-icon">↓</div>
                <div>
                  <div className="contact-method-title">Resume</div>
                  <div className="contact-method-value">Download PDF</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-name">Robert Frederick<span>, MBA</span></div>
        <div className="footer-right">
          © {new Date().getFullYear()} · RobertFrederick-MBA.com · Alexandria, VA
        </div>
      </footer>
    </div>
  );
}
