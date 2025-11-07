// Smooth scrolling for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(10, 25, 47, 0.98) 0%, rgba(26, 54, 93, 0.98) 100%)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(26, 54, 93, 0.95) 100%)';
        navbar.style.boxShadow = 'none';
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Observe features
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.animationPlayState = 'paused';
        observer.observe(feature);
    });
}

// Form submission handling
function handleFormSubmission() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Button click handlers
function handleButtonClicks() {
    const getStartedBtn = document.querySelector('.btn-primary');
    const learnMoreBtn = document.querySelector('.btn-secondary');

    getStartedBtn.addEventListener('click', function() {
        smoothScroll('#services');
    });

    learnMoreBtn.addEventListener('click', function() {
        smoothScroll('#about');
    });
}

// Navigation link clicks
function handleNavClicks() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
}

// Mouse movement effect on floating shapes
function handleMouseMovement() {
    document.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.005;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Canvas animation for hero background
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 30 + 180}, 70%, 60%)`
            });
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
        });

        ctx.globalAlpha = 1;
    }

    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    return () => cancelAnimationFrame(animationId);
}

// Interactive SVG animations
function initInteractiveSVG() {
    const svg = document.getElementById('interactive-svg');
    const washingMachine = document.getElementById('washing-machine');
    const eyes = document.querySelectorAll('.eye');
    const sparkles = document.getElementById('sparkles');

    let mouseX = 0;
    let mouseY = 0;

    svg.addEventListener('mousemove', (e) => {
        const rect = svg.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Make eyes follow mouse
        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2 - rect.left;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2 - rect.top;

            const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
            const distance = Math.min(3, Math.sqrt((mouseX - eyeCenterX) ** 2 + (mouseY - eyeCenterY) ** 2) / 20);

            eye.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        });
    });

    // Animate washing machine
    let rotation = 0;
    function animateWashingMachine() {
        rotation += 0.5;
        washingMachine.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(animateWashingMachine);
    }
    animateWashingMachine();

    // Sparkle animation
    function animateSparkles() {
        const sparkleElements = sparkles.querySelectorAll('circle');
        sparkleElements.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.style.animation = 'sparkle 2s ease-in-out infinite';
            }, index * 500);
        });
    }
    animateSparkles();
}

// Theme toggle functionality
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    let isDark = false;

    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.classList.toggle('dark-theme');
        themeBtn.textContent = isDark ? '☀️' : '🌙';

        // Animate theme change
        themeBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeBtn.style.transform = 'scale(1)';
        }, 150);
    });
}

// Magic button effect
function initMagicButton() {
    const magicBtn = document.getElementById('magic-btn');
    const heroTitle = document.getElementById('hero-title');

    magicBtn.addEventListener('click', () => {
        // Create confetti effect
        createConfetti();

        // Animate title
        heroTitle.style.animation = 'none';
        setTimeout(() => {
            heroTitle.style.animation = 'bounce 1s ease';
        }, 10);

        // Scroll to services
        setTimeout(() => {
            smoothScroll('#services');
        }, 1000);
    });
}

function createConfetti() {
    const colors = ['#64ffda', '#0a192f', '#1a365d', '#2d5a7d', '#4a90e2'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confetti ${Math.random() * 3 + 2}s ease-in-out forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    handleButtonClicks();
    handleNavClicks();
    handleFormSubmission();
    animateOnScroll();
    handleMouseMovement();

    // Add scroll event for navbar
    window.addEventListener('scroll', handleNavbarScroll);

    // Add loading animation to body
    document.body.classList.add('loaded');

    // Initialize new features
    initHeroCanvas();
    initInteractiveSVG();
    initThemeToggle();
    initMagicButton();
    initMobileMenu();
});

// Add CSS for loaded state
const loadedStyles = `
body.loaded {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

body {
    opacity: 0;
    transform: translateY(20px);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadedStyles;
document.head.appendChild(styleSheet);
