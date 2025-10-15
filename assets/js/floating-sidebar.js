// Floating Sidebar Component Loader
document.addEventListener("DOMContentLoaded", function () {
  loadFloatingSidebar();
  initFloatingSidebarToggle();
});

function loadFloatingSidebar() {
  const container = document.getElementById("floating-sidebar-container");
  if (!container) return;

  // Load the floating sidebar component
  fetch("../components/floating-sidebar.html")
    .then((response) => response.text())
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading floating sidebar:", error);
    });
}

function initFloatingSidebarToggle() {
  // Wait for mobile sidebar elements to be available
  setTimeout(() => {
    const mobileSidebar = document.getElementById("mobile-sidebar");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const closeBtn = document.getElementById("close-btn");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const floatingSidebar = document.querySelector(".floating-sidebar");

    if (!mobileSidebar || !floatingSidebar) return;

    // Function to hide floating sidebar (only on mobile)
    function hideFloatingSidebar() {
      if (floatingSidebar && window.innerWidth <= 768) {
        floatingSidebar.style.display = "none";
      }
    }

    // Function to show floating sidebar
    function showFloatingSidebar() {
      if (floatingSidebar) {
        floatingSidebar.style.display = "flex";
      }
    }

    // Function to check if we're on mobile
    function isMobile() {
      return window.innerWidth <= 768;
    }

    // Event listeners for mobile sidebar
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener("click", function () {
        if (isMobile()) {
          hideFloatingSidebar();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (isMobile()) {
          showFloatingSidebar();
        }
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", function () {
        if (isMobile()) {
          showFloatingSidebar();
        }
      });
    }

    // Listen for sidebar state changes
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target;
          if (target.classList.contains("active") && isMobile()) {
            hideFloatingSidebar();
          } else if (isMobile()) {
            showFloatingSidebar();
          }
        }
      });
    });

    observer.observe(mobileSidebar, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (!isMobile()) {
        // Always show on desktop
        showFloatingSidebar();
      } else if (mobileSidebar.classList.contains("active")) {
        // Hide on mobile if sidebar is open
        hideFloatingSidebar();
      } else {
        // Show on mobile if sidebar is closed
        showFloatingSidebar();
      }
    });

    // Initial check
    if (isMobile() && mobileSidebar.classList.contains("active")) {
      hideFloatingSidebar();
    }
  }, 100);
}
