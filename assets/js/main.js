/* ===========================================
   MAIN.JS — Duke-components
   Scripts globaux partagés entre toutes les pages
   =========================================== */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser les fonctionnalités globales
  initSidebarLinks();
});

/**
 * Marque le lien actif dans la sidebar
 */
function initSidebarLinks() {
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar__link');

  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.classList.add('sidebar__link--active');
    }
  });
}

/**
 * Fonction de copie de code générique
 * Utilisée par les pages de composants
 */
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  if (!codeBlock) return;

  const code = codeBlock.querySelector('pre').textContent;

  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.textContent;
    btn.textContent = 'Copié !';
    btn.style.color = '#22c55e';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Erreur lors de la copie:', err);
  });
}

/**
 * Toast notification
 */
function showToast(message, type = 'info') {
  // Supprimer les toasts existants
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animation d'entrée
  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  // Supprimer après 3 secondes
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
