function initThemes() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    const setTheme = (theme) => {
        if (theme === 'system') {
            const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('dark', darkMode);
        } else if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
        themeBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    };
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme')));
    });
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') setTheme('system');
    });
}