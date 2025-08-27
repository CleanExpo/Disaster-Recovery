/**
 * Animation Utilities - R6 Digital Inspired
 * 
 * Advanced animation utilities for scroll-triggered animations,
 * staggered animations, and smooth interactive effects.
 */

/**
 * Intersection Observer for scroll-triggered animations
 */
export class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      once: true,
      ...options
    };
    
    this.observer = null;
    this.elements = new Map();
    this.init();
  }
  
  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      this.fallbackInit();
      return;
    }
    
    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    );
    
    // Observe elements that are already in the DOM
    this.observeExistingElements();
    
    // Set up mutation observer for dynamically added elements
    this.setupMutationObserver();
  }
  
  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateElement(entry.target);
        
        if (this.options.once) {
          this.observer.unobserve(entry.target);
          this.elements.delete(entry.target);
        }
      }
    });
  }
  
  animateElement(element) {
    // Add the 'in-view' class to trigger CSS animations
    element.classList.add('in-view');
    
    // Handle staggered animations
    if (element.hasAttribute('data-stagger')) {
      this.handleStaggered(element);
    }
    
    // Handle custom animation callbacks
    const callback = this.elements.get(element);
    if (callback && typeof callback === 'function') {
      callback(element);
    }
    
    // Dispatch custom event
    element.dispatchEvent(new CustomEvent('animate-in', {
      bubbles: true,
      detail: { element }
    }));
  }
  
  handleStaggered(parent) {
    const children = parent.querySelectorAll('[data-stagger-item]');
    const delay = parseInt(parent.getAttribute('data-stagger-delay')) || 100;
    
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('in-view');
      }, index * delay);
    });
  }
  
  observe(element, callback = null) {
    if (!element) return;
    
    if (this.observer) {
      this.observer.observe(element);
      this.elements.set(element, callback);
    } else {
      // Fallback
      setTimeout(() => this.animateElement(element), 100);
    }
  }
  
  unobserve(element) {
    if (this.observer && element) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }
  
  observeExistingElements() {
    // Observe elements with scroll animation classes
    const selectors = [
      '.scroll-fade-in',
      '.scroll-slide-left',
      '.scroll-slide-right',
      '.scroll-scale-in',
      '[data-animate]'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        this.observe(el);
      });
    });
  }
  
  setupMutationObserver() {
    if (!('MutationObserver' in window)) return;
    
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if the added node itself needs to be observed
            if (this.shouldObserve(node)) {
              this.observe(node);
            }
            
            // Check for child elements that need to be observed
            const children = node.querySelectorAll?.(
              '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, [data-animate]'
            );
            children?.forEach(child => this.observe(child));
          }
        });
      });
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  shouldObserve(element) {
    return element.matches && element.matches(
      '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, [data-animate]'
    );
  }
  
  fallbackInit() {
    // Simple fallback that adds 'in-view' class immediately
    setTimeout(() => {
      document.querySelectorAll(
        '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
      ).forEach(el => {
        el.classList.add('in-view');
      });
    }, 100);
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.elements.clear();
    }
  }
}

/**
 * Staggered Animation Helper
 */
export class StaggeredAnimations {
  static animate(container, options = {}) {
    const {
      selector = '> *',
      delay = 100,
      animationClass = 'animate-fade-in-up',
      resetClass = 'opacity-0 translate-y-4'
    } = options;
    
    const elements = container.querySelectorAll(selector);
    
    // Reset elements
    elements.forEach(el => {
      el.classList.add(...resetClass.split(' '));
    });
    
    // Animate with stagger
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.remove(...resetClass.split(' '));
        el.classList.add(animationClass);
      }, index * delay);
    });
  }
  
  static animateOnScroll(container, options = {}) {
    const scrollAnimations = new ScrollAnimations();
    
    scrollAnimations.observe(container, () => {
      this.animate(container, options);
    });
  }
}

/**
 * Magnetic Effect Handler
 */
export class MagneticEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      strength: 20,
      duration: 200,
      ...options
    };
    
    this.rect = null;
    this.init();
  }
  
  init() {
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }
  
  handleMouseEnter() {
    this.rect = this.element.getBoundingClientRect();
  }
  
  handleMouseMove(e) {
    if (!this.rect) return;
    
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    
    const centerX = this.rect.width / 2;
    const centerY = this.rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const moveX = deltaX * this.options.strength;
    const moveY = deltaY * this.options.strength;
    
    this.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    this.element.style.transition = 'none';
  }
  
  handleMouseLeave() {
    this.element.style.transform = '';
    this.element.style.transition = `transform ${this.options.duration}ms ease`;
  }
  
  destroy() {
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}

/**
 * Tilt Effect Handler
 */
export class TiltEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxTilt: 15,
      perspective: 1000,
      scale: 1.02,
      speed: 300,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.element.style.transformStyle = 'preserve-3d';
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }
  
  handleMouseEnter() {
    this.element.style.willChange = 'transform';
  }
  
  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -this.options.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.options.maxTilt;
    
    this.element.style.transform = 
      `perspective(${this.options.perspective}px) ` +
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ` +
      `scale(${this.options.scale})`;
    
    this.element.style.transition = 'none';
  }
  
  handleMouseLeave() {
    this.element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    this.element.style.transition = `transform ${this.options.speed}ms ease`;
    this.element.style.willChange = 'auto';
  }
  
  destroy() {
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}

/**
 * Smooth Scroll Handler
 */
export class SmoothScroll {
  static scrollTo(target, options = {}) {
    const {
      duration = 800,
      easing = 'easeInOutQuad',
      offset = 0
    } = options;
    
    const targetElement = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
      
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const easingFunctions = {
      easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    };
    
    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easingFunctions[easing] || easingFunctions.easeInOutQuad;
      const currentPosition = startPosition + distance * ease(progress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }
  
  static initSmoothScrollLinks(selector = 'a[href^="#"]') {
    document.addEventListener('click', e => {
      const link = e.target.closest(selector);
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      this.scrollTo(target);
    });
  }
}

/**
 * Parallax Effect Handler
 */
export class ParallaxEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      speed: 0.5,
      direction: 'up', // 'up', 'down', 'left', 'right'
      ...options
    };
    
    this.ticking = false;
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  
  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(this.updatePosition.bind(this));
      this.ticking = true;
    }
  }
  
  updatePosition() {
    const scrolled = window.pageYOffset;
    const rect = this.element.getBoundingClientRect();
    
    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
      const speed = scrolled * this.options.speed;
      
      let transform = '';
      switch (this.options.direction) {
        case 'up':
          transform = `translateY(${-speed}px)`;
          break;
        case 'down':
          transform = `translateY(${speed}px)`;
          break;
        case 'left':
          transform = `translateX(${-speed}px)`;
          break;
        case 'right':
          transform = `translateX(${speed}px)`;
          break;
      }
      
      this.element.style.transform = transform;
    }
    
    this.ticking = false;
  }
  
  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

/**
 * Auto-initialize animations when DOM is loaded
 */
export function initializeAnimations() {
  // Initialize scroll animations
  const scrollAnimations = new ScrollAnimations();
  
  // Initialize magnetic effects
  document.querySelectorAll('.magnetic').forEach(el => {
    new MagneticEffect(el);
  });
  
  // Initialize tilt effects
  document.querySelectorAll('.tilt').forEach(el => {
    new TiltEffect(el);
  });
  
  // Initialize smooth scroll for anchor links
  SmoothScroll.initSmoothScrollLinks();
  
  // Initialize parallax effects
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.5;
    const direction = el.getAttribute('data-parallax-direction') || 'up';
    new ParallaxEffect(el, { speed, direction });
  });
  
  return scrollAnimations;
}

// Auto-initialize when DOM is loaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
  } else {
    initializeAnimations();
  }
}