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

// Enhanced Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Animate cards with staggered delay
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content, .timeline-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Animate tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s`;
        observer.observe(item);
    });
});

// Parallax Effect on Mouse Move
document.addEventListener('DOMContentLoaded', function() {
    const profileSection = document.querySelector('.profile-section');
    const floatingImage = document.querySelector('.floating');
    
    if (profileSection) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            profileSection.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        });
        
        document.addEventListener('mouseleave', () => {
            profileSection.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }
    
    if (floatingImage) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            floatingImage.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// Magnetic Button Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
});

// Tilt Effect on Cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Glow Follow Effect
document.addEventListener('DOMContentLoaded', function() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
});

// Text Reveal Animation
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('h3, h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.innerHTML = '';
                
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(20px)';
                    span.style.transition = `all 0.3s ease ${index * 0.03}s`;
                    span.style.display = 'inline-block';
                    entry.target.appendChild(span);
                    
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 50);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    headings.forEach(heading => observer.observe(heading));
});

// Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
});

// Enhanced Three.js Background
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
    
    // Enhanced Particles with multiple colors
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const colorPalette = [
        new THREE.Color(0x6366f1), // Indigo
        new THREE.Color(0xa855f7), // Purple
        new THREE.Color(0xec4899), // Pink
        new THREE.Color(0x3b82f6)  // Blue
    ];
    
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 0.03 + 0.01;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Add floating geometric shapes
    const shapesGroup = new THREE.Group();
    
    // Icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(-5, 2, -5);
    shapesGroup.add(icosahedron);
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(5, -2, -5);
    shapesGroup.add(torus);
    
    // Octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(0.6, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, 3, -8);
    shapesGroup.add(octahedron);
    
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
    
    // Animation
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Particle animation
        particles.rotation.x += 0.0003 + targetY * 0.001;
        particles.rotation.y += 0.0005 + targetX * 0.001;
        
        // Wave effect on particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.002;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Shape animations
        icosahedron.rotation.x += 0.005;
        icosahedron.rotation.y += 0.005;
        icosahedron.position.y = 2 + Math.sin(elapsedTime * 0.5) * 0.5;
        
        torus.rotation.x += 0.003;
        torus.rotation.y += 0.007;
        torus.position.y = -2 + Math.cos(elapsedTime * 0.5) * 0.5;
        
        octahedron.rotation.x += 0.004;
        octahedron.rotation.y += 0.006;
        octahedron.position.y = 3 + Math.sin(elapsedTime * 0.3) * 0.3;
        
        // Camera subtle movement
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        
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