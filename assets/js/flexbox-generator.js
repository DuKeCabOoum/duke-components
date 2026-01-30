/* ===========================================
   FLEXBOX GENERATOR — Duke-components
   Générateur de layouts Flexbox interactif
   =========================================== */

/**
 * CRÉE : des layouts Flexbox en temps réel
 * LIT : les valeurs des contrôles (direction, wrap, justify, align)
 * MODIFIE : la prévisualisation et le code CSS généré
 * AFFICHE : le résultat dans la zone de preview + code copiable
 */
class FlexboxGenerator {
  constructor() {
    // État du générateur
    this.itemCount = 3;
    this.properties = {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'stretch',
      gap: 12
    };

    // Presets prédéfinis
    this.presets = {
      'center': {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'stretch',
        gap: 12
      },
      'space-between': {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch',
        gap: 12
      },
      'column-center': {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'stretch',
        gap: 16
      },
      'wrap-grid': {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        gap: 16
      }
    };

    // Éléments DOM
    this.preview = document.getElementById('flexbox-preview');
    this.codeOutput = document.getElementById('flexbox-code');
    this.itemsCount = document.getElementById('items-count');

    this.init();
  }

  /**
   * Initialise le générateur
   */
  init() {
    this.bindPropertySelects();
    this.bindGapSlider();
    this.bindItemControls();
    this.bindPresets();
    this.bindCopyButton();
    this.updatePreview();
    this.updateCode();
  }

  /* ===========================================
     CONTRÔLES DES PROPRIÉTÉS
     =========================================== */

  /**
   * Bind les selects des propriétés Flexbox
   */
  bindPropertySelects() {
    const selects = [
      { id: 'flex-direction', prop: 'flexDirection' },
      { id: 'flex-wrap', prop: 'flexWrap' },
      { id: 'justify-content', prop: 'justifyContent' },
      { id: 'align-items', prop: 'alignItems' },
      { id: 'align-content', prop: 'alignContent' }
    ];

    selects.forEach(({ id, prop }) => {
      const select = document.getElementById(id);
      if (select) {
        select.addEventListener('change', (e) => {
          this.properties[prop] = e.target.value;
          this.updatePreview();
          this.updateCode();
        });
      }
    });
  }

  /**
   * Bind le slider de gap
   */
  bindGapSlider() {
    const slider = document.getElementById('gap-slider');
    const value = document.getElementById('gap-value');

    slider.addEventListener('input', (e) => {
      this.properties.gap = parseInt(e.target.value);
      value.textContent = `${this.properties.gap}px`;
      this.updatePreview();
      this.updateCode();
    });
  }

  /* ===========================================
     GESTION DES ITEMS
     =========================================== */

  /**
   * Bind les boutons d'ajout/suppression d'items
   */
  bindItemControls() {
    document.getElementById('add-item-btn').addEventListener('click', () => {
      if (this.itemCount < 10) {
        this.itemCount++;
        this.renderItems();
      }
    });

    document.getElementById('remove-item-btn').addEventListener('click', () => {
      if (this.itemCount > 1) {
        this.itemCount--;
        this.renderItems();
      }
    });
  }

  /**
   * Affiche les items
   */
  renderItems() {
    this.itemsCount.textContent = this.itemCount;
    this.preview.innerHTML = '';

    for (let i = 1; i <= this.itemCount; i++) {
      const item = document.createElement('div');
      item.className = 'flexbox-preview__item';
      item.textContent = i;

      // Tailles variées pour mieux visualiser l'alignement
      if (i % 3 === 0) {
        item.style.height = '80px';
      } else if (i % 2 === 0) {
        item.style.height = '100px';
      }

      this.preview.appendChild(item);
    }

    this.updatePreview();
  }

  /* ===========================================
     PRESETS
     =========================================== */

  /**
   * Bind les boutons de presets
   */
  bindPresets() {
    document.querySelectorAll('.preset-flexbox').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetName = btn.dataset.preset;
        if (this.presets[presetName]) {
          this.properties = { ...this.presets[presetName] };

          // Mettre à jour les selects
          document.getElementById('flex-direction').value = this.properties.flexDirection;
          document.getElementById('flex-wrap').value = this.properties.flexWrap;
          document.getElementById('justify-content').value = this.properties.justifyContent;
          document.getElementById('align-items').value = this.properties.alignItems;
          document.getElementById('align-content').value = this.properties.alignContent;
          document.getElementById('gap-slider').value = this.properties.gap;
          document.getElementById('gap-value').textContent = `${this.properties.gap}px`;

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
    this.preview.style.flexDirection = this.properties.flexDirection;
    this.preview.style.flexWrap = this.properties.flexWrap;
    this.preview.style.justifyContent = this.properties.justifyContent;
    this.preview.style.alignItems = this.properties.alignItems;
    this.preview.style.alignContent = this.properties.alignContent;
    this.preview.style.gap = `${this.properties.gap}px`;
  }

  /**
   * Met à jour le code CSS
   */
  updateCode() {
    const code = `display: flex;
flex-direction: ${this.properties.flexDirection};
flex-wrap: ${this.properties.flexWrap};
justify-content: ${this.properties.justifyContent};
align-items: ${this.properties.alignItems};
align-content: ${this.properties.alignContent};
gap: ${this.properties.gap}px;`;

    this.codeOutput.textContent = code;
  }

  /* ===========================================
     COPY TO CLIPBOARD
     =========================================== */

  /**
   * Bind le bouton de copie
   */
  bindCopyButton() {
    const copyBtn = document.getElementById('copy-flexbox-btn');

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
  window.flexboxGenerator = new FlexboxGenerator();
});
