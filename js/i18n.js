const SUPPORTED_LANGUAGES = [
    { code: 'ru', name: 'Русский', flag: 'ru.png', logo: 'logo.svg' },
    { code: 'en', name: 'English', flag: 'gb.png', logo: 'logo_EN.svg' },
    { code: 'zh-Hans', name: '简体中文', flag: 'cn.png', logo: 'logo_Hans.svg' },
    { code: 'zh-Hant', name: '繁體中文', flag: 'tw.png', logo: 'logo_Hant.svg' },
    { code: 'es', name: 'Español', flag: 'es.png', logo: 'logo_EN.svg' },
    { code: 'fr', name: 'Français', flag: 'fr.png', logo: 'logo_EN.svg' },
    { code: 'pt', name: 'Português', flag: 'pt.png', logo: 'logo_EN.svg' },
    { code: 'it', name: 'Italiano', flag: 'it.png', logo: 'logo_EN.svg' },
    { code: 'ko', name: '한국어', flag: 'kr.png', logo: 'logo_EN.svg' },
    { code: 'ja', name: '日本語', flag: 'jp.png', logo: 'logo_EN.svg' },
    { code: 'ar', name: 'العربية', flag: 'sa.png', logo: 'logo_AR.svg' },
    { code: 'fa', name: 'فارسی', flag: 'ir.png', logo: 'logo_EN.svg' },
    { code: 'ur', name: 'اردو', flag: 'pk.png', logo: 'logo_EN.svg' },
    { code: 'hi', name: 'हिन्दी', flag: 'in.png', logo: 'logo_EN.svg' },
    { code: 'bn', name: 'বাংলা', flag: 'bd.png', logo: 'logo_EN.svg' },
    { code: 'th', name: 'ไทย', flag: 'th.png', logo: 'logo_EN.svg' },
    { code: 'tr', name: 'Türkçe', flag: 'tr.png', logo: 'logo_EN.svg' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn.png', logo: 'logo_EN.svg' },
    { code: 'my', name: 'မြန်မာ', flag: 'mm.png', logo: 'logo_EN.svg' },
    { code: 'kh', name: 'ភាសាខ្មែរ', flag: 'kh.png', logo: 'logo_EN.svg' },
    { code: 'lo', name: 'ລາວ', flag: 'la.png', logo: 'logo_EN.svg' },
    { code: 'pl', name: 'Polski', flag: 'pl.png', logo: 'logo_EN.svg' },
    { code: 'nl', name: 'Nederlands', flag: 'nl.png', logo: 'logo_EN.svg' },
    { code: 'de', name: 'Deutsch', flag: 'de.png', logo: 'logo_EN.svg' },
    { code: 'el', name: 'Ελληνικά', flag: 'gr.png', logo: 'logo_EN.svg' },
    { code: 'ro', name: 'Română', flag: 'ro.png', logo: 'logo_EN.svg' },
    { code: 'hu', name: 'Magyar', flag: 'hu.png', logo: 'logo_EN.svg' }
];

let currentLang = 'ru';
let translations = {};

async function loadLanguage(lang) {
    try {
        const url = `https://gitsport.github.io/language/${lang}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        translations = await res.json();
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
        updateLogoAndFlag();
        return translations;
    } catch (e) {
        console.error('Failed load lang:', e);
        // fallback
        if (lang !== 'ru') return loadLanguage('ru');
        return null;
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.textContent = translations[key];
    });
    // also update dynamic content like cards
    if (window.renderAlgorithmCards) window.renderAlgorithmCards();
}

function updateLogoAndFlag() {
    const langData = SUPPORTED_LANGUAGES.find(l => l.code === currentLang);
    if (langData) {
        const flagPath = `/assets/flags/${langData.flag}`;
        document.getElementById('currentFlag')?.setAttribute('src', flagPath);
        document.getElementById('currentLangName').innerText = langData.name;
        const logoPath = `/assets/logo/${langData.logo}`;
        document.getElementById('logoImg')?.setAttribute('src', logoPath);
    }
}

function initLanguageSelector() {
    const btn = document.getElementById('langBtn');
    const dropdown = document.getElementById('langDropdown');
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => dropdown.classList.remove('open'));
    SUPPORTED_LANGUAGES.forEach(lang => {
        const option = document.createElement('div');
        option.className = 'lang-option';
        option.innerHTML = `<img src="/assets/flags/${lang.flag}" class="flag-icon" alt="${lang.code}"><span>${lang.name}</span>`;
        option.addEventListener('click', async () => {
            await loadLanguage(lang.code);
            dropdown.classList.remove('open');
        });
        dropdown.appendChild(option);
    });
    const savedLang = localStorage.getItem('lang') || 'ru';
    loadLanguage(savedLang);
}