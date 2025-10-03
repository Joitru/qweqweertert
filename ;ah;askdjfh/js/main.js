
class ModernFormApp {
    constructor() {
        this.init();
    }
    
    init() {

        this.parallax = new ParallaxController();
        this.portfolio = new PortfolioFilter();
        this.navigation = new SmoothNavigation();
        this.tabs = new TabSystem();
        

        this.animateOnLoad();
        

        this.handleImageLoading();
        
        console.log('ModernForm Architecture initialized');
    }
    
    animateOnLoad() {

        const animateElements = document.querySelectorAll('.reveal-on-load');
        animateElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add('reveal-element');
        });
    }
    
    handleImageLoading() {

        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.onload = function() {

                const placeholder = this.closest('.project-image, .member-photo, .hero-image')
                                    ?.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            };
            
            img.onerror = function() {

                console.error('Ошибка загрузки изображения:', this.src);
            };
        });
    }
}

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

        this.tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');

        this.panes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === targetTab) {
                pane.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModernFormApp();
});

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

        this.recalculateLayout();
    }
    
    handleFilter(e) {
        const filter = e.target.dataset.filter;

        this.filters.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        this.filterItems(filter);
    }
    
    filterItems(filter) {
        this.items.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {

                item.style.opacity = '0';
                item.style.display = 'block';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.3s ease';
                    item.style.opacity = '1';
                }, 50);
            } else {

                item.style.transition = 'opacity 0.3s ease';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        

        setTimeout(() => this.recalculateLayout(), 350);
    }
    
    recalculateLayout() {

        const columns = 12;
        const gap = 30;
        const containerWidth = this.grid.offsetWidth;
        const colWidth = (containerWidth - (gap * (columns - 1))) / columns;
        

        this.items.forEach(item => {
            if (item.style.display !== 'none') {
                item.style.position = 'static';
                item.style.transform = 'translate(0, 0)';
            }
        });
        
    }
}

class ParallaxController {
    constructor() {
        this.layers = document.querySelectorAll('[data-parallax]');
        this.scrollY = 0;
        this.rafId = null;
        this.init();
    }
    
    init() {
        if (this.layers.length === 0) return;
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.handleScroll();
    }
    
    handleScroll() {

        if (this.rafId) return;
        
        this.rafId = requestAnimationFrame(() => {
            this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
            this.updateLayers();
            this.rafId = null;
        });
    }
    
    updateLayers() {
        this.layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.parallax);
            const yPos = -(this.scrollY * depth);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
}

class SmoothNavigation {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const targetId = this.getHash(e.target);
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 100; 
            this.scrollToPosition(targetPosition, 1000);
        }
    }
    
    getHash(element) {
        return element.getAttribute('href');
    }
    
    scrollToPosition(to, duration) {
        const start = window.pageYOffset;
        const change = to - start;
        let currentTime = 0;
        const increment = 20;
        
        const animateScroll = () => {
            currentTime += increment;
            const val = this.easeInOut(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
    
    easeInOut(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
}