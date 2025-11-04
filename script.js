// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. STICKY NAVIGATION BAR VISIBILITY --- */
    
    const nav = document.getElementById("main-nav");
    const hero = document.getElementById("home");
    
    if (nav && hero) {
        // Calculate the height of the hero section.
        // The nav will appear once we scroll past this point.
        const heroHeight = hero.offsetHeight;

        window.addEventListener("scroll", () => {
            // Check if the user's vertical scroll position is greater than the hero's height
            if (window.scrollY > heroHeight - 50) { // -50px buffer for earlier appearance
                nav.classList.add("nav-visible");
            } else {
                nav.classList.remove("nav-visible");
            }
        });
    }

    
    /* --- 2. INTERSECTION OBSERVER (Fade-in animations) --- */

    // Select all elements that should fade in
    const hiddenElements = document.querySelectorAll(".hidden");

    // Define the options for the observer
    const observerOptions = {
        root: null, // Observes intersections relative to the viewport
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    // Create the observer callback function
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'show' class to trigger the CSS transition
                entry.target.classList.add("show");
                
                // Stop observing the element so the animation doesn't re-run
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Tell the observer to watch each of the '.hidden' elements
    hiddenElements.forEach(el => observer.observe(el));

});