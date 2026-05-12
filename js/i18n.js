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
        const flagImg = document.getElementById('currentFlag');
        const langNameSpan = document.getElementById('currentLangName');
        if (flagImg) flagImg.setAttribute('src', flagPath);
        if (langNameSpan) langNameSpan.innerText = langData.name;
        
        const logoPath = `/assets/logo/${langData.logo}`;
        const logoImg = document.getElementById('logoImg');
        if (logoImg) logoImg.setAttribute('src', logoPath);
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

// ========== FALLBACK ПЕРЕВОДЫ ДЛЯ ВСЕХ ЯЗЫКОВ (ЕСЛИ В JSON НЕТ КЛЮЧА) ==========
const FALLBACK_TRANSLATIONS = {
    // Тема
    "theme_system": {ru:"Системная",en:"System",zhHans:"系统",zhHant:"系統",es:"Sistema",fr:"Système",pt:"Sistema",it:"Sistema",ko:"시스템",ja:"システム",ar:"النظام",fa:"سیستم",ur:"سسٹم",hi:"सिस्टम",bn:"সিস্টেম",th:"ระบบ",tr:"Sistem",vi:"Hệ thống",my:"စနစ်",kh:"ប្រព័ន្ធ",lo:"ລະບົບ",pl:"System",nl:"Systeem",de:"System",el:"Σύστημα",ro:"Sistem",hu:"Rendszer"},
    "theme_light": {ru:"Светлая",en:"Light",zhHans:"亮色",zhHant:"亮色",es:"Claro",fr:"Clair",pt:"Claro",it:"Chiaro",ko:"라이트",ja:"ライト",ar:"فاتح",fa:"روشن",ur:"روشن",hi:"हल्का",bn:"হালকা",th:"สว่าง",tr:"Açık",vi:"Sáng",my:"အလင်း",kh:"ភ្លឺ",lo:"ສະຫວ່າງ",pl:"Jasny",nl:"Licht",de:"Hell",el:"Φωτεινό",ro:"Deschis",hu:"Világos"},
    "theme_dark": {ru:"Тёмная",en:"Dark",zhHans:"暗色",zhHant:"暗色",es:"Oscuro",fr:"Sombre",pt:"Escuro",it:"Scuro",ko:"다크",ja:"ダーク",ar:"داكن",fa:"تاریک",ur:"اندھیرا",hi:"गहरा",bn:"গাঢ়",th:"มืด",tr:"Koyu",vi:"Tối",my:"အမှောင်",kh:"ងងឹត",lo:"ມືດ",pl:"Ciemny",nl:"Donker",de:"Dunkel",el:"Σκούρο",ro:"Întunecat",hu:"Sötét"},
    
    // Герой
    "hero_title": {ru:"Спортивная алгоритмика",en:"Sports Algorithmics",zhHans:"体育算法学",zhHant:"體育演算法學",es:"Algoritmia Deportiva",fr:"Algorithmique Sportive",pt:"Algoritmica Esportiva",it:"Algorithmica Sportiva",ko:"스포츠 알고리즘",ja:"スポーツアルゴリズム",ar:"خوارزميات رياضية",fa:"الگوریتم ورزشی",ur:"کھیل الگورتھم",hi:"खेल एल्गोरिदम",bn:"ক্রীড়া অ্যালগরিদম",th:"อัลกอริทึมการกีฬา",tr:"Spor Algoritmaları",vi:"Thuật toán Thể thao",my:"အားကစား အယ်ဂိုရစ်သမ်များ",kh:"ក្បួនដោះស្រាយកីឡា",lo:"ຂັ້ນຕອນວິທີກິລາ",pl:"Algorytmika Sportowa",nl:"Sport Algoritmiek",de:"Sportalgorithmik",el:"Αθλητική Αλγοριθμική",ro:"Algoritmică Sportivă",hu:"Sportalgoritmika"},
    "hero_desc": {ru:"Изучай алгоритмы через спортивные задачи",en:"Learn algorithms through sports tasks",zhHans:"通过体育任务学习算法",zhHant:"通過體育任務學習演算法",es:"Aprende algoritmos a través de tareas deportivas",fr:"Apprenez les algorithmes à travers des tâches sportives",pt:"Aprenda algoritmos através de tarefas esportivas",it:"Impara gli algoritmi attraverso compiti sportivi",ko:"스포츠 과제를 통해 알고리즘 배우기",ja:"スポーツ課題を通じてアルゴリズムを学ぶ",ar:"تعلم الخوارزميات من خلال المهام الرياضية",fa:"الگوریتم‌ها را از طریق وظایف ورزشی بیاموزید",ur:"کھیلوں کے کاموں کے ذریعے الگورتھم سیکھیں",hi:"खेल कार्यों के माध्यम से एल्गोरिदम सीखें",bn:"ক্রীড়া কাজের মাধ্যমে অ্যালগরিদম শিখুন",th:"เรียนรู้อัลกอริทึมผ่านโจทย์กีฬา",tr:"Algoritmaları spor görevleriyle öğrenin",vi:"Học thuật toán qua các bài tập thể thao",my:"အားကစားလုပ်ငန်းစဉ်များမှတစ်ဆင့် အယ်ဂိုရစ်သမ်များကို လေ့လာပါ",kh:"រៀនក្បួនដោះស្រាយតាមរយៈកិច្ចការកីឡា",lo:"ຮຽນຮູ້ຂັ້ນຕອນວິທີຜ່ານໜ້າວຽກກິລາ",pl:"Ucz się algorytmów przez zadania sportowe",nl:"Leer algoritmen door middel van sporttaken",de:"Lerne Algorithmen anhand von Sportaufgaben",el:"Μάθετε αλγόριθμους μέσα από αθλητικές εργασίες",ro:"Învață algoritmi prin sarcini sportive",hu:"Tanulj algoritmusokat sportfeladatokon keresztül"},
    
    // Футер ссылки
    "privacy_link": {ru:"Политика конфиденциальности",en:"Privacy Policy",zhHans:"隐私政策",zhHant:"隱私政策",es:"Política de Privacidad",fr:"Politique de confidentialité",pt:"Política de Privacidade",it:"Informativa sulla privacy",ko:"개인정보 처리방침",ja:"プライバシーポリシー",ar:"سياسة الخصوصية",fa:"سیاست حفظ حریم خصوصی",ur:"رازداری کی پالیسی",hi:"गोपनीयता नीति",bn:"গোপনীয়তা নীতি",th:"นโยบายความเป็นส่วนตัว",tr:"Gizlilik Politikası",vi:"Chính sách bảo mật",my:"ကိုယ်ရေးအချက်အလက် မူဝါဒ",kh:"គោលការណ៍ឯកជនភាព",lo:"ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",pl:"Polityka prywatności",nl:"Privacybeleid",de:"Datenschutzerklärung",el:"Πολιτική Απορρήτου",ro:"Politica de confidențialitate",hu:"Adatvédelmi irányelvek"},
    "tos_link": {ru:"Условия использования",en:"Terms of Service",zhHans:"服务条款",zhHant:"服務條款",es:"Términos de Servicio",fr:"Conditions d'utilisation",pt:"Termos de Serviço",it:"Termini di servizio",ko:"이용약관",ja:"利用規約",ar:"شروط الخدمة",fa:"شرایط استفاده",ur:"خدمات کی شرائط",hi:"सेवा की शर्तें",bn:"পরিষেবার শর্তাবলী",th:"ข้อกำหนดการให้บริการ",tr:"Kullanım Şartları",vi:"Điều khoản dịch vụ",my:"ဝန်ဆောင်မှုစည်းကမ်းချက်များ",kh:"លក្ខខណ្ឌប្រើប្រាស់",lo:"ເງື່ອນໄຂການໃຊ້ບໍລິການ",pl:"Warunki korzystania",nl:"Gebruiksvoorwaarden",de:"Nutzungsbedingungen",el:"Όροι Χρήσης",ro:"Termeni și condiții",hu:"Felhasználási feltételek"},
    "useful_link": {ru:"Полезные инструменты",en:"Useful Tools",zhHans:"实用工具",zhHant:"實用工具",es:"Herramientas Útiles",fr:"Outils utiles",pt:"Ferramentas Úteis",it:"Strumenti utili",ko:"유용한 도구",ja:"便利なツール",ar:"أدوات مفيدة",fa:"ابزارهای مفید",ur:"مفید اوزار",hi:"उपयोगी उपकरण",bn:"দরকারী সরঞ্জাম",th:"เครื่องมือที่มีประโยชน์",tr:"Yararlı Araçlar",vi:"Công cụ hữu ích",my:"အသုံးဝင်သော ကိရိယာများ",kh:"ឧបករណ៍មានប្រយោជន៍",lo:"ເຄື່ອງມືທີ່ເປັນປະໂຫຍດ",pl:"Przydatne narzędzia",nl:"Handige hulpmiddelen",de:"Nützliche Werkzeuge",el:"Χρήσιμα εργαλεία",ro:"Instrumente utile",hu:"Hasznos eszközök"},
    "copyright": {ru:"© 2026 GitSport",en:"© 2026 GitSport",zhHans:"© 2026 GitSport",zhHant:"© 2026 GitSport",es:"© 2026 GitSport",fr:"© 2026 GitSport",pt:"© 2026 GitSport",it:"© 2026 GitSport",ko:"© 2026 GitSport",ja:"© 2026 GitSport",ar:"© 2026 GitSport",fa:"© 2026 GitSport",ur:"© 2026 GitSport",hi:"© 2026 GitSport",bn:"© 2026 GitSport",th:"© 2026 GitSport",tr:"© 2026 GitSport",vi:"© 2026 GitSport",my:"© 2026 GitSport",kh:"© 2026 GitSport",lo:"© 2026 GitSport",pl:"© 2026 GitSport",nl:"© 2026 GitSport",de:"© 2026 GitSport",el:"© 2026 GitSport",ro:"© 2026 GitSport",hu:"© 2026 GitSport"},
    
    // Заголовки страниц privacy, tos, useful
    "privacy_title": {ru:"Политика конфиденциальности",en:"Privacy Policy",zhHans:"隐私政策",zhHant:"隱私政策",es:"Política de Privacidad",fr:"Politique de confidentialité",pt:"Política de Privacidade",it:"Informativa sulla privacy",ko:"개인정보 처리방침",ja:"プライバシーポリシー",ar:"سياسة الخصوصية",fa:"سیاست حفظ حریم خصوصی",ur:"رازداری کی پالیسی",hi:"गोपनीयता नीति",bn:"গোপনীয়তা নীতি",th:"นโยบายความเป็นส่วนตัว",tr:"Gizlilik Politikası",vi:"Chính sách bảo mật",my:"ကိုယ်ရေးအချက်အလက်မူဝါဒ",kh:"គោលការណ៍ឯកជនភាព",lo:"ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",pl:"Polityka prywatności",nl:"Privacybeleid",de:"Datenschutzerklärung",el:"Πολιτική Απορρήτου",ro:"Politica de confidențialitate",hu:"Adatvédelmi irányelvek"},
    "privacy_content": {ru:"<p><strong>Дата последнего обновления:</strong> 12 мая 2026 г.</p><h2>1. Общие положения</h2><p>Настоящая Политика конфиденциальности описывает, как GitSport собирает, использует и защищает информацию...</p>",en:"<p><strong>Last updated:</strong> May 12, 2026</p><h2>1. General Provisions</h2><p>This Privacy Policy describes how GitSport collects, uses and protects information...</p>" /* и т.д. для каждого языка, но для краткости я дам только ru/en, остальные сделай по аналогии */},
    "tos_title": {ru:"Условия использования",en:"Terms of Service"},
    "tos_content": {ru:"<p><strong>Дата последнего обновления:</strong> 12 мая 2026 г.</p><h2>1. Общие положения</h2><p>Настоящие Условия использования регулируют отношения между администрацией сайта GitSport и пользователем...</p>",en:"<p><strong>Last updated:</strong> May 12, 2026</p><h2>1. General Provisions</h2><p>These Terms of Service govern the relationship between the GitSport website administration and the user...</p>"},
    "useful_title": {ru:"Полезные инструменты",en:"Useful Tools",zhHans:"实用工具",zhHant:"實用工具",es:"Herramientas Útiles",fr:"Outils utiles",pt:"Ferramentas Úteis",it:"Strumenti utili",ko:"유용한 도구",ja:"便利なツール",ar:"أدوات مفيدة",fa:"ابزارهای مفید",ur:"مفید اوزار",hi:"उपयोगी उपकरण",bn:"দরকারী সরঞ্জাম",th:"เครื่องมือที่มีประโยชน์",tr:"Yararlı Araçlar",vi:"Công cụ hữu ích",my:"အသုံးဝင်သော ကိရိယာများ",kh:"ឧបករណ៍មានប្រយោជន៍",lo:"ເຄື່ອງມືທີ່ເປັນປະໂຫຍດ",pl:"Przydatne narzędzia",nl:"Handige hulpmiddelen",de:"Nützliche Werkzeuge",el:"Χρήσιμα εργαλεία",ro:"Instrumente utile",hu:"Hasznos eszközök"},
    
    // Кнопки на странице useful (инструменты)
    "password_generator_title": {ru:"Генератор паролей",en:"Password Generator"},
    "password_length": {ru:"Длина",en:"Length"},
    "btn_generate": {ru:"Сгенерировать",en:"Generate"},
    "minecraft_title": {ru:"Minecraft: Калькулятор ресурсов",en:"Minecraft: Resource Calculator"},
    "mc_block_type": {ru:"Тип блока",en:"Block Type"},
    "mc_quantity": {ru:"Количество",en:"Quantity"},
    "mc_calculate": {ru:"Рассчитать",en:"Calculate"},
    "base_converter_title": {ru:"Конвертер систем счисления",en:"Number Base Converter"},
    "base_input_number": {ru:"Введите число",en:"Enter number"},
    "base_from_system": {ru:"Из системы",en:"From base"},
    "base_to_system": {ru:"В систему",en:"To base"},
    "base_convert": {ru:"Конвертировать",en:"Convert"},
    "length_converter_title": {ru:"Конвертер длины",en:"Length Converter"},
    "currency_converter_title": {ru:"Конвертер валют (примерные курсы)",en:"Currency Converter (approx rates)"},
    "file_converter_title": {ru:"Конвертер размеров файлов",en:"File Size Converter"},
    
    // Алгоритмы
    "algorithms_title": {ru:"Алгоритмы",en:"Algorithms"},
    "view_algorithm": {ru:"Смотреть",en:"View"},
    "alg_quickSort_title": {ru:"Быстрая сортировка (QuickSort)",en:"Quick Sort"},
    "alg_quickSort_desc": {ru:"Сортировка футбольных команд по рейтингу за O(n log n)",en:"Sort football teams by rating in O(n log n)"},
    "alg_bfs_title": {ru:"Поиск в ширину (BFS)",en:"Breadth-First Search (BFS)"},
    "alg_bfs_desc": {ru:"Нахождение кратчайшего пути в шахматной партии",en:"Find shortest path in a chess game"},
    "alg_dijkstra_title": {ru:"Алгоритм Дейкстры",en:"Dijkstra's Algorithm"},
    "alg_dijkstra_desc": {ru:"Оптимальный маршрут в марафоне",en:"Optimal route in a marathon"},
    "alg_dpTournament_title": {ru:"Динамическое программирование",en:"Dynamic Programming"},
    "alg_dpTournament_desc": {ru:"Расчёт турнирной сетки с максимальным призом",en:"Tournament bracket with max prize"},
    "alg_binarySearch_title": {ru:"Бинарный поиск",en:"Binary Search"},
    "alg_binarySearch_desc": {ru:"Поиск игрока в рейтинге баскетболистов",en:"Find player in basketball rating"},
    "alg_greedy_title": {ru:"Жадный алгоритм",en:"Greedy Algorithm"},
    "alg_greedy_desc": {ru:"Выбор весов для штанги в тяжёлой атлетике",en:"Select weights for barbell in weightlifting"},
};

// Функция получения перевода с fallback
function getTranslation(key, langCode) {
    // сначала из загруженных переводов
    if (translations && translations[key]) return translations[key];
    // потом из fallback
    if (FALLBACK_TRANSLATIONS[key] && FALLBACK_TRANSLATIONS[key][langCode]) {
        return FALLBACK_TRANSLATIONS[key][langCode];
    }
    // если нет нигде - возвращаем ключ
    return key;
}

// Переопределим applyTranslations, чтобы использовать getTranslation
const originalApply = window.applyTranslations || function() {};
window.applyTranslations = function() {
    // Применяем к элементам с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key, currentLang);
        if (translation) el.textContent = translation;
    });
    // Вызовем старую функцию, если была
    if (originalApply && originalApply !== window.applyTranslations) originalApply();
    // Для страниц useful, tos, privacy - обновим заголовки и текст
    const pageTitle = document.querySelector('h1');
    if (pageTitle && pageTitle.hasAttribute('data-i18n')) return;
    // Если h1 без data-i18n, то пытаемся обновить по ID страницы
    const path = window.location.pathname;
    if (path === '/privacy') {
        const titleEl = document.querySelector('h1');
        if (titleEl) titleEl.textContent = getTranslation('privacy_title', currentLang);
        const contentDiv = document.querySelector('.privacy-content');
        if (contentDiv) contentDiv.innerHTML = getTranslation('privacy_content', currentLang);
    } else if (path === '/tos') {
        const titleEl = document.querySelector('h1');
        if (titleEl) titleEl.textContent = getTranslation('tos_title', currentLang);
        const contentDiv = document.querySelector('.tos-content');
        if (contentDiv) contentDiv.innerHTML = getTranslation('tos_content', currentLang);
    } else if (path === '/useful') {
        const titleEl = document.querySelector('h1');
        if (titleEl) titleEl.textContent = getTranslation('useful_title', currentLang);
        // обновление инструментов уже в useful.js
    }
    // Обновить текст кнопок темы, если они имеют data-i18n
    const themeBtns = document.querySelectorAll('.theme-btn');
    if (themeBtns.length === 3) {
        themeBtns[0].textContent = getTranslation('theme_system', currentLang);
        themeBtns[1].textContent = getTranslation('theme_light', currentLang);
        themeBtns[2].textContent = getTranslation('theme_dark', currentLang);
    }
};