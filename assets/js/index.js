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
    "../assets/images/index_images/about1.png",
    "../assets/images/index_images/about2.png",
    "../assets/images/index_images/about3.png",
    "../assets/images/index_images/about4.png",
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

// ===========================================
//   SECTION: MAIN-SERVICES - Phần dịch vụ chính
// ===========================================

/**
 * Khởi tạo slider dịch vụ với auto-scroll
 * - Desktop: Hiển thị 3 card cùng lúc
 * - Mobile: Hiển thị 1 card tại một thời điểm
 * - Tự động chuyển slide mỗi 3 giây
 * - Loop vô hạn
 */
function initServicesSlider() {
  const sliderTrack = document.getElementById("slider-track");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");

  if (!sliderTrack) return;

  let currentIndex = 0;
  const totalCards = 6;
  let autoSlideInterval;

  // Kiểm tra kích thước màn hình để xác định số card hiển thị
  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  const visibleCards = getVisibleCards();
  const cardWidth = 100 / visibleCards;

  // Clone cards để loop mượt
  const cards = sliderTrack.querySelectorAll(".service-card");
  for (let i = 0; i < visibleCards; i++) {
    const clonedCard = cards[i].cloneNode(true);
    sliderTrack.appendChild(clonedCard);
  }

  function moveSlider(direction = "next") {
    if (direction === "next") {
      currentIndex++;
      // Reset về đầu khi đã hiển thị hết card gốc
      if (currentIndex >= totalCards) {
        currentIndex = 0;
      }
    } else {
      currentIndex--;
      // Reset về cuối khi đã hiển thị hết card gốc
      if (currentIndex < 0) {
        currentIndex = totalCards - 1;
      }
    }

    const translateX = -currentIndex * cardWidth;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Navigation button events
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      moveSlider("prev");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 3000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      moveSlider("next");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 3000);
    });
  }

  // Auto-scroll mỗi 3 giây
  autoSlideInterval = setInterval(() => moveSlider("next"), 3000);

  // Xử lý khi resize window
  window.addEventListener("resize", function () {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      // Reload slider khi chuyển đổi giữa desktop/mobile
      location.reload();
    }
  });
}

// ===========================================
//   SECTION: OUR-PROJECT - Phần dự án
// ===========================================

/**
 * Khởi tạo tính năng xem thêm dự án trên mobile
 * - Chỉ hiển thị 3 dự án đầu tiên trên mobile
 * - Nút "Xem thêm" để hiển thị các dự án còn lại
 * - Nút "Rút gọn" để ẩn lại các dự án thừa
 */
function initProjectViewMore() {
  const viewMoreBtn = document.getElementById("projectViewMoreBtn");
  const hiddenCards = document.querySelectorAll(".project-card-hidden");
  const viewMoreText = viewMoreBtn?.querySelector(".view-more-text");
  const viewMoreIcon = viewMoreBtn?.querySelector(".view-more-icon");

  // Debug log
  console.log("Project View More Debug:", {
    viewMoreBtn: !!viewMoreBtn,
    hiddenCards: hiddenCards.length,
    viewMoreText: !!viewMoreText,
    viewMoreIcon: !!viewMoreIcon,
  });

  if (!viewMoreBtn || !hiddenCards.length) {
    console.log("Project View More: Missing elements, skipping initialization");
    return;
  }

  let isExpanded = false;

  // Function to show hidden cards
  function showMoreProjects() {
    hiddenCards.forEach((card) => {
      card.style.display = "block";
      card.classList.remove("project-card-hidden");
      card.classList.add("project-card-visible");
    });

    if (viewMoreText) viewMoreText.textContent = "Rút gọn";
    if (viewMoreIcon) viewMoreIcon.style.transform = "rotate(180deg)";
    viewMoreBtn.classList.add("expanded");
    isExpanded = true;
  }

  // Function to hide extra cards
  function hideExtraProjects() {
    hiddenCards.forEach((card) => {
      card.style.display = "none";
      card.classList.remove("project-card-visible");
      card.classList.add("project-card-hidden");
    });

    if (viewMoreText) viewMoreText.textContent = "Xem thêm";
    if (viewMoreIcon) viewMoreIcon.style.transform = "rotate(0deg)";
    viewMoreBtn.classList.remove("expanded");
    isExpanded = false;
  }

  // Toggle function
  function toggleProjects() {
    if (isExpanded) {
      hideExtraProjects();
    } else {
      showMoreProjects();
    }
  }

  // Event listener
  viewMoreBtn.addEventListener("click", toggleProjects);

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // Desktop: show all projects, hide button
      hiddenCards.forEach((card) => {
        card.style.display = "block";
        card.classList.remove("project-card-hidden");
        card.classList.add("project-card-visible");
      });
      viewMoreBtn.style.display = "none";
    } else {
      // Mobile: show button, hide extra projects if not expanded
      viewMoreBtn.style.display = "inline-flex";
      if (!isExpanded) {
        hideExtraProjects();
      }
    }
  });

  // Force show button on mobile
  function forceShowButton() {
    if (window.innerWidth <= 768) {
      viewMoreBtn.style.display = "inline-flex";
      viewMoreBtn.style.visibility = "visible";
      viewMoreBtn.style.opacity = "1";
    }
  }

  // Initial state
  if (window.innerWidth <= 768) {
    hideExtraProjects();
    forceShowButton();
  } else {
    viewMoreBtn.style.display = "none";
  }

  // Force show button after a short delay to ensure DOM is ready
  setTimeout(forceShowButton, 100);
}

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

      // Update mobile dropdown
      updateMobileDropdown(filter, this.textContent);
    });
  });

  // Initialize mobile horizontal scroll tabs
  initProjectMobileTabs();
}

function initProjectMobileTabs() {
  const mobileTabButtons = document.querySelectorAll(
    ".project-tabs-mobile .tab-btn"
  );

  if (!mobileTabButtons.length) return;

  // Handle mobile tab selection
  mobileTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active states for mobile tabs
      mobileTabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Also update desktop tabs to keep them in sync
      const desktopTabButtons = document.querySelectorAll(
        ".project-tabs .tab-btn"
      );
      desktopTabButtons.forEach((btn) => {
        if (btn.getAttribute("data-filter") === filter) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Filter projects
      filterProjects(filter);
    });
  });
}

function filterProjects(filter) {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const category = card.getAttribute("data-category");

    if (filter === "all" || category === filter) {
      card.style.display = "block";
      card.style.animation = "fadeIn 0.5s ease-in-out";
    } else {
      card.style.display = "none";
    }
  });

  // Update both desktop and mobile tabs to keep them in sync
  const allTabButtons = document.querySelectorAll(
    ".project-tabs .tab-btn, .project-tabs-mobile .tab-btn"
  );
  allTabButtons.forEach((btn) => {
    if (btn.getAttribute("data-filter") === filter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// ===========================================
//   SECTION: PRESS - Phần báo chí
// ===========================================

/**
 * Khởi tạo slider báo chí với auto-scroll và điều khiển thủ công
 * - Hiển thị 3 video card cùng lúc
 * - Tự động chuyển slide mỗi 3 giây
 * - Có nút prev/next để điều khiển thủ công
 * - Tạm dừng khi hover
 */
function initPressSlider() {
  const sliderTrack = document.getElementById("press-slider-track");
  const prevBtn = document.getElementById("pressPrev");
  const nextBtn = document.getElementById("pressNext");

  if (!sliderTrack) return;

  let currentIndex = 0;
  const totalCards = 6;
  let autoSlideInterval;

  // Kiểm tra kích thước màn hình để xác định số card hiển thị
  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  const visibleCards = getVisibleCards();
  const cardWidth = 100 / visibleCards;

  // Clone cards để loop mượt
  const cards = sliderTrack.querySelectorAll(".video-card");
  for (let i = 0; i < visibleCards; i++) {
    const clonedCard = cards[i].cloneNode(true);
    sliderTrack.appendChild(clonedCard);
  }

  function moveSlider(direction = "next") {
    if (direction === "next") {
      currentIndex++;
      // Reset về đầu khi đã hiển thị hết card gốc
      if (currentIndex >= totalCards) {
        currentIndex = 0;
      }
    } else {
      currentIndex--;
      // Reset về cuối khi đã hiển thị hết card gốc
      if (currentIndex < 0) {
        currentIndex = totalCards - 1;
      }
    }

    const translateX = -currentIndex * cardWidth;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Navigation button events
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      moveSlider("prev");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 3000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      moveSlider("next");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 3000);
    });
  }

  // Auto-scroll mỗi 3 giây
  autoSlideInterval = setInterval(() => moveSlider("next"), 3000);

  // Xử lý khi resize window
  window.addEventListener("resize", function () {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      // Reload slider khi chuyển đổi giữa desktop/mobile
      location.reload();
    }
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
  const sliderTrack = document.getElementById("feedback-slider-track");
  const prevBtn = document.getElementById("feedbackPrev");
  const nextBtn = document.getElementById("feedbackNext");

  if (!sliderTrack) return;

  let currentIndex = 0;
  const totalCards = 6;
  let autoSlideInterval;

  // Kiểm tra kích thước màn hình để xác định số card hiển thị
  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  const visibleCards = getVisibleCards();
  const cardWidth = 100 / visibleCards;

  // Clone cards để loop mượt
  const cards = sliderTrack.querySelectorAll(".video-card");
  for (let i = 0; i < visibleCards; i++) {
    const clonedCard = cards[i].cloneNode(true);
    sliderTrack.appendChild(clonedCard);
  }

  function moveSlider(direction = "next") {
    if (direction === "next") {
      currentIndex++;
      // Reset về đầu khi đã hiển thị hết card gốc
      if (currentIndex >= totalCards) {
        currentIndex = 0;
      }
    } else {
      currentIndex--;
      // Reset về cuối khi đã hiển thị hết card gốc
      if (currentIndex < 0) {
        currentIndex = totalCards - 1;
      }
    }

    const translateX = -currentIndex * cardWidth;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Navigation button events
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      moveSlider("prev");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 3000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      moveSlider("next");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 3000);
    });
  }

  // Auto-scroll mỗi 3 giây
  autoSlideInterval = setInterval(() => moveSlider("next"), 3000);

  // Xử lý khi resize window
  window.addEventListener("resize", function () {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      // Reload slider khi chuyển đổi giữa desktop/mobile
      location.reload();
    }
  });
}

// ===========================================
//   SECTION: TEAM-EXPERTS - Phần đội ngũ chuyên gia
// ===========================================

/**
 * Khởi tạo slider cho đội ngũ chuyên gia
 * - Desktop: Hiển thị 4 expert cards cùng lúc (grid)
 * - Mobile: Hiển thị 1 expert card tại một thời điểm (slider)
 * - Tự động chuyển slide mỗi 4 giây
 * - Clone cards để loop mượt mà
 */
function initExpertsSlider() {
  const sliderTrack = document.getElementById("experts-slider-track");
  const prevBtn = document.getElementById("expertsPrev");
  const nextBtn = document.getElementById("expertsNext");

  if (!sliderTrack) return;

  let currentIndex = 0;
  const totalCards = 4;
  let autoSlideInterval;

  // Kiểm tra kích thước màn hình để xác định số card hiển thị
  function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 4;
  }

  const visibleCards = getVisibleCards();
  const cardWidth = 100 / visibleCards;

  // Clone cards để loop mượt
  const cards = sliderTrack.querySelectorAll(".expert-card");
  for (let i = 0; i < visibleCards; i++) {
    const clonedCard = cards[i].cloneNode(true);
    sliderTrack.appendChild(clonedCard);
  }

  function moveSlider(direction = "next") {
    if (direction === "next") {
      currentIndex++;
      // Reset về đầu khi đã hiển thị hết card gốc
      if (currentIndex >= totalCards) {
        currentIndex = 0;
      }
    } else {
      currentIndex--;
      // Reset về cuối khi đã hiển thị hết card gốc
      if (currentIndex < 0) {
        currentIndex = totalCards - 1;
      }
    }

    const translateX = -currentIndex * cardWidth;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Navigation button events
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      moveSlider("prev");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 4000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      moveSlider("next");
      // Reset auto-slide timer
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => moveSlider("next"), 4000);
    });
  }

  // Auto-scroll mỗi 4 giây (chậm hơn services slider)
  autoSlideInterval = setInterval(() => moveSlider("next"), 4000);

  // Xử lý khi resize window
  window.addEventListener("resize", function () {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      // Reload slider khi chuyển đổi giữa desktop/mobile
      location.reload();
    }
  });
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
//   SECTION: SHARING BLOG - Phần chia sẻ blog
// ===========================================

/**
 * Dữ liệu bài viết cho các danh mục
 */
const blogData = {
  news: [
    {
      img: "../assets/images/index_images/worker_1.png",
      title: "Thiết kế biệt thự cao cấp",
      excerpt:
        "Khám phá những xu hướng thiết kế nội thất mới nhất cho biệt thự cao cấp. Từ phong cách hiện đại đến cổ điển, chúng tôi mang đến những giải pháp thiết kế độc đáo và sang trọng.",
      date: "15/12/2024",
      views: 1250,
    },
    {
      img: "../assets/images/index_images/worker_2.png",
      title: "Hoàn thiện biệt thự",
      excerpt:
        "Quy trình hoàn thiện biệt thự từ A-Z với những bước quan trọng và lưu ý cần thiết để có được ngôi nhà hoàn hảo.",
      date: "12/12/2024",
      views: 980,
    },
    {
      img: "../assets/images/index_images/worker_3.png",
      title: "Thiết kế nội thất",
      excerpt:
        "Những xu hướng thiết kế nội thất hot nhất 2024, giúp không gian sống trở nên hiện đại và tiện nghi hơn.",
      date: "10/12/2024",
      views: 1560,
    },
    {
      img: "../assets/images/index_images/worker_4.png",
      title: "Xây dựng nhà phố",
      excerpt:
        "Kinh nghiệm xây dựng nhà phố tiết kiệm chi phí mà vẫn đảm bảo chất lượng và thẩm mỹ cao nhất.",
      date: "08/12/2024",
      views: 2100,
    },
    {
      img: "../assets/images/index_images/worker_5.png",
      title: "Sửa chữa nhà cũ",
      excerpt:
        "Cách cải tạo nhà cũ thành không gian mới hiện đại, nâng cấp toàn diện với chi phí hợp lý nhất.",
      date: "05/12/2024",
      views: 1850,
    },
  ],
  "xay-nha-tron-goi": [
    {
      img: "../assets/images/index_images/worker_1.png",
      title: "Xây nhà trọn gói - Giải pháp hoàn hảo cho mọi gia đình",
      excerpt:
        "Dịch vụ xây nhà trọn gói từ A-Z với cam kết chất lượng, tiến độ và chi phí minh bạch. Từ thiết kế đến hoàn thiện, chúng tôi đồng hành cùng bạn.",
      date: "10/06/2025",
      views: 866,
    },
    {
      img: "../assets/images/index_images/worker_2.png",
      title: "Quy trình xây nhà trọn gói - Những bước quan trọng",
      excerpt:
        "Tìm hiểu quy trình xây nhà trọn gói từ khảo sát, thiết kế, thi công đến hoàn thiện. Những bước quan trọng và lưu ý cần thiết để có ngôi nhà hoàn hảo.",
      date: "23/07/2025",
      views: 307,
    },
    {
      img: "../assets/images/index_images/worker_3.png",
      title: "Chi phí xây nhà trọn gói - Bảng giá chi tiết 2025",
      excerpt:
        "Tham khảo bảng giá xây nhà trọn gói chi tiết năm 2025, bao gồm tất cả các hạng mục từ móng đến hoàn thiện. Minh bạch, rõ ràng, không phát sinh.",
      date: "10/05/2025",
      views: 1692,
    },
    {
      img: "../assets/images/index_images/worker_4.png",
      title: "Cam kết chất lượng xây nhà trọn gói",
      excerpt:
        "Những cam kết chất lượng của dịch vụ xây nhà trọn gói: vật liệu chính hãng, đội ngũ thợ lành nghề, bảo hành dài hạn và hỗ trợ 24/7.",
      date: "03/09/2025",
      views: 1855,
    },
  ],
  "sua-nha-tron-goi": [
    {
      img: "../assets/images/index_images/worker_5.png",
      title: "Sửa nhà trọn gói - Cải tạo toàn diện",
      excerpt:
        "Dịch vụ sửa nhà trọn gói chuyên nghiệp, cải tạo toàn diện từ kết cấu đến nội thất. Biến ngôi nhà cũ thành không gian sống hiện đại, tiện nghi và đẹp mắt.",
      date: "20/11/2024",
      views: 3240,
    },
    {
      img: "../assets/images/index_images/worker_1.png",
      title: "Lợi ích sửa nhà trọn gói",
      excerpt:
        "Khám phá những lợi ích vượt trội của dịch vụ sửa nhà trọn gói: tiết kiệm thời gian, chi phí hợp lý, đảm bảo chất lượng và có bảo hành dài hạn.",
      date: "18/11/2024",
      views: 2890,
    },
    {
      img: "../assets/images/index_images/worker_2.png",
      title: "Quy trình sửa nhà trọn gói",
      excerpt:
        "Tìm hiểu quy trình sửa nhà trọn gói từ khảo sát, đánh giá tình trạng, lập kế hoạch đến thi công và hoàn thiện. Đảm bảo chất lượng và tiến độ.",
      date: "15/11/2024",
      views: 2150,
    },
    {
      img: "../assets/images/index_images/worker_3.png",
      title: "Chi phí sửa nhà trọn gói - Bảng giá 2025",
      excerpt:
        "Tham khảo bảng giá sửa nhà trọn gói chi tiết năm 2025, bao gồm các hạng mục cải tạo từ cơ bản đến nâng cấp toàn diện. Minh bạch, rõ ràng.",
      date: "12/11/2024",
      views: 1980,
    },
  ],
  "thiet-ke-nha": [
    {
      img: "../assets/images/index_images/worker_4.png",
      title: "Thiết kế nhà - Kiến trúc hiện đại",
      excerpt:
        "Dịch vụ thiết kế nhà chuyên nghiệp với những mẫu kiến trúc hiện đại, tối ưu không gian và phù hợp với phong thủy. Tạo nên ngôi nhà đẹp, tiện nghi và bền vững.",
      date: "25/11/2024",
      views: 1450,
    },
    {
      img: "../assets/images/index_images/worker_5.png",
      title: "Mẫu thiết kế nhà đẹp 2025",
      excerpt:
        "Bộ sưu tập những mẫu thiết kế nhà đẹp nhất năm 2025, từ nhà phố, biệt thự đến nhà vườn. Thiết kế hiện đại, tối ưu không gian và phù hợp với khí hậu Việt Nam.",
      date: "22/11/2024",
      views: 1200,
    },
    {
      img: "../assets/images/index_images/worker_1.png",
      title: "Quy trình thiết kế nhà chuyên nghiệp",
      excerpt:
        "Tìm hiểu quy trình thiết kế nhà chuyên nghiệp từ khảo sát, lên ý tưởng, thiết kế 3D đến bản vẽ thi công. Đảm bảo tính khả thi và thẩm mỹ cao.",
      date: "20/11/2024",
      views: 1680,
    },
    {
      img: "../assets/images/index_images/worker_2.png",
      title: "Chi phí thiết kế nhà - Bảng giá 2025",
      excerpt:
        "Tham khảo bảng giá thiết kế nhà chi tiết năm 2025, bao gồm thiết kế kiến trúc, kết cấu, M&E. Minh bạch, rõ ràng và phù hợp với mọi ngân sách.",
      date: "18/11/2024",
      views: 1320,
    },
  ],
  "phong-thuy": [
    {
      img: "../assets/images/index_images/worker_5.png",
      title: "Phong thủy nhà ở: 10 nguyên tắc vàng cho ngôi nhà hạnh phúc",
      excerpt:
        "Khám phá những nguyên tắc phong thủy cơ bản giúp tạo ra không gian sống hài hòa, mang lại may mắn và hạnh phúc cho gia đình.",
      date: "20/11/2024",
      views: 3240,
    },
    {
      img: "../assets/images/index_images/worker_1.png",
      title: "Hướng nhà hợp tuổi: Cách chọn hướng nhà theo phong thủy",
      excerpt:
        "Hướng dẫn chi tiết cách chọn hướng nhà phù hợp với tuổi và mệnh của gia chủ để mang lại tài lộc và sức khỏe.",
      date: "18/11/2024",
      views: 2890,
    },
    {
      img: "../assets/images/index_images/worker_2.png",
      title: "Phong thủy phòng khách: Bố trí nội thất đúng cách",
      excerpt:
        "Những quy tắc phong thủy quan trọng khi bố trí phòng khách để tạo ra không gian đón khách lý tưởng và thu hút tài lộc.",
      date: "15/11/2024",
      views: 2150,
    },
    {
      img: "../assets/images/index_images/worker_3.png",
      title: "Cây phong thủy trong nhà: Top 15 loại cây mang lại may mắn",
      excerpt:
        "Danh sách những loại cây phong thủy tốt nhất để trồng trong nhà, giúp thanh lọc không khí và mang lại năng lượng tích cực.",
      date: "12/11/2024",
      views: 1980,
    },
  ],
  khac: [
    {
      img: "../assets/images/index_images/worker_4.png",
      title: "Vật liệu xây dựng: Lựa chọn đúng cho ngôi nhà bền vững",
      excerpt:
        "Hướng dẫn lựa chọn vật liệu xây dựng chất lượng, phù hợp với khí hậu và đảm bảo độ bền vững cho ngôi nhà của bạn.",
      date: "28/11/2024",
      views: 1650,
    },
    {
      img: "../assets/images/index_images/worker_5.png",
      title: "Bảo trì nhà ở: Những việc cần làm định kỳ",
      excerpt:
        "Danh sách những công việc bảo trì nhà ở cần thực hiện định kỳ để đảm bảo ngôi nhà luôn trong tình trạng tốt nhất.",
      date: "25/11/2024",
      views: 1420,
    },
    {
      img: "../assets/images/index_images/worker_1.png",
      title: "Xu hướng nội thất 2025: Những phong cách hot nhất",
      excerpt:
        "Khám phá những xu hướng nội thất mới nhất năm 2025, từ màu sắc, chất liệu đến phong cách trang trí hiện đại.",
      date: "22/11/2024",
      views: 1890,
    },
    {
      img: "../assets/images/index_images/worker_2.png",
      title: "Tiết kiệm năng lượng: Cách làm nhà xanh, tiết kiệm",
      excerpt:
        "Những giải pháp tiết kiệm năng lượng hiệu quả cho ngôi nhà, từ thiết kế đến sử dụng các thiết bị thông minh.",
      date: "20/11/2024",
      views: 1560,
    },
  ],
};

/**
 * Khởi tạo chức năng chuyển đổi danh mục blog
 * - Click vào category button để hiển thị bài viết tương ứng
 * - Hiển thị layout 2x2 cho các bài viết
 */
function initBlogCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const blogContent = document.querySelector(".blog-content");

  if (!categoryButtons.length || !blogContent) return;

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa class active khỏi tất cả button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Thêm class active vào button được click
      this.classList.add("active");

      // Lấy category từ data-category hoặc text content
      let category = this.getAttribute("data-category");
      if (!category) {
        const text = this.textContent.trim();
        if (text === "Xây nhà trọn gói") {
          category = "xay-nha-tron-goi";
        } else if (text === "Sửa nhà trọn gói") {
          category = "sua-nha-tron-goi";
        } else if (text === "Thiết kế nhà") {
          category = "thiet-ke-nha";
        } else if (text === "Phong thủy") {
          category = "phong-thuy";
        } else if (text === "Khác") {
          category = "khac";
        } else if (text === "Tin tức") {
          category = "news";
        }
      }

      // Gọi hàm filter blog (sử dụng chung cho cả desktop và mobile)
      filterBlogByCategory(category);
    });
  });
}

/**
 * Hiển thị bài viết theo danh mục
 * @param {string} category - Danh mục bài viết
 */
function displayBlogPosts(category) {
  const posts = blogData[category] || blogData.news;
  const blogContent = document.querySelector(".blog-content");

  if (!blogContent) return;

  // Tạo HTML cho tất cả các mục với giao diện đồng bộ (layout 2 cột)
  const postsHTML = `
    <!-- Left Column - Featured Post -->
    <div class="featured-post">
      <div class="post-card featured">
        <div class="post-image">
          <img src="${posts[0].img}" alt="${posts[0].title}">
        </div>
        <div class="post-content">
          <h3 class="post-title">${posts[0].title}</h3>
          <p class="post-excerpt">${posts[0].excerpt}</p>
        </div>
      </div>
    </div>

    <!-- Right Column - Recent Posts -->
    <div class="recent-posts">
      ${posts
        .slice(1)
        .map(
          (post, index) => `
        <div class="post-card">
          <div class="post-image">
            <img src="${post.img}" alt="${post.title}">
          </div>
          <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  // Thay thế nội dung blog
  blogContent.innerHTML = postsHTML;

  // Thêm hiệu ứng fade in
  blogContent.style.opacity = "0";
  setTimeout(() => {
    blogContent.style.opacity = "1";
  }, 100);

  // Khởi tạo slideshow cho tất cả các mục
  setTimeout(() => {
    initSharingBlogSlideshow();
  }, 200);
}

/**
 * Mở bài viết chi tiết (có thể mở trang detail hoặc modal)
 * @param {string} title - Tiêu đề bài viết
 */
function openBlogPost(title) {
  // Có thể chuyển đến trang chi tiết hoặc mở modal
  console.log("Opening blog post:", title);
  // Ví dụ: window.location.href = `./pages/detail_blog.html?title=${encodeURIComponent(title)}`;
}

// ===========================================
//   SECTION: BLOG DROPDOWN - Dropdown menu cho blog categories
// ===========================================

/**
 * Lọc blog theo category (sử dụng chung cho cả desktop và mobile)
 * @param {string} category - Danh mục cần lọc
 */
function filterBlogByCategory(category) {
  // Cập nhật cả desktop và mobile buttons
  const allButtons = document.querySelectorAll(
    ".desktop-categories .category-btn, .filter-tabs-mobile .category-btn"
  );
  allButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active");
    }
  });

  // Hiển thị bài viết theo category
  displayBlogPosts(category);
}

/**
 * Khởi tạo dropdown menu cho blog categories trên mobile
 * - Click để mở/đóng dropdown
 * - Chọn option để cập nhật text và đóng dropdown
 * - Click outside để đóng dropdown
 */
function initBlogMobileTabs() {
  const mobileTabButtons = document.querySelectorAll(
    ".filter-tabs-mobile .category-btn"
  );
  const desktopButtons = document.querySelectorAll(
    ".desktop-categories .category-btn"
  );

  if (!mobileTabButtons.length) {
    console.log("Mobile blog tabs not found, retrying...");
    setTimeout(initBlogMobileTabs, 500);
    return;
  }

  console.log("Blog mobile tabs initialized successfully");

  // Handle mobile tab selection
  mobileTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Update active states for mobile tabs
      mobileTabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Also update desktop tabs to keep them in sync
      desktopButtons.forEach((btn) => {
        if (btn.getAttribute("data-category") === category) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Filter blog posts
      filterBlogByCategory(category);
    });
  });
}

// ===========================================
//   SECTION: VIDEO MODAL - Modal phóng to video
// ===========================================

/**
 * Khởi tạo video modal cho press-section và feedback-company
 * - Click vào video để mở modal phóng to
 * - Đóng modal bằng nút close hoặc click overlay
 * - Hỗ trợ keyboard navigation (ESC)
 */
function initVideoModal() {
  const videoModal = document.getElementById("videoModal");
  const videoPlayer = document.getElementById("videoPlayer");
  const videoClose = document.getElementById("videoClose");
  const videoOverlay = document.querySelector(".video-overlay");

  if (!videoModal || !videoPlayer) return;

  // Mở video modal
  function openVideoModal(videoSrc) {
    videoPlayer.src = videoSrc;
    videoModal.classList.add("show");
    document.body.style.overflow = "hidden"; // Ngăn scroll
  }

  // Đóng video modal
  function closeVideoModal() {
    videoModal.classList.remove("show");
    videoPlayer.src = ""; // Dừng video
    document.body.style.overflow = ""; // Khôi phục scroll
  }

  // Event listeners cho các nút điều khiển
  if (videoClose) {
    videoClose.addEventListener("click", closeVideoModal);
  }

  if (videoOverlay) {
    videoOverlay.addEventListener("click", closeVideoModal);
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!videoModal.classList.contains("show")) return;

    if (e.key === "Escape") {
      closeVideoModal();
    }
  });

  // Thêm event listeners cho các video trong press-section
  const pressVideos = document.querySelectorAll(
    ".press-slider .video-thumbnail iframe"
  );
  pressVideos.forEach((video) => {
    // Tạo wrapper để có thể click
    const wrapper = document.createElement("div");
    wrapper.className = "video-click-wrapper";
    wrapper.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 10;
      background: transparent;
    `;

    video.parentElement.style.position = "relative";
    video.parentElement.appendChild(wrapper);

    wrapper.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openVideoModal(video.src);
    });
  });

  // Thêm event listeners cho các video trong feedback-company
  const feedbackVideos = document.querySelectorAll(
    ".feedback-slider .video-thumbnail iframe"
  );
  feedbackVideos.forEach((video) => {
    // Tạo wrapper để có thể click
    const wrapper = document.createElement("div");
    wrapper.className = "video-click-wrapper";
    wrapper.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 10;
      background: transparent;
    `;

    video.parentElement.style.position = "relative";
    video.parentElement.appendChild(wrapper);

    wrapper.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openVideoModal(video.src);
    });
  });
}

// ===========================================
//   SECTION: ABOUT VISUAL LIGHTBOX - Lightbox cho ảnh about
// ===========================================

/**
 * Khởi tạo lightbox gallery cho phần about-visual
 * - Click vào ảnh để mở lightbox
 * - Có thể chuyển đổi giữa các ảnh với nút prev/next
 * - Đóng lightbox bằng nút close hoặc click overlay
 * - Hỗ trợ keyboard navigation (ESC, arrow keys)
 */
function initAboutVisualLightbox() {
  const lightbox = document.getElementById("aboutLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxOverlay = document.querySelector(".lightbox-overlay");
  const lightboxCurrent = document.getElementById("lightboxCurrent");
  const lightboxTotal = document.getElementById("lightboxTotal");

  if (!lightbox || !lightboxImage) return;

  // Danh sách ảnh trong about-visual
  const aboutImages = [
    "../assets/images/index_images/about1.png",
    "../assets/images/index_images/about2.png",
    "../assets/images/index_images/about3.png",
    "../assets/images/index_images/about4.png",
  ];

  let currentImageIndex = 0;

  // Cập nhật ảnh hiện tại trong lightbox
  function updateLightboxImage(index) {
    if (index >= 0 && index < aboutImages.length) {
      currentImageIndex = index;
      lightboxImage.src = aboutImages[currentImageIndex];
      lightboxCurrent.textContent = currentImageIndex + 1;
      lightboxTotal.textContent = aboutImages.length;
    }
  }

  // Mở lightbox
  function openLightbox(index) {
    updateLightboxImage(index);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden"; // Ngăn scroll
  }

  // Đóng lightbox
  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = ""; // Khôi phục scroll
  }

  // Chuyển đến ảnh tiếp theo
  function nextImage() {
    const nextIndex = (currentImageIndex + 1) % aboutImages.length;
    updateLightboxImage(nextIndex);
  }

  // Chuyển đến ảnh trước đó
  function prevImage() {
    const prevIndex =
      currentImageIndex === 0 ? aboutImages.length - 1 : currentImageIndex - 1;
    updateLightboxImage(prevIndex);
  }

  // Event listeners cho các nút điều khiển
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", prevImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", nextImage);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener("click", closeLightbox);
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("show")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "ArrowRight":
        nextImage();
        break;
    }
  });

  // Thêm event listeners cho các ảnh trong about-visual
  const mainImage = document.querySelector(".about-visual .main-image img");
  const thumbnails = document.querySelectorAll(
    ".about-visual .project-thumbnails .thumbnail img"
  );

  if (mainImage) {
    mainImage.style.cursor = "pointer";
    mainImage.addEventListener("click", function () {
      openLightbox(0); // Ảnh chính là ảnh đầu tiên
    });
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.style.cursor = "pointer";
    thumbnail.addEventListener("click", function () {
      openLightbox(index + 1); // Thumbnails bắt đầu từ index 1
    });
  });

  // Thêm hiệu ứng hover cho các ảnh
  const allAboutImages = [mainImage, ...thumbnails];
  allAboutImages.forEach((img) => {
    if (img) {
      img.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
        this.style.transition = "transform 0.3s ease";
      });

      img.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    }
  });
}

// ===========================================
//   SECTION: HEADER SLIDER LIGHTBOX - Lightbox cho ảnh slider chính
// ===========================================

/**
 * Khởi tạo lightbox gallery cho header slider
 * - Click vào ảnh để mở lightbox
 * - Có thể chuyển đổi giữa các ảnh với nút prev/next
 * - Đóng lightbox bằng nút close hoặc click overlay
 * - Hỗ trợ keyboard navigation (ESC, arrow keys)
 */
function initHeaderSliderLightbox() {
  const lightbox = document.getElementById("headerSliderLightbox");
  const lightboxImage = document.getElementById("headerSliderLightboxImage");
  const lightboxClose = document.getElementById("headerSliderLightboxClose");
  const lightboxPrev = document.getElementById("headerSliderLightboxPrev");
  const lightboxNext = document.getElementById("headerSliderLightboxNext");
  const lightboxOverlay = lightbox.querySelector(".lightbox-overlay");
  const lightboxCurrent = document.getElementById(
    "headerSliderLightboxCurrent"
  );
  const lightboxTotal = document.getElementById("headerSliderLightboxTotal");

  if (!lightbox || !lightboxImage) return;

  // Danh sách ảnh trong header slider
  const headerSliderImages = [
    "../public/images/slider_1.png",
    "../public/images/slider_2.png",
    "../public/images/slider_3.png",
    "../public/images/slider_4.png",
  ];

  let currentImageIndex = 0;

  // Cập nhật ảnh hiện tại trong lightbox
  function updateLightboxImage(index) {
    if (index >= 0 && index < headerSliderImages.length) {
      currentImageIndex = index;
      lightboxImage.src = headerSliderImages[currentImageIndex];
      lightboxCurrent.textContent = currentImageIndex + 1;
      lightboxTotal.textContent = headerSliderImages.length;
    }
  }

  // Mở lightbox
  function openLightbox(index) {
    updateLightboxImage(index);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden"; // Ngăn scroll
  }

  // Đóng lightbox
  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = ""; // Khôi phục scroll
  }

  // Chuyển đến ảnh tiếp theo
  function nextImage() {
    const nextIndex = (currentImageIndex + 1) % headerSliderImages.length;
    updateLightboxImage(nextIndex);
  }

  // Chuyển đến ảnh trước đó
  function prevImage() {
    const prevIndex =
      currentImageIndex === 0
        ? headerSliderImages.length - 1
        : currentImageIndex - 1;
    updateLightboxImage(prevIndex);
  }

  // Event listeners cho các nút điều khiển
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", prevImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", nextImage);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener("click", closeLightbox);
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("show")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        prevImage();
        break;
      case "ArrowRight":
        nextImage();
        break;
    }
  });

  // Thêm event listeners cho các ảnh trong header slider
  const headerSlides = document.querySelectorAll(".header-slide img");
  headerSlides.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  // Thêm hiệu ứng hover cho các ảnh
  headerSlides.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1.1)"; // Giữ scale gốc của slider
    });
  });
}

// ===========================================
//   SECTION: HEADER SLIDER - Slider ảnh chính
// ===========================================

/**
 * Khởi tạo slider ảnh chính ở header
 * - Auto-play slider với interval 5 giây
 * - Navigation buttons (prev/next)
 * - Dots indicator
 * - Pause on hover
 * - Keyboard navigation
 */
function initHeaderSlider() {
  const slides = document.querySelectorAll(".header-slide");
  const dots = document.querySelectorAll(".header-dot");
  const prevBtn = document.getElementById("header-slider-prev");
  const nextBtn = document.getElementById("header-slider-next");

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;
  const slideIntervalTime = 3000; // 3 giây

  // Hiển thị slide hiện tại
  function showSlide(index) {
    // Ẩn tất cả slides
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Hiển thị slide hiện tại
    if (slides[index]) {
      slides[index].classList.add("active");
    }
    if (dots[index]) {
      dots[index].classList.add("active");
    }

    currentSlide = index;
  }

  // Chuyển đến slide tiếp theo
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Chuyển đến slide trước đó
  function prevSlide() {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(prevIndex);
  }

  // Bắt đầu auto-play
  function startAutoPlay() {
    // Clear interval cũ trước khi tạo mới
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, slideIntervalTime);
  }

  // Dừng auto-play
  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Event listeners cho navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    });
  }

  // Event listeners cho dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      stopAutoPlay();
      startAutoPlay(); // Restart auto-play
    });
  });

  // Pause on hover và Keyboard navigation
  const sliderContainer = document.querySelector(".header-slider-container");
  if (sliderContainer) {
    // Pause on hover
    sliderContainer.addEventListener("mouseenter", stopAutoPlay);
    sliderContainer.addEventListener("mouseleave", startAutoPlay);

    // Keyboard navigation - chỉ hoạt động khi slider đang focus
    sliderContainer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
      }
    });

    // Thêm tabindex để có thể focus
    sliderContainer.setAttribute("tabindex", "0");
  }

  // Khởi tạo slider
  showSlide(0);
  startAutoPlay();

  // Pause khi tab không active
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      // Chỉ restart nếu slider đang hiển thị
      if (slides.length > 0) {
        startAutoPlay();
      }
    }
  });
}

// ===========================================
//   INITIALIZATION - Khởi tạo khi DOM ready
// ===========================================

document.addEventListener("DOMContentLoaded", function () {
  // Load các component chung
  loadComponent("header", "../components/header.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  // Khởi tạo các section theo thứ tự
  initHeaderSlider(); // Section: Header Slider
  initHeaderSliderLightbox(); // Section: Header Slider Lightbox
  initAboutUsAnimations(); // Section: About Us
  initAboutVisualLightbox(); // Section: About Visual Lightbox
  initServicesSlider(); // Section: Main Services
  initProjectViewMore(); // Section: Project View More
  initProjectFilter(); // Section: Our Project
  initPressSlider(); // Section: Press
  initFeedbackSlider(); // Section: Feedback Company
  initVideoModal(); // Section: Video Modal
  initExpertsSlider(); // Section: Team Experts
  initSharingBlogSlideshow(); // Section: Sharing Blog
  initBlogCategoryFilter(); // Section: Blog Category Filter
  initBlogMobileTabs(); // Section: Blog Mobile Tabs

  // Khởi tạo các tính năng UI
  initScrollToTop(); // Nút cuộn lên đầu
});
