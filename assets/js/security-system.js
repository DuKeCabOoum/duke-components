/* ===========================================
   SECURITY SYSTEM — Duke-components
   Gestion des badges, mode Admin et alertes
   =========================================== */

/**
 * Classe principale du système de sécurité
 */
class SecuritySystem {
  constructor() {
    this.isAdmin = false;
    this.toastContainer = null;

    this.init();
  }

  /**
   * Initialise le système
   */
  init() {
    this.createToastContainer();
    this.initSecurityBadges();
    this.loadAdminState();
    this.bindAdminToggle();
    this.bindCopyButtons();
  }

  /* ===========================================
     AUTO-CRÉATION DES BADGES
     =========================================== */

  /**
   * Ajoute automatiquement les badges aux éléments avec data-security
   * mais qui n'ont pas encore de badge visuel
   */
  initSecurityBadges() {
    // Sélectionne tous les éléments avec data-security
    const securedElements = document.querySelectorAll('[data-security]');

    securedElements.forEach(element => {
      // Vérifie si le badge existe déjà
      if (element.querySelector('.security-badge')) return;

      const level = element.dataset.security;
      if (!level || !['safe', 'caution', 'sensitive'].includes(level)) return;

      // Assure que l'élément est positionné (pour le badge absolu)
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }

      // Crée le badge
      const badge = document.createElement('span');
      badge.className = `security-badge security-badge--${level}`;
      badge.textContent = level.toUpperCase();

      // Ajoute le badge au début de l'élément
      element.insertBefore(badge, element.firstChild);

      // Si sensible, ajoute l'overlay
      if (level === 'sensitive' && !element.querySelector('.sensitive-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sensitive-overlay';
        overlay.innerHTML = `
          <span class="sensitive-overlay__icon">🔒</span>
          <span class="sensitive-overlay__text">Admin only</span>
          <span class="sensitive-overlay__hint">Activez le mode Admin pour voir ce code</span>
        `;
        element.insertBefore(overlay, element.firstChild.nextSibling);
      }
    });
  }

  /* ===========================================
     TOAST CONTAINER
     =========================================== */

  /**
   * Crée le conteneur des toasts s'il n'existe pas
   */
  createToastContainer() {
    if (!document.querySelector('.toast-container')) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.className = 'toast-container';
      document.body.appendChild(this.toastContainer);
    } else {
      this.toastContainer = document.querySelector('.toast-container');
    }
  }

  /* ===========================================
     MODE ADMIN — Toggle & LocalStorage
     =========================================== */

  /**
   * Charge l'état admin depuis localStorage
   */
  loadAdminState() {
    const savedState = localStorage.getItem('dukeAdminMode');
    this.isAdmin = savedState === 'true';
    this.updateAdminUI();
  }

  /**
   * Sauvegarde l'état admin dans localStorage
   */
  saveAdminState() {
    localStorage.setItem('dukeAdminMode', this.isAdmin.toString());
  }

  /**
   * Bind le toggle admin
   */
  bindAdminToggle() {
    const toggle = document.getElementById('admin-toggle');
    if (!toggle) return;

    // Mettre à jour l'état initial du toggle
    toggle.checked = this.isAdmin;

    // Écouter les changements
    toggle.addEventListener('change', (e) => {
      this.isAdmin = e.target.checked;
      this.saveAdminState();
      this.updateAdminUI();

      // Toast de confirmation
      if (this.isAdmin) {
        this.showToast('success', 'Mode Admin activé', 'Vous avez accès au code sensible.');
      } else {
        this.showToast('success', 'Mode Admin désactivé', 'Le code sensible est masqué.');
      }
    });
  }

  /**
   * Met à jour l'UI selon l'état admin
   */
  updateAdminUI() {
    if (this.isAdmin) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }

    // Mettre à jour le toggle si présent
    const toggle = document.getElementById('admin-toggle');
    if (toggle) {
      toggle.checked = this.isAdmin;
    }
  }

  /* ===========================================
     COPY AVEC ALERTES DE SÉCURITÉ
     =========================================== */

  /**
   * Bind les boutons copy pour ajouter les alertes
   */
  bindCopyButtons() {
    document.querySelectorAll('.copy-btn[data-target]').forEach(btn => {
      // Supprimer l'ancien listener pour éviter les doublons
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', (e) => {
        const targetId = newBtn.getAttribute('data-target');
        this.handleSecureCopy(targetId, newBtn);
      });
    });
  }

  /**
   * Gère la copie avec alertes de sécurité
   * @param {string} targetId - ID de l'élément contenant le code
   * @param {HTMLElement} button - Le bouton copy
   */
  handleSecureCopy(targetId, button) {
    const codeElement = document.getElementById(targetId);
    if (!codeElement) return;

    // Trouver la component-card parente
    const card = button.closest('.component-card');
    const securityLevel = card?.dataset.security || 'safe';

    // Vérifier si on peut copier
    if (securityLevel === 'sensitive' && !this.isAdmin) {
      this.showToast(
        'sensitive',
        'Accès refusé',
        'Activez le mode Admin pour copier ce code.'
      );
      return;
    }

    // Copier le code
    const code = codeElement.textContent.trim();
    navigator.clipboard.writeText(code)
      .then(() => {
        // Feedback visuel sur le bouton
        this.showCopySuccess(button);

        // Alerte selon le niveau de sécurité
        this.showSecurityAlert(securityLevel);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        this.showToast('sensitive', 'Erreur', 'Impossible de copier le code.');
      });
  }

  /**
   * Affiche le feedback de copie réussie sur le bouton
   */
  showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.classList.add('copy-btn--success');
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Copié !
    `;

    setTimeout(() => {
      button.classList.remove('copy-btn--success');
      button.innerHTML = originalText;
    }, 2000);
  }

  /**
   * Affiche l'alerte de sécurité selon le niveau
   */
  showSecurityAlert(level) {
    switch (level) {
      case 'caution':
        this.showToast(
          'caution',
          'Code à utiliser avec précaution',
          'Ce code nécessite une bonne compréhension avant utilisation.'
        );
        break;

      case 'sensitive':
        this.showToast(
          'sensitive',
          'Code sensible copié',
          'Attention : ce code peut présenter des risques de sécurité.'
        );
        break;

      // Pour 'safe', pas d'alerte spéciale
    }
  }

  /* ===========================================
     TOASTS — Notifications temporaires
     =========================================== */

  /**
   * Affiche un toast
   * @param {string} type - 'success', 'caution', 'sensitive'
   * @param {string} title - Titre du toast
   * @param {string} message - Message détaillé
   */
  showToast(type, title, message) {
    const icons = {
      success: '✓',
      caution: '⚠️',
      sensitive: '🔐'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <span class="toast__icon">${icons[type]}</span>
      <div class="toast__content">
        <span class="toast__title">${title}</span>
        <span class="toast__message">${message}</span>
      </div>
    `;

    this.toastContainer.appendChild(toast);

    // Auto-remove après 4 secondes
    setTimeout(() => {
      toast.classList.add('toast--hiding');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  window.securitySystem = new SecuritySystem();
});
