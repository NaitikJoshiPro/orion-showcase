/**
 * ORION Showcase - Main JavaScript
 * Animations, counters, theme toggle, scroll effects
 */

(function () {
    'use strict';

    // =============================================================================
    // THEME TOGGLE
    // =============================================================================

    window.toggleTheme = function () {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('orion-theme', next);
    };

    function loadTheme() {
        const saved = localStorage.getItem('orion-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
    }

    // =============================================================================
    // COUNTER ANIMATION
    // =============================================================================

    function animateCounters() {
        const counters = document.querySelectorAll('.kpi-value[data-target]');

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const isMonetary = counter.textContent.includes('$');
            const duration = 2000;
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out quad)
                const eased = 1 - (1 - progress) * (1 - progress);
                const currentValue = target * eased;

                if (isMonetary) {
                    counter.textContent = '$' + formatNumber(Math.floor(currentValue));
                } else if (suffix === '%') {
                    counter.textContent = currentValue.toFixed(1) + '%';
                } else {
                    counter.textContent = formatNumber(Math.floor(currentValue));
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // =============================================================================
    // SCROLL ANIMATIONS
    // =============================================================================

    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Trigger counter animation when hero section is visible
                    if (entry.target.id === 'god-view') {
                        animateCounters();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Add animate-on-scroll class to elements
        document.querySelectorAll('.module-card, .kpi-card, .case-card, .rca-selector, .evidence-panel, .timeline-panel, .ai-stage, .config-panel, .permissions-panel, .guardrails-panel').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        });
    }

    function revealElements() {
        const elements = document.querySelectorAll('.module-card, .kpi-card, .case-card, .rca-selector, .evidence-panel, .timeline-panel, .ai-stage, .config-panel, .permissions-panel, .guardrails-panel');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(el => observer.observe(el));
    }

    // =============================================================================
    // SMOOTH SCROLL
    // =============================================================================

    function setupSmoothScroll() {
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
    }

    // =============================================================================
    // NAVBAR EFFECTS
    // =============================================================================

    function setupNavbar() {
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add scrolled class
            if (currentScroll > 50) {
                nav.style.borderBottomColor = 'var(--border-hover)';
            } else {
                nav.style.borderBottomColor = 'var(--border)';
            }

            lastScroll = currentScroll;
        });
    }

    // =============================================================================
    // ACTIVE NAV HIGHLIGHTING
    // =============================================================================

    function setupActiveNavHighlight() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--text-primary)';
                }
            });
        });
    }

    // =============================================================================
    // QUEUE BAR ANIMATIONS
    // =============================================================================

    function animateQueueBars() {
        const bars = document.querySelectorAll('.queue-fill');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';

                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
            });
        }, {
            threshold: 0.5
        });

        bars.forEach(bar => observer.observe(bar));
    }

    // =============================================================================
    // TYPEWRITER EFFECT FOR CODE BLOCKS
    // =============================================================================

    function setupTypewriterEffect() {
        const codeBlocks = document.querySelectorAll('.code-block');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    // The typing effect is subtle enough that we just reveal it
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.5
        });

        codeBlocks.forEach(block => {
            block.style.opacity = '0';
            block.style.transition = 'opacity 0.5s ease';
            observer.observe(block);
        });
    }

    // =============================================================================
    // WORD CLOUD HOVER EFFECTS
    // =============================================================================

    function setupWordCloud() {
        const words = document.querySelectorAll('.cloud-word');

        words.forEach(word => {
            word.addEventListener('mouseenter', () => {
                word.style.transform = 'scale(1.1)';
            });

            word.addEventListener('mouseleave', () => {
                word.style.transform = 'scale(1)';
            });
        });
    }

    // =============================================================================
    // KEYBOARD SHORTCUTS
    // =============================================================================

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // T for theme toggle
            if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
                const activeElement = document.activeElement;
                const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

                if (!isInput) {
                    toggleTheme();
                }
            }
        });
    }

    // =============================================================================
    // MAGNETIC DOT GRID EFFECT
    // =============================================================================

    function setupMagneticDotGrid() {
        const canvas = document.createElement('canvas');
        canvas.id = 'dot-grid-canvas';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        const spacing = 24;
        const dotRadius = 1;
        const mouseRadius = 120; // Radius of mouse influence
        const pushStrength = 15; // How far dots push away

        let mouseX = -1000;
        let mouseY = -1000;
        let isDark = true;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function updateTheme() {
            isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const dotColor = isDark ? 'rgba(26, 26, 26, 1)' : 'rgba(200, 196, 190, 1)';

            for (let x = spacing; x < canvas.width; x += spacing) {
                for (let y = spacing; y < canvas.height; y += spacing) {
                    // Calculate distance from mouse
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let drawX = x;
                    let drawY = y;
                    let opacity = 1;

                    // Apply magnetic push effect
                    if (distance < mouseRadius) {
                        const force = (1 - distance / mouseRadius);
                        const angle = Math.atan2(dy, dx);
                        const push = force * pushStrength;

                        drawX = x + Math.cos(angle) * push;
                        drawY = y + Math.sin(angle) * push;

                        // Subtle opacity change near cursor
                        opacity = 0.3 + (distance / mouseRadius) * 0.7;
                    }

                    ctx.beginPath();
                    ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
                    ctx.fillStyle = dotColor.replace('1)', `${opacity})`);
                    ctx.fill();
                }
            }

            requestAnimationFrame(draw);
        }

        // Event listeners
        window.addEventListener('resize', resize);

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        // Listen for theme changes
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        // Initialize
        resize();
        updateTheme();
        draw();
    }

    // =============================================================================
    // INITIALIZATION
    // =============================================================================

    function init() {
        loadTheme();
        setupMagneticDotGrid(); // Add magnetic dot grid first
        setupScrollAnimations();
        revealElements();
        setupSmoothScroll();
        setupNavbar();
        setupActiveNavHighlight();
        animateQueueBars();
        setupTypewriterEffect();
        setupWordCloud();
        setupKeyboardShortcuts();

        // Trigger initial counter animation if hero is visible
        const heroSection = document.getElementById('god-view');
        if (heroSection && heroSection.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(animateCounters, 500);
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

