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

// Secure Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        // Enable auto-fill by ensuring autocomplete attributes are set
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            if (!input.getAttribute('autocomplete')) {
                if (input.type === 'email') {
                    input.setAttribute('autocomplete', 'email');
                } else if (input.type === 'text') {
                    input.setAttribute('autocomplete', 'name');
                } else if (input.tagName === 'TEXTAREA') {
                    input.setAttribute('autocomplete', 'off');
                }
            }
        });
        
        // Form submission handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: sanitizeInput(formData.get('name') || ''),
                email: sanitizeInput(formData.get('email') || ''),
                subject: sanitizeInput(formData.get('subject') || ''),
                message: sanitizeInput(formData.get('message') || '')
            };
            
            // Validate form
            const validation = validateForm(data);
            if (!validation.isValid) {
                displayErrors(validation.errors);
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Create secure headers
                const headers = {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                };
                
                // Send data to backend
                // Replace 'YOUR_ENDPOINT_URL' with your actual backend endpoint
                // or use Formspree: 'https://formspree.io/f/YOUR_FORM_ID'
                const response = await fetch('YOUR_ENDPOINT_URL', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                    mode: 'cors'
                });
                
                if (response.ok) {
                    showSuccessMessage('Your message has been sent successfully!');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Fallback: Display message for backend setup
                showBackendSetupMessage(data);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
    
    // Input sanitization function to prevent XSS
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        // Create a div to use browser's built-in HTML escaping
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    // Form validation
    function validateForm(data) {
        const errors = {};
        let isValid = true;
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Please enter a valid name (at least 2 characters)';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Subject validation
        if (!data.subject || data.subject.trim().length < 3) {
            errors.subject = 'Please enter a subject (at least 3 characters)';
            isValid = false;
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Please enter a message (at least 10 characters)';
            isValid = false;
        }
        
        // Prevent potential email injection
        const emailInjectionRegex = /[\r\n]|(%0D|%0A)/i;
        if (emailInjectionRegex.test(data.email) || emailInjectionRegex.test(data.subject)) {
            errors.email = 'Invalid characters detected';
            isValid = false;
        }
        
        return { isValid, errors };
    }
    
    // Display validation errors
    function displayErrors(errors) {
        Object.keys(errors).forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (input) {
                // Add error class to input
                input.classList.add('error');
                
                // Create or update error message
                let errorElement = input.parentElement.querySelector('.error-message');
                if (!errorElement) {
                    errorElement = document.createElement('span');
                    errorElement.className = 'error-message';
                    input.parentElement.appendChild(errorElement);
                }
                errorElement.textContent = errors[field];
            }
        });
    }
    
    // Clear all error states
    function clearErrors() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
    
    // Show success message
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success';
        successDiv.textContent = message;
        
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Show message for backend setup
    function showBackendSetupMessage(data) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'form-message info';
        infoDiv.innerHTML = `
            <p><strong>Backend Setup Required:</strong> To receive email notifications, configure one of these options:</p>
            <ol>
                <li><strong>Formspree:</strong> Replace 'YOUR_ENDPOINT_URL' in script.js with your Formspree endpoint URL</li>
                <li><strong>Custom Backend:</strong> Set up an HTTPS endpoint to handle form submissions</li>
                <li><strong>EmailJS:</strong> Integrate EmailJS service for direct email sending</li>
            </ol>
        `;
        
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        contactForm.insertBefore(infoDiv, contactForm.firstChild);
    }
});