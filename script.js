
// Initialize particles background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 10;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = Math.random() > 0.5 ? '#8b5cf6' : '#00f5ff';
        particle.style.animationDuration = duration + 's';

        particlesContainer.appendChild(particle);
    }
}

// Typing animation
function typeWriter() {
    const texts = ['accelerate growth', 'drive innovation', 'make smart decisions', 'scale efficiently'];
    let textIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typingText');

    function type() {
        if (charIndex < texts[textIndex].length) {
            typingElement.textContent = texts[textIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }

    type();
}

// Animated counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (target - start) * progress);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Interactive demo animations
function initDemo() {
    const revenueCounter = document.getElementById('revenueCounter');
    const metrics = [
        { element: document.getElementById('metric1'), values: ['+18%', '+24%', '+31%', '+24%'] },
        { element: document.getElementById('metric2'), values: ['0.8k', '1.2k', '1.7k', '1.2k'] },
        { element: document.getElementById('metric3'), values: ['89%', '94%', '97%', '94%'] }
    ];

    let revenueValue = 0;
    let targetRevenue = 124750;
    let metricsIndex = 0;

    // Animate revenue counter
    function updateRevenue() {
        revenueValue += (targetRevenue - revenueValue) * 0.05; // Smoother animation
        revenueCounter.textContent = '$' + Math.floor(revenueValue).toLocaleString();

        if (Math.abs(targetRevenue - revenueValue) > 1) {
            requestAnimationFrame(updateRevenue);
        }
    }

    // Update metrics periodically
    function updateMetrics() {
        metrics.forEach(metric => {
            metric.element.textContent = metric.values[metricsIndex % metric.values.length];
        });
        metricsIndex++;
    }

    updateRevenue();
    setInterval(updateMetrics, 3000);
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollIndicator = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
}

// Navbar background on scroll
function updateNavbar() {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

// Intersection Observer for animations
function setupAnimations() {
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

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    typeWriter();
    initDemo();
    setupAnimations();

    // Mobile menu toggle
    document.getElementById('mobileMenuBtn').addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('hidden');
    });

    // Pricing toggle
    const pricingToggle = document.getElementById('pricingToggle');
    pricingToggle.addEventListener('change', function () {
        const toggle = this.nextElementSibling.querySelector('div div');
        if (this.checked) {
            toggle.style.transform = 'translateX(24px)';
            toggle.parentElement.style.backgroundColor = '#8b5cf6';
            // Update prices for yearly
        } else {
            toggle.style.transform = 'translateX(0)';
            toggle.parentElement.style.backgroundColor = '#4b5563';
            // Update prices for monthly
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll event listeners
window.addEventListener('scroll', function () {
    updateScrollProgress();
    updateNavbar();
});

// Resize handler for particles
window.addEventListener('resize', function () {
    document.getElementById('particles').innerHTML = '';
    createParticles();
});

// Add some interactive hover effects
document.addEventListener('mousemove', function (e) {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});
