// ===========================================
//   UTILITY FUNCTIONS - Các hàm tiện ích
// ===========================================

/**
 * Load HTML component vào placeholder element
 * @param {string} componentName - Tên component (header, footer, navbar, ...)
 * @param {string} componentPath - Đường dẫn đến file HTML component
 */
function loadComponent(componentName, componentPath) {
  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const placeholder = document.getElementById(
        componentName + "-placeholder"
      );
      if (placeholder) {
        placeholder.innerHTML = data;

        // Đảm bảo CSS được áp dụng ngay lập tức sau khi HTML được chèn vào
        if (["header", "navbar", "footer"].includes(componentName)) {
          placeholder.offsetHeight;
        }

        console.log(`Loaded ${componentName} component successfully`);
      } else {
        console.error(
          `Element with id '${componentName}-placeholder' not found`
        );
      }
    })
    .catch((error) => {
      console.error(`Error loading ${componentName} component:`, error);
    });
}

// ===========================================
//   SECTION: ABOUT-US - Phần giới thiệu
// ===========================================

/**
 * Khởi tạo hiệu ứng animation cho section about-us
 * - Main image: xuất hiện từ trên xuống (đầu tiên)
 * - Thumbnails: xuất hiện từ trái qua phải (lần lượt)
 */
function initAboutUsAnimations() {
  const aboutUsSection = document.querySelector(".about-us");
  if (!aboutUsSection) return;

  // Lấy tất cả các phần tử ảnh
  const mainImage = document.querySelector(".about-visual .main-image img");
  const thumbnails = document.querySelectorAll(
    ".about-visual .project-thumbnails .thumbnail img"
  );

  // Lưu trữ src các ảnh
  let imageSrcs = [
    "./assets/images/index_images/about1.png",
    "./assets/images/index_images/about2.png",
    "./assets/images/index_images/about3.png",
    "./assets/images/index_images/about4.png",
  ];

  // Thiết lập trạng thái ban đầu - ẩn tất cả ảnh
  if (mainImage) {
    mainImage.style.opacity = "0";
    mainImage.style.transform = "translateY(-30px) scale(1)";
    mainImage.style.transition = "all 0.8s cubic-bezier(0.4,0,0.2,1)";
    mainImage.style.zIndex = "2";
    mainImage.src = imageSrcs[0]; // always show about1 first
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.style.opacity = "0";
    thumbnail.style.transform = "translateX(-50px) scale(1)";
    thumbnail.style.transition = `all 0.8s cubic-bezier(0.4,0,0.2,1) ${
      index * 0.2
    }s`;
    thumbnail.style.zIndex = "1";
    thumbnail.src = imageSrcs[index + 1]; // thumbnails show about2,3,4
  });

  // Intersection Observer để kích hoạt animation khi section vào view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animation ảnh chính trước
          if (mainImage) {
            setTimeout(() => {
              mainImage.style.opacity = "1";
              mainImage.style.transform = "translateY(0) scale(1)";
            }, 200);
          }

          // Animation thumbnails từ trái qua phải
          thumbnails.forEach((thumbnail, index) => {
            setTimeout(() => {
              thumbnail.style.opacity = "1";
              thumbnail.style.transform = "translateX(0) scale(1)";
            }, 800 + index * 200);
          });

          // Sau khi hiệu ứng ban đầu hoàn thành, bắt đầu hiệu ứng swap
          setTimeout(() => {
            startMainImageSwap();
          }, 800 + thumbnails.length * 200 + 500);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  observer.observe(aboutUsSection);

  // Hàm hiệu ứng swap main-image với thumbnail tương ứng
  function startMainImageSwap() {
    if (!mainImage || thumbnails.length === 0) return;
    let currentIndex = 0; // always start from about1
    function swapNext() {
      // mainImage hiện tại là imageSrcs[currentIndex]
      // thumbnails là các ảnh còn lại
      // Swap mainImage với thumbnail tiếp theo
      let nextIndex = (currentIndex + 1) % imageSrcs.length;
      // Tìm thumbnail có src = imageSrcs[nextIndex]
      let thumbToSwap = Array.from(thumbnails).find((t) =>
        t.src.includes(imageSrcs[nextIndex].split("/").pop())
      );
      if (!thumbToSwap) return;
      // Fade out mainImage
      mainImage.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
      mainImage.style.opacity = "0";
      thumbToSwap.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
      thumbToSwap.style.opacity = "0.5";
      setTimeout(() => {
        // Swap src
        let temp = mainImage.src;
        mainImage.src = thumbToSwap.src;
        thumbToSwap.src = temp;
        // Fade in mainImage, thumbnails
        mainImage.style.opacity = "1";
        thumbToSwap.style.opacity = "1";
        // Cập nhật index
        currentIndex = nextIndex;
      }, 400);
      setTimeout(swapNext, 2500);
    }
    setTimeout(swapNext, 2000);
  }
}

// ===========================================
//   UI ENHANCEMENTS - Các tính năng UI nâng cao
// ===========================================

/**
 * Khởi tạo nút cuộn lên đầu trang
 * - Hiển thị khi cuộn xuống 300px
 * - Ẩn khi ở đầu trang
 * - Smooth scroll khi click
 */
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (!scrollToTopBtn) return;

  // Hiển thị/ẩn nút dựa trên vị trí cuộn
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll lên đầu trang khi click
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Khởi tạo trạng thái active cho navbar
 * - Thêm class active cho link hiện tại
 * - Cập nhật khi cuộn đến section tương ứng
 */
function initNavbarActiveState() {
  const navLinks = document.querySelectorAll(".navbar-list a");
  const sections = document.querySelectorAll("section[id]");

  // Nếu không có section với id, tạo mapping thủ công
  const sectionMapping = {
    "trang-chu": ".header-slider",
    "gioi-thieu": ".about-us",
    "dich-vu": ".main-services",
    "du-an": ".our-project",
    "lien-he": ".contact-form",
  };

  function updateActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Fallback: kiểm tra theo vị trí cuộn
    if (!current) {
      const scrollPos = window.pageYOffset;

      if (scrollPos < 500) current = "trang-chu";
      else if (scrollPos < 1000) current = "gioi-thieu";
      else if (scrollPos < 2000) current = "dich-vu";
      else if (scrollPos < 3000) current = "du-an";
      else current = "lien-he";
    }

    // Cập nhật class active
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === `#${current}` ||
        link.textContent.toLowerCase().includes(current.replace("-", " "))
      ) {
        link.classList.add("active");
      }
    });
  }

  // Cập nhật khi cuộn
  window.addEventListener("scroll", updateActiveNavLink);

  // Cập nhật ban đầu
  updateActiveNavLink();
}

// ===========================================
//   SECTION: MAIN-SERVICES - Phần dịch vụ chính
// ===========================================

/**
 * Khởi tạo slider dịch vụ với auto-scroll
 * - Hiển thị 3 card cùng lúc
 * - Tự động chuyển slide mỗi 3 giây
 * - Loop vô hạn
 */
function initServicesSlider() {
  const sliderTrack = document.getElementById("slider-track");
  if (!sliderTrack) return;

  let currentIndex = 0;
  const totalCards = 6;
  const visibleCards = 3;
  const cardWidth = 100 / visibleCards; // 33.333%

  // Clone 3 card đầu tiên và thêm vào cuối để loop mượt
  const cards = sliderTrack.querySelectorAll(".service-card");
  for (let i = 0; i < visibleCards; i++) {
    const clonedCard = cards[i].cloneNode(true);
    sliderTrack.appendChild(clonedCard);
  }

  function moveSlider() {
    currentIndex++;

    // Reset về đầu khi đã hiển thị hết card gốc
    if (currentIndex >= totalCards) {
      currentIndex = 0;
    }

    const translateX = -currentIndex * cardWidth;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Auto-scroll mỗi 3 giây
  setInterval(moveSlider, 3000);
}

// ===========================================
//   SECTION: OUR-PROJECT - Phần dự án
// ===========================================

/**
 * Khởi tạo chức năng lọc dự án theo tab
 * - Click tab để lọc dự án theo danh mục
 * - Hiệu ứng fade in khi chuyển đổi
 */
function initProjectFilter() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const projectCards = document.querySelectorAll(".project-card");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa class active khỏi tất cả button
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Thêm class active vào button được click
      this.classList.add("active");

      // Lấy giá trị filter
      const filter = this.getAttribute("data-filter");

      // Lọc project cards
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ===========================================
//   SECTION: FEEDBACK-COMPANY - Phần phản hồi khách hàng
// ===========================================

/**
 * Khởi tạo slider phản hồi với auto-scroll và điều khiển thủ công
 * - Hiển thị 3 video card cùng lúc
 * - Tự động chuyển slide mỗi 3 giây
 * - Có nút prev/next để điều khiển thủ công
 * - Tạm dừng khi hover
 */
function initFeedbackSlider() {
  const sliderTrack = document.querySelector(".feedback-slider .slider-track");
  const videoCards = document.querySelectorAll(".feedback-slider .video-card");
  const prevBtn = document.querySelector(".feedback-slider .prev-btn");
  const nextBtn = document.querySelector(".feedback-slider .next-btn");

  if (!sliderTrack || videoCards.length === 0) return;

  let currentIndex = 0;
  const totalCards = videoCards.length;
  const visibleCards = 3;
  let autoSlideInterval;

  // Clone 3 card đầu tiên và thêm vào cuối để loop mượt
  for (let i = 0; i < visibleCards; i++) {
    const clonedCard = videoCards[i].cloneNode(true);
    sliderTrack.appendChild(clonedCard);
  }

  function updateSlider() {
    const translateX = -currentIndex * (100 / visibleCards);
    sliderTrack.style.transform = `translateX(${translateX}%)`;
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalCards) {
      currentIndex = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalCards - 1;
    }
    updateSlider();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  // Tạm dừng khi hover
  const sliderContainer = document.querySelector(
    ".feedback-slider .slider-container"
  );
  sliderContainer.addEventListener("mouseenter", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);

  // Bắt đầu auto-slide
  startAutoSlide();
}

// ===========================================
//   SECTION: SHARING-BLOG - Phần chia sẻ bài viết
// ===========================================

/**
 * Khởi tạo slideshow cho section chia sẻ bài viết
 * - Hiển thị bài viết nổi bật (featured-post) và các bài viết gần đây (recent-posts)
 * - Tự động chuyển bài viết nổi bật mỗi 3 giây
 * - Các bài viết gần đây sẽ lần lượt thế chỗ vào vị trí bài viết nổi bật
 */
function initSharingBlogSlideshow() {
  const featuredImg = document.querySelector(".featured-post .post-image img");
  const featuredTitle = document.querySelector(".featured-post .post-title");
  const featuredExcerpt = document.querySelector(
    ".featured-post .post-excerpt"
  );
  const recentPosts = document.querySelectorAll(".recent-posts .post-card");

  if (
    !featuredImg ||
    !featuredTitle ||
    !featuredExcerpt ||
    recentPosts.length === 0
  )
    return;

  // Lưu trữ thông tin các post-card
  let posts = [
    {
      img: featuredImg.src,
      title: featuredTitle.textContent,
      excerpt: featuredExcerpt.textContent,
    },
    ...Array.from(recentPosts).map((card) => {
      return {
        img: card.querySelector(".post-image img").src,
        title: card.querySelector(".post-title").textContent,
        excerpt: card.querySelector(".post-excerpt").textContent,
      };
    }),
  ];

  let currentIndex = 0; // featured-post luôn là posts[0]

  function showNextPost() {
    // Fade out featured
    featuredImg.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
    featuredTitle.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
    featuredExcerpt.style.transition = "all 0.5s cubic-bezier(0.4,0,0.2,1)";
    featuredImg.style.opacity = "0";
    featuredTitle.style.opacity = "0";
    featuredExcerpt.style.opacity = "0";
    setTimeout(() => {
      // Xác định index tiếp theo trong recentPosts
      let nextIndex = (currentIndex + 1) % recentPosts.length;
      // Lưu lại featured hiện tại
      let currentFeatured = {
        img: featuredImg.src,
        title: featuredTitle.textContent,
        excerpt: featuredExcerpt.textContent,
      };
      // Lấy thông tin post-card tiếp theo
      let nextCard = recentPosts[nextIndex];
      let nextCardData = {
        img: nextCard.querySelector(".post-image img").src,
        title: nextCard.querySelector(".post-title").textContent,
        excerpt: nextCard.querySelector(".post-excerpt").textContent,
      };
      // Đổi nội dung featured sang post-card tiếp theo
      featuredImg.src = nextCardData.img;
      featuredTitle.textContent = nextCardData.title;
      featuredExcerpt.textContent = nextCardData.excerpt;
      // Đổi featured cũ về đúng vị trí post-card tiếp theo
      nextCard.querySelector(".post-image img").src = currentFeatured.img;
      nextCard.querySelector(".post-title").textContent = currentFeatured.title;
      nextCard.querySelector(".post-excerpt").textContent =
        currentFeatured.excerpt;
      // Fade in
      featuredImg.style.opacity = "1";
      featuredTitle.style.opacity = "1";
      featuredExcerpt.style.opacity = "1";
      currentIndex = nextIndex;
    }, 400);
    setTimeout(showNextPost, 3000);
  }
  setTimeout(showNextPost, 2000);
}

// ===========================================
//   INITIALIZATION - Khởi tạo khi DOM ready
// ===========================================

document.addEventListener("DOMContentLoaded", function () {
  // Load các component chung
  loadComponent("header", "components/header.html");
  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");

  // Khởi tạo các section theo thứ tự
  initAboutUsAnimations(); // Section: About Us
  initServicesSlider(); // Section: Main Services
  initProjectFilter(); // Section: Our Project
  initFeedbackSlider(); // Section: Feedback Company
  initSharingBlogSlideshow(); // Section: Sharing Blog

  // Khởi tạo các tính năng UI
  initScrollToTop(); // Nút cuộn lên đầu
  initNavbarActiveState(); // Trạng thái active navbar
});
