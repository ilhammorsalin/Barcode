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
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

let videoStarted = false;
const vh = window.innerHeight;
const expandDist = vh;
const totalDist = vh * 3.5;

function quoteState(progress, fadeIn, clear, blurOut, blurEnd) {
  if (progress < fadeIn) return { opacity: 0, blur: 0 };
  if (progress < clear) return { opacity: (progress - fadeIn) / (clear - fadeIn), blur: 0 };
  if (progress < blurOut) return { opacity: 1, blur: 0 };
  if (progress < blurEnd) {
    const t = (progress - blurOut) / (blurEnd - blurOut);
    return { opacity: 1 - t, blur: t * 10 };
  }
  return { opacity: 0, blur: 10 };
}

function updateHeroOnScroll() {
  const sy = window.scrollY;
  const ep = Math.min(sy / expandDist, 1);

  if (heroBgImg) {
    heroBgImg.style.filter = 'blur(10px)';
    heroBgImg.style.transform = `scale(${1 + ep * 0.08})`;
    heroBgImg.style.opacity = 1 - ep;
  }

  videoWrapper.style.transform = `scale(${0.6 + ep * 0.4})`;
  videoWrapper.style.opacity = 1;

  if (ep > 0.01 && !videoStarted) {
    videoStarted = true;
    heroVideo.play().catch(() => {});
  }

  heroOverlay.style.opacity = 1 - ep * 0.4;

  const tp = Math.min(sy / (vh * 0.35), 1);
  heroContent.style.opacity = 1 - tp;
  heroContent.style.transform = `translateY(${tp * 20}px)`;
  heroContent.style.filter = `blur(${tp * 10}px)`;

  const totalP = sy / totalDist;
  const q1 = quoteState(totalP, 0.06, 0.18, 0.39, 0.47);
  const q2 = quoteState(totalP, 0.41, 0.53, 0.74, 0.82);
  const q3 = quoteState(totalP, 0.76, 0.88, 1.00, 1.08);

  heroQuote1.style.opacity = q1.opacity;
  heroQuote1.style.filter = `blur(${q1.blur}px)`;
  heroQuote2.style.opacity = q2.opacity;
  heroQuote2.style.filter = `blur(${q2.blur}px)`;
  heroQuote3.style.opacity = q3.opacity;
  heroQuote3.style.filter = `blur(${q3.blur}px)`;

  const fade = Math.min(Math.max((sy - vh * 2.8) / (vh * 0.5), 0), 1);
  heroFixedActions.style.opacity = 1 - fade;
  heroFixedActions.style.pointerEvents = fade > 0.9 ? 'none' : 'auto';

  scrollIndicator.style.opacity = ep > 0.3 ? 0 : 1 - ep / 0.3;
  scrollIndicator.style.pointerEvents = ep > 0.3 ? 'none' : 'auto';

  header.classList.toggle('scrolled', sy > 50);
}

window.addEventListener('scroll', updateHeroOnScroll, { passive: true });
updateHeroOnScroll();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
