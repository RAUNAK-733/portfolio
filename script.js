/* ============================================
   RAUNAK SINGH PORTFOLIO — JavaScript (Enhanced)
   - Live Nepal Clock Widget
   - Project Category Filter System
   - Spec Modal Inspector
   - Toast Notifications
   - Interactive Glyph Frame Parallax
   ============================================ */

// ===== PROJECT SPECS DATA =====
const PROJECT_SPECS = {
    p1: {
        title: "Emergent Trading Language",
        tag: "AI / RL Research",
        desc: "A research-focused AI system studying whether reinforcement-learning agents can develop useful communication protocols in a multi-agent trading environment. Compares normal, zeroed, and randomized messages to evaluate true cooperative intent.",
        highlights: [
            "PyTorch Speaker & Actor neural network architectures with policy gradients",
            "Seeded experiments with checkpointing and statistical metric tracking",
            "Message ablation studies (comparing normal vs zeroed vs randomized signals)",
            "Comprehensive data visualization tools for evidence-based research conclusions"
        ],
        stack: ["Python", "PyTorch", "Reinforcement Learning", "Policy Gradients", "Scikit-learn", "Pandas", "Matplotlib"],
        github: "https://github.com/RAUNAK-733/emergent-trading-language"
    },
    p2: {
        title: "AccessGuard Pro",
        tag: "Backend Security & GRC",
        desc: "A full-stack security and Governance, Risk & Compliance (GRC) management platform for managing user authentication, role-based access control (RBAC), risk registers, compliance controls, audit logs, and secure REST APIs.",
        highlights: [
            "Role-Based Access Control (RBAC) matrix for fine-grained authorization",
            "JWT authentication with bcrypt password hashing and refresh tokens",
            "Security headers & middleware: Helmet, CORS, Morgan, Express-Validator, Rate-Limiting",
            "Comprehensive audit logging for tracking compliance and admin actions"
        ],
        stack: ["Node.js", "Express.js", "MySQL", "JWT", "bcrypt", "Helmet", "CORS", "Morgan"],
        github: "https://github.com/RAUNAK-733/accessguard-roko"
    },
    p3: {
        title: "ContextBridge",
        tag: "Full-Stack AI Productivity",
        desc: "A full-stack AI productivity application designed to transfer conversation context seamlessly between AI models. Reconstructs structured context capsules from imported chat logs.",
        highlights: [
            "Parses pasted AI conversations into structured message history capsules",
            "FastAPI Python backend with Next.js & TypeScript modern frontend",
            "SQLite database for local context capsule persistence",
            "Docker containerized setup for easy local deployment"
        ],
        stack: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "SQLite", "Docker", "REST APIs"],
        github: "https://github.com/RAUNAK-733/ContextBridge"
    },
    p4: {
        title: "ClaimGuard",
        tag: "Healthcare ML Pipeline",
        desc: "A healthcare claim validation prototype for openIMIS-style emergency claim workflows. Combines rule-based logic with a machine-learning pipeline trained on synthetic rule-labeled data.",
        highlights: [
            "Explainable claim-entry verification for emergency cases (drowning, snake bite, fall injury)",
            "Rule engine combined with Scikit-learn classification pipeline",
            "Pandas data transformation and Joblib model serialization",
            "Demonstrates fraud prevention and pre-reimbursement validation"
        ],
        stack: ["Python", "Scikit-learn", "Pandas", "Joblib", "Rule Engine", "Machine Learning"],
        github: "https://github.com/RAUNAK-733/Claimguard"
    },
    p5: {
        title: "Sajilo Tools",
        tag: "Nepali Web Utilities",
        desc: "A client-side Nepali utility suite designed for students and everyday users in Nepal. Includes a Nepali age calculator, +2 GPA calculator, and digital clock.",
        highlights: [
            "100% client-side calculation — zero user data sent to external servers",
            "Clean, responsive UI built with Tailwind CSS",
            "Hosted on Firebase Hosting with fast static delivery",
            "Designed specifically to address daily student utility needs in Nepal"
        ],
        stack: ["HTML5", "Tailwind CSS", "JavaScript", "Firebase Hosting"],
        github: "https://github.com/RAUNAK-733/SAJILO-TOOLS"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const animatedEls = document.querySelectorAll('[data-animate]');
    const sections = document.querySelectorAll('.section, .hero');

    // ===== LIVE NEPAL CLOCK (UTC +5:45) =====
    function updateNepalClock() {
        const timeEl = document.getElementById('nepalTime');
        if (!timeEl) return;

        const now = new Date();
        // Convert to Nepal Standard Time (UTC + 5:45)
        const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
        const nepalMs = utcMs + (5.75 * 3600000);
        const nepalDate = new Date(nepalMs);

        const hrs = String(nepalDate.getHours()).padStart(2, '0');
        const mins = String(nepalDate.getMinutes()).padStart(2, '0');
        const secs = String(nepalDate.getSeconds()).padStart(2, '0');

        timeEl.textContent = `${hrs}:${mins}:${secs}`;
    }
    setInterval(updateNepalClock, 1000);
    updateNepalClock();

    // ===== TOAST NOTIFICATION FUNCTION =====
    window.showToast = function(msg) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span class="toast-dot"></span><span>${msg}</span>`;

        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ===== MOBILE OVERLAY =====
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    // ===== DOT CANVAS BACKGROUND =====
    const canvas = document.getElementById('dotCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;

        function resizeCanvas() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight * 5;
            drawDots();
        }

        function drawDots() {
            ctx.clearRect(0, 0, w, h);
            const spacing = 40;
            const dotSize = 1;

            for (let x = spacing; x < w; x += spacing) {
                for (let y = spacing; y < h; y += spacing) {
                    const opacity = 0.08 + Math.random() * 0.06;
                    ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        resizeCanvas();
        window.addEventListener('resize', () => {
            clearTimeout(window._dotResize);
            window._dotResize = setTimeout(resizeCanvas, 200);
        });
    }

    // ===== NAVBAR SCROLL =====
    function handleScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ===== MOBILE MENU =====
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    navLinkItems.forEach(link => link.addEventListener('click', closeMenu));

    // ===== ACTIVE NAV LINK =====
    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===== SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay || 0, 10);
                setTimeout(() => el.classList.add('animated'), delay);
                observer.unobserve(el);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    animatedEls.forEach(el => observer.observe(el));

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ===== PROJECT CATEGORY FILTER TABS =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projectsContainer .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const cardCat = card.dataset.category;
                if (category === 'all' || cardCat === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });

            showToast(`Filtering: ${btn.textContent.trim()}`);
        });
    });

    // ===== PHOTO FRAME INTERACTIVE PARALLAX =====
    const photoWrapper = document.getElementById('photoWrapper');
    if (photoWrapper) {
        photoWrapper.addEventListener('mousemove', (e) => {
            const rect = photoWrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;

            photoWrapper.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });

        photoWrapper.addEventListener('mouseleave', () => {
            photoWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // ===== EMAIL COPY WITH TOAST =====
    const emailCard = document.getElementById('contact-email');
    if (emailCard && navigator.clipboard) {
        emailCard.addEventListener('click', async (e) => {
            try {
                await navigator.clipboard.writeText('singhraunak733@gmail.com');
                showToast('Email copied to clipboard!');
            } catch (err) { /* allow mailto */ }
        });
    }

    // ===== KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            closeProjectModal();
        }
    });

    // ===== REDUCED MOTION =====
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animatedEls.forEach(el => {
            el.classList.add('animated');
            el.style.transition = 'none';
        });
    }
});

// ===== MODAL FUNCTIONS =====
window.openProjectModal = function(key) {
    const data = PROJECT_SPECS[key];
    if (!data) return;

    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;

    const highlightsEl = document.getElementById('modalHighlights');
    highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

    const stackEl = document.getElementById('modalStack');
    stackEl.innerHTML = data.stack.map(s => `<span>${s}</span>`).join('');

    document.getElementById('modalGithubLink').href = data.github;

    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};
