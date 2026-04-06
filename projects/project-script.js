document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management
    const initTheme = () => {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    };

    const updateThemeIcon = (theme) => {
        const themeBtn = document.querySelector('.theme-toggle i');
        if (themeBtn) {
            themeBtn.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    initTheme();

    // 2. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-hidden, .reveal, .project-section, .project-card, .badge');
    revealElements.forEach((el, index) => {
        if (!el.classList.contains('reveal-hidden')) {
            el.classList.add('reveal-hidden');
        }
        el.style.transitionDelay = `${index * 0.1}s`;
        revealObserver.observe(el);
    });

    // 3. Parallax Effect on Hero Image
    window.addEventListener('scroll', () => {
        const heroImg = document.querySelector('.project-hero-img');
        if (heroImg) {
            const scroll = window.pageYOffset;
            heroImg.style.transform = `translateY(${scroll * 0.3}px)`;
        }
    });

    // 4. Smooth Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
