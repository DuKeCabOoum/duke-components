/* ===========================================
   GRID GENERATOR — Duke-components
   Générateur de layouts CSS Grid interactif
   =========================================== */

/**
 * CRÉE : des layouts CSS Grid en temps réel
 * LIT : les valeurs des contrôles (colonnes, rangées, gap, alignement)
 * MODIFIE : la prévisualisation et le code CSS généré
 * AFFICHE : le résultat dans la zone de preview + code copiable
 */
class GridGenerator {
  constructor() {
    // État du générateur
    this.properties = {
      cols: 3,
      rows: 3,
      colSize: '1fr',
      rowSize: '1fr',
      gap: 16,
      justifyItems: 'stretch',
      alignItems: 'stretch'
    };

    // Presets prédéfinis
    this.presets = {
      'dashboard': {
        cols: 4,
        rows: 3,
        colSize: '1fr',
        rowSize: 'minmax(80px, auto)',
        gap: 16,
        justifyItems: 'stretch',
        alignItems: 'stretch'
      },
      'gallery': {
        cols: 3,
        rows: 3,
        colSize: '1fr',
        rowSize: '1fr',
        gap: 8,
        justifyItems: 'stretch',
        alignItems: 'stretch'
      },
      'sidebar': {
        cols: 2,
        rows: 1,
        colSize: 'minmax(100px, 1fr)',
        rowSize: '1fr',
        gap: 24,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        customCols: '250px 1fr'
      },
      'holy-grail': {
        cols: 3,
        rows: 3,
        colSize: '1fr',
        rowSize: 'minmax(80px, auto)',
        gap: 16,
        justifyItems: 'stretch',
        alignItems: 'stretch',
        customCols: '200px 1fr 200px',
        customRows: 'auto 1fr auto'
      }
    };

    // Éléments DOM
    this.preview = document.getElementById('grid-preview');
    this.codeOutput = document.getElementById('grid-code');

    this.init();
  }

  /**
   * Initialise le générateur
   */
  init() {
    this.bindSliders();
    this.bindSelects();
    this.bindPresets();
    this.bindCopyButton();
    this.renderItems();
    this.updatePreview();
    this.updateCode();
  }

  /* ===========================================
     CONTRÔLES
     =========================================== */

  /**
   * Bind les sliders
   */
  bindSliders() {
    // Colonnes
    const colsSlider = document.getElementById('cols-slider');
    const colsValue = document.getElementById('cols-value');
    colsSlider.addEventListener('input', (e) => {
      this.properties.cols = parseInt(e.target.value);
      colsValue.textContent = this.properties.cols;
      this.properties.customCols = null;
      this.renderItems();
      this.updatePreview();
      this.updateCode();
    });

    // Rangées
    const rowsSlider = document.getElementById('rows-slider');
    const rowsValue = document.getElementById('rows-value');
    rowsSlider.addEventListener('input', (e) => {
      this.properties.rows = parseInt(e.target.value);
      rowsValue.textContent = this.properties.rows;
      this.properties.customRows = null;
      this.renderItems();
      this.updatePreview();
      this.updateCode();
    });

    // Gap
    const gapSlider = document.getElementById('gap-slider');
    const gapValue = document.getElementById('gap-value');
    gapSlider.addEventListener('input', (e) => {
      this.properties.gap = parseInt(e.target.value);
      gapValue.textContent = `${this.properties.gap}px`;
      this.updatePreview();
      this.updateCode();
    });
  }

  /**
   * Bind les selects
   */
  bindSelects() {
    // Taille des colonnes
    document.getElementById('col-size').addEventListener('change', (e) => {
      this.properties.colSize = e.target.value;
      this.properties.customCols = null;
      this.updatePreview();
      this.updateCode();
    });

    // Taille des rangées
    document.getElementById('row-size').addEventListener('change', (e) => {
      this.properties.rowSize = e.target.value;
      this.properties.customRows = null;
      this.updatePreview();
      this.updateCode();
    });

    // justify-items
    document.getElementById('justify-items').addEventListener('change', (e) => {
      this.properties.justifyItems = e.target.value;
      this.updatePreview();
      this.updateCode();
    });

    // align-items
    document.getElementById('align-items').addEventListener('change', (e) => {
      this.properties.alignItems = e.target.value;
      this.updatePreview();
      this.updateCode();
    });
  }

  /* ===========================================
     ITEMS
     =========================================== */

  /**
   * Affiche les items de la grille
   */
  renderItems() {
    const totalItems = this.properties.cols * this.properties.rows;
    this.preview.innerHTML = '';

    for (let i = 1; i <= totalItems; i++) {
      const item = document.createElement('div');
      item.className = 'grid-preview__item';
      item.textContent = i;
      this.preview.appendChild(item);
    }
  }

  /* ===========================================
     PRESETS
     =========================================== */

  /**
   * Bind les boutons de presets
   */
  bindPresets() {
    document.querySelectorAll('.preset-grid').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetName = btn.dataset.preset;
        if (this.presets[presetName]) {
          const preset = this.presets[presetName];
          this.properties = { ...this.properties, ...preset };

          // Mettre à jour les contrôles
          document.getElementById('cols-slider').value = this.properties.cols;
          document.getElementById('cols-value').textContent = this.properties.cols;
          document.getElementById('rows-slider').value = this.properties.rows;
          document.getElementById('rows-value').textContent = this.properties.rows;
          document.getElementById('gap-slider').value = this.properties.gap;
          document.getElementById('gap-value').textContent = `${this.properties.gap}px`;
          document.getElementById('col-size').value = this.properties.colSize;
          document.getElementById('row-size').value = this.properties.rowSize;
          document.getElementById('justify-items').value = this.properties.justifyItems;
          document.getElementById('align-items').value = this.properties.alignItems;

          this.renderItems();
          this.updatePreview();
          this.updateCode();
        }
      });
    });
  }

  /* ===========================================
     MISE À JOUR
     =========================================== */

  /**
   * Met à jour la prévisualisation
   */
  updatePreview() {
    // Colonnes
    if (this.properties.customCols) {
      this.preview.style.gridTemplateColumns = this.properties.customCols;
    } else if (this.properties.colSize.includes('auto-fill')) {
      this.preview.style.gridTemplateColumns = this.properties.colSize;
    } else {
      this.preview.style.gridTemplateColumns = `repeat(${this.properties.cols}, ${this.properties.colSize})`;
    }

    // Rangées
    if (this.properties.customRows) {
      this.preview.style.gridTemplateRows = this.properties.customRows;
    } else {
      this.preview.style.gridTemplateRows = `repeat(${this.properties.rows}, ${this.properties.rowSize})`;
    }

    this.preview.style.gap = `${this.properties.gap}px`;
    this.preview.style.justifyItems = this.properties.justifyItems;
    this.preview.style.alignItems = this.properties.alignItems;
  }

  /**
   * Met à jour le code CSS
   */
  updateCode() {
    let colsCode, rowsCode;

    // Colonnes
    if (this.properties.customCols) {
      colsCode = this.properties.customCols;
    } else if (this.properties.colSize.includes('auto-fill')) {
      colsCode = this.properties.colSize;
    } else {
      colsCode = `repeat(${this.properties.cols}, ${this.properties.colSize})`;
    }

    // Rangées
    if (this.properties.customRows) {
      rowsCode = this.properties.customRows;
    } else {
      rowsCode = `repeat(${this.properties.rows}, ${this.properties.rowSize})`;
    }

    let code = `display: grid;
grid-template-columns: ${colsCode};
grid-template-rows: ${rowsCode};
gap: ${this.properties.gap}px;`;

    // Ajouter justify-items et align-items si différents de stretch
    if (this.properties.justifyItems !== 'stretch') {
      code += `\njustify-items: ${this.properties.justifyItems};`;
    }
    if (this.properties.alignItems !== 'stretch') {
      code += `\nalign-items: ${this.properties.alignItems};`;
    }

    this.codeOutput.textContent = code;
  }

  /* ===========================================
     COPY TO CLIPBOARD
     =========================================== */

  /**
   * Bind le bouton de copie
   */
  bindCopyButton() {
    const copyBtn = document.getElementById('copy-grid-btn');

    copyBtn.addEventListener('click', () => {
      const code = this.codeOutput.textContent;

      navigator.clipboard.writeText(code)
        .then(() => {
          // Feedback visuel
          const originalHTML = copyBtn.innerHTML;
          copyBtn.classList.add('copy-btn--success');
          copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Copié !
          `;

          setTimeout(() => {
            copyBtn.classList.remove('copy-btn--success');
            copyBtn.innerHTML = originalHTML;
          }, 2000);
        })
        .catch(err => {
          console.error('Erreur de copie:', err);
        });
    });
  }
}

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  window.gridGenerator = new GridGenerator();
});
