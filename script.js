// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Fixed Navigation with Glass Effect
document.addEventListener('DOMContentLoaded', function() {
    const fixedNav = document.getElementById('fixedNav');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            fixedNav.classList.add('visible');
            fixedNav.style.backdropFilter = 'blur(20px)';
            fixedNav.style.background = 'rgba(255, 255, 255, 0.1)';
            fixedNav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            fixedNav.classList.remove('visible');
        }
        updateActiveNavItem();
    });
    
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.style.transform = 'scale(1)';
                });
                const activeItem = document.querySelector(`[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                    activeItem.style.transform = 'scale(1.1)';
                }
            }
        });
    }
    
    // Hover effects for nav items
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
});

// Smooth Scrolling with Offset
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.getElementById('fixedNav')?.offsetHeight || 0;
                const offsetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add ripple effect
                createRipple(e);
            }
        });
    });
    
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${event.clientX - rect.left}px;
            top: ${event.clientY - rect.top}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Enhanced Animations with Staggered Reveal
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);
    
    // Animate cards with more sophisticated effects
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content, .glass-effect, .glass-panel');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('animate-in')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });
        
        observer.observe(card);
    });
    
    // Text reveal animation
    const textElements = document.querySelectorAll('h2, h3, .section-title');
    textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.05}s`;
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    textObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        textObserver.observe(el);
    });
});

// Three.js Background with Enhanced Effects
function initThreeJS() {
    if (typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('canvas.webgl'),
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;
    
    // Enhanced Particles with Glass Effect
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1200;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const colorPalette = [
        new THREE.Color(0x6366f1),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0xec4899),
        new THREE.Color(0x06b6d4)
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 0.04 + 0.02;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.03,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Add connecting lines for glass effect
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) {
        linePositions[i] = (Math.random() - 0.5) * 15;
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.15
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
        
        lines.rotation.x += 0.0002;
        lines.rotation.y += 0.0004;
        
        // Mouse interaction
        particles.rotation.x += mouseY * 0.0005;
        particles.rotation.y += mouseX * 0.0005;
        
        renderer.render(scene, camera);
    }
    
    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    animate();
}

// Glass Effect Application
function applyGlassEffects() {
    const glassElements = document.querySelectorAll('.glass-effect, .glass-panel, .card, section');
    
    glassElements.forEach(element => {
        element.style.backdropFilter = 'blur(12px)';
        element.style.webkitBackdropFilter = 'blur(12px)';
        element.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
        element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        element.style.borderRadius = '20px';
        element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
}

// Text Clarity Enhancement
function enhanceTextClarity() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
    
    textElements.forEach(element => {
        // Skip if already has custom text shadow
        if (element.style.textShadow) return;
        
        // Add subtle text shadow for better readability
        element.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
        
        // Ensure good contrast
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        // If background is dark, enhance text
        if (backgroundColor.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/)) {
            const rgbValues = backgroundColor.match(/\d+/g);
            if (rgbValues) {
                const brightness = (parseInt(rgbValues[0]) * 299 + parseInt(rgbValues[1]) * 587 + parseInt(rgbValues[2]) * 114) / 1000;
                if (brightness < 128) {
                    element.style.textShadow = '0 1px 3px rgba(255, 255, 255, 0.3)';
                }
            }
        }
    });
}

// Parallax Effect for Sections
function initParallax() {
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const speed = 0.05;
            const offsetY = scrollY * speed;
            section.style.backgroundPositionY = `${offsetY}px`;
        });
    });
}

// Micro-interactions for Buttons and Links
function initMicroInteractions() {
    const buttons = document.querySelectorAll('button, .btn, .primary-btn, .secondary-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
}

// Smooth Page Enter Animation
function animatePageEnter() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// Cursor Follow Effect (Optional Modern Touch)
function initCursorFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follow';
    cursor.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transition: transform 0.3s ease-out;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    });
}

// Initialize All Effects
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect with enhanced animation
    const mainHeading = document.querySelector('.profile-info h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                mainHeading.style.textShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
                i++;
                setTimeout(typeWriter, 80);
            } else {
                mainHeading.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            }
        };
        
        setTimeout(typeWriter, 1600);
    }
    
    // Initialize Three.js after a delay
    setTimeout(initThreeJS, 200);
    
    // Apply glass effects
    setTimeout(applyGlassEffects, 300);
    
    // Enhance text clarity
    setTimeout(enhanceTextClarity, 400);
    
    // Initialize parallax
    initParallax();
    
    // Initialize micro-interactions
    initMicroInteractions();
    
    // Animate page enter
    animatePageEnter();
    
    // Initialize cursor follow
    setTimeout(initCursorFollow, 500);
    
    // Add loading complete animation
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.addEventListener('transitionend', function() {
            document.querySelectorAll('.glass-effect, section').forEach((el, i) => {
                el.style.animationDelay = `${i * 0.1}s`;
            });
        });
    }
});

// Add CSS for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cursor-follow {
        position: fixed;
        pointer-events: none;
        z-index: -1;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #6366f1, #8b5cf6);
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #4f46e5, #7c3aed);
    }
    
    * {
        scrollbar-width: thin;
        scrollbar-color: #6366f1 rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(styleSheet);