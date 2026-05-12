// /js/useful.js

document.addEventListener('DOMContentLoaded', () => {
    // инициализация всех инструментов
    initPasswordGenerator();
    initMinecraftCalculator();
    initNumberBaseConverter();
    initLengthConverter();
    initCurrencyConverter();
    initFileSizeConverter();
});

// Генератор паролей
function initPasswordGenerator() {
    const container = document.getElementById('password-generator');
    if (!container) return;
    container.innerHTML = `
        <div class="tool-card">
            <h3>Генератор паролей</h3>
            <div class="tool-group">
                <label>Длина: <input type="number" id="pass-length" min="4" max="64" value="12"></label>
                <label><input type="checkbox" id="pass-upper" checked> A-Z</label>
                <label><input type="checkbox" id="pass-lower" checked> a-z</label>
                <label><input type="checkbox" id="pass-digits" checked> 0-9</label>
                <label><input type="checkbox" id="pass-symbols"> !@#$%^&*</label>
                <button id="generate-pass">Сгенерировать</button>
                <input type="text" id="pass-result" readonly placeholder="Ваш пароль">
            </div>
        </div>
    `;
    const generateBtn = document.getElementById('generate-pass');
    generateBtn.addEventListener('click', () => {
        const length = parseInt(document.getElementById('pass-length').value, 10);
        const useUpper = document.getElementById('pass-upper').checked;
        const useLower = document.getElementById('pass-lower').checked;
        const useDigits = document.getElementById('pass-digits').checked;
        const useSymbols = document.getElementById('pass-symbols').checked;
        let chars = '';
        if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useDigits) chars += '0123456789';
        if (useSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        if (chars === '') return;
        let password = '';
        for (let i = 0; i < length; i++) {
            const rand = Math.floor(Math.random() * chars.length);
            password += chars[rand];
        }
        document.getElementById('pass-result').value = password;
    });
}

// Калькулятор для Minecraft (расчёт ресурсов для базовых блоков)
function initMinecraftCalculator() {
    const container = document.getElementById('minecraft-calc');
    if (!container) return;
    container.innerHTML = `
        <div class="tool-card">
            <h3>Minecraft: Калькулятор ресурсов</h3>
            <div class="tool-group">
                <label>Тип блока: 
                    <select id="mc-block">
                        <option value="planks">Доски (1 бревно → 4 доски)</option>
                        <option value="stick">Палки (2 доски → 4 палки)</option>
                        <option value="torch">Факел (1 палка + 1 уголь → 4 факела)</option>
                        <option value="chest">Сундук (8 досок)</option>
                        <option value="furnace">Печь (8 булыжника)</option>
                    </select>
                </label>
                <label>Количество: <input type="number" id="mc-amount" min="1" value="1"></label>
                <button id="mc-calc">Рассчитать</button>
                <div id="mc-result"></div>
            </div>
        </div>
    `;
    const calcBtn = document.getElementById('mc-calc');
    calcBtn.addEventListener('click', () => {
        const block = document.getElementById('mc-block').value;
        let amount = parseInt(document.getElementById('mc-amount').value, 10);
        if (isNaN(amount)) amount = 1;
        let result = '';
        switch (block) {
            case 'planks':
                const logs = Math.ceil(amount / 4);
                result = `Для ${amount} досок нужно ${logs} бревна(ен)`;
                break;
            case 'stick':
                const planksForSticks = Math.ceil(amount / 4) * 2;
                result = `Для ${amount} палок нужно ${planksForSticks} досок (т.е. ${Math.ceil(planksForSticks/4)} брёвен)`;
                break;
            case 'torch':
                const sticksNeeded = Math.ceil(amount / 4);
                const coalNeeded = sticksNeeded;
                result = `Для ${amount} факелов нужно ${sticksNeeded} палок и ${coalNeeded} угля`;
                break;
            case 'chest':
                const chestPlanks = amount * 8;
                result = `Для ${amount} сундука(ов) нужно ${chestPlanks} досок (${Math.ceil(chestPlanks/4)} брёвен)`;
                break;
            case 'furnace':
                const cobble = amount * 8;
                result = `Для ${amount} печи(ей) нужно ${cobble} булыжника`;
                break;
            default: result = 'Выберите блок';
        }
        document.getElementById('mc-result').innerHTML = `<p>${result}</p>`;
    });
}

// Калькулятор систем счисления
function initNumberBaseConverter() {
    const container = document.getElementById('base-converter');
    if (!container) return;
    container.innerHTML = `
        <div class="tool-card">
            <h3>Конвертер систем счисления</h3>
            <div class="tool-group">
                <label>Введите число: <input type="text" id="base-input" placeholder="255"></label>
                <label>Из системы: <select id="base-from"><option value="2">2</option><option value="8">8</option><option value="10" selected>10</option><option value="16">16</option></select></label>
                <label>В систему: <select id="base-to"><option value="2">2</option><option value="8">8</option><option value="10" selected>10</option><option value="16">16</option></select></label>
                <button id="convert-base">Конвертировать</button>
                <div id="base-result"></div>
            </div>
        </div>
    `;
    const convertBtn = document.getElementById('convert-base');
    convertBtn.addEventListener('click', () => {
        let input = document.getElementById('base-input').value.trim();
        const fromBase = parseInt(document.getElementById('base-from').value, 10);
        const toBase = parseInt(document.getElementById('base-to').value, 10);
        if (!input) return;
        let decimal;
        try {
            decimal = parseInt(input, fromBase);
            if (isNaN(decimal)) throw new Error();
        } catch(e) {
            document.getElementById('base-result').innerHTML = '<p class="error">Ошибка ввода</p>';
            return;
        }
        const result = decimal.toString(toBase);
        document.getElementById('base-result').innerHTML = `<p>Результат: ${result} (основание ${toBase})</p>`;
    });
}

// Конвертер длин
function initLengthConverter() {
    const container = document.getElementById('length-converter');
    if (!container) return;
    container.innerHTML = `
        <div class="tool-card">
            <h3>Конвертер длины</h3>
            <div class="tool-group">
                <input type="number" id="length-value" placeholder="1">
                <select id="length-from">
                    <option value="m">Метры</option><option value="km">Километры</option><option value="cm">Сантиметры</option>
                    <option value="mm">Миллиметры</option><option value="mi">Мили</option><option value="ft">Футы</option><option value="in">Дюймы</option>
                </select>
                <span>→</span>
                <select id="length-to">
                    <option value="m">Метры</option><option value="km">Километры</option><option value="cm">Сантиметры</option>
                    <option value="mm">Миллиметры</option><option value="mi">Мили</option><option value="ft">Футы</option><option value="in">Дюймы</option>
                </select>
                <button id="convert-length">Перевести</button>
                <div id="length-result"></div>
            </div>
        </div>
    `;
    const convert = () => {
        let val = parseFloat(document.getElementById('length-value').value);
        if (isNaN(val)) val = 0;
        const from = document.getElementById('length-from').value;
        const to = document.getElementById('length-to').value;
        const units = { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.344, ft:0.3048, in:0.0254 };
        const meters = val * units[from];
        const result = meters / units[to];
        document.getElementById('length-result').innerHTML = `<p>Результат: ${result.toFixed(6)} ${to}</p>`;
    };
    document.getElementById('convert-length').addEventListener('click', convert);
}

// Конвертер валют (фиксированные курсы для офлайн)
function initCurrencyConverter() {
    const container = document.getElementById('currency-converter');
    if (!container) return;
    // примерные курсы к USD (можно обновлять через API, но для простоты статика)
    const rates = { USD:1, EUR:0.92, RUB:92.5, GBP:0.79, CNY:7.24, JPY:154.2 };
    container.innerHTML = `
        <div class="tool-card">
            <h3>Конвертер валют (примерные курсы)</h3>
            <div class="tool-group">
                <input type="number" id="currency-amount" placeholder="100">
                <select id="currency-from"><option>USD</option><option>EUR</option><option>RUB</option><option>GBP</option><option>CNY</option><option>JPY</option></select>
                <span>→</span>
                <select id="currency-to"><option>USD</option><option>EUR</option><option>RUB</option><option>GBP</option><option>CNY</option><option>JPY</option></select>
                <button id="convert-currency">Конвертировать</button>
                <div id="currency-result"></div>
            </div>
        </div>
    `;
    const convert = () => {
        let amount = parseFloat(document.getElementById('currency-amount').value);
        if (isNaN(amount)) amount = 0;
        const from = document.getElementById('currency-from').value;
        const to = document.getElementById('currency-to').value;
        const inUSD = amount / rates[from];
        const result = inUSD * rates[to];
        document.getElementById('currency-result').innerHTML = `<p>${amount} ${from} = ${result.toFixed(2)} ${to}</p>`;
    };
    document.getElementById('convert-currency').addEventListener('click', convert);
}

// Конвертер размеров файлов
function initFileSizeConverter() {
    const container = document.getElementById('file-size-converter');
    if (!container) return;
    container.innerHTML = `
        <div class="tool-card">
            <h3>Конвертер размеров файлов</h3>
            <div class="tool-group">
                <input type="number" id="file-size" placeholder="1">
                <select id="file-from">
                    <option value="B">Байты (B)</option><option value="KB">КБ</option><option value="MB">МБ</option><option value="GB">ГБ</option><option value="TB">ТБ</option>
                </select>
                <span>→</span>
                <select id="file-to">
                    <option value="B">Байты (B)</option><option value="KB">КБ</option><option value="MB">МБ</option><option value="GB">ГБ</option><option value="TB">ТБ</option>
                </select>
                <button id="convert-file">Перевести</button>
                <div id="file-result"></div>
            </div>
        </div>
    `;
    const convert = () => {
        let val = parseFloat(document.getElementById('file-size').value);
        if (isNaN(val)) val = 0;
        const from = document.getElementById('file-from').value;
        const to = document.getElementById('file-to').value;
        const mult = { B:1, KB:1024, MB:1048576, GB:1073741824, TB:1099511627776 };
        const bytes = val * mult[from];
        const result = bytes / mult[to];
        document.getElementById('file-result').innerHTML = `<p>${val} ${from} = ${result.toFixed(4)} ${to}</p>`;
    };
    document.getElementById('convert-file').addEventListener('click', convert);
}