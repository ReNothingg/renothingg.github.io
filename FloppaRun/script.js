document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const stickyTitle = document.getElementById('pageStickyTitle');
    const heroSection = document.getElementById('hero');
    const navLinks = document.querySelectorAll('nav ul li a');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section[id]');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const setNavOpen = (open) => {
        if (!menuToggle || !mainNav) return;
        document.body.classList.toggle('nav-open', open);
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };

    if (menuToggle && mainNav) {
        setNavOpen(false);

        menuToggle.addEventListener('click', () => {
            setNavOpen(!document.body.classList.contains('nav-open'));
        });

        mainNav.addEventListener('click', (e) => {
            if (e.target === mainNav) setNavOpen(false);
            if (e.target.closest('a')) setNavOpen(false);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setNavOpen(false);
        });
    }

    const updateHeaderHeight = () => {
        if (!header) return;
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    function handleScroll() {
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        if (stickyTitle) {
            if (window.scrollY > heroHeight / 2) {
                stickyTitle.classList.add('visible');
            } else {
                stickyTitle.classList.remove('visible');
            }
        }

        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
                setTimeout(() => scrollToTopBtn.style.opacity = '0.8', 10);
            } else {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => scrollToTopBtn.style.display = 'none', 300);
            }
        }

        let currentSection = '';
        const headerHeight = header ? header.offsetHeight : 0;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - headerHeight - 50) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
        if (!currentSection && heroSection) {
            const homeLink = document.querySelector('nav ul li a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';
            window.scrollTo({ top: 0, behavior });
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth';
                    window.scrollTo({ top: offsetPosition, behavior });
                    setNavOpen(false);
                }
            }
        });
    });

    if (prefersReducedMotion.matches) {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    } else {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.animationDelay) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        };

        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(el => scrollObserver.observe(el));
    }


    const canvas = document.getElementById('hero-canvas');
    if (canvas && !prefersReducedMotion.matches) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        function setCanvasSize() {
            const heroWidth = heroSection ? heroSection.clientWidth : window.innerWidth;
            const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
            canvas.width = heroWidth;
            canvas.height = heroHeight;
        }

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 0.5;
                const x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * .4) - .2;
                const directionY = (Math.random() * .4) - .2;
                const color = 'rgba(230, 81, 0, 0.3)';
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        if (heroSection && canvas) {
            setCanvasSize();
            initParticles();
            animateParticles();

            window.addEventListener('resize', () => {
                setCanvasSize();
                initParticles();
            });
        }
    }
});
