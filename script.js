// Video expand on scroll — three layers
const hero = document.getElementById('hero');
const heroBg = document.getElementById('heroBg');
const heroBgImg = heroBg.querySelector('img');
const videoWrapper = document.getElementById('heroVideoWrapper');
const heroVideo = document.getElementById('heroVideo');
const heroOverlay = document.getElementById('heroOverlay');
const heroContent = document.getElementById('heroContent');
const heroFixedActions = document.getElementById('heroFixedActions');
const heroQuote1 = document.getElementById('heroQuote1');
const heroQuote2 = document.getElementById('heroQuote2');
const heroQuote3 = document.getElementById('heroQuote3');
const scrollIndicator = document.getElementById('scrollIndicator');
const header = document.querySelector('.site-header');
let videoStarted = false;

// Expansion takes first 100vh, then quotes appear, then categories
const vh = window.innerHeight;
const expandDistance = vh;
const totalHeroDistance = vh * 3.5;

function updateHeroOnScroll() {
  const scrollY = window.scrollY;
  const progress = Math.min(scrollY / totalHeroDistance, 1);
  const expandProgress = Math.min(scrollY / expandDistance, 1);

  // Layer 0 — quote.png: scale up + fade out (during expansion phase)
  const bgScale = 1 + expandProgress * 0.08;
  const bgOpacity = 1 - expandProgress;
  if (heroBgImg) {
    heroBgImg.style.filter = `blur(10px)`;
    heroBgImg.style.transform = `scale(${bgScale})`;
    heroBgImg.style.opacity = bgOpacity;
  }

  // Layer 1 — video: scale up, start playing
  const videoScale = 0.6 + expandProgress * 0.4;
  videoWrapper.style.transform = `scale(${videoScale})`;

  if (expandProgress > 0.01 && !videoStarted) {
    videoStarted = true;
    heroVideo.play().catch(function() {});
  }

  // Overlay: reduce during expansion phase
  heroOverlay.style.opacity = 1 - (expandProgress * 0.4);

  // Layer 2 — main heading: blurs out during first 0.35vh
  const textProgress = Math.min(scrollY / (vh * 0.35), 1);
  const textBlur = textProgress * 10;
  heroContent.style.opacity = 1 - textProgress;
  heroContent.style.transform = `translateY(${textProgress * 20}px)`;
  heroContent.style.filter = `blur(${textBlur}px)`;

  // Quotes: one at a time — each fades in clear, holds for ~2s of scroll, then blurs out
  const totalProgress = scrollY / (vh * 3.5);
  function quoteState(progress, fadeInStart, clearStart, blurOutStart, blurOutEnd) {
    if (progress < fadeInStart) return { opacity: 0, blur: 0 };
    if (progress < clearStart) {
      const t = (progress - fadeInStart) / (clearStart - fadeInStart);
      return { opacity: t, blur: 0 };
    }
    if (progress < blurOutStart) return { opacity: 1, blur: 0 };
    if (progress < blurOutEnd) {
      const t = (progress - blurOutStart) / (blurOutEnd - blurOutStart);
      return { opacity: 1 - t, blur: t * 10 };
    }
    return { opacity: 0, blur: 10 };
  }
  const q1 = quoteState(totalProgress, 0.06, 0.18, 0.39, 0.47);
  const q2 = quoteState(totalProgress, 0.41, 0.53, 0.74, 0.82);
  const q3 = quoteState(totalProgress, 0.76, 0.88, 1.00, 1.08);
  heroQuote1.style.opacity = q1.opacity;
  heroQuote1.style.filter = `blur(${q1.blur}px)`;
  heroQuote2.style.opacity = q2.opacity;
  heroQuote2.style.filter = `blur(${q2.blur}px)`;
  heroQuote3.style.opacity = q3.opacity;
  heroQuote3.style.filter = `blur(${q3.blur}px)`;

  // Fixed actions: visible during hero, fades out near end
  const actionsFadeOut = Math.min(Math.max((scrollY - vh * 2.8) / (vh * 0.5), 0), 1);
  heroFixedActions.style.opacity = 1 - actionsFadeOut;
  heroFixedActions.style.pointerEvents = actionsFadeOut > 0.9 ? 'none' : 'auto';

  // Hide scroll indicator early
  if (expandProgress > 0.3) {
    scrollIndicator.style.opacity = 0;
    scrollIndicator.style.pointerEvents = 'none';
  } else {
    scrollIndicator.style.opacity = 1 - (expandProgress / 0.3);
    scrollIndicator.style.pointerEvents = 'auto';
  }

  // Sticky nav
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeroOnScroll, { passive: true });
updateHeroOnScroll();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal with Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Testimonial carousel
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.carousel-dots button');
let currentSlide = 0;
let carouselInterval;

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(carouselInterval);
    goToSlide(parseInt(dot.dataset.index));
    carouselInterval = setInterval(nextSlide, 5000);
  });
});

if (slides.length > 1) {
  carouselInterval = setInterval(nextSlide, 5000);
}

// Keyboard navigation for carousel dots
dots.forEach(dot => {
  dot.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (currentSlide + 1) % slides.length;
      dots[next]?.focus();
      goToSlide(next);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      dots[prev]?.focus();
      goToSlide(prev);
    }
  });
});

// Smooth scroll for anchor links (enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
