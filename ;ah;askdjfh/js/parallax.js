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
        this.handleScroll(); // Инициализация позиций
    }
    
    handleScroll() {
        // Оптимизация с requestAnimationFrame
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