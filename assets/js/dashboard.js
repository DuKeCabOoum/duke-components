/* ===========================================
   DASHBOARD — Duke-components
   Statistiques dynamiques et animations
   =========================================== */

/**
 * Classe de gestion du dashboard
 * CRÉE : Animation des compteurs et stats dynamiques
 */
class Dashboard {
  constructor() {
    this.stats = {
      components: 31,
      effects: 8,
      sections: 6,
      generators: 9,
      accordions: 5,
      tabs: 6,
      notifications: 8,
      progress: 8,
      avatars: 8,
      badges: 10
    };

    this.init();
  }

  /**
   * Initialise le dashboard
   */
  init() {
    this.animateCounters();
    this.initRecentCards();
    this.initQuickAccess();
    this.initTips();
  }

  /* ===========================================
     ANIMATION DES COMPTEURS
     =========================================== */

  /**
   * Anime les compteurs de statistiques
   */
  animateCounters() {
    const counters = document.querySelectorAll('.stat-card__value');

    counters.forEach(counter => {
      const target = parseInt(counter.textContent, 10);
      if (isNaN(target)) return;

      // Réinitialise à 0
      counter.textContent = '0';

      // Animation avec easing
      this.animateValue(counter, 0, target, 1200);
    });
  }

  /**
   * Anime une valeur numérique
   * @param {HTMLElement} element - Élément à animer
   * @param {number} start - Valeur de départ
   * @param {number} end - Valeur d'arrivée
   * @param {number} duration - Durée en ms
   */
  animateValue(element, start, end, duration) {
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(start + (end - start) * easedProgress);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  /* ===========================================
     CARTES RÉCENTES — Animation au survol
     =========================================== */

  /**
   * Initialise les animations des cartes récentes
   */
  initRecentCards() {
    const cards = document.querySelectorAll('.recent__card, .generator-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.addRippleEffect(e, card);
      });
    });
  }

  /**
   * Ajoute un effet ripple au survol
   */
  addRippleEffect(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  /* ===========================================
     QUICK ACCESS — Actions rapides
     =========================================== */

  /**
   * Initialise les raccourcis d'accès rapide
   */
  initQuickAccess() {
    // Ajoute la section Quick Access si elle n'existe pas
    const main = document.querySelector('.main');
    const stats = document.querySelector('.stats');

    if (!main || !stats || document.querySelector('.quick-access')) return;

    const quickAccess = document.createElement('section');
    quickAccess.className = 'quick-access';
    quickAccess.innerHTML = `
      <h2>Accès rapide</h2>
      <div class="quick-access__grid">
        <button class="quick-access__btn" data-action="random">
          <span class="quick-access__icon">🎲</span>
          <span class="quick-access__text">Composant aléatoire</span>
        </button>
        <button class="quick-access__btn" data-action="favorites">
          <span class="quick-access__icon">⭐</span>
          <span class="quick-access__text">Favoris</span>
        </button>
        <button class="quick-access__btn" data-action="new">
          <span class="quick-access__icon">🆕</span>
          <span class="quick-access__text">Nouveautés</span>
        </button>
        <button class="quick-access__btn" data-action="popular">
          <span class="quick-access__icon">🔥</span>
          <span class="quick-access__text">Populaires</span>
        </button>
      </div>
    `;

    stats.insertAdjacentElement('afterend', quickAccess);

    // Bind events
    quickAccess.querySelectorAll('.quick-access__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        this.handleQuickAction(action);
      });
    });
  }

  /**
   * Gère les actions rapides
   */
  handleQuickAction(action) {
    const components = [
      'components/buttons/index.html',
      'components/cards/index.html',
      'components/loaders/index.html',
      'components/modals/index.html',
      'components/forms/index.html',
      'components/carousels/index.html',
      'components/tabs/index.html',
      'components/accordions/index.html',
      'components/progress/index.html',
      'generators/gradient/index.html',
      'generators/shadow/index.html',
      'generators/glassmorphism/index.html'
    ];

    switch (action) {
      case 'random':
        const randomIndex = Math.floor(Math.random() * components.length);
        window.location.href = components[randomIndex];
        break;

      case 'favorites':
        this.showToast('Favoris', 'Fonctionnalité à venir bientôt !');
        break;

      case 'new':
        window.location.href = 'components/skeletons/index.html';
        break;

      case 'popular':
        window.location.href = 'components/buttons/index.html';
        break;
    }
  }

  /**
   * Affiche un toast simple
   */
  showToast(title, message) {
    const container = document.querySelector('.toast-container') || this.createToastContainer();

    const toast = document.createElement('div');
    toast.className = 'toast toast--success';
    toast.innerHTML = `
      <span class="toast__icon">ℹ️</span>
      <div class="toast__content">
        <span class="toast__title">${title}</span>
        <span class="toast__message">${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast--hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }

  /* ===========================================
     TIPS — Conseils du jour
     =========================================== */

  /**
   * Initialise les tips/conseils
   */
  initTips() {
    const tips = [
      { icon: '⌨️', text: 'Utilisez <kbd>Ctrl</kbd> + <kbd>K</kbd> pour rechercher rapidement' },
      { icon: '🔐', text: 'Activez le mode Admin pour accéder au code sensible' },
      { icon: '📋', text: 'Cliquez sur "Copy" pour copier le code dans le presse-papier' },
      { icon: '🎨', text: 'Les générateurs créent du CSS en temps réel' },
      { icon: '🔄', text: 'Chaque composant a un onglet HTML et CSS' }
    ];

    // Sélectionne un tip aléatoire
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Ajoute le tip au header si sur le dashboard
    const header = document.querySelector('.main__header');
    if (!header || document.querySelector('.tip-banner')) return;

    const tipBanner = document.createElement('div');
    tipBanner.className = 'tip-banner';
    tipBanner.innerHTML = `
      <span class="tip-banner__icon">${randomTip.icon}</span>
      <span class="tip-banner__text">${randomTip.text}</span>
      <button class="tip-banner__close" aria-label="Fermer">×</button>
    `;

    header.appendChild(tipBanner);

    // Close button
    tipBanner.querySelector('.tip-banner__close').addEventListener('click', () => {
      tipBanner.classList.add('tip-banner--hiding');
      setTimeout(() => tipBanner.remove(), 300);
    });
  }
}

/* ===========================================
   STYLES DYNAMIQUES
   =========================================== */

const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  /* Ripple effect */
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.3);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  .recent__card,
  .generator-card {
    position: relative;
    overflow: hidden;
  }

  /* Quick Access */
  .quick-access {
    margin-bottom: var(--spacing-2xl);
  }

  .quick-access h2 {
    margin-bottom: var(--spacing-md);
  }

  .quick-access__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
  }

  .quick-access__btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .quick-access__btn:hover {
    background: var(--bg-card-hover);
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  .quick-access__icon {
    font-size: 1.5rem;
  }

  .quick-access__text {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  /* Tip Banner */
  .tip-banner {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
    padding: var(--spacing-md) var(--spacing-lg);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: var(--radius-lg);
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .tip-banner--hiding {
    animation: slideOut 0.3s ease-out forwards;
  }

  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .tip-banner__icon {
    font-size: 1.25rem;
  }

  .tip-banner__text {
    flex: 1;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .tip-banner__text kbd {
    padding: 2px 6px;
    background: var(--bg-dark);
    border: 1px solid var(--border);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.7rem;
  }

  .tip-banner__close {
    padding: 4px 8px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.25rem;
    transition: color var(--transition-fast);
  }

  .tip-banner__close:hover {
    color: var(--text-primary);
  }

  /* Responsive quick access */
  @media (max-width: 900px) {
    .quick-access__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
document.head.appendChild(dynamicStyles);

/* ===========================================
   INITIALISATION
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Seulement sur la page d'accueil
  if (document.querySelector('.stats')) {
    window.dashboard = new Dashboard();
  }
});
