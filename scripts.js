document.addEventListener('DOMContentLoaded', async function() {
    // Initialize tsParticles
    await tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: "#ffffff"
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce"
                },
                random: false,
                speed: 2,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 5 }
            }
        },
        detectRetina: true
    });

    // Get all sections and nav items
    const allSections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.floating-nav a');

    // Handle section fade-ins
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    allSections.forEach(section => {
        observer.observe(section);
    });

    // Handle gradient popup with smooth transition
    const popup = document.getElementById('gradient-popup');
    if (popup) {
        popup.style.opacity = '1';
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 1000);
        }, 2000);
    }

    // Handle active state for floating navigation
    function setActiveNavItem() {
        const fromTop = window.scrollY + window.innerHeight/2;

        allSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (fromTop >= sectionTop && fromTop <= sectionBottom) {
                navItems.forEach(item => item.classList.remove('active'));
                navItems[index].classList.add('active');
            }
        });
    }

    // Update active state on scroll
    window.addEventListener('scroll', setActiveNavItem);
    
    // Set initial active state
    setActiveNavItem();

    // Add smooth scrolling to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
