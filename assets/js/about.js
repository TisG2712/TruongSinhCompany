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
//   INITIALIZATION - Khởi tạo khi DOM ready
// ===========================================

document.addEventListener("DOMContentLoaded", function () {
  // Load các component chung với đường dẫn tuyệt đối để tránh lỗi 404
  loadComponent("header", "../components/header.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  // Khởi tạo các tính năng UI
  initScrollToTop(); // Nút cuộn lên đầu
});
