function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add smooth scrolling to all links - wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Main functionality
document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Fermer le menu au clic sur un lien
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    // Portfolio tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);

                // Replace with your actual form endpoint
                // For Formspree: https://formspree.io/f/YOUR_FORM_ID
                // For Netlify: just set action="/contact" and method="POST" with netlify attribute
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormStatus('Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                showFormStatus('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou me contacter directement par email.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';

            // Auto-hide after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    // Add smooth reveal animations on scroll
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

    // Observe all cards for animation
    document.querySelectorAll('.card-3d').forEach(card => {
        // Entrée fluide au scroll
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);

        // Effet 3D dynamique (Tilt) au survol
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8; // Rotation douce
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none'; // Pas de délai, suit la souris !
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s ease';
        });
    });

    // ScrollSpy functionality
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Dark Mode Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn ? themeBtn.querySelector('i') : null;

    if (themeBtn && icon) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    // Initialize Particles
    initParticles();
});

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('scroll', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    }

    class Particle {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.size = size;
            this.color = color;
            this.density = (Math.random() * 30) + 1;
            this.angle = Math.random() * 360;
            this.spinSpeed = (Math.random() * 0.02) - 0.01;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Animation circulaire flottante
            this.angle += this.spinSpeed;
            let currentBaseX = this.baseX + Math.cos(this.angle) * 15;
            let currentBaseY = this.baseY + Math.sin(this.angle) * 15;

            let dx = mouse.x ? mouse.x - this.x : 0;
            let dy = mouse.y ? mouse.y - this.y : 0;
            let distance = mouse.x && mouse.y ? Math.sqrt(dx * dx + dy * dy) : mouse.radius + 1;

            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            const maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 0;

            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== currentBaseX) {
                    let dx = this.x - currentBaseX;
                    this.x -= dx / 10;
                }
                if (this.y !== currentBaseY) {
                    let dy = this.y - currentBaseY;
                    this.y -= dy / 10;
                }
            }
            this.draw();
        }
    }

    function createParticles() {
        particles = [];
        const numParticles = 300;
        const centerX = width / 2;
        const centerY = height / 2;

        // Couleurs de la charte graphique
        const colors = ['#8CBB8F', '#A5D2A8', '#74a076', '#4a674b', '#bce1be'];

        for (let i = 0; i < numParticles; i++) {
            let radius = Math.random() * 350 + 100;
            let angle = Math.random() * Math.PI * 2;
            let x = centerX + Math.cos(angle) * radius * 1.5; // Dispersion plus large
            let y = centerY + Math.sin(angle) * radius * 0.8; // Dispersion plus aplatie
            let size = Math.random() * 3 + 1;
            let color = colors[Math.floor(Math.random() * colors.length)];

            particles.push(new Particle(x, y, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        // Effet de traînée (Trail effect)
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark ? 'rgba(18, 18, 18, 0.2)' : 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();

            // Lignes de connexion entre particules proches
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 80) {
                    ctx.beginPath();
                    ctx.strokeStyle = isDark ? `rgba(165, 210, 168, ${0.15 - dist / 800})` : `rgba(140, 187, 143, ${0.15 - dist / 800})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    resizeCanvas();
    animate();
}
