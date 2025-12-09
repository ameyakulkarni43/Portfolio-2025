// Select DOM items
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Toggle Menu on Click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    // Explicitly handle display property for animation logic if needed
    if (navLinks.classList.contains('nav-active')) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Reset nav display on resize
// This prevents the menu from staying hidden if you resize the browser from mobile to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.classList.remove('nav-active');
    } else {
        // If resizing down to mobile, hide it unless active
        if(!navLinks.classList.contains('nav-active')){
           navLinks.style.display = 'none'; 
        }
    }
});
