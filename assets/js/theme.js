document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton();
    }
    
    // Update theme button text
    function updateThemeButton() {
        const currentTheme = html.getAttribute('data-theme');
        const themeBtn = document.getElementById('theme-toggle-btn');
        
        if (themeBtn) {
            // Show the opposite theme as the button text (what you'll switch to)
            const btnText = themeBtn.querySelector('.theme-btn-text');
            if (btnText) {
                btnText.textContent = currentTheme === 'dark' ? 'Light' : 'Dark';
            }
            themeBtn.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`);
        }
    }
    
    // Add click handler for theme button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
        // Set initial button text
        updateThemeButton();
    }
    
    // Add keyboard shortcut listener
    document.addEventListener('keydown', (e) => {
        // Press 't' to toggle theme (only if not typing in an input/textarea)
        if (e.key === 't' || e.key === 'T') {
            const activeElement = document.activeElement;
            const isTyping = activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.isContentEditable
            );
            
            if (!isTyping) {
                e.preventDefault();
                toggleTheme();
            }
        }
        
        // Ctrl+Shift+L (Windows/Linux) or Cmd+Shift+L (Mac) - L for Light/Dark
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeButton();
        }
    });
});
