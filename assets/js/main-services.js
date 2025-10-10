// ===========================================
//   UTILITY FUNCTIONS - Các hàm tiện ích
// ===========================================

function loadComponent(componentName, componentPath) {
  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const placeholder = document.getElementById(
        `${componentName}-placeholder`
      );
      if (placeholder) {
        placeholder.innerHTML = html;
      }
    })
    .catch((error) => {
      console.error(`Error loading ${componentName}:`, error);
    });
}

// ===========================================
//   HERO SLIDER FUNCTIONALITY
// ===========================================

class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.track = document.getElementById("sliderTrack");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.autoSlideInterval = null;
    this.autoSlideDelay = 5000; // 5 seconds

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.bindEvents();
    this.startAutoSlide();
    this.updateSlider();
  }

  bindEvents() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector(".slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", () =>
        this.stopAutoSlide()
      );
      sliderContainer.addEventListener("mouseleave", () =>
        this.startAutoSlide()
      );
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
    this.resetAutoSlide();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
    this.resetAutoSlide();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
    this.resetAutoSlide();
  }

  updateSlider() {
    // Update track position
    if (this.track) {
      const translateX = -this.currentSlide * 20; // 20% per slide
      this.track.style.transform = `translateX(${translateX}%)`;
    }

    // Update active slide
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide);
    });

    // Update active dot
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  startAutoSlide() {
    this.stopAutoSlide(); // Clear any existing interval
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

// ===========================================
//   SCROLL TO TOP FUNCTIONALITY
// ===========================================

function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (!scrollToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top when clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===========================================
//   SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================================

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = 120; // Account for fixed header
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===========================================
//   LAZY LOADING FOR IMAGES
// ===========================================

function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    });
  }
}

// ===========================================
//   PROJECT CAROUSEL FUNCTIONALITY
// ===========================================

class ProjectCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".carousel-slide");
    this.track = document.getElementById("projectCarouselTrack");
    this.prevBtn = document.getElementById("prevCarouselBtn");
    this.nextBtn = document.getElementById("nextCarouselBtn");

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.bindEvents();
    this.updateCarousel();
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateCarousel();
  }

  updateCarousel() {
    if (this.track) {
      const translateX = -this.currentSlide * 100;
      this.track.style.transform = `translateX(${translateX}%)`;
    }

    // Update active slide
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide);
    });
  }
}

// ===========================================
//   TEMPLATES TAB FUNCTIONALITY
// ===========================================

function initTemplatesTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".templates-grid");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Show target tab content
      const targetContent = document.getElementById(`${targetTab}-tab`);
      if (targetContent) {
        targetContent.style.display = "grid";
      }
    });
  });
}

// ===========================================
//   INITIALIZATION
// ===========================================

document.addEventListener("DOMContentLoaded", function () {
  // Load components
  loadComponent("header", "../components/header.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  // Initialize features
  initScrollToTop();
  initSmoothScroll();
  initLazyLoading();
  initTemplatesTabs();

  // Initialize sliders after a short delay to ensure DOM is ready
  setTimeout(() => {
    new HeroSlider();
    new ProjectCarousel();
  }, 100);
});

// ===========================================
//   EXPORT FOR MODULE USAGE (if needed)
// ===========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    HeroSlider,
    ProjectCarousel,
    initScrollToTop,
    initSmoothScroll,
    initLazyLoading,
    initTemplatesTabs,
  };
}
