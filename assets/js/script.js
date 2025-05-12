document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        // Update aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
    }

    // Mobile menu click handler
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay or links (event delegation)
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active')) {
            if (e.target === overlay || e.target.closest('.nav-links a')) {
                toggleMenu();
            }
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Responsive behavior
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
            navLinks.style.display = 'flex';
            mobileMenu.setAttribute('aria-expanded', 'false');
        } else {
            navLinks.style.display = 'none';
        }
    }

    // Initialize and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Smooth scrolling for anchor links (improved version)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    toggleMenu();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
});
