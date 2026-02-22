# Suivi Iteration 2 — Nouveaux Composants NicheTrackr

> Date : 2026-02-20
> Source : Exploration profonde du codebase NicheTrackr (45 ERB, 34 SCSS, 21 Stimulus)
> Objectif : Creer TOUS les composants manquants + idees creatives originales

---

## NOUVEAUX COMPOSANTS TROUVES DANS NICHETRACKR

### A. Pages Auth (Login/Signup/Reset)
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| A.1 | Login Form (email + password + remember) | [ ] | [ ] | A FAIRE |
| A.2 | Signup Form (2 cols + validation) | [ ] | [ ] | A FAIRE |
| A.3 | Password Reset Form | [ ] | [ ] | A FAIRE |
| A.4 | OAuth Button (Google) | [ ] | [ ] | A FAIRE |
| A.5 | Trust Badge (lock + message securite) | [ ] | [ ] | A FAIRE |

### B. Landing Page (Home publique)
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| B.1 | Hero Section (titre + CTA + mockup) | [ ] | [ ] | A FAIRE |
| B.2 | Stats Bar (4 metriques) | [ ] | [ ] | A FAIRE |
| B.3 | Feature Cards Grid (icone + titre + desc) | [ ] | [ ] | A FAIRE |
| B.4 | CTA Section (banner + bouton) | [ ] | [ ] | A FAIRE |

### C. Tracker Form (Creation/Edition)
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| C.1 | Form Section (label + input + help text) | [ ] | [ ] | A FAIRE |
| C.2 | URL Input avec bouton builder | [ ] | [ ] | A FAIRE |
| C.3 | Chip Input (tags amovibles) | [ ] | [ ] | A FAIRE |
| C.4 | Cascading Select (categorie > sous-cat) | [ ] | [ ] | A FAIRE |
| C.5 | Collapsible Filters (toggle advanced) | [ ] | [ ] | A FAIRE |
| C.6 | Form Actions (submit + cancel) | [ ] | [ ] | A FAIRE |

### D. Setup / Tracker Cards
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| D.1 | Setup Card (tracker preview + status + actions) | [ ] | [ ] | A FAIRE |
| D.2 | Setup Grid (responsive) | [ ] | [ ] | A FAIRE |
| D.3 | Setup Toolbar (search + filter tabs) | [ ] | [ ] | A FAIRE |

### E. Flash / Notifications
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| E.1 | Flash Notice (success animated) | [ ] | [ ] | A FAIRE |
| E.2 | Flash Alert (error animated) | [ ] | [ ] | A FAIRE |
| E.3 | Cookie Consent Banner | [ ] | [ ] | A FAIRE |

### F. Error Pages
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| F.1 | Error 404 (page not found) | [ ] | [ ] | A FAIRE |
| F.2 | Error 500 (server error) | [ ] | [ ] | A FAIRE |

### G. Settings
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| G.1 | Settings Section (profile form) | [ ] | [ ] | A FAIRE |
| G.2 | Danger Zone (delete account) | [ ] | [ ] | A FAIRE |
| G.3 | Plan Badge (current subscription) | [ ] | [ ] | A FAIRE |
| G.4 | GDPR Data Section (dates + export + links) | [ ] | [ ] | A FAIRE |

### H. Dashboard Elements
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| H.1 | Dashboard Header (greeting + last scrape + CTA) | [ ] | [ ] | A FAIRE |
| H.2 | Highlight Card (best niche / avg duration) | [ ] | [ ] | A FAIRE |
| H.3 | Period Filters (7j / 30j / 90j pills) | [ ] | [ ] | A FAIRE |
| H.4 | Expiration Counter (color-coded) | [ ] | [ ] | A FAIRE |
| H.5 | Quota Badge (5/10 trackers) | [ ] | [ ] | A FAIRE |

### I. Charts avances
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| I.1 | Area Chart SVG (gradient fill + 2 lignes) | [ ] | [ ] | A FAIRE |
| I.2 | Sparkline inline (mini chart dans KPI) | [ ] | [ ] | A FAIRE |

### J. Tables avancees
| # | Composant | Light | Dark | Status |
|---|-----------|-------|------|--------|
| J.1 | Accordion Table (brand rows expandable) | [ ] | [ ] | A FAIRE |
| J.2 | Sortable Headers (avec icone tri) | [ ] | [ ] | A FAIRE |
| J.3 | Product Table Row (checkbox + image + info) | [ ] | [ ] | A FAIRE |

---

## CSS DEJA PRET MAIS PAS ENCORE DANS LE HTML

| Composant | Classe CSS | A ajouter |
|-----------|-----------|-----------|
| Semi-circle gauge | `.nt-score-semi` | Oui |
| KPI Animated | `.nt-kpi--animated` | Oui |
| Product hover reveal | `.nt-product--hover-reveal` | Oui |
| Product sold animated | `.nt-product__badge--sold-animated` | Oui |
| Product likes animated | `.nt-product__likes--animated` | Oui |
| Comparison horizontal | `.nt-compare--horizontal` | Oui |
| Pricing gradient header | `.nt-pricing--gradient-header` | Oui |
| Load more loading | `.nt-load-more--loading` | Oui |
| Sidebar collapsible | `.nt-sidebar-demo__group-toggle` | Oui |

---

## COMPOSANTS CREATIFS ORIGINAUX (au-dela de NicheTrackr)

| # | Composant | Inspiration | Light | Dark | Status |
|---|-----------|-------------|-------|------|--------|
| X.1 | Notification Center (dropdown liste) | Slack/Discord | [ ] | [ ] | A FAIRE |
| X.2 | Onboarding Wizard (steps progressif) | SaaS standard | [ ] | [ ] | A FAIRE |
| X.3 | Activity Timeline (feed vertical) | GitHub | [ ] | [ ] | A FAIRE |
| X.4 | User Profile Card (avatar + stats) | Dashboard | [ ] | [ ] | A FAIRE |
| X.5 | Stat Counter animated | Awwwards | [ ] | [ ] | A FAIRE |
| X.6 | Progress Ring (circular progress) | Modern UI | [ ] | [ ] | A FAIRE |
| X.7 | Kanban Column (drag card) | Trello | [ ] | [ ] | A FAIRE |
| X.8 | Data Card (sparkline + value + mini table) | Analytics | [ ] | [ ] | A FAIRE |
| X.9 | Calendar Heatmap (activity grid) | GitHub contribs | [ ] | [ ] | A FAIRE |
| X.10 | Command Palette (search modal) | VS Code | [ ] | [ ] | A FAIRE |
| X.11 | Metric Before/After (comparison) | A/B testing | [ ] | [ ] | A FAIRE |
| X.12 | Quick Actions Floating Bar | Mobile apps | [ ] | [ ] | A FAIRE |
| X.13 | Welcome/Onboarding Card | First-use UX | [ ] | [ ] | A FAIRE |
| X.14 | Status Page (uptime indicators) | Statuspage.io | [ ] | [ ] | A FAIRE |
| X.15 | Changelog Entry (version + features) | Release notes | [ ] | [ ] | A FAIRE |

---

## COMPTAGE ITERATION 2

| Categorie | Composants | Status |
|-----------|------------|--------|
| Auth | 5 | A FAIRE |
| Landing | 4 | A FAIRE |
| Tracker Form | 6 | A FAIRE |
| Setup | 3 | A FAIRE |
| Flash/Notifications | 3 | A FAIRE |
| Error Pages | 2 | A FAIRE |
| Settings | 4 | A FAIRE |
| Dashboard Elements | 5 | A FAIRE |
| Charts avances | 2 | A FAIRE |
| Tables avancees | 3 | A FAIRE |
| CSS a showcaser | 9 | A FAIRE |
| Creatifs originaux | 15 | A FAIRE |
| **TOTAL** | **61** | **0/61** |

Avec les 86 de l'iteration 1 : **147 composants uniques au total**

---

*Cree le : 2026-02-20*
