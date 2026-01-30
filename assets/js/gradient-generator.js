/* ===========================================
   GRADIENT GENERATOR — Duke-components
   Générateur de dégradés CSS interactif
   =========================================== */

/**
 * CRÉE : des dégradés CSS en temps réel
 * LIT : les valeurs des contrôles (type, angle, couleurs)
 * MODIFIE : la prévisualisation et le code CSS généré
 * AFFICHE : le résultat dans la zone de preview + code copiable
 */
class GradientGenerator {
  constructor() {
    // État du générateur
    this.type = 'linear';
    this.angle = 90;
    this.shape = 'circle';
    this.colorStops = [
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 }
    ];

    // Presets prédéfinis
    this.presets = {
      sunset: [
        { color: '#ff6b6b', position: 0 },
        { color: '#feca57', position: 50 },
        { color: '#ff9ff3', position: 100 }
      ],
      ocean: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 50 },
        { color: '#6B8DD6', position: 100 }
      ],
      forest: [
        { color: '#11998e', position: 0 },
        { color: '#38ef7d', position: 100 }
      ],
      fire: [
        { color: '#f12711', position: 0 },
        { color: '#f5af19', position: 100 }
      ],
      neon: [
        { color: '#00f260', position: 0 },
        { color: '#0575e6', position: 100 }
      ],
      purple: [
        { color: '#8E2DE2', position: 0 },
        { color: '#4A00E0', position: 100 }
      ],
      midnight: [
        { color: '#232526', position: 0 },
        { color: '#414345', position: 100 }
      ],
      candy: [
        { color: '#ff6fd8', position: 0 },
        { color: '#3813c2', position: 100 }
      ]
    };

    // Éléments DOM
    this.preview = document.getElementById('gradient-preview');
    this.codeOutput = document.getElementById('gradient-code');
    this.colorStopsContainer = document.getElementById('color-stops');
    this.angleSlider = document.getElementById('angle-slider');
    this.angleValue = document.getElementById('angle-value');
    this.angleControl = document.getElementById('angle-control');
    this.radialControl = document.getElementById('radial-control');

    this.init();
  }

  /**
   * Initialise le générateur
   */
  init() {
    this.renderColorStops();
    this.bindTypeButtons();
    this.bindAngleControls();
    this.bindRadialControls();
    this.bindPresets();
    this.bindAddColorButton();
    this.bindCopyButton();
    this.updateGradient();
  }

  /* ===========================================
     TYPE DE DÉGRADÉ
     =========================================== */

  /**
   * Bind les boutons de type (linear, radial, conic)
   */
  bindTypeButtons() {
    document.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        document.querySelectorAll('[data-type]').forEach(b => b.classList.remove('control-btn--active'));
        btn.classList.add('control-btn--active');

        this.type = btn.dataset.type;
        this.updateControlsVisibility();
        this.updateGradient();
      });
    });
  }

  /**
   * Affiche/masque les contrôles selon le type
   */
  updateControlsVisibility() {
    // Angle visible uniquement pour linear et conic
    if (this.type === 'linear' || this.type === 'conic') {
      this.angleControl.classList.remove('control-group--hidden');
    } else {
      this.angleControl.classList.add('control-group--hidden');
    }

    // Forme visible uniquement pour radial
    if (this.type === 'radial') {
      this.radialControl.classList.remove('control-group--hidden');
    } else {
      this.radialControl.classList.add('control-group--hidden');
    }
  }

  /* ===========================================
     CONTRÔLE DE L'ANGLE
     =========================================== */

  /**
   * Bind les contrôles d'angle
   */
  bindAngleControls() {
    // Slider d'angle
    this.angleSlider.addEventListener('input', (e) => {
      this.angle = parseInt(e.target.value);
      this.angleValue.textContent = `${this.angle}°`;
      this.updateAnglePresetButtons();
      this.updateGradient();
    });

    // Boutons de preset d'angle
    document.querySelectorAll('.angle-presets .preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.angle = parseInt(btn.dataset.angle);
        this.angleSlider.value = this.angle;
        this.angleValue.textContent = `${this.angle}°`;
        this.updateAnglePresetButtons();
        this.updateGradient();
      });
    });
  }

  /**
   * Met à jour les boutons de preset d'angle actifs
   */
  updateAnglePresetButtons() {
    document.querySelectorAll('.angle-presets .preset-btn').forEach(btn => {
      if (parseInt(btn.dataset.angle) === this.angle) {
        btn.classList.add('preset-btn--active');
      } else {
        btn.classList.remove('preset-btn--active');
      }
    });
  }

  /* ===========================================
     CONTRÔLE RADIAL
     =========================================== */

  /**
   * Bind les contrôles de forme radiale
   */
  bindRadialControls() {
    document.querySelectorAll('#radial-control [data-shape]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#radial-control [data-shape]').forEach(b => b.classList.remove('control-btn--active'));
        btn.classList.add('control-btn--active');
        this.shape = btn.dataset.shape;
        this.updateGradient();
      });
    });
  }

  /* ===========================================
     COLOR STOPS
     =========================================== */

  /**
   * Affiche les color stops
   */
  renderColorStops() {
    this.colorStopsContainer.innerHTML = this.colorStops.map((stop, index) => `
      <div class="color-stop" data-index="${index}">
        <input type="color"
               class="color-stop__picker"
               value="${stop.color}"
               data-action="color">
        <div class="color-stop__position">
          <span class="color-stop__position-label">Position: ${stop.position}%</span>
          <input type="range"
                 class="color-stop__position-slider"
                 min="0"
                 max="100"
                 value="${stop.position}"
                 data-action="position">
        </div>
        <input type="text"
               class="color-stop__hex"
               value="${stop.color.toUpperCase()}"
               data-action="hex">
        <button class="color-stop__remove"
                data-action="remove"
                ${this.colorStops.length <= 2 ? 'disabled' : ''}>×</button>
      </div>
    `).join('');

    this.bindColorStopEvents();
  }

  /**
   * Bind les événements des color stops
   */
  bindColorStopEvents() {
    this.colorStopsContainer.querySelectorAll('.color-stop').forEach(stopEl => {
      const index = parseInt(stopEl.dataset.index);

      // Color picker
      const colorPicker = stopEl.querySelector('[data-action="color"]');
      colorPicker.addEventListener('input', (e) => {
        this.colorStops[index].color = e.target.value;
        stopEl.querySelector('[data-action="hex"]').value = e.target.value.toUpperCase();
        this.updateGradient();
      });

      // Position slider
      const positionSlider = stopEl.querySelector('[data-action="position"]');
      positionSlider.addEventListener('input', (e) => {
        this.colorStops[index].position = parseInt(e.target.value);
        stopEl.querySelector('.color-stop__position-label').textContent =
          `Position: ${e.target.value}%`;
        this.updateGradient();
      });

      // Hex input
      const hexInput = stopEl.querySelector('[data-action="hex"]');
      hexInput.addEventListener('change', (e) => {
        let hex = e.target.value.trim();
        if (!hex.startsWith('#')) hex = '#' + hex;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          this.colorStops[index].color = hex;
          colorPicker.value = hex;
          this.updateGradient();
        } else {
          e.target.value = this.colorStops[index].color.toUpperCase();
        }
      });

      // Remove button
      const removeBtn = stopEl.querySelector('[data-action="remove"]');
      removeBtn.addEventListener('click', () => {
        if (this.colorStops.length > 2) {
          this.colorStops.splice(index, 1);
          this.renderColorStops();
          this.updateGradient();
        }
      });
    });
  }

  /**
   * Ajoute une nouvelle couleur
   */
  bindAddColorButton() {
    document.getElementById('add-color-btn').addEventListener('click', () => {
      // Générer une couleur aléatoire
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

      // Calculer la position (au milieu des deux dernières)
      const lastPosition = this.colorStops[this.colorStops.length - 1].position;
      const newPosition = Math.min(100, lastPosition + 10);

      this.colorStops.push({
        color: randomColor,
        position: newPosition
      });

      // Réorganiser par position
      this.colorStops.sort((a, b) => a.position - b.position);

      this.renderColorStops();
      this.updateGradient();
    });
  }

  /* ===========================================
     PRESETS
     =========================================== */

  /**
   * Bind les boutons de presets
   */
  bindPresets() {
    document.querySelectorAll('.preset-gradient').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetName = btn.dataset.preset;
        if (this.presets[presetName]) {
          this.colorStops = JSON.parse(JSON.stringify(this.presets[presetName]));
          this.renderColorStops();
          this.updateGradient();
        }
      });
    });
  }

  /* ===========================================
     GÉNÉRATION DU GRADIENT
     =========================================== */

  /**
   * Met à jour le dégradé (preview + code)
   */
  updateGradient() {
    const gradientCSS = this.generateGradientCSS();

    // Mise à jour de la preview
    this.preview.style.background = gradientCSS;

    // Mise à jour du code
    this.codeOutput.textContent = `background: ${gradientCSS};`;
  }

  /**
   * Génère le code CSS du dégradé
   */
  generateGradientCSS() {
    // Trier les color stops par position
    const sortedStops = [...this.colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    switch (this.type) {
      case 'linear':
        return `linear-gradient(${this.angle}deg, ${stopsString})`;

      case 'radial':
        return `radial-gradient(${this.shape} at center, ${stopsString})`;

      case 'conic':
        return `conic-gradient(from ${this.angle}deg at center, ${stopsString})`;

      default:
        return `linear-gradient(${this.angle}deg, ${stopsString})`;
    }
  }

  /* ===========================================
     COPY TO CLIPBOARD
     =========================================== */

  /**
   * Bind le bouton de copie
   */
  bindCopyButton() {
    const copyBtn = document.getElementById('copy-gradient-btn');

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
  window.gradientGenerator = new GradientGenerator();
});
