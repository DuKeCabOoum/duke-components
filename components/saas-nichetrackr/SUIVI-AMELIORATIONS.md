# Suivi des Ameliorations — NicheTrackr UI

> Date de creation : 2026-02-20
> Projet source : NicheTrackr (SaaS Vinted Intelligence)
> Destination : duke-components/components/saas-nichetrackr/

---

## Screens analyses

| # | Screen | Onglet | Priorite |
|---|--------|--------|----------|
| 1 | Overview Tracker | Overview | Haute |
| 2 | Details Tracker | Details | Haute |
| 3 | Niches Tracker | Niches | Moyenne |
| 4 | Modal Flux de ventes | Niches (modal) | Moyenne |
| 5 | Flux Tracker | Flux | Moyenne |
| 6 | Abonnement / Pricing | Subscription | Haute (bug) |
| 7 | Affiliation | Affiliate | Basse |

---

## Composants a ameliorer

### 1. KPI Cards (Stats)
- **Ecrans** : Overview, Details, Flux
- **Problemes** :
  - Labels gris clair, contraste insuffisant
  - Pas d'icones
  - Pas de differentiation visuelle bon/mauvais
  - Toutes identiques (pas de hierarchie)
- **Variantes a creer** :
  - [ ] KPI Card Basic (amelioree avec icone + trend arrow)
  - [ ] KPI Card Gradient (fond degrade selon performance)
  - [ ] KPI Card avec Sparkline (mini graphique integre)
  - [ ] KPI Card Glassmorphism
  - [ ] KPI Card Neumorphism
  - [ ] KPI Grid Layout (responsive 3/4/5 colonnes)
- **Status** : EN COURS

### 2. Score / Rating System
- **Ecrans** : Overview (score 0.3/10)
- **Problemes** :
  - Barres de progression basiques
  - Label "Faible" trop petit
  - Pas assez visuel
- **Variantes a creer** :
  - [ ] Score Circle (gauge circulaire)
  - [ ] Score Bar amelioree (gradient + animation)
  - [ ] Score Radar (spider chart)
  - [ ] Score avec badges (Faible/Moyen/Bon/Excellent)
- **Status** : A FAIRE

### 3. Data Tables
- **Ecrans** : Overview, Details, Niches
- **Problemes** :
  - Pas d'alternance de lignes (striped)
  - Pas de hover effect
  - Headers basiques
  - Pas de tri visuel
  - Badges discrets
- **Variantes a creer** :
  - [ ] Table Striped avec hover
  - [ ] Table avec badges colores (score, status)
  - [ ] Table avec sparklines integrees
  - [ ] Table responsive (scroll horizontal)
  - [ ] Table avec actions (boutons Boost/Flux ameliores)
  - [ ] Table sortable (headers cliquables)
- **Status** : A FAIRE

### 4. Charts / Graphiques
- **Ecrans** : Overview, Details
- **Problemes** :
  - Couleurs ternes (bleu/orange basiques)
  - Pas de tooltips
  - Beaucoup d'espace vide
  - Legendes petites
- **Variantes a creer** :
  - [ ] Bar Chart ameliore (gradient + hover tooltip)
  - [ ] Line Chart ameliore (area fill + points)
  - [ ] Donut Chart (repartition categories)
  - [ ] Horizontal Bar Chart (prix/rapidite)
  - [ ] Comparaison Cards (avant/apres ameliorees)
- **Status** : A FAIRE

### 5. Product Cards (Modal Flux)
- **Ecrans** : Niches modal, Flux
- **Problemes** :
  - Modal trop petite
  - Images tailles differentes
  - Texte dense sous les images
  - Pas de pagination
- **Variantes a creer** :
  - [ ] Product Card (image uniforme + badge VENDU)
  - [ ] Product Grid (responsive 3-4 colonnes)
  - [ ] Modal Large avec filtres
  - [ ] Product Card with hover details
- **Status** : A FAIRE

### 6. Pricing Cards
- **Ecrans** : Abonnement
- **Problemes** :
  - BUG : entites HTML non rendues (&check; &cross;)
  - Cards plates, pas d'ombre
  - Plan recommande pas assez mis en avant
  - Pas de toggle Mensuel/Annuel
  - FAQ sans accordeon
- **Variantes a creer** :
  - [ ] Pricing Card Modern (ombre + hover)
  - [ ] Pricing Card avec plan recommande highlighted
  - [ ] Pricing Toggle Mensuel/Annuel
  - [ ] Pricing Comparison Table
  - [ ] FAQ Accordion
- **Status** : A FAIRE

### 7. Affiliation Page
- **Ecrans** : Affiliation
- **Problemes** :
  - Page statique et plate
  - Pas de CTA fort
  - Steps basiques
  - Pas de calculator
- **Variantes a creer** :
  - [ ] Hero Affiliation (banner + CTA)
  - [ ] Steps ameliores (avec illustrations)
  - [ ] Commission Calculator interactif
  - [ ] Referral Dashboard (suivi clics/inscriptions)
- **Status** : A FAIRE

### 8. Sidebar / Navigation
- **Ecrans** : Tous
- **Problemes** :
  - Fonctionnelle mais ameliorable
  - Liste de trackers longue sans categorisation
  - Recherche basique
- **Variantes a creer** :
  - [ ] Sidebar avec groupes collapsibles
  - [ ] Sidebar avec status indicators (dots colores)
  - [ ] Sidebar avec favoris epingles
  - [ ] Mini sidebar (icons only)
- **Status** : A FAIRE

---

## Progression globale

| Composant | Variantes | Faites | Status |
|-----------|-----------|--------|--------|
| KPI Cards | 6 | 3 | FAIT (Basic, Gradient, Border-left) |
| Score/Rating | 4 | 1 | FAIT (Circle + Score Bars) |
| Data Tables | 6 | 2 | FAIT (Niches, Marques) |
| Charts | 5 | 2 | FAIT (Horizontal Bar, Rapidite) |
| Product Cards | 4 | 1 | FAIT (Product Grid) |
| Pricing Cards | 5 | 1 | FAIT (Modern + Toggle) |
| Affiliation | 4 | 3 | FAIT (Hero, Steps, Calculator) |
| Sidebar | 4 | 1 | FAIT (Status Dots) |
| Comparaison | 1 | 1 | FAIT |
| FAQ Accordion | 1 | 1 | FAIT |
| **TOTAL** | **40** | **16** | **40%** |

---

## Fichiers crees

| Fichier | Description |
|---------|-------------|
| `index.html` | Page principale avec 11 sections et 16 composants |
| `nichetrackr-ui.css` | CSS dedie (~700 lignes) avec variables NicheTrackr |
| `SUIVI-AMELIORATIONS.md` | Ce fichier de suivi |

## Lien dans le projet

- Ajoute dans la sidebar de `index.html` (section SaaS Premium)
- Accessible via : `components/saas-nichetrackr/index.html`

---

## Prochaines variantes a ajouter

- [ ] KPI avec Sparkline (mini graphique SVG integre)
- [ ] KPI Glassmorphism
- [ ] KPI Grid Layout (5 colonnes NicheTrackr)
- [ ] Table avec sparklines par ligne
- [ ] Table sortable interactive (JS)
- [ ] Table responsive (scroll horizontal)
- [ ] Donut Chart (categories)
- [ ] Line Chart (evolution dans le temps)
- [ ] Vertical Bar Chart
- [ ] Product Card with hover details
- [ ] Modal Large avec filtres
- [ ] Pricing Comparison Table
- [ ] Sidebar mini (icons only)
- [ ] Sidebar avec favoris epingles
- [ ] Sidebar avec groupes collapsibles
- [ ] Commission Calculator interactif (JS)
- [ ] Referral Dashboard (suivi affilies)
- [ ] Score Radar (spider chart)

---

*Derniere mise a jour : 2026-02-20*
