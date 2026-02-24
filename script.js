
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {

    const heroTitle = document.querySelector('header h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 1000);

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 20000);
    }
    setInterval(createParticle, 300);





    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    const sectionsArray = Array.from(sections);

    window.addEventListener('scroll', () => {
        let current = '';
        sectionsArray.forEach(section => {
            if (pageYOffset >= section.offsetTop - section.clientHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href').substring(1) === current
            );
        });
    });
});