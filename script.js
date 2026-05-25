/* ═══════════════════════════════════════════════════════
   AMIN AHMED — Mr. Perfect | Portfolio Script
   Futuristic Interactive JavaScript
═══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   DOM ELEMENTS
───────────────────────────────────────── */
const navbar        = document.getElementById("navbar");
const navLinks      = document.getElementById("navLinks");
const navLinkItems  = document.querySelectorAll(".nav-link");
const hamburger     = document.getElementById("hamburger");
const themeToggle   = document.getElementById("themeToggle");
const themeIcon     = document.getElementById("themeIcon");
const scrollBar     = document.getElementById("scrollProgress");

const reveals       = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
const counters      = document.querySelectorAll(".counter");
const skillFills    = document.querySelectorAll(".skill-fill");

const typingText    = document.getElementById("typingText");

const contactForm   = document.getElementById("contactForm");

const yearSpan      = document.getElementById("year");

/* ─────────────────────────────────────────
   NAVBAR SCROLL EFFECT
───────────────────────────────────────── */
window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  updateScrollProgress();
  activateNavLink();
});

/* ─────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────── */
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;

  const progress = (scrollTop / docHeight) * 100;

  scrollBar.style.width = `${progress}%`;
}

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinkItems.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ─────────────────────────────────────────
   ACTIVE NAV LINK
───────────────────────────────────────── */
const sections = document.querySelectorAll("section");

function activateNavLink() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove("active");

    if (link.dataset.section === current) {
      link.classList.add("active");
    }
  });
}

/* ─────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────── */
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (savedTheme === "light") {
    themeIcon.className = "ri-moon-line";
  }
}

themeToggle.addEventListener("click", () => {

  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {

    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");

    themeIcon.className = "ri-moon-line";

  } else {

    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    themeIcon.className = "ri-sun-line";
  }
});

/* ─────────────────────────────────────────
   REVEAL ANIMATIONS
───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }

  });

}, {
  threshold: 0.15
});

reveals.forEach(item => {
  revealObserver.observe(item);
});

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */
const counterObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const counter = entry.target;

      const target = +counter.dataset.target;

      let current = 0;

      const increment = target / 80;

      const updateCounter = () => {

        current += increment;

        if (current < target) {

          counter.innerText = Math.ceil(current);

          requestAnimationFrame(updateCounter);

        } else {

          counter.innerText = target;
        }
      };

      updateCounter();

      counterObserver.unobserve(counter);
    }
  });

}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});

/* ─────────────────────────────────────────
   SKILL BAR ANIMATION
───────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const fills =
        entry.target.querySelectorAll(".skill-fill");

      fills.forEach(fill => {

        const width = fill.dataset.width;

        fill.style.width = width + "%";
      });

      skillObserver.unobserve(entry.target);
    }
  });

}, {
  threshold: 0.3
});

document.querySelectorAll(".skills-bars").forEach(skillSection => {
  skillObserver.observe(skillSection);
});

/* ─────────────────────────────────────────
   TYPING EFFECT
───────────────────────────────────────── */
const roles = [
  "Computer Science Student",
  "Data Scientist",
  "AI Developer",
  "Python Programmer",
  "Web Developer",
  "Machine Learning Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentRole = roles[roleIndex];

  if (!deleting) {

    typingText.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }

  } else {

    typingText.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 90);
}

typeEffect();

/* ─────────────────────────────────────────
   PARTICLE BACKGROUND
───────────────────────────────────────── */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {

  constructor() {

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 1;

    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > canvas.height) {
      this.speedY *= -1;
    }
  }

  draw() {

    ctx.beginPath();

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(0,212,255,0.7)";

    ctx.fill();
  }
}

function initParticles() {

  particlesArray = [];

  for (let i = 0; i < 90; i++) {

    particlesArray.push(new Particle());
  }
}

function animateParticles() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {

    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  initParticles();
});

/* ─────────────────────────────────────────
   CONTACT FORM VALIDATION
───────────────────────────────────────── */
contactForm.addEventListener("submit", (e) => {

  e.preventDefault();

  let valid = true;

  const name =
    document.getElementById("name");

  const email =
    document.getElementById("email");

  const subject =
    document.getElementById("subject");

  const message =
    document.getElementById("message");

  const nameError =
    document.getElementById("nameError");

  const emailError =
    document.getElementById("emailError");

  const subjectError =
    document.getElementById("subjectError");

  const messageError =
    document.getElementById("messageError");

  const success =
    document.getElementById("formSuccess");

  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  success.classList.remove("show");

  if (name.value.trim().length < 3) {
    nameError.textContent =
      "Name must be at least 3 characters.";
    valid = false;
  }

  if (!email.value.includes("@")) {
    emailError.textContent =
      "Enter a valid email address.";
    valid = false;
  }

  if (subject.value.trim().length < 3) {
    subjectError.textContent =
      "Subject is too short.";
    valid = false;
  }

  if (message.value.trim().length < 10) {
    messageError.textContent =
      "Message should be at least 10 characters.";
    valid = false;
  }

  if (valid) {

    success.classList.add("show");

    contactForm.reset();

    setTimeout(() => {
      success.classList.remove("show");
    }, 4000);
  }
});

/* ─────────────────────────────────────────
   DYNAMIC YEAR
───────────────────────────────────────── */
yearSpan.textContent = new Date().getFullYear();


/* ════════════════════════════════════════
   END OF FILE
════════════════════════════════════════ */