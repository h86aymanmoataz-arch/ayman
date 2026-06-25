/**
 * SoftAware Main JavaScript (Premium Light Theme)
 * Using GSAP for smooth, performant scroll animations and micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Handle Preloader
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Wait for SVG animation to finish (2s draw + 0.5s fill)
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        preloader.style.display = 'none';
                        initAnimations(); // Start page animations only AFTER preloader is gone
                    }
                });
            }, 2500);
        } else {
            initAnimations();
        }
    } else {
        console.warn("GSAP not loaded.");
    }

    // Mobile Navbar Toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Implement mobile menu toggle logic here
            // For now, it just clicks. You'd typically toggle a class on the navbar-nav.
            console.log("Mobile menu toggled");
        });
    }
});

function initAnimations() {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -50',
            end: 99999,
            toggleClass: { className: 'navbar-scrolled', targets: '.navbar' }
        });
    }

    /* --- Hero Section Animations --- */
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');
    const heroMainImg = document.querySelector('.hero-main-img');
    const floatingCards = document.querySelectorAll('.hero-floating-card');

    const heroTl = gsap.timeline();

    if (heroTitle) {
        heroTl.from(heroTitle, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    if (heroSubtitle) {
        heroTl.from(heroSubtitle, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4');
    }

    if (heroActions) {
        heroTl.from(heroActions, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4');
    }

    if (heroMainImg) {
        heroTl.from(heroMainImg, {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.6');
    }

    if (floatingCards.length) {
        heroTl.from(floatingCards, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.5)'
        }, '-=0.5');
    }

    /* --- Service Cards Stagger --- */
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    /* --- Process Steps Scroll --- */
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length) {
        stepCards.forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
                x: i % 2 === 0 ? -40 : 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }

    /* --- Team Grid Scroll --- */
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length) {
        gsap.from(teamMembers, {
            scrollTrigger: {
                trigger: '.team-section',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    /* --- Trust Banner Counters --- */
    const statNumbers = document.querySelectorAll('.stat-item h3');
    if (statNumbers.length) {
        statNumbers.forEach(stat => {
            // Note: True counting animation requires more complex setup, 
            // but this creates a nice fade-up effect for the numbers.
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: '.trust-banner',
                    start: 'top 85%'
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }
}
