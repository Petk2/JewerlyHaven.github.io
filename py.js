// Код для меню
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');

    if (menuButton && menu) {
        // Скрываем меню изначально
        menu.style.display = 'none';

        menuButton.addEventListener('click', function () {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none'; // Переключаем видимость
        });

        // Закрываем меню при клике вне его
        window.addEventListener('click', function (event) {
            if (!menuButton.contains(event.target) && !menu.contains(event.target)) {
                menu.style.display = 'none';
            }
        });
    }

    // Обработчики навигации
    const naglavn = document.getElementById('naglavn');
    if (naglavn) {
        naglavn.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'index.html';
        });
    }

    const logoglavn = document.getElementById('logoglavn');
    if (logoglavn) {
        logoglavn.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'index.html';
        });
    }

    const kolye = document.getElementById('kolye');
    if (kolye) {
        kolye.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'kolye.html';
        });
    }

    const cepi = document.getElementById('cepi');
    if (cepi) {
        cepi.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'cepi.html';
        });
    }

    const kolyca = document.getElementById('kolyca');
    if (kolyca) {
        kolyca.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'kolyca.html';
        });
    }

    const cergi = document.getElementById('cergi');
    if (cergi) {
        cergi.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = 'cergi.html';
        });
    }

    const vnis = document.getElementById('vnis');
    if (vnis) {
        vnis.addEventListener('click', function (event) {
            event.preventDefault();
            const rectangle11 = document.getElementById('rectangle11');
            if (rectangle11) {
                rectangle11.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});
    
