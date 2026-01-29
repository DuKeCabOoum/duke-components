/* ===========================================
   COPY CODE — Duke-components
   =========================================== */

/**
 * Copie le contenu d'un élément dans le presse-papier
 * @param {string} targetId - L'ID de l'élément contenant le code
 * @param {HTMLElement} button - Le bouton qui a déclenché l'action
 */
function copyCode(targetId, button) {
  const codeElement = document.getElementById(targetId);
  
  if (!codeElement) {
    console.error(`Element with id "${targetId}" not found`);
    return;
  }
  
  // Récupère le texte (enlève les espaces en début/fin)
  const code = codeElement.textContent.trim();
  
  // Copie dans le presse-papier
  navigator.clipboard.writeText(code)
    .then(() => {
      // Feedback visuel
      const originalText = button.innerHTML;
      button.classList.add('copy-btn--success');
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Copié !
      `;
      
      // Reset après 2 secondes
      setTimeout(() => {
        button.classList.remove('copy-btn--success');
        button.innerHTML = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
      button.textContent = 'Erreur !';
    });
}

// Initialise tous les boutons copy au chargement
document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn[data-target]');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      copyCode(targetId, button);
    });
  });
});

/* ===========================================
   TAB SWITCHING — Code Viewer
   =========================================== */

function initCodeTabs() {
  const viewers = document.querySelectorAll('.code-viewer');
  
  viewers.forEach(viewer => {
    const tabs = viewer.querySelectorAll('.code-viewer__tab');
    const contents = viewer.querySelectorAll('.code-viewer__code');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active from all
        tabs.forEach(t => t.classList.remove('code-viewer__tab--active'));
        contents.forEach(c => c.style.display = 'none');
        
        // Add active to clicked
        tab.classList.add('code-viewer__tab--active');
        if (contents[index]) {
          contents[index].style.display = 'block';
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initCodeTabs);
