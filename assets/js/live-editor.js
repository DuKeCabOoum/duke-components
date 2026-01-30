/* ===========================================
   LIVE EDITOR — Duke-components
   Éditeur en temps réel des composants UI
   =========================================== */

/**
 * Configuration des propriétés éditables par type de composant
 * Chaque propriété définit : label, type de contrôle, min/max, unité
 */
const COMPONENT_CONFIGS = {
  button: {
    name: 'Button',
    properties: [
      // SECTION: Couleurs
      {
        property: 'backgroundColor',
        cssProperty: 'background-color',
        label: 'Background',
        type: 'color',
        section: 'Couleurs'
      },
      {
        property: 'color',
        cssProperty: 'color',
        label: 'Text Color',
        type: 'color',
        section: 'Couleurs'
      },
      {
        property: 'borderColor',
        cssProperty: 'border-color',
        label: 'Border Color',
        type: 'color',
        section: 'Couleurs'
      },
      // SECTION: Dimensions
      {
        property: 'paddingTop',
        cssProperty: 'padding-top',
        label: 'Padding vertical',
        type: 'slider',
        min: 4,
        max: 32,
        unit: 'px',
        section: 'Dimensions'
      },
      {
        property: 'paddingLeft',
        cssProperty: 'padding-left',
        label: 'Padding horizontal',
        type: 'slider',
        min: 8,
        max: 64,
        unit: 'px',
        section: 'Dimensions'
      },
      // SECTION: Border
      {
        property: 'borderRadius',
        cssProperty: 'border-radius',
        label: 'Border Radius',
        type: 'slider',
        min: 0,
        max: 50,
        unit: 'px',
        section: 'Border'
      },
      {
        property: 'borderWidth',
        cssProperty: 'border-width',
        label: 'Border Width',
        type: 'slider',
        min: 0,
        max: 8,
        unit: 'px',
        section: 'Border'
      },
      // SECTION: Typography
      {
        property: 'fontSize',
        cssProperty: 'font-size',
        label: 'Font Size',
        type: 'slider',
        min: 12,
        max: 24,
        unit: 'px',
        section: 'Typography'
      },
      {
        property: 'fontWeight',
        cssProperty: 'font-weight',
        label: 'Font Weight',
        type: 'select',
        options: [
          { value: '400', label: 'Regular (400)' },
          { value: '500', label: 'Medium (500)' },
          { value: '600', label: 'Semi-bold (600)' },
          { value: '700', label: 'Bold (700)' }
        ],
        section: 'Typography'
      }
    ]
  }
};

/**
 * Classe principale de l'éditeur live
 */
class LiveEditor {
  constructor() {
    this.panel = null;
    this.overlay = null;
    this.currentComponent = null;
    this.originalStyles = {};

    this.init();
  }

  /**
   * Initialise l'éditeur : crée le DOM et bind les events
   */
  init() {
    this.createPanel();
    this.createOverlay();
    this.bindGlobalEvents();
    this.bindEditButtons();
  }

  /* ===========================================
     CRÉATION DU DOM
     =========================================== */

  /**
   * Crée le panneau d'édition et l'injecte dans le body
   */
  createPanel() {
    this.panel = document.createElement('aside');
    this.panel.className = 'editor-panel';
    this.panel.id = 'editor-panel';
    this.panel.innerHTML = `
      <div class="editor-panel__header">
        <h3 class="editor-panel__title">Edit Component</h3>
        <button class="editor-panel__close" aria-label="Fermer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="editor-panel__content"></div>
      <div class="editor-panel__footer">
        <button class="editor-btn editor-btn--reset">Reset</button>
      </div>
    `;

    document.body.appendChild(this.panel);
  }

  /**
   * Crée l'overlay semi-transparent
   */
  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'editor-overlay';
    this.overlay.id = 'editor-overlay';
    document.body.appendChild(this.overlay);
  }

  /* ===========================================
     EVENT LISTENERS
     =========================================== */

  /**
   * Events globaux : fermeture panneau
   */
  bindGlobalEvents() {
    // Fermer avec le bouton X
    this.panel.querySelector('.editor-panel__close')
      .addEventListener('click', () => this.close());

    // Fermer avec l'overlay
    this.overlay.addEventListener('click', () => this.close());

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Bouton Reset
    this.panel.querySelector('.editor-btn--reset')
      .addEventListener('click', () => this.reset());
  }

  /**
   * Lie tous les boutons "Edit" aux composants
   */
  bindEditButtons() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const componentClass = btn.dataset.component;
        const componentType = btn.dataset.type || 'button';
        const codeViewerId = btn.dataset.code;
        this.open(componentClass, componentType, codeViewerId);
      });
    });
  }

  /* ===========================================
     OUVERTURE / FERMETURE
     =========================================== */

  /**
   * Ouvre le panneau pour un composant
   * @param {string} componentClass - Classe CSS du composant (ex: "btn-primary")
   * @param {string} componentType - Type de composant (ex: "button")
   * @param {string} codeViewerId - ID du code viewer CSS
   */
  open(componentClass, componentType, codeViewerId) {
    const element = document.querySelector(`.${componentClass}`);
    const codeViewer = document.getElementById(codeViewerId);
    const config = COMPONENT_CONFIGS[componentType];

    if (!element || !config) {
      console.error('Component or config not found:', componentClass, componentType);
      return;
    }

    // Stocker les références
    this.currentComponent = {
      element,
      codeViewer,
      config,
      className: componentClass
    };

    // Lire et sauvegarder les styles actuels
    this.originalStyles = this.readStyles(element, config);

    // Mettre à jour le titre
    this.panel.querySelector('.editor-panel__title').textContent =
      `Edit: ${config.name}`;

    // Générer les contrôles
    this.generateControls(config, this.originalStyles);

    // Afficher le panneau
    this.panel.classList.add('editor-panel--open');
    this.overlay.classList.add('editor-overlay--visible');
  }

  /**
   * Ferme le panneau
   */
  close() {
    this.panel.classList.remove('editor-panel--open');
    this.overlay.classList.remove('editor-overlay--visible');
  }

  /**
   * Vérifie si le panneau est ouvert
   */
  isOpen() {
    return this.panel.classList.contains('editor-panel--open');
  }

  /* ===========================================
     LECTURE DES STYLES
     =========================================== */

  /**
   * Lit les styles computed d'un élément
   * @param {HTMLElement} element - L'élément à analyser
   * @param {Object} config - Configuration du composant
   * @returns {Object} - Styles parsés { property: value }
   */
  readStyles(element, config) {
    const computed = window.getComputedStyle(element);
    const styles = {};

    config.properties.forEach(prop => {
      const cssValue = computed.getPropertyValue(prop.cssProperty);
      styles[prop.property] = this.parseValue(cssValue, prop);
    });

    return styles;
  }

  /**
   * Parse une valeur CSS pour l'utiliser dans un contrôle
   * @param {string} cssValue - Valeur CSS brute
   * @param {Object} propConfig - Configuration de la propriété
   */
  parseValue(cssValue, propConfig) {
    if (propConfig.type === 'color') {
      return this.rgbToHex(cssValue);
    }
    if (propConfig.type === 'slider') {
      return parseFloat(cssValue) || 0;
    }
    return cssValue.trim();
  }

  /**
   * Convertit rgb(r, g, b) en #rrggbb
   */
  rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent') return '#000000';
    if (rgb.startsWith('#')) return rgb;

    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return '#000000';

    return '#' + match.slice(0, 3)
      .map(x => parseInt(x).toString(16).padStart(2, '0'))
      .join('');
  }

  /* ===========================================
     GÉNÉRATION DES CONTRÔLES
     =========================================== */

  /**
   * Génère tous les contrôles dans le panneau
   */
  generateControls(config, currentStyles) {
    const content = this.panel.querySelector('.editor-panel__content');
    content.innerHTML = '';

    // Grouper par section
    const sections = this.groupBySection(config.properties);

    Object.entries(sections).forEach(([sectionName, props]) => {
      const section = document.createElement('section');
      section.className = 'editor-section';
      section.innerHTML = `<h4 class="editor-section__title">${sectionName}</h4>`;

      props.forEach(prop => {
        const control = this.createControl(prop, currentStyles[prop.property]);
        section.appendChild(control);
      });

      content.appendChild(section);
    });
  }

  /**
   * Groupe les propriétés par section
   */
  groupBySection(properties) {
    return properties.reduce((acc, prop) => {
      const section = prop.section || 'General';
      if (!acc[section]) acc[section] = [];
      acc[section].push(prop);
      return acc;
    }, {});
  }

  /**
   * Crée un contrôle selon son type
   */
  createControl(prop, currentValue) {
    const wrapper = document.createElement('div');
    wrapper.className = 'editor-control';
    wrapper.dataset.property = prop.property;

    switch (prop.type) {
      case 'color':
        wrapper.innerHTML = this.createColorControl(prop, currentValue);
        this.bindColorControl(wrapper, prop);
        break;
      case 'slider':
        wrapper.innerHTML = this.createSliderControl(prop, currentValue);
        this.bindSliderControl(wrapper, prop);
        break;
      case 'select':
        wrapper.innerHTML = this.createSelectControl(prop, currentValue);
        this.bindSelectControl(wrapper, prop);
        break;
    }

    return wrapper;
  }

  /* ===========================================
     CONTRÔLES : COLOR PICKER
     =========================================== */

  createColorControl(prop, value) {
    return `
      <label class="editor-control__label">${prop.label}</label>
      <div class="editor-control__input editor-control__input--color">
        <input type="color" class="color-picker" value="${value}">
        <input type="text" class="color-text" value="${value}"
               pattern="^#[0-9A-Fa-f]{6}$" maxlength="7">
      </div>
    `;
  }

  bindColorControl(wrapper, prop) {
    const picker = wrapper.querySelector('.color-picker');
    const text = wrapper.querySelector('.color-text');

    // Sync picker → text
    picker.addEventListener('input', (e) => {
      text.value = e.target.value;
      this.updateStyle(prop.property, e.target.value);
    });

    // Sync text → picker (avec validation)
    text.addEventListener('input', (e) => {
      const value = e.target.value;
      // Validation : doit être un hex valide
      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
        picker.value = value;
        this.updateStyle(prop.property, value);
      }
    });
  }

  /* ===========================================
     CONTRÔLES : SLIDER
     =========================================== */

  createSliderControl(prop, value) {
    const displayValue = value + (prop.unit || 'px');
    return `
      <label class="editor-control__label">
        ${prop.label}
        <span class="editor-control__value">${displayValue}</span>
      </label>
      <input type="range" class="editor-slider"
             min="${prop.min}" max="${prop.max}"
             step="${prop.step || 1}"
             value="${value}">
    `;
  }

  bindSliderControl(wrapper, prop) {
    const slider = wrapper.querySelector('.editor-slider');
    const valueDisplay = wrapper.querySelector('.editor-control__value');

    slider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      const unit = prop.unit || 'px';
      valueDisplay.textContent = value + unit;
      this.updateStyle(prop.property, value + unit);
    });
  }

  /* ===========================================
     CONTRÔLES : SELECT
     =========================================== */

  createSelectControl(prop, value) {
    const options = prop.options.map(opt =>
      `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>
        ${opt.label}
      </option>`
    ).join('');

    return `
      <label class="editor-control__label">${prop.label}</label>
      <select class="editor-select">${options}</select>
    `;
  }

  bindSelectControl(wrapper, prop) {
    const select = wrapper.querySelector('.editor-select');

    select.addEventListener('change', (e) => {
      this.updateStyle(prop.property, e.target.value);
    });
  }

  /* ===========================================
     MISE À JOUR DES STYLES
     =========================================== */

  /**
   * Met à jour le style du composant ET le code affiché
   * @param {string} property - Nom de la propriété JS (ex: "backgroundColor")
   * @param {string} value - Nouvelle valeur
   */
  updateStyle(property, value) {
    if (!this.currentComponent) return;

    const { element } = this.currentComponent;

    // 1. Mettre à jour la preview (style inline)
    element.style[property] = value;

    // 2. Gérer padding symétrique
    if (property === 'paddingTop') {
      element.style.paddingBottom = value;
    }
    if (property === 'paddingLeft') {
      element.style.paddingRight = value;
    }

    // 3. Mettre à jour le code viewer
    this.updateCodeViewer();
  }

  /**
   * Régénère le CSS complet dans le code viewer
   */
  updateCodeViewer() {
    if (!this.currentComponent || !this.currentComponent.codeViewer) return;

    const { element, codeViewer, className, config } = this.currentComponent;
    const computed = window.getComputedStyle(element);

    // Construire le CSS
    let css = `.${className} {\n`;

    // Propriétés de base
    css += `  padding: ${computed.paddingTop} ${computed.paddingRight};\n`;
    css += `  background: ${this.rgbToHex(computed.backgroundColor)};\n`;
    css += `  color: ${this.rgbToHex(computed.color)};\n`;
    css += `  border: ${computed.borderWidth} solid ${this.rgbToHex(computed.borderColor)};\n`;
    css += `  border-radius: ${computed.borderRadius};\n`;
    css += `  font-size: ${computed.fontSize};\n`;
    css += `  font-weight: ${computed.fontWeight};\n`;
    css += `  cursor: pointer;\n`;
    css += `  transition: all 0.2s ease;\n`;
    css += `}\n\n`;

    // Hover state (simplifié)
    css += `.${className}:hover {\n`;
    css += `  transform: translateY(-2px);\n`;
    css += `}`;

    // Mettre à jour le code affiché
    const codeElement = codeViewer.querySelector('code');
    if (codeElement) {
      codeElement.textContent = css;
    }
  }

  /* ===========================================
     RESET
     =========================================== */

  /**
   * Remet le composant à son état original
   */
  reset() {
    if (!this.currentComponent) return;

    const { element, config } = this.currentComponent;

    // Retirer tous les styles inline
    element.removeAttribute('style');

    // Remettre les valeurs dans les contrôles
    config.properties.forEach(prop => {
      const control = this.panel.querySelector(`[data-property="${prop.property}"]`);
      if (!control) return;

      const value = this.originalStyles[prop.property];

      switch (prop.type) {
        case 'color':
          control.querySelector('.color-picker').value = value;
          control.querySelector('.color-text').value = value;
          break;
        case 'slider':
          control.querySelector('.editor-slider').value = value;
          control.querySelector('.editor-control__value').textContent =
            value + (prop.unit || 'px');
          break;
        case 'select':
          control.querySelector('.editor-select').value = value;
          break;
      }
    });

    // Mettre à jour le code viewer
    this.updateCodeViewer();
  }
}

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Créer l'instance globale de l'éditeur
  window.liveEditor = new LiveEditor();
});
