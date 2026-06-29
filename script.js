//Этот скрипт отвечает за анимации появления при скролле и интерактивное переключение кейсов/решений с динамической перерисовкой инфографики.

```javascript
// =========================================================================
// 1. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
// =========================================================================
const animElements = document.querySelectorAll('.anim-fade');

const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animElements.forEach(el => scrollObserver.observe(el));

// =========================================================================
// 2. ИНТЕРАКТИВНОЕ ПЕРЕКЛЮЧЕНИЕ ГОТОВЫХ РЕШЕНИЙ (КЕЙСОВ)
// =========================================================================
const caseData = {
    landing: {
        title: "Готовая структура под нишу услуг.",
        before: "| До: 1.2% конверсия",
        after: "| После: 5.4% лидогенерация",
        desc1: "Разработанный и упакованный прототип сайта с интерактивным опросом (квизом). Такая структура позволяет сократить стоимость привлечения клиента из контекстной рекламы на 35% за счет геймификации процесса заказа.",
        desc2: "Решение полностью оптимизировано под мобильные телефоны, протестировано на скорость загрузки и готово к внедрению под ваш бренд за 5 дней.",
        path: "M 0 160 Q 120 180 200 100 T 400 50 T 500 20",
        dot1: { cx: 200, cy: 100 },
        dot2: { cx: 400, cy: 50 }
    },
    shop: {
        title: "Платформа для Интернет-Магазинов.",
        before: "| До: 1.8% конверсия",
        after: "| После: 4.1% выкуп корзин",
        desc1: "Готовый быстрый интернет-магазин на современном стеке разработки с умной фильтрацией товаров, авто-расчетом доставки CDEK/Боксберри и удобной покупкой в 1 клик.",
        desc2: "Включает настроенную систему сквозной аналитики и личный кабинет покупателя. Идеально для быстрого старта продаж физических товаров.",
        path: "M 0 120 Q 150 40 250 140 T 420 90 T 500 40",
        dot1: { cx: 250, cy: 140 },
        dot2: { cx: 420, cy: 90 }
    },
    corporate: {
        title: "Имиджевые корпоративные сайты.",
        before: "| До: Низкий уровень доверия",
        after: "| После: Высокий статус бренда",
        desc1: "Многостраничные технологичные порталы для компаний, которые хотят закрепиться на рынке. Архитектура спроектирована под высокие стандарты SEO-продвижения Яндекса и Google.",
        desc2: "Внедрена удобная панель управления (CMS), позволяющая вашим сотрудникам редактировать любые тексты и добавлять новости без привлечения программистов.",
        path: "M 0 180 Q 80 120 180 150 T 350 60 T 500 30",
        dot1: { cx: 180, cy: 150 },
        dot2: { cx: 350, cy: 60 }
    }
};

function updateChart(caseKey) {
    // Переключение активного класса на табах
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    // Текстовое обновление данных кейса
    document.getElementById('rate-usd').innerText = caseData[caseKey].before;
    document.getElementById('rate-crypto').innerText = caseData[caseKey].after;
    document.getElementById('case-title').innerText = caseData[caseKey].title;
    document.getElementById('case-desc-1').innerText = caseData[caseKey].desc1;
    document.getElementById('case-desc-2').innerText = caseData[caseKey].desc2;

    // Плавная деформация SVG-линии графика
    document.getElementById('chart-path').setAttribute('d', caseData[caseKey].path);

    // Смещение маркерных точек
    const d1 = document.getElementById('chart-dot-1');
    const d2 = document.getElementById('chart-dot-2');
    
    d1.setAttribute('cx', caseData[caseKey].dot1.cx);
    d1.setAttribute('cy', caseData[caseKey].dot1.cy);
    
    d2.setAttribute('cx', caseData[caseKey].dot2.cx);
    d2.setAttribute('cy', caseData[caseKey].dot2.cy);
}

// Отправка формы лидов
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerText = 'Заявка принята! Свяжемся с вами';
    btn.style.backgroundColor = '#4d7c0f';
    this.reset();
});
