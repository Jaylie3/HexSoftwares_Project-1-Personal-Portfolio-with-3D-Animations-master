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
});