document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбор данных из полей (можно настроить отправку в Telegram или на почту через API)
    const name = this.querySelectorAll('input')[0].value;
    const phone = this.querySelectorAll('input')[1].value;
    const siteType = this.querySelector('select').value;

    // Эффект успешной отправки на кнопке
    const submitBtn = this.querySelector('.btn-submit');
    submitBtn.innerText = 'Заявка принята! Свяжемся с вами';
    submitBtn.style.backgroundColor = '#10b981';
    submitBtn.disabled = true;

    console.log(`Новый лид! Имя: ${name}, Телефон: ${phone}, Тип сайта: ${siteType}`);

    // Очистка формы
    setTimeout(() => {
        this.reset();
        submitBtn.innerText = 'Получить бесплатный аудит';
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
    }, 4000);
});
