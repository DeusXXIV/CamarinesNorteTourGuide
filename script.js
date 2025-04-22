// script.js

// Ensure AOS animations initialize
AOS.init({ duration: 800, once: true });

// Keep navbar on top
const nav = document.querySelector('nav');
if (nav) nav.style.zIndex = '1000';

// Theme toggle logic
const themeToggle = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile')
    .forEach(btn => btn.textContent = isDark ? '☀️' : '🌙');
};

// Initialize theme based on preference
(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(btn => {
    btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    btn.addEventListener('click', themeToggle);
  });
})();

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) menuBtn.addEventListener('click', () => {
  document.getElementById('mobile-nav').classList.toggle('hidden');
});

// Page load interactions
document.addEventListener('DOMContentLoaded', () => {
  // Navbar slide-down and scrolled state
  nav?.classList.add('nav-slide-down');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  });

  // Scroll-spy for nav links (adjusted so 'Towns' highlights correctly)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav .nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`nav .nav-link[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0
  });
  sections.forEach(sec => observer.observe(sec));

  // Back-to-top logic
  const backTop = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('hidden', window.scrollY < 300);
  });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  backTop.addEventListener('mouseenter', () => backTop.classList.add('animate-pulse'));
  backTop.addEventListener('mouseleave', () => backTop.classList.remove('animate-pulse'));

  // ScrollReveal animations
  if (window.ScrollReveal) {
    const sr = ScrollReveal({
      distance: '50px',
      duration: 600,
      easing: 'ease-out',
      reset: false
    });
    sr.reveal('.nav-link', { origin: 'top', interval: 100 });
    sr.reveal('#hero h1', { scale: 0.8, duration: 800 });
    sr.reveal('#hero p', { delay: 300 });
    sr.reveal('.town-card', { origin: 'bottom', interval: 100, scale: 0.9 });
    sr.reveal('.section-title', { origin: 'left', distance: '30px', interval: 200 });
    sr.reveal('#back-top', { origin: 'right', delay: 200 });
  }

  // Hero typewriter effect
  const titleEl = document.querySelector('#hero h1');
  if (titleEl) {
    const text = titleEl.textContent;
    titleEl.textContent = '';
    let idx = 0;
    const typer = setInterval(() => {
      titleEl.textContent += text.charAt(idx);
      idx++;
      if (idx === text.length) clearInterval(typer);
    }, 100);
  }

  // Render town cards with jello hover
  const container = document.getElementById('towns-container');
  const towns = [
    'Basud','Capalonga','Daet','Jose Panganiban','Labo','Mercedes',
    'Paracale','San Lorenzo Ruiz','San Vicente','Santa Elena','Talisay','Vinzons'
  ];
  towns.forEach((name, i) => {
    const card = document.createElement('div');
    card.className = 'town-card shadow-md transition-transform duration-300';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', i * 100);
    card.innerHTML = `
      <img loading="lazy" src="/images/bagasbas.webp" alt="${name}" class="w-full h-48 object-cover" />
      <div class="info">
        <h3>${name}</h3>
        <p>${name === 'Basud' ? 'Beaches and historic lighthouse.' : ''}</p>
      </div>
    `;
    card.addEventListener('mouseenter', () => card.classList.add('animate__animated', 'animate__jello'));
    card.addEventListener('mouseleave', () => card.classList.remove('animate__animated', 'animate__jello'));
    container.appendChild(card);
  });
});
