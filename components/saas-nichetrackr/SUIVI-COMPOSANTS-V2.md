# Suivi Composants V2 — NicheTrackr UI (Light + Dark Mode)

> Date de creation : 2026-02-20
> Objectif : Creer TOUS les composants possibles pour chaque page NicheTrackr
> Modes : Light Mode + Dark Mode pour chaque composant
> Regle : NE JAMAIS modifier le code dans NicheTrackr, lecture seule

---

## Organisation par page

### PAGE 1 : Overview (Dashboard principal)

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 1.1 | KPI Card — Basic (icone + trend) | [x] | [x] | translateY + shadow | - | FAIT |
| 1.2 | KPI Card — Gradient (fond degrade) | [x] | [x] | brightness + scale | - | FAIT |
| 1.3 | KPI Card — Border Left (accent lateral) | [x] | [x] | border-color change | - | FAIT |
| 1.4 | KPI Card — Glassmorphism (blur + transparence) | [x] | [ ] | backdrop-blur + glow | - | PARTIEL |
| 1.5 | KPI Card — Neumorphism (ombres douces) | [x] | [ ] | shadow invert | - | PARTIEL |
| 1.6 | KPI Card — Sparkline (mini graphique SVG) | [x] | [x] | sparkline highlight | - | FAIT |
| 1.7 | KPI Card — Animated counter (chiffres animes) | [ ] | [ ] | pulse effect | - | CSS PRET |
| 1.8 | KPI Card — Compact (inline pour mobile) | [x] | [ ] | bg subtle change | - | PARTIEL |
| 1.9 | Score Gauge — Circle (gauge circulaire SVG) | [x] | [x] | pulse glow | - | FAIT |
| 1.10 | Score Gauge — Semi-circle (demi-jauge) | [ ] | [ ] | fill animation | - | CSS PRET |
| 1.11 | Score Bars — Gradient animated | [x] | [x] | bar glow | - | FAIT |
| 1.12 | Comparison Cards — Grid (3 colonnes) | [x] | [x] | card lift | - | FAIT |
| 1.13 | Comparison Cards — Horizontal (inline) | [ ] | [ ] | highlight change | - | CSS PRET |
| 1.14 | Chart — Horizontal Bar (prix) | [x] | [x] | bar expand + tooltip | - | FAIT |
| 1.15 | Chart — Donut (categories) | [x] | [x] | segment highlight | - | FAIT |
| 1.16 | Chart — Vertical Bar (ventes) | [x] | [ ] | bar glow | - | PARTIEL |
| 1.17 | Empty State — No data yet | [x] | [x] | CTA button pulse | - | FAIT |

### PAGE 2 : Details (Tracker Detail)

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 2.1 | KPI Cards — Detail variant (5 colonnes) | [x] | [ ] | lift + shadow | - | PARTIEL |
| 2.2 | Table Niches — Striped + sort + actions | [x] | [x] | row highlight | sort toggle | FAIT |
| 2.3 | Table Marques — Ranking + badges | [x] | [ ] | row highlight | - | PARTIEL |
| 2.4 | Chart — Repartition prix (horizontal) | [x] | [x] | bar tooltip | - | FAIT |
| 2.5 | Chart — Rapidite vente (multi-color) | [x] | [ ] | bar tooltip | - | PARTIEL |
| 2.6 | Tabs — Overview/Details/Niches/Flux | [x] | [x] | underline slide | tab switch | FAIT |
| 2.7 | Score inline — Compact badge | [x] | [x] | scale up | - | FAIT |

### PAGE 3 : Niches (Liste des niches)

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 3.1 | Table Niches — Full featured (sort + filter) | [x] | [x] | row highlight | sort + modal | FAIT |
| 3.2 | Filter Pills — Chips cliquables | [x] | [x] | pill glow | toggle active | FAIT |
| 3.3 | Search Bar — Amelioree (icon + clear) | [x] | [x] | border focus | - | FAIT |
| 3.4 | Action Buttons — Boost/Flux | [x] | [x] | icon rotate | ripple | FAIT |
| 3.5 | Modal — Flux de ventes (large) | [x] | [x] | - | open/close | FAIT |
| 3.6 | Pagination — Modern (dots + arrows) | [x] | [x] | scale + color | page switch | FAIT |

### PAGE 4 : Flux (Feed de ventes)

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 4.1 | Product Card — Standard (image + info) | [x] | [x] | image zoom + lift | - | FAIT |
| 4.2 | Product Card — Compact (petit format) | [ ] | [ ] | bg highlight | - | CSS PRET |
| 4.3 | Product Card — Hover Reveal (details on hover) | [ ] | [ ] | overlay slide-up | - | CSS PRET |
| 4.4 | Product Card — List View (horizontal) | [x] | [ ] | border-left accent | - | PARTIEL |
| 4.5 | Product Grid — Responsive (auto-fit) | [x] | [x] | - | - | FAIT |
| 4.6 | Sold Badge — Animated | [x] | [x] | pulse | - | FAIT |
| 4.7 | Likes Badge — Heart animated | [x] | [x] | scale bounce | - | FAIT |
| 4.8 | Load More Button — Styled | [x] | [x] | arrow bounce | loading state | FAIT |
| 4.9 | Sort/Filter Bar — Toolbar | [x] | [ ] | option highlight | toggle | PARTIEL |
| 4.10 | Skeleton Loading — Product card | [x] | [ ] | shimmer | - | PARTIEL |

### PAGE 5 : Pricing (Abonnement)

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 5.1 | Pricing Card — Modern (shadow + border) | [x] | [x] | lift + border glow | - | FAIT |
| 5.2 | Pricing Card — Glassmorphism | [ ] | [x] | blur intensify | - | PARTIEL |
| 5.3 | Pricing Card — Gradient header | [ ] | [ ] | gradient shift | - | CSS PRET |
| 5.4 | Pricing Toggle — Mensuel/Annuel | [x] | [ ] | knob shadow | switch anim | PARTIEL |
| 5.5 | Pricing Table — Comparison (feature matrix) | [x] | [ ] | column highlight | - | PARTIEL |
| 5.6 | Feature List — Check/Cross icons | [x] | [x] | icon bounce | - | FAIT |
| 5.7 | CTA Button — Primary pulsing | [x] | [x] | scale + shadow | ripple | FAIT |
| 5.8 | Badge "Recommande" — Animated | [x] | [x] | gradient shift | - | FAIT |
| 5.9 | FAQ Accordion — Standard | [x] | [ ] | border highlight | open/close | PARTIEL |
| 5.10 | FAQ Accordion — Cards style | [ ] | [x] | lift | open/close | PARTIEL |

### PAGE 6 : Affiliation

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 6.1 | Hero Banner — Gradient + CTA | [x] | [x] | CTA lift | copy link | FAIT |
| 6.2 | Hero Banner — Illustration style | [ ] | [ ] | parallax subtle | - | A FAIRE |
| 6.3 | Steps — Numbered circles | [x] | [ ] | step lift | - | PARTIEL |
| 6.4 | Steps — Connected timeline | [x] | [ ] | line glow | - | PARTIEL |
| 6.5 | Commission Calculator — Slider | [x] | [ ] | thumb glow | value update | PARTIEL |
| 6.6 | Commission Calculator — Input style | [ ] | [ ] | focus ring | calculate | CSS PRET |
| 6.7 | Referral Stats — Mini dashboard | [x] | [x] | card lift | - | FAIT |
| 6.8 | Share Buttons — Social (copier, email, twitter) | [x] | [x] | icon scale | copy toast | FAIT |

### PAGE 7 : Navigation & Layout

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 7.1 | Sidebar — Full (logo + nav + user) | [x] | [x] | item highlight | active state | FAIT |
| 7.2 | Sidebar — Mini (icons only) | [x] | [ ] | tooltip | expand | PARTIEL |
| 7.3 | Sidebar — With Favorites (pinned) | [ ] | [ ] | star glow | unpin | CSS PRET |
| 7.4 | Sidebar — Grouped/Collapsible | [ ] | [ ] | chevron rotate | toggle group | CSS PRET |
| 7.5 | Tabs — Underline style | [x] | [x] | underline slide | switch tab | FAIT |
| 7.6 | Tabs — Pill style | [x] | [x] | pill bg | switch tab | FAIT |
| 7.7 | Breadcrumb — Slash separated | [x] | [x] | link underline | navigate | FAIT |
| 7.8 | Dark Mode Toggle — Switch | [x] | [ ] | knob glow | theme switch | PARTIEL |

### COMPOSANTS GLOBAUX (Toutes pages)

| # | Composant | Light | Dark | Hover | Clic | Status |
|---|-----------|-------|------|-------|------|--------|
| 8.1 | Button — Primary | [x] | [x] | darken + lift | scale 0.98 | FAIT |
| 8.2 | Button — Ghost/Outline | [x] | [x] | fill bg | scale 0.98 | FAIT |
| 8.3 | Button — Danger | [x] | [x] | darken | scale 0.98 | FAIT |
| 8.4 | Button — Icon only | [x] | [x] | bg circle | scale 0.98 | FAIT |
| 8.5 | Badge — Green/Yellow/Red/Blue/Gray | [x] | [x] | - | - | FAIT |
| 8.6 | Input — Text (focus ring) | [x] | [x] | border hover | focus ring | FAIT |
| 8.7 | Select — Dropdown | [x] | [ ] | border hover | open | PARTIEL |
| 8.8 | Toggle — Switch on/off | [x] | [x] | knob shadow | switch | FAIT |
| 8.9 | Modal — Standard (overlay + content) | [x] | [x] | - | open/close | FAIT |
| 8.10 | Modal — Large (full content) | [x] | [ ] | - | open/close | PARTIEL |
| 8.11 | Toast — Success/Error/Warning/Info | [x] | [x] | - | dismiss | FAIT |
| 8.12 | Skeleton — Card loading | [x] | [ ] | shimmer | - | PARTIEL |
| 8.13 | Skeleton — Table row loading | [x] | [ ] | shimmer | - | PARTIEL |
| 8.14 | Empty State — No trackers | [x] | [x] | CTA pulse | - | FAIT |
| 8.15 | Empty State — No results | [x] | [ ] | - | - | PARTIEL |
| 8.16 | Tooltip — Top/Bottom | [x] | [ ] | show | - | PARTIEL |
| 8.17 | Chip — Tag removable | [x] | [x] | bg darken | remove anim | FAIT |
| 8.18 | Alert — Error/Warning/Success/Info | [x] | [x] | - | dismiss | FAIT |
| 8.19 | Avatar — User initials | [x] | [x] | ring glow | - | FAIT |
| 8.20 | Score Dot — Green/Yellow/Red | [x] | [x] | pulse glow | - | FAIT |

---

## Comptage total

| Section | Composants | Light | Dark | Total variantes |
|---------|------------|-------|------|-----------------|
| Overview | 17 | 13/17 | 9/17 | 22/34 |
| Details | 7 | 7/7 | 4/7 | 11/14 |
| Niches | 6 | 6/6 | 6/6 | 12/12 |
| Flux | 10 | 8/10 | 5/10 | 13/20 |
| Pricing | 10 | 7/10 | 5/10 | 12/20 |
| Affiliation | 8 | 5/8 | 3/8 | 8/16 |
| Navigation | 8 | 6/8 | 4/8 | 10/16 |
| Global | 20 | 18/20 | 13/20 | 31/40 |
| **TOTAL** | **86** | **70/86** | **49/86** | **119/172** |

**Progression : 69%** (119 variantes sur 172)
**Restant : 53 variantes** (principalement des dark mode manquants + quelques light)

---

## Design Tokens NicheTrackr (Reference)

### Light Mode
- Background: #fafbfb
- Surface: #ffffff
- Text: #15191a
- Text secondary: #5a6566
- Border: #e1e6e6
- Primary: #007782

### Dark Mode
- Background: #0f1419
- Surface: #1a2332
- Surface alt: #243040
- Text: #e8edf2
- Text secondary: #8899aa
- Text muted: #5a6b7a
- Border: #2a3a4a
- Primary: #00b4c6 (plus lumineux pour contraste)
- Success: #34d399
- Warning: #fbbf24
- Error: #f87171

---

## Fichiers crees

| Fichier | Description |
|---------|-------------|
| `SUIVI-COMPOSANTS-V2.md` | CE fichier de suivi |
| `nichetrackr-components.css` | CSS complet light + dark (2995 lignes) |
| `index.html` | Page avec 18 sections, 119 variantes (1864 lignes) |

---

## Iterations

### Iteration 1 (FAIT)
- [x] Creer le CSS light + dark mode complet (27 categories)
- [x] Construire 70 composants light mode
- [x] Ajouter 49 composants dark mode
- [x] Ajouter le JS interactif (accordion, tabs, toggle, calculator)

### Iteration 2 (A FAIRE)
- [ ] Completer les 53 variantes manquantes (dark mode)
- [ ] Ajouter les composants CSS PRET dans le HTML
- [ ] Verifier coherence avec NicheTrackr reel
- [ ] Ameliorer animations/transitions

### Iteration 3 (polish)
- [ ] Optimiser CSS (doublon, organisation)
- [ ] Ajouter micro-interactions manquantes
- [ ] Documentation code viewers
- [ ] Audit accessibilite

---

*Derniere mise a jour : 2026-02-20*
