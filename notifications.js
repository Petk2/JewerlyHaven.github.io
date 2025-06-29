/**
 * Система уведомлений для сайта ювелирных изделий
 * Поддерживает различные типы уведомлений с анимациями и автоматическим закрытием
 */
class JewelryNotifications {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.maxNotifications = 5;
        this.defaultDuration = 4000;
        this.init();
    }

    /**
     * Инициализация системы уведомлений
     */
    init() {
        this.createContainer();
    }

    /**
     * Создание контейнера для уведомлений
     */
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.id = 'notification-container';
        document.body.appendChild(this.container);
    }

    /**
     * Показать уведомление
     * @param {Object} options - Опции уведомления
     * @param {string} options.title - Заголовок уведомления
     * @param {string} options.message - Сообщение уведомления
     * @param {string} options.type - Тип уведомления (success, error, warning, info)
     * @param {number} options.duration - Длительность показа в миллисекундах
     * @param {string} options.icon - Иконка уведомления
     * @param {boolean} options.autoClose - Автоматическое закрытие
     */
    show(options = {}) {
        const {
            title = 'Уведомление',
            message = '',
            type = 'info',
            duration = this.defaultDuration,
            icon = this.getDefaultIcon(type),
            autoClose = true
        } = options;

        const notification = this.createNotificationElement({
            title,
            message,
            type,
            icon
        });

        this.container.appendChild(notification);
        this.notifications.push(notification);

        if (this.notifications.length > this.maxNotifications) {
            this.removeNotification(this.notifications[0]);
        }

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        if (autoClose && duration > 0) {
            this.autoCloseNotification(notification, duration);
        }

        this.addCloseHandler(notification);

        return notification;
    }

    /**
     * Создание элемента уведомления
     */
    createNotificationElement({ title, message, type, icon }) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icon}</div>
                <div class="notification-text">
                    <div class="notification-title">${title}</div>
                    ${message ? `<div class="notification-message">${message}</div>` : ''}
                </div>
            </div>
            <button class="notification-close" aria-label="Закрыть">×</button>
            <div class="notification-progress"></div>
        `;

        return notification;
    }

    /**
     * Получение иконки по умолчанию для типа уведомления
     */
    getDefaultIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            default: '💎'
        };
        return icons[type] || icons.info;
    }

    /**
     * Автоматическое закрытие уведомления
     */
    autoCloseNotification(notification, duration) {
        const progressBar = notification.querySelector('.notification-progress');
        
        if (progressBar) {
            progressBar.style.transition = `width ${duration}ms linear`;
            setTimeout(() => {
                progressBar.style.width = '0%';
            }, 10);
        }

        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
    }

    /**
     * Добавление обработчика закрытия
     */
    addCloseHandler(notification) {
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.removeNotification(notification);
            });
        }

        // Закрытие по клику на уведомление (кроме кнопки закрытия)
        notification.addEventListener('click', (e) => {
            if (!e.target.classList.contains('notification-close')) {
                this.removeNotification(notification);
            }
        });
    }

    /**
     * Удаление уведомления
     */
    removeNotification(notification) {
        if (!notification || !notification.parentNode) return;

        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            
            // Удаляем из массива
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 400);
    }

    /**
     * Очистка всех уведомлений
     */
    clearAll() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }

    // Методы для быстрого создания уведомлений разных типов

    /**
     * Уведомление об успешном добавлении в корзину
     */
    showCartNotification(productName, price) {
        this.show({
            title: 'Добавлено в корзину',
            message: `${productName} - ${price} руб.`,
            type: 'success',
            icon: '🛒',
            duration: 3000
        });
    }

    /**
     * Уведомление об удалении из корзины
     */
    showCartRemoveNotification(productName) {
        this.show({
            title: 'Удалено из корзины',
            message: `${productName}`,
            type: 'info',
            icon: '🗑️',
            duration: 2500
        });
    }

    /**
     * Уведомление об очистке корзины
     */
    showCartClearNotification() {
        this.show({
            title: 'Корзина очищена',
            message: 'Все товары удалены из корзины',
            type: 'warning',
            icon: '🧹',
            duration: 3000
        });
    }

    /**
     * Уведомление о скидке
     */
    showDiscountNotification(percent) {
        this.show({
            title: `Скидка ${percent}%!`,
            message: 'На все украшения до конца недели',
            type: 'success',
            icon: '🎉',
            duration: 5000
        });
    }

    /**
     * Уведомление о доставке
     */
    showShippingNotification() {
        this.show({
            title: 'Бесплатная доставка!',
            message: 'При заказе от 5000 руб. доставка по всей России',
            type: 'info',
            icon: '🚚',
            duration: 6000
        });
    }

    /**
     * Уведомление об ошибке
     */
    showError(message, title = 'Ошибка') {
        this.show({
            title,
            message,
            type: 'error',
            duration: 5000
        });
    }

    /**
     * Информационное уведомление
     */
    showInfo(message, title = 'Информация') {
        this.show({
            title,
            message,
            type: 'info',
            duration: 4000
        });
    }

    /**
     * Уведомление-предупреждение
     */
    showWarning(message, title = 'Внимание') {
        this.show({
            title,
            message,
            type: 'warning',
            duration: 4500
        });
    }

    /**
     * Уведомление об успехе
     */
    showSuccess(message, title = 'Успешно') {
        this.show({
            title,
            message,
            type: 'success',
            duration: 3500
        });
    }
}

// Создаем глобальный экземпляр системы уведомлений
let jewelryNotifications;

// Инициализируем систему уведомлений после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    jewelryNotifications = new JewelryNotifications();
});

// Экспортируем для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JewelryNotifications;
} 