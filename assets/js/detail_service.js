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

/**
 * Khởi tạo chức năng gallery cho trang chi tiết dự án
 * - Cho phép click vào thumbnail để thay đổi ảnh chính
 * - Hiệu ứng fade khi chuyển ảnh
 */
function initProjectGallery() {
  const mainImage = document.querySelector(".main-image img");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (!mainImage || !thumbnails.length) return;

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image with fade effect
      const newImageSrc = this.querySelector("img").src;
      mainImage.style.opacity = "0";

      setTimeout(() => {
        mainImage.src = newImageSrc;
        mainImage.style.opacity = "1";
      }, 150);
    });
  });
}

/**
 * Khởi tạo hiệu ứng counter animation cho các số thống kê
 * - Các số sẽ chạy loạn xạ rồi dần dần về đúng số mặc định
 * - Sử dụng Intersection Observer để kích hoạt khi scroll đến
 */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  // Observer để kích hoạt animation khi scroll đến
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Chỉ chạy 1 lần
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

/**
 * Tạo hiệu ứng counter animation cho một element
 * @param {HTMLElement} element - Element chứa số cần animate
 */
function animateCounter(element) {
  const originalText = element.textContent;
  const isPercentage = originalText.includes("%");
  const isPlus = originalText.includes("+");
  const isSlash = originalText.includes("/");

  // Lấy số gốc (loại bỏ ký tự đặc biệt)
  const originalNumber = parseFloat(originalText.replace(/[^\d.]/g, ""));

  if (isNaN(originalNumber)) return;

  const duration = 2000; // 2 giây
  const steps = 80; // Tăng số bước để mượt mà hơn
  const stepDuration = duration / steps;

  let currentStep = 0;

  const animate = () => {
    if (currentStep >= steps) {
      // Kết thúc animation, hiển thị số chính xác
      element.textContent = originalText;
      return;
    }

    // Tính toán số hiện tại dựa trên progress (từ 0 đến originalNumber)
    const progress = currentStep / steps;

    // Sử dụng linear easing để chạy đều đặn
    const currentNumber = Math.floor(originalNumber * progress);

    // Tạo text với ký tự đặc biệt
    let displayText = currentNumber.toString();
    if (isPercentage) displayText += "%";
    if (isPlus) displayText += "+";
    if (isSlash) displayText = originalText; // Giữ nguyên cho 24/7

    element.textContent = displayText;

    currentStep++;
    setTimeout(animate, stepDuration);
  };

  // Bắt đầu animation
  animate();
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
  initCounterAnimation(); // Hiệu ứng counter animation
});
