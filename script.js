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
    
    // Enhanced particle system
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const originalPositions = new Float32Array(particlesCount * 3);
    
    // Color palette - gradient from indigo to purple to pink
    const colorPalette = [
        new THREE.Color(0x6366f1), // Indigo
        new THREE.Color(0x8b5cf6), // Violet
        new THREE.Color(0xa855f7), // Purple
        new THREE.Color(0xd946ef), // Fuchsia
        new THREE.Color(0x06b6d4)  // Cyan
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Spread particles in a sphere-like distribution
        const radius = Math.random() * 15 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        originalPositions[i3] = positions[i3];
        originalPositions[i3 + 1] = positions[i3 + 1];
        originalPositions[i3 + 2] = positions[i3 + 2];
        
        // Assign colors from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Varying particle sizes
        sizes[i] = Math.random() * 0.05 + 0.02;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for better performance and visuals
    const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Add floating lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(3000 * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    let mouseX = 0;
    let mouseY = 0;
    
    // Touch support
    let touchX = 0;
    let touchY = 0;
    let isTouching = false;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    document.addEventListener('touchstart', (event) => {
        isTouching = true;
        touchX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        touchY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    });
    
    document.addEventListener('touchmove', (event) => {
        if (isTouching) {
            touchX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            touchY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    });
    
    document.addEventListener('touchend', () => {
        isTouching = false;
    });
    
    // Camera sway
    let time = 0;
    
    // Animation loop with optimizations
    let lastTime = 0;
    const deltaLimit = 0.05;
    
    function animate(currentTime) {
        requestAnimationFrame(animate);
        
        const deltaTime = Math.min((currentTime - lastTime) / 1000, deltaLimit);
        lastTime = currentTime;
        time += deltaTime;
        
        // Smooth rotation based on mouse position
        targetRotation.x = mouseY * 0.3;
        targetRotation.y = mouseX * 0.3;
        
        // Lerp for smooth transitions
        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
        
        particles.rotation.x = currentRotation.x + time * 0.1;
        particles.rotation.y = currentRotation.y + time * 0.15;
        
        lines.rotation.x = currentRotation.x + time * 0.1;
        lines.rotation.y = currentRotation.y + time * 0.15;
        
        // Subtle camera movement
        camera.position.x = Math.sin(time * 0.5) * 0.3;
        camera.position.y = Math.cos(time * 0.3) * 0.2;
        camera.lookAt(scene.position);
        
        // Dynamic particle movement
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            
            // Gentle wave motion
            positions[i3] += Math.sin(time + i * 0.01) * 0.002;
            positions[i3 + 1] += Math.cos(time + i * 0.01) * 0.002;
            positions[i3 + 2] += Math.sin(time * 0.5 + i * 0.02) * 0.002;
            
            // Interactive particle movement toward mouse
            const influence = 0.3;
            const targetX = mouseX * 2;
            const targetY = mouseY * 2;
            
            positions[i3] += (targetX - positions[i3] * 0.1) * influence * 0.001;
            positions[i3 + 1] += (targetY - positions[i3 + 1] * 0.1) * influence * 0.001;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Update connection lines (optimized - only update some lines)
        let lineIndex = 0;
        const positionsArray = particles.geometry.attributes.position.array;
        const maxLineConnections = 1000;
        let connectionCount = 0;
        
        for (let i = 0; i < particlesCount && connectionCount < maxLineConnections; i++) {
            for (let j = i + 1; j < particlesCount && connectionCount < maxLineConnections; j++) {
                const i3 = i * 3;
                const j3 = j * 3;
                
                const dx = positionsArray[i3] - positionsArray[j3];
                const dy = positionsArray[i3 + 1] - positionsArray[j3 + 1];
                const dz = positionsArray[i3 + 2] - positionsArray[j3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < 2.5) {
                    linePositions[lineIndex] = positionsArray[i3];
                    linePositions[lineIndex + 1] = positionsArray[i3 + 1];
                    linePositions[lineIndex + 2] = positionsArray[i3 + 2];
                    linePositions[lineIndex + 3] = positionsArray[j3];
                    linePositions[lineIndex + 4] = positionsArray[j3 + 1];
                    linePositions[lineIndex + 5] = positionsArray[j3 + 2];
                    lineIndex += 6;
                    connectionCount++;
                }
            }
        }
        
        lines.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    // Handle resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }, 100);
    });
    
    animate(0);
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