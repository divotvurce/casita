 // ========================================
    // GSAP INITIALIZATION
    // ========================================
    gsap.registerPlugin(ScrollTrigger);

    // ========================================
    // UNIFIED ANIMATION SYSTEM
    // ========================================
    
    // Hero animations on load
    gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-cta', {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Set initial state and animate text elements
    gsap.set('.animate-element', { opacity: 0, y: 60 });
    
    gsap.utils.toArray('.animate-element').forEach((elem) => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    // Set initial state and animate images
    gsap.set('.animate-image', { opacity: 0, y: 40 });
    
    gsap.utils.toArray('.animate-image').forEach((elem) => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // ========================================
    // MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const hamburgerLines = document.querySelectorAll('#menu-toggle .hamburger span');
    const menuTheme = document.body.dataset.menuTheme || 'light';

const burgerOpenColor = menuTheme === 'dark' ? 'white' : 'black';
const burgerClosedColor = 'white'; // zavřený burger je vždy bílý

    let isMenuOpen = false;

    gsap.set(sideMenu, { xPercent: 100 });
    gsap.set(menuItems, { opacity: 0, y: 20 });

function closeMenu() {
    if (isMenuOpen) {
        gsap.to(menuItems, { opacity: 0, y: 20, duration: 0.3, stagger: 0.05 });
        gsap.to(sideMenu, { xPercent: 100, duration: 0.6, delay: 0.2, ease: "power3.inOut"});

        gsap.to(hamburgerLines[0], {
            rotate: 0,
            y: 0,
            duration: 0.3,
            backgroundColor: burgerClosedColor
        });
        gsap.to(hamburgerLines[1], { opacity: 1, duration: 0.3 });
        gsap.to(hamburgerLines[2], {
            rotate: 0,
            y: 0,
            duration: 0.3,
            backgroundColor: burgerClosedColor
        });

        isMenuOpen = false;
    }
}


    ScrollTrigger.create({
        start: "top top",
        onUpdate: (self) => {
            if (self.direction !== 0 && isMenuOpen) closeMenu();
        }
    });

menuToggle.addEventListener('click', () => {
    if (isMenuOpen) {
        closeMenu();
    } else {
        isMenuOpen = true;

        gsap.to(sideMenu, { xPercent: 0, duration: 0.6, ease: "power3.inOut" });
        gsap.to(menuItems, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out"
        });

        gsap.to(hamburgerLines[0], {
            rotate: 45,
            y: 14,
            duration: 0.3,
            backgroundColor: burgerOpenColor
        });
        gsap.to(hamburgerLines[1], { opacity: 0, duration: 0.3 });
        gsap.to(hamburgerLines[2], {
            rotate: -45,
            y: -14,
            duration: 0.3,
            backgroundColor: burgerOpenColor
        });
    }
});


    // ========================================
    // READING EFFECT - Word by Word Color Change
    // ========================================
    gsap.utils.toArray(".reading-text").forEach(paragraph => {
        // Split text into words
        const words = paragraph.textContent.trim().split(/\s+/);
        paragraph.textContent = "";
        
        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.classList.add("word");
            span.textContent = word;
            paragraph.appendChild(span);
            
            // Add space between words (except last one)
            if (index < words.length - 1) {
                paragraph.appendChild(document.createTextNode(" "));
            }
        });
        
        // Animate each word separately
        gsap.utils.toArray(paragraph.querySelectorAll(".word")).forEach((wordEl, i) => {
            gsap.fromTo(
                wordEl,
                { color: "#d3d0d0" },
                {
                    color: "#000000",
                    scrollTrigger: {
                        trigger: paragraph,
                        start: () => "top+=" + (i * 10) + " 80%",
                        end: () => "top+=" + (i * 10) + " 60%",
                        scrub: true,
                        markers: false
                    }
                }
            );
        });
    });

    // ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollToTopBtn = document.getElementById('scroll-to-top');
let lastScrollY = window.scrollY;

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show button after scrolling down 300px
    if (currentScrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
    
    // Change color based on background (dark vs light sections)
    const sections = [
        { element: document.getElementById('hero'), isDark: true },
        { element: document.querySelector('#cta-section'), isDark: true },
        { element: document.querySelector('footer'), isDark: true }
    ];
    
    let isOverDarkSection = false;
    
    sections.forEach(section => {
        if (section.element) {
            const rect = section.element.getBoundingClientRect();
            const btnRect = scrollToTopBtn.getBoundingClientRect();
            
            // Check if button overlaps with dark section
            if (
                btnRect.top < rect.bottom &&
                btnRect.bottom > rect.top
            ) {
                isOverDarkSection = section.isDark;
            }
        }
    });
    
    // Change button colors
    if (isOverDarkSection) {
        scrollToTopBtn.style.backgroundColor = 'white';
        scrollToTopBtn.style.color = 'black';
    } else {
        scrollToTopBtn.style.backgroundColor = 'black';
        scrollToTopBtn.style.color = 'white';
    }
    
    lastScrollY = currentScrollY;
});

// Smooth scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animace tabulky ceníku
gsap.utils.toArray("table tbody tr").forEach((row, i) => {
    gsap.from(row, {
        scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power2.out"
    });
});
