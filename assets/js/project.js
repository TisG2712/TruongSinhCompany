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
//   SECTION: PROJECT GALLERY - Phần dự án
// ===========================================

/**
 * Khởi tạo chức năng lọc dự án theo tab
 * - Click tab để lọc dự án theo danh mục
 * - Hiệu ứng fade in khi chuyển đổi
 */
function initProjectFilter() {
  const tabButtons = document.querySelectorAll(".filter-tab");
  const projectCards = document.querySelectorAll(".project-item");

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

/**
 * Khởi tạo mobile dropdown filter cho dự án
 * - Toggle dropdown khi click
 * - Lọc dự án khi chọn option
 * - Đóng dropdown khi click outside
 */
function initProjectMobileFilter() {
  const dropdownToggle = document.getElementById("projectFilterDropdownToggle");
  const dropdownMenu = document.getElementById("projectFilterDropdownMenu");
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

      // Filter projects
      const projectItems = document.querySelectorAll(".project-item");
      projectItems.forEach((projectItem) => {
        const category = projectItem.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          projectItem.style.display = "block";
          projectItem.classList.remove("hidden");
          projectItem.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          projectItem.style.display = "none";
          projectItem.classList.add("hidden");
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

/**
 * Khởi tạo chức năng Load More cho dự án
 * - Hiển thị thêm dự án khi click nút
 * - Ẩn nút khi đã load hết
 */
function initLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const collapseBtn = document.getElementById("collapseBtn");
  const hiddenProjects = document.getElementById("hiddenProjects");

  if (!loadMoreBtn || !collapseBtn || !hiddenProjects) return;

  loadMoreBtn.addEventListener("click", function () {
    // Hiển thị dự án ẩn với animation
    hiddenProjects.style.display = "contents";
    setTimeout(() => {
      hiddenProjects.classList.add("show");
    }, 100);

    // Ẩn nút load more, hiện nút rút gọn
    loadMoreBtn.style.display = "none";
    collapseBtn.style.display = "flex";

    // Scroll đến phần dự án mới
    setTimeout(() => {
      hiddenProjects.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 600);
  });

  collapseBtn.addEventListener("click", function () {
    // Ẩn dự án với animation
    hiddenProjects.classList.remove("show");
    setTimeout(() => {
      hiddenProjects.style.display = "none";
    }, 500);

    // Hiện nút load more, ẩn nút rút gọn
    loadMoreBtn.style.display = "flex";
    collapseBtn.style.display = "none";

    // Scroll lên đầu phần dự án
    setTimeout(() => {
      document.querySelector(".project-grid").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Load các component chung với đường dẫn tuyệt đối để tránh lỗi 404
  loadComponent("header", "../components/header.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  // Khởi tạo các tính năng UI
  initScrollToTop(); // Nút cuộn lên đầu
  initProjectFilter(); // Chức năng lọc dự án
  initProjectMobileFilter(); // Chức năng mobile filter dropdown
  initLoadMore(); // Chức năng load more
});
