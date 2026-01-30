/* ===========================================
   SHADOW GENERATOR — Duke-components
   Générateur d'ombres CSS multicouches
   =========================================== */

/**
 * CRÉE : des ombres CSS en temps réel
 * LIT : les valeurs des contrôles (offset, blur, spread, couleur)
 * MODIFIE : la prévisualisation et le code CSS généré
 * AFFICHE : le résultat dans la zone de preview + code copiable
 */
class ShadowGenerator {
  constructor() {
    // État du générateur
    this.layers = [
      { offsetX: 0, offsetY: 10, blur: 40, spread: 0, color: '#000000', opacity: 0.3 }
    ];
    this.isInset = false;

    // Presets prédéfinis
    this.presets = {
      subtle: [
        { offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: '#000000', opacity: 0.1 }
      ],
      medium: [
        { offsetX: 0, offsetY: 4, blur: 16, spread: 0, color: '#000000', opacity: 0.15 },
        { offsetX: 0, offsetY: 8, blur: 32, spread: 0, color: '#000000', opacity: 0.1 }
      ],
      strong: [
        { offsetX: 0, offsetY: 10, blur: 40, spread: -5, color: '#000000', opacity: 0.3 },
        { offsetX: 0, offsetY: 20, blur: 60, spread: -10, color: '#000000', opacity: 0.2 }
      ],
      layered: [
        { offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: '#000000', opacity: 0.05 },
        { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: '#000000', opacity: 0.05 },
        { offsetX: 0, offsetY: 4, blur: 8, spread: 0, color: '#000000', opacity: 0.05 },
        { offsetX: 0, offsetY: 8, blur: 16, spread: 0, color: '#000000', opacity: 0.05 },
        { offsetX: 0, offsetY: 16, blur: 32, spread: 0, color: '#000000', opacity: 0.05 }
      ],
      neon: [
        { offsetX: 0, offsetY: 0, blur: 10, spread: 0, color: '#667eea', opacity: 0.5 },
        { offsetX: 0, offsetY: 0, blur: 30, spread: 0, color: '#667eea', opacity: 0.3 },
        { offsetX: 0, offsetY: 0, blur: 60, spread: 0, color: '#667eea', opacity: 0.2 }
      ],
      inset: [
        { offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: '#000000', opacity: 0.2, inset: true }
      ]
    };

    // Éléments DOM
    this.preview = document.getElementById('shadow-preview');
    this.codeOutput = document.getElementById('shadow-code');
    this.layersContainer = document.getElementById('shadow-layers');

    this.init();
  }

  /**
   * Initialise le générateur
   */
  init() {
    this.renderLayers();
    this.bindInsetButtons();
    this.bindBackgroundButtons();
    this.bindPresets();
    this.bindAddLayerButton();
    this.bindCopyButton();
    this.updateShadow();
  }

  /* ===========================================
     GESTION DES COUCHES (LAYERS)
     =========================================== */

  /**
   * Affiche les couches d'ombre
   */
  renderLayers() {
    this.layersContainer.innerHTML = this.layers.map((layer, index) => `
      <div class="shadow-layer" data-index="${index}">
        <div class="shadow-layer__header">
          <span class="shadow-layer__title">Couche ${index + 1}</span>
          <button class="color-stop__remove" data-action="remove-layer"
                  ${this.layers.length <= 1 ? 'disabled' : ''}>×</button>
        </div>
        <div class="shadow-layer__controls">
          <!-- Offset X -->
          <div class="shadow-control">
            <div class="shadow-control__header">
              <span class="shadow-control__label">Offset X</span>
              <span class="shadow-control__value">${layer.offsetX}px</span>
            </div>
            <input type="range" class="control-slider" data-prop="offsetX"
                   min="-50" max="50" value="${layer.offsetX}">
          </div>

          <!-- Offset Y -->
          <div class="shadow-control">
            <div class="shadow-control__header">
              <span class="shadow-control__label">Offset Y</span>
              <span class="shadow-control__value">${layer.offsetY}px</span>
            </div>
            <input type="range" class="control-slider" data-prop="offsetY"
                   min="-50" max="50" value="${layer.offsetY}">
          </div>

          <!-- Blur -->
          <div class="shadow-control">
            <div class="shadow-control__header">
              <span class="shadow-control__label">Blur</span>
              <span class="shadow-control__value">${layer.blur}px</span>
            </div>
            <input type="range" class="control-slider" data-prop="blur"
                   min="0" max="100" value="${layer.blur}">
          </div>

          <!-- Spread -->
          <div class="shadow-control">
            <div class="shadow-control__header">
              <span class="shadow-control__label">Spread</span>
              <span class="shadow-control__value">${layer.spread}px</span>
            </div>
            <input type="range" class="control-slider" data-prop="spread"
                   min="-50" max="50" value="${layer.spread}">
          </div>

          <!-- Couleur et Opacité -->
          <div class="shadow-control" style="display: flex; gap: 12px; align-items: flex-end;">
            <div style="flex: 0 0 auto;">
              <span class="shadow-control__label">Couleur</span>
              <input type="color" class="color-stop__picker" data-prop="color"
                     value="${layer.color}" style="margin-top: 6px;">
            </div>
            <div style="flex: 1;">
              <div class="shadow-control__header">
                <span class="shadow-control__label">Opacité</span>
                <span class="shadow-control__value">${Math.round(layer.opacity * 100)}%</span>
              </div>
              <input type="range" class="control-slider" data-prop="opacity"
                     min="0" max="100" value="${layer.opacity * 100}">
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this.bindLayerEvents();
  }

  /**
   * Bind les événements des couches
   */
  bindLayerEvents() {
    this.layersContainer.querySelectorAll('.shadow-layer').forEach(layerEl => {
      const index = parseInt(layerEl.dataset.index);

      // Tous les sliders
      layerEl.querySelectorAll('[data-prop]').forEach(input => {
        const prop = input.dataset.prop;

        input.addEventListener('input', (e) => {
          let value;
          if (prop === 'opacity') {
            value = parseInt(e.target.value) / 100;
          } else if (prop === 'color') {
            value = e.target.value;
          } else {
            value = parseInt(e.target.value);
          }

          this.layers[index][prop] = value;

          // Mise à jour de l'affichage de la valeur
          const valueDisplay = input.closest('.shadow-control')?.querySelector('.shadow-control__value');
          if (valueDisplay) {
            if (prop === 'opacity') {
              valueDisplay.textContent = `${Math.round(value * 100)}%`;
            } else if (prop !== 'color') {
              valueDisplay.textContent = `${value}px`;
            }
          }

          this.updateShadow();
        });
      });

      // Bouton supprimer
      const removeBtn = layerEl.querySelector('[data-action="remove-layer"]');
      removeBtn?.addEventListener('click', () => {
        if (this.layers.length > 1) {
          this.layers.splice(index, 1);
          this.renderLayers();
          this.updateShadow();
        }
      });
    });
  }

  /**
   * Ajouter une couche
   */
  bindAddLayerButton() {
    document.getElementById('add-layer-btn').addEventListener('click', () => {
      this.layers.push({
        offsetX: 0,
        offsetY: 10 + (this.layers.length * 5),
        blur: 20 + (this.layers.length * 10),
        spread: 0,
        color: '#000000',
        opacity: 0.15
      });
      this.renderLayers();
      this.updateShadow();
    });
  }

  /* ===========================================
     CONTRÔLES INSET
     =========================================== */

  /**
   * Bind les boutons inset
   */
  bindInsetButtons() {
    document.querySelectorAll('[data-inset]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-inset]').forEach(b => b.classList.remove('control-btn--active'));
        btn.classList.add('control-btn--active');
        this.isInset = btn.dataset.inset === 'true';
        this.updateShadow();
      });
    });
  }

  /* ===========================================
     CONTRÔLES BACKGROUND
     =========================================== */

  /**
   * Bind les boutons de fond
   */
  bindBackgroundButtons() {
    const previewParent = this.preview.parentElement;

    document.querySelectorAll('[data-bg]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-bg]').forEach(b => b.classList.remove('control-btn--active'));
        btn.classList.add('control-btn--active');

        switch (btn.dataset.bg) {
          case 'dark':
            previewParent.style.background = 'var(--bg-secondary)';
            this.preview.style.background = 'var(--bg-tertiary)';
            break;
          case 'light':
            previewParent.style.background = '#f5f5f5';
            this.preview.style.background = '#ffffff';
            break;
          case 'gradient':
            previewParent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.preview.style.background = 'rgba(255, 255, 255, 0.9)';
            break;
        }
      });
    });
  }

  /* ===========================================
     PRESETS
     =========================================== */

  /**
   * Bind les boutons de presets
   */
  bindPresets() {
    document.querySelectorAll('.preset-shadow').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetName = btn.dataset.preset;
        if (this.presets[presetName]) {
          this.layers = JSON.parse(JSON.stringify(this.presets[presetName]));

          // Gérer l'inset pour le preset inset
          if (presetName === 'inset') {
            this.isInset = true;
            document.querySelectorAll('[data-inset]').forEach(b => {
              b.classList.toggle('control-btn--active', b.dataset.inset === 'true');
            });
          } else {
            this.isInset = false;
            document.querySelectorAll('[data-inset]').forEach(b => {
              b.classList.toggle('control-btn--active', b.dataset.inset === 'false');
            });
          }

          this.renderLayers();
          this.updateShadow();
        }
      });
    });
  }

  /* ===========================================
     GÉNÉRATION DE L'OMBRE
     =========================================== */

  /**
   * Met à jour l'ombre (preview + code)
   */
  updateShadow() {
    const shadowCSS = this.generateShadowCSS();

    // Mise à jour de la preview
    this.preview.style.boxShadow = shadowCSS;

    // Mise à jour du code
    this.codeOutput.textContent = `box-shadow: ${shadowCSS};`;
  }

  /**
   * Génère le code CSS de l'ombre
   */
  generateShadowCSS() {
    return this.layers.map(layer => {
      const rgba = this.hexToRgba(layer.color, layer.opacity);
      const inset = (this.isInset || layer.inset) ? 'inset ' : '';
      return `${inset}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${rgba}`;
    }).join(',\n             ');
  }

  /**
   * Convertit hex + opacité en rgba
   */
  hexToRgba(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  /* ===========================================
     COPY TO CLIPBOARD
     =========================================== */

  /**
   * Bind le bouton de copie
   */
  bindCopyButton() {
    const copyBtn = document.getElementById('copy-shadow-btn');

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
  window.shadowGenerator = new ShadowGenerator();
});
