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
  const desktopTabButtons = document.querySelectorAll(
    ".filter-tabs .filter-tab"
  );
  const projectCards = document.querySelectorAll(".project-item");

  desktopTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active states for desktop tabs
      desktopTabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Also update mobile tabs to keep them in sync
      const mobileTabButtons = document.querySelectorAll(
        ".filter-tabs-mobile .filter-tab"
      );
      mobileTabButtons.forEach((btn) => {
        if (btn.getAttribute("data-filter") === filter) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Filter project cards
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
  const mobileTabButtons = document.querySelectorAll(
    ".filter-tabs-mobile .filter-tab"
  );
  const desktopTabButtons = document.querySelectorAll(
    ".filter-tabs .filter-tab"
  );

  if (!mobileTabButtons.length) {
    console.log("Mobile project tabs not found, retrying...");
    setTimeout(initProjectMobileFilter, 500);
    return;
  }

  console.log("Project mobile tabs initialized successfully");

  // Handle mobile tab selection
  mobileTabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active states for mobile tabs
      mobileTabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Also update desktop tabs to keep them in sync
      desktopTabButtons.forEach((btn) => {
        if (btn.getAttribute("data-filter") === filter) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

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
    });
  });
}

// ===========================================
//   INITIALIZATION - Khởi tạo khi DOM ready
// ===========================================

/**
 * Khởi tạo chức năng phân trang cho dự án
 * - Hiển thị 9 dự án mỗi trang
 * - Navigation giữa các trang
 * - Cập nhật trạng thái active
 */
function initPagination() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageNumbers = document.querySelectorAll(".pagination-number");
  const projectItems = document.querySelectorAll(".project-item");

  if (!prevBtn || !nextBtn || !pageNumbers.length) return;

  let currentPage = 1;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(projectItems.length / itemsPerPage);

  // Function to show items for current page
  function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    projectItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = "block";
        item.style.animation = "fadeIn 0.5s ease-in-out";
      } else {
        item.style.display = "none";
      }
    });

    // Update pagination buttons
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;

    // Update page numbers
    pageNumbers.forEach((btn) => {
      btn.classList.remove("active");
      if (parseInt(btn.getAttribute("data-page")) === page) {
        btn.classList.add("active");
      }
    });
  }

  // Event listeners
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  pageNumbers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (page && page !== currentPage) {
        currentPage = page;
        showPage(currentPage);
      }
    });
  });

  // Initialize first page
  showPage(1);
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
  initPagination(); // Chức năng phân trang
});
