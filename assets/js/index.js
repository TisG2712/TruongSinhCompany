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
//   SECTION: SHARING BLOG - Phần chia sẻ blog
// ===========================================

/**
 * Dữ liệu bài viết cho các danh mục
 */
const blogData = {
  news: [
    {
      img: "./assets/images/index_images/blog4.png",
      title: "THIẾT KẾ NỘI THẤT BIỆT THỰ CAO CẤP",
      excerpt:
        "Khám phá những xu hướng thiết kế nội thất mới nhất cho biệt thự cao cấp. Từ phong cách hiện đại đến cổ điển, chúng tôi mang đến những giải pháp thiết kế độc đáo và sang trọng.",
      date: "15/12/2024",
      views: 1250,
    },
    {
      img: "./assets/images/index_images/blog2.png",
      title: "HOÀN THIỆN BIỆT THỰ",
      excerpt:
        "Quy trình hoàn thiện biệt thự từ A-Z với những bước quan trọng và lưu ý cần thiết để có được ngôi nhà hoàn hảo.",
      date: "12/12/2024",
      views: 980,
    },
    {
      img: "./assets/images/index_images/blog3.png",
      title: "THIẾT KẾ NỘI THẤT",
      excerpt:
        "Những xu hướng thiết kế nội thất hot nhất 2024, giúp không gian sống trở nên hiện đại và tiện nghi hơn.",
      date: "10/12/2024",
      views: 1560,
    },
    {
      img: "./assets/images/index_images/blog5.png",
      title: "XÂY DỰNG NHÀ PHỐ",
      excerpt:
        "Kinh nghiệm xây dựng nhà phố tiết kiệm chi phí mà vẫn đảm bảo chất lượng và thẩm mỹ cao nhất.",
      date: "08/12/2024",
      views: 2100,
    },
  ],
  "kinh-nghiem-xay-dung": [
    {
      img: "./assets/images/index_images/blog1.png",
      title: "101+ Mẫu nhà ống 1 tầng đẹp hiện đại, chi phí rẻ nhất 2025",
      excerpt:
        "Tổng hợp những mẫu nhà ống 1 tầng đẹp nhất với thiết kế hiện đại, tiết kiệm chi phí xây dựng mà vẫn đảm bảo tính thẩm mỹ và tiện nghi.",
      date: "10/06/2025",
      views: 866,
    },
    {
      img: "./assets/images/index_images/blog2.png",
      title: "99+ Mẫu nhà ống 3 tầng kiểu pháp đẳng cấp nhất 2025",
      excerpt:
        "Khám phá những mẫu nhà ống 3 tầng kiểu Pháp sang trọng, đẳng cấp với thiết kế tinh tế và không gian sống lý tưởng cho gia đình.",
      date: "23/07/2025",
      views: 307,
    },
    {
      img: "./assets/images/index_images/blog3.png",
      title: "101+ Mẫu nhà 2 tầng mái Thái 500 triệu đẹp, đầy đủ tiện nghi",
      excerpt:
        "Bộ sưu tập mẫu nhà 2 tầng mái Thái đẹp với ngân sách 500 triệu, thiết kế tối ưu không gian và đầy đủ tiện nghi hiện đại.",
      date: "10/05/2025",
      views: 1692,
    },
    {
      img: "./assets/images/index_images/blog4.png",
      title: "66+ Mẫu nhà 2 tầng đẹp giá 1 tỷ độc đáo, xu hướng nổi bật",
      excerpt:
        "Những mẫu nhà 2 tầng độc đáo với ngân sách 1 tỷ đồng, theo xu hướng thiết kế mới nhất và phù hợp với phong cách sống hiện đại.",
      date: "03/09/2025",
      views: 1855,
    },
  ],
  "phong-thuy": [
    {
      img: "./assets/images/index_images/blog5.png",
      title: "Phong thủy nhà ở: 10 nguyên tắc vàng cho ngôi nhà hạnh phúc",
      excerpt:
        "Khám phá những nguyên tắc phong thủy cơ bản giúp tạo ra không gian sống hài hòa, mang lại may mắn và hạnh phúc cho gia đình.",
      date: "20/11/2024",
      views: 3240,
    },
    {
      img: "./assets/images/index_images/blog1.png",
      title: "Hướng nhà hợp tuổi: Cách chọn hướng nhà theo phong thủy",
      excerpt:
        "Hướng dẫn chi tiết cách chọn hướng nhà phù hợp với tuổi và mệnh của gia chủ để mang lại tài lộc và sức khỏe.",
      date: "18/11/2024",
      views: 2890,
    },
    {
      img: "./assets/images/index_images/blog2.png",
      title: "Phong thủy phòng khách: Bố trí nội thất đúng cách",
      excerpt:
        "Những quy tắc phong thủy quan trọng khi bố trí phòng khách để tạo ra không gian đón khách lý tưởng và thu hút tài lộc.",
      date: "15/11/2024",
      views: 2150,
    },
    {
      img: "./assets/images/index_images/blog3.png",
      title: "Cây phong thủy trong nhà: Top 15 loại cây mang lại may mắn",
      excerpt:
        "Danh sách những loại cây phong thủy tốt nhất để trồng trong nhà, giúp thanh lọc không khí và mang lại năng lượng tích cực.",
      date: "12/11/2024",
      views: 1980,
    },
  ],
  "kien-truc": [
    {
      img: "./assets/images/index_images/blog4.png",
      title: "Xu hướng kiến trúc 2025: Những phong cách thiết kế nổi bật",
      excerpt:
        "Khám phá những xu hướng kiến trúc mới nhất năm 2025, từ thiết kế bền vững đến công nghệ thông minh trong xây dựng.",
      date: "25/11/2024",
      views: 1450,
    },
    {
      img: "./assets/images/index_images/blog5.png",
      title: "Kiến trúc xanh: Thiết kế nhà ở thân thiện với môi trường",
      excerpt:
        "Tìm hiểu về kiến trúc xanh và cách áp dụng các nguyên tắc thiết kế bền vững vào ngôi nhà của bạn.",
      date: "22/11/2024",
      views: 1200,
    },
    {
      img: "./assets/images/index_images/blog1.png",
      title: "Thiết kế nhà phố hiện đại: Tối ưu không gian sống",
      excerpt:
        "Những ý tưởng thiết kế nhà phố hiện đại giúp tối ưu hóa không gian sống và tạo ra không gian sống lý tưởng.",
      date: "20/11/2024",
      views: 1680,
    },
    {
      img: "./assets/images/index_images/blog2.png",
      title: "Kiến trúc cổ điển vs hiện đại: So sánh và lựa chọn",
      excerpt:
        "Phân tích chi tiết sự khác biệt giữa kiến trúc cổ điển và hiện đại để giúp bạn lựa chọn phong cách phù hợp.",
      date: "18/11/2024",
      views: 1320,
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
        if (text === "Kinh nghiệm xây dựng") {
          category = "kinh-nghiem-xay-dung";
        } else if (text === "Phong thủy") {
          category = "phong-thuy";
        } else if (text === "Kiến trúc") {
          category = "kien-truc";
        } else if (text === "Tin tức") {
          category = "news";
        }
      }

      // Hiển thị bài viết theo category
      displayBlogPosts(category);
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
  initBlogCategoryFilter(); // Section: Blog Category Filter

  // Khởi tạo các tính năng UI
  initScrollToTop(); // Nút cuộn lên đầu
});
