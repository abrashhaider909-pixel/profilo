// =========================================
// NAVIGATION INTERACTIVITY
// =========================================

// 1. Scroll Effect: Navbar shrinks and highlights active link
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  // Add 'scrolled' class to navbar
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll Spy: Highlight current section
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Adjust offset for navbar height
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// 2. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

function toggleMenu() {
  mobileMenu.classList.toggle('active');
  mobileMenuBtn.classList.toggle('active');
  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

mobileMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileNavItems.forEach(item => {
  item.addEventListener('click', () => {
    toggleMenu();
  });
});

// =========================================
// PROJECT FILTERING
// =========================================
function filterProjects(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// =========================================
// TIMELINE ANIMATION
// =========================================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
  // Add delay for cascade effect
  item.style.transitionDelay = `${index * 0.2}s`;
  timelineObserver.observe(item);
});

// =========================================
// PROFILE IMAGE 3D TILT
// =========================================
const profileImg = document.querySelector('.profile-img');
if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    profileImg.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

// =========================================
// FORM HANDLING
// =========================================
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const originalText = btn.innerText;
  btn.innerText = "Message Sent!";
  btn.style.background = "var(--accent-primary)";
  btn.style.color = "#000";
  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = "";
    btn.style.color = "";
    e.target.reset();
  }, 3000);
}

// Dynamic CSS for FadeIn
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);