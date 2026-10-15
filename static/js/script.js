// Глобальные функции
function openModal() {
    console.log('Открываю модалку');
    var modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('Модалка открыта');
    }
}

function closeModal() {
    console.log('Закрываю модалку');
    var modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Модалка закрыта');
    }
}

function scrollToDetails() {
    console.log('Скролл к деталям');
    var details = document.getElementById('details');
    if (details) {
        details.scrollIntoView({ behavior: 'smooth' });
    }
}

function submitForm(event) {
    event.preventDefault();
    console.log('Отправка формы');
    
    var form = event.target;
    var data = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value || ''
    };
    
    fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
        alert('✅ ' + result.message + '\n\nПеренаправляем в Telegram!');
        closeModal();
        form.reset();
        setTimeout(function() {
            window.location.href = result.redirect;
        }, 1500);
    })
    .catch(function(err) {
        alert('Ошибка: ' + err);
    });
}

// Стрелки
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var droneImage = document.getElementById('drone-image');

if (prevBtn) {
    prevBtn.onclick = function() {
        console.log('Стрелка влево');
        alert('← Предыдущий дрон');
    };
}

if (nextBtn) {
    nextBtn.onclick = function() {
        console.log('Стрелка вправо');
        alert('Следующий дрон →');
    };
}

// Анимация дрона
if (droneImage) {
    document.addEventListener('mousemove', function(e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 20;
        var y = (e.clientY / window.innerHeight - 0.5) * 20;
        droneImage.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    
    // Начальная анимация
    setTimeout(function() {
        droneImage.style.opacity = '1';
        droneImage.style.transform = 'translateY(0)';
    }, 300);
}

console.log('✅ JavaScript загружен!');