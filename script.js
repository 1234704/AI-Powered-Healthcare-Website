// ============ Page enter transition ============
document.body.classList.add("page-enter");

// ============ Mobile nav toggle ============
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (navToggle) {
  navToggle.addEventListener("click", () => nav.classList.toggle("open"));
}

// ============ Scroll reveal + pulse-line draw ============
const revealTargets = document.querySelectorAll(".reveal, .pulse-rule");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => io.observe(el));

// ============ Counter animation ============
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counters = document.querySelectorAll("[data-count]");
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach((el) => counterIO.observe(el));

// ============ Button ripple effect ============
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ============ Blog category filter ============
const tabs = document.querySelectorAll(".category-tab");
const blogCards = document.querySelectorAll(".blog-card");
if (tabs.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.filter;
      blogCards.forEach((card) => {
        const match = cat === "all" || card.dataset.cat === cat;
        card.style.display = match ? "" : "none";
        if (match) {
          card.style.animation = "none";
          // eslint-disable-next-line no-unused-expressions
          card.offsetHeight;
          card.style.animation = "page-fade 0.45s ease";
        }
      });
    });
  });
}

// ============ Contact form ============
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const successMsg = document.getElementById("form-success");
    successMsg.classList.add("show");
    contactForm.reset();
    setTimeout(() => successMsg.classList.remove("show"), 5000);
  });
}