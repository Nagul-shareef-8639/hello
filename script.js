const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeSwitcher = document.getElementById('theme-switcher');
const backToTop = document.getElementById('back-to-top');
const typingText = document.getElementById('typing-text');
const header = document.querySelector('.header');
const filterGroup = document.getElementById('filter-group');
const testimonialSlider = document.getElementById('testimonial-slider');
const prevTestimonial = document.getElementById('prev-testimonial');
const nextTestimonial = document.getElementById('next-testimonial');
const contactForm = document.getElementById('contact-form');
const loader = document.querySelector('.loader');

const typingPhrases = [
  'Quality woodworking built to last.',
  'Handcrafted cabinets and furniture.',
  'Beautiful designs for modern living.',
  'Craftsmanship with a warm touch.'
];
let typingIndex = 0;
let charIndex = 0;
let activeTestimonial = 0;
let typingForward = true;

const toggleMenu = () => {
  navMenu.classList.toggle('open');
};

const closeMenu = () => {
  navMenu.classList.remove('open');
};

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-theme');
  themeSwitcher.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
};

const showBackToTop = () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
};

const animateTyping = () => {
  const currentPhrase = typingPhrases[typingIndex];
  typingText.textContent = currentPhrase.slice(0, charIndex);
  if (typingForward) {
    charIndex += 1;
    if (charIndex > currentPhrase.length) {
      typingForward = false;
      setTimeout(animateTyping, 1400);
      return;
    }
  } else {
    charIndex -= 1;
    if (charIndex < 0) {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
    }
  }
  setTimeout(animateTyping, typingForward ? 100 : 50);
};

const smoothScroll = event => {
  if (event.target.classList.contains('nav-link') || event.target.classList.contains('btn')) {
    const href = event.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  }
};

const handleHeaderShadow = () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

const filterGallery = event => {
  const filter = event.target.dataset.filter;
  if (!filter) return;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const category = item.dataset.category;
    item.style.display = filter === 'all' || category === filter ? 'block' : 'none';
  });
};

const updateTestimonials = index => {
  const items = Array.from(testimonialSlider.children);
  activeTestimonial = (index + items.length) % items.length;
  items.forEach((item, i) => item.classList.toggle('active', i === activeTestimonial));
};

const handleFormInput = event => {
  const feedback = document.getElementById('form-feedback');
  feedback.textContent = '';
  if (event.target.value.trim().length === 0) {
    event.target.style.borderColor = 'rgba(255,0,0,0.4)';
  } else {
    event.target.style.borderColor = 'rgba(45,42,38,0.12)';
  }
};

const handleFormSubmit = event => {
  event.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const service = document.getElementById('service');
  const message = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');

  if (!name.value.trim() || !email.value.trim() || !service.value || !message.value.trim()) {
    feedback.textContent = 'Please complete all fields before sending your message.';
    feedback.style.color = '#dc3545';
    return;
  }

  feedback.textContent = 'Message sent successfully! We will contact you soon.';
  feedback.style.color = '#28a745';
  contactForm.reset();
};

const handleInputChange = event => {
  const feedback = document.getElementById('form-feedback');
  feedback.textContent = `You selected: ${event.target.value}`;
  feedback.style.color = 'var(--muted)';
};

const revealOnScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  document.querySelectorAll('.service-card, .project-card, .testimonial-card, .about-image').forEach(element => {
    if (element.getBoundingClientRect().top + window.scrollY < scrollPosition - 100) {
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
      element.style.transition = 'all 0.8s ease';
    }
  });
};

const initTestimonials = () => {
  updateTestimonials(activeTestimonial);
  setInterval(() => updateTestimonials(activeTestimonial + 1), 7000);
};

const hideLoader = () => {
  loader.style.opacity = 0;
  setTimeout(() => loader.remove(), 600);
};

window.addEventListener('load', hideLoader);
navToggle.addEventListener('click', toggleMenu);
themeSwitcher.addEventListener('click', toggleDarkMode);
window.addEventListener('scroll', () => {
  showBackToTop();
  handleHeaderShadow();
  revealOnScroll();
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
filterGroup.addEventListener('click', filterGallery);
prevTestimonial.addEventListener('click', () => updateTestimonials(activeTestimonial - 1));
nextTestimonial.addEventListener('click', () => updateTestimonials(activeTestimonial + 1));
contactForm.addEventListener('submit', handleFormSubmit);
contactForm.addEventListener('change', handleInputChange);
contactForm.addEventListener('keydown', handleFormInput);
contactForm.addEventListener('keyup', handleFormInput);
contactForm.addEventListener('mouseover', event => {
  if (event.target.tagName === 'BUTTON') {
    event.target.style.transform = 'scale(1.03)';
  }
});
contactForm.addEventListener('mouseout', event => {
  if (event.target.tagName === 'BUTTON') {
    event.target.style.transform = 'scale(1)';
  }
});
contactForm.addEventListener('mouseenter', event => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    event.target.style.background = '#fff8f0';
  }
}, true);
contactForm.addEventListener('mouseleave', event => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    event.target.style.background = '#fff';
  }
}, true);

document.addEventListener('click', smoothScroll);

typingText.addEventListener('mouseover', () => {
  typingText.style.color = 'var(--accent)';
});

typingText.addEventListener('mouseout', () => {
  typingText.style.color = 'var(--muted)';
});

animateTyping();
initTestimonials();
