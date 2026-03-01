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

// Animations - Enhanced
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
    
    // Animate cards with enhanced easing
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Card 3D Tilt Effect on Hover
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.transition = 'transform 0.15s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease-out';
        });
    });
});

// Scroll Progress Bar
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 10001;
        transition: width 0.1s ease-out;
        width: 0%;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Three.js Background - Enhanced with Interaction
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
    
    // Create particle group
    const particlesGroup = new THREE.Group();
    
    // Layer 1 - Main particles with gradient colors
    const geometry1 = new THREE.BufferGeometry();
    const particlesCount1 = 600;
    const positions1 = new Float32Array(particlesCount1 * 3);
    const colors1 = new Float32Array(particlesCount1 * 3);
    const originalY = new Float32Array(particlesCount1);
    
    for (let i = 0; i < particlesCount1; i++) {
        const i3 = i * 3;
        positions1[i3] = (Math.random() - 0.5) * 20;
        positions1[i3 + 1] = (Math.random() - 0.5) * 20;
        positions1[i3 + 2] = (Math.random() - 0.5) * 20;
        originalY[i] = positions1[i3 + 1];
        
        // Purple to blue gradient
        const t = Math.random();
        colors1[i3] = 0.39 + t * 0.15;
        colors1[i3 + 1] = 0.4 + t * 0.1;
        colors1[i3 + 2] = 0.85 + t * 0.15;
    }
    
    geometry1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));
    geometry1.setAttribute('color', new THREE.BufferAttribute(colors1, 3));
    
    const material1 = new THREE.PointsMaterial({
        size: 0.04,
        transparent: true,
        opacity: 0.9,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const particles1 = new THREE.Points(geometry1, material1);
    particlesGroup.add(particles1);
    
    // Layer 2 - Smaller background particles
    const geometry2 = new THREE.BufferGeometry();
    const particlesCount2 = 1200;
    const positions2 = new Float32Array(particlesCount2 * 3);
    
    for (let i = 0; i < particlesCount2 * 3; i++) {
        positions2[i] = (Math.random() - 0.5) * 30;
    }
    
    geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
    
    const material2 = new THREE.PointsMaterial({
        color: 0x8b5cf6,
        size: 0.015,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particles2 = new THREE.Points(geometry2, material2);
    particlesGroup.add(particles2);
    
    // Floating geometric shapes
    const shapesGroup = new THREE.Group();
    const geometries = [
        new THREE.IcosahedronGeometry(0.4, 0),
        new THREE.OctahedronGeometry(0.35, 0),
        new THREE.TetrahedronGeometry(0.4, 0),
        new THREE.TorusGeometry(0.3, 0.1, 8, 16),
        new THREE.IcosahedronGeometry(0.25, 0)
    ];
    
    const shapeColors = [0x6366f1, 0x8b5cf6, 0xa855f7, 0x7877d9, 0x9d7bfa];
    
    for (let i = 0; i < 6; i++) {
        const material = new THREE.MeshBasicMaterial({
            color: shapeColors[i % shapeColors.length],
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const mesh = new THREE.Mesh(geometries[i % geometries.length], material);
        mesh.position.x = (Math.random() - 0.5) * 12;
        mesh.position.y = (Math.random() - 0.5) * 12;
        mesh.position.z = (Math.random() - 0.5) * 8;
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.015,
                y: (Math.random() - 0.5) * 0.015,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.002 + 0.001,
            floatOffset: Math.random() * Math.PI * 2
        };
        shapesGroup.add(mesh);
    }
    
    scene.add(particlesGroup);
    scene.add(shapesGroup);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Click ripple effect
    const clickEffects = [];
    
    document.addEventListener('click', (e) => {
        clickEffects.push({
            position: new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ),
            radius: 0,
            opacity: 1
        });
    });
    
    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Smooth mouse following
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Apply mouse rotation to particles
        particlesGroup.rotation.x = targetY * 0.4;
        particlesGroup.rotation.y = targetX * 0.4;
        
        // Continuous base rotation
        particles1.rotation.x += 0.0003;
        particles1.rotation.y += 0.0005;
        particles2.rotation.x -= 0.0002;
        particles2.rotation.y -= 0.0004;
        
        // Wave effect on layer 1 particles
        const positions = particles1.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount1; i++) {
            const i3 = i * 3;
            const wave = Math.sin(time + positions[i3] * 0.3 + positions[i3 + 2] * 0.2) * 0.003;
            positions[i3 + 1] = originalY[i] + wave;
        }
        particles1.geometry.attributes.position.needsUpdate = true;
        
        // Animate floating shapes
        shapesGroup.children.forEach((mesh, i) => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            mesh.position.y += Math.sin(time * mesh.userData.floatSpeed * 100 + mesh.userData.floatOffset) * mesh.userData.floatSpeed;
        });
        
        // Apply click ripple effects to particles
        const positionsArray = particles1.geometry.attributes.position.array;
        clickEffects.forEach((effect, effectIndex) => {
            effect.radius += 0.15;
            effect.opacity -= 0.02;
            
            if (effect.opacity > 0) {
                for (let i = 0; i < particlesCount1; i++) {
                    const i3 = i * 3;
                    const px = positionsArray[i3];
                    const py = positionsArray[i3 + 1];
                    const pz = positionsArray[i3 + 2];
                    
                    const distance = Math.sqrt(
                        Math.pow(px - effect.position.x * 5, 2) +
                        Math.pow(py - effect.position.y * 5, 2)
                    );
                    
                    const rippleWidth = 1.0;
                    if (Math.abs(distance - effect.radius) < rippleWidth) {
                        const pushFactor = Math.cos((distance - effect.radius) / rippleWidth * Math.PI / 2) * 0.1 * effect.opacity;
                        positionsArray[i3] += (px - effect.position.x * 5) * pushFactor;
                        positionsArray[i3 + 1] += (py - effect.position.y * 5) * pushFactor;
                    }
                }
            }
        });
        
        // Remove finished click effects
        clickEffects.splice(0, clickEffects.length, ...clickEffects.filter(e => e.opacity > 0));
        
        particles1.geometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

// Cursor Trail Effect
function initCursorTrail() {
    const trailLength = 15;
    const trailElements = [];
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${12 - i * 0.6}px;
            height: ${12 - i * 0.6}px;
            background: radial-gradient(circle, rgba(99, 102, 241, ${0.9 - i * 0.05}) 0%, rgba(139, 92, 246, ${0.6 - i * 0.04}) 50%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(dot);
        trailElements.push(dot);
    }
    
    let cursorPositions = new Array(trailLength).fill({ x: 0, y: 0 });
    
    document.addEventListener('mousemove', (e) => {
        cursorPositions.shift();
        cursorPositions.push({ x: e.clientX, y: e.clientY });
    });
    
    function animateTrail() {
        trailElements.forEach((dot, i) => {
            const target = cursorPositions[i];
            if (target) {
                dot.style.left = target.x + 'px';
                dot.style.top = target.y + 'px';
            }
        });
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Hide cursor trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trailElements.forEach(dot => dot.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
        trailElements.forEach(dot => dot.style.opacity = '1');
    });
}

// Magnetic Button Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn, a.btn-primary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            btn.style.transition = 'transform 0.2s ease-out';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease-out';
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced typing effect with cursor animation
    const mainHeading = document.querySelector('.profile-info h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '3px solid #6366f1';
        mainHeading.style.animation = 'blink 0.7s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 70);
            } else {
                setTimeout(() => {
                    mainHeading.style.borderRight = 'none';
                    mainHeading.style.animation = 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 2500);
    }
    
    // Initialize enhanced Three.js
    setTimeout(initThreeJS, 100);
    
    // Initialize cursor trail with delay
    setTimeout(initCursorTrail, 800);
});