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
//   SECTION: BLOG TABLE OF CONTENTS - Mục lục blog
// ===========================================

/**
 * Khởi tạo chức năng smooth scroll cho mục lục blog
 * - Click vào link mục lục để chuyển đến phần tương ứng
 * - Smooth scroll animation
 * - Highlight section đang xem
 */
function initBlogTOC() {
  const tocLinks = document.querySelectorAll(".blog-toc-link");
  const sections = document.querySelectorAll(
    ".section-1-content, .section-2-content, .section-3-content"
  );

  // Xử lý click vào link mục lục
  tocLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Tính toán vị trí scroll (trừ đi header height)
        const headerHeight = 120; // Chiều cao header + navbar
        const targetPosition = targetSection.offsetTop - headerHeight;

        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Highlight link được click
        tocLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Highlight section đang xem khi scroll
  function highlightCurrentSection() {
    const scrollPosition = window.scrollY + 150; // Offset để highlight sớm hơn

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Xóa active khỏi tất cả links
        tocLinks.forEach((link) => link.classList.remove("active"));

        // Thêm active vào link tương ứng
        const correspondingLink = document.querySelector(
          `.blog-toc-link[href="#${sectionId}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  // Lắng nghe sự kiện scroll
  window.addEventListener("scroll", highlightCurrentSection);

  // Highlight section đầu tiên khi load trang
  if (sections.length > 0) {
    const firstSectionId = sections[0].getAttribute("id");
    const firstLink = document.querySelector(
      `.blog-toc-link[href="#${firstSectionId}"]`
    );
    if (firstLink) {
      firstLink.classList.add("active");
    }
  }
}

/**
 * Khởi tạo chức năng toggle cho mục lục blog
 * - Click vào title hoặc icon để ẩn/hiện danh sách
 * - Animation mượt mà với arrow rotation
 */
function initBlogTocToggle() {
  const tocToggle = document.getElementById("blogTocToggle");
  const tocList = document.getElementById("blogTocList");

  if (!tocToggle || !tocList) return;

  tocToggle.addEventListener("click", function () {
    // Toggle class collapsed
    tocToggle.classList.toggle("collapsed");

    // Toggle hiển thị danh sách
    if (tocToggle.classList.contains("collapsed")) {
      tocList.style.display = "none";
    } else {
      tocList.style.display = "block";
    }
  });
}

/**
 * Khởi tạo chức năng form bình luận
 * - Xử lý submit form bình luận
 * - Thêm bình luận mới vào danh sách
 * - Reset form sau khi submit
 */
function initCommentForm() {
  const commentForm = document.getElementById("commentForm");

  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const commentText = document.getElementById("commentText").value;
      const commentName = document.getElementById("commentName").value;
      const commentEmail = document.getElementById("commentEmail").value;

      if (commentText && commentName && commentEmail) {
        // Create new comment element
        const newComment = document.createElement("div");
        newComment.className = "comment-item";
        newComment.innerHTML = `
          <div class="comment-avatar">
            <img src="../assets/images/index_images/architect1.png" alt="Avatar">
          </div>
          <div class="comment-content">
            <h4 class="comment-author">${commentName}</h4>
            <p class="comment-text">${commentText}</p>
          </div>
        `;

        // Add to comments list
        const commentsList = document.querySelector(".comments-list");
        commentsList.appendChild(newComment);

        // Clear form
        commentForm.reset();

        // Show success message
        alert("Bình luận của bạn đã được đăng thành công!");
      }
    });
  }
}

// ===========================================
//   RATING POPUP FUNCTIONS - Chức năng popup đánh giá
// ===========================================

function initRatingPopup() {
  const ratingPopup = document.getElementById("ratingPopup");
  const closeRatingPopup = document.getElementById("closeRatingPopup");
  const submitRating = document.getElementById("submitRating");
  const stars = document.querySelectorAll(".rating-stars-select i");
  const feedback = document.querySelector(".rating-feedback");
  const commentSubmitBtn = document.querySelector(".comment-submit-btn");

  let selectedRating = 0;

  // Mở popup khi bấm "Đăng bình luận"
  if (commentSubmitBtn) {
    commentSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Kiểm tra form có đầy đủ thông tin không
      const commentText = document.getElementById("commentText").value.trim();
      const commentName = document.getElementById("commentName").value.trim();
      const commentEmail = document.getElementById("commentEmail").value.trim();

      if (commentText && commentName && commentEmail) {
        showRatingPopup();
      } else {
        alert("Vui lòng điền đầy đủ thông tin trước khi đánh giá!");
      }
    });
  }

  // Đóng popup
  if (closeRatingPopup) {
    closeRatingPopup.addEventListener("click", hideRatingPopup);
  }

  // Đóng popup khi click bên ngoài
  if (ratingPopup) {
    ratingPopup.addEventListener("click", function (e) {
      if (e.target === ratingPopup) {
        hideRatingPopup();
      }
    });
  }

  // Xử lý chọn sao
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      selectedRating = index + 1;
      updateStarsDisplay();
      updateFeedback();
      updateSubmitButton();
    });

    star.addEventListener("mouseenter", function () {
      highlightStars(index + 1);
    });
  });

  // Reset khi hover ra khỏi container
  document
    .querySelector(".rating-stars-select")
    .addEventListener("mouseleave", function () {
      updateStarsDisplay();
    });

  // Gửi đánh giá
  if (submitRating) {
    submitRating.addEventListener("click", function () {
      if (selectedRating > 0) {
        submitRatingData();
      }
    });
  }

  function showRatingPopup() {
    ratingPopup.classList.add("show");
    document.body.style.overflow = "hidden";
    resetRating();
  }

  function hideRatingPopup() {
    ratingPopup.classList.remove("show");
    document.body.style.overflow = "";
    resetRating();
  }

  function resetRating() {
    selectedRating = 0;
    updateStarsDisplay();
    updateFeedback();
    updateSubmitButton();
  }

  function updateStarsDisplay() {
    stars.forEach((star, index) => {
      if (index < selectedRating) {
        star.classList.add("active");
        star.classList.remove("ri-star-line");
        star.classList.add("ri-star-fill");
      } else {
        star.classList.remove("active");
        star.classList.remove("ri-star-fill");
        star.classList.add("ri-star-line");
      }
    });
  }

  function highlightStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = "#ffc107";
      } else {
        star.style.color = "#ddd";
      }
    });
  }

  function updateFeedback() {
    const feedbacks = [
      "Vui lòng chọn mức độ đánh giá",
      "Rất tệ",
      "Tệ",
      "Bình thường",
      "Tốt",
      "Rất tốt",
    ];
    feedback.textContent = feedbacks[selectedRating];
  }

  function updateSubmitButton() {
    if (selectedRating > 0) {
      submitRating.disabled = false;
    } else {
      submitRating.disabled = true;
    }
  }

  function submitRatingData() {
    // Hiển thị thông báo thành công
    feedback.textContent = `Cảm ơn bạn đã đánh giá ${selectedRating} sao!`;
    feedback.style.color = "#28a745";

    // Disable nút submit
    submitRating.disabled = true;
    submitRating.textContent = "Đã gửi đánh giá";

    // Đóng popup sau 2 giây
    setTimeout(() => {
      hideRatingPopup();
      // Có thể thêm logic gửi dữ liệu lên server ở đây
      console.log("Rating submitted:", selectedRating);
    }, 2000);
  }
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
  initBlogTOC(); // Chức năng mục lục blog và smooth scroll
  initBlogTocToggle(); // Chức năng toggle mục lục blog
  initCommentForm(); // Chức năng form bình luận
  initRatingPopup(); // Chức năng popup đánh giá sao
});
