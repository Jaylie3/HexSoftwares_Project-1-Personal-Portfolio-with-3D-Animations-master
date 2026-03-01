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

// Contact Form Security - Validation and Sanitization
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Validate inputs
            let isValid = true;
            
            // Validate name
            if (!validateRequired(name)) {
                showError(name, 'Name is required');
                isValid = false;
            } else if (!validateLength(name, 2, 100)) {
                showError(name, 'Name must be between 2 and 100 characters');
                isValid = false;
            } else if (!validateName(name.value)) {
                showError(name, 'Name can only contain letters, spaces, hyphens, and apostrophes');
                isValid = false;
            }
            
            // Validate email
            if (!validateRequired(email)) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (!validateRequired(subject)) {
                showError(subject, 'Subject is required');
                isValid = false;
            } else if (!validateLength(subject, 3, 200)) {
                showError(subject, 'Subject must be between 3 and 200 characters');
                isValid = false;
            }
            
            // Validate message
            if (!validateRequired(message)) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (!validateLength(message, 10, 2000)) {
                showError(message, 'Message must be between 10 and 2000 characters');
                isValid = false;
            }
            
            // If valid, sanitize and submit
            if (isValid) {
                const formData = {
                    name: sanitizeInput(name.value.trim()),
                    email: sanitizeEmail(email.value.trim()),
                    subject: sanitizeInput(subject.value.trim()),
                    message: sanitizeInput(message.value.trim())
                };
                
                // Create hidden inputs with sanitized values
                addHiddenInput(contactForm, 'sanitized_name', formData.name);
                addHiddenInput(contactForm, 'sanitized_email', formData.email);
                addHiddenInput(contactForm, 'sanitized_subject', formData.subject);
                addHiddenInput(contactForm, 'sanitized_message', formData.message);
                addHiddenInput(contactForm, 'timestamp', Date.now().toString());
                addHiddenInput(contactForm, 'csrf_token', generateCSRFToken());
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // Optionally submit to backend (uncomment when backend is ready)
                // submitForm(contactForm, formData);
            }
        });
    }
    
    // Validation Functions
    function validateRequired(input) {
        return input.value.trim() !== '';
    }
    
    function validateLength(input, min, max) {
        const length = input.value.trim().length;
        return length >= min && length <= max;
    }
    
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email.trim());
    }
    
    function validateName(name) {
        const namePattern = /^[a-zA-Z\s'-]+$/;
        return namePattern.test(name.trim());
    }
    
    // Sanitization Functions
    function sanitizeInput(input) {
        // Remove potentially dangerous characters
        let sanitized = input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
        
        // Remove script tags and event handlers
        sanitized = sanitized
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/on\w+='[^']*'/gi, '')
            .replace(/javascript:/gi, '');
        
        // Trim and limit multiple spaces
        sanitized = sanitized.replace(/\s+/g, ' ').trim();
        
        return sanitized;
    }
    
    function sanitizeEmail(email) {
        const sanitized = email
            .toLowerCase()
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .trim();
        return sanitized;
    }
    
    function generateCSRFToken() {
        const array = new Uint32Array(4);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    }
    
    // UI Helper Functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        formGroup.classList.add('error');
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
    }
    
    function showSuccessMessage() {
        const form = document.getElementById('contactForm');
        let successDiv = document.querySelector('.form-success');
        
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            form.parentNode.insertBefore(successDiv, form.nextSibling);
        }
        
        successDiv.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Message sent successfully! We will get back to you soon.</span>
        `;
        
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 5000);
    }
    
    function addHiddenInput(form, name, value) {
        let input = form.querySelector(`input[name="${name}"]`);
        if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            form.appendChild(input);
        }
        input.value = value;
    }
    
    function submitForm(form, data) {
        const submitUrl = form.action || '/contact';
        const method = form.method || 'POST';
        
        fetch(submitUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            console.log('Form submitted successfully:', result);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    }
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