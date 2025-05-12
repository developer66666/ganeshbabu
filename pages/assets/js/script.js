document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Initialize mobile menu state
    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            navLinks.classList.remove('active');
        } else {
            navLinks.style.display = 'flex';
        }
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        if (window.innerWidth <= 768) {
            const isActive = navLinks.classList.contains('active');
            navLinks.style.display = isActive ? 'none' : 'flex';
            navLinks.classList.toggle('active');
        }
    }
    
    // Event listeners
    if (mobileMenu && navLinks) {
        // Initial setup
        initMobileMenu();
        
        // Menu toggle
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.mobile-menu')) {
                toggleMobileMenu();
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Responsive behavior
        window.addEventListener('resize', function() {
            initMobileMenu();
        });
    }
    
    // Smooth scrolling (unchanged)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Practice Now button (unchanged)
    const practiceBtn = document.getElementById('practiceBtn');
    if (practiceBtn) {
        practiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'practice.html';
        });
    }
});
