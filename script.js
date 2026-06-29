// =========================================================================
// 1. АНИМАЦИЯ ПЛАВНОГО ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (Intersection Observer)
// =========================================================================
const animElements = document.querySelectorAll('.anim-fade');

const observerOptions = {
    root: null,         // Отслеживаем относительно области видимости браузера
    threshold: 0.15,    // Элемент начнет появляться, когда виден на 15%
    rootMargin: "0px"
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Добавляем класс видимости
            entry.target.classList.add('visible');
            // Удаляем из отслеживания, чтобы анимация сработала только 1 раз
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Запуск наблюдения за каждым элементом
animElements.forEach(el => scrollObserver.observe(el));


// =========================================================================
// 2. ИНТЕРАКТИВНЫЙ ГРАФИК И СМЕНА ВАЛЮТ / ТАРИФОВ
// =========================================================================
// База данных для графиков
const chartData = {
    btc: {
        usd: "| $ 4,528 USD",
        crypto: "| 1,44,528 BTC",
        path: "M 0 160 Q 120 180 200 100 T 400 50 T 500 20",
        dot1: { cx: 200, cy: 100 },
        dot2: { cx: 400, cy: 50 }
    },
    eth: {
        usd: "| $ 2,840 USD",
        crypto: "| 32,910 ETH",
        path: "M 0 100 Q 150 40 250 140 T 420 90 T 500 110",
        dot1: { cx: 250, cy: 140 },
        dot2: { cx: 420, cy: 90 }
    },
    ton: {
        usd: "| $ 7.35 USD",
        crypto: "| 845,200 TON",
        path: "M 0 180 Q 80 120 180 150 T 350 60 T 500 40",
        dot1: { cx: 180, cy: 150 },
        dot2: { cx: 350, cy: 60 }
    }
};

function updateChart(currencyKey) {
    // 1. Переключение активных классов на кнопках
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Ищем кнопку, которая вызвала событие, по тексту клика
    const eventTarget = window.event.target;
    if (eventTarget) eventTarget.classList.add('active');

    // 2. Обновление текстовых плашек над графиком
    document.getElementById('rate-usd').innerText = chartData[currencyKey].usd;
    document.getElementById('rate-crypto').innerText = chartData[currencyKey].crypto;

    // 3. Изменение геометрии SVG-кривой (эффект перетекания)
    document.getElementById('chart-path').setAttribute('d', chartData[currencyKey].path);

    // 4. Перемещение интерактивных точек на графике
    const d1 = document.getElementById('chart-dot-1');
    const d2 = document.getElementById('chart-dot-2');
    
    d1.setAttribute('cx', chartData[currencyKey].dot1.cx);
    d1.setAttribute('cy', chartData[currencyKey].dot1.cy);
    
    d2.setAttribute('cx', chartData[currencyKey].dot2.cx);
    d2.setAttribute('cy', chartData[currencyKey].dot2.cy);
}

// =========================================================================
// 3. ДЕКОРАТИВНЫЙ ИНТЕРФЕЙС: Генерация псевдо-хэша (анимация кода)
// =========================================================================
const hexElement = document.querySelector('.matrix-hex');
if (hexElement) {
    setInterval(() => {
        const chars = '0123456789ABCDEF';
        let mockHash = '0x';
        for(let i=0; i<4; i++) mockHash += chars[Math.floor(Math.random()*16)];
        mockHash += '...';
        for(let i=0; i<4; i++) mockHash += chars[Math.floor(Math.random()*16)];
        hexElement.innerText = mockHash;
    }, 1500); // Меняем строку каждые 1.5 секунды
}
