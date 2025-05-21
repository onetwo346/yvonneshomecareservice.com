/**
 * Yvonne's Home Care Service - Main JavaScript
 * Handles animations, interactions, and form submissions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const sliderNavButtons = document.querySelectorAll('.slider-nav button');
    
    if (testimonialSlider && sliderNavButtons.length > 0) {
        sliderNavButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                sliderNavButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Calculate scroll position
                const testimonialCards = document.querySelectorAll('.testimonial-card');
                if (testimonialCards.length > index) {
                    const cardWidth = testimonialCards[0].offsetWidth;
                    const gap = 30; // Same as the gap in CSS
                    testimonialSlider.scrollTo({
                        left: index * (cardWidth + gap),
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Show success modal
                showModal('Thank You!', 'You have successfully subscribed to our newsletter. We\'ll keep you updated with the latest news and tips.');
                emailInput.value = '';
            } else {
                // Show error modal
                showModal('Invalid Email', 'Please enter a valid email address.');
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            if (name && validateEmail(email) && message) {
                // Show success modal
                showModal('Message Sent', 'Thank you for reaching out! We\'ll get back to you as soon as possible.');
                
                // Reset form
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
            } else {
                // Show error modal
                showModal('Form Error', 'Please fill in all fields correctly.');
            }
        });
    }

    // Modal Functionality
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-title');
    const modalMessage = document.querySelector('.modal-message');
    
    if (modal && modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on page load

    // Utility Functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    function showModal(title, message) {
        if (modal && modalTitle && modalMessage) {
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            modal.classList.add('active');
        }
    }

    // Check for newsletter subscription success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('newsletter') === 'success') {
        showModal('Thank You!', 'You have successfully subscribed to our newsletter.');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
