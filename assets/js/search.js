/* ===========================================
   GLOBAL SEARCH — Duke-components
   Recherche instantanée dans tous les composants
   =========================================== */

/**
 * Classe de recherche globale
 * CRÉE : Un système de recherche avec suggestions
 */
class GlobalSearch {
  constructor() {
    this.components = [];
    this.searchInput = null;
    this.searchResults = null;
    this.searchOverlay = null;
    this.isOpen = false;

    this.init();
  }

  /**
   * Initialise le système de recherche
   */
  init() {
    this.loadComponents();
    this.createSearchUI();
    this.bindKeyboardShortcut();
    this.bindEvents();
  }

  /* ===========================================
     CHARGEMENT DES COMPOSANTS
     =========================================== */

  /**
   * Charge la liste de tous les composants disponibles
   */
  loadComponents() {
    // Liste complète des composants avec métadonnées
    this.components = [
      // UI Components
      { name: 'Accordions', icon: '📂', path: 'components/accordions/index.html', category: 'ui', tags: ['toggle', 'collapse', 'expand', 'faq'] },
      { name: 'Avatars', icon: '👤', path: 'components/avatars/index.html', category: 'ui', tags: ['profile', 'user', 'image', 'photo'] },
      { name: 'Badges', icon: '🏷️', path: 'components/badges/index.html', category: 'ui', tags: ['label', 'tag', 'status', 'notification'] },
      { name: 'Breadcrumbs', icon: '🥖', path: 'components/breadcrumbs/index.html', category: 'ui', tags: ['navigation', 'path', 'hierarchy'] },
      { name: 'Buttons', icon: '🔘', path: 'components/buttons/index.html', category: 'ui', tags: ['click', 'action', 'cta', 'submit', 'primary', 'secondary'] },
      { name: 'Cards', icon: '🃏', path: 'components/cards/index.html', category: 'ui', tags: ['container', 'box', 'panel', 'product', 'article'] },
      { name: 'Carousels', icon: '🎠', path: 'components/carousels/index.html', category: 'ui', tags: ['slider', 'gallery', 'swiper', 'slideshow'] },
      { name: 'Chips', icon: '🏷️', path: 'components/chips/index.html', category: 'ui', tags: ['tag', 'filter', 'selection', 'input'] },
      { name: 'Code Snippets', icon: '💻', path: 'components/code-snippets/index.html', category: 'ui', tags: ['code', 'syntax', 'highlight', 'terminal', 'programming'] },
      { name: 'Dividers', icon: '➖', path: 'components/dividers/index.html', category: 'ui', tags: ['separator', 'line', 'hr'] },
      { name: 'Dropdowns', icon: '📋', path: 'components/dropdowns/index.html', category: 'ui', tags: ['menu', 'select', 'options', 'popover'] },
      { name: 'Empty States', icon: '📭', path: 'components/empty-states/index.html', category: 'ui', tags: ['placeholder', 'no-data', 'illustration'] },
      { name: 'File Upload', icon: '📤', path: 'components/file-upload/index.html', category: 'ui', tags: ['drag', 'drop', 'input', 'attachment'] },
      { name: 'Forms', icon: '📝', path: 'components/forms/index.html', category: 'ui', tags: ['input', 'select', 'textarea', 'checkbox', 'radio', 'validation'] },
      { name: 'Loaders', icon: '⏳', path: 'components/loaders/index.html', category: 'ui', tags: ['spinner', 'loading', 'progress', 'wait', 'skeleton'] },
      { name: 'Maps', icon: '🗺️', path: 'components/maps/index.html', category: 'ui', tags: ['location', 'mapbox', 'leaflet', 'marker'] },
      { name: 'Modals', icon: '💬', path: 'components/modals/index.html', category: 'ui', tags: ['dialog', 'popup', 'overlay', 'alert', 'confirm'] },
      { name: 'Navigation', icon: '🧭', path: 'components/navigation/index.html', category: 'ui', tags: ['navbar', 'menu', 'sidebar', 'header'] },
      { name: 'Notifications', icon: '🔔', path: 'components/notifications/index.html', category: 'ui', tags: ['alert', 'toast', 'message', 'snackbar'] },
      { name: 'Pagination', icon: '📄', path: 'components/pagination/index.html', category: 'ui', tags: ['pages', 'navigation', 'list'] },
      { name: 'Progress', icon: '📊', path: 'components/progress/index.html', category: 'ui', tags: ['bar', 'percentage', 'loading', 'indicator'] },
      { name: 'Ratings', icon: '⭐', path: 'components/ratings/index.html', category: 'ui', tags: ['stars', 'review', 'score', 'feedback'] },
      { name: 'Scroll Animations', icon: '📜', path: 'components/scroll-animations/index.html', category: 'ui', tags: ['scroll', 'animate', 'fade', 'parallax', 'reveal'] },
      { name: 'Search', icon: '🔍', path: 'components/search/index.html', category: 'ui', tags: ['input', 'filter', 'find', 'autocomplete'] },
      { name: 'Skeletons', icon: '💀', path: 'components/skeletons/index.html', category: 'ui', tags: ['loading', 'placeholder', 'shimmer'] },
      { name: 'Sliders', icon: '🎚️', path: 'components/sliders/index.html', category: 'ui', tags: ['range', 'input', 'value'] },
      { name: 'Steppers', icon: '📶', path: 'components/steppers/index.html', category: 'ui', tags: ['wizard', 'progress', 'steps', 'timeline'] },
      { name: 'Tables', icon: '📋', path: 'components/tables/index.html', category: 'ui', tags: ['data', 'grid', 'list', 'rows', 'columns'] },
      { name: 'Tabs', icon: '📑', path: 'components/tabs/index.html', category: 'ui', tags: ['navigation', 'switch', 'panels'] },
      { name: 'Timelines', icon: '📅', path: 'components/timelines/index.html', category: 'ui', tags: ['history', 'events', 'chronology'] },
      { name: 'Toasts', icon: '🍞', path: 'components/toasts/index.html', category: 'ui', tags: ['notification', 'alert', 'message', 'snackbar'] },
      { name: 'Toggles', icon: '🔘', path: 'components/toggles/index.html', category: 'ui', tags: ['switch', 'checkbox', 'on-off'] },
      { name: 'Tooltips', icon: '💡', path: 'components/tooltips/index.html', category: 'ui', tags: ['hint', 'help', 'info', 'hover'] },

      // Effects
      { name: 'Animations', icon: '✨', path: 'components/animations/index.html', category: 'effects', tags: ['motion', 'transition', 'keyframes', 'fade', 'slide'] },
      { name: 'Backgrounds', icon: '🎨', path: 'components/backgrounds/index.html', category: 'effects', tags: ['gradient', 'pattern', 'particles', 'mesh'] },
      { name: 'Cursors', icon: '🎯', path: 'components/cursors/index.html', category: 'effects', tags: ['pointer', 'custom', 'trail', 'follower'] },
      { name: 'Glassmorphism', icon: '🪟', path: 'components/glassmorphism/index.html', category: 'effects', tags: ['blur', 'glass', 'frosted', 'transparent'] },
      { name: 'Hovers', icon: '👆', path: 'components/hovers/index.html', category: 'effects', tags: ['interaction', 'effect', 'transform', 'scale'] },
      { name: 'Mouse Effects', icon: '🖱️', path: 'components/mouse-effects/index.html', category: 'effects', tags: ['parallax', 'tilt', '3d', 'tracking'] },
      { name: 'Neumorphism', icon: '🔘', path: 'components/neumorphism/index.html', category: 'effects', tags: ['soft', 'shadow', 'relief', '3d'] },
      { name: 'Text Effects', icon: '🔤', path: 'components/text-effects/index.html', category: 'effects', tags: ['typing', 'gradient', 'glitch', 'neon'] },

      // Sections
      { name: 'CTA', icon: '📢', path: 'components/cta/index.html', category: 'sections', tags: ['call-to-action', 'banner', 'conversion'] },
      { name: 'Features', icon: '⭐', path: 'components/features/index.html', category: 'sections', tags: ['showcase', 'benefits', 'grid'] },
      { name: 'Heroes', icon: '🦸', path: 'components/heroes/index.html', category: 'sections', tags: ['header', 'banner', 'landing', 'intro'] },
      { name: 'Pricing', icon: '💰', path: 'components/pricing/index.html', category: 'sections', tags: ['plans', 'subscription', 'table', 'comparison'] },
      { name: 'Testimonials', icon: '💬', path: 'components/testimonials/index.html', category: 'sections', tags: ['reviews', 'quotes', 'clients', 'feedback'] },
      { name: 'Footers', icon: '🦶', path: 'components/footers/index.html', category: 'sections', tags: ['bottom', 'links', 'copyright'] },

      // Generators
      { name: 'Gradient Generator', icon: '🌈', path: 'generators/gradient/index.html', category: 'generators', tags: ['linear', 'radial', 'conic', 'color'] },
      { name: 'Text Gradient Generator', icon: '🔤', path: 'generators/text-gradient/index.html', category: 'generators', tags: ['text', 'gradient', 'animated', 'typography'] },
      { name: 'Flexbox Generator', icon: '📐', path: 'generators/flexbox/index.html', category: 'generators', tags: ['layout', 'align', 'justify', 'container'] },
      { name: 'Grid Generator', icon: '🔲', path: 'generators/grid/index.html', category: 'generators', tags: ['layout', 'columns', 'rows', 'template'] },
      { name: 'Shadow Generator', icon: '🌑', path: 'generators/shadow/index.html', category: 'generators', tags: ['box-shadow', 'drop', 'layers'] },
      { name: 'Border Radius', icon: '⬜', path: 'generators/border-radius/index.html', category: 'generators', tags: ['corners', 'rounded', 'shape'] },
      { name: 'Animation Generator', icon: '🎬', path: 'generators/animation/index.html', category: 'generators', tags: ['keyframes', 'timing', 'easing'] },
      { name: 'Clip Path', icon: '✂️', path: 'generators/clip-path/index.html', category: 'generators', tags: ['shape', 'mask', 'polygon'] },
      { name: 'Glassmorphism Generator', icon: '🪟', path: 'generators/glassmorphism/index.html', category: 'generators', tags: ['blur', 'glass', 'frosted'] },
      { name: 'Neumorphism Generator', icon: '🔘', path: 'generators/neumorphism/index.html', category: 'generators', tags: ['soft', 'ui', 'shadow'] },

      // Design System
      { name: 'Palettes', icon: '🎨', path: 'palettes/index.html', category: 'design', tags: ['colors', 'theme', 'scheme'] },
      { name: 'Typography', icon: '🔤', path: 'typography/index.html', category: 'design', tags: ['fonts', 'text', 'headings'] },
    ];
  }

  /* ===========================================
     CRÉATION DE L'INTERFACE
     =========================================== */

  /**
   * Crée l'interface de recherche
   */
  createSearchUI() {
    // Overlay
    this.searchOverlay = document.createElement('div');
    this.searchOverlay.className = 'search-overlay';
    this.searchOverlay.innerHTML = `
      <div class="search-modal">
        <div class="search-modal__header">
          <div class="search-modal__input-wrapper">
            <svg class="search-modal__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="search-modal__input" placeholder="Rechercher un composant..." autocomplete="off" autofocus>
            <kbd class="search-modal__shortcut">ESC</kbd>
          </div>
        </div>
        <div class="search-modal__results">
          <div class="search-modal__empty">
            <span class="search-modal__empty-icon">🔍</span>
            <span class="search-modal__empty-text">Tapez pour rechercher...</span>
            <span class="search-modal__empty-hint">Utilisez <kbd>Ctrl</kbd> + <kbd>K</kbd> pour ouvrir rapidement</span>
          </div>
        </div>
        <div class="search-modal__footer">
          <span class="search-modal__hint"><kbd>↑</kbd><kbd>↓</kbd> Naviguer</span>
          <span class="search-modal__hint"><kbd>↵</kbd> Ouvrir</span>
          <span class="search-modal__hint"><kbd>ESC</kbd> Fermer</span>
        </div>
      </div>
    `;

    document.body.appendChild(this.searchOverlay);

    this.searchInput = this.searchOverlay.querySelector('.search-modal__input');
    this.searchResults = this.searchOverlay.querySelector('.search-modal__results');

    // Ajouter le bouton de recherche dans le header du dashboard
    this.addSearchButton();
  }

  /**
   * Ajoute un bouton de recherche dans la sidebar
   */
  addSearchButton() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Créer le bouton de recherche
    const searchBtn = document.createElement('button');
    searchBtn.className = 'sidebar__search-btn';
    searchBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span>Rechercher...</span>
      <kbd>Ctrl K</kbd>
    `;

    // Insérer après le logo
    const logo = sidebar.querySelector('.sidebar__logo');
    if (logo) {
      logo.insertAdjacentElement('afterend', searchBtn);
    }

    searchBtn.addEventListener('click', () => this.open());
  }

  /* ===========================================
     GESTION DES ÉVÉNEMENTS
     =========================================== */

  /**
   * Raccourci clavier Ctrl+K
   */
  bindKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+K ou Cmd+K pour ouvrir
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggle();
      }

      // Escape pour fermer
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Bind tous les événements
   */
  bindEvents() {
    // Fermer en cliquant sur l'overlay
    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.close();
      }
    });

    // Recherche en temps réel
    this.searchInput.addEventListener('input', (e) => {
      this.search(e.target.value);
    });

    // Navigation clavier dans les résultats
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });
  }

  /**
   * Navigation avec les flèches
   */
  handleKeyNavigation(e) {
    const results = this.searchResults.querySelectorAll('.search-result');
    if (results.length === 0) return;

    const active = this.searchResults.querySelector('.search-result--active');
    let currentIndex = Array.from(results).indexOf(active);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        currentIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
        this.setActiveResult(results, currentIndex);
        break;

      case 'ArrowUp':
        e.preventDefault();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
        this.setActiveResult(results, currentIndex);
        break;

      case 'Enter':
        e.preventDefault();
        if (active) {
          window.location.href = active.href;
        }
        break;
    }
  }

  /**
   * Définit le résultat actif
   */
  setActiveResult(results, index) {
    results.forEach(r => r.classList.remove('search-result--active'));
    results[index]?.classList.add('search-result--active');
    results[index]?.scrollIntoView({ block: 'nearest' });
  }

  /* ===========================================
     RECHERCHE
     =========================================== */

  /**
   * Effectue la recherche
   */
  search(query) {
    query = query.toLowerCase().trim();

    if (!query) {
      this.showEmptyState();
      return;
    }

    // Filtrer les composants
    const results = this.components.filter(component => {
      const nameMatch = component.name.toLowerCase().includes(query);
      const tagsMatch = component.tags.some(tag => tag.includes(query));
      const categoryMatch = component.category.includes(query);
      return nameMatch || tagsMatch || categoryMatch;
    });

    // Trier par pertinence (nom en premier)
    results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().startsWith(query);
      const bNameMatch = b.name.toLowerCase().startsWith(query);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    this.renderResults(results, query);
  }

  /**
   * Affiche l'état vide
   */
  showEmptyState() {
    this.searchResults.innerHTML = `
      <div class="search-modal__empty">
        <span class="search-modal__empty-icon">🔍</span>
        <span class="search-modal__empty-text">Tapez pour rechercher...</span>
        <span class="search-modal__empty-hint">Essayez: button, card, loader, gradient...</span>
      </div>
    `;
  }

  /**
   * Affiche les résultats
   */
  renderResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-modal__empty">
          <span class="search-modal__empty-icon">😕</span>
          <span class="search-modal__empty-text">Aucun résultat pour "${query}"</span>
          <span class="search-modal__empty-hint">Essayez un autre terme de recherche</span>
        </div>
      `;
      return;
    }

    // Grouper par catégorie
    const grouped = this.groupByCategory(results);

    let html = '';

    for (const [category, items] of Object.entries(grouped)) {
      const categoryLabels = {
        'ui': 'Composants UI',
        'effects': 'Effets',
        'sections': 'Sections',
        'generators': 'Générateurs',
        'design': 'Design System'
      };

      html += `
        <div class="search-results__group">
          <div class="search-results__category">${categoryLabels[category] || category}</div>
          ${items.map((item, i) => `
            <a href="${item.path}" class="search-result ${i === 0 && category === Object.keys(grouped)[0] ? 'search-result--active' : ''}">
              <span class="search-result__icon">${item.icon}</span>
              <div class="search-result__content">
                <span class="search-result__name">${this.highlightMatch(item.name, query)}</span>
                <span class="search-result__tags">${item.tags.slice(0, 3).join(' • ')}</span>
              </div>
              <svg class="search-result__arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          `).join('')}
        </div>
      `;
    }

    this.searchResults.innerHTML = html;
  }

  /**
   * Groupe les résultats par catégorie
   */
  groupByCategory(results) {
    return results.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }

  /**
   * Met en surbrillance le texte correspondant
   */
  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /* ===========================================
     OUVERTURE/FERMETURE
     =========================================== */

  open() {
    this.isOpen = true;
    this.searchOverlay.classList.add('search-overlay--open');
    this.searchInput.value = '';
    this.showEmptyState();

    // Focus avec délai pour l'animation
    setTimeout(() => {
      this.searchInput.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.searchOverlay.classList.remove('search-overlay--open');
    this.searchInput.blur();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  window.globalSearch = new GlobalSearch();
});
