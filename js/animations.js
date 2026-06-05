// Advanced animations and interactions for AgriFlow platform

const ENABLE_SPARKLES = false;

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupGSAPAnimations();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxEffects();
        this.setupTypingAnimation();
        if (ENABLE_SPARKLES) {
            this.setupParticleEffects();
        }
    }

    setupGSAPAnimations() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded. Advanced animations will use CSS fallbacks.');
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        this.animateHeroSection();
        
        // Feature cards staggered animation
        this.animateFeatureCards();
        
        // Global section animations
        this.animateGlobalSection();
        
        // Footer animations
        this.animateFooter();
    }

    animateHeroSection() {
        const tl = gsap.timeline();

        // Animate hero title lines
        tl.fromTo('.title-line', 
            { 
                opacity: 0, 
                y: 50,
                rotationX: -90
            },
            { 
                opacity: 1, 
                y: 0,
                rotationX: 0,
                duration: 0.8, 
                stagger: 0.2, 
                ease: "power2.out" 
            }
        );

        // Animate hero description
        tl.fromTo('.hero-description',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        );

        // Animate hero buttons
        tl.fromTo('.hero-actions .btn-primary, .hero-actions .btn-secondary',
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.3"
        );

        // Animate floating cards
        tl.fromTo('.floating-card',
            { opacity: 0, y: 20, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" },
            "-=0.2"
        );

        // Animate scroll indicator
        tl.fromTo('.scroll-indicator',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.1"
        );
    }

    animateFeatureCards() {
        gsap.fromTo('.feature-card',
            { 
                opacity: 0, 
                y: 50,
                rotationY: -15
            },
            { 
                opacity: 1, 
                y: 0,
                rotationY: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.features-grid',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Hover animations for feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    rotationY: 5,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    animateGlobalSection() {
        // Globe animation
        gsap.fromTo('.globe-scene',
            { 
                opacity: 0, 
                scale: 0.8,
                rotationY: -180
            },
            { 
                opacity: 1, 
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.globe-container',
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Data cards animation
        gsap.fromTo('.data-card',
            { 
                opacity: 0, 
                x: 50,
                rotationX: -90
            },
            { 
                opacity: 1, 
                x: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.hotspot-data',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    animateFooter() {
        gsap.fromTo('.footer-section',
            { 
                opacity: 0, 
                y: 30
            },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.footer',
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    setupScrollAnimations() {
        // Parallax scrolling for hero background
        gsap.to('.hero', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Section reveal animations
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            gsap.fromTo(section,
                { 
                    opacity: 0, 
                    y: 50
                },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    setupHoverEffects() {
        // Button hover effects
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });

        // Card hover effects
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -5,
                    rotationX: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotationX: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Nav link hover effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    setupParallaxEffects() {
        // Parallax for floating cards
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            gsap.to(card, {
                y: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: '.hero',
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Parallax for scene container
        gsap.to('.scene-container', {
            y: -100,
            rotationY: 5,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    setupTypingAnimation() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        const placeholderTexts = [
            "Search Mills, Prices...",
            "Find Market analysis...",
            "Locate logistics data...",
            "Discover Market insights..."
        ];

        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;

        function typeText() {
            const fullText = placeholderTexts[currentIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
            }

            searchInput.placeholder = currentText + '|';

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentText === fullText) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % placeholderTexts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        // Start typing animation when search input is not focused
        searchInput.addEventListener('focus', () => {
            searchInput.placeholder = "Search farms, crops...";
        });

        searchInput.addEventListener('blur', () => {
            if (!searchInput.value) {
                typeText();
            }
        });

        // Start the animation
        typeText();
    }

    setupParticleEffects() {
        // Sparkles disabled via ENABLE_SPARKLES flag
    }

    createHeroParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'hero-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        document.querySelector('.hero').appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(45, 90, 39, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    createFeatureParticles() {
        const featuresSection = document.querySelector('.features');
        if (!featuresSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'feature-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        featuresSection.style.position = 'relative';
        featuresSection.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'feature-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(154, 205, 50, 0.8), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: featureParticleFloat ${4 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Utility methods for custom animations
    animateElement(element, animation) {
        if (typeof gsap !== 'undefined') {
            gsap.to(element, animation);
        } else {
            // CSS fallback
            element.style.transition = 'all 0.3s ease';
            Object.assign(element.style, animation);
        }
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(45, 90, 39, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple effect to buttons
    addRippleEffect() {
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(btn, e);
            });
        });
    }
}

// CSS animations for particles
if (ENABLE_SPARKLES) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes featureParticleFloat {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.6;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 1;
            }
            50% {
                transform: translateY(-10px) translateX(-5px);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-30px) translateX(15px);
                opacity: 0.9;
            }
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .hero-particles { overflow: hidden; }
        .feature-particles { overflow: hidden; }
    `;
    document.head.appendChild(style);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}





















