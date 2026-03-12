// simple smooth scroll for anchor links
const links = document.querySelectorAll('nav a[href^="#"]');
const nav = document.querySelector('nav');
for (const link of links) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav ? nav.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
}

// mouse follow light
const cursorLight = document.getElementById('cursor-light');
document.addEventListener('mousemove', (e) => {
    cursorLight.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(el => {
    observer.observe(el);
});

// Observe all cards
document.querySelectorAll('.animate-scale').forEach(el => {
    observer.observe(el);
});

// Timeline line scroll following
function updateTimelineLine() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY;
    const timelineHeight = timeline.offsetHeight;
    
    // Calculate scroll progress within the timeline
    const windowTop = window.scrollY;
    const windowBottom = windowTop + window.innerHeight;
    
    // Position relative to timeline
    const startOfTimeline = timelineTop;
    const endOfTimeline = timelineTop + timelineHeight;
    
    let lineHeight = 0;
    
    if (windowBottom > startOfTimeline) {
        lineHeight = Math.min(
            windowBottom - startOfTimeline,
            timelineHeight
        );
    }
    
    // Update the timeline line
    const timelineLineEl = timeline.querySelector('.timeline::before');
    if (timelineLineEl) {
        timeline.style.setProperty('--timeline-height', lineHeight + 'px');
    }
    
    // Direct method - update via pseudo-element workaround
    const style = document.getElementById('timeline-dynamic') || 
                  (function() {
                      const s = document.createElement('style');
                      s.id = 'timeline-dynamic';
                      document.head.appendChild(s);
                      return s;
                  })();
    
    style.textContent = `.timeline::before { height: ${Math.max(0, lineHeight)}px !important; }`;
}

// Update on scroll
window.addEventListener('scroll', updateTimelineLine);
// Update on load and resize
window.addEventListener('load', updateTimelineLine);
window.addEventListener('resize', updateTimelineLine);

// Initial call
updateTimelineLine();
