'use strict';

/**
 * Arena Salon - Main Interactive Controller
 * Handles mobile navigation, smooth scrolling, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initHeaderScroll();
    initRevealOnScroll();
});

/**
 * Mobile Navigation Logic
 */
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle Active Class for Menu
            navLinksContainer.classList.toggle('active');
            
            // Toggle Burger Animation
            mobileMenuBtn.classList.toggle('is-active');
            
            // Accessibility
            const isExpanded = navLinksContainer.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close menu when a link is clicked (Mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.classList.remove('is-active');
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header background opacity change on scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Intersection Observer for Fade-in effects
 * Adds a luxury feel as elements appear on scroll
 */
function initRevealOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Targets for reveal
    const revealTargets = document.querySelectorAll('.service-category, .stylist-card, .about-text');
    
    revealTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(30px)';
        target.style.transition = 'all 0.8s ease-out';
        observer.observe(target);
    });

    // Add a helper class to handle the revealed state in CSS via JS trigger
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Simple Testimonial "Slider" Logic (Optional P1)
 * If there were multiple testimonials, this would cycle them. 
 * Current implementation supports one for simplicity as per HTML skeleton.
 */
function initTestimonialLegacy() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 1) {
        let current = 0;
        setInterval(() => {
            testimonials[current].style.display = 'none';
            current = (current + 1) % testimonials.length;
            testimonials[current].style.display = 'block';
        }, 5000);
    }
}