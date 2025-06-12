// Rénovation Pro Montpellier - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                // Simulate form submission
                showSuccessMessage();
                contactForm.reset();
            } else {
                // Scroll to first error field
                const firstError = contactForm.querySelector('.form-control[style*="border-color"]');
                if (firstError) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const errorPosition = firstError.offsetTop - headerHeight - 100;
                    window.scrollTo({
                        top: errorPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            return false;
        });
    }

    // Form Validation
    function validateForm(data) {
        let isValid = true;
        const errors = [];

        // Clear previous error states
        clearFormErrors();

        // Required fields validation
        if (!data.nom || data.nom.trim().length < 2) {
            showFieldError('nom', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        }

        if (!data.prenom || data.prenom.trim().length < 2) {
            showFieldError('prenom', 'Le prénom doit contenir au moins 2 caractères');
            isValid = false;
        }

        if (!data.telephone || !isValidPhone(data.telephone)) {
            showFieldError('telephone', 'Veuillez saisir un numéro de téléphone valide');
            isValid = false;
        }

        if (data.email && data.email.trim() !== '' && !isValidEmail(data.email)) {
            showFieldError('email', 'Veuillez saisir une adresse email valide');
            isValid = false;
        }

        if (!data.ville) {
            showFieldError('ville', 'Veuillez sélectionner une ville');
            isValid = false;
        }

        if (!data.service) {
            showFieldError('service', 'Veuillez sélectionner un type de travaux');
            isValid = false;
        }

        if (!data.message || data.message.trim().length < 10) {
            showFieldError('message', 'Veuillez décrire votre projet (minimum 10 caractères)');
            isValid = false;
        }

        return isValid;
    }

    // Helper functions for validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = 'var(--color-error)';
            field.style.boxShadow = '0 0 0 3px rgba(192, 21, 47, 0.1)';
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'var(--color-error)';
            errorDiv.style.fontSize = 'var(--font-size-sm)';
            errorDiv.style.marginTop = 'var(--space-4)';
            errorDiv.style.fontWeight = 'var(--font-weight-medium)';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }

    function clearFormErrors() {
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.style.borderColor = '';
            control.style.boxShadow = '';
        });

        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }

    function showSuccessMessage() {
        // Remove any existing success message
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: rgba(var(--color-success-rgb), 0.1);
            border: 1px solid var(--color-success);
            color: var(--color-success);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
            text-align: center;
            font-weight: var(--font-weight-medium);
            animation: slideIn 0.5s ease-out;
        `;
        successDiv.innerHTML = `
            <strong>✅ Demande envoyée avec succès !</strong><br>
            Nous vous recontacterons dans les plus brefs délais pour établir votre devis gratuit.
        `;

        // Insert success message before form
        contactForm.parentNode.insertBefore(successDiv, contactForm);

        // Remove success message after 8 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.style.animation = 'slideOut 0.5s ease-out';
                setTimeout(() => {
                    if (successDiv.parentNode) {
                        successDiv.remove();
                    }
                }, 500);
            }
        }, 8000);

        // Scroll to success message
        const headerHeight = document.querySelector('.header').offsetHeight;
        const successPosition = successDiv.offsetTop - headerHeight - 20;
        window.scrollTo({
            top: successPosition,
            behavior: 'smooth'
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('telephone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format phone number as user types
            if (value.length > 0) {
                if (value.startsWith('33')) {
                    value = '+' + value;
                } else if (value.startsWith('0') && value.length === 10) {
                    value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
                }
            }
            
            e.target.value = value;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.service-card, .advantage-card, .testimonial-card, .realisation-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add scroll-based header background
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
        }
    });

    // FAQ-like functionality for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse effect
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add loading state for form submission
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        
        contactForm.addEventListener('submit', function() {
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Reset button after success or error
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        });
    }

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Add focus trap for mobile menu
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    if (navMenu) {
        trapFocus(navMenu);
    }

    // Console message for SEO/development purposes
    console.log('🏠 Rénovation Pro Montpellier - Site chargé avec succès');
    console.log('📞 Contact: 06 XX XX XX XX');
    console.log('📧 Email: contact@renovation-pro-montpellier.fr');
    console.log('🌐 Optimisé pour le SEO et les LLM');
});

// Add CSS animations for success messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);