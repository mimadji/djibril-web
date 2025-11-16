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
        
        // Update toggle switch state
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.checked = newTheme === 'dark';
        }
    }
    
    // Add change handler for theme toggle switch
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial state
        const currentTheme = html.getAttribute('data-theme');
        themeToggle.checked = currentTheme === 'dark';
        
        // Add change event listener
        themeToggle.addEventListener('change', toggleTheme);
    }
    
    // Add keyboard shortcut listener
    document.addEventListener('keydown', (e) => {
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
            
            // Update toggle switch state
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.checked = newTheme === 'dark';
            }
        }
    });
});
