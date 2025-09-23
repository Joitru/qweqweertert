class PortfolioFilter {
    constructor() {
        this.filters = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.masonry-item');
        this.grid = document.querySelector('.masonry-grid');
        this.init();
    }
    
    init() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => this.handleFilter(e));
        });
        
        // Инициализация masonry сетки
        this.recalculateLayout();
    }
    
    handleFilter(e) {
        const filter = e.target.dataset.filter;
        
        // Обновление активного фильтра
        this.filters.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Анимация фильтрации
        this.filterItems(filter);
    }
    
    filterItems(filter) {
        this.items.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                // Показ элемента
                item.style.opacity = '0';
                item.style.display = 'block';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease';
                    item.style.opacity = '1';
                }, 50);
            } else {
                // Скрытие элемента
                item.style.transition = 'opacity 0.3s ease';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Перерасчет сетки после фильтрации
        setTimeout(() => this.recalculateLayout(), 350);
    }
    
    recalculateLayout() {
        // Простая реализация masonry без библиотек
        const columns = 12;
        const gap = 30;
        const containerWidth = this.grid.offsetWidth;
        const colWidth = (containerWidth - (gap * (columns - 1))) / columns;
        
        // Сброс позиций
        this.items.forEach(item => {
            if (item.style.display !== 'none') {
                item.style.position = 'static';
                item.style.transform = 'translate(0, 0)';
            }
        });
        
        // Здесь можно добавить сложную логику перерасчета позиций
        // для настоящего masonry эффекта
    }
}