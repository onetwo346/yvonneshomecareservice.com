// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotBox = document.querySelector('.chatbot-box');
    
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;

    // Common care-related questions and answers
    const responses = {
        'hello': 'Hello! How can I assist you with our home care services today?',
        'hi': 'Hi there! How can I help you with our home care services?',
        'services': 'We offer a range of services including personal care, medication management, meal preparation, companionship, and transportation assistance. Would you like more details about any specific service?',
        'cost': 'Our service costs vary depending on the level of care needed and the number of hours required. We\'d be happy to provide a personalized quote after a brief assessment. Would you like to schedule a free consultation?',
        'hours': 'We provide care services 24/7, including weekends and holidays. Our caregivers can be scheduled for as little as 4 hours or up to 24-hour live-in care.',
        'caregivers': 'All our caregivers are thoroughly vetted, trained, and certified. They undergo background checks and are selected for their compassion, reliability, and experience in home care.',
        'insurance': 'We work with most long-term care insurance policies. We can help verify your coverage and assist with the claims process. Would you like us to check your policy?',
        'start': 'Getting started is easy! We begin with a free in-home assessment to understand your needs, then create a personalized care plan. We can typically start services within 24-48 hours of the assessment.',
        'contact': 'You can reach us at (646) 972-4202 or by filling out the contact form on our website. Would you like me to have someone call you back?',
        'location': 'We serve the greater New York area, including all five boroughs and parts of New Jersey. Do you need care in a specific location?',
        'covid': 'We take COVID-19 precautions very seriously. All our caregivers are vaccinated, use appropriate PPE, and follow strict safety protocols to protect our clients.',
        'emergency': 'If this is a medical emergency, please call 911 immediately. For urgent care needs, please call our 24/7 support line at (646) 972-4202.'
    };

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.add('active');
        // On mobile, ensure the chatbot is fully visible
        if (isMobile) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });

    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            // Refresh the page to apply correct mobile/desktop styles
            if (chatbotContainer.classList.contains('active')) {
                chatbotContainer.classList.remove('active');
            }
        }
    });
    
    // Close chatbot when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (isMobile && 
            chatbotContainer.classList.contains('active') && 
            !chatbotBox.contains(e.target) && 
            !chatbotToggle.contains(e.target)) {
            chatbotContainer.classList.remove('active');
        }
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Process the message and respond
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }

    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        if (sender === 'user') {
            messageElement.classList.add('user-message');
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <div class="message-avatar">
                    <span>You</span>
                </div>
            `;
        } else {
            messageElement.classList.add('bot-message');
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="assets/images/logo.svg" alt="Care Assistant">
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
        }

        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get response based on user input
    function getResponse(message) {
        message = message.toLowerCase();
        
        // Check for keyword matches
        for (const [keyword, response] of Object.entries(responses)) {
            if (message.includes(keyword)) {
                return response;
            }
        }

        // Check for question types
        if (message.includes('?') || 
            message.includes('how') || 
            message.includes('what') || 
            message.includes('when') || 
            message.includes('where') || 
            message.includes('who') || 
            message.includes('why')) {
            return "That's a great question! For specific details, please call us at (646) 972-4202 or fill out our contact form, and one of our care coordinators will assist you promptly.";
        }

        // Default response
        return "Thank you for your message. If you'd like to learn more about our services or schedule a free consultation, please call us at (646) 972-4202 or use the contact form below.";
    }

    // Pre-defined suggested questions
    const suggestedQuestions = [
        "What services do you offer?",
        "How much do your services cost?",
        "How do I get started?",
        "Are your caregivers certified?"
    ];

    // Add suggested questions after a delay
    setTimeout(() => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('message', 'bot-message');
        
        let suggestionsHTML = `
            <div class="message-avatar">
                <img src="assets/images/logo.svg" alt="Care Assistant">
            </div>
            <div class="message-content">
                <p>Here are some common questions you might have:</p>
                <div class="suggested-questions">`;
        
        suggestedQuestions.forEach(question => {
            suggestionsHTML += `<button class="suggested-question">${question}</button>`;
        });
        
        suggestionsHTML += `</div>
            </div>
        `;
        
        suggestionElement.innerHTML = suggestionsHTML;
        chatbotMessages.appendChild(suggestionElement);
        
        // Add event listeners to suggested questions
        document.querySelectorAll('.suggested-question').forEach(button => {
            button.addEventListener('click', function() {
                const question = this.textContent;
                addMessage(question, 'user');
                
                setTimeout(() => {
                    const response = getResponse(question);
                    addMessage(response, 'bot');
                }, 500);
            });
        });
    }, 1000);
});
