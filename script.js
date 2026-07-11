/* Everlasting Hibachi — Global Scripts */

// ---- Navbar scroll effect ----
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ---- Hamburger / Mobile Menu ----
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Contact / Booking Form (mailto fallback) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm));
    const subject = encodeURIComponent(`Hibachi Booking Request – ${data.name || ''}`);
    const body = encodeURIComponent(
      `Name: ${data.name || ''}\nPhone: ${data.phone || ''}\nEmail: ${data.email || ''}\nEvent Date: ${data.date || ''}\nGuests: ${data.guests || ''}\nCity: ${data.city || ''}\nMessage: ${data.message || ''}`
    );
    window.location.href = `mailto:everlastinghibachiwithus@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ---- Active nav link highlight ----
const currentPath = window.location.pathname.replace(/\/$/, '');
document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href').replace(/\/$/, '');
  if (href === currentPath || (href !== '' && currentPath.startsWith(href))) {
    a.classList.add('active');
  }
});
