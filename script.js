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
                entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(card);
    });
});

// 3D Tilt Effect for Project Cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.transition = 'none';
            
            // Add shine effect
            let shine = card.querySelector('.shine');
            if (!shine) {
                shine = document.createElement('div');
                shine.className = 'shine';
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.width = '100%';
                shine.style.height = '100%';
                shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)';
                shine.style.pointerEvents = 'none';
                shine.style.opacity = '0';
                shine.style.transition = 'opacity 0.3s';
                card.appendChild(shine);
            }
            shine.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const shine = card.querySelector('.shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });
    });
    
    // Add floating animation to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
});

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

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
    
    // Particles
    const particlesCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    
    const colorPalette = [
        new THREE.Color(0x6366f1),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0xec4899),
        new THREE.Color(0x06b6d4)
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;
        
        velocities[i3] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Lines connecting nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotation.x = mouse.y * 0.0005;
        targetRotation.y = mouse.x * 0.0005;
    });
    
    // Clock for animation timing
    const clock = new THREE.Clock();
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime();
        
        // Rotate particles based on mouse position
        particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.05;
        
        // Continuous slow rotation
        particles.rotation.y += 0.0003;
        
        // Update particle positions with wave effect
        const posArray = particles.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            
            // Add wave motion based on time
            posArray[i3 + 1] += Math.sin(time + posArray[i3]) * 0.001;
            
            // Keep particles within bounds
            if (posArray[i3] > 10 || posArray[i3] < -10) velocities[i3] *= -1;
            if (posArray[i3 + 1] > 10 || posArray[i3 + 1] < -10) velocities[i3 + 1] *= -1;
            if (posArray[i3 + 2] > 10 || posArray[i3 + 2] < -10) velocities[i3 + 2] *= -1;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Update connecting lines
        updateLines();
        
        renderer.render(scene, camera);
    }
    
    function updateLines() {
        const posArray = particles.geometry.attributes.position.array;
        const linePositions = [];
        
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            for (let j = i + 1; j < particlesCount; j++) {
                const j3 = j * 3;
                
                const dx = posArray[i3] - posArray[j3];
                const dy = posArray[i3 + 1] - posArray[j3 + 1];
                const dz = posArray[i3 + 2] - posArray[j3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < 1.5) {
                    linePositions.push(
                        posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
                        posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
                    );
                }
            }
        }
        
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }
    
    // Resize handler
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