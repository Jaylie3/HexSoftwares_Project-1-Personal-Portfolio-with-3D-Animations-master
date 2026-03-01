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

// Interactive Project Preview with Hover Animations
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const previewContainer = card.querySelector('.project-preview') || createPreviewContainer(card);
        const projectImage = card.querySelector('.project-image');
        const projectDetails = card.querySelector('.project-details');
        
        // Mouse enter - show preview
        card.addEventListener('mouseenter', function() {
            card.classList.add('hovered');
            
            // Add scale and shadow animation
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            
            // Reveal preview content
            if (previewContainer) {
                previewContainer.style.opacity = '1';
                previewContainer.style.transform = 'translateY(0)';
            }
            
            // Animate details slide up
            if (projectDetails) {
                projectDetails.style.transform = 'translateY(0)';
                projectDetails.style.opacity = '1';
            }
        });
        
        // Mouse leave - hide preview
        card.addEventListener('mouseleave', function() {
            card.classList.remove('hovered');
            
            // Reset scale and shadow
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            // Hide preview content
            if (previewContainer) {
                previewContainer.style.opacity = '0';
                previewContainer.style.transform = 'translateY(10px)';
            }
            
            // Hide details
            if (projectDetails) {
                projectDetails.style.transform = 'translateY(20px)';
                projectDetails.style.opacity = '0.7';
            }
        });
        
        // Click for expanded preview (optional)
        card.addEventListener('click', function() {
            card.classList.toggle('expanded');
            const expandedContent = card.querySelector('.expanded-preview');
            
            if (expandedContent) {
                if (card.classList.contains('expanded')) {
                    expandedContent.style.maxHeight = expandedContent.scrollHeight + 'px';
                    expandedContent.style.opacity = '1';
                    expandedContent.style.padding = '20px';
                } else {
                    expandedContent.style.maxHeight = '0';
                    expandedContent.style.opacity = '0';
                    expandedContent.style.padding = '0 20px';
                }
            }
        });
    });
    
    function createPreviewContainer(card) {
        const container = document.createElement('div');
        container.className = 'project-preview';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease;
            z-index: 10;
            padding: 20px;
            color: white;
        `;
        
        card.appendChild(container);
        return container;
    }
    
    // Add floating animation to project cards
    projectCards.forEach((card, index) => {
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        
        // Subtle floating animation
        setInterval(() => {
            if (!card.matches(':hover')) {
                const offset = Math.sin(Date.now() / 1000 + index) * 3;
                card.style.transform = `translateY(${offset}px)`;
            }
        }, 50);
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