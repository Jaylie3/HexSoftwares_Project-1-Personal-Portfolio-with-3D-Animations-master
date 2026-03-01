// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Add pulsing animation to loading screen
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loader-ring"></div>
            <div class="loader-ring"></div>
            <div class="loader-ring"></div>
            <div class="loading-text">Loading Experience...</div>
        </div>
    `;
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Fixed Navigation with Gradient Effect
document.addEventListener('DOMContentLoaded', function() {
    const fixedNav = document.getElementById('fixedNav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.createElement('div');
    navIndicator.className = 'nav-indicator';
    fixedNav.appendChild(navIndicator);
    
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
                    // Move indicator to active item
                    const itemRect = activeItem.getBoundingClientRect();
                    const navRect = fixedNav.getBoundingClientRect();
                    navIndicator.style.width = `${itemRect.width}px`;
                    navIndicator.style.left = `${activeItem.offsetLeft}px`;
                }
            }
        });
    }
    
    // Initial position
    const firstActive = document.querySelector('.nav-item');
    if (firstActive) {
        navIndicator.style.width = `${firstActive.offsetWidth}px`;
        navIndicator.style.left = `${firstActive.offsetLeft}px`;
    }
});

// Smooth Scrolling with Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    let isScrolling = false;
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (isScrolling) return;
            isScrolling = true;
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add ripple effect indicator
                const ripple = document.createElement('div');
                ripple.className = 'scroll-indicator-hint';
                document.body.appendChild(ripple);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                setTimeout(() => {
                    ripple.remove();
                    isScrolling = false;
                }, 1000);
            }
        });
    });
});

// Enhanced Animations with Multiple Effects
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.dataset.transform || 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Animate various elements with staggered delays
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content, .about-text, .contact-item');
    animatedElements.forEach((el, index) => {
        const delay = (index % 5) * 0.1;
        const effects = [
            'translateY(30px)',
            'translateY(30px) scale(0.9)',
            'translateX(-30px)',
            'translateX(30px)',
            'rotateY(15deg)'
        ];
        
        el.style.opacity = '0';
        el.dataset.transform = effects[index % effects.length];
        el.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
        observer.observe(el);
    });
    
    // Add floating animation to cards periodically
    setInterval(() => {
        document.querySelectorAll('.skill-card, .project-card').forEach(card => {
            if (Math.random() > 0.7) {
                card.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
            }
        });
    }, 50);
});

// Custom Cursor Effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorFollower.className = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            el.style.transition = 'all 0.3s ease';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
});

// Enhanced Three.js Background with Mouse Interaction
function initThreeJS() {
    if (typeof THREE === 'undefined') return;
    
    const canvas = document.querySelector('canvas.webgl');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;
    
    // Mouse position for interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotation.x = mouse.x * 0.5;
        targetRotation.y = mouse.y * 0.5;
    });
    
    // Create multiple particle systems
    const particlesGroup = new THREE.Group();
    
    // Main particles with gradient colors
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const colorPalette = [
        new THREE.Color(0x6366f1),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0xec4899),
        new THREE.Color(0x06b6d4),
        new THREE.Color(0x10b981)
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 3 + 1;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Custom shader material for glowing particles
    const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            mousePos: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float time;
            uniform vec2 mousePos;
            
            void main() {
                vColor = color;
                vec3 pos = position;
                
                // Wave animation
                pos.x += sin(time * 0.5 + position.y * 0.5) * 0.2;
                pos.y += cos(time * 0.3 + position.x * 0.5) * 0.2;
                
                // Mouse influence
                float dist = distance(position.xy, mousePos * 5.0);
                pos.z += sin(dist * 2.0 - time * 2.0) * 0.3;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                
                float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
                vec3 glow = vColor * (1.0 + 0.5 * (1.0 - dist * 2.0));
                gl_FragColor = vec4(glow, alpha * 0.8);
            }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesGroup.add(particles);
    
    // Secondary particles - smaller, faster
    const secondaryParticlesCount = 800;
    const secondaryPositions = new Float32Array(secondaryParticlesCount * 3);
    const secondaryColors = new Float32Array(secondaryParticlesCount * 3);
    
    for (let i = 0; i < secondaryParticlesCount; i++) {
        secondaryPositions[i * 3] = (Math.random() - 0.5) * 20;
        secondaryPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        secondaryPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        secondaryColors[i * 3] = color.r;
        secondaryColors[i * 3 + 1] = color.g;
        secondaryColors[i * 3 + 2] = color.b;
    }
    
    const secondaryGeometry = new THREE.BufferGeometry();
    secondaryGeometry.setAttribute('position', new THREE.BufferAttribute(secondaryPositions, 3));
    secondaryGeometry.setAttribute('color', new THREE.BufferAttribute(secondaryColors, 3));
    
    const secondaryMaterial = new THREE.PointsMaterial({
        size: 0.03,
        transparent: true,
        opacity: 0.4,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    const secondaryParticles = new THREE.Points(secondaryGeometry, secondaryMaterial);
    particlesGroup.add(secondaryParticles);
    
    // Floating geometric shapes
    const shapesGroup = new THREE.Group();
    
    // Icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-3, 2, -2);
    shapesGroup.add(icosahedron);
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 8, 20);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, -1, -3);
    shapesGroup.add(torus);
    
    // Octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(0.4, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(2, 2, -2);
    shapesGroup.add(octahedron);
    
    scene.add(particlesGroup);
    scene.add(shapesGroup);
    
    // Animation
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        particlesMaterial.uniforms.time.value = elapsedTime;
        particlesMaterial.uniforms.mousePos.value.lerp(mouse, 0.05);
        
        // Rotate particles group with smooth easing
        particlesGroup.rotation.x += 0.0003 + (targetRotation.y - particlesGroup.rotation.x) * 0.02;
        particlesGroup.rotation.y += 0.0005 + (targetRotation.x - particlesGroup.rotation.y) * 0.02;
        
        // Rotate secondary particles in opposite direction
        secondaryParticles.rotation.x -= 0.0005;
        secondaryParticles.rotation.y -= 0.0003;
        
        // Animate shapes
        icosahedron.rotation.x += 0.005;
        icosahedron.rotation.y += 0.005;
        icosahedron.position.y += Math.sin(elapsedTime * 0.5) * 0.003;
        
        torus.rotation.x += 0.003;
        torus.rotation.y += 0.007;
        torus.position.y += Math.cos(elapsedTime * 0.7) * 0.003;
        
        octahedron.rotation.x += 0.004;
        octahedron.rotation.z += 0.004;
        octahedron.position.y += Math.sin(elapsedTime * 0.6) * 0.003;
        
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
    // Enhanced typing effect with cursor blink
    const mainHeading = document.querySelector('.profile-info h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.innerHTML = '<span class="typed-text"></span><span class="typing-cursor">|</span>';
        
        const typedSpan = mainHeading.querySelector('.typed-text');
        const cursorSpan = mainHeading.querySelector('.typing-cursor');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typedSpan.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80 + Math.random() * 50);
            } else {
                // Typing complete
                cursorSpan.classList.add('blink');
            }
        };
        
        setTimeout(typeWriter, 2200);
    }
    
    // Initialize Three.js
    setTimeout(initThreeJS, 100);
    
    // Add magnetic effect to buttons
    const magneticButtons = document.querySelectorAll('button, .nav-item');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
    
    // Add parallax effect to sections
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.section').forEach(section => {
            const speed = section.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            section.style.transform = `translateY(${yPos * 0.1}px)`;
        });
    });
});