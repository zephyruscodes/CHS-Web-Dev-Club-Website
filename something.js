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
