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

// Scroll progress bar
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.height = scrollPercent + '%';
}

// Update scroll progress on scroll
window.addEventListener('scroll', updateScrollProgress);
// Update on load and resize
window.addEventListener('load', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// Initial call
updateScrollProgress();

// Loading screen animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    const mainContent = document.getElementById('main-content');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10 + 5; // Random progress between 5-15%
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            loadingText.textContent = 'CHS WEBSITE DEVELOPMENT CLUB ACTIVE';
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.opacity = '1';
                }, 500);
            }, 300);
        }
        loadingBar.style.width = progress + '%';
    }, 150);
});

// Typewriter effect for the home tagline
(function() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;

    const phrases = [
        "Technical & Sharp",
        "Building the Web, One Tag at a Time.",
        "From Concept to Code.",
        "Architects of the Digital Age.",
        "Crafting the Modern Web.",
        "The Syntax of Success.",
        "Bold & Ambitious",
        "Deploy Your Future.",
        "Don’t Just Browse the Web—Build It.",
        "Coding the Next Generation.",
        "Your Ideas, Live on the Web.",
        "Level Up Your Full-Stack Skills.",
        "Creative & Fun",
        "We Have the Best \"View Source.\"",
        "Connecting the Dots (and the Divs).",
        "Where Creativity Meets Code.",
        "Ctrl + Alt + Create.",
        "Inspect Element. Improve. Innovate.",
        "Community Focused",
        "Learn. Code. Collaborate.",
        "A Community Built on Open Source.",
        "Bridging the Gap Between Design and Development.",
        "Commit to Something Great."
    ];

    const config = {
        typeSpeed: 70,
        deleteSpeed: 40,
        pauseAfterTyping: 1600,
        pauseAfterDeleting: 400
    };

    let phraseIndex = 0;
    let isDeleting = false;

    function updateText() {
        const currentText = phrases[phraseIndex];
        const displayed = typewriterEl.textContent;

        if (!isDeleting) {
            // Type forward
            typewriterEl.textContent = currentText.slice(0, displayed.length + 1);
            if (typewriterEl.textContent === currentText) {
                isDeleting = true;
                setTimeout(updateText, config.pauseAfterTyping);
                return;
            }
            setTimeout(updateText, config.typeSpeed);
        } else {
            // Backspace
            typewriterEl.textContent = currentText.slice(0, displayed.length - 1);
            if (typewriterEl.textContent === '') {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(updateText, config.pauseAfterDeleting);
                return;
            }
            setTimeout(updateText, config.deleteSpeed);
        }
    }

    // Start when content is ready, and allow for the loading screen transition.
    window.addEventListener('load', () => {
        // Small delay so the loading screen can fade first
        setTimeout(() => {
            // Start with a clean slate so the typewriter animation is visible
            typewriterEl.textContent = '';
            updateText();
        }, 1200);
    });
})();
