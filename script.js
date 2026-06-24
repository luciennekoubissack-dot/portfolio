/* ── Utilities ── */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Loader ── */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

/* ── Cursor custom ── */
function initCursor() {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    // Désactivé sur appareils tactiles
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
        dot.style.display  = 'none';
        ring.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let moved = false;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
        if (!moved) {
            moved = true;
            dot.classList.add('visible');
            ring.classList.add('visible');
        }
    });

    (function animateRing() {
        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
    })();

    const hoverTargets = 'a, button, .project-card, .filter-btn, .skill-bar-item, .stat-item, .char-item, input, textarea, select';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    document.addEventListener('mouseleave', () => {
        dot.classList.remove('visible');
        ring.classList.remove('visible');
    });
    document.addEventListener('mouseenter', () => {
        if (moved) {
            dot.classList.add('visible');
            ring.classList.add('visible');
        }
    });
}

/* ── Typed text ── */
(function initTyped() {
    const el = document.getElementById('typed-role');
    if (!el) return;
    const phrases = ['Développeuse Frontend', 'Designer UI/UX', 'Ingénieure en cours', 'Créatrice de solutions'];
    let pIdx = 0, cIdx = 0, deleting = false;

    function tick() {
        const phrase = phrases[pIdx];
        el.textContent = deleting ? phrase.slice(0, cIdx--) : phrase.slice(0, cIdx++);

        let delay = deleting ? 50 : 80;
        if (!deleting && cIdx > phrase.length) { delay = 1800; deleting = true; }
        else if (deleting && cIdx < 0)         { deleting = false; pIdx = (pIdx + 1) % phrases.length; cIdx = 0; delay = 400; }
        setTimeout(tick, delay);
    }
    tick();
})();

/* ── Stats counter ── */
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1400;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
    }, 16);
}

/* ── Skill bars ── */
function animateSkillBars(section) {
    section.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
    });
}

/* ── IntersectionObserver — reveal + triggers ── */
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // Reveal
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';

        // Stats
        if (el.classList.contains('stat-number')) animateCounter(el);

        // Skill bars
        if (el.classList.contains('skill-category')) animateSkillBars(el);

        io.unobserve(el);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', () => {

    /* Curseur */
    initCursor();

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* Hamburger */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            hamburger.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
            });
        });
    }

    /* ── Portfolio filter ── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const cats = card.dataset.category || '';
                const show = filter === 'all' || cats.includes(filter);
                card.classList.toggle('hidden', !show);
            });
        });
    });

    /* ── Scroll reveal + observe ── */
    document.querySelectorAll('.card-3d, .stat-number, .skill-category, .stat-item, .skill-bar-item, .timeline-item, .experience-card, .objective-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        io.observe(el);
    });

    /* ── 3D tilt on cards ── */
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r   = card.getBoundingClientRect();
            const rx  = ((e.clientY - r.top)  / r.height - 0.5) * -10;
            const ry  = ((e.clientX - r.left) / r.width  - 0.5) *  10;
            card.style.transform    = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
            card.style.transition   = 'none';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.8,0.25,1), opacity 0.6s ease';
        });
    });

    /* ── ScrollSpy ── */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.pageYOffset >= s.offsetTop - 200) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    });

    /* ── Dark mode ── */
    const themeBtn = document.getElementById('theme-toggle');
    const icon     = themeBtn?.querySelector('i');
    if (themeBtn && icon) {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
        themeBtn.addEventListener('click', () => {
            const dark = document.documentElement.getAttribute('data-theme') === 'dark';
            dark
                ? document.documentElement.removeAttribute('data-theme')
                : document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', dark ? 'light' : 'dark');
            icon.classList.toggle('fa-moon', dark);
            icon.classList.toggle('fa-sun',  !dark);
        });
    }

    /* ── Contact form ── */
    const form       = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            btn.disabled  = true;
            try {
                const res = await fetch(form.action, {
                    method: 'POST', body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    showStatus('Message envoyé avec succès !', 'success');
                    form.reset();
                } else throw new Error();
            } catch { showStatus('Erreur lors de l\'envoi. Contactez-moi directement par email.', 'error'); }
            finally { btn.innerHTML = orig; btn.disabled = false; }
        });
    }

    function showStatus(msg, type) {
        if (!formStatus) return;
        formStatus.textContent = msg;
        formStatus.className   = `form-status ${type}`;
        formStatus.style.display = 'block';
        setTimeout(() => formStatus.style.display = 'none', 5000);
    }

    /* ── Timeline toggle ── */
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('expanded'));
    });

    /* ── Particles ── */
    initParticles();
});

/* ── Particles ── */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const mouse = { x: null, y: null, radius: 130 };

    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout',  () => { mouse.x = null; mouse.y = null; });
    window.addEventListener('scroll',    () => { mouse.x = null; mouse.y = null; });
    window.addEventListener('resize', resize);

    class P {
        constructor(x, y, sz, color) {
            this.x = this.bx = x; this.y = this.by = y;
            this.sz = sz; this.color = color;
            this.density = Math.random() * 25 + 1;
            this.a = Math.random() * Math.PI * 2;
            this.sp = (Math.random() * 0.015) - 0.0075;
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI*2);
            ctx.fillStyle = this.color; ctx.fill();
        }
        update() {
            this.a += this.sp;
            const bx = this.bx + Math.cos(this.a) * 12;
            const by = this.by + Math.sin(this.a) * 12;
            const dx = mouse.x != null ? mouse.x - this.x : 0;
            const dy = mouse.y != null ? mouse.y - this.y : 0;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1;
            const force = Math.max(0, (mouse.radius - dist) / mouse.radius);
            if (dist < mouse.radius) {
                this.x -= (dx/dist) * force * this.density;
                this.y -= (dy/dist) * force * this.density;
            } else {
                this.x += (bx - this.x) / 10;
                this.y += (by - this.y) / 10;
            }
            this.draw();
        }
    }

    function resize() {
        w = canvas.width  = window.innerWidth;
        h = canvas.height = window.innerHeight;
        particles = [];
        const colors = ['#5C9E66','#A5D2A8','#3d7a47','#74b87d','#c5e8c7'];
        for (let i = 0; i < 260; i++) {
            const r = Math.random() * 320 + 80;
            const a = Math.random() * Math.PI * 2;
            particles.push(new P(
                w/2 + Math.cos(a)*r*1.4,
                h/2 + Math.sin(a)*r*0.75,
                Math.random()*2.5+0.5,
                colors[Math.floor(Math.random()*colors.length)]
            ));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = dark ? 'rgba(13,13,13,0.2)' : 'rgba(244,246,244,0.2)';
        ctx.fillRect(0, 0, w, h);
        particles.forEach((p, i) => {
            p.update();
            for (let j = i+1; j < particles.length; j++) {
                const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < 75) {
                    ctx.beginPath();
                    ctx.strokeStyle = dark
                        ? `rgba(109,190,120,${0.12 - d/750})`
                        : `rgba(92,158,102,${0.12 - d/750})`;
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });
    }

    resize(); animate();
}
