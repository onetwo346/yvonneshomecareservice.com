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
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Always prevent default form submission
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const phoneInput = this.querySelector('input[name="phone"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();
            const message = messageInput.value.trim();
            
            // Validate the form
            if (!(name && validateEmail(email) && message)) {
                showModal('Form Error', 'Please fill in all required fields correctly.');
                return;
            }
            
            // Disable the submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            // Prepare the data to send
            const formData = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                _subject: 'New message from Yvonne\'s Home Care website'
            };
            
            // Direct mailto approach - most reliable for simple sites
            const mailtoLink = `mailto:yvonnesprivatehomecare@gmail.com?subject=Website Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message)}`;
            
            // Open the user's email client
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                showModal('Message Ready to Send', 'We\'ve opened your email app with your message ready to send. Just click send in your email app to complete the process.');
                
                // Reset the form
                contactForm.reset();
                
                // Re-enable the submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
            }, 1000);
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
    
    // Pop-up displays for About Us, Services, and Care Gallery items
    const aboutCards = document.querySelectorAll('.about-card');
    const serviceCards = document.querySelectorAll('.service-card');
    const careItems = document.querySelectorAll('.care-item');
    
    // Function to create and show a detail modal for clicked items
    function showDetailModal(title, content, imageSrc = null) {
        // Create modal elements
        const detailModal = document.createElement('div');
        detailModal.className = 'detail-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'detail-modal-content glass-card';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'detail-modal-header';
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'detail-modal-close';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'detail-modal-body';
        
        // Add image if provided
        if (imageSrc) {
            const modalImage = document.createElement('img');
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalImage.className = 'detail-modal-image';
            modalBody.appendChild(modalImage);
        }
        
        const modalText = document.createElement('div');
        modalText.className = 'detail-modal-text';
        modalText.innerHTML = content;
        modalBody.appendChild(modalText);
        
        // Assemble modal
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        detailModal.appendChild(modalContent);
        
        // Add to body
        document.body.appendChild(detailModal);
        
        // Show modal with animation
        setTimeout(() => {
            detailModal.classList.add('active');
        }, 10);
        
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', () => {
            detailModal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(detailModal);
            }, 300);
        });
        
        // Close modal when clicking outside
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(detailModal);
                }, 300);
            }
        });
    }
    
    // Add click event to About Cards
    aboutCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const paragraphs = card.querySelectorAll('p');
            let content = '';
            paragraphs.forEach(p => {
                content += `<p>${p.textContent}</p>`;
            });
            const imageSrc = card.querySelector('img').src;
            showDetailModal(title, content, imageSrc);
        });
    });
    
    // Add click event to Service Cards
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const content = card.querySelector('p').textContent;
            const iconClass = card.querySelector('.service-icon i').className;
            
            let expandedContent = `<p>${content}</p>`;
            // Add more detailed content based on service type
            if (title === 'Personal Care') {
                expandedContent += `<p>Our personal care services include assistance with daily activities such as bathing, dressing, grooming, mobility support, and toileting. Our caregivers are trained to provide dignified care while promoting independence.</p>`;
            } else if (title === 'Medication Management') {
                expandedContent += `<p>We help ensure medications are taken correctly and on time. Our caregivers can provide medication reminders, assist with organizing pill boxes, and monitor for potential side effects.</p>`;
            } else if (title === 'Household Help') {
                expandedContent += `<p>Our household services include light cleaning, laundry, meal preparation, grocery shopping, and organizing. We ensure your home remains a clean, safe, and comfortable environment.</p>`;
            } else if (title === 'Companionship') {
                expandedContent += `<p>Our companionship services focus on meaningful social interaction through conversation, shared activities, games, hobbies, and walks. We strive to reduce isolation and enhance emotional well-being.</p>`;
            } else if (title === 'Transportation') {
                expandedContent += `<p>We provide safe transportation and accompaniment to medical appointments, social events, shopping trips, and other outings. Our caregivers can help with mobility and ensure clients get where they need to go safely.</p>`;
            } else if (title === 'Respite Care') {
                expandedContent += `<p>Our respite care services provide family caregivers with temporary relief from caregiving responsibilities. We offer flexible scheduling options from a few hours to several days to ensure your loved one receives uninterrupted care.</p>`;
            } else if (title === 'Colostomy Care') {
                expandedContent += `<p>Our caregivers are specially trained in colostomy care procedures, including proper bag emptying and changing techniques, skin cleaning and inspection, odor management, and monitoring for complications. We provide this care with dignity and attention to client comfort.</p>`;
            }
            
            // Create modal with an icon instead of image
            const iconHtml = `<div class="detail-modal-icon"><i class="${iconClass}"></i></div>`;
            showDetailModal(title, expandedContent, null);
            
            // Add icon manually after modal is created
            const modalBody = document.querySelector('.detail-modal-body');
            if (modalBody) {
                modalBody.insertAdjacentHTML('afterbegin', iconHtml);
            }
        });
    });
    
    // Add click event to Care Items
    careItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const content = item.querySelector('p').textContent;
            const imageSrc = item.querySelector('img').src;
            
            let expandedContent = `<p>${content}</p>`;
            // Add more detailed content based on care type
            if (title === 'Medication Assistance') {
                expandedContent += `<p>Our medication assistance includes organizing pill boxes, providing timely reminders, helping with proper dosage, and monitoring for side effects. We keep detailed records of medication schedules and any observations to share with healthcare providers.</p>`;
            } else if (title === 'Meal Preparation') {
                expandedContent += `<p>Our meal preparation services include planning nutritious meals according to dietary requirements, grocery shopping, cooking, serving, and cleanup. We accommodate special diets and food preferences to ensure proper nutrition and enjoyable meals.</p>`;
            } else if (title === 'Outdoor Activities') {
                expandedContent += `<p>We encourage outdoor engagement through accompanied walks, gardening assistance, patio time, and community outings. These activities promote physical exercise, vitamin D exposure, and connection with nature, which are beneficial for physical and mental well-being.</p>`;
            } else if (title === 'Personal Care') {
                expandedContent += `<p>Our personal care assistance includes bathing, dressing, grooming, oral hygiene, and toileting. We approach these intimate care needs with respect, preserving dignity and comfort while adjusting to individual preferences and routines.</p>`;
            }
            
            showDetailModal(title, expandedContent, imageSrc);
        });
    });
});
