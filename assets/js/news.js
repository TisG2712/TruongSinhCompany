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
//   SECTION: NEWS GALLERY - Phần tin tức
// ===========================================

/**
 * Khởi tạo chức năng lọc tin tức theo tab
 * - Click tab để lọc tin tức theo danh mục
 * - Hiệu ứng fade in khi chuyển đổi
 */
function initNewsFilter() {
  const tabButtons = document.querySelectorAll(".filter-tab");
  const newsItems = document.querySelectorAll(".news-item");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa class active khỏi tất cả button
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Thêm class active vào button được click
      this.classList.add("active");

      // Lấy giá trị filter
      const filter = this.getAttribute("data-filter");

      // Lọc news items
      newsItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          item.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
}

/**
 * Khởi tạo chức năng Load More cho tin tức
 * - Hiển thị thêm tin tức khi click nút
 * - Ẩn nút khi đã load hết
 */
function initLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const collapseBtn = document.getElementById("collapseBtn");
  const hiddenNews = document.getElementById("hiddenNews");

  if (!loadMoreBtn || !collapseBtn || !hiddenNews) return;

  loadMoreBtn.addEventListener("click", function () {
    // Hiển thị tin tức ẩn với animation
    hiddenNews.style.display = "contents";
    setTimeout(() => {
      hiddenNews.classList.add("show");
    }, 100);

    // Ẩn nút load more, hiện nút rút gọn
    loadMoreBtn.style.display = "none";
    collapseBtn.style.display = "flex";

    // Scroll đến phần tin tức mới
    setTimeout(() => {
      hiddenNews.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 600);
  });

  collapseBtn.addEventListener("click", function () {
    // Ẩn tin tức với animation
    hiddenNews.classList.remove("show");
    setTimeout(() => {
      hiddenNews.style.display = "none";
    }, 500);

    // Hiện nút load more, ẩn nút rút gọn
    loadMoreBtn.style.display = "flex";
    collapseBtn.style.display = "none";

    // Scroll lên đầu phần tin tức
    setTimeout(() => {
      document.querySelector(".news-grid").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  });
}

/**
 * Khởi tạo mobile dropdown filter
 * - Toggle dropdown khi click
 * - Lọc tin tức khi chọn option
 * - Đóng dropdown khi click outside
 */
function initMobileFilter() {
  const dropdownToggle = document.getElementById("filterDropdownToggle");
  const dropdownMenu = document.getElementById("filterDropdownMenu");
  const dropdownItems = document.querySelectorAll(".filter-dropdown-item");
  const selectedText = document.querySelector(".selected-text");

  if (!dropdownToggle || !dropdownMenu) return;

  // Toggle dropdown
  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownToggle.classList.toggle("active");
    dropdownMenu.classList.toggle("show");
  });

  // Handle dropdown item selection
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const filter = item.getAttribute("data-filter");
      const text = item.textContent;

      // Update selected text
      selectedText.textContent = text;

      // Update active state
      dropdownItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      // Filter news
      const newsItems = document.querySelectorAll(".news-item");
      newsItems.forEach((newsItem) => {
        const category = newsItem.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          newsItem.style.display = "block";
          newsItem.classList.remove("hidden");
          newsItem.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          newsItem.style.display = "none";
          newsItem.classList.add("hidden");
        }
      });

      // Close dropdown
      dropdownToggle.classList.remove("active");
      dropdownMenu.classList.remove("show");
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !dropdownToggle.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
      dropdownToggle.classList.remove("active");
      dropdownMenu.classList.remove("show");
    }
  });

  // Close dropdown on scroll
  window.addEventListener("scroll", () => {
    dropdownToggle.classList.remove("active");
    dropdownMenu.classList.remove("show");
  });
}

// ===========================================
//   INITIALIZATION - Khởi tạo khi DOM ready
// ===========================================

document.addEventListener("DOMContentLoaded", function () {
  // Load các component chung với đường dẫn tuyệt đối để tránh lỗi 404
  loadComponent("header", "../components/header.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  // Khởi tạo các tính năng UI
  initScrollToTop(); // Nút cuộn lên đầu
  initNewsFilter(); // Chức năng lọc tin tức
  initLoadMore(); // Chức năng load more
  initMobileFilter(); // Chức năng mobile filter dropdown
});
