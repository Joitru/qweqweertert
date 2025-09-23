// Основной файл инициализации
class ModernFormApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Инициализация компонентов
        this.parallax = new ParallaxController();
        this.portfolio = new PortfolioFilter();
        this.navigation = new SmoothNavigation();
        this.tabs = new TabSystem();
        
        // Запуск анимаций при загрузке
        this.animateOnLoad();
        
        // Инициализация изображений
        this.handleImageLoading();
        
        console.log('ModernForm Architecture initialized');
    }
    
    animateOnLoad() {
        // Анимация появления элементов при загрузке
        const animateElements = document.querySelectorAll('.reveal-on-load');
        animateElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add('reveal-element');
        });
    }
    
    handleImageLoading() {
        // Логика для обработки загрузки реальных изображений
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.onload = function() {
                // Скрываем заглушку когда изображение загружено
                const placeholder = this.closest('.project-image, .member-photo, .hero-image')
                                    ?.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            };
            
            img.onerror = function() {
                // Показываем сообщение об ошибке загрузки
                console.error('Ошибка загрузки изображения:', this.src);
            };
        });
    }
}

// Система вкладок
class TabSystem {
    constructor() {
        this.tabs = document.querySelectorAll('.tab-btn');
        this.panes = document.querySelectorAll('.tab-pane');
        this.init();
    }
    
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e));
        });
    }
    
    switchTab(e) {
        const targetTab = e.target.dataset.tab;
        
        // Обновление активной вкладки
        this.tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        // Показ соответствующего контента
        this.panes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === targetTab) {
                pane.classList.add('active');
            }
        });
    }
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new ModernFormApp();
});