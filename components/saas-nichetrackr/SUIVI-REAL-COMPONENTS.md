# Suivi — Composants Real CSS (Drop-in Replacements NicheTrackr)

> Date : 2026-02-20
> Objectif : CSS ameliore utilisant les VRAIS noms de classes NicheTrackr
> Usage : Copier-coller directement dans le projet NicheTrackr

---

## PRINCIPES

- **Memes noms de classes** que le code NicheTrackr existant
- **Ameliorations visuelles** : animations, transitions, hover effects
- **Dark mode complet** via `[data-theme="dark"]`
- **CSS variables** resolues depuis `_variables.scss`
- **BEM strict** : Block__Element--Modifier
- **Drop-in ready** : peut remplacer le CSS existant sans modifier le HTML

---

## COMPOSANTS AMELIORES

### Layout & Navigation
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 11 | Navbar publique | `.navbar`, `.navbar__link`, `.navbar__hamburger` | [x] | [x] | FAIT |
| 12 | Sidebar authentifiee | `.sidebar`, `.sidebar__nav-link`, `.sidebar__user` | [x] | [x] | FAIT |
| 15 | App Layout | `.app-layout`, `.app-content` | [x] | [x] | FAIT |
| 16 | Tracker List Panel | `.tracker-list`, `.tracker-list__item`, `.tracker-list__filter` | [x] | [x] | FAIT |

### Dashboard
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 17 | Dashboard complet | `.dashboard`, `.dashboard__header`, `.dashboard__kpi-grid` | [x] | [x] | FAIT |
| 17 | KPI Cards | `.kpi-card`, `.kpi-card__trend`, `.kpi-card--accent` | [x] | [x] | FAIT |
| 17 | Highlight Cards | `.dashboard__highlight-card`, `.dashboard__highlight-card--best` | [x] | [x] | FAIT |
| 17 | Dashboard Table | `.dashboard__table`, `.dashboard__table-row`, `.dashboard__table--striped` | [x] | [x] | FAIT |
| 17 | Dashboard Tabs | `.dashboard__tab`, `.dashboard__tab--active`, `.dashboard__tabs-bar` | [x] | [x] | FAIT |
| 17 | Dashboard Search | `.dashboard__search`, `.dashboard__search-input` | [x] | [x] | FAIT |
| 17 | Empty State | `.dashboard__empty` | [x] | [x] | FAIT |

### Tracker Detail
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 18 | Detail Header | `.tracker-detail__header`, `.tracker-detail__expiration` | [x] | [x] | FAIT |
| 18 | Detail Tabs | `.tracker-detail__tab-button`, `.tracker-detail__tab-button--active` | [x] | [x] | FAIT |
| 18 | Period Filters | `.tracker-detail__period-btn`, `.tracker-detail__period-btn--active` | [x] | [x] | FAIT |
| 18 | Detail KPI Grid | `.tracker-detail__kpi`, `.tracker-detail__kpi-value--green` | [x] | [x] | FAIT |
| 18 | Score Section | `.tracker-detail__score-section`, `.tracker-detail__score-bar` | [x] | [x] | FAIT |
| 18 | Comparison Grid | `.tracker-detail__comparison`, `.tracker-detail__comparison-diff` | [x] | [x] | FAIT |
| 18 | Detail Tables | `.tracker-detail__table`, `.tracker-detail__rate--hot` | [x] | [x] | FAIT |
| 18 | Niche Toolbar | `.tracker-detail__niche-toolbar`, `.tracker-detail__niche-search` | [x] | [x] | FAIT |
| 18 | Flux KPIs | `.tracker-detail__flux-kpi` | [x] | [x] | FAIT |

### Formulaires
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 19 | Tracker Form | `.tracker-form`, `.tracker-form__section`, `.tracker-form__field` | [x] | [x] | FAIT |
| 19 | Chip Input | `.chip-input`, `.chip`, `.chip__remove` | [x] | [x] | FAIT |
| 19 | URL Builder Trigger | `.url-builder__trigger`, `.url-builder__badge` | [x] | [x] | FAIT |
| 19 | URL Builder Modal | `.url-builder__modal`, `.url-builder__content` | [x] | [x] | FAIT |

### Setup
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 20 | Setup Toolbar | `.setup__toolbar`, `.setup__search`, `.setup__filter` | [x] | [x] | FAIT |
| 20 | Setup Card | `.setup-card`, `.setup-card__badge`, `.setup-card__stats` | [x] | [x] | FAIT |
| 20 | Dropdown Menu | `.setup-card__dropdown-menu`, `.setup-card__dropdown-item` | [x] | [x] | FAIT |

### Auth
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 21 | Auth Layout | `.auth-layout`, `.auth-container`, `.auth-decoration` | [x] | [x] | FAIT |
| 21 | Auth Form | `.auth-form`, `.form-group`, `.input`, `.form-control` | [x] | [x] | FAIT |
| 21 | OAuth Buttons | `.oauth-button`, `.auth-divider` | [x] | [x] | FAIT |
| 21 | Trust Badge | `.auth-trust` | [x] | [x] | FAIT |

### Settings
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 22 | Settings Page | `.settings`, `.settings__section`, `.settings__section-title` | [x] | [x] | FAIT |
| 22 | Subscription Info | `.subscription-info`, `.subscription-info__badge--pro` | [x] | [x] | FAIT |
| 22 | Danger Zone | `.settings__danger-zone` | [x] | [x] | FAIT |

### Feedback & UX
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 13 | Flash Messages | `.flash`, `.flash--notice`, `.flash--alert`, `.flash--warning`, `.flash--info` | [x] | [x] | FAIT |
| 14 | Cookie Consent | `.cookie-consent`, `.cookie-consent__actions` | [x] | [x] | FAIT |
| 23 | Modal generique | `.modal`, `.modal__overlay`, `.modal__content` | [x] | [x] | FAIT |
| 23 | Niche Flux Modal | `.niche-flux-modal`, `.niche-card` | [x] | [x] | FAIT |

### Produits & Cards
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 24 | Flux Feed Grid | `.flux-feed`, `.flux-feed--grid` | [x] | [x] | FAIT |
| 24 | Flux Card | `.flux-feed__card`, `.flux-feed__sold-badge`, `.flux-feed__likes-badge` | [x] | [x] | FAIT |

### Landing Page
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 28 | Hero | `.hero`, `.hero__headline`, `.hero__cta` | [x] | [x] | FAIT |
| 28 | Stats Bar | `.stats-bar`, `.stats-bar__value` | [x] | [x] | FAIT |
| 28 | Features Grid | `.features__grid`, `.feature-card` | [x] | [x] | FAIT |
| 28 | Pricing Cards | `.pricing-card`, `.pricing-card--pro` | [x] | [x] | FAIT |
| 28 | Footer | `.footer`, `.footer__content` | [x] | [x] | FAIT |

### Systeme
| # | Composant | Classes principales | Light | Dark | Status |
|---|-----------|-------------------|-------|------|--------|
| 25 | Buttons | `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--danger` | [x] | [x] | FAIT |
| 26 | Badges | `.badge--active`, `.badge--paused`, `.badge--expired` | [x] | [x] | FAIT |
| 26 | Score Badges | `.score-badge--green`, `.score-badge--yellow`, `.score-badge--red` | [x] | [x] | FAIT |
| 27 | Trackers Index | `.trackers-index__welcome`, `.trackers-index__empty` | [x] | [x] | FAIT |
| 29 | Utilities | `.mono`, `.container`, `.link` | [x] | [x] | FAIT |

### Sidebar Variants (NEW)
| # | Variante | Style inspire | Classes principales | Light | Dark | Status |
|---|----------|---------------|-------------------|-------|------|--------|
| 30 | Compact / Icon-only | Linear, Figma, VS Code | `.sidebar--compact`, `.sidebar--expanded` | [x] | [x] | FAIT |
| 31 | Floating / Detachee | Vercel, Supabase | `.sidebar--floating` | [x] | [x] | FAIT |
| 32 | Gradient Premium | Stripe, Discord Nitro | `.sidebar--gradient` | [x] | [x] | FAIT |
| 33 | Minimal | Notion, Obsidian | `.sidebar--minimal` | [x] | [x] | FAIT |
| 34 | Two-Level (Rail + Panel) | Slack, Discord | `.sidebar--two-level`, `.sidebar__rail`, `.sidebar__panel` | [x] | [x] | FAIT |
| 35 | Tabbed | Figma, GitHub | `.sidebar--tabbed`, `.sidebar__sidebar-tab`, `.sidebar__tab-panel` | [x] | [x] | FAIT |

---

## AMELIORATIONS EXISTANTES (Session precedente)

| # | Composant | Status |
|---|-----------|--------|
| 1 | KPI Cards Gradient Accent | FAIT |
| 2 | KPI Card Icon Colors | FAIT |
| 3 | Score Gauge Circle (SVG) | FAIT |
| 4 | Tables ameliorees (rank badges) | FAIT |
| 5 | Pricing toggle + features | FAIT |
| 6 | Flux feed enhanced hover | FAIT |
| 7 | Comparaison Cards | FAIT |
| 8 | FAQ Accordion | FAIT |
| 9 | Sidebar status dots | FAIT |
| 10 | Affiliation amelioree | FAIT |

---

## COMPTAGE TOTAL

| Categorie | Composants | Light | Dark |
|-----------|------------|-------|------|
| Layout & Navigation | 4 | 4/4 | 4/4 |
| Dashboard | 7 | 7/7 | 7/7 |
| Tracker Detail | 9 | 9/9 | 9/9 |
| Formulaires | 4 | 4/4 | 4/4 |
| Setup | 3 | 3/3 | 3/3 |
| Auth | 4 | 4/4 | 4/4 |
| Settings | 3 | 3/3 | 3/3 |
| Feedback & UX | 4 | 4/4 | 4/4 |
| Produits & Cards | 2 | 2/2 | 2/2 |
| Landing Page | 5 | 5/5 | 5/5 |
| Systeme | 5 | 5/5 | 5/5 |
| **Sidebar Variants (NEW)** | **6** | **6/6** | **6/6** |
| Existants (it. precedente) | 10 | 10/10 | — |
| **TOTAL** | **66** | **66/66** | **56/66** |

---

## FICHIERS

| Fichier | Lignes | Description |
|---------|--------|-------------|
| `nichetrackr-real.css` | ~6,886 | CSS ameliore avec vrais noms de classes + 6 sidebar variants |
| `real-components.html` | ~1,380 | Page showcase des composants + sidebars |
| **Total** | **~8,266** | |

---

## ANIMATIONS AJOUTEES

| Animation | Composant | Description |
|-----------|-----------|-------------|
| `flashSlideIn` | Flash | Slide-in depuis la droite |
| `flashSlideOut` | Flash | Slide-out dismiss |
| `flashTimer` | Flash | Progress bar auto-dismiss |
| `navSlideDown` | Navbar | Menu mobile slide down |
| `cookieSlideUp` | Cookie | Bandeau slide-up |
| `modalScale` | Modal | Scale + fade in |
| `dropdownFade` | Dropdown | Fade + translate |
| `filterSlideDown` | Filters | Collapsible slide |
| `chipIn` | Chip | Pop-in animation |
| `pulse` | Expiration | Pulsation urgente |
| `spin` | Scrape info | Rotation icone scan |
| `sidebarTabFadeIn` | Sidebar Tabbed | Fade + translate sur changement d'onglet |

---

## CLASSES CSS PAR COMPOSANT (Reference rapide)

### Navbar (11)
`.navbar`, `.navbar__container`, `.navbar__brand`, `.navbar__logo-icon`, `.navbar__logo-text`, `.navbar__links`, `.navbar__link`, `.navbar__link--active`, `.navbar__actions`, `.navbar__action-link`, `.navbar__action-link--login`, `.navbar__action-link--signup`, `.navbar__hamburger`, `.navbar__mobile-menu`, `.navbar__mobile-menu--open`, `.navbar__mobile-link`, `.navbar__mobile-actions`, `.navbar--scrolled`

### Sidebar (12)
`.sidebar`, `.sidebar--open`, `.sidebar__header`, `.sidebar__logo-link`, `.sidebar__logo-icon`, `.sidebar__logo`, `.sidebar__close`, `.sidebar__nav`, `.sidebar__nav-section`, `.sidebar__nav-header`, `.sidebar__nav-title`, `.sidebar__nav-list`, `.sidebar__nav-item`, `.sidebar__nav-link`, `.sidebar__nav-link--active`, `.sidebar__nav-link--favorite`, `.sidebar__badge`, `.sidebar__plan-badge`, `.sidebar__plan-badge--free/starter/pro/business`, `.sidebar__nav-count`, `.sidebar__favorites-list`, `.sidebar__score-dot`, `.sidebar__score-dot--green/yellow/red`, `.sidebar__favorite-name`, `.sidebar__favorite-score`, `.sidebar__nav-empty`, `.sidebar__empty-icon`, `.sidebar__nav-text`, `.sidebar__footer`, `.sidebar__footer-section`, `.sidebar__footer-link`, `.sidebar__dark-toggle`, `.sidebar__dark-icon--moon/sun`, `.sidebar__user`, `.sidebar__user-avatar`, `.sidebar__user-info`, `.sidebar__user-name`, `.sidebar__user-email`, `.sidebar__user-logout`, `.sidebar__overlay`, `.sidebar__overlay--visible`, `.sidebar-hamburger`

### Flash (13)
`.flash`, `.flash--notice/alert/warning/info`, `.flash--dismissing`, `.flash__content`, `.flash__icon`, `.flash__message`, `.flash__close`

### Sidebar Variants (30-35)
**Compact (30)** : `.sidebar--compact`, `.sidebar--expanded`
**Floating (31)** : `.sidebar--floating`
**Gradient (32)** : `.sidebar--gradient`, `.sidebar__score-dot--green/yellow/red` (glowing), `.sidebar__plan-badge--pro` (gradient)
**Minimal (33)** : `.sidebar--minimal`
**Two-Level (34)** : `.sidebar--two-level`, `.sidebar__rail`, `.sidebar__rail-logo`, `.sidebar__rail-divider`, `.sidebar__rail-item`, `.sidebar__rail-item--active`, `.sidebar__rail-dot`, `.sidebar__rail-bottom`, `.sidebar__rail-avatar`, `.sidebar__panel`, `.sidebar__panel-header`, `.sidebar__panel-title`, `.sidebar__panel-subtitle`, `.sidebar__panel-search`, `.sidebar__panel-search-input`, `.sidebar__panel-search-icon`, `.sidebar__panel-section`, `.sidebar__panel-section-title`, `.sidebar__panel-items`, `.sidebar__panel-item`, `.sidebar__panel-item--active`
**Tabbed (35)** : `.sidebar--tabbed`, `.sidebar__sidebar-tabs`, `.sidebar__sidebar-tab`, `.sidebar__sidebar-tab--active`, `.sidebar__sidebar-tab-icon`, `.sidebar__sidebar-tab-badge`, `.sidebar__tab-panel`, `.sidebar__tab-panel--active`, `.sidebar__search-panel-input`, `.sidebar__search-result`, `.sidebar__search-result-icon`, `.sidebar__search-result-info`, `.sidebar__search-result-name`, `.sidebar__search-result-meta`, `.sidebar__fav-card`, `.sidebar__fav-card-header`, `.sidebar__fav-card-name`, `.sidebar__fav-card-score`, `.sidebar__fav-card-meta`

---

*Cree le : 2026-02-20*
*Mis a jour : 2026-02-20*
*Total : 35 ameliorations, 66 composants, ~6886 lignes CSS, 12 animations*
