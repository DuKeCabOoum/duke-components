/* ===========================================
   THEME TOGGLE — Duke-components
   Dark / Light mode switcher
   =========================================== */

(function() {
    'use strict';

    // Clé localStorage pour persister le thème
    const THEME_KEY = 'duke-theme';

    // Récupère le thème sauvegardé ou utilise le dark par défaut
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || 'dark';
    }

    // Sauvegarde le thème
    function saveTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    // Applique le thème au document
    function applyTheme(theme) {
        // Toujours définir l'attribut explicitement (dark ou light)
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButton(theme);
    }

    // Met à jour l'icône du bouton toggle
    function updateToggleButton(theme) {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (!toggleBtn) return;

        const sunIcon = toggleBtn.querySelector('.theme-toggle__sun');
        const moonIcon = toggleBtn.querySelector('.theme-toggle__moon');

        if (theme === 'light') {
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
        } else {
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        }
    }

    // Toggle entre les thèmes
    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        saveTheme(newTheme);
        applyTheme(newTheme);
    }

    // Crée le bouton toggle et l'injecte dans la sidebar
    function createToggleButton() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        toggle.setAttribute('title', 'Changer le thème');
        toggle.innerHTML = `
            <svg class="theme-toggle__sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="theme-toggle__moon hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        `;
        toggle.addEventListener('click', toggleTheme);
        return toggle;
    }

    // Initialisation au chargement du DOM
    function init() {
        // Appliquer le thème immédiatement pour éviter le flash
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Attendre que le DOM soit prêt pour injecter le bouton
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectButton);
        } else {
            injectButton();
        }
    }

    // Injecte le bouton dans la sidebar
    function injectButton() {
        const toggle = createToggleButton();

        // Stratégie 1: Chercher .sidebar__header (dashboard)
        let container = document.querySelector('.sidebar__header');

        // Stratégie 2: Chercher .sidebar__logo et l'envelopper (pages composants)
        if (!container) {
            const logo = document.querySelector('.sidebar__logo');
            if (logo && logo.parentElement) {
                // Créer un wrapper pour logo + toggle
                const wrapper = document.createElement('div');
                wrapper.className = 'sidebar__header';
                wrapper.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 24px 20px 16px; gap: 12px;';

                // Déplacer le logo dans le wrapper
                logo.parentElement.insertBefore(wrapper, logo);
                wrapper.appendChild(logo);
                container = wrapper;
            }
        }

        if (container) {
            container.appendChild(toggle);
        } else {
            // Fallback: bouton flottant en bas à droite
            toggle.classList.add('theme-toggle--floating');
            document.body.appendChild(toggle);
        }

        // Mettre à jour l'état initial du bouton
        updateToggleButton(getSavedTheme());
    }

    // Exporter pour utilisation externe
    window.DukeTheme = {
        toggle: toggleTheme,
        get: getSavedTheme,
        set: function(theme) {
            saveTheme(theme);
            applyTheme(theme);
        }
    };

    // Démarrer
    init();
})();
