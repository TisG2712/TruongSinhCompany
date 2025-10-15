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
 * - Reset pagination về trang 1 khi lọc
 */
function initNewsFilter() {
  // Filter functionality removed - tabs now redirect to detail_blog1.html
  console.log("Filter tabs now redirect to detail_blog1.html");
}

/**
 * Khởi tạo chức năng phân trang cho tin tức
 * - Hiển thị 9 bài viết mỗi trang
 * - Navigation giữa các trang
 * - Cập nhật trạng thái active
 * - Làm việc với filter
 */
function initPagination() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageNumbers = document.querySelectorAll(".pagination-number");

  if (!prevBtn || !nextBtn || !pageNumbers.length) return;

  // Store current page globally
  window.currentPage = 1;
  const itemsPerPage = 9;

  // Function to get visible items (not hidden by filter)
  function getVisibleItems() {
    return Array.from(document.querySelectorAll(".news-item")).filter(
      (item) =>
        !item.classList.contains("hidden") && item.style.display !== "none"
    );
  }

  // Function to show items for current page
  function showPage(page) {
    const visibleItems = getVisibleItems();
    const totalPages = Math.ceil(visibleItems.length / itemsPerPage);

    // Ensure current page is within bounds
    if (page > totalPages && totalPages > 0) {
      page = totalPages;
      window.currentPage = page;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Hide all items first
    document.querySelectorAll(".news-item").forEach((item) => {
      item.style.display = "none";
    });

    // Show items for current page
    visibleItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = "block";
        item.style.animation = "fadeIn 0.5s ease-in-out";
      }
    });

    // Update pagination buttons
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages || totalPages === 0;

    // Update page numbers
    pageNumbers.forEach((btn) => {
      btn.classList.remove("active");
      if (parseInt(btn.getAttribute("data-page")) === page) {
        btn.classList.add("active");
      }
    });
  }

  // Global function to update pagination (called from filter)
  window.updatePagination = function () {
    showPage(window.currentPage);
  };

  // Event listeners
  prevBtn.addEventListener("click", () => {
    if (window.currentPage > 1) {
      window.currentPage--;
      showPage(window.currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    const visibleItems = getVisibleItems();
    const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
    if (window.currentPage < totalPages) {
      window.currentPage++;
      showPage(window.currentPage);
    }
  });

  pageNumbers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.getAttribute("data-page"));
      if (page && page !== window.currentPage) {
        window.currentPage = page;
        showPage(window.currentPage);
      }
    });
  });

  // Initialize first page
  showPage(1);
}

/**
 * Mobile filter functionality removed - tabs now redirect to detail_blog1.html
 */
function initMobileFilter() {
  // Mobile filter functionality removed - tabs now redirect to detail_blog1.html
  console.log("Mobile filter tabs now redirect to detail_blog1.html");
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
  initPagination(); // Chức năng phân trang
  initMobileFilter(); // Chức năng mobile filter dropdown
});
