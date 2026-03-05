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
    
    // Initialize Dark/Light Mode
    initThemeToggle();
    
    // Initialize Back to Top
    initBackToTop();
    
    // Initialize Stats Counter
    initStatsCounter();
});

// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    if (!form) return;
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        statusDiv.textContent = 'Sending...';
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };
        try {
            const res = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                statusDiv.style.color = 'green';
                statusDiv.textContent = 'Message sent successfully!';
                form.reset();
            } else {
                statusDiv.style.color = 'red';
                statusDiv.textContent = data.error || 'Failed to send message.';
            }
        } catch (err) {
            statusDiv.style.color = 'red';
            statusDiv.textContent = 'Unable to connect to the server. Please check your internet connection or try again in a few minutes.';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + (target === 100 ? '%' : '+');
                }
            };
            
            updateCounter();
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}