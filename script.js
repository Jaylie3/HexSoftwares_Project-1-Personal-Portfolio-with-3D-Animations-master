// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = loadingScreen.querySelector('.progress-bar') || document.createElement('div');
    
    if (!loadingScreen.querySelector('.progress-bar')) {
        progressBar.className = 'progress-bar';
        loadingScreen.appendChild(progressBar);
    }
    
    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 100);
});

// Fixed Navigation with Animation
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
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.style.transform = 'translateY(0)';
                });
                const activeItem = document.querySelector(`[href="#${sectionId}"]`);
                if (activeItem) {
                    activeItem.classList.add('active');
                    activeItem.style.transform = 'translateY(-3px)';
                }
            }
        });
    }
    
    // Animate nav items on load
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 2800 + (index * 100));
    });
});

// Enhanced Smooth Scrolling with Active State Animation
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hover animations
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-2px)';
            this.style.textShadow = '0 4px 8px rgba(99, 102, 241, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
            this.style.textShadow = 'none';
        });
    });
});

// Enhanced Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = getAnimationTransform(entry.target);
            }
        });
    }, observerOptions);
    
    function getAnimationTransform(element) {
        if (element.classList.contains('slide-left')) {
            return 'translateX(0)';
        } else if (element.classList.contains('slide-right')) {
            return 'translateX(0)';
        } else if (element.classList.contains('scale-in')) {
            return 'scale(1)';
        } else if (element.classList.contains('rotate-in')) {
            return 'rotate(0deg)';
        }
        return 'translateY(0)';
    }
    
    // Animate cards with different effects
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .edu-content');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        
        // Add random animation direction
        const animations = ['translateY(30px)', 'translateY(-30px)', 'translateX(30px)', 'translateX(-30px)', 'scale(0.9)'];
        card.style.transform = animations[index % animations.length];
        
        observer.observe(card);
    });
    
    // Animate sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const title = section.querySelector('h2, h3, h1');
        const subtitle = section.querySelector('.subtitle, p:first-of-type');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(40px)';
            title.style.transition = 'all 0.8s ease 0.2s';
            observer.observe(title);
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(30px)';
            subtitle.style.transition = 'all 0.8s ease 0.4s';
            observer.observe(subtitle);
        }
    });
    
    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                document.querySelectorAll('.parallax').forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
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
    
    // Enhanced Particles with connections
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = [];
    const originalPositions = [];
    
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        originalPositions.push({
            x: positions[i * 3],
            y: positions[i * 3 + 1],
            z: positions[i * 3 + 2]
        });
        
        velocities.push({
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.002,
            z: (Math.random() - 0.5) * 0.002
        });
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x6366f1,
        size: 0.03,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Add lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Enhanced Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.001;
        
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;
        
        particles.rotation.x += 0.0003 + targetY * 0.001;
        particles.rotation.y += 0.0005 + targetX * 0.001;
        
        // Animate individual particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;
            
            // Boundary check and return
            const original = originalPositions[i];
            const distance = Math.sqrt(
                Math.pow(positions[i * 3] - original.x, 2) +
                Math.pow(positions[i * 3 + 1] - original.y, 2) +
                Math.pow(positions[i * 3 + 2] - original.z, 2)
            );
            
            if (distance > 3) {
                velocities[i].x *= -1;
                velocities[i].y *= -1;
                velocities[i].z *= -1;
            }
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Update lines (simplified for performance)
        const linePositions = [];
        for (let i = 0; i < particlesCount; i++) {
            for (let j = i + 1; j < particlesCount && j < i + 10; j++) {
                const distance = Math.sqrt(
                    Math.pow(positions[i * 3] - positions[j * 3], 2) +
                    Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
                    Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
                );
                
                if (distance < 2) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }
        
        lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        
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
    
    // Add entrance animation
    particles.scale.set(0, 0, 0);
    let scale = 0;
    function entranceAnimation() {
        scale += (1 - scale) * 0.02;
        particles.scale.set(scale, scale, scale);
        lines.scale.set(scale, scale, scale);
        
        if (scale < 0.999) {
            requestAnimationFrame(entranceAnimation);
        }
    }
    
    animate();
    entranceAnimation();
}

// Enhanced Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced typing effect with cursor
    const mainHeading = document.querySelector('.profile-info h1');
    const subHeading = document.querySelector('.profile-info h2, .profile-info .subtitle');
    
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        mainHeading.style.borderRight = '3px solid #6366f1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                mainHeading.style.borderRight = 'none';
                
                // Type subheading after main heading
                if (subHeading) {
                    typeSubHeading();
                }
            }
        };
        
        const typeSubHeading = () => {
            const subText = subHeading.textContent;
            subHeading.textContent = '';
            subHeading.style.borderRight = '3px solid #6366f1';
            
            let j = 0;
            const typeSub = () => {
                if (j < subText.length) {
                    subHeading.textContent += subText.charAt(j);
                    j++;
                    setTimeout(typeSub, 60);
                } else {
                    subHeading.style.borderRight = 'none';
                }
            };
            
            setTimeout(typeSub, 300);
        };
        
        setTimeout(typeWriter, 2600);
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Animate social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        setTimeout(() => {
            icon.style.transition = 'all 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 3200 + (index * 100));
        
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';
            this.style.color = '#6366f1';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            this.style.color = '';
        });
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar, .progress-bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width || entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Initialize Three.js with delay
    setTimeout(initThreeJS, 100);
});