// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Fixed Navigation
document.addEventListener('DOMContentLoaded', function() {
    const fixedNav = document.getElementById('fixedNav');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fixedNav.classList.add('visible');
        } else {
            fixedNav.classList.remove('visible');
        }
        updateActiveNavItem();
    });
    
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const activeItem = document.querySelector(`[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                }
            }
        });
    }
});

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Three.js Background
function initThreeJS() {
    if (typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('canvas.webgl'),
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;
    
    // Particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x6366f1,
        size: 0.02,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    
    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const mainHeading = document.querySelector('.profile-info h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 2500);
    }
    
    // Initialize Three.js after a delay
    setTimeout(initThreeJS, 100);
});

// Secure Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Set secure form attributes
        contactForm.setAttribute('autocomplete', 'off');
        
        // Get form fields and set secure attributes
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        if (nameInput) {
            nameInput.setAttribute('autocomplete', 'off');
            nameInput.setAttribute('autocorrect', 'off');
            nameInput.setAttribute('spellcheck', 'false');
        }
        
        if (emailInput) {
            emailInput.setAttribute('autocomplete', 'off');
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('inputmode', 'email');
        }
        
        if (subjectInput) {
            subjectInput.setAttribute('autocomplete', 'off');
            subjectInput.setAttribute('autocorrect', 'off');
            subjectInput.setAttribute('spellcheck', 'false');
        }
        
        if (messageInput) {
            messageInput.setAttribute('autocomplete', 'off');
            messageInput.setAttribute('autocorrect', 'off');
            messageInput.setAttribute('spellcheck', 'true');
        }
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Remove existing error messages
            const existingErrors = contactForm.querySelectorAll('.error-message');
            existingErrors.forEach(error => error.remove());
            
            const formData = new FormData(contactForm);
            let isValid = true;
            let errorMessage = '';
            
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate name - required, min 2 chars
            if (!name || name.trim().length < 2 || !/^[a-zA-Z\s\-\.']+$/.test(name.trim())) {
                isValid = false;
                showFieldError(nameInput, 'Please enter a valid name (letters, spaces, hyphens, apostrophes only)');
            }
            
            // Validate email format
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email || !emailRegex.test(email.trim())) {
                isValid = false;
                showFieldError(emailInput, 'Please enter a valid email address');
            }
            
            // Validate subject - required, min 3 chars
            if (!subject || subject.trim().length < 3) {
                isValid = false;
                showFieldError(subjectInput, 'Please enter a subject (at least 3 characters)');
            }
            
            // Validate message - required, min 10 chars, max 1000 chars
            if (!message || message.trim().length < 10 || message.trim().length > 1000) {
                isValid = false;
                showFieldError(messageInput, 'Please enter a message (10-1000 characters)');
            }
            
            // Check if form is valid
            if (!isValid) {
                showFormMessage('Please correct the errors above and try again.', 'error');
                return;
            }
            
            // Sanitize inputs to prevent XSS attacks
            const sanitizedData = {
                name: sanitizeInput(name),
                email: sanitizeInput(email),
                subject: sanitizeInput(subject),
                message: sanitizeInput(message)
            };
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.setAttribute('aria-busy', 'true');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.dataset.originalText = originalText;
            }
            
            // Send data securely
            sendSecureFormData(sanitizedData)
                .then(response => {
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                    // Clear any remaining.error styling
                    contactForm.querySelectorAll('.error').forEach(field => {
                        field.classList.remove('error');
                    });
                })
                .catch(error => {
                    showFormMessage('Failed to send message. Please try again.', 'error');
                    console.error('Form submission error:', error);
                })
                .finally(() => {
                    // Reset button state
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.setAttribute('aria-busy', 'false');
                        submitButton.textContent = submitButton.dataset.originalText || 'Send Message';
                    }
                });
        });
        
        // Add real-time validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
            
            // Prevent paste events for sensitive fields (optional security measure)
            if (input.type === 'email') {
                input.addEventListener('paste', function(e) {
                    setTimeout(() => validateField(this), 0);
                });
            }
        });
    }
    
    // Sanitize input function - prevents XSS attacks
    function sanitizeInput(input) {
        if (!input) return '';
        
        // Create a temporary div to safely escape HTML
        const div = document.createElement('div');
        div.textContent = input.trim();
        const sanitized = div.innerHTML;
        
        // Additional security: remove any remaining HTML entities
        return sanitized
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    
    // Send secure form data
    async function sendSecureFormData(data) {
        // In production, send to a secure backend endpoint with HTTPS
        // Using Content Security Policy headers on the server
        
        // Prepare data for secure transmission
        const payload = JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            timestamp: new Date().toISOString(),
            // Add CSRF token in production
            csrfToken: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        });
        
        // Simulate secure submission
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Log data for demonstration (remove in production)
                console.log('Secure form data prepared for submission:', {
                    recipient: 'lindokuhle nkosinathi jali at gmail dot com',
                    sanitizedData: data
                });
                resolve({ success: true, message: 'Message sent successfully' });
            }, 1500);
        });
        
        // Production example (replace with actual endpoint):
        /*
        return fetch('https://your-secure-endpoint.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: payload,
            credentials: 'same-origin'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
        */
    }
    
    // Validate individual field
    function validateField(field) {
        if (!field) return false;
        
        let isValid = true;
        
        const fieldId = field.id;
        const value = field.value.trim();
        
        // Clear previous error
        const existingErrorMsg = field.parentElement.querySelector('.error-message');
        if (existingErrorMsg) {
            existingErrorMsg.remove();
        }
        field.classList.remove('error');
        
        switch(fieldId) {
            case 'name':
                if (value.length < 2 || !/^[a-zA-Z\s\-\.']+$/.test(value)) {
                    isValid = false;
                    showFieldError(field, 'Name must be at least 2 characters (letters, spaces, hyphens, apostrophes only)');
                }
                break;
            case 'email':
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                }
                break;
            case 'subject':
                if (value.length < 3) {
                    isValid = false;
                    showFieldError(field, 'Subject must be at least 3 characters');
                }
                break;
            case 'message':
                if (value.length < 10 || value.length > 1000) {
                    isValid = false;
                    showFieldError(field, 'Message must be between 10 and 1000 characters');
                }
                break;
        }
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(field, message) {
        if (!field) return;
        
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', field.id + '-error');
        
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.id = field.id + '-error';
            errorElement.setAttribute('role', 'alert');
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    // Show form message (success/error)
    function showFormMessage(message, type) {
        let messageElement = document.querySelector('.form-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            messageElement.setAttribute('role', 'alert');
            messageElement.setAttribute('aria-live', 'polite');
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.insertBefore(messageElement, contactForm.firstChild);
            }
        }
        
        messageElement.textContent = message;
        messageElement.className = 'form-message ' + type;
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement && messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    // Prevent form resubmission on page refresh
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});