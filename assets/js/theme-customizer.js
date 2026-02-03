/* ===========================================
   THEME CUSTOMIZER — Duke-components
   Personnalisation des couleurs en temps réel
   =========================================== */

/**
 * Classe de personnalisation du thème
 * CRÉE : Un panneau de customisation des couleurs
 */
class ThemeCustomizer {
  constructor() {
    this.isOpen = false;
    this.panel = null;
    this.defaultTheme = {
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      primaryLight: '#818cf8',
      accentGreen: '#10b981',
      accentRed: '#ef4444',
      accentYellow: '#f59e0b',
      accentBlue: '#3b82f6'
    };
    this.currentTheme = { ...this.defaultTheme };

    this.init();
  }

  /**
   * Initialise le customizer
   */
  init() {
    this.loadSavedTheme();
    this.createToggleButton();
    this.createPanel();
    this.bindEvents();
    this.applyTheme();
  }

  /* ===========================================
     CHARGEMENT/SAUVEGARDE DU THÈME
     =========================================== */

  /**
   * Charge le thème sauvegardé
   */
  loadSavedTheme() {
    const saved = localStorage.getItem('dukeTheme');
    if (saved) {
      try {
        this.currentTheme = { ...this.defaultTheme, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to load theme:', e);
      }
    }
  }

  /**
   * Sauvegarde le thème actuel
   */
  saveTheme() {
    localStorage.setItem('dukeTheme', JSON.stringify(this.currentTheme));
  }

  /* ===========================================
     CRÉATION DE L'INTERFACE
     =========================================== */

  /**
   * Crée le bouton toggle
   */
  createToggleButton() {
    const btn = document.createElement('button');
    btn.className = 'theme-customizer-toggle';
    btn.setAttribute('aria-label', 'Personnaliser le thème');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    `;

    document.body.appendChild(btn);

    btn.addEventListener('click', () => this.toggle());
  }

  /**
   * Crée le panneau de customisation
   */
  createPanel() {
    this.panel = document.createElement('div');
    this.panel.className = 'theme-customizer-panel';
    this.panel.innerHTML = `
      <div class="theme-customizer-panel__header">
        <h3>Personnaliser le thème</h3>
        <button class="theme-customizer-panel__close" aria-label="Fermer">×</button>
      </div>

      <div class="theme-customizer-panel__content">
        <div class="theme-customizer-panel__section">
          <h4>Couleurs principales</h4>

          <div class="color-control">
            <label>
              <span>Primaire</span>
              <input type="color" data-var="primary" value="${this.currentTheme.primary}">
            </label>
            <input type="text" data-var="primary" value="${this.currentTheme.primary}">
          </div>

          <div class="color-control">
            <label>
              <span>Primaire hover</span>
              <input type="color" data-var="primaryHover" value="${this.currentTheme.primaryHover}">
            </label>
            <input type="text" data-var="primaryHover" value="${this.currentTheme.primaryHover}">
          </div>

          <div class="color-control">
            <label>
              <span>Primaire light</span>
              <input type="color" data-var="primaryLight" value="${this.currentTheme.primaryLight}">
            </label>
            <input type="text" data-var="primaryLight" value="${this.currentTheme.primaryLight}">
          </div>
        </div>

        <div class="theme-customizer-panel__section">
          <h4>Couleurs d'accent</h4>

          <div class="color-control">
            <label>
              <span>Success (vert)</span>
              <input type="color" data-var="accentGreen" value="${this.currentTheme.accentGreen}">
            </label>
            <input type="text" data-var="accentGreen" value="${this.currentTheme.accentGreen}">
          </div>

          <div class="color-control">
            <label>
              <span>Error (rouge)</span>
              <input type="color" data-var="accentRed" value="${this.currentTheme.accentRed}">
            </label>
            <input type="text" data-var="accentRed" value="${this.currentTheme.accentRed}">
          </div>

          <div class="color-control">
            <label>
              <span>Warning (jaune)</span>
              <input type="color" data-var="accentYellow" value="${this.currentTheme.accentYellow}">
            </label>
            <input type="text" data-var="accentYellow" value="${this.currentTheme.accentYellow}">
          </div>

          <div class="color-control">
            <label>
              <span>Info (bleu)</span>
              <input type="color" data-var="accentBlue" value="${this.currentTheme.accentBlue}">
            </label>
            <input type="text" data-var="accentBlue" value="${this.currentTheme.accentBlue}">
          </div>
        </div>

        <div class="theme-customizer-panel__section">
          <h4>Presets</h4>
          <div class="theme-presets">
            <button class="theme-preset" data-preset="default" style="background: linear-gradient(135deg, #6366f1, #8b5cf6)">
              Indigo
            </button>
            <button class="theme-preset" data-preset="emerald" style="background: linear-gradient(135deg, #10b981, #34d399)">
              Emerald
            </button>
            <button class="theme-preset" data-preset="rose" style="background: linear-gradient(135deg, #f43f5e, #fb7185)">
              Rose
            </button>
            <button class="theme-preset" data-preset="amber" style="background: linear-gradient(135deg, #f59e0b, #fbbf24)">
              Amber
            </button>
            <button class="theme-preset" data-preset="cyan" style="background: linear-gradient(135deg, #06b6d4, #22d3ee)">
              Cyan
            </button>
            <button class="theme-preset" data-preset="violet" style="background: linear-gradient(135deg, #8b5cf6, #a78bfa)">
              Violet
            </button>
          </div>
        </div>
      </div>

      <div class="theme-customizer-panel__footer">
        <button class="theme-customizer-btn theme-customizer-btn--secondary" id="reset-theme">
          Reset
        </button>
        <button class="theme-customizer-btn theme-customizer-btn--primary" id="export-theme">
          Exporter CSS
        </button>
      </div>
    `;

    document.body.appendChild(this.panel);
  }

  /* ===========================================
     ÉVÉNEMENTS
     =========================================== */

  /**
   * Bind tous les événements
   */
  bindEvents() {
    // Fermer le panel
    this.panel.querySelector('.theme-customizer-panel__close')
      .addEventListener('click', () => this.close());

    // Color pickers et text inputs
    this.panel.querySelectorAll('input[data-var]').forEach(input => {
      input.addEventListener('input', (e) => {
        const varName = e.target.dataset.var;
        const value = e.target.value;

        // Synchroniser les deux inputs
        this.panel.querySelectorAll(`[data-var="${varName}"]`).forEach(el => {
          if (el !== e.target) el.value = value;
        });

        this.currentTheme[varName] = value;
        this.applyTheme();
        this.saveTheme();
      });
    });

    // Presets
    this.panel.querySelectorAll('.theme-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyPreset(btn.dataset.preset);
      });
    });

    // Reset
    this.panel.querySelector('#reset-theme').addEventListener('click', () => {
      this.resetTheme();
    });

    // Export
    this.panel.querySelector('#export-theme').addEventListener('click', () => {
      this.exportCSS();
    });
  }

  /* ===========================================
     APPLICATION DU THÈME
     =========================================== */

  /**
   * Applique le thème aux variables CSS
   */
  applyTheme() {
    const root = document.documentElement;

    root.style.setProperty('--primary', this.currentTheme.primary);
    root.style.setProperty('--primary-hover', this.currentTheme.primaryHover);
    root.style.setProperty('--primary-light', this.currentTheme.primaryLight);
    root.style.setProperty('--accent-green', this.currentTheme.accentGreen);
    root.style.setProperty('--accent-red', this.currentTheme.accentRed);
    root.style.setProperty('--accent-yellow', this.currentTheme.accentYellow);
    root.style.setProperty('--accent-blue', this.currentTheme.accentBlue);

    // Met à jour les alias
    root.style.setProperty('--accent-primary', this.currentTheme.primary);
    root.style.setProperty('--accent-secondary', this.currentTheme.primaryHover);
    root.style.setProperty('--success', this.currentTheme.accentGreen);
    root.style.setProperty('--error', this.currentTheme.accentRed);
    root.style.setProperty('--warning', this.currentTheme.accentYellow);
  }

  /**
   * Applique un preset
   */
  applyPreset(preset) {
    const presets = {
      default: {
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        primaryLight: '#818cf8',
        accentGreen: '#10b981',
        accentRed: '#ef4444',
        accentYellow: '#f59e0b',
        accentBlue: '#3b82f6'
      },
      emerald: {
        primary: '#10b981',
        primaryHover: '#059669',
        primaryLight: '#34d399',
        accentGreen: '#22c55e',
        accentRed: '#ef4444',
        accentYellow: '#f59e0b',
        accentBlue: '#0ea5e9'
      },
      rose: {
        primary: '#f43f5e',
        primaryHover: '#e11d48',
        primaryLight: '#fb7185',
        accentGreen: '#10b981',
        accentRed: '#dc2626',
        accentYellow: '#f59e0b',
        accentBlue: '#3b82f6'
      },
      amber: {
        primary: '#f59e0b',
        primaryHover: '#d97706',
        primaryLight: '#fbbf24',
        accentGreen: '#10b981',
        accentRed: '#ef4444',
        accentYellow: '#eab308',
        accentBlue: '#3b82f6'
      },
      cyan: {
        primary: '#06b6d4',
        primaryHover: '#0891b2',
        primaryLight: '#22d3ee',
        accentGreen: '#10b981',
        accentRed: '#ef4444',
        accentYellow: '#f59e0b',
        accentBlue: '#0ea5e9'
      },
      violet: {
        primary: '#8b5cf6',
        primaryHover: '#7c3aed',
        primaryLight: '#a78bfa',
        accentGreen: '#10b981',
        accentRed: '#ef4444',
        accentYellow: '#f59e0b',
        accentBlue: '#3b82f6'
      }
    };

    if (presets[preset]) {
      this.currentTheme = { ...presets[preset] };
      this.updateInputs();
      this.applyTheme();
      this.saveTheme();
    }
  }

  /**
   * Reset le thème
   */
  resetTheme() {
    this.currentTheme = { ...this.defaultTheme };
    this.updateInputs();
    this.applyTheme();
    localStorage.removeItem('dukeTheme');
  }

  /**
   * Met à jour les inputs du panel
   */
  updateInputs() {
    Object.entries(this.currentTheme).forEach(([key, value]) => {
      this.panel.querySelectorAll(`[data-var="${key}"]`).forEach(input => {
        input.value = value;
      });
    });
  }

  /**
   * Exporte le thème en CSS
   */
  exportCSS() {
    const css = `:root {
  --primary: ${this.currentTheme.primary};
  --primary-hover: ${this.currentTheme.primaryHover};
  --primary-light: ${this.currentTheme.primaryLight};
  --accent-green: ${this.currentTheme.accentGreen};
  --accent-red: ${this.currentTheme.accentRed};
  --accent-yellow: ${this.currentTheme.accentYellow};
  --accent-blue: ${this.currentTheme.accentBlue};
}`;

    navigator.clipboard.writeText(css).then(() => {
      const btn = this.panel.querySelector('#export-theme');
      btn.textContent = 'Copié !';
      setTimeout(() => {
        btn.textContent = 'Exporter CSS';
      }, 2000);
    });
  }

  /* ===========================================
     OUVERTURE/FERMETURE
     =========================================== */

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.panel.classList.add('theme-customizer-panel--open');
  }

  close() {
    this.isOpen = false;
    this.panel.classList.remove('theme-customizer-panel--open');
  }
}

/* ===========================================
   STYLES
   =========================================== */

const customizerStyles = document.createElement('style');
customizerStyles.textContent = `
  /* Toggle Button */
  .theme-customizer-toggle {
    position: fixed;
    bottom: var(--spacing-lg);
    left: calc(var(--sidebar-width) + var(--spacing-lg));
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--text-secondary);
    cursor: pointer;
    z-index: 100;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-lg);
  }

  .theme-customizer-toggle:hover {
    background: var(--bg-card-hover);
    color: var(--primary);
    transform: rotate(45deg);
  }

  /* Panel */
  .theme-customizer-panel {
    position: fixed;
    bottom: calc(var(--spacing-lg) + 60px);
    left: calc(var(--sidebar-width) + var(--spacing-lg));
    width: 320px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--transition-base);
  }

  .theme-customizer-panel--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .theme-customizer-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border);
  }

  .theme-customizer-panel__header h3 {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .theme-customizer-panel__close {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: var(--radius-sm);
    font-size: 1.25rem;
    transition: all var(--transition-fast);
  }

  .theme-customizer-panel__close:hover {
    background: var(--bg-dark);
    color: var(--text-primary);
  }

  .theme-customizer-panel__content {
    padding: var(--spacing-md);
    max-height: 400px;
    overflow-y: auto;
  }

  .theme-customizer-panel__section {
    margin-bottom: var(--spacing-md);
  }

  .theme-customizer-panel__section h4 {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--spacing-sm);
  }

  /* Color Control */
  .color-control {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .color-control label {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex: 1;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .color-control input[type="color"] {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    padding: 0;
  }

  .color-control input[type="text"] {
    width: 80px;
    padding: 4px 8px;
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }

  /* Presets */
  .theme-presets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xs);
  }

  .theme-preset {
    padding: var(--spacing-sm);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: white;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .theme-preset:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* Footer */
  .theme-customizer-panel__footer {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    border-top: 1px solid var(--border);
  }

  .theme-customizer-btn {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .theme-customizer-btn--secondary {
    background: var(--bg-dark);
    border: 1px solid var(--border);
    color: var(--text-secondary);
  }

  .theme-customizer-btn--secondary:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
  }

  .theme-customizer-btn--primary {
    background: var(--primary);
    border: none;
    color: white;
  }

  .theme-customizer-btn--primary:hover {
    background: var(--primary-hover);
  }
`;
document.head.appendChild(customizerStyles);

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  window.themeCustomizer = new ThemeCustomizer();
});
