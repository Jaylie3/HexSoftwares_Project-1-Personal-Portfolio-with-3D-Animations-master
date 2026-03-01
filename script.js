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

// Three.js Background - Enhanced
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
    
    // Enhanced Particles
    const particlesCount = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const colors = new Float32Array(particlesCount * 3);
    const randomFactors = new Float32Array(particlesCount);
    
    const color1 = new THREE.Color(0x6366f1);
    const color2 = new THREE.Color(0x8b5cf6);
    const color3 = new THREE.Color(0x06b6d4);
    
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Create a sphere-like distribution
        const radius = 8 * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Store original positions for animation
        originalPositions[i3] = positions[i3];
        originalPositions[i3 + 1] = positions[i3 + 1];
        originalPositions[i3 + 2] = positions[i3 + 2];
        
        // Vary particle sizes
        sizes[i] = Math.random() * 2 + 0.5;
        
        // Random factors for animation variation
        randomFactors[i] = Math.random() * Math.PI * 2;
        
        // Color gradient based on position
        const mixFactor = (positions[i3] + 8) / 16;
        const mixedColor = color1.clone().lerp(color2, mixFactor);
        if (Math.random() > 0.7) {
            mixedColor.lerp(color3, 0.5);
        }
        
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Custom shader material for better particles
    const material = new THREE.PointsMaterial({
        size: 0.05,
        transparent: true,
        opacity: 0.9,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX - windowHalfX) * 0.001;
        mouse.y = (event.clientY - windowHalfY) * 0.001;
    });
    
    // Animation variables
    let time = 0;
    const waveSpeed = 0.002;
    const waveAmplitude = 0.3;
    
    // Enhanced Animation
    function animate() {
        requestAnimationFrame(animate);
        time += waveSpeed;
        
        const positions = particles.geometry.attributes.position.array;
        
        // Wave motion for each particle
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            
            // Organic wave movement
            const waveX = Math.sin(time + originalPositions[i3 + 1] * 0.5 + randomFactors[i]) * waveAmplitude;
            const waveY = Math.cos(time + originalPositions[i3] * 0.5 + randomFactors[i]) * waveAmplitude;
            const waveZ = Math.sin(time + originalPositions[i3 + 2] * 0.3 + randomFactors[i]) * waveAmplitude * 0.5;
            
            positions[i3] = originalPositions[i3] + waveX;
            positions[i3 + 1] = originalPositions[i3 + 1] + waveY;
            positions[i3 + 2] = originalPositions[i3 + 2] + waveZ;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Smooth mouse follow rotation
        targetRotation.x = mouse.y * 0.5;
        targetRotation.y = mouse.x * 0.5;
        
        particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.05;
        
        // Gentle continuous rotation
        particles.rotation.z += 0.0003;
        
        // Pulse effect for size
        const pulse = 1 + Math.sin(time * 2) * 0.1;
        material.size = 0.05 * pulse;
        
        renderer.render(scene, camera);
    }
    
    // Resize with smooth transition
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 100);
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