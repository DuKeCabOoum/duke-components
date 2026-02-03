/* ===========================================
   ACCESSIBILITY — Duke-components
   Amélioration de l'accessibilité
   =========================================== */

/**
 * Classe pour la gestion de l'accessibilité
 * CRÉE : Navigation clavier et annonces pour lecteurs d'écran
 */
class AccessibilityManager {
  constructor() {
    this.announcer = null;
    this.isKeyboardNav = false;

    this.init();
  }

  /**
   * Initialise le gestionnaire d'accessibilité
   */
  init() {
    this.setupAnnouncer();
    this.detectKeyboardNavigation();
    this.enhanceCodeViewerTabs();
    this.addAriaLabels();
    this.setupKeyboardShortcuts();
  }

  /* ===========================================
     ANNONCEUR POUR LECTEURS D'ÉCRAN
     =========================================== */

  /**
   * Configure l'annonceur live region
   */
  setupAnnouncer() {
    this.announcer = document.getElementById('announcer');
    if (!this.announcer) {
      this.announcer = document.createElement('div');
      this.announcer.id = 'announcer';
      this.announcer.setAttribute('aria-live', 'polite');
      this.announcer.setAttribute('aria-atomic', 'true');
      this.announcer.className = 'sr-only';
      document.body.appendChild(this.announcer);
    }
  }

  /**
   * Annonce un message aux lecteurs d'écran
   * @param {string} message - Message à annoncer
   * @param {string} priority - 'polite' ou 'assertive'
   */
  announce(message, priority = 'polite') {
    if (!this.announcer) return;

    this.announcer.setAttribute('aria-live', priority);
    this.announcer.textContent = '';

    // Petit délai pour forcer la relecture
    setTimeout(() => {
      this.announcer.textContent = message;
    }, 100);
  }

  /* ===========================================
     DÉTECTION NAVIGATION CLAVIER
     =========================================== */

  /**
   * Détecte si l'utilisateur utilise le clavier
   */
  detectKeyboardNavigation() {
    // Ajoute la classe keyboard-navigation au body lors de l'utilisation Tab
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
        this.isKeyboardNav = true;
      }
    });

    // Retire la classe lors d'un clic souris
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
      this.isKeyboardNav = false;
    });
  }

  /* ===========================================
     AMÉLIORATION DES TABS CODE VIEWER
     =========================================== */

  /**
   * Améliore l'accessibilité des tabs du code viewer
   */
  enhanceCodeViewerTabs() {
    document.querySelectorAll('.code-viewer').forEach((viewer, viewerIndex) => {
      const tabs = viewer.querySelectorAll('.code-viewer__tab');
      const panels = viewer.querySelectorAll('.code-viewer__code');

      // Ajoute les attributs ARIA
      tabs.forEach((tab, index) => {
        const panelId = `code-panel-${viewerIndex}-${index}`;
        const tabId = `code-tab-${viewerIndex}-${index}`;

        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', tabId);
        tab.setAttribute('aria-controls', panelId);
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tab.setAttribute('tabindex', index === 0 ? '0' : '-1');

        if (panels[index]) {
          panels[index].setAttribute('role', 'tabpanel');
          panels[index].setAttribute('id', panelId);
          panels[index].setAttribute('aria-labelledby', tabId);
        }
      });

      // Navigation clavier entre tabs
      const tabList = tabs[0]?.parentElement;
      if (tabList) {
        tabList.setAttribute('role', 'tablist');

        tabList.addEventListener('keydown', (e) => {
          const currentTab = document.activeElement;
          const tabArray = Array.from(tabs);
          const currentIndex = tabArray.indexOf(currentTab);

          let newIndex;

          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault();
              newIndex = (currentIndex + 1) % tabs.length;
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              e.preventDefault();
              newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
              break;
            case 'Home':
              e.preventDefault();
              newIndex = 0;
              break;
            case 'End':
              e.preventDefault();
              newIndex = tabs.length - 1;
              break;
            default:
              return;
          }

          // Met à jour le focus et active le tab
          tabs[newIndex].focus();
          tabs[newIndex].click();

          // Met à jour les attributs ARIA
          tabs.forEach((t, i) => {
            t.setAttribute('aria-selected', i === newIndex ? 'true' : 'false');
            t.setAttribute('tabindex', i === newIndex ? '0' : '-1');
          });
        });
      }
    });
  }

  /* ===========================================
     AJOUT DES LABELS ARIA MANQUANTS
     =========================================== */

  /**
   * Ajoute les labels ARIA manquants
   */
  addAriaLabels() {
    // Boutons copy
    document.querySelectorAll('.copy-btn').forEach(btn => {
      if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', 'Copier le code');
      }
    });

    // Boutons edit
    document.querySelectorAll('.edit-btn').forEach(btn => {
      if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', 'Modifier le composant');
      }
    });

    // Toggle admin
    const adminToggle = document.getElementById('admin-toggle');
    if (adminToggle && !adminToggle.getAttribute('aria-label')) {
      adminToggle.setAttribute('aria-label', 'Activer le mode administrateur');
    }

    // Cards de composants
    document.querySelectorAll('.component-card').forEach(card => {
      const name = card.querySelector('.component-card__name');
      if (name && !card.getAttribute('aria-label')) {
        card.setAttribute('aria-label', `Composant: ${name.textContent}`);
      }
    });

    // Stats cards
    document.querySelectorAll('.stat-card').forEach(card => {
      const label = card.querySelector('.stat-card__label');
      const value = card.querySelector('.stat-card__value');
      if (label && value && !card.getAttribute('aria-label')) {
        card.setAttribute('aria-label', `${label.textContent}: ${value.textContent}`);
      }
    });

    // Badges de sécurité
    document.querySelectorAll('.security-badge').forEach(badge => {
      const level = badge.textContent.trim();
      const descriptions = {
        'SAFE': 'Code sécurisé, peut être copié sans risque',
        'CAUTION': 'Code à utiliser avec précaution',
        'SENSITIVE': 'Code sensible, accès administrateur requis'
      };
      badge.setAttribute('aria-label', descriptions[level] || level);
      badge.setAttribute('role', 'status');
    });
  }

  /* ===========================================
     RACCOURCIS CLAVIER
     =========================================== */

  /**
   * Configure les raccourcis clavier globaux
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // ? pour afficher l'aide
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        e.preventDefault();
        this.showKeyboardHelp();
      }

      // Escape pour fermer les modales
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  /**
   * Affiche l'aide des raccourcis clavier
   */
  showKeyboardHelp() {
    const existingHelp = document.querySelector('.keyboard-help-modal');
    if (existingHelp) {
      existingHelp.remove();
      return;
    }

    const modal = document.createElement('div');
    modal.className = 'keyboard-help-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Raccourcis clavier');
    modal.innerHTML = `
      <div class="keyboard-help-modal__content">
        <h2>Raccourcis clavier</h2>
        <ul>
          <li><kbd>Ctrl</kbd> + <kbd>K</kbd> — Ouvrir la recherche</li>
          <li><kbd>?</kbd> — Afficher cette aide</li>
          <li><kbd>Escape</kbd> — Fermer les modales</li>
          <li><kbd>Tab</kbd> — Navigation entre éléments</li>
          <li><kbd>Enter</kbd> — Activer l'élément focalisé</li>
          <li><kbd>←</kbd> <kbd>→</kbd> — Naviguer entre les tabs</li>
        </ul>
        <button class="keyboard-help-modal__close" aria-label="Fermer">×</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Focus sur le bouton de fermeture
    const closeBtn = modal.querySelector('.keyboard-help-modal__close');
    closeBtn.focus();
    closeBtn.addEventListener('click', () => modal.remove());

    // Fermer avec Escape
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.remove();
    });

    // Fermer en cliquant en dehors
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  /**
   * Ferme toutes les modales ouvertes
   */
  closeAllModals() {
    // Ferme le search overlay
    const searchOverlay = document.querySelector('.search-overlay--open');
    if (searchOverlay) {
      window.globalSearch?.close();
    }

    // Ferme l'aide clavier
    const helpModal = document.querySelector('.keyboard-help-modal');
    if (helpModal) {
      helpModal.remove();
    }
  }
}

/* ===========================================
   STYLES POUR LA MODALE D'AIDE
   =========================================== */

const helpStyles = document.createElement('style');
helpStyles.textContent = `
  .keyboard-help-modal {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  }

  .keyboard-help-modal__content {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    max-width: 400px;
    width: 90%;
    position: relative;
  }

  .keyboard-help-modal h2 {
    margin-bottom: var(--spacing-lg);
    font-size: 1.25rem;
  }

  .keyboard-help-modal ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .keyboard-help-modal li {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .keyboard-help-modal kbd {
    padding: 2px 8px;
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }

  .keyboard-help-modal__close {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.25rem;
    transition: all var(--transition-fast);
  }

  .keyboard-help-modal__close:hover {
    background: var(--bg-dark);
    color: var(--text-primary);
  }
`;
document.head.appendChild(helpStyles);

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = new AccessibilityManager();
});
