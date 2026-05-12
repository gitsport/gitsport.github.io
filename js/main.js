const algorithmsData = [
    { id: 'quickSort', sport: 'football' },
    { id: 'bfs', sport: 'chess' },
    { id: 'dijkstra', sport: 'running' },
    { id: 'dpTournament', sport: 'tennis' },
    { id: 'binarySearch', sport: 'basketball' },
    { id: 'greedy', sport: 'weightlifting' }
];

async function renderAlgorithmCards() {
    const container = document.getElementById('algorithmsGrid');
    if (!container) return;
    container.innerHTML = '';
    for (const alg of algorithmsData) {
        const titleKey = `alg_${alg.id}_title`;
        const descKey = `alg_${alg.id}_desc`;
        const title = translations[titleKey] || alg.id;
        const desc = translations[descKey] || '';
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${title}</h3>
            <p>${desc}</p>
            <button data-alg="${alg.id}">${translations.view_algorithm || 'Смотреть'}</button>
        `;
        container.appendChild(card);
    }
    document.querySelectorAll('.card button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const algId = btn.getAttribute('data-alg');
            alert(`Визуализация алгоритма ${algId} будет здесь. (Интерактив в разработке)`);
        });
    });
}

window.renderAlgorithmCards = renderAlgorithmCards;

document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    initThemes();
    // после загрузки переводов отрисовать карточки
    const origApply = window.applyTranslations;
    window.applyTranslations = function() {
        if (origApply) origApply();
        renderAlgorithmCards();
    };
});

document.addEventListener('DOMContentLoaded', () => {
    // Блокируем контекстное меню на всех картинках
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });
});